import { BaseEditor } from "slate"

import {
  ArraySafePluginCustomTypes,
  PluginFunction,
  SinkEditor,
} from "../../types"
import { createBooleanAction } from "./create-boolean-action"
import { createVoidAction } from "./create-void-action"

export function createWithSink(
  pluginConfigs: PluginFunction<ArraySafePluginCustomTypes>[]
) {
  /**
   * The `editor` in the props can be a `BaseEditor` but we transform it
   * into a `SinkEditor` before returning it.
   */
  return <E extends BaseEditor>(
    originalEditor: E
  ): E & SinkEditor<ArraySafePluginCustomTypes> => {
    const editor = originalEditor as E & SinkEditor<ArraySafePluginCustomTypes>

    /**
     * Executes the plugin on the `editor` with every one of the
     * `pluginFunctions` to get the `pluginObject`
     */
    const plugins = pluginConfigs.map((pluginConfig) => pluginConfig(editor))

    // /**
    //  * Exexcutes what we call extensions which you can think of more of like
    //  * ways to extend the functionality of a Sink Editor that is core. That is,
    //  * this is all the processing of the plugins, but we want to keep these
    //  * modular like plugins as well to create related functionality near each
    //  * other.
    //  */
    // for (const extension of extensions) {
    //   const extendEditor = extension?.extendEditor
    //   if (extendEditor) extendEditor(editor, plugins)
    // }

    /**
     * Create the default for SinkEditor methods if they don't already exist.
     */
    editor.isMaster = "isMaster" in editor ? editor.isMaster : () => false
    editor.isConvertible =
      "isConvertible" in editor ? editor.isConvertible : () => false
    editor.isSlave = "isSlave" in editor ? editor.isSlave : () => false
    editor.isStandalone =
      "isStandalone" in editor ? editor.isStandalone : () => false

    Object.assign(editor, {
      /**
       * void
       */
      normalizeNode: createVoidAction(editor, "normalizeNode", plugins),
      deleteBackward: createVoidAction(editor, "deleteBackward", plugins),
      deleteForward: createVoidAction(editor, "deleteForward", plugins),
      deleteFragment: createVoidAction(editor, "deleteFragment", plugins),
      insertBreak: createVoidAction(editor, "insertBreak", plugins),
      insertFragment: createVoidAction(editor, "insertFragment", plugins),
      insertNode: createVoidAction(editor, "insertNode", plugins),
      insertText: createVoidAction(editor, "insertText", plugins),
      /**
       * boolean
       */
      isInline: createBooleanAction(editor, "isInline", plugins),
      isVoid: createBooleanAction(editor, "isVoid", plugins),
      isMaster: createBooleanAction(editor, "isMaster", plugins),
      isConvertible: createBooleanAction(editor, "isConvertible", plugins),
      isSlave: createBooleanAction(editor, "isSlave", plugins),
      isStandalone: createBooleanAction(editor, "isStandalone", plugins),
    })

    editor.sink = {
      plugins,
    }
    return editor
  }
}
