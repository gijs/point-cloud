function sparseSphere (i, r, s, color) {
  var arr = denseSphere (i, r, s, color),
      p = arr[--i], k

  p.x = 0
  p.y = 0
  p.z = 0
  p.radius = r
  p.color = 0

  while (i--) {
    p = arr[i]
    k = r / Math.sqrt (p.x * p.x + p.y * p.y + p.z * p.z)
    p.x *= k
    p.y *= k
    p.z *= k
  }

  return arr
}

function denseSphere (i, r, s, color) {
  r += r

  var arr = new Array (i),
      x, y, z

  while (i--) {
    do {
      x = Math.random () - 0.5
      y = Math.random () - 0.5
      z = Math.random () - 0.5
    } while (x * x + y * y + z * z > 0.25)

    arr[i] = {
      x: x * r,
      y: y * r,
      z: z * r,
      u: 0,
      v: 0,
      w: 0,
      radius: s,
      color: color
    }
  }

  return arr
}

/* FIXME: We really need to autocrop the generated data so that it's properly
 * centered. */
/* FIXME: This hasn't been converted to the new data types. */
/*
function textToImageData (str) {
  var canvas = document.createElement ("canvas"),
      ctx = canvas.getContext ("2d"),
      font = "bold 72px Helvetica, Arial"

  ctx.font = font
  canvas.width = ctx.measureText (str).width
  canvas.height = 72

  ctx.font = font
  ctx.textBaseline = "top"
  ctx.strokeText (str, 0, 0)

  return ctx.getImageData (0, 0, canvas.width, canvas.height)
}

function denseText (str) {
  var arr = [],
      id = textToImageData (str),
      scale = 2 / Math.max (id.width, id.height),
      data = id.data,
      i = data.length,
      y = id.height,
      x

  while (y--) {
    x = id.width
    while (x--) {
      if (data[--i] > 128)
        arr.push (
          (x - (id.width - 1) * 0.5) * scale,
          (y - (id.height - 1) * 0.5) * scale,
          0
        )

      i -= 3
    }
  }

  return arr
}
*/
