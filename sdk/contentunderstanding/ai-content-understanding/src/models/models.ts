// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";
import type { ErrorModel } from "@azure-rest/core-client";
import { uint8ArrayToString } from "@azure/core-util";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Additional input to analyze. */
export interface AnalysisInput {
  /** The URL of the input to analyze.  Only one of url or data should be specified. */
  url?: string;
  /** Raw image bytes. Provide bytes-like object; do not base64-encode. Only one of url or data should be specified. */
  data?: Uint8Array;
  /** Name of the input. */
  name?: string;
  /** The MIME type of the input content.  Ex. application/pdf, image/jpeg, etc. */
  mimeType?: string;
  /** Range of the input to analyze (ex. `1-3,5,9-`).  Document content uses 1-based page numbers, while audio visual content uses integer milliseconds. */
  contentRange?: string;
}

export function analysisInputSerializer(item: AnalysisInput): any {
  return {
    url: item["url"],
    data: !item["data"] ? item["data"] : uint8ArrayToString(item["data"], "base64"),
    name: item["name"],
    mimeType: item["mimeType"],
    range: item["contentRange"],
  };
}

export function analysisInputArraySerializer(result: Array<AnalysisInput>): any[] {
  return result.map((item) => {
    return analysisInputSerializer(item);
  });
}

/** Provides status details for analyze operations. */
export interface ContentAnalyzerAnalyzeOperationStatus {
  /** The unique ID of the operation. */
  id: string;
  /** The status of the operation */
  status: OperationState;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
  /** The result of the operation. */
  result?: AnalysisResult;
  /** Usage details of the analyze operation. */
  usage?: UsageDetails;
}

export function contentAnalyzerAnalyzeOperationStatusDeserializer(
  item: any,
): ContentAnalyzerAnalyzeOperationStatus {
  return {
    id: item["id"],
    status: item["status"],
    error: !item["error"] ? item["error"] : item["error"],
    result: !item["result"] ? item["result"] : analysisResultDeserializer(item["result"]),
    usage: !item["usage"] ? item["usage"] : usageDetailsDeserializer(item["usage"]),
  };
}

/** Enum describing allowed operation states. */
export type OperationState = "NotStarted" | "Running" | "Succeeded" | "Failed" | "Canceled";

/** Analyze operation result. */
export interface AnalysisResult {
  /** The unique identifier of the analyzer. */
  analyzerId?: string;
  /** The version of the API used to analyze the document. */
  apiVersion?: string;
  /** The date and time when the result was created. */
  createdAt?: Date;
  /** Warnings encountered while analyzing the document. */
  warnings?: ErrorModel[];
  /**
   *   The string encoding format for content spans in the response.
   *   Possible values are 'codePoint', 'utf16', and `utf8`.  Default is `codePoint`.")
   */
  stringEncoding?: string;
  /** The extracted content. */
  contents: AnalysisContentUnion[];
}

export function analysisResultDeserializer(item: any): AnalysisResult {
  return {
    analyzerId: item["analyzerId"],
    apiVersion: item["apiVersion"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    warnings: !item["warnings"]
      ? item["warnings"]
      : item["warnings"].map((p: any) => {
          return p;
        }),
    stringEncoding: item["stringEncoding"],
    contents: analysisContentUnionArrayDeserializer(item["contents"]),
  };
}

export function analysisContentUnionArrayDeserializer(result: Array<AnalysisContentUnion>): any[] {
  return result.map((item) => {
    return analysisContentUnionDeserializer(item);
  });
}

/** Media content base class. */
export interface AnalysisContent {
  /** Content kind. */
  /** The discriminator possible values: document, audioVisual */
  kind: AnalysisContentKind;
  /** Detected MIME type of the content.  Ex. application/pdf, image/jpeg, etc. */
  mimeType: string;
  /** The analyzer that generated this content. */
  analyzerId?: string;
  /** Classified content category. */
  category?: string;
  /** The path of the content in the input. */
  path?: string;
  /** Markdown representation of the content. */
  markdown?: string;
  /** Extracted fields from the content. */
  fields?: Record<string, ContentFieldUnion>;
}

export function analysisContentDeserializer(item: any): AnalysisContent {
  return {
    kind: item["kind"],
    mimeType: item["mimeType"],
    analyzerId: item["analyzerId"],
    category: item["category"],
    path: item["path"],
    markdown: item["markdown"],
    fields: !item["fields"] ? item["fields"] : contentFieldUnionRecordDeserializer(item["fields"]),
  };
}

/** Alias for AnalysisContentUnion */
export type AnalysisContentUnion = DocumentContent | AudioVisualContent | AnalysisContent;

export function analysisContentUnionDeserializer(item: any): AnalysisContentUnion {
  switch (item["kind"]) {
    case "document":
      return documentContentDeserializer(item as DocumentContent);

    case "audioVisual":
      return audioVisualContentDeserializer(item as AudioVisualContent);

    default:
      return analysisContentDeserializer(item);
  }
}

/** Kind of media content. */
export type AnalysisContentKind = "document" | "audioVisual";

export function contentFieldUnionRecordDeserializer(
  item: Record<string, any>,
): Record<string, ContentField> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : contentFieldUnionDeserializer(item[key]);
  });
  return result;
}

/** Field extracted from the content. */
export interface ContentField {
  /** Semantic data type of the field value. */
  /** The discriminator possible values: string, date, time, number, integer, boolean, array, object, json */
  type: ContentFieldType;
  /** Span(s) associated with the field value in the markdown content. */
  spans?: ContentSpan[];
  /** Confidence of predicting the field value. */
  confidence?: number;
  /** Encoded source that identifies the position of the field value in the content. */
  source?: string;
  // CUSTOMIZATION: SDK-IMPROVEMENT: Added `value` property to provide a convenient way to access field values,
  // aligning with .NET SDK design for cross-language consistency.
  // CUSTOMIZATION: SDK-IMPROVEMENT: Use `unknown` instead of `any` for type safety.
  /** The value of the field. */
  value?: unknown;
}

export function contentFieldDeserializer(item: any): ContentField {
  return {
    type: item["type"],
    spans: !item["spans"] ? item["spans"] : contentSpanArrayDeserializer(item["spans"]),
    confidence: item["confidence"],
    source: item["source"],
    value: undefined,
  };
}

/** Alias for ContentFieldUnion */
export type ContentFieldUnion =
  | StringField
  | DateField
  | TimeField
  | NumberField
  | IntegerField
  | BooleanField
  | ArrayField
  | ObjectField
  | JsonField
  | ContentField;

export function contentFieldUnionDeserializer(item: any): ContentFieldUnion {
  switch (item["type"]) {
    case "string":
      return stringFieldDeserializer(item as StringField);

    case "date":
      return dateFieldDeserializer(item as DateField);

    case "time":
      return timeFieldDeserializer(item as TimeField);

    case "number":
      return numberFieldDeserializer(item as NumberField);

    case "integer":
      return integerFieldDeserializer(item as IntegerField);

    case "boolean":
      return booleanFieldDeserializer(item as BooleanField);

    case "array":
      return arrayFieldDeserializer(item as ArrayField);

    case "object":
      return objectFieldDeserializer(item as ObjectField);

    case "json":
      return jsonFieldDeserializer(item as JsonField);

    default:
      return contentFieldDeserializer(item);
  }
}

/** Semantic data type of the field value. */
export type ContentFieldType =
  | "string"
  | "date"
  | "time"
  | "number"
  | "integer"
  | "boolean"
  | "array"
  | "object"
  | "json";

export function contentSpanArrayDeserializer(result: Array<ContentSpan>): any[] {
  return result.map((item) => {
    return contentSpanDeserializer(item);
  });
}

/** Position of the element in markdown, specified as a character offset and length. */
export interface ContentSpan {
  /** Starting position (0-indexed) of the element in markdown, specified in characters. */
  offset: number;
  /** Length of the element in markdown, specified in characters. */
  length: number;
}

export function contentSpanDeserializer(item: any): ContentSpan {
  return {
    offset: item["offset"],
    length: item["length"],
  };
}

