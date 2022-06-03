// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperationState, PollerLike } from "@azure/core-lro";
import { FormRecognizerError } from "../error";
import {
  AnalyzeResultOperationStatus as AnalyzeOperationStatus,
  AnalyzeResultOperation,
  DocumentLanguage,
  DocumentSpan,
  DocumentStyle,
  AnalyzeResult as GeneratedAnalyzeResult,
} from "../generated";
import { DocumentField, toAnalyzedDocumentFieldsFromGenerated } from "../models/fields";
import { FormRecognizerApiVersion, PollerOptions } from "../options";
import { AnalyzeDocumentOptions } from "../options/AnalyzeDocumentsOptions";
import {
  toBoundingPolygon,
  toBoundingRegions,
  toDocumentTableFromGenerated,
  toKeyValuePairFromGenerated,
} from "../transforms/polygon";
import {
  BoundingRegion,
  DocumentKeyValuePair,
  DocumentLine,
  DocumentPage,
  DocumentParagraph,
  DocumentTable,
} from "../models/documentElements";
import {
  Document as GeneratedDocument,
  DocumentLine as GeneratedDocumentLine,
  DocumentPage as GeneratedDocumentPage,
} from "../generated";

/**
 * A request input that can be uploaded as binary data to the Form Recognizer service. Form Recognizer treats `string`
 * inputs as URLs, so to send a string as a _binary_ input, first convert the string to one of the following input
 * types.
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
 * @param document - a REST-level document response object
 * @returns an AnalyzedDocument (which has had its fields mapped to stronger DocumentField types)
 */
export function toAnalyzedDocumentFromGenerated(document: GeneratedDocument): AnalyzedDocument {
  return {
    ...document,
    boundingRegions: toBoundingRegions(document.boundingRegions),
    fields: toAnalyzedDocumentFieldsFromGenerated(document.fields ?? {}),
  };
}

/**
 * The common fields of all AnalyzeResult-like types, such as LayoutResult, ReadResult, and GeneralDocumentResult.
 */
export interface AnalyzeResultCommon {
  /**
   * The service API version used to produce this result.
   */
  apiVersion: FormRecognizerApiVersion;

  /**
   * The unique ID of the model that was used to produce this result.
   */
  modelId: string;

  /**
   * A string representation of all textual and visual elements in the input, concatenated by reading order (the order
   * in which the service "reads" or extracts the textual and visual content from the document).
   */
  content: string;
}

/**
 * The result of an analysis operation. The type of the Document may be determined by the model used to perform the
 * analysis.
 */
export interface AnalyzeResult<Document = AnalyzedDocument> extends AnalyzeResultCommon {
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
   * Extracted text languages.
   */
  languages: DocumentLanguage[];

  /**
   * Extracted font styles.
   */
  styles: DocumentStyle[];

  /**
   * Extracted documents (instances of any of the model's document types and corresponding field schemas).
   */
  documents: Document[];

  /**
   * Extracted document paragraphs.
   */
  paragraphs: DocumentParagraph[];
}

/**
 * Tests if one span contains another, by testing that the outer span starts before or at the same character as the
 * inner span, and that the end position of the outer span is greater than or equal to the end position of the inner
 * span.
 *
 * @internal
 * @param outer - the outer (potentially containing) span
 * @param inner - the span to test if `outer` contains
 * @returns true if `inner` is contained inside of `outer`.
 */
export function contains(outer: DocumentSpan, inner: DocumentSpan): boolean {
  return outer.offset <= inner.offset && outer.offset + outer.length >= inner.offset + inner.length;
}

/**
 * Make an empty generator. This might seem silly, but it's useful for satisfying invariants.
 */
function* empty(): Generator<never> {
  /* intentionally empty */
}

/**
 * Produces an iterator of the given items starting from the given index.
 *
 * @param items - the items to iterate over
 * @param idx - the index of the first item to begin iterating from
 */
export function* iterFrom<T>(items: T[], idx: number): Generator<T> {
  let i = idx;

  while (i < items.length) {
    yield items[i++];
  }
}

export function toDocumentLineFromGenerated(
  generated: GeneratedDocumentLine,
  page: GeneratedDocumentPage
): DocumentLine {
  (generated as DocumentLine).words = () =>
    fastGetChildren(
      iterFrom(generated.spans, 0),
      page.words?.map((word) => {
        return { ...word, polygon: toBoundingPolygon(word.polygon) };
      }) ?? []
    );

  Object.defineProperty(generated, "words", {
    enumerable: false,
  });

  return generated as DocumentLine;
}

export function toDocumentPageFromGenerated(generated: GeneratedDocumentPage): DocumentPage {
  return {
    ...generated,
    lines: generated.lines?.map((line) => toDocumentLineFromGenerated(line, generated)),
    selectionMarks: generated.selectionMarks?.map((mark) => ({
      ...mark,
      polygon: toBoundingPolygon(mark.polygon),
    })),
    words: generated.words?.map((word) => ({
      ...word,
      polygon: toBoundingPolygon(word.polygon),
    })),
  };
}

