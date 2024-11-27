// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

function escapeQuotesIfString(input: unknown, previous: string): string | unknown {
  let result = input;

  if (typeof input === "string") {
    result = escapeQuotes(input);
    // check if we need to escape this literal
    if (previous !== "" && !previous.trim().endsWith("'")) {
      result = `'${result}'`;
    }
  }
  return result;
}

export function escapeQuotes(input: string): string {
  return input.replace(/'/g, "''");
}

function encodeDate(input: unknown): string | unknown {
  return input instanceof Date ? `datetime'${input.toISOString()}'` : input;
}

/**
 * Escapes an odata filter expression to avoid errors with quoting string literals.
 * Encodes Date objects.
 */
export function odata(strings: TemplateStringsArray, ...values: unknown[]): string {
  const fixEncoding = (value: unknown, string: string): string | unknown => {
    return encodeDate(escapeQuotesIfString(value, string));
  };
  const results = [];
  for (let i = 0; i < strings.length; i++) {
    results.push(strings[i]);
    if (i < values.length) {
      results.push(fixEncoding(values[i], strings[i]));
    }
  }
  return results.join("");
}
