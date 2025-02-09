import { useState, ChangeEvent, useCallback } from "react"
import debounce from "debounce"
import { FilterHandler } from "../../../types"

interface IUseSearch {
  debounceTimeInMs?: number
  handleSettingsChange: FilterHandler
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>
}

const useSearch = ({
  debounceTimeInMs = 750,
  handleSettingsChange,
  setSearchInputValue,
}: IUseSearch) => {
  const [inputValue, setInputValue] = useState<string>("")

  const applySearch = useCallback(debounce<FilterHandler>((args) => {
    handleSettingsChange(args)
    setSearchInputValue(args.searchSubstring || "")
  }, debounceTimeInMs), [handleSettingsChange, setSearchInputValue])

  const handleSearchInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchSubstring = event.target.value

    setInputValue(searchSubstring)

    applySearch({ searchSubstring })
  }

  return {
    inputValue,
    handleSearchInputValueChange,
  }
}

export default useSearch