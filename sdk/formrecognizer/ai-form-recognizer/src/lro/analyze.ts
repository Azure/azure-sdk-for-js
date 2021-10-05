// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollerLike, PollOperationState } from "@azure/core-lro";
import { FormRecognizerError } from "../error";
import {
  AnalyzeResult as GeneratedAnalyzeResult,
  AnalyzeResultOperation,
  AnalyzeResultOperationStatus as AnalyzeOperationStatus,
  BoundingRegion,
  Document as GeneratedDocument,
  DocumentEntity,
  DocumentKeyValuePair,
  DocumentPage,
  DocumentSpan,
  DocumentStyle,
  DocumentTable,
} from "../generated";
import { DocumentField, toAnalyzedDocumentFieldsFromGenerated } from "../models/fields";
import { FormRecognizerApiVersion, PollerOptions } from "../options";
import { AnalyzeDocumentsOptions } from "../options/AnalyzeDocumentsOptions";

/**
 * A request input that can be uploaded to the Form Recognizer service.
 */
export type FormRecognizerRequestBody =
  | NodeJS.ReadableStream
  | Blob
  | ArrayBuffer
  | ArrayBufferView;

/**
 * An extracted document object.
 *
 * An AnalyzedDocument is an instance of one of the document types within a model. Its fields correspond to the field
 * schema of the document type.
 */
export interface AnalyzedDocument {
  /**
   * The type of the document that was extracted. A model can have multiple document types (for example, in a composed
   * model), so this property indicates which document type the fields of this document correspond to.
   */
  docType: string;

  /**
   * The extracted fields, which correspond to the document type's field schema.
   */
  fields: { [field: string]: DocumentField };

  /**
   * Bounding regions covering the document.
   */
  boundingRegions?: BoundingRegion[];

  /**
   * Locations of the document's elements in the `content` text (reading-order-concatenated content).
   */
  spans: DocumentSpan[];

  /**
   * The service's confidence that it has correctly extracted the document.
   */
  confidence: number;
}

/**
 * Transform a REST-level Document response object into the more strongly-typed AnalyzedDocument.
 *
 * @internal
 *
 * @param document - a REST-level document response object
 * @returns an AnalyzedDocument (which has had its fields mapped to stronger DocumentField types)
 */
export function toAnalyzedDocumentFromGenerated(document: GeneratedDocument): AnalyzedDocument {
  return {
    ...document,
    fields: toAnalyzedDocumentFieldsFromGenerated(document.fields ?? {}),
  };
}

/**
 * The result of an analysis operation. The type of the Document may be determined by the model used to perform the
 * analysis.
 */
export interface AnalyzeResult<Document = AnalyzedDocument> {
  /**
   * The service API version used to produce this result.
   *
   * Example: "2020-09-30-preview"
   */
  apiVersion: FormRecognizerApiVersion;

  /**
   * The unique ID of the model that was used to produce this result.
   */
  modelId: string;

  /**
   * A string representation of all textual and visual elements in the input, concatenated by reading order (the order
   * in which the service "reads" or extracts the textual anc visual content from the document).
   */
  content: string;

  /**
   * Extracted pages.
   */
  pages: DocumentPage[];

  /**
   * Extracted tables.
   */
  tables: DocumentTable[];

  /**
   * Extracted key-value pairs.
   */
  keyValuePairs: DocumentKeyValuePair[];

  /**
   * Extracted entities.
   */
  entities: DocumentEntity[];

  /**
   * Extracted font styles.
   */
  styles: DocumentStyle[];

  /**
   * Extracted documents (instances of any of the model's document types and corresponding field schemas).
   */
  documents: Document[];
}

/**
 * The state of an analysis operation, which will eventually produce the result type that corresponds to the model.
 */
export interface DocumentAnalysisPollOperationState<Result = AnalyzeResult<AnalyzedDocument>>
  extends PollOperationState<Result> {
  /**
   * The status of the operation. One of:
   *
   * - "notStarted"
   * - "running"
   * - "succeeded"
   * - "failed"
   */
  status: AnalyzeOperationStatus;

  /**
   * The model ID that the analysis operation will use to produce the result.
   */
  modelId: string;

  /**
   * The unique ID of this analysis operation.
   */
  operationId: string;
}

/**
 * A long-running operation (poller) that tracks the state of an analysis operation, eventually producing the result
 * type that corresponds to the model.
 */
export type AnalysisPoller<Result = AnalyzeResult<AnalyzedDocument>> = PollerLike<
  DocumentAnalysisPollOperationState<Result>,
  Result
>;

const operationLocationRegex = /\/documentModels\/([a-zA-Z0-9-]+)\/analyzeResults\/([a-z0-9-]+)/;

/**
 * Extract a model ID and analysis operation ID from an operationLocation URL.
 * @internal
 */
export function parseOperationLocation(url: string | undefined): [string, string] {
  if (url === undefined) {
    throw new Error("Failed to start analysis operation: no operation-location in the response.");
  }

  const parseResult = operationLocationRegex.exec(url);
  if (!parseResult || !parseResult[1] || !parseResult[2]) {
    throw new Error(`Unable to parse operationLocation: "${url}"`);
  }

  return [parseResult[1], parseResult[2]];
}

/**
 * Convert a generated AnalyzeResult into a convenience layer AnalyzeResult.
 * @internal
 */
export function toAnalyzeResultFromGenerated<
  Mapper extends (document: GeneratedDocument) => unknown
>(
  result: GeneratedAnalyzeResult,
  mapDocuments: Mapper
): AnalyzeResult<Mapper extends (...args: never) => infer Document ? Document : never> {
  type Document = Mapper extends (...args: never) => infer ThisDocument ? ThisDocument : never;
  return {
    apiVersion: result.apiVersion as FormRecognizerApiVersion,
    modelId: result.modelId,
    content: result.content,
    pages: result.pages,
    tables: result.tables ?? [],
    keyValuePairs: result.keyValuePairs ?? [],
    entities: result.entities ?? [],
    styles: result.styles ?? [],
    documents: (result.documents?.map((doc) => mapDocuments(doc)) as Document[]) ?? [],
  };
}

/**
 * Defines an analysis operation by the initial request model ID, poller options, and a transform to apply to the
 * eventual result,
 *
 * @internal
 */
export interface AnalysisOperationDefinition<Result = AnalyzeResult> {
  transformResult: (primitiveResult: GeneratedAnalyzeResult) => Result;
  initialModelId: string;
  options: PollerOptions<DocumentAnalysisPollOperationState<Result>> &
    AnalyzeDocumentsOptions<Result>;
}

/**
 * Converts an AnalyzeResultOperation (LRO response) to a DocumentAnalysisPollOperationState
 * @internal
 */
export function toDocumentAnalysisPollOperationState<Result>(
  definition: AnalysisOperationDefinition<Result>,
  modelId: string,
  operationId: string,
  result: AnalyzeResultOperation
): DocumentAnalysisPollOperationState<Result> {
  return {
    status: result.status,
    modelId: modelId,
    operationId,
    result: result.analyzeResult && definition.transformResult(result.analyzeResult),
    error: result.error && new FormRecognizerError(result.error),
    isCancelled: false, // Not supported
    isStarted: result.status !== "notStarted",
    isCompleted: result.status === "succeeded",
  };
}
