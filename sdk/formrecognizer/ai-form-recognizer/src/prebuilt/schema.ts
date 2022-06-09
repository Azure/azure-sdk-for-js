// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DocumentAddressField,
  DocumentArrayField,
  DocumentCountryRegionField,
  DocumentCurrencyField,
  DocumentDateField,
  DocumentIntegerField,
  DocumentNumberField,
  DocumentObjectField,
  DocumentPhoneNumberField,
  DocumentStringField,
  DocumentTimeField,
} from "../models/fields";
import { Acronymic } from "../util";

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
  | StructuredStringFieldSchema
  | WellKnownObjectFieldSchema;

/**
 * A field that is ultimately represented by a string.
 * @hidden
 */
export interface StringLikeFieldSchema<
  Type extends "string" | "countryRegion" = "string" | "countryRegion"
> {
  /** Field type: a string type such as "string" or "countryRegion". */
  readonly type: Type;
  /**
   * Optionally specifies the possible values of this string.
   */
  readonly enum?: readonly string[];
}

/**
 * A field that is ultimately represented by a number.
 * @hidden
 */
export interface NumberFieldSchema<Type extends "number" | "integer" = "number" | "integer"> {
  /** Field type: a number field such as "number" or "integer". */
  readonly type: Type;
}

/**
 * A Date field.
 * @hidden
 */
export interface DateFieldSchema {
  /** Field type: "date". */
  readonly type: "date";
}

/**
 * A field that is ultimately represented by a string that is normalized by the service.
 * @hidden
 */
export interface StructuredStringFieldSchema<
  Type extends "time" | "phoneNumber" = "time" | "phoneNumber"
> {
  /** Field type: a structured string type such as "time" or "phoneNumber". */
  readonly type: Type;
}

/**
 * A field that contains an array of items that are themselves specified by a single nested schema.
 * @hidden
 */
export interface ArrayFieldSchema<Item extends Readonly<FieldSchema> = Readonly<FieldSchema>> {
  /** Field type: "array". */
  readonly type: "array";
  /**
   * The nested item schema.
   */
  readonly items: Item;
}

/**
 * A field that is represented by an object whose properties are immediately applied to the result (as opposed to nested
 * beneath a property named `properties` as in ordinary "object" fields).
 * @hidden
 */
export interface WellKnownObjectFieldSchema<
  Type extends "currency" | "address" = "currency" | "address"
> {
  /** Field type: an immediate object such as "currency". */
  readonly type: Type;
}

/**
 * A field that contains an object structure with its own nested field schemas.
 * @hidden
 */
export interface ObjectFieldSchema<
  Properties extends { readonly [k: string]: FieldSchema } = { readonly [k: string]: FieldSchema }
> {
  /** Field type: "object". */
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
          ? DocumentStringField<Schema["enum"][number]>
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
    : Schema extends WellKnownObjectFieldSchema<infer Type>
    ? {
        currency: DocumentCurrencyField;
        address: DocumentAddressField;
      }[Type]
    : Schema extends ObjectFieldSchema<infer Properties>
    ? DocumentObjectField<{
        [K in Extract<keyof Properties, string> as K extends Acronymic
          ? K
          : Uncapitalize<K>]?: ReifyFieldSchema<Properties[K]>;
      }>
    : never;