/** String field extracted from the content. */
export interface StringField extends ContentField {
  /** Semantic data type of the field value. */
  fieldType: "string";
  // CUSTOMIZATION: SDK-IMPROVEMENT: Replaced `valueString` with `value` for a simpler, consistent API.
  // /** String field value. */
  // valueString?: string;
  /** The value of the field. */
  value?: string;
}

export function stringFieldDeserializer(item: any): StringField {
  return {
    type: item["type"],
    spans: !item["spans"] ? item["spans"] : contentSpanArrayDeserializer(item["spans"]),
    confidence: item["confidence"],
    source: item["source"],
    fieldType: item["type"],
    // CUSTOMIZATION: SDK-IMPROVEMENT: Map `value` from wire-format `valueString`
    value: item["valueString"],
  };
}

/** Date field extracted from the content. */
export interface DateField extends ContentField {
  /** Semantic data type of the field value. */
  fieldType: "date";
  // CUSTOMIZATION: SDK-IMPROVEMENT: Replaced `valueDate` with `value` for a simpler, consistent API.
  // /** Date field value, in ISO 8601 (YYYY-MM-DD) format. */
  // valueDate?: Date;
  /** The value of the field. */
  value?: Date;
}

export function dateFieldDeserializer(item: any): DateField {
  return {
    type: item["type"],
    spans: !item["spans"] ? item["spans"] : contentSpanArrayDeserializer(item["spans"]),
    confidence: item["confidence"],
    source: item["source"],
    fieldType: item["type"],
    // CUSTOMIZATION: SDK-IMPROVEMENT: Map `value` from wire-format `valueDate`
    value: !item["valueDate"] ? item["valueDate"] : new Date(item["valueDate"]),
  };
}

/** Time field extracted from the content. */
export interface TimeField extends ContentField {
  /** Semantic data type of the field value. */
  fieldType: "time";
  // CUSTOMIZATION: SDK-IMPROVEMENT: Replaced `valueTime` with `value` for a simpler, consistent API.
  // /** Time field value, in ISO 8601 (hh:mm:ss) format. */
  // valueTime?: string;
  /** The value of the field. */
  value?: string;
}

export function timeFieldDeserializer(item: any): TimeField {
  return {
    type: item["type"],
    spans: !item["spans"] ? item["spans"] : contentSpanArrayDeserializer(item["spans"]),
    confidence: item["confidence"],
    source: item["source"],
    fieldType: item["type"],
    // CUSTOMIZATION: SDK-IMPROVEMENT: Map `value` from wire-format `valueTime`
    value: item["valueTime"],
  };
}

/** Number field extracted from the content. */
export interface NumberField extends ContentField {
  /** Semantic data type of the field value. */
  fieldType: "number";
  // CUSTOMIZATION: SDK-IMPROVEMENT: Replaced `valueNumber` with `value` for a simpler, consistent API.
  // /** Number field value. */
  // valueNumber?: number;
  /** The value of the field. */
  value?: number;
}

export function numberFieldDeserializer(item: any): NumberField {
  return {
    type: item["type"],
    spans: !item["spans"] ? item["spans"] : contentSpanArrayDeserializer(item["spans"]),
    confidence: item["confidence"],
    source: item["source"],
    fieldType: item["type"],
    // CUSTOMIZATION: SDK-IMPROVEMENT: Map `value` from wire-format `valueNumber`
    value: item["valueNumber"],
  };
}

/** Integer field extracted from the content. */
export interface IntegerField extends ContentField {
  /** Semantic data type of the field value. */
  fieldType: "integer";
  // CUSTOMIZATION: SDK-IMPROVEMENT: Replaced `valueInteger` with `value` for a simpler, consistent API.
  // /** Integer field value. */
  // valueInteger?: number;
  /** The value of the field. */
  value?: number;
}

export function integerFieldDeserializer(item: any): IntegerField {
  return {
    type: item["type"],
    spans: !item["spans"] ? item["spans"] : contentSpanArrayDeserializer(item["spans"]),
    confidence: item["confidence"],
    source: item["source"],
    fieldType: item["type"],
    // CUSTOMIZATION: SDK-IMPROVEMENT: Map `value` from wire-format `valueInteger`
    value: item["valueInteger"],
  };
}

/** Boolean field extracted from the content. */
export interface BooleanField extends ContentField {
  /** Semantic data type of the field value. */
  fieldType: "boolean";
  // CUSTOMIZATION: SDK-IMPROVEMENT: Replaced `valueBoolean` with `value` for a simpler, consistent API.
  // /** Boolean field value. */
  // valueBoolean?: boolean;
  /** The value of the field. */
  value?: boolean;
}

export function booleanFieldDeserializer(item: any): BooleanField {
  return {
    type: item["type"],
    spans: !item["spans"] ? item["spans"] : contentSpanArrayDeserializer(item["spans"]),
    confidence: item["confidence"],
    source: item["source"],
    fieldType: item["type"],
    // CUSTOMIZATION: SDK-IMPROVEMENT: Map `value` from wire-format `valueBoolean`
    value: item["valueBoolean"],
  };
}

/** Array field extracted from the content. */
export interface ArrayField extends ContentField {
  /** Semantic data type of the field value. */
  fieldType: "array";
  // CUSTOMIZATION: SDK-IMPROVEMENT: Replaced `valueArray` with `value` for a simpler, consistent API.
  // /** Array field value. */
  // valueArray?: ContentFieldUnion[];
  /** The value of the field. */
  value?: ContentFieldUnion[];
}

export function arrayFieldDeserializer(item: any): ArrayField {
  // CUSTOMIZATION: SDK-IMPROVEMENT: Map `value` from wire-format `valueArray`
  const value = !item["valueArray"]
    ? item["valueArray"]
    : contentFieldUnionArrayDeserializer(item["valueArray"]);
  return {
    type: item["type"],
    spans: !item["spans"] ? item["spans"] : contentSpanArrayDeserializer(item["spans"]),
    confidence: item["confidence"],
    source: item["source"],
    fieldType: item["type"],
    value: value,
  };
}

export function contentFieldUnionArrayDeserializer(result: Array<ContentFieldUnion>): any[] {
  return result.map((item) => {
    return contentFieldUnionDeserializer(item);
  });
}

/** Object field extracted from the content. */
export interface ObjectField extends ContentField {
  /** Semantic data type of the field value. */
  fieldType: "object";
  // CUSTOMIZATION: SDK-IMPROVEMENT: Replaced `valueObject` with `value` for a simpler, consistent API.
  // /** Object field value. */
  // valueObject?: Record<string, ContentFieldUnion>;
  /** The value of the field. */
  value?: Record<string, ContentFieldUnion>;
}

export function objectFieldDeserializer(item: any): ObjectField {
  // CUSTOMIZATION: SDK-IMPROVEMENT: Map `value` from wire-format `valueObject`
  const value = !item["valueObject"]
    ? item["valueObject"]
    : contentFieldUnionRecordDeserializer(item["valueObject"]);
  return {
    type: item["type"],
    spans: !item["spans"] ? item["spans"] : contentSpanArrayDeserializer(item["spans"]),
    confidence: item["confidence"],
    source: item["source"],
    fieldType: item["type"],
    value: value,
  };
}

/** JSON field extracted from the content. */
export interface JsonField extends ContentField {
  /** Semantic data type of the field value. */
  fieldType: "json";
  // CUSTOMIZATION: SDK-IMPROVEMENT: Replaced `valueJson` with `value` for a simpler, consistent API.
  // /** JSON field value. */
  // valueJson?: any;
  /** The value of the field. */
  value?: unknown;
}

export function jsonFieldDeserializer(item: any): JsonField {
  return {
    type: item["type"],
    spans: !item["spans"] ? item["spans"] : contentSpanArrayDeserializer(item["spans"]),
    confidence: item["confidence"],
    source: item["source"],
    fieldType: item["type"],
    // CUSTOMIZATION: SDK-IMPROVEMENT: Map `value` from wire-format `valueJson`
    value: item["valueJson"],
  };
}

