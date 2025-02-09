import { useCallback, useEffect, useId, useState } from "react"
import { ElementsList, SettingsBar } from "./components"
import { Element } from "./types"
import { removeItemFromArrayOfPrimitives } from "../../shared/helpers"
import { SelectedElementList } from "../../shared/components"
import styles from "./ElementWidget.module.css"

interface IElementWidget {
  allElements: Element[]
  preSelectedElements: Element[]
  onSave: (elements: Element[]) => void
  onClose: () => void
}

const ElementWidget = ({
  allElements,
  preSelectedElements,
  onSave,
  onClose,
}: IElementWidget) => {
  const [visibleElements, setVisibleElements] = useState<Element[]>(allElements)
  const [selectedElements, setSelectedElements] = useState<Element[]>([])

  useEffect(() => {
    setSelectedElements(preSelectedElements)
  }, [preSelectedElements])

  const handleElementSelection = useCallback((element: Element, shouldBecomeSelected: boolean = false) => {
    if (shouldBecomeSelected) {
      setSelectedElements(prev => [...prev, element])
      return
    }

    setSelectedElements(prev => {
      return removeItemFromArrayOfPrimitives(prev, element)
    })
  }, [])

  const handleSave = () => {
    onSave(selectedElements)
  }

  const listId = useId()

  return (
    <section className={styles.elementWidget}>
      <div className={styles.elementWidget__head}>
        <h3>Select items</h3>
        <button onClick={onClose}>X</button>
      </div>
      <SettingsBar
        listId={listId}
        allElements={allElements}
        setVisibleElements={setVisibleElements}
      />
      <ElementsList
        elements={visibleElements}
        listId={listId}
        selectedElements={selectedElements}
        onChange={handleElementSelection}
      />
      <div className={styles.elementWidget__selectedElementList_wrapper}>
        <h5>Current selected items:</h5>
        <SelectedElementList
          elements={selectedElements}
          onUnselect={handleElementSelection}
        />
      </div>
      <div className={styles.elementWidget__actArea}>
        <button className={styles.elementWidget__actArea__button} onClick={handleSave}>
          Save
        </button>
        <button className={styles.elementWidget__actArea__button} onClick={onClose}>
          Close
        </button>
      </div>
    </section>
  )
}

export default ElementWidget