import { ChangeEvent, CSSProperties, memo } from "react"
import { Element } from "../../../../types"

interface IElementItem {
  data: {
    elements: Element[]
    isSelectionDisabled: boolean
    selectedElements: Element[]
    onChange: (element: Element, shouldBecomeSelected: boolean) => void
  }
  index: number
  style: CSSProperties
}

const SelectableElement = ({ 
  data: {
    elements,
    isSelectionDisabled,
    selectedElements,
    onChange,
  },
  index,
  style,
}: IElementItem) => {
  const element = elements[index]

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSelectionState = event.target.checked
    onChange(element, newSelectionState)
  }

  return (
    <div role="option" style={style} className="list-item">
      <input
        type="checkbox"
        title={isSelectionDisabled ? "Max 3 elements can be selected. They are chosen already, you can find them in bars above and bellow." : ""}
        disabled={isSelectionDisabled}
        checked={selectedElements.includes(element)}
        onChange={handleChange}
      />
      {element}
    </div>
  )
}

export default memo(SelectableElement)