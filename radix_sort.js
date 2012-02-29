/* FIXME: we do a lot of swapping in the case of an already-sorted array. I
 * tested adding a check for that (`if (!(arr[j] & mask))`), but didn't see a
 * speedup. we *might* see a speedup when sorting a vertex buffer, though. */
function _radixSort (arr, left, right, mask) {
  var i, j, a, b, c, d

  while (mask) {
    i = left
    j = right

    while (i !== j)
      if (arr[i] & mask) {
        d = arr[--j]
        c = arr[--j]
        b = arr[--j]
        a = arr[--j]

        arr[j    ] = arr[i++]
        arr[j + 1] = arr[i++]
        arr[j + 2] = arr[i++]
        arr[j + 3] = arr[i++]

        arr[--i] = d
        arr[--i] = c
        arr[--i] = b
        arr[--i] = a
      }

      else
        i += 4

    mask >>>= 1
    _radixSort (arr, left, i, mask)
    left = i
  }
}

/* Sorts an imageData object on it's red channel. This sort is an in-place MSD
 * Radix sort: O(N) in time and O(log N) in auxilliary space usage. It's very
 * fast for large buffers. */
function radixSort (arr) {
  _radixSort (arr, 0, arr.length, 128)
}
