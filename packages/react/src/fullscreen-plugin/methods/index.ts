export function createFullscreenMethods() {
  let isFullscreenMode = false
  return {
    toggleFullscreen: () => {
      isFullscreenMode = !isFullscreenMode
    },
    isFullscreen: isFullscreenMode,
  }
}
