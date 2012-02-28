"use strict"

var xx = 1, xy = 0, xz = 0, xo = 0,
    yx = 0, yy = 1, yz = 0, yo = 0,
    zx = 0, zy = 0, zz = 1, zo = 0,
    width, halfWidth, height, halfHeight, ctx, id, data, cache

function initialize (canvas) {
  width = canvas.width
  halfWidth = width * 0.5
  height = canvas.height
  halfHeight = height * 0.5
  ctx = canvas.getContext ("2d")
  id = ctx.getImageData (0, 0, width, height)
  data = id.data
  cache = []
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

function pointSort (a, b) {
  return a.w - b.w
}

function frame (block) {
  var i = data.length,
      p, z

  while (i--) {
    data[i] = 0
    i -= 3
  }

  cache.length = 0

  block ()

  cache.sort (pointSort)

  i = cache.length
  while (i--) {
    p = cache[i]

    /* Don't draw anything behind the camera. (This is a break instead of a
     * continue, since the array is sorted. If we encounter one point behind
     * the camera, then the rest of the array will be as well.) */
    if (p.w <= 0)
      break

    z = width / p.w
    circle (
      p.u * z + halfWidth,
      p.v * z + halfHeight,
      p.radius * z,
      p.color
    )
  }

  ctx.putImageData (id, 0, 0)
}

function circle (x, y, r, color) {
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

  var i = (top * width + left) * 4,
      step = (width + left - right) * 4,
      red = color >>> 24,
      green = (color >>> 16) & 255,
      blue = (color >>> 8) & 255,
      alpha = color & 255

  left -= x
  top -= y
  right -= x
  bottom -= y
  r *= r

  for (y = top; y !== bottom; ++y, i += step) {
    for (x = left; x !== right; ++x) {
      if (x * x + y * y > r) {
        i += 4
        continue
      }

      data[i++] = red
      data[i++] = green
      data[i++] = blue
      data[i++] = alpha
    }
  }
}

function plot (points) {
  var i = points.length,
      p, z

  while (i--) {
    p = points[i]
    p.u = p.x * xx + p.y * xy + p.z * xz + xo
    p.v = p.x * yx + p.y * yy + p.z * yz + yo
    p.w = p.x * zx + p.y * zy + p.z * zz + zo
  }

  Array.prototype.push.apply (cache, points)
}
