/* FIXME: tail call optimization */
/* FIXME: we do a lot of swapping in the case of an already-sorted array. I
 * tested adding a check for that (`if (!(arr[j] & mask))`), but didn't see a
 * speedup. we *might* see a speedup when sorting a vertex buffer, though. */
function _radixSort (arr, left, right, mask) {
  var i = left,
      j = right,
      t

  while (i !== j)
    if (arr[i] & mask) {
      t = arr[--j]
      arr[j] = arr[i]
      arr[i] = t
    }

    else
      ++i

  if (!mask)
    return

  mask >>>= 1
  _radixSort (arr, left, i, mask)
  _radixSort (arr, i, right, mask)
}

function radixSort (arr) {
  _radixSort (arr, 0, arr.length, 0x80)
}

var foo = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
radixSort (foo)
console.log (foo)

var i = 1048576,
    a = new Array (i),
    b = new Array (i),
    s

while (i--)
  a[i] = b[i] = Math.floor (Math.random () * 256)

s = Date.now ()
radixSort (a)
console.log ("Radix Sort: %d", Date.now () - s)

s = Date.now ()
b.sort ()
console.log ("Builtin Sort: %d", Date.now () - s)
