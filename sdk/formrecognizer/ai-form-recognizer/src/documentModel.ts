// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentFieldSchema, DocumentModelDetails } from "./generated";
import { AnalyzedDocument, AnalyzeResult } from "./lro/analysis";
import { DocumentField } from "./models/fields";
import { isAcronymic, uncapitalize } from "./util";

/**
 * A well-known model specification that supports extracting structured documents.
 *
 * See the `beginAnalyzeDocument` method of {@link DocumentAnalysisClient}, which supports consuming these
 * `DocumentModel` objects instead of model ID strings to provide stronger result types.
 */
export interface DocumentModel<Result> {
  /**
   * The unique ID of this model.
   */
  modelId: string;
  /**
   * The API version of the model.
   */
  apiVersion?: string;
  /**
   * An associated transformation that is used to conver the base (weak) Result type to the strong version.
   */
  transformResult: (input: AnalyzeResult) => Result;
}

/**
 * Checks a field value against a schema and converts it into a strong idiomatic DocumentField,
 * @internal
 * @param fieldName - the name of the field (used in diagnostics)
 * @param schema - the field's schema
 * @param field - the raw DocumentField value
 * @returns
 */
function extractField(
  fieldName: string,
  schema: DocumentFieldSchema,
  field: DocumentField,
): DocumentField {
  if (schema.type !== field.kind) {
    throw new Error(
      `Schema violation: ${fieldName} had type "${field.kind}", but expected "${schema.type}"`,
    );
  }

  // Objects need to be handled specially, so that we can camelCase the field names.
  if (field.kind === "object") {
    const result: any = {};

    for (const [subFieldName, subFieldSchema] of Object.entries(schema.properties!)) {
      if (field.properties[subFieldName] !== undefined && field.properties[subFieldName] !== null) {
        const trueFieldName = (
          isAcronymic(subFieldName) ? subFieldName : uncapitalize(subFieldName)
        ).replace(/\s/g, "");

        result[trueFieldName] = extractField(
          fieldName + "." + subFieldName,
          subFieldSchema,
          field.properties[subFieldName]!,
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
        extractField(fieldName + "[" + idx + "]", schema.items!, val),
      ),
    };
  } else return field;
}

/**
 * Create a DocumentModel that performs analysis using the given schema.
 *
 * The types of `documents` are created from the schema, so they are `unknown` unless they are asserted to be a
 * different type.
 *
 * @hidden
 * @param schema - model schema contents
 * @returns - a DocumentModel that encodes the schema
 */
export function createModelFromSchema(
  schema: Omit<DocumentModelDetails, "createdOn">,
): DocumentModel<AnalyzeResult<unknown>> {
  return {
    modelId: schema.modelId,
    apiVersion: schema.apiVersion,
    transformResult(baseResult: AnalyzeResult): AnalyzeResult<unknown> {
      const hasDocuments = Object.entries(schema.docTypes ?? {}).length > 0;

      return {
        ...baseResult,
        documents: hasDocuments
          ? baseResult.documents?.map(toDocument)
          : (baseResult.documents ?? []),
      };

      function toDocument(document: AnalyzedDocument): unknown {
        const result: Record<string, unknown> = {};
        const model = schema.docTypes?.[document.docType];

        if (model === undefined) {
          throw new Error(
            `Unexpected document type "${document.docType}" in result using model "${schema.modelId}"`,
          );
        }
        for (const [fieldName, fieldSchema] of Object.entries(model.fieldSchema)) {
          if (
            document.fields &&
            document.fields[fieldName] !== undefined &&
            document.fields[fieldName] !== null
          ) {
            const trueFieldName = (
              isAcronymic(fieldName) ? fieldName : uncapitalize(fieldName)
            ).replace(/\s/g, "");
            result[trueFieldName] = extractField(
              fieldName,
              fieldSchema,
              document.fields[fieldName],
            );
          }
        }

        return {
          ...document,
          fields: result,
        };
      }
    },
  };
}
