import { Editor, NodeEntry, Transforms } from "slate"

import { TableElement } from "../types"

export function normalizeTableIndexes(
  editor: Editor,
  entry: NodeEntry<TableElement>
): boolean {
  let isTransformed = false
  const operations: Array<() => void> = []

  const [table, tablePath] = entry

  table.children.forEach((rowElement, y) => {
    const cellElements = rowElement.children
    cellElements.forEach((cellElement, x) => {
      if (cellElement.x !== x || cellElement.y !== y) {
        operations.push(() => {
          try {
            Transforms.setNodes(editor, { x, y }, { at: [...tablePath, y, x] })
          } catch (error) {
            console.warn(
              `Failed to transform cell at ${[...tablePath, y, x]}:`,
              error
            )
          }
        })
        isTransformed = true
      }
    })
  })

  // Execute all operations in a single batch
  if (operations.length > 0) {
    Editor.withoutNormalizing(editor, () => {
      operations.forEach((operation) => operation())
    })
  }

  return isTransformed
}
