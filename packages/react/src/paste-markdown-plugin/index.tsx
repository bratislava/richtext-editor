import { Editor, Transforms } from "slate"

import { createPlugin, stopEvent, TypedPlugin } from "~/src/sink"
import { insertTable } from "~/src/table-plugin/methods/insert-table"

import { createPasteMarkdownMethods } from "./methods"

type PasteMarkdownMethods = ReturnType<typeof createPasteMarkdownMethods>

export type PasteMarkdownEditor = {
  pasteMarkdown: PasteMarkdownMethods
}

export type PasteMarkdownPluginCustomTypes = {
  Name: "paste-markdown"
  Editor: PasteMarkdownEditor
}

export const PasteMarkdownPlugin = createPlugin<PasteMarkdownPluginCustomTypes>(
  (editor) => {
    editor.pasteMarkdown = createPasteMarkdownMethods(editor)
    return {
      name: "paste-markdown",
      editor: {},
      editableProps: {
        onPaste(e) {
          console.log("onPaste")
          const { types } = e.clipboardData

          const clipboardText = JSON.stringify(e.clipboardData.getData("text"))
          // Pasting a table
          if (clipboardText.includes("\\t")) {
            // this regex cleans up the " character that is added to the beginning and end of the clipboard text
            // and also removes the empty line represented by \r\n which appears only when copying from Excel
            const parsedTableRows = clipboardText
              .replaceAll(/(^")|("$)|("\\r?\\n"$)/g, "")
              .replaceAll("\\r\\n", "\\r")
              .split("\\r")
            const parsedTable = parsedTableRows
              .map((row) => {
                // for some reason, Excel adds an extra \r containing an empty string at the end of the last row we need to remove
                if (row === "") return null
                return row.split("\\t")
              })
              .filter((cell) => !!cell)
            const rowCount = parsedTable?.length ?? 0
            const columnCount = parsedTable[0]?.length ?? 0

            insertTable(editor, columnCount, rowCount)
            const tableCellNodes = Editor.nodes(editor, {
              at: editor.tablePlugin.getTableInfo()?.tablePath,
              match: (node) => {
                // @ts-ignore node has this type, but is not in the types
                return node.type === "table-cell"
              },
            })

            for (const node of tableCellNodes) {
              const nodePath = node[1]
              const nodeRowIndex = nodePath[1]
              const nodeColumnIndex = nodePath[2]
              Transforms.select(editor, nodePath)
              Editor.insertFragment(editor, [
                { text: parsedTable?.[nodeRowIndex]?.[nodeColumnIndex] || "" },
              ])
            }
            stopEvent(e)
            return true
          }

          if (types.length !== 1 || types[0] !== "text/plain") {
            return false
          }
          const markdown = e.clipboardData.getData("text/plain")
          editor.pasteMarkdown.pasteMarkdown(markdown)
          stopEvent(e)
          return true
        },
      },
    }
  }
) as TypedPlugin<PasteMarkdownPluginCustomTypes>
