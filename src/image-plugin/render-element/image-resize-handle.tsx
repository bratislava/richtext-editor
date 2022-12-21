import { clsx } from "clsx"
import { Dispatch, SetStateAction, useCallback, useState } from "react"

import { stopEvent } from "~/src/sink"

import {
  $ImageResizeHandle,
  $ImageResizeInvisibleHandle,
} from "../styles/image-resize-handle-styles"
import { ImageSize } from "../types"
import { minMax, resizeToWidth } from "../utils"

export function ImageResizeControl({
  srcSize,
  size,
  setSize,
}: {
  srcSize: ImageSize
  size: ImageSize
  setSize: Dispatch<SetStateAction<ImageSize | null>>
}) {
  const [isDragging, setIsDragging] = useState(false)

  /**
   * Create some convenience constants that we use a lot below
   */
  const width = size.width
  const maxWidth = srcSize.width
  const minWidth = Math.min(12, srcSize.width)

  /**
   * Start dragging
   */
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      stopEvent(e)
      setIsDragging(true)
      const startX = e.clientX
      const startWidth = size.width

      /**
       * Watch mouse movement during dragging
       */
      const onDocumentMouseMove = (e: MouseEvent) => {
        stopEvent(e)

        const nextWidth = minMax({
          value: startWidth + e.clientX - startX,
          min: minWidth,
          max: maxWidth,
        })
        const nextSize = resizeToWidth(nextWidth, srcSize)

        setSize(nextSize)
      }

      /**
       * Remove dragging event listeners when releasing mouse button
       */
      const onDocumentMouseUp = () => {
        document.removeEventListener("mousemove", onDocumentMouseMove)
        document.removeEventListener("mouseup", onDocumentMouseUp)
        setIsDragging(false)
      }

      /**
       * Attach event listeners directly to document
       */
      document.addEventListener("mousemove", onDocumentMouseMove)
      document.addEventListener("mouseup", onDocumentMouseUp)
    },
    [srcSize.width, srcSize.height, size.width]
  )

  /**
   * Add special classNames to modify appearance of resize controls
   */
  const className = clsx({
    "--center": width < maxWidth && width > minWidth,
    "--left": width == maxWidth && width > minWidth,
    "--right": width === minWidth && width < maxWidth,
    "--dragging": isDragging,
    "--small": width <= 64 || size.height <= 64,
  })

  return (
    <>
      <$ImageResizeInvisibleHandle
        className={className}
        onMouseDown={onMouseDown}
      >
        <$ImageResizeHandle>
          <div className="--bar --bar-left" />
          <div className="--bar --bar-center" />
          <div className="--bar --bar-right" />
        </$ImageResizeHandle>
      </$ImageResizeInvisibleHandle>
    </>
  )
}
