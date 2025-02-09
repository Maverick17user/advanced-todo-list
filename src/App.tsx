import { useMemo, useState } from "react"
import style from "./App.module.css"
import { ElementWidget } from "./widgets"
import { Element } from "./widgets/ElementWidget/types"
import { removeItemFromArrayOfPrimitives } from "./shared/helpers"
import pluralize from "pluralize"
import { SelectedElementList } from "./shared/components"
import { HARD_CODED_ELEMENTS } from "./data/const"

function App() {
  const allElements = useMemo(() => HARD_CODED_ELEMENTS, [])
  const PRE_SELECTED_ELEMENTS = useMemo(() => [ allElements[1], allElements[3], allElements[5] ], [allElements])

  const [selectedElements, setSelectedElements] = useState<Element[]>(PRE_SELECTED_ELEMENTS)
  const [isElementWidgetOpened, setIsElementWidgetOpened] = useState<boolean>(true)

  const handleElementsSelection = (elements: Element[]) => {
    setSelectedElements(elements)
    setIsElementWidgetOpened(false)
  }

  const handleUnselect = (element: Element) => {
    setSelectedElements(prev => {
      return removeItemFromArrayOfPrimitives(prev, element)
    })
  }

  const handleWidgetStatus = () => {
    setIsElementWidgetOpened(prev => !prev)
  }

  const subTitle = `You currently have ${selectedElements.length} ${pluralize("element", selectedElements.length)}`

  return (
    <section className={style.container}>
      <div>
        <h1>Select items</h1>
        <p>{subTitle}</p>
        <SelectedElementList
          elements={selectedElements}
          onUnselect={handleUnselect}
        />
      </div>
      <button onClick={handleWidgetStatus}>Change my choice</button>
      {isElementWidgetOpened && (
        <ElementWidget
          allElements={allElements}
          preSelectedElements={selectedElements}
          onSave={handleElementsSelection}
          onClose={handleWidgetStatus}
        />
      )}
    </section>
  )
}

export default App
