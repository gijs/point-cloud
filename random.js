var r0, r1, r2, r3

function reset () {
  r0 = 0.76758391689509150
  r1 = 0.54703062842600050
  r2 = 0.08701058942824602
  r3 = 1
}

function random () {
  var t = 2091639 * r2 + r3 * 2.3283064365386963e-10

  r3 = t | 0
  r2 = r1
  r1 = r0
  return r0 = t - (r3 = t | 0)
}

reset ()
