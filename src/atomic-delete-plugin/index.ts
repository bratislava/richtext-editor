import { Editor, Element, NodeEntry, Path, Transforms } from "slate"

import { createPlugin, findElementUp } from "~/src/sink"

export type AtomicDeletePluginCustomTypes = {
  Name: "atomic-delete"
  Editor: { atomicDelete: true }
}

/**
 * The Atomic Delete plugin protects master/slave related elements from being
 * put into a bad state after a delete.
 *
 * This can happen because Slate's default delete behavior does not take into
 * account the relationship between master/slave elements.
 *
 * Specifically, atomic delete protects against the following situations:
 *
 * - User forward deletes from just before a table. The first cell in the
 *   table is deleted leaving a first row with one less cell than the rest
 *   of the table.
 *
 * - User forward deletes at the end of a code block. Text from outside the
 *   code block is pulled into the code block.
 *
 * - User backward deletes from just after a code block. Text from outside the
 *   code block is pulled into the code block.
 *
 * - User backward deletes at the start of a code block. Text from inside the
 *   code block is pulled outside the code block.
 */
export const AtomicDeletePlugin = () =>
  createPlugin<AtomicDeletePluginCustomTypes>((editor) => {
    editor.atomicDelete = true
    return {
      name: "atomic-delete",
      editor: {
        deleteBackward() {
          if (editor.selection == null) return false
          const entry = Editor.node(editor, editor.selection)
          const prevEntry = Editor.previous(editor, { mode: "lowest" })
          if (isSafeDelete(editor, entry, prevEntry)) return false
          Transforms.move(editor, { unit: "character", reverse: true })
          return true
        },
        deleteForward() {
          if (editor.selection == null) return false
          const entry = Editor.node(editor, editor.selection)
          const nextEntry = Editor.next(editor, { mode: "lowest" })
          if (isSafeDelete(editor, entry, nextEntry)) return false
          Transforms.move(editor, { unit: "character" })
          return true
        },
      },
    }
  })

function isSafeDelete(
  editor: Editor,
  a: NodeEntry | undefined,
  b: NodeEntry | undefined
) {
  if (!a || !b) return true
  /**
   * If the current Node and the next Node are the same, short circuit
   * and leave early. Good for performance.
   */
  if (Path.equals(a[1], b[1])) return true
  const masterEntryA = findElementUp(
    editor,
    (el) => Element.isElement(el) && editor.isMaster(el),
    { at: a[1] }
  )
  const masterEntryB = findElementUp(
    editor,
    (el) => {
      return Element.isElement(el) && editor.isMaster(el)
    },
    { at: b[1] }
  )
  /**
   * If neither have a master, then don't worry about it.
   */
  if (!masterEntryA && !masterEntryB) return true
  /**
   * If they both have a master but it's the same master, then don't
   * worry about it.
   */
  if (
    masterEntryA &&
    masterEntryB &&
    Path.equals(masterEntryA[1], masterEntryB[1])
  )
    return true
  return false
}
