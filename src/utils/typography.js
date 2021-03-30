import Typography from "typography"
import altonTheme from "typography-theme-alton"

import "../style.css"

altonTheme.overrideThemeStyles = () => ({
  "a": {
    color: "var(--color-primary)",
  },
  "a:hover,a:active": {
    color: "var(--text-normal)",
  },
})

const typography = new Typography(altonTheme)

export default typography
export const rhythm = typography.rhythm