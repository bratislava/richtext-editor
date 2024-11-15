import { createPlugin, TypedPlugin } from "~/src/sink"

import { createFullscreenMethods } from "./methods"

type FullscreenMethods = ReturnType<typeof createFullscreenMethods>

export type FullscreenEditor = {
  fullscreen: FullscreenMethods
}

export type FullscreenPluginCustomTypes = {
  Name: "fullscreen"
  Editor: FullscreenEditor
}

export const FullscreenPlugin = createPlugin<FullscreenPluginCustomTypes>(
  (editor) => {
    let isFullscreenMode = false

    editor.fullscreen = {
      toggleFullscreen: () => {
        isFullscreenMode = !isFullscreenMode
      },
      isFullscreen: isFullscreenMode,
    }

    return {
      name: "fullscreen",
      editor: {},
      editableProps: {},
    }
  }
) as TypedPlugin<FullscreenPluginCustomTypes>
