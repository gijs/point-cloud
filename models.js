function denseCube (i) {
  i *= 3

  var arr = new Float32Array (i)

  while (i--)
    arr[i] = Math.random () * 2 - 1

  return arr
}

function sparseSphere (i) {
  i *= 3

  var arr = new Float32Array (i),
      x, y, z, k

  while (i) {
    do {
      x = Math.random () - 0.5
      y = Math.random () - 0.5
      z = Math.random () - 0.5
      k = x * x + y * y + z * z
    } while (k > 0.25)

    k = 1 / Math.sqrt (k)

    arr[--i] = z * k
    arr[--i] = y * k
    arr[--i] = x * k
  }

  return arr
}

function denseSphere (i) {
  i *= 3

  var arr = new Float32Array (i),
      x, y, z

  while (i) {
    do {
      x = Math.random () - 0.5
      y = Math.random () - 0.5
      z = Math.random () - 0.5
    } while (x * x + y * y + z * z > 0.25)

    arr[--i] = z + z
    arr[--i] = y + y
    arr[--i] = x + x
  }

  return arr
}

/* FIXME: We really need to autocrop the generated data so that it's properly
 * centered. */
function textToImageData (str) {
  var canvas = document.createElement ("canvas"),
      ctx = canvas.getContext ("2d")

  ctx.font = "bold 72px Helvetica, Arial"
  canvas.width = ctx.measureText (str).width
  canvas.height = 72

  ctx.font = "bold 72px Helvetica, Arial"
  ctx.textBaseline = "top"

  ctx.fillText (str, 0, 0)

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
