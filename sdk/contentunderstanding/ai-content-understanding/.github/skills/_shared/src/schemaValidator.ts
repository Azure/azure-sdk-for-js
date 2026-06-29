// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Pure-TypeScript validator for Content Understanding analyzer schema JSON.
 *
 * Catches structural mistakes (missing keys, unknown baseAnalyzerId values,
 * malformed contentCategories routes) BEFORE any call to the Content
 * Understanding service. Failing fast here gives users an actionable error
 * message and avoids a wasted service round-trip.
 *
 * Design rules (see README.md in this directory):
 *   * No `@azure/*` imports — pure native JavaScript.
 *   * No network calls.
 *   * Self-contained — drop-in for any tool or test.
 *
 * Public surface:
 *   * validate(value)               — validate an already-parsed schema object
 *   * validateString(json)          — convenience wrapper that parses JSON first
 *   * validateFile(path)            — convenience wrapper that reads a file
 *   * KNOWN_BASE_ANALYZER_IDS       — allow-list of baseAnalyzerId values
 */

import { existsSync, readFileSync } from "node:fs";

/**
 * Valid `baseAnalyzerId` values for custom analyzers. Only modality-level
 * prebuilts are accepted by the service for `baseAnalyzerId`; `*Search`
 * variants and task-specific prebuilts (`prebuilt-invoice`,
 * `prebuilt-receipt`) return `InvalidBaseAnalyzerId` if used here. See
 * https://learn.microsoft.com/azure/ai-services/content-understanding/concepts/analyzer-reference#baseanalyzerid
 */
export const KNOWN_BASE_ANALYZER_IDS: ReadonlySet<string> = new Set([
  "prebuilt-document",
  "prebuilt-audio",
  "prebuilt-video",
  "prebuilt-image",
]);

const ALLOWED_FIELD_TYPES: ReadonlySet<string> = new Set([
  "string",
  "number",
  "integer",
  "boolean",
  "date",
  "time",
  "array",
  "object",
]);

const ALLOWED_FIELD_METHODS: ReadonlySet<string> = new Set([
  "extract",
  "generate",
  "classify",
]);

export interface ValidationResult {
  ok: boolean;
  errors: string[];
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Validate a parsed analyzer schema object. */
export function validate(schema: unknown): ValidationResult {
  const errors: string[] = [];

  if (!isObject(schema)) {
    return { ok: false, errors: ["schema must be a JSON object at the top level"] };
  }

  // baseAnalyzerId
  const baseEl = schema["baseAnalyzerId"];
  if (baseEl === undefined || baseEl === null) {
    errors.push("missing required key: baseAnalyzerId");
  } else if (typeof baseEl !== "string") {
    errors.push("baseAnalyzerId must be a string");
  } else if (!KNOWN_BASE_ANALYZER_IDS.has(baseEl)) {
    const known = [...KNOWN_BASE_ANALYZER_IDS]
      .sort()
      .map((s) => `'${s}'`)
      .join(", ");
    errors.push(`unknown baseAnalyzerId: '${baseEl}'. Known values: [${known}]`);
  }

  // config (optional, but if present must be an object)
  const config = schema["config"];
  if (config !== undefined && config !== null) {
    if (!isObject(config)) {
      errors.push("config, if present, must be an object");
      // Bail out — without a well-typed config we can't tell whether this is
      // a single-type or classify-and-route schema, and falling through would
      // emit a confusing cascade of "missing fieldSchema" errors rooted in
      // the same problem.
      return { ok: false, errors };
    }
  }

  const isClassifyRoute =
    isObject(config) && config["contentCategories"] !== undefined;

  if (isClassifyRoute) {
    errors.push(...validateClassifyRoute(config as Record<string, unknown>));
    if (schema["fieldSchema"] !== undefined) {
      errors.push(
        "classify-and-route schemas should not declare fieldSchema at " +
          "the top level; field extraction belongs in inner analyzers",
      );
    }
  } else {
    errors.push(...validateSingleType(schema));
  }

  return { ok: errors.length === 0, errors };
}

/** Validate a raw JSON string. */
export function validateString(json: string, sourceLabel = "<inline>"): ValidationResult {
  try {
    return validate(JSON.parse(json));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      errors: [`schema file is not valid JSON (${sourceLabel}): ${msg}`],
    };
  }
}

