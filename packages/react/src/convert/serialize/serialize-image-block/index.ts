import { ImageBlockElement } from "~/src/image-plugin/types"

import { serializeImageShared } from "../serialize-image-shared"

export function serializeImageBlock(element: ImageBlockElement): string {
  const serializedImageShared = serializeImageShared(element)

  if (serializedImageShared === "") {
    return ""
  }

  return `${serializedImageShared}\n`
}
