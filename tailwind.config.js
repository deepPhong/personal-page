const plugin = require("tailwindcss/plugin");

const checkedSiblingPlugin = plugin(function ({ addVariant, e }) {
  addVariant("checked-sibling", ({ container }) => {
    container.walkRules((rule) => {
      rule.selector = `:checked + .checked-sibling\\:${rule.selector.slice(1)}`;
    });
  });
});

const preHeaderSiblingPlugin = plugin(function ({ addVariant, e }) {
  addVariant("pre-header-sibling", ({ container }) => {
    container.walkRules((rule) => {
      rule.selector = `.gatsby-remark-code-title + .pre-header-sibling\\:${rule.selector.slice(1)}`;
    });
  });
});

module.exports = {
  important: true,
  purge: ["./src/**/*.{js,jsx,ts,tsx,mdx}", "./content/**/**/*.{js,jsx,ts,tsx,mdx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      serif: ["et-book", "Palatino", "Palatino Linotype", "Palatino LT STD", "Book Antiqua", "Georgia", "serif"],
      mono: ["Consolas", "Liberation Mono", "Menlo", "Courier", "monospace"]
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "var(--black)",
        white: "var(--white)",
        green: "var(--green)",
        blue: "var(--blue)",
        orange : "var(--orange)",
        lightBlue: "var(--light-blue)",
        transparentLightBlue: "var(--transparent-light-blue)",
        lightGreen: "var(--light-green)",
        lightRed: "var(--light-red)",
        "current-text": "var(--color-text)",
        "current-bg": "var(--color-background)",
        "current-select": "var(--color-select)",
        "current-pre-header": "var(--color-pre-header)",
        "current-nav": "var(--color-nav)",
      },
      fontSize: {
        "parent-xs": "0.65em",
        "tufte-root-md": "15px",
        "tufte-root": "12px",
        "tufte-margin": ["1.1rem", "1.3"],
        "tufte-base": ["1.0rem", "2.0rem"],
        "tufte-subtitle": ["1.5rem", "1"],
        "tufte-xxl": ["2.2rem", "1"],
        "tufte-xl": ["1.7rem", "1"],
        "tufte-l": ["1.3rem", "1"],
      },
      width: {
        "tufte-main": "87.5%",
        "tufte-section": "55%",
      },
      minWidth: {
        "avatar": "100px",
      },
      minHeight: {
        "avatar": "100px",
      },
      padding: {
        "tufte-main-md": "12.5%",
        "tufte-main": "8%",
      },
      inset: {
        "tufte-main-md": "12.5%",
        "tufte-main": "8%",
      },
      margin: {
        "tufte-marginnote": "-60%",
      },
      flexGrow: {
        "2": "2",
      },
      flexShrink: {
        "2": "2",
        "3": "3",
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in forwards"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      }
    },
  },
  variants: {
    extend: {
      boxShadow: ["dark"],
      display: ["checked-sibling"],
      float: ["checked-sibling"],
      padding: ["checked-sibling"],
      clear: ["checked-sibling"],
      width: ["checked-sibling"],
      margin: ["checked-sibling"],
      verticalAlign: ["checked-sibling"],
      position: ["checked-sibling"],
      inset: ["checked-sibling"],
      borderRadius: ["pre-header-sibling"],
      margin: ["pre-header-sibling"],
      animation: ["motion-safe"],
      outline: ["focus"]
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-opentype'),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    checkedSiblingPlugin,
    preHeaderSiblingPlugin,
  ],
}
