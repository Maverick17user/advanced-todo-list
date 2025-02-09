export type FilterHandler = (a: {
  searchSubstring?: string
  minNumber?: number
}) => void