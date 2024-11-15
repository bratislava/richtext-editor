import { MenuItemData } from "~/src/shared-overlays"

import * as Icon from "../icons"

export const otherItems: MenuItemData[] = [
  {
    icon: Icon.Fullscreen,
    title: "Toggle Fullscreen",
    hotkey: "mod+shift+f",
    action: (editor) => editor.fullscreen.toggleFullscreen(),
  },
]
