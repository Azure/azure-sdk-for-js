// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

function escapeQuotesIfString(input: unknown, previous: string): string | unknown {
  let result = input;

  if (typeof input === "string") {
    result = input.replace(/'/g, "''");
    // check if we need to escape this literal
    if (!previous.trim().endsWith("'")) {
      result = `'${result}'`;
    }
  }
  return result;
}

export function odata(strings: TemplateStringsArray, ...values: unknown[]): string {
  const results = [];
  for (let i = 0; i < strings.length; i++) {
    results.push(strings[i]);
    if (i < values.length) {
      results.push(escapeQuotesIfString(values[i], strings[i]));
    }
  }
  return results.join("");
}
