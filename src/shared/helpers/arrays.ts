
/**
 * Removes item from the array
 *
 * @example
 * spliceItem([1, 3, 5, 7, 9], 7) // [1, 3, 5, 7, 9]
 */
export const removeItemFromArrayOfPrimitives = <T extends (string | number | boolean)>(array: T[], item: T) => {
  const indexToRemoveBy = array.indexOf(item)
  const halfBefore = array.slice(0, indexToRemoveBy)
  const halfAfter = array.slice(indexToRemoveBy + 1)
  return [ ...halfBefore, ...halfAfter ]
}