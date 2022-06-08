// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ObjectFieldSchema } from ".";
import { Document } from "../generated";
import { DocumentField, toDocumentField } from "../models/fields";
import { isAcronymic, uncapitalize } from "../util";
import { BusinessCard, BusinessCardSchema } from "./modelSchemas/businessCard";
import {
  HealthInsuranceCardUs,
  HealthInsuranceCardUsSchema,
} from "./modelSchemas/healthInsuranceCard";
import { IdentityDocument, IdentityDocumentSchema } from "./modelSchemas/idDocument";
import { Invoice, InvoiceSchema } from "./modelSchemas/invoice";
import { Receipt, ReceiptSchema } from "./modelSchemas/receipt";
import { VaccinationCard, VaccinationCardSchema } from "./modelSchemas/vaccinationCard";
import { TaxUsW2, TaxUsW2Schema } from "./modelSchemas/w2";
import { ArrayFieldSchema, FieldSchema, ModelSchema, ReifyPrebuiltSchema } from "./schema";

// This symbol is used to index the transformation function. We might replace this with a normal string property key
// later, but for now this symbol allows us to hide it.
const fromDocument: unique symbol = Symbol("fromDocument");

/**
 * A well-known model specification that supports extracting structured documents.
 *
 * See the `beginAnalyzeDocuments` method of {@link DocumentAnalysisClient}, which supports consuming these
 * `DocumentModel` objects instead of model ID strings to provide stronger result types.
 */
export interface DocumentModel<Result> {
  /**
   * The unique ID of this model.
   */
  modelId: string;
  /**
   * An associated transformation that is used to convert the base (weak) Document type to the strong Result type.
   *
   * This is an _internal_ function that is created by `createModelFromSchema`. You do not have to implement it.
   * @hidden
   */
  [fromDocument]: (input: unknown) => Result;
}

/**
 * Checks a field value against a schema and converts it into a strong idiomatic DocumentField,
 * @internal
 * @param fieldName - the name of the field (used in diagnostics)
 * @param schema - the field's schema
 * @param field - the raw DocumentField value
 * @returns
 */
function extractField<Schema extends FieldSchema>(
  fieldName: string,
  schema: Schema,
  field: DocumentField
): DocumentField {
  if (schema.type !== field.kind) {
    throw new Error(
      `Schema violation: ${fieldName} had type "${field.kind}", but expected "${schema.type}"`
    );
  }

  // Objects need to be handled specially, so that we can camelCase the field names.
  if (field.kind === "object") {
    const result: any = {};

    for (const [subFieldName, subFieldSchema] of Object.entries(
      (schema as ObjectFieldSchema).properties
    )) {
      if (field.properties[subFieldName] !== undefined && field.properties[subFieldName] !== null) {
        result[isAcronymic(subFieldName) ? subFieldName : uncapitalize(subFieldName)] =
          extractField(
            fieldName + "." + subFieldName,
            subFieldSchema,
            field.properties[subFieldName]!
          );
      }
    }

    return {
      ...field,
      properties: result,
    };
  } else if (field.kind === "array") {
    return {
      ...field,
      values: field.values.map((val, idx) =>
        extractField(fieldName + "[" + idx + "]", (schema as ArrayFieldSchema).items, val)
      ),
    };
  } else return field;
}

/**
 * Create a model that can extract documents using the given schema.
 * @internal
 * @param schema - model schema contents (see modelSchemas directory)
 * @returns - a DocumentModel that encodes the schema
 */
function createModelFromSchema<Schema extends ModelSchema>(
  schema: Schema
): DocumentModel<ReifyPrebuiltSchema<Schema>> {
  return {
    modelId: schema.modelId,
    [fromDocument]: (documentValue: unknown): ReifyPrebuiltSchema<Schema> => {
      const document = documentValue as Document;
      const result: Record<string, unknown> = {};
      const model = schema.docTypes[document.docType];

      if (model === undefined) {
        throw new Error(
          `Unexpected document type "${document.docType}" in result using model "${schema.modelId}"`
        );
      }
      for (const [fieldName, fieldSchema] of Object.entries(model.fieldSchema)) {
        if (
          document.fields &&
          document.fields[fieldName] !== undefined &&
          document.fields[fieldName] !== null
        ) {
          result[isAcronymic(fieldName) ? fieldName : uncapitalize(fieldName)] = extractField(
            fieldName,
            fieldSchema,
            toDocumentField(document.fields[fieldName])
          );
        }
      }

      return {
        docType: document.docType,
        fields: result,
      } as ReifyPrebuiltSchema<Schema>;
    },
  };
}

