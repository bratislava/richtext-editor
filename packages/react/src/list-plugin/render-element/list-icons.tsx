import { SVGProps } from "react"

/**
 * https://tabler-icons.io/
 */
export const UncheckedIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <rect x={4} y={4} width={16} height={16} rx={2} />
  </svg>
)

/**
 * https://tabler-icons.io/
 */
export const CheckedIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-checkbox"
    width="1em"
    height="1em"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="m9 11 3 3 8-8" className="--checkmark" />
    <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
  </svg>
)

/**
 * Modified viewfinder-circle from https://heroicons.com/
 */
export const BulletIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5z" />
  </svg>
)

export const CrossIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="currentColor"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.7071 9.70711C10.0976 9.31658 10.7308 9.31658 11.1213 9.70711L15.7175 14.3033L20.3137 9.70711C20.7042 9.31658 21.3374 9.31658 21.7279 9.70711C22.1184 10.0976 22.1184 10.7308 21.7279 11.1213L17.1317 15.7175L21.7279 20.3137C22.1184 20.7042 22.1184 21.3374 21.7279 21.7279C21.3374 22.1184 20.7042 22.1184 20.3137 21.7279L15.7175 17.1317L11.1213 21.7279C10.7308 22.1184 10.0976 22.1184 9.7071 21.7279C9.31658 21.3374 9.31658 20.7042 9.7071 20.3137L14.3033 15.7175L9.7071 11.1213C9.31658 10.7308 9.31658 10.0976 9.7071 9.70711Z"
    />
  </svg>
)
