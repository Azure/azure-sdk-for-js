// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function sanitizeIdentifier(value: string, fallback = "resource"): string {
  const words = value
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);

  if (words.length === 0) {
    return fallback;
  }

  const identifier = words
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toLowerCase() + word.slice(1)
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join("");
  return /^[0-9]/.test(identifier) ? `_${identifier}` : identifier;
}
