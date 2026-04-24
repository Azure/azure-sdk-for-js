// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Extract environment variable names from source text.
 *
 * Detects:
 * - `process.env.VARIABLE_NAME`
 * - `process.env["VARIABLE_NAME"]`
 * - `process.env['VARIABLE_NAME']`
 * - `const { VAR1, VAR2 } = process.env`
 * - `const { VAR1: alias } = process.env`
 * - `const { VAR1 = "default" } = process.env`
 * - `const { VAR1: alias = "default" } = process.env`
 */
export function extractEnvVarNames(text: string): string[] {
  const vars = new Set<string>();

  // process.env.VARIABLE_NAME
  for (const match of text.matchAll(/process\.env\.([A-Za-z_][A-Za-z0-9_]*)/g)) {
    vars.add(match[1]);
  }

  // process.env["VARIABLE_NAME"]
  for (const match of text.matchAll(/process\.env\["([A-Za-z_][A-Za-z0-9_]*)"\]/g)) {
    vars.add(match[1]);
  }

  // process.env['VARIABLE_NAME']
  for (const match of text.matchAll(/process\.env\['([A-Za-z_][A-Za-z0-9_]*)'\]/g)) {
    vars.add(match[1]);
  }

  // const/let/var { VAR1, VAR2 } = process.env
  for (const match of text.matchAll(/(?:const|let|var)\s*\{([^}]+)\}\s*=\s*process\.env/g)) {
    for (const item of match[1].split(",")) {
      // "ENDPOINT: endpoint = 'default'" → "ENDPOINT"
      const name = item.split(/[=:]/)[0].trim();
      if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
        vars.add(name);
      }
    }
  }

  return [...vars].sort();
}
