import {Linter, ESLint} from 'eslint'

interface ArcanistMessage {
  char: number
  code: 'ESLint'
  description: string
  line: number
  name: string
  original: string | null
  path: string
  replacement: string | null
  severity: Linter.Severity
}

/**
 * Convert fix start range to bytes offset
 *
 * @param source Source code
 * @param offset Absolute offset in unicode
 * @returns Range [line, col]
 */
function convertUnicodeRangeToBytes(
  source: string,
  offset: number
): [number, number] {
  const textChunksBeforeOffset = source.substr(0, offset).split('\n')
  return [
    textChunksBeforeOffset.length,
    Buffer.byteLength(
      textChunksBeforeOffset[textChunksBeforeOffset.length - 1]
    ),
  ]
}

export default class Formatter implements ESLint.Formatter {
  format(results: ESLint.LintResult[]): string {
    const msgs: ArcanistMessage[] = []
    if (!Array.isArray(results) || !results.length) {
      return JSON.stringify(msgs)
    }

    for (const r of results) {
      const {source} = r
      for (const m of r.messages) {
        const msg: ArcanistMessage = {
          char: m.column,
          code: 'ESLint',
          description: m.message,
          line: m.line,
          name: m.ruleId || 'unknown',
          original: null,
          path: r.filePath,
          replacement: null,
          severity: m.severity,
        }

        if (m.fix && source) {
          msg.original = source.substr(
            m.fix.range[0],
            m.fix.range[1] - m.fix.range[0]
          )
          // Also convert line since fix can span multiple lines
          const [line, char] = convertUnicodeRangeToBytes(
            source,
            m.fix.range[0] + 1
          )
          msg.line = line
          msg.char = char
          msg.replacement = m.fix.text
        }

        msgs.push(msg)
      }
    }
    return JSON.stringify(msgs)
  }
}
