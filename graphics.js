"use strict"

var xx = 1, xy = 0, xz = 0, xo = 0,
    yx = 0, yy = 1, yz = 0, yo = 0,
    zx = 0, zy = 0, zz = 1, zo = 0,
    width, width2, width4, height, height2, height4, ctx, id, data

function initialize (canvas) {
  width = canvas.width
  width2 = width + width
  width4 = width2 + width2
  height = canvas.height
  height2 = height + height
  height4 = height2 + height2
  ctx = canvas.getContext ("2d")
  id = ctx.getImageData (0, 0, width, height)
  data = id.data
}

function translate (x, y, z, block) {
  var _xo = xo,
      _yo = yo,
      _zo = zo

  xo += xx * x + xy * y + xz * z
  yo += yx * x + yy * y + yz * z
  zo += zx * x + zy * y + zz * z

  block ()

  xo = _xo
  yo = _yo
  zo = _zo
}

function rotateY (angle, block) {
  var c = Math.cos (angle),
      s = Math.sin (angle),
      _xx = xx,
      _xz = xz,
      _yx = yx,
      _yz = yz,
      _zx = zx,
      _zz = zz

  xx = _xx * c - _xz * s
  xz = _xx * s + _xz * c
  yx = _yx * c - _yz * s
  yz = _yx * s + _yz * c
  zx = _zx * c - _zz * s
  zz = _zx * s + _zz * c

  block ()

  xx = _xx
  xz = _xz
  yx = _yx
  yz = _yz
  zx = _zx
  zz = _zz
}

function scale (x, y, z, block) {
  if (arguments.length === 2) {
    block = y
    y = x
    z = x
  }

  xx *= x
  yx *= x
  zx *= x

  xy *= y
  yy *= y
  zy *= y

  xz *= z
  yz *= z
  zz *= z

  block ()

  xx /= x
  yx /= x
  zx /= x

  xy /= y
  yy /= y
  zy /= y

  xz /= z
  yz /= z
  zz /= z
}

function frame (block) {
  var i = data.length

  while (i) {
    data[--i] = 0
    i -= 3
  }

  block ()

  ctx.putImageData (id, 0, 0)
}

function plot (points) {
  var i = points.length,
      x, y, z, w, u, v

  while (i) {
    z = points[--i]
    y = points[--i]
    x = points[--i]

    if (x * zx + y * zy + z * zz >= 0)
      continue

    z = points[--i]
    y = points[--i]
    x = points[--i]
    w = x * zx + y * zy + z * zz + zo
    if (w < 1) continue
    w = width4 / w

    u = ((x * xx + y * xy + z * xz + xo) * w + width2) & 0x7ffffffc
    if (u >= width4) continue

    v = ((x * yx + y * yy + z * yz + yo) * w + height2) & 0x7ffffffc
    if (v >= height4) continue

    data[v * width + u + 3] = 255
  }
}

function circle (r, x, y) {
  var left = Math.floor (x - r),
      top = Math.floor (y - r),
      right = Math.floor (x + r + 1),
      bottom = Math.floor (y + r + 1)

  if (left < 0) left = 0
  else if (left >= width) return

  if (top < 0) top = 0
  else if (top >= height) return

  if (right > width) right = width
  else if (right < 0) return

  if (bottom > height) bottom = height
  else if (bottom < 0) return

  var i = (top * width + left) * 4 + 3,
      step = (width + left - right) * 4

  r *= r

  left -= x
  top -= y
  right -= x
  bottom -= y

  for (y = top; y !== bottom; y++, i += step) {
    for (x = left; x !== right; x++, i += 4) {
      if (x * x + y * y > r)
        continue

      data[i] = 0
    }
  }
}

function occlude (w, x, y, z) {
  var c = x * zx + y * zy + z * zz + zo
  if (c <= 0) return
  c = width / c

  var a = (x * xx + y * xy + z * xz + xo) * c + width * 0.5,
      b = (x * yx + y * yy + z * yz + yo) * c + height * 0.5

  circle (w * c, a, b)
}