/**
 * Binary search through an array of items to find the first item that could possibly be contained by the given span,
 * then return an iterator beginning from that item.
 *
 * This allows a program to quickly find the first relevant item in the array for consideration when testing for span
 * inclusion.
 *
 * @internal
 * @param span - the span to use when testing each individual item
 * @param items - an array of items to binary search through
 * @returns an iterator beginning from the item identified by the search
 */
export function iteratorFromFirstMatchBinarySearch<Spanned extends { span: DocumentSpan }>(
  span: DocumentSpan,
  items: Spanned[]
): IterableIterator<Spanned> {
  let idx = Math.floor(items.length / 2);
  let prevIdx = idx;
  let min = 0;
  let max = items.length;

  const found = (): boolean =>
    // The item is found if it starts after the current span and the item before it does not. That means it is the first
    // item in the array that could be a child if the spans are sorted.
    items[idx].span.offset >= span.offset && (items[idx - 1]?.span?.offset ?? -1) < span.offset;

  // Binary search to find the first element that could be a child
  do {
    if (found()) {
      return iterFrom(items, idx);
    } else if (span.offset > items[idx].span.offset) {
      min = prevIdx = idx;
      idx = Math.floor(idx + (max - idx) / 2);
    } else {
      max = prevIdx = idx;
      idx = Math.floor(idx - (idx - min) / 2);
    }
  } while (idx !== prevIdx);

  // This might seem weird, but it's a simple way to make the types a little more elegant.
  return empty();
}

/**
 * This fast algorithm tests the elements of `childArray` for inclusion in any of the given `spans`, assuming that both
 * the spans and child items are sorted.
 *
 * INVARIANT: the items in both the `spans` iterator and `childrenArray` MUST BE SORTED INCREASING by span _offset_.
 *
 * @internal
 * @param spans - the spans that contain the child elements
 * @param childrenArray - an array of child items (items that have spans) to test for inclusion in the spans
 * @returns - an IterableIterator of child items that are included in any span in the `spans` iterator
 */
export function* fastGetChildren<Spanned extends { span: DocumentSpan }>(
  spans: Iterator<DocumentSpan>,
  childrenArray: Spanned[]
): Generator<Spanned> {
  let curSpan = spans.next();

  // Need to exit early if there are no spans.
  if (curSpan.done) {
    return;
  }

  const children = iteratorFromFirstMatchBinarySearch(curSpan.value as DocumentSpan, childrenArray);
  let curChild = children.next();

  while (!(curChild.done || curSpan.done)) {
    if (contains(curSpan.value, curChild.value.span)) {
      // The span is contained, so yield the current child and advance it.
      yield curChild.value;
      curChild = children.next();
    } else if (curSpan.value.offset + curSpan.value.length < curChild.value.span.offset) {
      // The current span ends before the next potential child starts, so advance the span
      curSpan = spans.next();
    } else {
      // The current child was not contained in the current span, so advance to the next child.
      curChild = children.next();
    }
  }
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
   * The URL to the operation.
   */
  operationLocation: string;

  /**
   * The Date and Time that the operation was created.
   */
  createdOn: Date;

  /**
   * The date & time that the operation state was last modified.
   */
  lastUpdatedOn: Date;
}

/**
 * A long-running operation (poller) that tracks the state of an analysis operation, eventually producing the result
 * type that corresponds to the model.
 */
export type AnalysisPoller<Result = AnalyzeResult<AnalyzedDocument>> = PollerLike<
  DocumentAnalysisPollOperationState<Result>,
  Result
>;

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
    pages: result.pages.map((page) => toDocumentPageFromGenerated(page)),
    tables: result.tables?.map((table) => toDocumentTableFromGenerated(table)) ?? [],
    keyValuePairs: result.keyValuePairs?.map((pair) => toKeyValuePairFromGenerated(pair)) ?? [],
    languages: result.languages ?? [],
    styles: result.styles ?? [],
    documents: (result.documents?.map((doc) => mapDocuments(doc)) as Document[]) ?? [],
    paragraphs:
      result.paragraphs?.map((para) => ({
        ...para,
        boundingRegions: toBoundingRegions(para.boundingRegions),
      })) ?? [],
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
    AnalyzeDocumentOptions<Result>;
}

/**
 * Converts an AnalyzeResultOperation (LRO response) to a DocumentAnalysisPollOperationState
 * @internal
 */
export function toDocumentAnalysisPollOperationState<Result>(
  definition: AnalysisOperationDefinition<Result>,
  modelId: string,
  operationLocation: string,
  response: AnalyzeResultOperation
): DocumentAnalysisPollOperationState<Result> {
  return {
    status: response.status,
    modelId: modelId,
    lastUpdatedOn: response.lastUpdatedDateTime,
    createdOn: response.createdDateTime,
    operationLocation,
    result: response.analyzeResult && definition.transformResult(response.analyzeResult),
    error: response.error && new FormRecognizerError(response.error),
    isCancelled: false, // Not supported
    isStarted: response.status !== "notStarted",
    isCompleted: response.status === "succeeded",
  };
}
