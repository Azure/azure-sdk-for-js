// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This is a utility module for validating the contents of objects returned by document analysis methods using a simple
 * declarative "spec" format.
 */

import { assert } from "chai";

import { AnalyzedDocument } from "../../src/lro/analyze";
import {
  DocumentArrayField,
  DocumentDateField,
  DocumentField,
  DocumentObjectField,
  DocumentValueField,
} from "../../src/models";
import { logger } from "./recordedClients";

/**
 * Similar to python's built-in `zip` function.
 *
 * @param arrays - the arrays to zip
 * @returns - an array that is "inverted" i.e. each result array contains an element from each input array in order.
 */
const zip = (...arrays: unknown[][]) =>
  arrays.length < 2 ? arrays : arrays[0].map((_, idx) => arrays.map((row) => row[idx]));

/**
 * Defines the expected value of a document field. One of the following:
 *
 * - An object (expected field kind: "object") that maps expected field names to specs for each field.
 * - An array (expected field kind: "array") of field specs for each field in the array.
 * - A string or number to compare to the field's value.
 * - `undefined`, in which case either the field itself or the field's value must be undefined.
 * - A function that accepts a DocumentField, which will be called to validate the field.
 */
export type FieldSpec =
  | { [k: string]: FieldSpec }
  | FieldSpec[]
  | string
  | number
  | boolean
  | Date
  | undefined
  | ((field: DocumentField) => void);

/**
 * A function that validates an AnalyzedDocument result.
 */
export type Validator = (document: AnalyzedDocument) => void;

/**
 * Check a field against a spec.
 *
 * @param spec - the field spec to check against the field
 * @param field - the actual result field to validate
 * @returns void, throws if the field does not satisfy the spec
 */
function validateSpec(spec: FieldSpec, field: DocumentField | undefined) {
  if (field === undefined || spec === undefined) {
    assert.strictEqual((field as DocumentValueField<unknown>)?.value, spec as undefined);
  } else if (typeof spec === "function") {
    return spec(field);
  } else if (typeof spec === "string" || typeof spec === "number" || typeof spec === "boolean") {
    if (field.kind === "date") {
      assert.strictEqual(field.value?.toISOString(), spec as string);
    } else {
      assert.strictEqual((field as DocumentValueField<string | number | boolean>).value, spec);
    }
  } else if (spec instanceof Date) {
    assert.strictEqual(field.kind, "date");
    assert.deepEqual((field as DocumentDateField).value, spec);
  } else if (Array.isArray(spec)) {
    const values = (field as DocumentArrayField).values;
    assert.strictEqual(field.kind, "array");
    assert.strictEqual(values.length, spec.length);

    for (const [fieldSpec, fieldValue] of zip(spec, values) as Array<[FieldSpec, DocumentField]>) {
      validateSpec(fieldSpec, fieldValue);
    }
  } else {
    if (field.kind === "currency" || field.kind === "address") {
      assert.deepStrictEqual(field.value, spec as unknown);
    } else {
      assert.strictEqual(field.kind, "object");
      validateObjectSpec(spec, (field as DocumentObjectField).properties);
    }
  }
}

/**
 * Checks that all property values of `o` match the corresponding spec. This test is weak (does not assume that every
 * property of `o` will have a corresponding spec, so unconstrained properties will not cause errors).
 * @param spec - a map of field names to specs
 * @param o - a map of names to fields
 */
function validateObjectSpec(
  spec: { [k: string]: FieldSpec },
  o: { [k: string]: DocumentField | undefined }
): void {
  for (const [fieldName, fieldSpec] of Object.entries(spec)) {
    validateSpec(fieldSpec, o[fieldName]);
  }
}

/**
 * Create a spec that would validate a field successfully.
 */
function createSpecForField(field: DocumentField | undefined): FieldSpec {
  if (field === undefined) {
    return undefined;
  }

  switch (field.kind) {
    case "array":
      return field.values.map(createSpecForField);
    case "object":
      return Object.entries(field.properties).reduce(
        (fields, [fieldName, fieldValue]) => ({
          ...fields,
          [fieldName]: createSpecForField(fieldValue),
        }),
        {} as { [k: string]: FieldSpec }
      );
    case "currency":
    case "address":
      return field.value as FieldSpec;
    default:
      return field.value;
  }
}

/**
 * Creates a spec that would validate a Document successfully.
 */
function createConformingSpec(document: AnalyzedDocument): FieldSpec {
  const result: { [k: string]: FieldSpec } = {};

  for (const [name, field] of Object.entries(document.fields)) {
    result[name] = createSpecForField(field);
  }

  return result;
}

/**
 * Creates a validator function to apply to Documents from a spec.
 *
 * @param spec - the spec to validate against
 * @returns a Validator
 */
export function createValidator(spec: { [k: string]: FieldSpec }): Validator {
  return (document) => {
    if (logger.info.enabled) {
      // This helps with setting up new tests. Run the test with the info log-level and it will spit out a conforming
      // spec for the document to use in the tests. This helps catch regressions in model quality or missing fields.
      logger.info(
        "createValidator - conforming spec for input value:",
        JSON.stringify(createConformingSpec(document), null, 2)
      );
    }
    validateObjectSpec(spec, document.fields);
  };
}
