var matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]

function pop () {
  if (matrix.length !== 16)
    matrix.splice (matrix.length - 16, 16)
}

function camera (ex, ey, ez, cx, cy, cz, ux, uy, uz) {
  var m6 = cx - ex,
      m7 = cy - ey,
      m8 = cz - ez,
      k

  if (m6 || m7 || m8) {
    k = 1 / Math.sqrt (m6 * m6 + m7 * m7 + m8 * m8)
    m6 *= k
    m7 *= k
    m8 *= k
  }

  var m0 = m8 * uy - m7 * uz,
      m1 = m6 * uz - m8 * ux,
      m2 = m7 * ux - m6 * uy

  if (m0 || m1 || m2) {
    k = 1 / Math.sqrt (m0 * m0 + m1 * m1 + m2 * m2)
    m0 *= k
    m1 *= k
    m2 *= k
  }

  var m3 = m8 * m1 - m7 * m2,
      m4 = m6 * m2 - m8 * m0,
      m5 = m7 * m0 - m6 * m1

  matrix.splice (
    16, matrix.length - 16,
    m0, m1, m2, -(m0 * ex + m1 * ey + m2 * ez),
    m3, m4, m5, -(m3 * ex + m4 * ey + m5 * ez),
    m6, m7, m8, -(m6 * ex + m7 * ey + m8 * ez),
    0, 0, 0, 1
  )
}

function rotateX (angle) {
  var c = Math.cos (angle),
      s = Math.sin (angle),
      m = matrix.length

  matrix.push (
    matrix[m - 16],
    matrix[m - 15] * c + matrix[m - 15] * s,
    matrix[m - 14] * c - matrix[m - 15] * s,
    matrix[m - 13],

    matrix[m - 12],
    matrix[m - 11] * c + matrix[m - 10] * s,
    matrix[m - 10] * c - matrix[m - 11] * s,
    matrix[m -  9],

    matrix[m -  8],
    matrix[m -  7] * c + matrix[m -  6] * s,
    matrix[m -  6] * c - matrix[m -  7] * s,
    matrix[m -  5],

    matrix[m -  4],
    matrix[m -  3] * c + matrix[m -  2] * s,
    matrix[m -  2] * c - matrix[m -  3] * s,
    matrix[m -  1]
  )
}

function rotateY (angle) {
  var c = Math.cos (angle),
      s = Math.sin (angle),
      m = matrix.length

  matrix.push (
    matrix[m - 16] * c - matrix[m - 14] * s,
    matrix[m - 15],
    matrix[m - 16] * s + matrix[m - 14] * c,
    matrix[m - 13],

    matrix[m - 12] * c - matrix[m - 10] * s,
    matrix[m - 11],
    matrix[m - 12] * s + matrix[m - 10] * c,
    matrix[m -  9],

    matrix[m -  8] * c - matrix[m -  6] * s,
    matrix[m -  7],
    matrix[m -  8] * s + matrix[m -  6] * c,
    matrix[m -  5],

    matrix[m -  4] * c - matrix[m -  2] * s,
    matrix[m -  3],
    matrix[m -  4] * s + matrix[m -  2] * c,
    matrix[m -  1]
  )
}

/*
function rotateZ (angle) {
  var c = Math.cos (angle),
      s = Math.sin (angle),
      m = matrix.length

  apply (c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
}
*/
