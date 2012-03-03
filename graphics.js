"use strict"

var xx = 1, xy = 0, xz = 0, xo = 0,
    yx = 0, yy = 1, yz = 0, yo = 0,
    zx = 0, zy = 0, zz = 1, zo = 0,
    width, halfWidth, height, halfHeight, ctx, id, data, points

function initialize (canvas) {
  width = canvas.width
  halfWidth = width * 0.5
  height = canvas.height
  halfHeight = height * 0.5
  ctx = canvas.getContext ("2d")
  id = ctx.getImageData (0, 0, width, height)
  data = id.data
  points = []
}

function add (arr) {
  Array.prototype.push.apply (points, arr)
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


function _clear () {
  var i = data.length

  while (i--)
    data[i] = 255
}

function _subpixelCircle (x, y, radius, fill) {
  var left = Math.floor (x - radius),
      right = Math.floor (x + radius + 1),
      top = Math.floor (y - radius),
      bottom = Math.floor (y + radius + 1)

  if (left >= width) return
  if (right <= 0) return
  if (top >= height) return
  if (bottom <= 0) return

  if (left < 0) left = 0
  if (right > width) right = width
  if (top < 0) top = 0
  if (bottom > height) bottom = height

  var i = (left + top * width) * 4,
      step = (width + left - right) * 4,
      r, u

  left -= x
  right -= x
  top -= y
  bottom -= y
  radius *= radius

  right -= left

  for (y = top; y !== bottom; ++y, i += step) {
    r = radius - y * y
    u = left
    x = right

    while (x--) {
      if (u * u <= r) data[i] = fill
      u += 0.3333333333333333
      ++i

      if (u * u <= r) data[i] = fill
      u += 0.3333333333333333
      ++i

      if (u * u <= r) data[i] = fill
      u += 0.3333333333333333
      ++i

      ++i
    }
  }
}

function _draw () {
  var i = points.length,
      p, z

  while (i--) {
    p = points[i]

    /* Don't draw anything behind the camera. (This is a break instead of a
     * continue, since the array is sorted. If we encounter one point behind
     * the camera, then the rest of the array will be as well.) */
    if (p.w <= 0)
      break

    z = width / p.w
    _subpixelCircle (
      p.u * z + halfWidth,
      p.v * z + halfHeight,
      p.radius * z,
      p.fill
    )
  }

  ctx.putImageData (id, 0, 0)
}

function frame (block) {
  _clear ()
  block ()
  radixSort (points)
  _draw ()
}

function plot (points) {
  var i = points.length,
      p

  while (i--) {
    p = points[i]
    p.u = p.x * xx + p.y * xy + p.z * xz + xo
    p.v = p.x * yx + p.y * yy + p.z * yz + yo
    p.w = p.x * zx + p.y * zy + p.z * zz + zo
  }
}