/** Document content.  Ex. text/plain, application/pdf, image/jpeg. */
export interface DocumentContent extends AnalysisContent {
  /** Content kind. */
  kind: "document";
  /** Start page number (1-indexed) of the content. */
  startPageNumber: number;
  /** End page number (1-indexed) of the content. */
  endPageNumber: number;
  /**
   * Length unit used by the width, height, and source properties.
   * For images/tiff, the default unit is pixel.  For PDF, the default unit is inch.
   */
  unit?: LengthUnit;
  /** List of pages in the document. */
  pages?: DocumentPage[];
  /** List of paragraphs in the document.  Only if enableOcr and returnDetails are true. */
  paragraphs?: DocumentParagraph[];
  /** List of sections in the document.  Only if enableLayout and returnDetails are true. */
  sections?: DocumentSection[];
  /** List of tables in the document.  Only if enableLayout and returnDetails are true. */
  tables?: DocumentTable[];
  /** List of figures in the document.  Only if enableLayout and returnDetails are true. */
  figures?: DocumentFigureUnion[];
  /** List of annotations in the document.  Only if enableAnnotations and returnDetails are true. */
  annotations?: DocumentAnnotation[];
  /** List of hyperlinks in the document.  Only if returnDetails are true. */
  hyperlinks?: DocumentHyperlink[];
  /** List of detected content segments.  Only if enableSegment is true. */
  segments?: DocumentContentSegment[];
}

export function documentContentDeserializer(item: any): DocumentContent {
  return {
    kind: item["kind"],
    mimeType: item["mimeType"],
    analyzerId: item["analyzerId"],
    category: item["category"],
    path: item["path"],
    markdown: item["markdown"],
    fields: !item["fields"] ? item["fields"] : contentFieldUnionRecordDeserializer(item["fields"]),
    startPageNumber: item["startPageNumber"],
    endPageNumber: item["endPageNumber"],
    unit: item["unit"],
    pages: !item["pages"] ? item["pages"] : documentPageArrayDeserializer(item["pages"]),
    paragraphs: !item["paragraphs"]
      ? item["paragraphs"]
      : documentParagraphArrayDeserializer(item["paragraphs"]),
    sections: !item["sections"]
      ? item["sections"]
      : documentSectionArrayDeserializer(item["sections"]),
    tables: !item["tables"] ? item["tables"] : documentTableArrayDeserializer(item["tables"]),
    figures: !item["figures"]
      ? item["figures"]
      : documentFigureUnionArrayDeserializer(item["figures"]),
    annotations: !item["annotations"]
      ? item["annotations"]
      : documentAnnotationArrayDeserializer(item["annotations"]),
    hyperlinks: !item["hyperlinks"]
      ? item["hyperlinks"]
      : documentHyperlinkArrayDeserializer(item["hyperlinks"]),
    segments: !item["segments"]
      ? item["segments"]
      : documentContentSegmentArrayDeserializer(item["segments"]),
  };
}

/** Length unit used by the width, height, and source properties. */
export type LengthUnit = "pixel" | "inch";

export function documentPageArrayDeserializer(result: Array<DocumentPage>): any[] {
  return result.map((item) => {
    return documentPageDeserializer(item);
  });
}

/** Content from a document page. */
export interface DocumentPage {
  /** Page number (1-based). */
  pageNumber: number;
  /** Width of the page. */
  width?: number;
  /** Height of the page. */
  height?: number;
  /** Span(s) associated with the page in the markdown content. */
  spans?: ContentSpan[];
  /**
   * The general orientation of the content in clockwise direction,
   * measured in degrees between (-180, 180].
   * Only if enableOcr is true.
   */
  angle?: number;
  /** List of words in the page.  Only if enableOcr and returnDetails are true. */
  words?: DocumentWord[];
  /** List of lines in the page.  Only if enableOcr and returnDetails are true. */
  lines?: DocumentLine[];
  /** List of barcodes in the page.  Only if enableBarcode and returnDetails are true. */
  barcodes?: DocumentBarcode[];
  /** List of mathematical formulas in the page.  Only if enableFormula and returnDetails are true. */
  formulas?: DocumentFormula[];
}

export function documentPageDeserializer(item: any): DocumentPage {
  return {
    pageNumber: item["pageNumber"],
    width: item["width"],
    height: item["height"],
    spans: !item["spans"] ? item["spans"] : contentSpanArrayDeserializer(item["spans"]),
    angle: item["angle"],
    words: !item["words"] ? item["words"] : documentWordArrayDeserializer(item["words"]),
    lines: !item["lines"] ? item["lines"] : documentLineArrayDeserializer(item["lines"]),
    barcodes: !item["barcodes"]
      ? item["barcodes"]
      : documentBarcodeArrayDeserializer(item["barcodes"]),
    formulas: !item["formulas"]
      ? item["formulas"]
      : documentFormulaArrayDeserializer(item["formulas"]),
  };
}

export function documentWordArrayDeserializer(result: Array<DocumentWord>): any[] {
  return result.map((item) => {
    return documentWordDeserializer(item);
  });
}

/**
 * Word in a document, consisting of a contiguous sequence of characters.
 * For non-space delimited languages, such as Chinese, Japanese, and Korean,
 * each character is represented as its own word.
 */
export interface DocumentWord {
  /** Word text. */
  content: string;
  /** Encoded source that identifies the position of the word in the content. */
  source?: string;
  /** Span of the word in the markdown content. */
  span?: ContentSpan;
  /** Confidence of predicting the word. */
  confidence?: number;
}

export function documentWordDeserializer(item: any): DocumentWord {
  return {
    content: item["content"],
    source: item["source"],
    span: !item["span"] ? item["span"] : contentSpanDeserializer(item["span"]),
    confidence: item["confidence"],
  };
}

export function documentLineArrayDeserializer(result: Array<DocumentLine>): any[] {
  return result.map((item) => {
    return documentLineDeserializer(item);
  });
}

/** Line in a document, consisting of an contiguous sequence of words. */
export interface DocumentLine {
  /** Line text. */
  content: string;
  /** Encoded source that identifies the position of the line in the content. */
  source?: string;
  /** Span of the line in the markdown content. */
  span?: ContentSpan;
}

export function documentLineDeserializer(item: any): DocumentLine {
  return {
    content: item["content"],
    source: item["source"],
    span: !item["span"] ? item["span"] : contentSpanDeserializer(item["span"]),
  };
}

export function documentBarcodeArrayDeserializer(result: Array<DocumentBarcode>): any[] {
  return result.map((item) => {
    return documentBarcodeDeserializer(item);
  });
}

/** Barcode in a document. */
export interface DocumentBarcode {
  /** Barcode kind. */
  kind: DocumentBarcodeKind;
  /** Barcode value. */
  value: string;
  /** Encoded source that identifies the position of the barcode in the content. */
  source?: string;
  /** Span of the barcode in the markdown content. */
  span?: ContentSpan;
  /** Confidence of predicting the barcode. */
  confidence?: number;
}

export function documentBarcodeDeserializer(item: any): DocumentBarcode {
  return {
    kind: item["kind"],
    value: item["value"],
    source: item["source"],
    span: !item["span"] ? item["span"] : contentSpanDeserializer(item["span"]),
    confidence: item["confidence"],
  };
}

/** Barcode kind. */
export type DocumentBarcodeKind =
  | "QRCode"
  | "PDF417"
  | "UPCA"
  | "UPCE"
  | "Code39"
  | "Code128"
  | "EAN8"
  | "EAN13"
  | "DataBar"
  | "Code93"
  | "Codabar"
  | "DataBarExpanded"
  | "ITF"
  | "MicroQRCode"
  | "Aztec"
  | "DataMatrix"
  | "MaxiCode";

export function documentFormulaArrayDeserializer(result: Array<DocumentFormula>): any[] {
  return result.map((item) => {
    return documentFormulaDeserializer(item);
  });
}

/** Mathematical formula in a document. */
export interface DocumentFormula {
  /** Formula kind. */
  kind: DocumentFormulaKind;
  /** LaTex expression describing the formula. */
  value: string;
  /** Encoded source that identifies the position of the formula in the content. */
  source?: string;
  /** Span of the formula in the markdown content. */
  span?: ContentSpan;
  /** Confidence of predicting the formula. */
  confidence?: number;
}

export function documentFormulaDeserializer(item: any): DocumentFormula {
  return {
    kind: item["kind"],
    value: item["value"],
    source: item["source"],
    span: !item["span"] ? item["span"] : contentSpanDeserializer(item["span"]),
    confidence: item["confidence"],
  };
}

