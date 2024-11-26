import { useEffect } from "react"
import { useSlateStatic } from "slate-react"

import { convertToBlockImage } from "~/src/image-plugin/render-element/image-with-controls/image-toolbar/image-type-buttons/convert-to-block-image"
import { ConstrainedRenderElementProps } from "~/src/sink"

import { $ImageInline } from "../styles/image-inline-styles"
import { ImageInlineElement } from "../types"
import { ImageWithControls } from "./image-with-controls"

export function ImageInline({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ImageInlineElement>) {
  const editor = useSlateStatic()

  // We need to remove inline images so all inline images will be rendered as block images
  useEffect(() => {
    convertToBlockImage(editor, element)
  }, [])

  return (
    <span {...attributes} style={{ display: "inline-block" }}>
      <$ImageInline contentEditable={false}>
        <ImageWithControls
          element={element}
          presets={editor.image.imageInlinePresets}
        />
      </$ImageInline>
      {children}
    </span>
  )
}
