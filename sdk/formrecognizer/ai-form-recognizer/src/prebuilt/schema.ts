// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DocumentArrayField,
  DocumentCountryRegionField,
  DocumentDateField,
  DocumentIntegerField,
  DocumentNumberField,
  DocumentObjectField,
  DocumentPhoneNumberField,
  DocumentStringField,
  DocumentTimeField,
} from "../models/fields";

/**
 * The type of a model schema, which has a model ID and a set of document types, each having a field schema.
 * @hidden
 */
export interface ModelSchema {
  /**
   * The unique ID of the model.
   */
  modelId: string;
  /**
   * The document types in the model and their corresponding field schemas.
   */
  docTypes: {
    [type: string]: {
      fieldSchema: { [k: string]: FieldSchema };
    };
  };
}

/**
 * A schema describing the expected type of a field.
 * @hidden
 */
export type FieldSchema =
  | StringLikeFieldSchema
  | NumberFieldSchema
  | DateFieldSchema
  | ArrayFieldSchema
  | ObjectFieldSchema
  | StructuredStringFieldSchema;

/**
 * A field that is ultimately represented by a string.
 * @hidden
 */
export interface StringLikeFieldSchema<
  Type extends "string" | "countryRegion" = "string" | "countryRegion"
> {
  readonly type: Type;
  readonly enum?: readonly string[];
}

/**
 * A field that is ultimately represented by a number.
 * @hidden
 */
export interface NumberFieldSchema<Type extends "number" | "integer" = "number" | "integer"> {
  readonly type: Type;
}

/**
 * A Date field.
 * @hidden
 */
export interface DateFieldSchema {
  readonly type: "date";
}

/**
 * A field that is ultimately represented by a string that is normalized by the service.
 * @hidden
 */
export interface StructuredStringFieldSchema<
  Type extends "time" | "phoneNumber" = "time" | "phoneNumber"
> {
  readonly type: Type;
}

/**
 * A field that contains an array of items that are themselves specified by a single nested schema.
 * @hidden
 */
export interface ArrayFieldSchema<Item extends Readonly<FieldSchema> = Readonly<FieldSchema>> {
  readonly type: "array";
  /**
   * The nested item schema.
   */
  readonly items: Item;
}

/**
 * A field that contains an object structure with its own nested field schemas.
 * @hidden
 */
export interface ObjectFieldSchema<
  Properties extends { readonly [k: string]: FieldSchema } = { readonly [k: string]: FieldSchema }
> {
  readonly type: "object";
  /**
   * The field schemas for this field's properties.
   */
  readonly properties: Properties;
}

/**
 * Converts the type of a model schema into the type of the corresponding document result.
 * @hidden
 */
export type ReifyPrebuiltSchema<Schema extends Readonly<ModelSchema>> = {
  [DocType in keyof Schema["docTypes"]]: {
    docType: DocType;
    fields: {
      [K in Extract<
        keyof Schema["docTypes"][DocType]["fieldSchema"],
        string
      > as Uncapitalize<K>]?: ReifyFieldSchema<Schema["docTypes"][DocType]["fieldSchema"][K]>;
    };
  };
}[keyof Schema["docTypes"]];

/**
 * Converts the type of a field schema into the type of the field in the document result.
 * @hidden
 */
export type ReifyFieldSchema<Schema extends Readonly<FieldSchema>> =
  // Structured strings are just represented as strings
  Schema extends StructuredStringFieldSchema<infer Type>
    ? {
        time: DocumentTimeField;
        phoneNumber: DocumentPhoneNumberField;
      }[Type]
    : // String fields are sort of special, they can have "enum" entries that we can analyze
    Schema extends StringLikeFieldSchema<infer Type>
    ? {
        string: Schema extends { enum: string[] }
          ? DocumentStringField & { value?: Schema["enum"][number] }
          : DocumentStringField;
        countryRegion: DocumentCountryRegionField;
      }[Type]
    : Schema extends NumberFieldSchema<infer Type>
    ? {
        number: DocumentNumberField;
        integer: DocumentIntegerField;
      }[Type]
    : Schema extends DateFieldSchema
    ? DocumentDateField
    : Schema extends ArrayFieldSchema<infer Item>
    ? DocumentArrayField<ReifyFieldSchema<Item>>
    : Schema extends ObjectFieldSchema<infer Properties>
    ? DocumentObjectField<{
        [K in Extract<keyof Properties, string> as Uncapitalize<K>]?: ReifyFieldSchema<
          Properties[K]
        >;
      }>
    : never;
