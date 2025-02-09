import { ChangeEvent, useId } from "react"
import { NUMERATION_FILTER_OPTIONS } from "./const"
import { FilterHandler } from "../../types"

interface INumerationFilter {
  handleSettingsChange: FilterHandler
  setNumerationFilter: React.Dispatch<React.SetStateAction<number>>
}

const NumerationFilter = ({
  handleSettingsChange,
  setNumerationFilter,
}: INumerationFilter) => {

  const handleFiltration = (event: ChangeEvent<HTMLSelectElement>) => {
    const newMinNumber = Number(event.target.value)
    handleSettingsChange({ minNumber: newMinNumber })
    setNumerationFilter(newMinNumber)
  }

  const id = useId()

  return (
    <div className="filterWrapper">
      <label htmlFor={id}>Filter:</label>
      <select id={id} onChange={handleFiltration}>
        {NUMERATION_FILTER_OPTIONS.map(({ value, label }) => (
          <option value={value} key={label}>{label}</option>
        ))}
      </select>
    </div>
  )
}

export default NumerationFilter