/** Validate a schema stored in a JSON file. */
export function validateFile(filePath: string): ValidationResult {
  if (!existsSync(filePath)) {
    return { ok: false, errors: [`schema file not found: ${filePath}`] };
  }
  let text: string;
  try {
    text = readFileSync(filePath, "utf-8");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      errors: [`failed to read schema file ${filePath}: ${msg}`],
    };
  }
  return validateString(text, filePath);
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function validateSingleType(schema: Record<string, unknown>): string[] {
  const errors: string[] = [];
  const fieldSchema = schema["fieldSchema"];
  if (fieldSchema === undefined || fieldSchema === null) {
    errors.push(
      "missing required key: fieldSchema " +
        "(single-type schemas must declare fields to extract)",
    );
    return errors;
  }
  if (!isObject(fieldSchema)) {
    errors.push("fieldSchema must be an object");
    return errors;
  }
  const fields = fieldSchema["fields"];
  if (fields === undefined || fields === null) {
    errors.push("fieldSchema.fields is required");
    return errors;
  }
  if (!isObject(fields)) {
    errors.push("fieldSchema.fields must be an object mapping field names to definitions");
    return errors;
  }
  const keys = Object.keys(fields);
  if (keys.length === 0) {
    errors.push("fieldSchema.fields must declare at least one field");
    return errors;
  }
  for (const name of keys) {
    errors.push(...validateFieldDefinition(name, fields[name], null));
  }
  return errors;
}

function validateFieldDefinition(
  name: string,
  definition: unknown,
  path: string | null,
): string[] {
  const errors: string[] = [];
  const prefix = path ?? `fieldSchema.fields['${name}']`;

  if (!isObject(definition)) {
    errors.push(`${prefix} must be an object`);
    return errors;
  }

  let fieldType: string | null = null;
  const typeEl = definition["type"];
  if (typeEl === undefined || typeEl === null) {
    errors.push(`${prefix}.type is required`);
  } else if (typeof typeEl !== "string") {
    errors.push(`${prefix}.type must be a string`);
  } else {
    fieldType = typeEl;
    if (!ALLOWED_FIELD_TYPES.has(fieldType)) {
      const allowed = [...ALLOWED_FIELD_TYPES].sort().map((s) => `'${s}'`).join(", ");
      errors.push(`${prefix}.type '${fieldType}' is not one of [${allowed}]`);
    }
  }

  const methodEl = definition["method"];
  if (methodEl !== undefined && methodEl !== null) {
    if (typeof methodEl !== "string") {
      errors.push(`${prefix}.method must be a string`);
    } else if (!ALLOWED_FIELD_METHODS.has(methodEl)) {
      const allowed = [...ALLOWED_FIELD_METHODS].sort().map((s) => `'${s}'`).join(", ");
      errors.push(`${prefix}.method '${methodEl}' is not one of [${allowed}]`);
    }
  }

  const descEl = definition["description"];
  if (descEl !== undefined && descEl !== null && typeof descEl !== "string") {
    errors.push(`${prefix}.description must be a string`);
  }

  if (fieldType === "object") {
    const propsEl = definition["properties"];
    if (propsEl !== undefined && propsEl !== null) {
      if (!isObject(propsEl)) {
        errors.push(`${prefix}.properties must be an object`);
      } else {
        for (const [childName, childDef] of Object.entries(propsEl)) {
          errors.push(
            ...validateFieldDefinition(
              childName,
              childDef,
              `${prefix}.properties['${childName}']`,
            ),
          );
        }
      }
    }
  } else if (fieldType === "array") {
    const itemsEl = definition["items"];
    if (itemsEl !== undefined && itemsEl !== null) {
      if (!isObject(itemsEl)) {
        errors.push(`${prefix}.items must be an object`);
      } else {
        errors.push(...validateFieldDefinition("items", itemsEl, `${prefix}.items`));
      }
    }
  }

  return errors;
}

function validateClassifyRoute(config: Record<string, unknown>): string[] {
  const errors: string[] = [];

  const enableEl = config["enableSegment"];
  if (enableEl !== true) {
    errors.push("classify-and-route schemas must set config.enableSegment = true");
  }

  const categories = config["contentCategories"];
  if (!isObject(categories)) {
    errors.push("config.contentCategories must be an object");
    return errors;
  }

  const keys = Object.keys(categories);
  if (keys.length === 0) {
    errors.push("config.contentCategories must declare at least one category");
    return errors;
  }

  for (const catName of keys) {
    const entry = categories[catName];
    const prefix = `config.contentCategories['${catName}']`;
    if (!isObject(entry)) {
      errors.push(`${prefix} must be an object`);
      continue;
    }
    const desc = entry["description"];
    if (typeof desc !== "string" || desc.trim() === "") {
      errors.push(`${prefix}.description is required and must be a non-empty string`);
    }
    const analyzerId = entry["analyzerId"];
    if (analyzerId !== undefined && analyzerId !== null && typeof analyzerId !== "string") {
      errors.push(`${prefix}.analyzerId, if present, must be a string`);
    }
  }

  return errors;
}
