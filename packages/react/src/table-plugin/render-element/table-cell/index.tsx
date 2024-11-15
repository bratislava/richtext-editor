import { useContext } from "react"
import { useSelected, useSlateStatic } from "slate-react"

import { CrossIcon } from "~/src/list-plugin/render-element/list-icons"
import { ConstrainedRenderElementProps } from "~/src/sink"

import { TableCellElement } from "../../types"
import { $RemoveTableButton, $TableCell } from "../styles"
import { TableContext } from "../table-context"
import { ColumnMenu } from "./column-menu"
import { RowMenu } from "./row-menu"
import { TableMenu } from "./table-menu"

export function TableCell({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<TableCellElement>) {
  const tableContext = useContext(TableContext)
  const selected = useSelected()
  const editor = useSlateStatic()

  /**
   * table has slection and we are in the top left cell
   */
  const showTableMenu =
    tableContext.isSelected && element.x === 0 && element.y === 0
  /**
   * table has selection and we are in the left columns
   */
  const showRowMenu = tableContext.isSelected && element.x === 0
  /**
   * table has selection and we are in the top row
   */
  const showColumnMenu = tableContext.isSelected && element.y === 0

  const isFirstTableCell =
    tableContext.isSelected && element.x === 0 && element.y === 0

  return (
    <$TableCell
      className={selected ? "--selected" : ""}
      {...attributes}
      data-x={element.x}
      data-y={element.y}
    >
      {children}
      {showTableMenu ? <TableMenu /> : null}
      {showRowMenu ? <RowMenu cellElement={element} /> : null}
      {showColumnMenu ? <ColumnMenu cellElement={element} /> : null}
      {isFirstTableCell ? (
        <$RemoveTableButton
          style={{
            top: "-1.5rem",
            left: "-1.5rem",
          }}
          onMouseDown={() => editor.tablePlugin.removeTable()}
        >
          <CrossIcon />
        </$RemoveTableButton>
      ) : null}
    </$TableCell>
  )
}
