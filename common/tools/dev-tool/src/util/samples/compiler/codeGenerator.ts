// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Convert an `it` block description to a camelCase function name.
 *
 * Rules:
 * - Split on spaces, hyphens, underscores, and non-alphanumeric chars
 * - First word lowercase, subsequent words capitalized
 * - Remove non-alphanumeric characters
 * - If result starts with a digit, prefix with `_`
 * - Empty input returns "sample"
 */
const RESERVED_WORDS = new Set([
  "break", "case", "catch", "continue", "debugger", "default", "delete",
  "do", "else", "export", "extends", "finally", "for", "function", "if",
  "import", "in", "instanceof", "new", "return", "super", "switch",
  "this", "throw", "try", "typeof", "var", "void", "while", "with",
  "class", "const", "enum", "let", "static", "yield", "await",
  // Strict mode
  "implements", "interface", "package", "private", "protected", "public",
]);

export function descriptionToFunctionName(description: string): string {
  // Replace non-alphanumeric chars (except spaces/hyphens/underscores) with spaces to act as word boundaries
  const cleaned = description.replace(/[^a-zA-Z0-9\s\-_]/g, " ");
  const tokens = cleaned
    .split(/[\s\-_]+/)
    .filter((w) => w.length > 0);

  // Split each token on camelCase/PascalCase boundaries
  // e.g. "ReadmeSampleCreateClient" → ["Readme", "Sample", "Create", "Client"]
  const words: string[] = [];
  for (const token of tokens) {
    words.push(...token.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/));
  }

  if (words.length === 0) return "sample";

  const result = words
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (i === 0) return lower;
      return lower[0].toUpperCase() + lower.slice(1);
    })
    .join("");

  if (/^\d/.test(result)) return "sample" + result[0].toUpperCase() + result.slice(1);
  if (RESERVED_WORDS.has(result)) return "sample" + result[0].toUpperCase() + result.slice(1);
  return result;
}
