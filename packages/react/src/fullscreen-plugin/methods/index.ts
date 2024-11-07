import { Editor } from "slate"

export function createFullscreenMethods(editor: Editor) {
  let isFullscreenMode = false
  return {
    toggleFullscreen: () => {
      isFullscreenMode = !isFullscreenMode
    },
    isFullscreen: isFullscreenMode,
  }
}