/** Formula kind. */
export type DocumentFormulaKind = "inline" | "display";

export function documentParagraphArrayDeserializer(result: Array<DocumentParagraph>): any[] {
  return result.map((item) => {
    return documentParagraphDeserializer(item);
  });
}

/**
 * Paragraph in a document, generally consisting of an contiguous sequence of lines
 * with common alignment and spacing.
 */
export interface DocumentParagraph {
  /** Semantic role of the paragraph. */
  role?: SemanticRole;
  /** Paragraph text. */
  content: string;
  /** Encoded source that identifies the position of the paragraph in the content. */
  source?: string;
  /** Span of the paragraph in the markdown content. */
  span?: ContentSpan;
}

export function documentParagraphDeserializer(item: any): DocumentParagraph {
  return {
    role: item["role"],
    content: item["content"],
    source: item["source"],
    span: !item["span"] ? item["span"] : contentSpanDeserializer(item["span"]),
  };
}

/** Semantic role of the paragraph. */
export type SemanticRole =
  | "pageHeader"
  | "pageFooter"
  | "pageNumber"
  | "title"
  | "sectionHeading"
  | "footnote"
  | "formulaBlock";

export function documentSectionArrayDeserializer(result: Array<DocumentSection>): any[] {
  return result.map((item) => {
    return documentSectionDeserializer(item);
  });
}

/** Section in a document. */
export interface DocumentSection {
  /** Span of the section in the markdown content. */
  span?: ContentSpan;
  /** Child elements of the section. */
  elements?: string[];
}

export function documentSectionDeserializer(item: any): DocumentSection {
  return {
    span: !item["span"] ? item["span"] : contentSpanDeserializer(item["span"]),
    elements: !item["elements"]
      ? item["elements"]
      : item["elements"].map((p: any) => {
          return p;
        }),
  };
}

export function documentTableArrayDeserializer(result: Array<DocumentTable>): any[] {
  return result.map((item) => {
    return documentTableDeserializer(item);
  });
}

/** Table in a document, consisting table cells arranged in a rectangular layout. */
export interface DocumentTable {
  /** Number of rows in the table. */
  rowCount: number;
  /** Number of columns in the table. */
  columnCount: number;
  /** Cells contained within the table. */
  cells: DocumentTableCell[];
  /** Encoded source that identifies the position of the table in the content. */
  source?: string;
  /** Span of the table in the markdown content. */
  span?: ContentSpan;
  /** Table caption. */
  caption?: DocumentCaption;
  /** List of table footnotes. */
  footnotes?: DocumentFootnote[];
  /** Semantic role of the table. */
  role?: SemanticRole;
}

export function documentTableDeserializer(item: any): DocumentTable {
  return {
    rowCount: item["rowCount"],
    columnCount: item["columnCount"],
    cells: documentTableCellArrayDeserializer(item["cells"]),
    source: item["source"],
    span: !item["span"] ? item["span"] : contentSpanDeserializer(item["span"]),
    caption: !item["caption"] ? item["caption"] : documentCaptionDeserializer(item["caption"]),
    footnotes: !item["footnotes"]
      ? item["footnotes"]
      : documentFootnoteArrayDeserializer(item["footnotes"]),
    role: item["role"],
  };
}

export function documentTableCellArrayDeserializer(result: Array<DocumentTableCell>): any[] {
  return result.map((item) => {
    return documentTableCellDeserializer(item);
  });
}

/** Table cell in a document table. */
export interface DocumentTableCell {
  /** Table cell kind. */
  kind?: DocumentTableCellKind;
  /** Row index of the cell. */
  rowIndex: number;
  /** Column index of the cell. */
  columnIndex: number;
  /** Number of rows spanned by this cell. */
  rowSpan?: number;
  /** Number of columns spanned by this cell. */
  columnSpan?: number;
  /** Content of the table cell. */
  content: string;
  /** Encoded source that identifies the position of the table cell in the content. */
  source?: string;
  /** Span of the table cell in the markdown content. */
  span?: ContentSpan;
  /** Child elements of the table cell. */
  elements?: string[];
}

export function documentTableCellDeserializer(item: any): DocumentTableCell {
  return {
    kind: item["kind"],
    rowIndex: item["rowIndex"],
    columnIndex: item["columnIndex"],
    rowSpan: item["rowSpan"],
    columnSpan: item["columnSpan"],
    content: item["content"],
    source: item["source"],
    span: !item["span"] ? item["span"] : contentSpanDeserializer(item["span"]),
    elements: !item["elements"]
      ? item["elements"]
      : item["elements"].map((p: any) => {
          return p;
        }),
  };
}

/** Table cell kind. */
export type DocumentTableCellKind =
  | "content"
  | "rowHeader"
  | "columnHeader"
  | "stubHead"
  | "description";

/** Caption of a table or figure. */
export interface DocumentCaption {
  /** Content of the caption. */
  content: string;
  /** Encoded source that identifies the position of the caption in the content. */
  source?: string;
  /** Span of the caption in the markdown content. */
  span?: ContentSpan;
  /** Child elements of the caption. */
  elements?: string[];
}

export function documentCaptionDeserializer(item: any): DocumentCaption {
  return {
    content: item["content"],
    source: item["source"],
    span: !item["span"] ? item["span"] : contentSpanDeserializer(item["span"]),
    elements: !item["elements"]
      ? item["elements"]
      : item["elements"].map((p: any) => {
          return p;
        }),
  };
}

export function documentFootnoteArrayDeserializer(result: Array<DocumentFootnote>): any[] {
  return result.map((item) => {
    return documentFootnoteDeserializer(item);
  });
}

/** Footnote of a table or figure. */
export interface DocumentFootnote {
  /** Content of the footnote. */
  content: string;
  /** Encoded source that identifies the position of the footnote in the content. */
  source?: string;
  /** Span of the footnote in the markdown content. */
  span?: ContentSpan;
  /** Child elements of the footnote. */
  elements?: string[];
}

export function documentFootnoteDeserializer(item: any): DocumentFootnote {
  return {
    content: item["content"],
    source: item["source"],
    span: !item["span"] ? item["span"] : contentSpanDeserializer(item["span"]),
    elements: !item["elements"]
      ? item["elements"]
      : item["elements"].map((p: any) => {
          return p;
        }),
  };
}

export function documentFigureUnionArrayDeserializer(result: Array<DocumentFigureUnion>): any[] {
  return result.map((item) => {
    return documentFigureUnionDeserializer(item);
  });
}

/** Figure in a document. */
export interface DocumentFigure {
  /** Figure kind. */
  /** The discriminator possible values: chart, mermaid */
  kind: DocumentFigureKind;
  /** Figure identifier. */
  id: string;
  /** Encoded source that identifies the position of the figure in the content. */
  source?: string;
  /** Span of the figure in the markdown content. */
  span?: ContentSpan;
  /** Child elements of the figure, excluding any caption or footnotes. */
  elements?: string[];
  /** Figure caption. */
  caption?: DocumentCaption;
  /** List of figure footnotes. */
  footnotes?: DocumentFootnote[];
  /** Description of the figure. */
  description?: string;
  /** Semantic role of the figure. */
  role?: SemanticRole;
}

export function documentFigureDeserializer(item: any): DocumentFigure {
  return {
    kind: item["kind"],
    id: item["id"],
    source: item["source"],
    span: !item["span"] ? item["span"] : contentSpanDeserializer(item["span"]),
    elements: !item["elements"]
      ? item["elements"]
      : item["elements"].map((p: any) => {
          return p;
        }),
    caption: !item["caption"] ? item["caption"] : documentCaptionDeserializer(item["caption"]),
    footnotes: !item["footnotes"]
      ? item["footnotes"]
      : documentFootnoteArrayDeserializer(item["footnotes"]),
    description: item["description"],
    role: item["role"],
  };
}

/** Alias for DocumentFigureUnion */
export type DocumentFigureUnion = DocumentChartFigure | DocumentMermaidFigure | DocumentFigure;

export function documentFigureUnionDeserializer(item: any): DocumentFigureUnion {
  switch (item["kind"]) {
    case "chart":
      return documentChartFigureDeserializer(item as DocumentChartFigure);

    case "mermaid":
      return documentMermaidFigureDeserializer(item as DocumentMermaidFigure);

    default:
      return documentFigureDeserializer(item);
  }
}

