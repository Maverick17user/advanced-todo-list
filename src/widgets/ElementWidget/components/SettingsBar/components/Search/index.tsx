import { useId } from "react"
import { useSearch } from "./hooks"
import { FilterHandler } from "../../types"

interface ISearch {
  listId: string
  handleSettingsChange: FilterHandler
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>
}

const Search = ({
  listId,
  handleSettingsChange,
  setSearchInputValue,
}: ISearch) => {
  const {
    inputValue,
    handleSearchInputValueChange,
  } = useSearch({
    handleSettingsChange,
    setSearchInputValue,
  })

  const id = useId()

  return (
    <div className="filterWrapper">
      <label htmlFor={id}>Search:</label>
      <input
        role="search"
        type="text"
        aria-autocomplete="list"
        aria-controls={listId}
        id={id}
        value={inputValue}
        onChange={handleSearchInputValueChange}
      />
    </div>
  )
}

export default Search