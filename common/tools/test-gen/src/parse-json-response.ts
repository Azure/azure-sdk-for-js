// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Best-effort JSON parsing for LLM responses.
 *
 * Handles common response defects:
 * - markdown code fences around JSON
 * - leading/trailing commentary outside the outermost object/array
 * - raw control characters inside JSON string literals
 */

export function parseJsonResponse<T = unknown>(content: string): T {
  const direct = tryParse<T>(content);
  if (direct.ok) return direct.value;

  const extracted = extractJsonBody(content);
  if (extracted) {
    const parsed = tryParse<T>(extracted);
    if (parsed.ok) return parsed.value;

    const sanitized = sanitizeJsonControlChars(extracted);
    const reparsed = tryParse<T>(sanitized);
    if (reparsed.ok) return reparsed.value;
  }

  const sanitized = sanitizeJsonControlChars(content);
  const retry = tryParse<T>(sanitized);
  if (retry.ok) return retry.value;

  throw direct.error;
}

function tryParse<T>(value: string): { ok: true; value: T } | { ok: false; error: Error } {
  try {
    return { ok: true, value: JSON.parse(stripCodeFences(value)) as T };
  } catch (error) {
    return { ok: false, error: error as Error };
  }
}

function stripCodeFences(value: string): string {
  const trimmed = value.trim();
  if (!trimmed.startsWith("```")) return trimmed;
  return trimmed
    .replace(/^```[a-zA-Z0-9_-]*\n?/, "")
    .replace(/\n?```$/, "")
    .trim();
}

function extractJsonBody(value: string): string | undefined {
  const trimmed = stripCodeFences(value);
  const objectStart = trimmed.indexOf("{");
  const objectEnd = trimmed.lastIndexOf("}");
  if (objectStart >= 0 && objectEnd > objectStart) {
    return trimmed.slice(objectStart, objectEnd + 1);
  }

  const arrayStart = trimmed.indexOf("[");
  const arrayEnd = trimmed.lastIndexOf("]");
  if (arrayStart >= 0 && arrayEnd > arrayStart) {
    return trimmed.slice(arrayStart, arrayEnd + 1);
  }

  return undefined;
}

function sanitizeJsonControlChars(value: string): string {
  let result = "";
  let inString = false;
  let escaping = false;

  for (const char of value) {
    if (!inString) {
      if (char === '"') inString = true;
      result += char;
      continue;
    }

    if (escaping) {
      escaping = false;
      result += char;
      continue;
    }

    if (char === "\\") {
      escaping = true;
      result += char;
      continue;
    }

    if (char === '"') {
      inString = false;
      result += char;
      continue;
    }

    switch (char) {
      case "\n":
        result += "\\n";
        break;
      case "\r":
        result += "\\r";
        break;
      case "\t":
        result += "\\t";
        break;
      case "\b":
        result += "\\b";
        break;
      case "\f":
        result += "\\f";
        break;
      default: {
        const code = char.charCodeAt(0);
        result += code < 0x20 ? `\\u${code.toString(16).padStart(4, "0")}` : char;
        break;
      }
    }
  }

  return result;
}
