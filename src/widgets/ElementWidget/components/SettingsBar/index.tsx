import { useState } from "react"
import { Element } from "../../types"
import { NumerationFilter, Search } from "./components"
import styles from "./SettingsBar.module.css"
import { NUMERATION_FILTER_OPTIONS } from "./components/NumerationFilter/const"
import { FilterHandler } from "./types"

interface ISettingsBar {
  listId: string
  allElements: Element[]
  setVisibleElements: React.Dispatch<React.SetStateAction<string[]>>
}

const SettingsBar = ({
  listId,
  allElements,
  setVisibleElements,
}: ISettingsBar) => {
  const [numerationFilter, setNumerationFilter] = useState<number>(NUMERATION_FILTER_OPTIONS[0].value)
  const [searchInputValue, setSearchInputValue] = useState<Element | "">("")

  const applySearchFilter = (element: Element, searchSubstring: string) => {
    return element.toLowerCase().includes(searchSubstring.toLowerCase())
  }

  const applyNumerationFilter = (element: Element, minNumber: number) => {
    const elementNumber = Number(element.split(" ")[1])
    return elementNumber > Number(minNumber)
  }

  const handleSettingsChange: FilterHandler = ({
    searchSubstring = searchInputValue,
    minNumber = numerationFilter,
  }) => {
    const filteredElements = allElements.filter(element => {
      return applySearchFilter(element, searchSubstring) && applyNumerationFilter(element, minNumber)
    })

    setVisibleElements(filteredElements)
  }

  return (
    <div className={styles.elementWidget__settings}>
      <Search
        listId={listId}
        handleSettingsChange={handleSettingsChange}
        setSearchInputValue={setSearchInputValue}
      />
      <NumerationFilter
        handleSettingsChange={handleSettingsChange}
        setNumerationFilter={setNumerationFilter}
      />
    </div>
  )
}

export default SettingsBar