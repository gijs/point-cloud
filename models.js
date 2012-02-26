function cube (arr) {
  var i = arr.length

  while (i) {
    arr[--i] = -1
    arr[--i] = 0
    arr[--i] = 0
    arr[--i] = Math.random () * 2 - 1
    arr[--i] = Math.random () * 2 - 1
    arr[--i] = Math.random () * 2 - 1
  }
}

function sphere (arr) {
  var i = arr.length,
      x, y, z, k

  while (i) {
    do {
      x = Math.random () - 0.5
      y = Math.random () - 0.5
      z = Math.random () - 0.5
      k = x * x + y * y + z * z
    } while (k > 0.25)

    k = 1 / Math.sqrt (k)
    x *= k
    y *= k
    z *= k

    arr[--i] = z
    arr[--i] = y
    arr[--i] = x
    arr[--i] = z
    arr[--i] = y
    arr[--i] = x
  }
}