/** Figure kind. */
export type DocumentFigureKind = "unknown" | "chart" | "mermaid";

/** Figure containing a chart, such as a bar chart, line chart, or pie chart. */
export interface DocumentChartFigure extends DocumentFigure {
  /** Figure kind. */
  kind: "chart";
  /** Chart content represented using [Chart.js config](https://www.chartjs.org/docs/latest/configuration/). */
  content: Record<string, any>;
}

export function documentChartFigureDeserializer(item: any): DocumentChartFigure {
  return {
    kind: item["kind"],
    id: item["id"],
    source: item["source"],
    span: !item["span"] ? item["span"] : contentSpanDeserializer(item["span"]),
    elements: !item["elements"]
      ? item["elements"]
      : item["elements"].map((p: any) => {
          return p;
        }),
    caption: !item["caption"] ? item["caption"] : documentCaptionDeserializer(item["caption"]),
    footnotes: !item["footnotes"]
      ? item["footnotes"]
      : documentFootnoteArrayDeserializer(item["footnotes"]),
    description: item["description"],
    role: item["role"],
    content: Object.fromEntries(
      Object.entries(item["content"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** Figure containing a diagram, such as a flowchart or network diagram. */
export interface DocumentMermaidFigure extends DocumentFigure {
  /** Figure kind. */
  kind: "mermaid";
  /** Diagram content represented using [Mermaid syntax](https://mermaid.js.org/intro/). */
  content: string;
}

export function documentMermaidFigureDeserializer(item: any): DocumentMermaidFigure {
  return {
    kind: item["kind"],
    id: item["id"],
    source: item["source"],
    span: !item["span"] ? item["span"] : contentSpanDeserializer(item["span"]),
    elements: !item["elements"]
      ? item["elements"]
      : item["elements"].map((p: any) => {
          return p;
        }),
    caption: !item["caption"] ? item["caption"] : documentCaptionDeserializer(item["caption"]),
    footnotes: !item["footnotes"]
      ? item["footnotes"]
      : documentFootnoteArrayDeserializer(item["footnotes"]),
    description: item["description"],
    role: item["role"],
    content: item["content"],
  };
}

export function documentAnnotationArrayDeserializer(result: Array<DocumentAnnotation>): any[] {
  return result.map((item) => {
    return documentAnnotationDeserializer(item);
  });
}

/** Annotation in a document, such as a strikethrough or a comment. */
export interface DocumentAnnotation {
  /** Annotation identifier. */
  id: string;
  /** Annotation kind. */
  kind: DocumentAnnotationKind;
  /** Spans of the content associated with the annotation. */
  spans?: ContentSpan[];
  /** Position of the annotation. */
  source?: string;
  /** Comments associated with the annotation. */
  comments?: DocumentAnnotationComment[];
  /** Annotation author. */
  author?: string;
  /** Date and time when the annotation was created. */
  createdAt?: Date;
  /** Date and time when the annotation was last modified. */
  lastModifiedAt?: Date;
  /** Tags associated with the annotation. */
  tags?: string[];
}

export function documentAnnotationDeserializer(item: any): DocumentAnnotation {
  return {
    id: item["id"],
    kind: item["kind"],
    spans: !item["spans"] ? item["spans"] : contentSpanArrayDeserializer(item["spans"]),
    source: item["source"],
    comments: !item["comments"]
      ? item["comments"]
      : documentAnnotationCommentArrayDeserializer(item["comments"]),
    author: item["author"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
  };
}

/** Document annotation kind. */
export type DocumentAnnotationKind =
  | "highlight"
  | "strikethrough"
  | "underline"
  | "italic"
  | "bold"
  | "circle"
  | "note";

export function documentAnnotationCommentArrayDeserializer(
  result: Array<DocumentAnnotationComment>,
): any[] {
  return result.map((item) => {
    return documentAnnotationCommentDeserializer(item);
  });
}

/** Comment associated with a document annotation. */
export interface DocumentAnnotationComment {
  /** Comment message in Markdown. */
  message: string;
  /** Author of the comment. */
  author?: string;
  /** Date and time when the comment was created. */
  createdAt?: Date;
  /** Date and time when the comment was last modified. */
  lastModifiedAt?: Date;
  /** Tags associated with the comment. */
  tags?: string[];
}

export function documentAnnotationCommentDeserializer(item: any): DocumentAnnotationComment {
  return {
    message: item["message"],
    author: item["author"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
  };
}

export function documentHyperlinkArrayDeserializer(result: Array<DocumentHyperlink>): any[] {
  return result.map((item) => {
    return documentHyperlinkDeserializer(item);
  });
}

/** Hyperlink in a document, such as a link to a web page or an email address. */
export interface DocumentHyperlink {
  /** Hyperlinked content. */
  content: string;
  /** URL of the hyperlink. */
  url: string;
  /** Span of the hyperlink in the markdown content. */
  span?: ContentSpan;
  /** Position of the hyperlink. */
  source?: string;
}

export function documentHyperlinkDeserializer(item: any): DocumentHyperlink {
  return {
    content: item["content"],
    url: item["url"],
    span: !item["span"] ? item["span"] : contentSpanDeserializer(item["span"]),
    source: item["source"],
  };
}

export function documentContentSegmentArrayDeserializer(
  result: Array<DocumentContentSegment>,
): any[] {
  return result.map((item) => {
    return documentContentSegmentDeserializer(item);
  });
}

/** Detected document content segment. */
export interface DocumentContentSegment {
  /** Segment identifier. */
  segmentId: string;
  /** Classified content category. */
  category: string;
  /** Span of the segment in the markdown content. */
  span: ContentSpan;
  /** Start page number (1-indexed) of the segment. */
  startPageNumber: number;
  /** End page number (1-indexed) of the segment. */
  endPageNumber: number;
}

export function documentContentSegmentDeserializer(item: any): DocumentContentSegment {
  return {
    segmentId: item["segmentId"],
    category: item["category"],
    span: contentSpanDeserializer(item["span"]),
    startPageNumber: item["startPageNumber"],
    endPageNumber: item["endPageNumber"],
  };
}

/** Audio visual content.  Ex. audio/wav, video/mp4. */
export interface AudioVisualContent extends AnalysisContent {
  /** Content kind. */
  kind: "audioVisual";
  /** Start time of the content in milliseconds. */
  startTimeMs: number;
  /** End time of the content in milliseconds. */
  endTimeMs: number;
  /** Width of each video frame in pixels, if applicable. */
  width?: number;
  /** Height of each video frame in pixels, if applicable. */
  height?: number;
  /** List of camera shot changes in the video, represented by its timestamp in milliseconds.  Only if returnDetails is true. */
  cameraShotTimesMs?: number[];
  /** List of key frames in the video, represented by its timestamp in milliseconds.  Only if returnDetails is true. */
  keyFrameTimesMs?: number[];
  /** List of transcript phrases.  Only if returnDetails is true. */
  transcriptPhrases?: TranscriptPhrase[];
  /** List of detected content segments.  Only if enableSegment is true. */
  segments?: AudioVisualContentSegment[];
}

export function audioVisualContentDeserializer(item: any): AudioVisualContent {
  return {
    kind: item["kind"],
    mimeType: item["mimeType"],
    analyzerId: item["analyzerId"],
    category: item["category"],
    path: item["path"],
    markdown: item["markdown"],
    fields: !item["fields"] ? item["fields"] : contentFieldUnionRecordDeserializer(item["fields"]),
    startTimeMs: item["startTimeMs"],
    endTimeMs: item["endTimeMs"],
    width: item["width"],
    height: item["height"],
    cameraShotTimesMs: !item["cameraShotTimesMs"]
      ? item["cameraShotTimesMs"]
      : item["cameraShotTimesMs"].map((p: any) => {
          return p;
        }),
    // CUSTOMIZATION: SERVICE-FIX: Accept both `keyFrameTimesMs` (camelCase) and `KeyFrameTimesMs` (PascalCase)
    // due to a known service issue returning PascalCase for this property.
    keyFrameTimesMs: (() => {
      const val = item["keyFrameTimesMs"] ?? item["KeyFrameTimesMs"];
      return !val ? val : val.map((p: any) => p);
    })(),
    transcriptPhrases: !item["transcriptPhrases"]
      ? item["transcriptPhrases"]
      : transcriptPhraseArrayDeserializer(item["transcriptPhrases"]),
    segments: !item["segments"]
      ? item["segments"]
      : audioVisualContentSegmentArrayDeserializer(item["segments"]),
  };
}

export function transcriptPhraseArrayDeserializer(result: Array<TranscriptPhrase>): any[] {
  return result.map((item) => {
    return transcriptPhraseDeserializer(item);
  });
}

/** Transcript phrase. */
export interface TranscriptPhrase {
  /** Speaker index or name. */
  speaker?: string;
  /** Start time of the phrase in milliseconds. */
  startTimeMs: number;
  /** End time of the phrase in milliseconds. */
  endTimeMs: number;
  /** Detected locale of the phrase.  Ex. en-US. */
  locale?: string;
  /** Transcript text. */
  text: string;
  /** Confidence of predicting the phrase. */
  confidence?: number;
  /** Span of the phrase in the markdown content. */
  span?: ContentSpan;
  /** List of words in the phrase. */
  words: TranscriptWord[];
}

export function transcriptPhraseDeserializer(item: any): TranscriptPhrase {
  return {
    speaker: item["speaker"],
    startTimeMs: item["startTimeMs"],
    endTimeMs: item["endTimeMs"],
    locale: item["locale"],
    text: item["text"],
    confidence: item["confidence"],
    span: !item["span"] ? item["span"] : contentSpanDeserializer(item["span"]),
    words: transcriptWordArrayDeserializer(item["words"]),
  };
}

export function transcriptWordArrayDeserializer(result: Array<TranscriptWord>): any[] {
  return result.map((item) => {
    return transcriptWordDeserializer(item);
  });
}

/** Transcript word. */
export interface TranscriptWord {
  /** Start time of the word in milliseconds. */
  startTimeMs: number;
  /** End time of the word in milliseconds. */
  endTimeMs: number;
  /** Transcript text. */
  text: string;
  /** Span of the word in the markdown content. */
  span?: ContentSpan;
}

export function transcriptWordDeserializer(item: any): TranscriptWord {
  return {
    startTimeMs: item["startTimeMs"],
    endTimeMs: item["endTimeMs"],
    text: item["text"],
    span: !item["span"] ? item["span"] : contentSpanDeserializer(item["span"]),
  };
}

export function audioVisualContentSegmentArrayDeserializer(
  result: Array<AudioVisualContentSegment>,
): any[] {
  return result.map((item) => {
    return audioVisualContentSegmentDeserializer(item);
  });
}

/** Detected audio/visual content segment. */
export interface AudioVisualContentSegment {
  /** Segment identifier. */
  segmentId: string;
  /** Classified content category. */
  category: string;
  /** Span of the segment in the markdown content. */
  span: ContentSpan;
  /** Start time of the segment in milliseconds. */
  startTimeMs: number;
  /** End time of the segment in milliseconds. */
  endTimeMs: number;
}

export function audioVisualContentSegmentDeserializer(item: any): AudioVisualContentSegment {
  return {
    segmentId: item["segmentId"],
    category: item["category"],
    span: contentSpanDeserializer(item["span"]),
    startTimeMs: item["startTimeMs"],
    endTimeMs: item["endTimeMs"],
  };
}

/** Usage details. */
export interface UsageDetails {
  /**
   * The number of document pages processed at the minimal level.
   * For documents without explicit pages (ex. txt, html), every 3000 UTF-16 characters is counted as one page.
   */
  documentPagesMinimal?: number;
  /**
   * The number of document pages processed at the basic level.
   * For documents without explicit pages (ex. txt, html), every 3000 UTF-16 characters is counted as one page.
   */
  documentPagesBasic?: number;
  /**
   * The number of document pages processed at the standard level.
   * For documents without explicit pages (ex. txt, html), every 3000 UTF-16 characters is counted as one page.
   */
  documentPagesStandard?: number;
  /** The hours of audio processed. */
  audioHours?: number;
  /** The hours of video processed. */
  videoHours?: number;
  /** The number of contextualization tokens consumed for preparing context, generating confidence scores, source grounding, and output formatting. */
  contextualizationTokens?: number;
  /** The number of LLM and embedding tokens consumed, grouped by model (ex. GTP 4.1) and type (ex. input, cached input, output). */
  tokens?: Record<string, number>;
}

export function usageDetailsDeserializer(item: any): UsageDetails {
  return {
    documentPagesMinimal: item["documentPagesMinimal"],
    documentPagesBasic: item["documentPagesBasic"],
    documentPagesStandard: item["documentPagesStandard"],
    audioHours: item["audioHours"],
    videoHours: item["videoHours"],
    contextualizationTokens: item["contextualizationTokens"],
    tokens: !item["tokens"]
      ? item["tokens"]
      : Object.fromEntries(Object.entries(item["tokens"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Analyzer that extracts content and fields from multimodal documents. */
export interface ContentAnalyzer {
  /** The unique identifier of the analyzer. */
  readonly analyzerId: string;
  /** A description of the analyzer. */
  description?: string;
  /** Tags associated with the analyzer. */
  tags?: Record<string, string>;
  /** The status of the analyzer. */
  readonly status: ContentAnalyzerStatus;
  /** The date and time when the analyzer was created. */
  readonly createdAt: Date;
  /** The date and time when the analyzer was last modified. */
  readonly lastModifiedAt: Date;
  /** Warnings encountered while creating the analyzer. */
  readonly warnings?: ErrorModel[];
  /** The analyzer to incrementally train from. */
  baseAnalyzerId?: string;
  /** Analyzer configuration settings. */
  config?: ContentAnalyzerConfig;
  /** The schema of fields to extracted. */
  fieldSchema?: ContentFieldSchema;
  /** Indicates whether the result may contain additional fields outside of the defined schema. */
  dynamicFieldSchema?: boolean;
  /** The location where the data may be processed.  Defaults to global. */
  processingLocation?: ProcessingLocation;
  /** Additional knowledge sources used to enhance the analyzer. */
  knowledgeSources?: KnowledgeSourceUnion[];
  /**
   * Mapping of model roles to specific model names.
   * Ex. { "completion": "gpt-4.1", "embedding": "text-embedding-3-large" }.
   */
  models?: Record<string, string>;
  /** Chat completion and embedding models supported by the analyzer. */
  readonly supportedModels?: SupportedModels;
}

export function contentAnalyzerSerializer(item: ContentAnalyzer): any {
  return {
    description: item["description"],
    tags: item["tags"],
    baseAnalyzerId: item["baseAnalyzerId"],
    config: !item["config"] ? item["config"] : contentAnalyzerConfigSerializer(item["config"]),
    fieldSchema: !item["fieldSchema"]
      ? item["fieldSchema"]
      : contentFieldSchemaSerializer(item["fieldSchema"]),
    dynamicFieldSchema: item["dynamicFieldSchema"],
    processingLocation: item["processingLocation"],
    knowledgeSources: !item["knowledgeSources"]
      ? item["knowledgeSources"]
      : knowledgeSourceUnionArraySerializer(item["knowledgeSources"]),
    models: item["models"],
  };
}

export function contentAnalyzerDeserializer(item: any): ContentAnalyzer {
  return {
    analyzerId: item["analyzerId"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    status: item["status"],
    createdAt: new Date(item["createdAt"]),
    lastModifiedAt: new Date(item["lastModifiedAt"]),
    warnings: !item["warnings"]
      ? item["warnings"]
      : item["warnings"].map((p: any) => {
          return p;
        }),
    baseAnalyzerId: item["baseAnalyzerId"],
    config: !item["config"] ? item["config"] : contentAnalyzerConfigDeserializer(item["config"]),
    fieldSchema: !item["fieldSchema"]
      ? item["fieldSchema"]
      : contentFieldSchemaDeserializer(item["fieldSchema"]),
    dynamicFieldSchema: item["dynamicFieldSchema"],
    processingLocation: item["processingLocation"],
    knowledgeSources: !item["knowledgeSources"]
      ? item["knowledgeSources"]
      : knowledgeSourceUnionArrayDeserializer(item["knowledgeSources"]),
    models: !item["models"]
      ? item["models"]
      : Object.fromEntries(Object.entries(item["models"]).map(([k, p]: [string, any]) => [k, p])),
    supportedModels: !item["supportedModels"]
      ? item["supportedModels"]
      : supportedModelsDeserializer(item["supportedModels"]),
  };
}

/** Status of a resource. */
export type ContentAnalyzerStatus = "creating" | "ready" | "deleting" | "failed";

/** Configuration settings for an analyzer. */
export interface ContentAnalyzerConfig {
  /** Return all content details. */
  returnDetails?: boolean;
  /** List of locale hints for speech transcription. */
  locales?: string[];
  /** Enable optical character recognition (OCR). */
  enableOcr?: boolean;
  /** Enable layout analysis. */
  enableLayout?: boolean;
  /** Enable generation of figure description. */
  enableFigureDescription?: boolean;
  /** Enable analysis of figures, such as charts and diagrams. */
  enableFigureAnalysis?: boolean;
  /** Enable mathematical formula detection. */
  enableFormula?: boolean;
  /** Representation format of tables in analyze result markdown. */
  tableFormat?: TableFormat;
  /** Representation format of charts in analyze result markdown. */
  chartFormat?: ChartFormat;
  /** Representation format of annotations in analyze result markdown. */
  annotationFormat?: AnnotationFormat;
  /** Disable the default blurring of faces for privacy while processing the content. */
  disableFaceBlurring?: boolean;
  /** Return field grounding source and confidence. */
  estimateFieldSourceAndConfidence?: boolean;
  /** Map of categories to classify the input content(s) against. */
  contentCategories?: Record<string, ContentCategoryDefinition>;
  /** Enable segmentation of the input by contentCategories. */
  enableSegment?: boolean;
  /** Force segmentation of document content by page. */
  segmentPerPage?: boolean;
  /**
   * Omit the content for this analyzer from analyze result.
   * Only return content(s) from additional analyzers specified in contentCategories, if any.
   */
  omitContent?: boolean;
}

export function contentAnalyzerConfigSerializer(item: ContentAnalyzerConfig): any {
  return {
    returnDetails: item["returnDetails"],
    locales: !item["locales"]
      ? item["locales"]
      : item["locales"].map((p: any) => {
          return p;
        }),
    enableOcr: item["enableOcr"],
    enableLayout: item["enableLayout"],
    enableFigureDescription: item["enableFigureDescription"],
    enableFigureAnalysis: item["enableFigureAnalysis"],
    enableFormula: item["enableFormula"],
    tableFormat: item["tableFormat"],
    chartFormat: item["chartFormat"],
    annotationFormat: item["annotationFormat"],
    disableFaceBlurring: item["disableFaceBlurring"],
    estimateFieldSourceAndConfidence: item["estimateFieldSourceAndConfidence"],
    contentCategories: !item["contentCategories"]
      ? item["contentCategories"]
      : contentCategoryDefinitionRecordSerializer(item["contentCategories"]),
    enableSegment: item["enableSegment"],
    segmentPerPage: item["segmentPerPage"],
    omitContent: item["omitContent"],
  };
}

export function contentAnalyzerConfigDeserializer(item: any): ContentAnalyzerConfig {
  return {
    returnDetails: item["returnDetails"],
    locales: !item["locales"]
      ? item["locales"]
      : item["locales"].map((p: any) => {
          return p;
        }),
    enableOcr: item["enableOcr"],
    enableLayout: item["enableLayout"],
    enableFigureDescription: item["enableFigureDescription"],
    enableFigureAnalysis: item["enableFigureAnalysis"],
    enableFormula: item["enableFormula"],
    tableFormat: item["tableFormat"],
    chartFormat: item["chartFormat"],
    annotationFormat: item["annotationFormat"],
    disableFaceBlurring: item["disableFaceBlurring"],
    estimateFieldSourceAndConfidence: item["estimateFieldSourceAndConfidence"],
    contentCategories: !item["contentCategories"]
      ? item["contentCategories"]
      : contentCategoryDefinitionRecordDeserializer(item["contentCategories"]),
    enableSegment: item["enableSegment"],
    segmentPerPage: item["segmentPerPage"],
    omitContent: item["omitContent"],
  };
}

/** Representation format of tables in analyze result markdown. */
export type TableFormat = "html" | "markdown";
/** Representation format of charts in analyze result markdown. */
export type ChartFormat = "chartJs" | "markdown";
/** Representation format of annotations in analyze result markdown. */
export type AnnotationFormat = "none" | "markdown";

export function contentCategoryDefinitionRecordSerializer(
  item: Record<string, ContentCategoryDefinition>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : contentCategoryDefinitionSerializer(item[key]);
  });
  return result;
}

export function contentCategoryDefinitionRecordDeserializer(
  item: Record<string, any>,
): Record<string, ContentCategoryDefinition> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : contentCategoryDefinitionDeserializer(item[key]);
  });
  return result;
}

/** Content category definition. */
export interface ContentCategoryDefinition {
  /** The description of the category. */
  description?: string;
  /** Optional analyzer used to process the content. */
  analyzerId?: string;
  /** Optional inline definition of analyzer used to process the content. */
  analyzer?: ContentAnalyzer;
}

export function contentCategoryDefinitionSerializer(item: ContentCategoryDefinition): any {
  return {
    description: item["description"],
    analyzerId: item["analyzerId"],
    analyzer: !item["analyzer"] ? item["analyzer"] : contentAnalyzerSerializer(item["analyzer"]),
  };
}

export function contentCategoryDefinitionDeserializer(item: any): ContentCategoryDefinition {
  return {
    description: item["description"],
    analyzerId: item["analyzerId"],
    analyzer: !item["analyzer"] ? item["analyzer"] : contentAnalyzerDeserializer(item["analyzer"]),
  };
}

/** Schema of fields to be extracted from documents. */
export interface ContentFieldSchema {
  /** The name of the field schema. */
  name?: string;
  /** A description of the field schema. */
  description?: string;
  /** The fields defined in the schema. */
  fields: Record<string, ContentFieldDefinition>;
  /** Additional definitions referenced by the fields in the schema. */
  definitions?: Record<string, ContentFieldDefinition>;
}

export function contentFieldSchemaSerializer(item: ContentFieldSchema): any {
  return {
    name: item["name"],
    description: item["description"],
    fields: contentFieldDefinitionRecordSerializer(item["fields"]),
    definitions: !item["definitions"]
      ? item["definitions"]
      : contentFieldDefinitionRecordSerializer(item["definitions"]),
  };
}

export function contentFieldSchemaDeserializer(item: any): ContentFieldSchema {
  return {
    name: item["name"],
    description: item["description"],
    fields: contentFieldDefinitionRecordDeserializer(item["fields"]),
    definitions: !item["definitions"]
      ? item["definitions"]
      : contentFieldDefinitionRecordDeserializer(item["definitions"]),
  };
}

export function contentFieldDefinitionRecordSerializer(
  item: Record<string, ContentFieldDefinition>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : contentFieldDefinitionSerializer(item[key]);
  });
  return result;
}

export function contentFieldDefinitionRecordDeserializer(
  item: Record<string, any>,
): Record<string, ContentFieldDefinition> {
  // CUSTOMIZATION: EMITTER-FIX: Added null/undefined guard to prevent runtime error when
  // `definitions` property in `ContentFieldSchema` is optional and not present.
  if (!item) {
    return item;
  }
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : contentFieldDefinitionDeserializer(item[key]);
  });
  return result;
}

/** Definition of the field using a JSON Schema like syntax. */
export interface ContentFieldDefinition {
  /** Generation method. */
  method?: GenerationMethod;
  /** Semantic data type of the field value. */
  type?: ContentFieldType;
  /** Field description. */
  description?: string;
  /** Field type schema of each array element, if type is array. */
  itemDefinition?: ContentFieldDefinition;
  /** Named sub-fields, if type is object. */
  properties?: Record<string, ContentFieldDefinition>;
  /** Examples of field values. */
  examples?: string[];
  /** Enumeration of possible field values. */
  enum?: string[];
  /** Descriptions for each enumeration value. */
  enumDescriptions?: Record<string, string>;
  /** Reference to another field definition. */
  ref?: string;
  /** Return grounding source and confidence. */
  estimateSourceAndConfidence?: boolean;
}

export function contentFieldDefinitionSerializer(item: ContentFieldDefinition): any {
  return {
    method: item["method"],
    type: item["type"],
    description: item["description"],
    items: !item["itemDefinition"]
      ? item["itemDefinition"]
      : contentFieldDefinitionSerializer(item["itemDefinition"]),
    properties: !item["properties"]
      ? item["properties"]
      : contentFieldDefinitionRecordSerializer(item["properties"]),
    examples: !item["examples"]
      ? item["examples"]
      : item["examples"].map((p: any) => {
          return p;
        }),
    enum: !item["enum"]
      ? item["enum"]
      : item["enum"].map((p: any) => {
          return p;
        }),
    enumDescriptions: item["enumDescriptions"],
    $ref: item["ref"],
    estimateSourceAndConfidence: item["estimateSourceAndConfidence"],
  };
}

export function contentFieldDefinitionDeserializer(item: any): ContentFieldDefinition {
  return {
    method: item["method"],
    type: item["type"],
    description: item["description"],
    itemDefinition: !item["items"]
      ? item["items"]
      : contentFieldDefinitionDeserializer(item["items"]),
    properties: !item["properties"]
      ? item["properties"]
      : contentFieldDefinitionRecordDeserializer(item["properties"]),
    examples: !item["examples"]
      ? item["examples"]
      : item["examples"].map((p: any) => {
          return p;
        }),
    enum: !item["enum"]
      ? item["enum"]
      : item["enum"].map((p: any) => {
          return p;
        }),
    enumDescriptions: !item["enumDescriptions"]
      ? item["enumDescriptions"]
      : Object.fromEntries(
          Object.entries(item["enumDescriptions"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    ref: item["$ref"],
    estimateSourceAndConfidence: item["estimateSourceAndConfidence"],
  };
}

/** Generation method. */
export type GenerationMethod = "generate" | "extract" | "classify";
/** The location where the data may be processed. */
export type ProcessingLocation = "geography" | "dataZone" | "global";

export function knowledgeSourceUnionArraySerializer(result: Array<KnowledgeSourceUnion>): any[] {
  return result.map((item) => {
    return knowledgeSourceUnionSerializer(item);
  });
}

export function knowledgeSourceUnionArrayDeserializer(result: Array<KnowledgeSourceUnion>): any[] {
  return result.map((item) => {
    return knowledgeSourceUnionDeserializer(item);
  });
}

/** Knowledge source. */
export interface KnowledgeSource {
  /** The kind of knowledge source. */
  /** The discriminator possible values: labeledData */
  kind: KnowledgeSourceKind;
}

export function knowledgeSourceSerializer(item: KnowledgeSource): any {
  return { kind: item["kind"] };
}

export function knowledgeSourceDeserializer(item: any): KnowledgeSource {
  return {
    kind: item["kind"],
  };
}

/** Alias for KnowledgeSourceUnion */
export type KnowledgeSourceUnion = LabeledDataKnowledgeSource | KnowledgeSource;

export function knowledgeSourceUnionSerializer(item: KnowledgeSourceUnion): any {
  switch (item.kind) {
    case "labeledData":
      return labeledDataKnowledgeSourceSerializer(item as LabeledDataKnowledgeSource);

    default:
      return knowledgeSourceSerializer(item);
  }
}

export function knowledgeSourceUnionDeserializer(item: any): KnowledgeSourceUnion {
  switch (item["kind"]) {
    case "labeledData":
      return labeledDataKnowledgeSourceDeserializer(item as LabeledDataKnowledgeSource);

    default:
      return knowledgeSourceDeserializer(item);
  }
}

/** Knowledge source kind. */
export type KnowledgeSourceKind = "labeledData";

/** Labeled data knowledge source. */
export interface LabeledDataKnowledgeSource extends KnowledgeSource {
  /** A blob container containing labeled data. */
  kind: "labeledData";
  /** The URL of the blob container containing labeled data. */
  containerUrl: string;
  /** An optional prefix to filter blobs within the container. */
  prefix?: string;
  /** An optional path to a file listing specific blobs to include. */
  fileListPath: string;
}

export function labeledDataKnowledgeSourceSerializer(item: LabeledDataKnowledgeSource): any {
  return {
    kind: item["kind"],
    containerUrl: item["containerUrl"],
    prefix: item["prefix"],
    fileListPath: item["fileListPath"],
  };
}

export function labeledDataKnowledgeSourceDeserializer(item: any): LabeledDataKnowledgeSource {
  return {
    kind: item["kind"],
    containerUrl: item["containerUrl"],
    prefix: item["prefix"],
    fileListPath: item["fileListPath"],
  };
}

/** Chat completion and embedding models supported by the analyzer. */
export interface SupportedModels {
  /** Chat completion models supported by the analyzer. */
  completion?: string[];
  /** Embedding models supported by the analyzer. */
  embedding?: string[];
}

export function supportedModelsDeserializer(item: any): SupportedModels {
  return {
    completion: !item["completion"]
      ? item["completion"]
      : item["completion"].map((p: any) => {
          return p;
        }),
    embedding: !item["embedding"]
      ? item["embedding"]
      : item["embedding"].map((p: any) => {
          return p;
        }),
  };
}

/** Provides status details for analyzer creation operations. */
export interface ContentAnalyzerOperationStatus {
  /** The unique ID of the operation. */
  id: string;
  /** The status of the operation */
  status: OperationState;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
  /** The result of the operation. */
  result?: ContentAnalyzer;
  /** Usage details of the analyzer creation operation. */
  usage?: UsageDetails;
}

export function contentAnalyzerOperationStatusDeserializer(
  item: any,
): ContentAnalyzerOperationStatus {
  return {
    id: item["id"],
    status: item["status"],
    error: !item["error"] ? item["error"] : item["error"],
    result: !item["result"] ? item["result"] : contentAnalyzerDeserializer(item["result"]),
    usage: !item["usage"] ? item["usage"] : usageDetailsDeserializer(item["usage"]),
  };
}

/** Default settings for this Content Understanding resource. */
export interface ContentUnderstandingDefaults {
  /** Specify the default mapping of model names to LLM/embedding deployments in Microsoft Foundry. For details and current semantics, see https://aka.ms/cudoc-quickstart-rest. */
  modelDeployments: Record<string, string>;
}

export function contentUnderstandingDefaultsDeserializer(item: any): ContentUnderstandingDefaults {
  return {
    modelDeployments: Object.fromEntries(
      Object.entries(item["modelDeployments"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** Copy authorization details for cross-resource copy. */
export interface CopyAuthorization {
  /** Full path of the source analyzer. */
  source: string;
  /** Azure resource ID of the target location to copy to. */
  targetAzureResourceId: string;
  /** Date/time when the copy authorization expires. */
  expiresAt: Date;
}

export function copyAuthorizationDeserializer(item: any): CopyAuthorization {
  return {
    source: item["source"],
    targetAzureResourceId: item["targetAzureResourceId"],
    expiresAt: new Date(item["expiresAt"]),
  };
}

/** Paged collection of ContentAnalyzer items */
export interface _PagedContentAnalyzer {
  /** The ContentAnalyzer items on this page */
  value: ContentAnalyzer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedContentAnalyzerDeserializer(item: any): _PagedContentAnalyzer {
  return {
    value: contentAnalyzerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function contentAnalyzerArraySerializer(result: Array<ContentAnalyzer>): any[] {
  return result.map((item) => {
    return contentAnalyzerSerializer(item);
  });
}

export function contentAnalyzerArrayDeserializer(result: Array<ContentAnalyzer>): any[] {
  return result.map((item) => {
    return contentAnalyzerDeserializer(item);
  });
}

/** model interface RecordMergePatchUpdate */
export interface RecordMergePatchUpdate {
  /** Additional properties */
  additionalProperties?: Record<string, string>;
}

export function recordMergePatchUpdateSerializer(item: RecordMergePatchUpdate): any {
  return { ...serializeRecord(item.additionalProperties ?? {}) };
}

/** Service API versions. */
export enum KnownVersions {
  /** The 2025-11-01 version of the Content Understanding service. */
  V20251101 = "2025-11-01",
}
