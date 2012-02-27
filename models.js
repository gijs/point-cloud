function sparseSphere (i, r) {
  var arr = denseSphere (i, r),
      x, y, z, k

  i = arr.length

  while (i) {
    z = arr[i - 1]
    y = arr[i - 2]
    x = arr[i - 3]
    k = 1 / Math.sqrt (x * x + y * y + z * z)

    arr[--i] *= k
    arr[--i] *= k
    arr[--i] *= k
    arr[--i] *= 4
  }

  return arr
}

function denseSphere (i, r) {
  i *= 4
  r += r

  var arr = new Float32Array (i),
      s = r * 16 / i,
      x, y, z

  while (i) {
    do {
      x = Math.random () - 0.5
      y = Math.random () - 0.5
      z = Math.random () - 0.5
    } while (x * x + y * y + z * z > 0.25)

    arr[--i] = z * r
    arr[--i] = y * r
    arr[--i] = x * r
    arr[--i] = s
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
