"use strict"

var xx = 1, xy = 0, xz = 0, xo = 0,
    yx = 0, yy = 1, yz = 0, yo = 0,
    zx = 0, zy = 0, zz = 1, zo = 0,
    width, height, ctx, id, data

function initialize (canvas) {
  width = canvas.width
  height = canvas.height
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

function frame (block) {
  var i = data.length

  while (i--) {
    data[i] = 0
    i -= 3
  }

  block ()

  ctx.putImageData (id, 0, 0)
}

function circle (x, y, r) {
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

  for (y = top; y !== bottom; ++y, i += step) {
    for (x = left; x !== right; ++x, i += 4) {
      if (x * x + y * y > r)
        continue

      data[i] = 255
    }
  }
}

function plot (points) {
  var i = points.length,
      r, x, y, z, w, u, v, p

  while (i) {
    z = points[--i]
    y = points[--i]
    x = points[--i]
    r = points[--i]
    w = x * zx + y * zy + z * zz + zo
    if (w <= 0) continue
    p = width / w
    v = x * yx + y * yy + z * yz + yo
    u = x * xx + y * xy + z * xz + xo

    circle (u * p + width * 0.5, v * p + height * 0.5, r * p)
  }
}