/**
 * Extract the mapper from a model object.
 * @internal
 * @param model - a DocumentModel object
 * @returns - a function that transforms base AnalyzeResult Document objects into the DocumentModel's Document objects
 */
export function getMapper<M extends DocumentModel<unknown>>(
  model: M
): M extends DocumentModel<infer Result> ? (document: Document) => Result : never {
  return model[fromDocument] as any;
}

/**
 * **Deprecation Warning**: This object, along with all of its fields, is deprecated and will be replaced prior to a
 * stable release of `@azure/ai-form-recognizer` 4.0.0. Please see
 * [the deprecation notice](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/README.md#prebuiltmodels-deprecation)
 * in the README for more information.
 *
 * Prebuilt models with well-known document types and corresponding field schemas.
 *
 * These prebuilt `DocumentModel` objects can be used with the `beginAnalyzeDocuments` method to extract documents with
 * a stronger TypeScript result type and property names that have been converted to use a JavaScript naming convention.
 *
 * ### Example:
 *
 * ```javascript
 * import { AzureKeyCredential, DocumentAnalysisClient, PrebuiltModels } from "@azure/ai-form-recognizer";
 *
 * const credential = new AzureKeyCredential("<API key>">);
 * const client = new DocumentAnalysisClient("<endpoint>", credential);
 *
 * const poller = await client.beginAnalyzeDocuments(PrebuiltModels.Receipt, "<receipt file URL>");
 *
 * // Extract the first document from the response, which should be a receipt
 * const { documents: [receipt] } = await poller.pollUntilDone();
 *
 * // If we had used the model ID "prebuilt-receipt" instead of the `PrebuiltModels.Receipt` data structure, then the
 * // fields of the receipt would be in PascalCase (rather than camelCase), and the TypeScript type of the fields would
 * // not be as strict. This reduces the burden of casting fields to the appropriate types.
 *
 * console.log("The type of this receipt is:", receipt.fields.receiptType?.value)
 * ```
 *
 * @deprecated will be removed and replaced with auto-generated code in the next stable version
 */
export const PrebuiltModels = {
  /**
   * @deprecated will be removed and replaced with auto-generated code in the next stable version
   */
  BusinessCard: createModelFromSchema(BusinessCardSchema) as DocumentModel<BusinessCard>,
  /**
   * @deprecated will be removed and replaced with auto-generated code in the next stable version
   */
  IdentityDocument: createModelFromSchema(
    IdentityDocumentSchema
  ) as DocumentModel<IdentityDocument>,
  /**
   * @deprecated will be removed and replaced with auto-generated code in the next stable version
   */
  Invoice: createModelFromSchema(InvoiceSchema) as DocumentModel<Invoice>,
  /**
   * @deprecated will be removed and replaced with auto-generated code in the next stable version
   */
  Receipt: createModelFromSchema(ReceiptSchema) as DocumentModel<Receipt>,
  /**
   * @deprecated will be removed and replaced with auto-generated code in the next stable version
   */
  TaxUsW2: createModelFromSchema(TaxUsW2Schema) as DocumentModel<TaxUsW2>,
  /**
   * @deprecated will be removed and replaced with auto-generated code in the next stable version
   */
  VaccinationCard: createModelFromSchema(VaccinationCardSchema) as DocumentModel<VaccinationCard>,
  /**
   * @deprecated will be removed and replaced with auto-generated code in the next stable version
   */
  HealthInsuranceCardUs: createModelFromSchema(
    HealthInsuranceCardUsSchema
  ) as DocumentModel<HealthInsuranceCardUs>,
};

// PrebuiltModels is defined `as const` so this assignment checks to make sure it has the appropriate type, and
// `void __assert_...` simply prevents an unused declaration error
const __assert_prebuiltmodels_has_correct_type: {
  [k: string]: DocumentModel<unknown>;
} = PrebuiltModels;
void __assert_prebuiltmodels_has_correct_type;
