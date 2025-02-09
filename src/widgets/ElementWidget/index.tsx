import { useId } from "react"
import { ElementsList, SettingsBar } from "./components"
import { Element } from "./types"
import { SelectedElementList } from "../../shared/components"
import styles from "./ElementWidget.module.css"
import { useElements } from "./hooks"

export interface IElementWidget {
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
  const {
    visibleElements,
    selectedElements,
    setVisibleElements,
    handleElementSelection,
    handleSave,
  } = useElements({
    allElements,
    preSelectedElements,
    onSave,
  })

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
        <button onClick={handleSave}>
          Save
        </button>
        <button className={styles.elementWidget__actArea__cancelButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </section>
  )
}

export default ElementWidget