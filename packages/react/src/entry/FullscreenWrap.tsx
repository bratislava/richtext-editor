import styled from "@emotion/styled"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { Editor } from "slate"

const $Container = styled("div")`
  background: white;

  &.--fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200000;
  }
`

type Props = {
  children: React.ReactNode
  editor: Editor
}

export const FullscreenWrap = ({ children, editor }: Props) => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    editor.fullscreen.toggleFullscreen = () => {
      setIsFullscreen((prev) => {
        const next = !prev
        editor.fullscreen.isFullscreen = next
        return next
      })
    }
  }, [])

  return (
    <$Container className={clsx({ "--fullscreen": isFullscreen })}>
      {children}
    </$Container>
  )
}