# ESLint Formatter for Arcanist

![Node.js CI](https://github.com/dropbox/eslint-formatter-arcanist/workflows/Node.js%20CI/badge.svg)

This formatter translate ESLint JSON output to Arcanist so it can be used with any generic arc linter.

# Usage

```bash
npm i -D eslint-formatter-arcanist
```

Then configure your eslint with `-f arcanist`. For more details check out https://eslint.org/docs/user-guide/formatters/