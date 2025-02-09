import { useState, useEffect, useCallback } from "react"
import { removeItemFromArrayOfPrimitives } from "../../../shared/helpers"
import { Element } from "../types"
import { IElementWidget } from '../index'

interface IUseElements {
  allElements: Element[]
  preSelectedElements: Element[]
  onSave: IElementWidget['onSave']
}

const useElements = ({
  allElements,
  preSelectedElements,
  onSave,
}: IUseElements) => {
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

  return {
    visibleElements,
    selectedElements,
    setVisibleElements,
    handleElementSelection,
    handleSave,
  }
}

export default useElements