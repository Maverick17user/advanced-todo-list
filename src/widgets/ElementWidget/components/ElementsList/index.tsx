import { memo } from "react"
import { SelectableElement } from "./components"
import { Element } from "../../types"
import { ALLOWED_AMOUNT_OF_SELECTED_ELEMENTS, LIST_HEIGHT, LIST_ITEM_HEIGHT } from "./const"
import { FixedSizeList as VirtualizedList } from "react-window"

interface IElementsList {
  elements: Element[]
  listId: string
  selectedElements: Element[]
  onChange: (element: Element, shouldBecomeSelected: boolean) => void
}

const ElementsList = ({
  elements,
  listId,
  selectedElements,
  onChange,
}: IElementsList) => {

  const isSelectionDisabled = selectedElements.length === ALLOWED_AMOUNT_OF_SELECTED_ELEMENTS

  return elements.length ? (
    <div id={listId} role="listbox" className="virtualized-list-container">
      <VirtualizedList
        itemData={{
          elements,
          isSelectionDisabled,
          selectedElements,
          onChange,
        }}
        height={LIST_HEIGHT}
        itemSize={LIST_ITEM_HEIGHT}
        itemCount={elements.length}
        width="100%"
      >
        {SelectableElement}
      </VirtualizedList>
    </div>
  ) : (
    <span>Elements not found for applied filtration. <br/> You can clear filtration to see elements.</span>
  )
}

export default memo(ElementsList)