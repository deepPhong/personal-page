const plugin = require("tailwindcss/plugin");

const checkedSiblingPlugin = plugin(function ({ addVariant, e }) {
  addVariant("checked-sibling", ({ container }) => {
    container.walkRules((rule) => {
      rule.selector = `:checked + .checked-sibling\\:${rule.selector.slice(1)}`;
    });
  });
});

module.exports = {
  important: true,
  purge: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Gill Sans", "Gill Sans MT", "Calibri", "sans-serif"],
      serif: ["et-book", "Palatino", "Palatino Linotype", "Palatino LT STD", "Book Antiqua", "Georgia", "serif"],
      mono: ["Consolas", "Liberation Mono", "Menlo", "Courier", "monospace"]
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#111",
      white: "#fffff8",
      green: "#2f4f4f",
      blue: "#b4d5fe",
    },
    extend: {
      fontSize: {
        "parent-xs": "0.65em",
        "tufte-root-md": "15px",
        "tufte-root": "12px",
        "tufte-margin": ["1.1rem", "1.3"],
        "tufte-base": ["1.4rem", "2.0rem"],
        "tufte-subtitle": ["1.8rem", "1"],
        "tufte-xxl": ["3.2rem", "1"],
        "tufte-xl": ["2.2rem", "1"],
        "tufte-l": ["1.7rem", "1"],
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
      margin: {
        "tufte-marginnote": "-60%",
      },
      flexGrow: {
        "2": "2",
      },
      flexShrink: {
        "2": "2",
        "3": "3",
      }
    },
  },
  variants: {
    extend: {
      display: ["checked-sibling"],
      float: ["checked-sibling"],
      padding: ["checked-sibling"],
      clear: ["checked-sibling"],
      width: ["checked-sibling"],
      margin: ["checked-sibling"],
      verticalAlign: ["checked-sibling"],
      position: ["checked-sibling"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    checkedSiblingPlugin,
  ],
}
