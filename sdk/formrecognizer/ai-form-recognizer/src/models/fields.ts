// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentSpan } from "..";

import { AddressValue, CurrencyValue, DocumentField as GeneratedDocumentField } from "../generated";
import { toBoundingRegions } from "../transforms/polygon";
import { capitalize } from "../util";
import { BoundingRegion } from "./documentElements";

/**
 * Fields that are common to all DocumentField variants.
 */
export interface DocumentFieldCommon {
  /**
   * The verbatim extracted text content of the field.
   */
  content?: string;

  /**
   * Bounding regions covering the field.
   */
  boundingRegions?: BoundingRegion[];

  /**
   * Confidence of correctly extracting the field.
   */
  confidence?: number;

  /**
   * Location of the field in the reading order concatenated content.
   */
  spans?: DocumentSpan[];
}

/**
 * A simple field that has a primitive value, such as a string, number etc.
 */
export interface DocumentValueField<T> extends DocumentFieldCommon {
  /**
   * The field's value, which has the type specified in the field's schema.
   */
  value?: T;
}

/**
 * An extracted field. The `kind` property identifies (discriminates) the type of the `DocumentField`.
 */
export type DocumentField =
  | DocumentStringField
  | DocumentDateField
  | DocumentTimeField
  | DocumentPhoneNumberField
  | DocumentNumberField
  | DocumentIntegerField
  | DocumentSelectionMarkField
  | DocumentCountryRegionField
  | DocumentSignatureField
  | DocumentCurrencyField
  | DocumentAddressField
  | DocumentArrayField
  | DocumentObjectField;

/**
 * A DocumentField that has a string value.
 */
export interface DocumentStringField<Value extends string = string>
  extends DocumentValueField<Value> {
  /** Field kind: "string". */
  kind: "string";
}

/**
 * A DocumentField that has a Date value.
 */
export interface DocumentDateField extends DocumentValueField<Date> {
  /** Field kind: "date". */
  kind: "date";
}

/**
 * A DocumentField that has a time value, represented as a string.
 */
export interface DocumentTimeField extends DocumentFieldCommon {
  /** Field kind: "time". */
  kind: "time";
  /**
   * The field's value, which is a time in "HH:MM:SS" (ISO 8601) format.
   */
  value?: string;
}

/**
 * A DocumentField that has a phone number value, represented as a string.
 */
export interface DocumentPhoneNumberField extends DocumentFieldCommon {
  /** Field kind: "phoneNumber". */
  kind: "phoneNumber";
  /**
   * The field's value, which is a string containing the phone number.
   *
   * The phone number value is normalized to a standard format. If the value could not be normalized, this value may be
   * undefined, and the `content` property will contain the verbatim text of the DocumentField as it appeared in the
   * input.
   */
  value?: string;
}

/**
 * A DocumentField that has a number value.
 */
export interface DocumentNumberField extends DocumentValueField<number> {
  /** Field kind: "number". */
  kind: "number";
}

/**
 * A DocumentField that has an integer value.
 */
export interface DocumentIntegerField extends DocumentValueField<number> {
  /** Field kind: "integer". */
  kind: "integer";
}

/**
 * A DocumentField that is has a value indicating a selection mark state (such as a checkbox or radio button),
 * represented as a string.
 */
export interface DocumentSelectionMarkField extends DocumentFieldCommon {
  /** Field kind: "selectionMark". */
  kind: "selectionMark";
  /**
   * The state of the selection mark. One of:
   *
   * - "selected"
   * - "unselected"
   *
   * This value may be undefined, and other variants may be introduced in the future.
   */
  value?: string;
}

/**
 * A DocumentField that has a value indicating a country or region, represented as a string.
 */
export interface DocumentCountryRegionField extends DocumentFieldCommon {
  /** Field kind: "countryRegion". */
  kind: "countryRegion";
  /**
   * The 3-letter country/region code (ISO 3166-1 alpha-3) of the extracted country or region.
   */
  value?: string;
}

/**
 * A DocumentField that indicates the state of a signature, represented as a string.
 */
export interface DocumentSignatureField extends DocumentFieldCommon {
  /** Field kind: "signature". */
  kind: "signature";
  /**
   * The state of the signature field. One of:
   *
   * - "unsigned"
   * - "signed"
   *
   * This value may be undefined, and other variants may be introduced in the future.
   */
  value: "signed" | "unsigned";
}

/**
 * A DocumentField that consists of an array of nested fields. All fields in the array will have the same type.
 */
export interface DocumentArrayField<T = DocumentField> extends DocumentFieldCommon {
  /** Field kind: "array". */
  kind: "array";

  /**
   * The extracted members of the array field.
   */
  values: T[];
}

/**
 * A DocumentField that describes an amount of a certain currency.
 */
export interface DocumentCurrencyField extends DocumentFieldCommon {
  /** Field kind: "currency". */
  kind: "currency";

  /**
   * The properties of the extracted currency.
   */
  value?: CurrencyValue;
}

/**
 * A document field that describes a structured physical address.
 */
export interface DocumentAddressField extends DocumentFieldCommon {
  /** Field kind: "address". */
  kind: "address";

  /**
   * The properties of the extracted address.
   */
  value?: AddressValue;
}

/**
 * A DocumentField that consists of several named properties that have their own DocumentField values.
 */
export interface DocumentObjectField<Properties = { [k: string]: DocumentField | undefined }>
  extends DocumentFieldCommon {
  /** Field kind: "object". */
  kind: "object";

  /**
   * The extracted object properties. Each property of this object is, itself, a nested DocumentField.
   */
  properties: Properties;
}

/**
 * Convert a record of generated fields to a record of strongly-typed fields.
 * @internal
 * @param fields - a map of field names to generated field values
 * @returns - an object with the same keys, where all values have been mapped to DocumentFields
 */
export function toAnalyzedDocumentFieldsFromGenerated(fields: {
  [k: string]: GeneratedDocumentField;
}): { [k: string]: DocumentField } {
  return Object.entries(fields ?? {}).reduce((transformedFields, [name, value]) => {
    transformedFields[name] = toDocumentField(value);
    return transformedFields;
  }, {} as { [k: string]: DocumentField });
}

/**
 * Convert a generated document field into a strong TypeScriptified document field.
 * @internal
 */
export function toDocumentField(field: GeneratedDocumentField): DocumentField {
  const kind = field.type as DocumentField["kind"];

  const value: Omit<DocumentField, keyof DocumentFieldCommon | "kind"> = (() => {
    switch (kind) {
      // Almost all value kinds are represented as simple elemental values
      case "string":
      case "date":
      case "time":
      case "phoneNumber":
      case "number":
      case "integer":
      case "selectionMark":
      case "countryRegion":
      case "signature":
      case "currency":
      case "address":
        return {
          value:
            field[
              ("value" + capitalize(kind)) as Extract<
                keyof GeneratedDocumentField,
                `value${string}`
              >
            ],
        };
      case "array":
        return { values: field.valueArray?.map((v) => toDocumentField(v) ?? []) };
      case "object":
        return { properties: toAnalyzedDocumentFieldsFromGenerated(field.valueObject ?? {}) };
      default:
        // Exhaustiveness check
        // eslint-disable-next-line no-case-declarations
        const __exhaust: never = kind;
        throw new Error(`Unrecognized DocumentField type: ${__exhaust}`);
    }
  })();

  return {
    kind,
    ...value,
    boundingRegions: toBoundingRegions(field.boundingRegions),
    content: field.content,
    spans: field.spans,
    confidence: field.confidence,
  } as DocumentField;
}
