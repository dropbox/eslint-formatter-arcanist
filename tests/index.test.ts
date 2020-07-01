import format from '../'

test('should convert unicode char correctly', function () {
  expect(
    format([
      {
        usedDeprecatedRules: [],
        filePath: 'foo.ts',
        messages: [
          {
            ruleId: 'prefer-const',
            severity: 1,
            message: "'foo' is never reassigned. Use 'const' instead.",
            line: 1,
            column: 19,
            nodeType: 'Identifier',
            messageId: 'useConst',
            endLine: 1,
            endColumn: 22,
            fix: {range: [14, 17], text: 'const'},
          },
          {
            ruleId: 'formatjs/enforce-description',
            severity: 2,
            message: '`description` has to be specified in message descriptor',
            line: 1,
            column: 25,
            nodeType: 'CallExpression',
            endLine: 1,
            endColumn: 68,
          },
          {
            ruleId: 'prefer-const',
            severity: 1,
            message: "'foo2' is never reassigned. Use 'const' instead.",
            line: 2,
            column: 28,
            nodeType: 'Identifier',
            messageId: 'useConst',
            endLine: 2,
            endColumn: 32,
            fix: {range: [91, 94], text: 'const'},
          },
        ],
        errorCount: 1,
        warningCount: 2,
        fixableErrorCount: 0,
        fixableWarningCount: 2,
        source:
          ";'‖ ‰ ⁈ ⁕ ⁜ ';let foo = intl.formatMessage({defaultMessage: 'asd'})\n        ;'‖ ‰ ⁈ ⁕ ⁜ '; let foo2 = 1;\n",
      },
    ])
  ).toEqual(
    JSON.stringify([
      {
        char: 25,
        code: 'ESLint',
        description: "'foo' is never reassigned. Use 'const' instead.",
        line: 1,
        name: 'prefer-const',
        original: 'let',
        path: 'foo.ts',
        replacement: 'const',
        severity: 1,
      },
      {
        char: 25,
        code: 'ESLint',
        description: '`description` has to be specified in message descriptor',
        line: 1,
        name: 'formatjs/enforce-description',
        original: null,
        path: 'foo.ts',
        replacement: null,
        severity: 2,
      },
      {
        char: 34,
        code: 'ESLint',
        description: "'foo2' is never reassigned. Use 'const' instead.",
        line: 2,
        name: 'prefer-const',
        original: 'let',
        path: 'foo.ts',
        replacement: 'const',
        severity: 1,
      },
    ])
  )
})
