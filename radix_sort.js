function _largest (arr) {
  var i = arr.length,
      max = 0

  while (i--)
    if (arr[i].w > max)
      max = arr[i].w

  return max
}

function _mask (v) {
  var r = 1

  while (v >>= 1)
    r <<= 1

  return r
}

function _radixSort (arr, left, right, mask) {
  var i, j, t

  while (mask) {
    i = left
    j = right

    while (i !== j)
      if (arr[i].w & mask) {
        t = arr[--j]
        arr[j] = arr[i]
        arr[i] = t
      }

      else
        ++i

    mask >>>= 1
    _radixSort (arr, left, i, mask)
    left = i
  }
}

/* Sorts an imageData object on it's red channel. This sort is an in-place MSD
 * Radix sort: O(N) in time and O(log N) in auxilliary space usage. It's very
 * fast for large buffers. */
function radixSort (arr) {
  _radixSort (arr, 0, arr.length, _mask (_largest (arr)))
}
