import { Element } from "../../../widgets/ElementWidget/types"
import styles from "./SelectedElementList.module.css"

interface ISelectedItem {
  elements: Element[]
  onUnselect: (element: Element) => void
}

const SelectedElementList = ({
  elements,
  onUnselect,
}: ISelectedItem) => {
  return (
    <ul className={styles.selectedElementList}>
      {elements.map(element => (
        <li key={element} className={styles.selectedElementList__item}>
          <span>
            {element}
          </span>
          <button onClick={() => onUnselect(element)}>
            X
          </button>
        </li>
      ))}
    </ul>
  )
}

export default SelectedElementList