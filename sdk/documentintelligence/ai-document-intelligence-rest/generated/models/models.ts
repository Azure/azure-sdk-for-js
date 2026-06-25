// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NodeReadableStream } from "../static-helpers/platform-types.js";
import { uint8ArrayToString } from "@azure/core-util";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Document analysis parameters. */
export interface AnalyzeDocumentRequest {
  /** Document URL to analyze.  Either urlSource or base64Source must be specified. */
  urlSource?: string;
  /**
   * Base64 encoding of the document to analyze.  Either urlSource or base64Source
   * must be specified.
   */
  base64Source?: Uint8Array;
}

export function analyzeDocumentRequestSerializer(item: AnalyzeDocumentRequest): any {
  return {
    urlSource: item["urlSource"],
    base64Source: !item["base64Source"]
      ? item["base64Source"]
      : uint8ArrayToString(item["base64Source"], "base64"),
  };
}

/** Error response object. */
export interface DocumentIntelligenceErrorResponse {
  /** Error info. */
  error: DocumentIntelligenceError;
}

export function documentIntelligenceErrorResponseDeserializer(
  item: any,
): DocumentIntelligenceErrorResponse {
  return {
    error: documentIntelligenceErrorDeserializer(item["error"]),
  };
}

/** The error object. */
export interface DocumentIntelligenceError {
  /** One of a server-defined set of error codes. */
  code: string;
  /** A human-readable representation of the error. */
  message: string;
  /** The target of the error. */
  target?: string;
  /** An array of details about specific errors that led to this reported error. */
  details?: DocumentIntelligenceError[];
  /** An object containing more specific information than the current object about the error. */
  innererror?: DocumentIntelligenceInnerError;
}

export function documentIntelligenceErrorDeserializer(item: any): DocumentIntelligenceError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : documentIntelligenceErrorArrayDeserializer(item["details"]),
    innererror: !item["innererror"]
      ? item["innererror"]
      : documentIntelligenceInnerErrorDeserializer(item["innererror"]),
  };
}

export function documentIntelligenceErrorArrayDeserializer(
  result: Array<DocumentIntelligenceError>,
): any[] {
  return result.map((item) => {
    return documentIntelligenceErrorDeserializer(item);
  });
}

/** An object containing more specific information about the error. */
export interface DocumentIntelligenceInnerError {
  /** One of a server-defined set of error codes. */
  code?: string;
  /** A human-readable representation of the error. */
  message?: string;
  /** Inner error. */
  innererror?: DocumentIntelligenceInnerError;
}

export function documentIntelligenceInnerErrorDeserializer(
  item: any,
): DocumentIntelligenceInnerError {
  return {
    code: item["code"],
    message: item["message"],
    innererror: !item["innererror"]
      ? item["innererror"]
      : documentIntelligenceInnerErrorDeserializer(item["innererror"]),
  };
}

/** Document analysis result. */
export interface AnalyzeResult {
  /** API version used to produce this result. */
  apiVersion: string;
  /** Document model ID used to produce this result. */
  modelId: string;
  /** Method used to compute string offset and length. */
  stringIndexType: StringIndexType;
  /** Format of the analyze result top-level content. */
  contentFormat?: DocumentContentFormat;
  /**
   * Concatenate string representation of all textual and visual elements in reading
   * order.
   */
  content: string;
  /** Analyzed pages. */
  pages: DocumentPage[];
  /** Extracted paragraphs. */
  paragraphs?: DocumentParagraph[];
  /** Extracted tables. */
  tables?: DocumentTable[];
  /** Extracted figures. */
  figures?: DocumentFigure[];
  /** Extracted sections. */
  sections?: DocumentSection[];
  /** Extracted key-value pairs. */
  keyValuePairs?: DocumentKeyValuePair[];
  /** Extracted font styles. */
  styles?: DocumentStyle[];
  /** Detected languages. */
  languages?: DocumentLanguage[];
  /** Extracted documents. */
  documents?: AnalyzedDocument[];
  /** List of warnings encountered. */
  warnings?: DocumentIntelligenceWarning[];
}

export function analyzeResultDeserializer(item: any): AnalyzeResult {
  return {
    apiVersion: item["apiVersion"],
    modelId: item["modelId"],
    stringIndexType: item["stringIndexType"],
    contentFormat: item["contentFormat"],
    content: item["content"],
    pages: documentPageArrayDeserializer(item["pages"]),
    paragraphs: !item["paragraphs"]
      ? item["paragraphs"]
      : documentParagraphArrayDeserializer(item["paragraphs"]),
    tables: !item["tables"] ? item["tables"] : documentTableArrayDeserializer(item["tables"]),
    figures: !item["figures"] ? item["figures"] : documentFigureArrayDeserializer(item["figures"]),
    sections: !item["sections"]
      ? item["sections"]
      : documentSectionArrayDeserializer(item["sections"]),
    keyValuePairs: !item["keyValuePairs"]
      ? item["keyValuePairs"]
      : documentKeyValuePairArrayDeserializer(item["keyValuePairs"]),
    styles: !item["styles"] ? item["styles"] : documentStyleArrayDeserializer(item["styles"]),
    languages: !item["languages"]
      ? item["languages"]
      : documentLanguageArrayDeserializer(item["languages"]),
    documents: !item["documents"]
      ? item["documents"]
      : analyzedDocumentArrayDeserializer(item["documents"]),
    warnings: !item["warnings"]
      ? item["warnings"]
      : documentIntelligenceWarningArrayDeserializer(item["warnings"]),
  };
}

/** Method used to compute string offset and length. */
export type StringIndexType = "textElements" | "unicodeCodePoint" | "utf16CodeUnit";
/** Format of the content in analyzed result. */
export type DocumentContentFormat = "text" | "markdown";

export function documentPageArrayDeserializer(result: Array<DocumentPage>): any[] {
  return result.map((item) => {
    return documentPageDeserializer(item);
  });
}

/** Content and layout elements extracted from a page from the input. */
export interface DocumentPage {
  /** 1-based page number in the input document. */
  pageNumber: number;
  /**
   * The general orientation of the content in clockwise direction, measured in
   * degrees between (-180, 180].
   */
  angle?: number;
  /** The width of the image/PDF in pixels/inches, respectively. */
  width?: number;
  /** The height of the image/PDF in pixels/inches, respectively. */
  height?: number;
  /**
   * The unit used by the width, height, and polygon properties. For images, the
   * unit is "pixel". For PDF, the unit is "inch".
   */
  unit?: LengthUnit;
  /** Location of the page in the reading order concatenated content. */
  spans: DocumentSpan[];
  /** Extracted words from the page. */
  words?: DocumentWord[];
  /** Extracted selection marks from the page. */
  selectionMarks?: DocumentSelectionMark[];
  /**
   * Extracted lines from the page, potentially containing both textual and visual
   * elements.
   */
  lines?: DocumentLine[];
  /** Extracted barcodes from the page. */
  barcodes?: DocumentBarcode[];
  /** Extracted formulas from the page. */
  formulas?: DocumentFormula[];
}

export function documentPageDeserializer(item: any): DocumentPage {
  return {
    pageNumber: item["pageNumber"],
    angle: item["angle"],
    width: item["width"],
    height: item["height"],
    unit: item["unit"],
    spans: documentSpanArrayDeserializer(item["spans"]),
    words: !item["words"] ? item["words"] : documentWordArrayDeserializer(item["words"]),
    selectionMarks: !item["selectionMarks"]
      ? item["selectionMarks"]
      : documentSelectionMarkArrayDeserializer(item["selectionMarks"]),
    lines: !item["lines"] ? item["lines"] : documentLineArrayDeserializer(item["lines"]),
    barcodes: !item["barcodes"]
      ? item["barcodes"]
      : documentBarcodeArrayDeserializer(item["barcodes"]),
    formulas: !item["formulas"]
      ? item["formulas"]
      : documentFormulaArrayDeserializer(item["formulas"]),
  };
}

/** The unit used by the width, height, and polygon properties. For images, the unit is "pixel". For PDF, the unit is "inch". */
export type LengthUnit = "pixel" | "inch";

export function documentSpanArrayDeserializer(result: Array<DocumentSpan>): any[] {
  return result.map((item) => {
    return documentSpanDeserializer(item);
  });
}

/**
 * Contiguous region of the concatenated content property, specified as an offset
 * and length.
 */
export interface DocumentSpan {
  /** Zero-based index of the content represented by the span. */
  offset: number;
  /** Number of characters in the content represented by the span. */
  length: number;
}

export function documentSpanDeserializer(item: any): DocumentSpan {
  return {
    offset: item["offset"],
    length: item["length"],
  };
}

export function documentWordArrayDeserializer(result: Array<DocumentWord>): any[] {
  return result.map((item) => {
    return documentWordDeserializer(item);
  });
}

/**
 * A word object consisting of a contiguous sequence of characters.  For non-space
 * delimited languages, such as Chinese, Japanese, and Korean, each character is
 * represented as its own word.
 */
export interface DocumentWord {
  /** Text content of the word. */
  content: string;
  /**
   * Bounding polygon of the word, with coordinates specified relative to the
   * top-left of the page. The numbers represent the x, y values of the polygon
   * vertices, clockwise from the left (-180 degrees inclusive) relative to the
   * element orientation.
   */
  polygon?: number[];
  /** Location of the word in the reading order concatenated content. */
  span: DocumentSpan;
  /** Confidence of correctly extracting the word. */
  confidence: number;
}

export function documentWordDeserializer(item: any): DocumentWord {
  return {
    content: item["content"],
    polygon: !item["polygon"]
      ? item["polygon"]
      : item["polygon"].map((p: any) => {
          return p;
        }),
    span: documentSpanDeserializer(item["span"]),
    confidence: item["confidence"],
  };
}

export function documentSelectionMarkArrayDeserializer(
  result: Array<DocumentSelectionMark>,
): any[] {
  return result.map((item) => {
    return documentSelectionMarkDeserializer(item);
  });
}

/**
 * A selection mark object representing check boxes, radio buttons, and other
 * elements indicating a selection.
 */
export interface DocumentSelectionMark {
  /** State of the selection mark. */
  state: DocumentSelectionMarkState;
  /**
   * Bounding polygon of the selection mark, with coordinates specified relative
   * to the top-left of the page. The numbers represent the x, y values of the
   * polygon vertices, clockwise from the left (-180 degrees inclusive) relative
   * to the element orientation.
   */
  polygon?: number[];
  /** Location of the selection mark in the reading order concatenated content. */
  span: DocumentSpan;
  /** Confidence of correctly extracting the selection mark. */
  confidence: number;
}

export function documentSelectionMarkDeserializer(item: any): DocumentSelectionMark {
  return {
    state: item["state"],
    polygon: !item["polygon"]
      ? item["polygon"]
      : item["polygon"].map((p: any) => {
          return p;
        }),
    span: documentSpanDeserializer(item["span"]),
    confidence: item["confidence"],
  };
}

/** State of the selection mark. */
export type DocumentSelectionMarkState = "selected" | "unselected";

export function documentLineArrayDeserializer(result: Array<DocumentLine>): any[] {
  return result.map((item) => {
    return documentLineDeserializer(item);
  });
}

/**
 * A content line object consisting of an adjacent sequence of content elements,
 * such as words and selection marks.
 */
export interface DocumentLine {
  /** Concatenated content of the contained elements in reading order. */
  content: string;
  /**
   * Bounding polygon of the line, with coordinates specified relative to the
   * top-left of the page. The numbers represent the x, y values of the polygon
   * vertices, clockwise from the left (-180 degrees inclusive) relative to the
   * element orientation.
   */
  polygon?: number[];
  /** Location of the line in the reading order concatenated content. */
  spans: DocumentSpan[];
}

export function documentLineDeserializer(item: any): DocumentLine {
  return {
    content: item["content"],
    polygon: !item["polygon"]
      ? item["polygon"]
      : item["polygon"].map((p: any) => {
          return p;
        }),
    spans: documentSpanArrayDeserializer(item["spans"]),
  };
}

export function documentBarcodeArrayDeserializer(result: Array<DocumentBarcode>): any[] {
  return result.map((item) => {
    return documentBarcodeDeserializer(item);
  });
}

/** A barcode object. */
export interface DocumentBarcode {
  /** Barcode kind. */
  kind: DocumentBarcodeKind;
  /** Barcode value. */
  value: string;
  /**
   * Bounding polygon of the barcode, with coordinates specified relative to the
   * top-left of the page. The numbers represent the x, y values of the polygon
   * vertices, clockwise from the left (-180 degrees inclusive) relative to the
   * element orientation.
   */
  polygon?: number[];
  /** Location of the barcode in the reading order concatenated content. */
  span: DocumentSpan;
  /** Confidence of correctly extracting the barcode. */
  confidence: number;
}

export function documentBarcodeDeserializer(item: any): DocumentBarcode {
  return {
    kind: item["kind"],
    value: item["value"],
    polygon: !item["polygon"]
      ? item["polygon"]
      : item["polygon"].map((p: any) => {
          return p;
        }),
    span: documentSpanDeserializer(item["span"]),
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

/** A formula object. */
export interface DocumentFormula {
  /** Formula kind. */
  kind: DocumentFormulaKind;
  /** LaTex expression describing the formula. */
  value: string;
  /**
   * Bounding polygon of the formula, with coordinates specified relative to the
   * top-left of the page. The numbers represent the x, y values of the polygon
   * vertices, clockwise from the left (-180 degrees inclusive) relative to the
   * element orientation.
   */
  polygon?: number[];
  /** Location of the formula in the reading order concatenated content. */
  span: DocumentSpan;
  /** Confidence of correctly extracting the formula. */
  confidence: number;
}

export function documentFormulaDeserializer(item: any): DocumentFormula {
  return {
    kind: item["kind"],
    value: item["value"],
    polygon: !item["polygon"]
      ? item["polygon"]
      : item["polygon"].map((p: any) => {
          return p;
        }),
    span: documentSpanDeserializer(item["span"]),
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
 * A paragraph object consisting with contiguous lines generally with common
 * alignment and spacing.
 */
export interface DocumentParagraph {
  /** Semantic role of the paragraph. */
  role?: ParagraphRole;
  /** Concatenated content of the paragraph in reading order. */
  content: string;
  /** Bounding regions covering the paragraph. */
  boundingRegions?: BoundingRegion[];
  /** Location of the paragraph in the reading order concatenated content. */
  spans: DocumentSpan[];
}

export function documentParagraphDeserializer(item: any): DocumentParagraph {
  return {
    role: item["role"],
    content: item["content"],
    boundingRegions: !item["boundingRegions"]
      ? item["boundingRegions"]
      : boundingRegionArrayDeserializer(item["boundingRegions"]),
    spans: documentSpanArrayDeserializer(item["spans"]),
  };
}

/** Semantic role of the paragraph. */
export type ParagraphRole =
  | "pageHeader"
  | "pageFooter"
  | "pageNumber"
  | "title"
  | "sectionHeading"
  | "footnote"
  | "formulaBlock";

export function boundingRegionArrayDeserializer(result: Array<BoundingRegion>): any[] {
  return result.map((item) => {
    return boundingRegionDeserializer(item);
  });
}

/** Bounding polygon on a specific page of the input. */
export interface BoundingRegion {
  /** 1-based page number of page containing the bounding region. */
  pageNumber: number;
  /**
   * Bounding polygon on the page, or the entire page if not specified.
   * Coordinates specified relative to the top-left of the page. The numbers
   * represent the x, y values of the polygon vertices, clockwise from the left
   * (-180 degrees inclusive) relative to the element orientation.
   */
  polygon: number[];
}

export function boundingRegionDeserializer(item: any): BoundingRegion {
  return {
    pageNumber: item["pageNumber"],
    polygon: item["polygon"].map((p: any) => {
      return p;
    }),
  };
}

export function documentTableArrayDeserializer(result: Array<DocumentTable>): any[] {
  return result.map((item) => {
    return documentTableDeserializer(item);
  });
}

/** A table object consisting table cells arranged in a rectangular layout. */
export interface DocumentTable {
  /** Number of rows in the table. */
  rowCount: number;
  /** Number of columns in the table. */
  columnCount: number;
  /** Cells contained within the table. */
  cells: DocumentTableCell[];
  /** Bounding regions covering the table. */
  boundingRegions?: BoundingRegion[];
  /** Location of the table in the reading order concatenated content. */
  spans: DocumentSpan[];
  /** Caption associated with the table. */
  caption?: DocumentCaption;
  /** List of footnotes associated with the table. */
  footnotes?: DocumentFootnote[];
}

export function documentTableDeserializer(item: any): DocumentTable {
  return {
    rowCount: item["rowCount"],
    columnCount: item["columnCount"],
    cells: documentTableCellArrayDeserializer(item["cells"]),
    boundingRegions: !item["boundingRegions"]
      ? item["boundingRegions"]
      : boundingRegionArrayDeserializer(item["boundingRegions"]),
    spans: documentSpanArrayDeserializer(item["spans"]),
    caption: !item["caption"] ? item["caption"] : documentCaptionDeserializer(item["caption"]),
    footnotes: !item["footnotes"]
      ? item["footnotes"]
      : documentFootnoteArrayDeserializer(item["footnotes"]),
  };
}

export function documentTableCellArrayDeserializer(result: Array<DocumentTableCell>): any[] {
  return result.map((item) => {
    return documentTableCellDeserializer(item);
  });
}

/** An object representing the location and content of a table cell. */
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
  /** Concatenated content of the table cell in reading order. */
  content: string;
  /** Bounding regions covering the table cell. */
  boundingRegions?: BoundingRegion[];
  /** Location of the table cell in the reading order concatenated content. */
  spans: DocumentSpan[];
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
    boundingRegions: !item["boundingRegions"]
      ? item["boundingRegions"]
      : boundingRegionArrayDeserializer(item["boundingRegions"]),
    spans: documentSpanArrayDeserializer(item["spans"]),
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

/** A caption object describing a table or figure. */
export interface DocumentCaption {
  /** Content of the caption. */
  content: string;
  /** Bounding regions covering the caption. */
  boundingRegions?: BoundingRegion[];
  /** Location of the caption in the reading order concatenated content. */
  spans: DocumentSpan[];
  /** Child elements of the caption. */
  elements?: string[];
}

export function documentCaptionDeserializer(item: any): DocumentCaption {
  return {
    content: item["content"],
    boundingRegions: !item["boundingRegions"]
      ? item["boundingRegions"]
      : boundingRegionArrayDeserializer(item["boundingRegions"]),
    spans: documentSpanArrayDeserializer(item["spans"]),
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

/** A footnote object describing a table or figure. */
export interface DocumentFootnote {
  /** Content of the footnote. */
  content: string;
  /** Bounding regions covering the footnote. */
  boundingRegions?: BoundingRegion[];
  /** Location of the footnote in the reading order concatenated content. */
  spans: DocumentSpan[];
  /** Child elements of the footnote. */
  elements?: string[];
}

export function documentFootnoteDeserializer(item: any): DocumentFootnote {
  return {
    content: item["content"],
    boundingRegions: !item["boundingRegions"]
      ? item["boundingRegions"]
      : boundingRegionArrayDeserializer(item["boundingRegions"]),
    spans: documentSpanArrayDeserializer(item["spans"]),
    elements: !item["elements"]
      ? item["elements"]
      : item["elements"].map((p: any) => {
          return p;
        }),
  };
}

export function documentFigureArrayDeserializer(result: Array<DocumentFigure>): any[] {
  return result.map((item) => {
    return documentFigureDeserializer(item);
  });
}

/** An object representing a figure in the document. */
export interface DocumentFigure {
  /** Bounding regions covering the figure. */
  boundingRegions?: BoundingRegion[];
  /** Location of the figure in the reading order concatenated content. */
  spans: DocumentSpan[];
  /** Child elements of the figure, excluding any caption or footnotes. */
  elements?: string[];
  /** Caption associated with the figure. */
  caption?: DocumentCaption;
  /** List of footnotes associated with the figure. */
  footnotes?: DocumentFootnote[];
  /** Figure ID. */
  id?: string;
}

export function documentFigureDeserializer(item: any): DocumentFigure {
  return {
    boundingRegions: !item["boundingRegions"]
      ? item["boundingRegions"]
      : boundingRegionArrayDeserializer(item["boundingRegions"]),
    spans: documentSpanArrayDeserializer(item["spans"]),
    elements: !item["elements"]
      ? item["elements"]
      : item["elements"].map((p: any) => {
          return p;
        }),
    caption: !item["caption"] ? item["caption"] : documentCaptionDeserializer(item["caption"]),
    footnotes: !item["footnotes"]
      ? item["footnotes"]
      : documentFootnoteArrayDeserializer(item["footnotes"]),
    id: item["id"],
  };
}

export function documentSectionArrayDeserializer(result: Array<DocumentSection>): any[] {
  return result.map((item) => {
    return documentSectionDeserializer(item);
  });
}

/** An object representing a section in the document. */
export interface DocumentSection {
  /** Location of the section in the reading order concatenated content. */
  spans: DocumentSpan[];
  /** Child elements of the section. */
  elements?: string[];
}

export function documentSectionDeserializer(item: any): DocumentSection {
  return {
    spans: documentSpanArrayDeserializer(item["spans"]),
    elements: !item["elements"]
      ? item["elements"]
      : item["elements"].map((p: any) => {
          return p;
        }),
  };
}

export function documentKeyValuePairArrayDeserializer(result: Array<DocumentKeyValuePair>): any[] {
  return result.map((item) => {
    return documentKeyValuePairDeserializer(item);
  });
}

/**
 * An object representing a form field with distinct field label (key) and field
 * value (may be empty).
 */
export interface DocumentKeyValuePair {
  /** Field label of the key-value pair. */
  key: DocumentKeyValueElement;
  /** Field value of the key-value pair. */
  value?: DocumentKeyValueElement;
  /** Confidence of correctly extracting the key-value pair. */
  confidence: number;
}

export function documentKeyValuePairDeserializer(item: any): DocumentKeyValuePair {
  return {
    key: documentKeyValueElementDeserializer(item["key"]),
    value: !item["value"] ? item["value"] : documentKeyValueElementDeserializer(item["value"]),
    confidence: item["confidence"],
  };
}

/** An object representing the field key or value in a key-value pair. */
export interface DocumentKeyValueElement {
  /** Concatenated content of the key-value element in reading order. */
  content: string;
  /** Bounding regions covering the key-value element. */
  boundingRegions?: BoundingRegion[];
  /** Location of the key-value element in the reading order concatenated content. */
  spans: DocumentSpan[];
}

export function documentKeyValueElementDeserializer(item: any): DocumentKeyValueElement {
  return {
    content: item["content"],
    boundingRegions: !item["boundingRegions"]
      ? item["boundingRegions"]
      : boundingRegionArrayDeserializer(item["boundingRegions"]),
    spans: documentSpanArrayDeserializer(item["spans"]),
  };
}

export function documentStyleArrayDeserializer(result: Array<DocumentStyle>): any[] {
  return result.map((item) => {
    return documentStyleDeserializer(item);
  });
}

/** An object representing observed text styles. */
export interface DocumentStyle {
  /** Is content handwritten? */
  isHandwritten?: boolean;
  /**
   * Visually most similar font from among the set of supported font families, with
   * fallback fonts following CSS convention (ex. 'Arial, sans-serif').
   */
  similarFontFamily?: string;
  /** Font style. */
  fontStyle?: DocumentFontStyle;
  /** Font weight. */
  fontWeight?: DocumentFontWeight;
  /** Foreground color in #rrggbb hexadecimal format. */
  color?: string;
  /** Background color in #rrggbb hexadecimal format.. */
  backgroundColor?: string;
  /** Location of the text elements in the concatenated content the style applies to. */
  spans: DocumentSpan[];
  /** Confidence of correctly identifying the style. */
  confidence: number;
}

export function documentStyleDeserializer(item: any): DocumentStyle {
  return {
    isHandwritten: item["isHandwritten"],
    similarFontFamily: item["similarFontFamily"],
    fontStyle: item["fontStyle"],
    fontWeight: item["fontWeight"],
    color: item["color"],
    backgroundColor: item["backgroundColor"],
    spans: documentSpanArrayDeserializer(item["spans"]),
    confidence: item["confidence"],
  };
}

/** Font style. */
export type DocumentFontStyle = "normal" | "italic";
/** Font weight. */
export type DocumentFontWeight = "normal" | "bold";

export function documentLanguageArrayDeserializer(result: Array<DocumentLanguage>): any[] {
  return result.map((item) => {
    return documentLanguageDeserializer(item);
  });
}

/** An object representing the detected language for a given text span. */
export interface DocumentLanguage {
  /**
   * Detected language.  Value may an ISO 639-1 language code (ex. "en", "fr")
   * or BCP 47 language tag (ex. "zh-Hans").
   */
  locale: string;
  /**
   * Location of the text elements in the concatenated content the language applies
   * to.
   */
  spans: DocumentSpan[];
  /** Confidence of correctly identifying the language. */
  confidence: number;
}

export function documentLanguageDeserializer(item: any): DocumentLanguage {
  return {
    locale: item["locale"],
    spans: documentSpanArrayDeserializer(item["spans"]),
    confidence: item["confidence"],
  };
}

export function analyzedDocumentArrayDeserializer(result: Array<AnalyzedDocument>): any[] {
  return result.map((item) => {
    return analyzedDocumentDeserializer(item);
  });
}

/** An object describing the location and semantic content of a document. */
export interface AnalyzedDocument {
  /** Document type. */
  docType: string;
  /** Bounding regions covering the document. */
  boundingRegions?: BoundingRegion[];
  /** Location of the document in the reading order concatenated content. */
  spans: DocumentSpan[];
  /** Dictionary of named field values. */
  fields?: Record<string, DocumentField>;
  /** Confidence of correctly extracting the document. */
  confidence: number;
}

export function analyzedDocumentDeserializer(item: any): AnalyzedDocument {
  return {
    docType: item["docType"],
    boundingRegions: !item["boundingRegions"]
      ? item["boundingRegions"]
      : boundingRegionArrayDeserializer(item["boundingRegions"]),
    spans: documentSpanArrayDeserializer(item["spans"]),
    fields: !item["fields"] ? item["fields"] : documentFieldRecordDeserializer(item["fields"]),
    confidence: item["confidence"],
  };
}

export function documentFieldRecordDeserializer(
  item: Record<string, any>,
): Record<string, DocumentField> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : documentFieldDeserializer(item[key]);
  });
  return result;
}

/** An object representing the content and location of a field value. */
export interface DocumentField {
  /** Data type of the field value. */
  type: DocumentFieldType;
  /** String value. */
  valueString?: string;
  /** Date value in YYYY-MM-DD format (ISO 8601). */
  valueDate?: Date;
  /** Time value in hh:mm:ss format (ISO 8601). */
  valueTime?: string;
  /** Phone number value in E.164 format (ex. +19876543210). */
  valuePhoneNumber?: string;
  /** Floating point value. */
  valueNumber?: number;
  /** Integer value. */
  valueInteger?: number;
  /** Selection mark value. */
  valueSelectionMark?: DocumentSelectionMarkState;
  /** Presence of signature. */
  valueSignature?: DocumentSignatureType;
  /** 3-letter country code value (ISO 3166-1 alpha-3). */
  valueCountryRegion?: string;
  /** Array of field values. */
  valueArray?: DocumentField[];
  /** Dictionary of named field values. */
  valueObject?: Record<string, DocumentField>;
  /** Currency value. */
  valueCurrency?: CurrencyValue;
  /** Address value. */
  valueAddress?: AddressValue;
  /** Boolean value. */
  valueBoolean?: boolean;
  /** Selection group value. */
  valueSelectionGroup?: string[];
  /** Field content. */
  content?: string;
  /** Bounding regions covering the field. */
  boundingRegions?: BoundingRegion[];
  /** Location of the field in the reading order concatenated content. */
  spans?: DocumentSpan[];
  /** Confidence of correctly extracting the field. */
  confidence?: number;
}

export function documentFieldDeserializer(item: any): DocumentField {
  return {
    type: item["type"],
    valueString: item["valueString"],
    valueDate: !item["valueDate"] ? item["valueDate"] : new Date(item["valueDate"]),
    valueTime: item["valueTime"],
    valuePhoneNumber: item["valuePhoneNumber"],
    valueNumber: item["valueNumber"],
    valueInteger: item["valueInteger"],
    valueSelectionMark: item["valueSelectionMark"],
    valueSignature: item["valueSignature"],
    valueCountryRegion: item["valueCountryRegion"],
    valueArray: !item["valueArray"]
      ? item["valueArray"]
      : documentFieldArrayDeserializer(item["valueArray"]),
    valueObject: !item["valueObject"]
      ? item["valueObject"]
      : documentFieldRecordDeserializer(item["valueObject"]),
    valueCurrency: !item["valueCurrency"]
      ? item["valueCurrency"]
      : currencyValueDeserializer(item["valueCurrency"]),
    valueAddress: !item["valueAddress"]
      ? item["valueAddress"]
      : addressValueDeserializer(item["valueAddress"]),
    valueBoolean: item["valueBoolean"],
    valueSelectionGroup: !item["valueSelectionGroup"]
      ? item["valueSelectionGroup"]
      : item["valueSelectionGroup"].map((p: any) => {
          return p;
        }),
    content: item["content"],
    boundingRegions: !item["boundingRegions"]
      ? item["boundingRegions"]
      : boundingRegionArrayDeserializer(item["boundingRegions"]),
    spans: !item["spans"] ? item["spans"] : documentSpanArrayDeserializer(item["spans"]),
    confidence: item["confidence"],
  };
}

/** Semantic data type of the field value. */
export type DocumentFieldType =
  | "string"
  | "date"
  | "time"
  | "phoneNumber"
  | "number"
  | "integer"
  | "selectionMark"
  | "countryRegion"
  | "signature"
  | "array"
  | "object"
  | "currency"
  | "address"
  | "boolean"
  | "selectionGroup";
/** Presence of signature. */
export type DocumentSignatureType = "signed" | "unsigned";

export function documentFieldArrayDeserializer(result: Array<DocumentField>): any[] {
  return result.map((item) => {
    return documentFieldDeserializer(item);
  });
}

/** Currency field value. */
export interface CurrencyValue {
  /** Currency amount. */
  amount: number;
  /** Currency symbol label, if any. */
  currencySymbol?: string;
  /** Resolved currency code (ISO 4217), if any. */
  currencyCode?: string;
}

export function currencyValueDeserializer(item: any): CurrencyValue {
  return {
    amount: item["amount"],
    currencySymbol: item["currencySymbol"],
    currencyCode: item["currencyCode"],
  };
}

/** Address field value. */
export interface AddressValue {
  /** House or building number. */
  houseNumber?: string;
  /** Post office box number. */
  poBox?: string;
  /** Street name. */
  road?: string;
  /** Name of city, town, village, etc. */
  city?: string;
  /** First-level administrative division. */
  state?: string;
  /** Postal code used for mail sorting. */
  postalCode?: string;
  /** Country/region. */
  countryRegion?: string;
  /** Street-level address, excluding city, state, countryRegion, and postalCode. */
  streetAddress?: string;
  /** Apartment or office number */
  unit?: string;
  /**
   * Districts or boroughs within a city, such as Brooklyn in New York City or City
   * of Westminster in London.
   */
  cityDistrict?: string;
  /** Second-level administrative division used in certain locales. */
  stateDistrict?: string;
  /** Unofficial neighborhood name, like Chinatown. */
  suburb?: string;
  /** Build name, such as World Trade Center. */
  house?: string;
  /** Floor number, such as 3F. */
  level?: string;
}

export function addressValueDeserializer(item: any): AddressValue {
  return {
    houseNumber: item["houseNumber"],
    poBox: item["poBox"],
    road: item["road"],
    city: item["city"],
    state: item["state"],
    postalCode: item["postalCode"],
    countryRegion: item["countryRegion"],
    streetAddress: item["streetAddress"],
    unit: item["unit"],
    cityDistrict: item["cityDistrict"],
    stateDistrict: item["stateDistrict"],
    suburb: item["suburb"],
    house: item["house"],
    level: item["level"],
  };
}

export function documentIntelligenceWarningArrayDeserializer(
  result: Array<DocumentIntelligenceWarning>,
): any[] {
  return result.map((item) => {
    return documentIntelligenceWarningDeserializer(item);
  });
}

/** The error object. */
export interface DocumentIntelligenceWarning {
  /** One of a server-defined set of warning codes. */
  code: string;
  /** A human-readable representation of the warning. */
  message: string;
  /** The target of the error. */
  target?: string;
}

export function documentIntelligenceWarningDeserializer(item: any): DocumentIntelligenceWarning {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
  };
}

/** Operation status. */
export type DocumentIntelligenceOperationStatus =
  | "notStarted"
  | "running"
  | "failed"
  | "succeeded"
  | "canceled"
  | "skipped";

/** Batch document analysis parameters. */
export interface AnalyzeBatchDocumentsRequest {
  /**
   * Azure Blob Storage location containing the batch documents.  Either
   * azureBlobSource or azureBlobFileListSource must be specified.
   */
  azureBlobSource?: AzureBlobContentSource;
  /**
   * Azure Blob Storage file list specifying the batch documents.  Either
   * azureBlobSource or azureBlobFileListSource must be specified.
   */
  azureBlobFileListSource?: AzureBlobFileListContentSource;
  /** Azure Blob Storage container URL where analyze result files will be stored. */
  resultContainerUrl: string;
  /** Blob name prefix of result files. */
  resultPrefix?: string;
  /** Overwrite existing analyze result files? */
  overwriteExisting?: boolean;
}

export function analyzeBatchDocumentsRequestSerializer(item: AnalyzeBatchDocumentsRequest): any {
  return {
    azureBlobSource: !item["azureBlobSource"]
      ? item["azureBlobSource"]
      : azureBlobContentSourceSerializer(item["azureBlobSource"]),
    azureBlobFileListSource: !item["azureBlobFileListSource"]
      ? item["azureBlobFileListSource"]
      : azureBlobFileListContentSourceSerializer(item["azureBlobFileListSource"]),
    resultContainerUrl: item["resultContainerUrl"],
    resultPrefix: item["resultPrefix"],
    overwriteExisting: item["overwriteExisting"],
  };
}

/** Azure Blob Storage content. */
export interface AzureBlobContentSource {
  /** Azure Blob Storage container URL. */
  containerUrl: string;
  /** Blob name prefix. */
  prefix?: string;
}

export function azureBlobContentSourceSerializer(item: AzureBlobContentSource): any {
  return { containerUrl: item["containerUrl"], prefix: item["prefix"] };
}

export function azureBlobContentSourceDeserializer(item: any): AzureBlobContentSource {
  return {
    containerUrl: item["containerUrl"],
    prefix: item["prefix"],
  };
}

/** File list in Azure Blob Storage. */
export interface AzureBlobFileListContentSource {
  /** Azure Blob Storage container URL. */
  containerUrl: string;
  /** Path to a JSONL file within the container specifying a subset of documents. */
  fileList: string;
}

export function azureBlobFileListContentSourceSerializer(
  item: AzureBlobFileListContentSource,
): any {
  return { containerUrl: item["containerUrl"], fileList: item["fileList"] };
}

export function azureBlobFileListContentSourceDeserializer(
  item: any,
): AzureBlobFileListContentSource {
  return {
    containerUrl: item["containerUrl"],
    fileList: item["fileList"],
  };
}

/** Batch document analysis result. */
export interface AnalyzeBatchResult {
  /** Number of documents that completed with status succeeded. */
  succeededCount: number;
  /** Number of documents that completed with status failed. */
  failedCount: number;
  /** Number of documents that completed with status skipped. */
  skippedCount: number;
  /** Operation detail for each document in the batch. */
  details?: AnalyzeBatchOperationDetail[];
}

export function analyzeBatchResultDeserializer(item: any): AnalyzeBatchResult {
  return {
    succeededCount: item["succeededCount"],
    failedCount: item["failedCount"],
    skippedCount: item["skippedCount"],
    details: !item["details"]
      ? item["details"]
      : analyzeBatchOperationDetailArrayDeserializer(item["details"]),
  };
}

export function analyzeBatchOperationDetailArrayDeserializer(
  result: Array<AnalyzeBatchOperationDetail>,
): any[] {
  return result.map((item) => {
    return analyzeBatchOperationDetailDeserializer(item);
  });
}

/** Operation detail for a document in a batch analysis. */
export interface AnalyzeBatchOperationDetail {
  /** Analyze status.  succeeded, failed, or skipped */
  status: DocumentIntelligenceOperationStatus;
  /** URL of the source document. */
  sourceUrl: string;
  /** URL of the analyze result JSON. */
  resultUrl?: string;
  /** Encountered error. */
  error?: DocumentIntelligenceError;
}

export function analyzeBatchOperationDetailDeserializer(item: any): AnalyzeBatchOperationDetail {
  return {
    status: item["status"],
    sourceUrl: item["sourceUrl"],
    resultUrl: item["resultUrl"],
    error: !item["error"] ? item["error"] : documentIntelligenceErrorDeserializer(item["error"]),
  };
}

/** Status and result of the analyze batch operation. */
export interface AnalyzeBatchOperation {
  /** Analyze batch operation result ID. */
  resultId?: string;
  /** Operation status.  notStarted, running, succeeded, or failed */
  status: DocumentIntelligenceOperationStatus;
  /** Date and time (UTC) when the operation was submitted. */
  createdDateTime: Date;
  /** Date and time (UTC) when the status was last updated. */
  lastUpdatedDateTime: Date;
  /** Operation progress (0-100). */
  percentCompleted?: number;
  /** Encountered error during batch document analysis. */
  error?: DocumentIntelligenceError;
  /** Batch document analysis result. */
  result?: AnalyzeBatchResult;
}

export function analyzeBatchOperationDeserializer(item: any): AnalyzeBatchOperation {
  return {
    resultId: item["resultId"],
    status: item["status"],
    createdDateTime: new Date(item["createdDateTime"]),
    lastUpdatedDateTime: new Date(item["lastUpdatedDateTime"]),
    percentCompleted: item["percentCompleted"],
    error: !item["error"] ? item["error"] : documentIntelligenceErrorDeserializer(item["error"]),
    result: !item["result"] ? item["result"] : analyzeBatchResultDeserializer(item["result"]),
  };
}

/** Paged collection of AnalyzeBatchOperation items */
export interface _PagedAnalyzeBatchOperation {
  /** The AnalyzeBatchOperation items on this page */
  value: AnalyzeBatchOperation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedAnalyzeBatchOperationDeserializer(item: any): _PagedAnalyzeBatchOperation {
  return {
    value: analyzeBatchOperationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function analyzeBatchOperationArrayDeserializer(
  result: Array<AnalyzeBatchOperation>,
): any[] {
  return result.map((item) => {
    return analyzeBatchOperationDeserializer(item);
  });
}

/** Document classification parameters. */
export interface ClassifyDocumentRequest {
  /** Document URL to classify.  Either urlSource or base64Source must be specified. */
  urlSource?: string;
  /**
   * Base64 encoding of the document to classify.  Either urlSource or base64Source
   * must be specified.
   */
  base64Source?: Uint8Array;
}

export function classifyDocumentRequestSerializer(item: ClassifyDocumentRequest): any {
  return {
    urlSource: item["urlSource"],
    base64Source: !item["base64Source"]
      ? item["base64Source"]
      : uint8ArrayToString(item["base64Source"], "base64"),
  };
}

/** Request body to build a new custom document model. */
export interface BuildDocumentModelRequest {
  /** Unique document model name. */
  modelId: string;
  /** Document model description. */
  description?: string;
  /** Custom document model build mode. */
  buildMode: DocumentBuildMode;
  /**
   * Azure Blob Storage location containing the training data.  Either
   * azureBlobSource or azureBlobFileListSource must be specified.
   */
  azureBlobSource?: AzureBlobContentSource;
  /**
   * Azure Blob Storage file list specifying the training data.  Either
   * azureBlobSource or azureBlobFileListSource must be specified.
   */
  azureBlobFileListSource?: AzureBlobFileListContentSource;
  /** List of key-value tag attributes associated with the document model. */
  tags?: Record<string, string>;
  /** Max number of V100-equivalent GPU hours to use for model training.  Default=0.5. */
  maxTrainingHours?: number;
  /** Allow overwriting an existing model with the same name. */
  allowOverwrite?: boolean;
}

export function buildDocumentModelRequestSerializer(item: BuildDocumentModelRequest): any {
  return {
    modelId: item["modelId"],
    description: item["description"],
    buildMode: item["buildMode"],
    azureBlobSource: !item["azureBlobSource"]
      ? item["azureBlobSource"]
      : azureBlobContentSourceSerializer(item["azureBlobSource"]),
    azureBlobFileListSource: !item["azureBlobFileListSource"]
      ? item["azureBlobFileListSource"]
      : azureBlobFileListContentSourceSerializer(item["azureBlobFileListSource"]),
    tags: item["tags"],
    maxTrainingHours: item["maxTrainingHours"],
    allowOverwrite: item["allowOverwrite"],
  };
}

/** Custom document model build mode. */
export type DocumentBuildMode = "template" | "neural";

/** Document model info. */
export interface DocumentModelDetails {
  /** Unique document model name. */
  modelId: string;
  /** Document model description. */
  description?: string;
  /** Date and time (UTC) when the document model was created. */
  readonly createdDateTime: Date;
  /** Date and time (UTC) when the document model will expire. */
  readonly expirationDateTime?: Date;
  /** Date and time (UTC) when the document model was last modified. */
  readonly modifiedDateTime?: Date;
  /** API version used to create this document model. */
  readonly apiVersion?: string;
  /** List of key-value tag attributes associated with the document model. */
  tags?: Record<string, string>;
  /** Custom document model build mode. */
  readonly buildMode?: DocumentBuildMode;
  /**
   * Azure Blob Storage location containing the training data.  Either
   * azureBlobSource or azureBlobFileListSource must be specified.
   */
  readonly azureBlobSource?: AzureBlobContentSource;
  /**
   * Azure Blob Storage file list specifying the training data.  Either
   * azureBlobSource or azureBlobFileListSource must be specified.
   */
  readonly azureBlobFileListSource?: AzureBlobFileListContentSource;
  /** For composed models, the custom classifier to split and classify the input file. */
  classifierId?: string;
  /** For composed models, the file splitting behavior. */
  split?: SplitMode;
  /** Supported document types. */
  readonly docTypes?: Record<string, DocumentTypeDetails>;
  /** List of warnings encountered while building the model. */
  readonly warnings?: DocumentIntelligenceWarning[];
  /** Number of V100-equivalent GPU hours consumed for model training. */
  readonly trainingHours?: number;
}

export function documentModelDetailsDeserializer(item: any): DocumentModelDetails {
  return {
    modelId: item["modelId"],
    description: item["description"],
    createdDateTime: new Date(item["createdDateTime"]),
    expirationDateTime: !item["expirationDateTime"]
      ? item["expirationDateTime"]
      : new Date(item["expirationDateTime"]),
    modifiedDateTime: !item["modifiedDateTime"]
      ? item["modifiedDateTime"]
      : new Date(item["modifiedDateTime"]),
    apiVersion: item["apiVersion"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    buildMode: item["buildMode"],
    azureBlobSource: !item["azureBlobSource"]
      ? item["azureBlobSource"]
      : azureBlobContentSourceDeserializer(item["azureBlobSource"]),
    azureBlobFileListSource: !item["azureBlobFileListSource"]
      ? item["azureBlobFileListSource"]
      : azureBlobFileListContentSourceDeserializer(item["azureBlobFileListSource"]),
    classifierId: item["classifierId"],
    split: item["split"],
    docTypes: !item["docTypes"]
      ? item["docTypes"]
      : documentTypeDetailsRecordDeserializer(item["docTypes"]),
    warnings: !item["warnings"]
      ? item["warnings"]
      : documentIntelligenceWarningArrayDeserializer(item["warnings"]),
    trainingHours: item["trainingHours"],
  };
}

/** Document splitting mode. */
export type SplitMode = "auto" | "none" | "perPage";

export function documentTypeDetailsRecordSerializer(
  item: Record<string, DocumentTypeDetails>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : documentTypeDetailsSerializer(item[key]);
  });
  return result;
}

export function documentTypeDetailsRecordDeserializer(
  item: Record<string, any>,
): Record<string, DocumentTypeDetails> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : documentTypeDetailsDeserializer(item[key]);
  });
  return result;
}

/** Document type info. */
export interface DocumentTypeDetails {
  /** Document model description. */
  description?: string;
  /** Custom document model build mode. */
  buildMode?: DocumentBuildMode;
  /** Description of the document semantic schema using a JSON Schema style syntax. */
  fieldSchema?: Record<string, DocumentFieldSchema>;
  /** Estimated confidence for each field. */
  fieldConfidence?: Record<string, number>;
  /** Document model to use for analyzing documents with specified type. */
  modelId?: string;
  /** Only perform analysis if docType confidence is above threshold. */
  confidenceThreshold?: number;
  /** List of optional analysis features. */
  features?: DocumentAnalysisFeature[];
  /** List of additional fields to extract.  Ex. "NumberOfGuests,StoreNumber" */
  queryFields?: string[];
  /** Maximum number of documents of specified type to analyze.  Default=all. */
  maxDocumentsToAnalyze?: number;
}

export function documentTypeDetailsSerializer(item: DocumentTypeDetails): any {
  return {
    description: item["description"],
    buildMode: item["buildMode"],
    fieldSchema: !item["fieldSchema"]
      ? item["fieldSchema"]
      : documentFieldSchemaRecordSerializer(item["fieldSchema"]),
    fieldConfidence: item["fieldConfidence"],
    modelId: item["modelId"],
    confidenceThreshold: item["confidenceThreshold"],
    features: !item["features"]
      ? item["features"]
      : item["features"].map((p: any) => {
          return p;
        }),
    queryFields: !item["queryFields"]
      ? item["queryFields"]
      : item["queryFields"].map((p: any) => {
          return p;
        }),
    maxDocumentsToAnalyze: item["maxDocumentsToAnalyze"],
  };
}

export function documentTypeDetailsDeserializer(item: any): DocumentTypeDetails {
  return {
    description: item["description"],
    buildMode: item["buildMode"],
    fieldSchema: !item["fieldSchema"]
      ? item["fieldSchema"]
      : documentFieldSchemaRecordDeserializer(item["fieldSchema"]),
    fieldConfidence: !item["fieldConfidence"]
      ? item["fieldConfidence"]
      : Object.fromEntries(
          Object.entries(item["fieldConfidence"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    modelId: item["modelId"],
    confidenceThreshold: item["confidenceThreshold"],
    features: !item["features"]
      ? item["features"]
      : item["features"].map((p: any) => {
          return p;
        }),
    queryFields: !item["queryFields"]
      ? item["queryFields"]
      : item["queryFields"].map((p: any) => {
          return p;
        }),
    maxDocumentsToAnalyze: item["maxDocumentsToAnalyze"],
  };
}

export function documentFieldSchemaRecordSerializer(
  item: Record<string, DocumentFieldSchema>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : documentFieldSchemaSerializer(item[key]);
  });
  return result;
}

export function documentFieldSchemaRecordDeserializer(
  item: Record<string, any>,
): Record<string, DocumentFieldSchema> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : documentFieldSchemaDeserializer(item[key]);
  });
  return result;
}

/** Description of the field semantic schema using a JSON Schema style syntax. */
export interface DocumentFieldSchema {
  /** Semantic data type of the field value. */
  type: DocumentFieldType;
  /** Field description. */
  description?: string;
  /** Example field content. */
  example?: string;
  /** Field type schema of each array element. */
  items?: DocumentFieldSchema;
  /** Named sub-fields of the object field. */
  properties?: Record<string, DocumentFieldSchema>;
}

export function documentFieldSchemaSerializer(item: DocumentFieldSchema): any {
  return {
    type: item["type"],
    description: item["description"],
    example: item["example"],
    items: !item["items"] ? item["items"] : documentFieldSchemaSerializer(item["items"]),
    properties: !item["properties"]
      ? item["properties"]
      : documentFieldSchemaRecordSerializer(item["properties"]),
  };
}

export function documentFieldSchemaDeserializer(item: any): DocumentFieldSchema {
  return {
    type: item["type"],
    description: item["description"],
    example: item["example"],
    items: !item["items"] ? item["items"] : documentFieldSchemaDeserializer(item["items"]),
    properties: !item["properties"]
      ? item["properties"]
      : documentFieldSchemaRecordDeserializer(item["properties"]),
  };
}

/** Document analysis features to enable. */
export type DocumentAnalysisFeature =
  | "ocrHighResolution"
  | "languages"
  | "barcodes"
  | "formulas"
  | "keyValuePairs"
  | "styleFont"
  | "queryFields";

/** Get Operation response object. */
export interface DocumentModelBuildOperationDetails extends DocumentIntelligenceOperationDetails {
  /** Operation result upon success. */
  result?: DocumentModelDetails;
  /** Type of operation. */
  kind: "documentModelBuild";
}

export function documentModelBuildOperationDetailsDeserializer(
  item: any,
): DocumentModelBuildOperationDetails {
  return {
    operationId: item["operationId"],
    status: item["status"],
    percentCompleted: item["percentCompleted"],
    createdDateTime: new Date(item["createdDateTime"]),
    lastUpdatedDateTime: new Date(item["lastUpdatedDateTime"]),
    kind: item["kind"],
    resourceLocation: item["resourceLocation"],
    apiVersion: item["apiVersion"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    error: !item["error"] ? item["error"] : documentIntelligenceErrorDeserializer(item["error"]),
    result: !item["result"] ? item["result"] : documentModelDetailsDeserializer(item["result"]),
  };
}

/** Operation info. */
export interface DocumentIntelligenceOperationDetails {
  /** Operation ID */
  operationId: string;
  /** Operation status.  notStarted, running, completed, or failed */
  status: DocumentIntelligenceOperationStatus;
  /** Operation progress (0-100). */
  percentCompleted?: number;
  /** Date and time (UTC) when the operation was created. */
  createdDateTime: Date;
  /** Date and time (UTC) when the status was last updated. */
  lastUpdatedDateTime: Date;
  /** Type of operation. */
  /** The discriminator possible values: documentModelBuild, documentModelCompose, documentModelCopyTo, documentClassifierCopyTo, documentClassifierBuild */
  kind: OperationKind;
  /** URL of the resource targeted by this operation. */
  resourceLocation: string;
  /** API version used to create this operation. */
  apiVersion?: string;
  /** List of key-value tag attributes associated with the document model. */
  tags?: Record<string, string>;
  /** Encountered error. */
  error?: DocumentIntelligenceError;
}

export function documentIntelligenceOperationDetailsDeserializer(
  item: any,
): DocumentIntelligenceOperationDetails {
  return {
    operationId: item["operationId"],
    status: item["status"],
    percentCompleted: item["percentCompleted"],
    createdDateTime: new Date(item["createdDateTime"]),
    lastUpdatedDateTime: new Date(item["lastUpdatedDateTime"]),
    kind: item["kind"],
    resourceLocation: item["resourceLocation"],
    apiVersion: item["apiVersion"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    error: !item["error"] ? item["error"] : documentIntelligenceErrorDeserializer(item["error"]),
  };
}

/** Alias for DocumentIntelligenceOperationDetailsUnion */
export type DocumentIntelligenceOperationDetailsUnion =
  | DocumentModelBuildOperationDetails
  | DocumentModelComposeOperationDetails
  | DocumentModelCopyToOperationDetails
  | DocumentClassifierCopyToOperationDetails
  | DocumentClassifierBuildOperationDetails
  | DocumentIntelligenceOperationDetails;

export function documentIntelligenceOperationDetailsUnionDeserializer(
  item: any,
): DocumentIntelligenceOperationDetailsUnion {
  switch (item["kind"]) {
    case "documentModelBuild":
      return documentModelBuildOperationDetailsDeserializer(
        item as DocumentModelBuildOperationDetails,
      );

    case "documentModelCompose":
      return documentModelComposeOperationDetailsDeserializer(
        item as DocumentModelComposeOperationDetails,
      );

    case "documentModelCopyTo":
      return documentModelCopyToOperationDetailsDeserializer(
        item as DocumentModelCopyToOperationDetails,
      );

    case "documentClassifierCopyTo":
      return documentClassifierCopyToOperationDetailsDeserializer(
        item as DocumentClassifierCopyToOperationDetails,
      );

    case "documentClassifierBuild":
      return documentClassifierBuildOperationDetailsDeserializer(
        item as DocumentClassifierBuildOperationDetails,
      );

    default:
      return documentIntelligenceOperationDetailsDeserializer(item);
  }
}

/** Type of operation. */
export type OperationKind =
  | "documentModelBuild"
  | "documentModelCompose"
  | "documentModelCopyTo"
  | "documentClassifierCopyTo"
  | "documentClassifierBuild";

/** Get Operation response object. */
export interface DocumentModelComposeOperationDetails extends DocumentIntelligenceOperationDetails {
  /** Operation result upon success. */
  result?: DocumentModelDetails;
  /** Type of operation. */
  kind: "documentModelCompose";
}

export function documentModelComposeOperationDetailsDeserializer(
  item: any,
): DocumentModelComposeOperationDetails {
  return {
    operationId: item["operationId"],
    status: item["status"],
    percentCompleted: item["percentCompleted"],
    createdDateTime: new Date(item["createdDateTime"]),
    lastUpdatedDateTime: new Date(item["lastUpdatedDateTime"]),
    kind: item["kind"],
    resourceLocation: item["resourceLocation"],
    apiVersion: item["apiVersion"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    error: !item["error"] ? item["error"] : documentIntelligenceErrorDeserializer(item["error"]),
    result: !item["result"] ? item["result"] : documentModelDetailsDeserializer(item["result"]),
  };
}

/** Get Operation response object. */
export interface DocumentModelCopyToOperationDetails extends DocumentIntelligenceOperationDetails {
  /** Operation result upon success. */
  result?: DocumentModelDetails;
  /** Type of operation. */
  kind: "documentModelCopyTo";
}

export function documentModelCopyToOperationDetailsDeserializer(
  item: any,
): DocumentModelCopyToOperationDetails {
  return {
    operationId: item["operationId"],
    status: item["status"],
    percentCompleted: item["percentCompleted"],
    createdDateTime: new Date(item["createdDateTime"]),
    lastUpdatedDateTime: new Date(item["lastUpdatedDateTime"]),
    kind: item["kind"],
    resourceLocation: item["resourceLocation"],
    apiVersion: item["apiVersion"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    error: !item["error"] ? item["error"] : documentIntelligenceErrorDeserializer(item["error"]),
    result: !item["result"] ? item["result"] : documentModelDetailsDeserializer(item["result"]),
  };
}

/** Get Operation response object. */
export interface DocumentClassifierCopyToOperationDetails extends DocumentIntelligenceOperationDetails {
  /** Operation result upon success. */
  result?: DocumentClassifierDetails;
  /** Type of operation. */
  kind: "documentClassifierCopyTo";
}

export function documentClassifierCopyToOperationDetailsDeserializer(
  item: any,
): DocumentClassifierCopyToOperationDetails {
  return {
    operationId: item["operationId"],
    status: item["status"],
    percentCompleted: item["percentCompleted"],
    createdDateTime: new Date(item["createdDateTime"]),
    lastUpdatedDateTime: new Date(item["lastUpdatedDateTime"]),
    kind: item["kind"],
    resourceLocation: item["resourceLocation"],
    apiVersion: item["apiVersion"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    error: !item["error"] ? item["error"] : documentIntelligenceErrorDeserializer(item["error"]),
    result: !item["result"]
      ? item["result"]
      : documentClassifierDetailsDeserializer(item["result"]),
  };
}

/** Document classifier info. */
export interface DocumentClassifierDetails {
  /** Unique document classifier name. */
  classifierId: string;
  /** Document classifier description. */
  description?: string;
  /** Date and time (UTC) when the document classifier was created. */
  createdDateTime: Date;
  /** Date and time (UTC) when the document classifier will expire. */
  expirationDateTime?: Date;
  /** Date and time (UTC) when the document model was last modified. */
  readonly modifiedDateTime?: Date;
  /** API version used to create this document classifier. */
  apiVersion: string;
  /** Base classifierId on top of which the classifier was trained. */
  baseClassifierId?: string;
  /** List of document types to classify against. */
  docTypes: Record<string, ClassifierDocumentTypeDetails>;
  /** List of warnings encountered while building the classifier. */
  warnings?: DocumentIntelligenceWarning[];
}

export function documentClassifierDetailsDeserializer(item: any): DocumentClassifierDetails {
  return {
    classifierId: item["classifierId"],
    description: item["description"],
    createdDateTime: new Date(item["createdDateTime"]),
    expirationDateTime: !item["expirationDateTime"]
      ? item["expirationDateTime"]
      : new Date(item["expirationDateTime"]),
    modifiedDateTime: !item["modifiedDateTime"]
      ? item["modifiedDateTime"]
      : new Date(item["modifiedDateTime"]),
    apiVersion: item["apiVersion"],
    baseClassifierId: item["baseClassifierId"],
    docTypes: classifierDocumentTypeDetailsRecordDeserializer(item["docTypes"]),
    warnings: !item["warnings"]
      ? item["warnings"]
      : documentIntelligenceWarningArrayDeserializer(item["warnings"]),
  };
}

export function classifierDocumentTypeDetailsRecordSerializer(
  item: Record<string, ClassifierDocumentTypeDetails>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : classifierDocumentTypeDetailsSerializer(item[key]);
  });
  return result;
}

export function classifierDocumentTypeDetailsRecordDeserializer(
  item: Record<string, any>,
): Record<string, ClassifierDocumentTypeDetails> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : classifierDocumentTypeDetailsDeserializer(item[key]);
  });
  return result;
}

/** Classifier document type info. */
export interface ClassifierDocumentTypeDetails {
  /** Type of training data source. */
  sourceKind?: ContentSourceKind;
  /**
   * Azure Blob Storage location containing the training data for a classifier
   * document type.  Either azureBlobSource or azureBlobFileListSource must be
   * specified.
   */
  azureBlobSource?: AzureBlobContentSource;
  /**
   * Azure Blob Storage file list specifying the training data for a classifier
   * document type.  Either azureBlobSource or azureBlobFileListSource must be
   * specified.
   */
  azureBlobFileListSource?: AzureBlobFileListContentSource;
}

export function classifierDocumentTypeDetailsSerializer(item: ClassifierDocumentTypeDetails): any {
  return {
    sourceKind: item["sourceKind"],
    azureBlobSource: !item["azureBlobSource"]
      ? item["azureBlobSource"]
      : azureBlobContentSourceSerializer(item["azureBlobSource"]),
    azureBlobFileListSource: !item["azureBlobFileListSource"]
      ? item["azureBlobFileListSource"]
      : azureBlobFileListContentSourceSerializer(item["azureBlobFileListSource"]),
  };
}

export function classifierDocumentTypeDetailsDeserializer(
  item: any,
): ClassifierDocumentTypeDetails {
  return {
    sourceKind: item["sourceKind"],
    azureBlobSource: !item["azureBlobSource"]
      ? item["azureBlobSource"]
      : azureBlobContentSourceDeserializer(item["azureBlobSource"]),
    azureBlobFileListSource: !item["azureBlobFileListSource"]
      ? item["azureBlobFileListSource"]
      : azureBlobFileListContentSourceDeserializer(item["azureBlobFileListSource"]),
  };
}

/** Type of content source. */
export type ContentSourceKind = "url" | "base64" | "azureBlob" | "azureBlobFileList";

/** Get Operation response object. */
export interface DocumentClassifierBuildOperationDetails extends DocumentIntelligenceOperationDetails {
  /** Operation result upon success. */
  result?: DocumentClassifierDetails;
  /** Type of operation. */
  kind: "documentClassifierBuild";
}

export function documentClassifierBuildOperationDetailsDeserializer(
  item: any,
): DocumentClassifierBuildOperationDetails {
  return {
    operationId: item["operationId"],
    status: item["status"],
    percentCompleted: item["percentCompleted"],
    createdDateTime: new Date(item["createdDateTime"]),
    lastUpdatedDateTime: new Date(item["lastUpdatedDateTime"]),
    kind: item["kind"],
    resourceLocation: item["resourceLocation"],
    apiVersion: item["apiVersion"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    error: !item["error"] ? item["error"] : documentIntelligenceErrorDeserializer(item["error"]),
    result: !item["result"]
      ? item["result"]
      : documentClassifierDetailsDeserializer(item["result"]),
  };
}

/** Request body to create a composed document model from component document models. */
export interface ComposeDocumentModelRequest {
  /** Unique document model name. */
  modelId: string;
  /** Document model description. */
  description?: string;
  /** Custom classifier to split and classify the input file. */
  classifierId: string;
  /** File splitting behavior. */
  split?: SplitMode;
  /** Dictionary mapping supported docTypes to the corresponding document models. */
  docTypes: Record<string, DocumentTypeDetails>;
  /** List of key-value tag attributes associated with the document model. */
  tags?: Record<string, string>;
}

export function composeDocumentModelRequestSerializer(item: ComposeDocumentModelRequest): any {
  return {
    modelId: item["modelId"],
    description: item["description"],
    classifierId: item["classifierId"],
    split: item["split"],
    docTypes: documentTypeDetailsRecordSerializer(item["docTypes"]),
    tags: item["tags"],
  };
}

/** Request body to authorize document model copy. */
export interface AuthorizeCopyRequest {
  /** Unique document model name. */
  modelId: string;
  /** Document model description. */
  description?: string;
  /** List of key-value tag attributes associated with the document model. */
  tags?: Record<string, string>;
}

export function authorizeCopyRequestSerializer(item: AuthorizeCopyRequest): any {
  return { modelId: item["modelId"], description: item["description"], tags: item["tags"] };
}

/**
 * Authorization to copy a document model to the specified target resource and
 * modelId.
 */
export interface ModelCopyAuthorization {
  /** ID of the target Azure resource where the document model should be copied to. */
  targetResourceId: string;
  /**
   * Location of the target Azure resource where the document model should be copied
   * to.
   */
  targetResourceRegion: string;
  /** Identifier of the target document model. */
  targetModelId: string;
  /** URL of the copied document model in the target account. */
  targetModelLocation: string;
  /** Token used to authorize the request. */
  accessToken: string;
  /** Date/time when the access token expires. */
  expirationDateTime: Date;
}

export function modelCopyAuthorizationSerializer(item: ModelCopyAuthorization): any {
  return {
    targetResourceId: item["targetResourceId"],
    targetResourceRegion: item["targetResourceRegion"],
    targetModelId: item["targetModelId"],
    targetModelLocation: item["targetModelLocation"],
    accessToken: item["accessToken"],
    expirationDateTime: item["expirationDateTime"].toISOString(),
  };
}

export function modelCopyAuthorizationDeserializer(item: any): ModelCopyAuthorization {
  return {
    targetResourceId: item["targetResourceId"],
    targetResourceRegion: item["targetResourceRegion"],
    targetModelId: item["targetModelId"],
    targetModelLocation: item["targetModelLocation"],
    accessToken: item["accessToken"],
    expirationDateTime: new Date(item["expirationDateTime"]),
  };
}

/** Paged collection of DocumentModelDetails items */
export interface _PagedDocumentModelDetails {
  /** The DocumentModelDetails items on this page */
  value: DocumentModelDetails[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedDocumentModelDetailsDeserializer(item: any): _PagedDocumentModelDetails {
  return {
    value: documentModelDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function documentModelDetailsArrayDeserializer(result: Array<DocumentModelDetails>): any[] {
  return result.map((item) => {
    return documentModelDetailsDeserializer(item);
  });
}

/** General information regarding the current resource. */
export interface DocumentIntelligenceResourceDetails {
  /** Details regarding custom document models. */
  customDocumentModels: CustomDocumentModelsDetails;
}

export function documentIntelligenceResourceDetailsDeserializer(
  item: any,
): DocumentIntelligenceResourceDetails {
  return {
    customDocumentModels: customDocumentModelsDetailsDeserializer(item["customDocumentModels"]),
  };
}

/** Details regarding custom document models. */
export interface CustomDocumentModelsDetails {
  /** Number of custom document models in the current resource. */
  count: number;
  /** Maximum number of custom document models supported in the current resource. */
  limit: number;
}

export function customDocumentModelsDetailsDeserializer(item: any): CustomDocumentModelsDetails {
  return {
    count: item["count"],
    limit: item["limit"],
  };
}

/** Paged collection of DocumentIntelligenceOperationDetails items */
export interface _PagedDocumentIntelligenceOperationDetails {
  /** The DocumentIntelligenceOperationDetails items on this page */
  value: DocumentIntelligenceOperationDetailsUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedDocumentIntelligenceOperationDetailsDeserializer(
  item: any,
): _PagedDocumentIntelligenceOperationDetails {
  return {
    value: documentIntelligenceOperationDetailsUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function documentIntelligenceOperationDetailsUnionArrayDeserializer(
  result: Array<DocumentIntelligenceOperationDetailsUnion>,
): any[] {
  return result.map((item) => {
    return documentIntelligenceOperationDetailsUnionDeserializer(item);
  });
}

/** Request body to build a new custom document classifier. */
export interface BuildDocumentClassifierRequest {
  /** Unique document classifier name. */
  classifierId: string;
  /** Document classifier description. */
  description?: string;
  /** Base classifierId on top of which to train the classifier. */
  baseClassifierId?: string;
  /** List of document types to classify against. */
  docTypes: Record<string, ClassifierDocumentTypeDetails>;
  /** Allow overwriting an existing classifier with the same name. */
  allowOverwrite?: boolean;
}

export function buildDocumentClassifierRequestSerializer(
  item: BuildDocumentClassifierRequest,
): any {
  return {
    classifierId: item["classifierId"],
    description: item["description"],
    baseClassifierId: item["baseClassifierId"],
    docTypes: classifierDocumentTypeDetailsRecordSerializer(item["docTypes"]),
    allowOverwrite: item["allowOverwrite"],
  };
}

/** Request body to authorize document classifier copy. */
export interface AuthorizeClassifierCopyRequest {
  /** Unique document classifier name. */
  classifierId: string;
  /** Document classifier description. */
  description?: string;
  /** List of key-value tag attributes associated with the document classifier. */
  tags?: Record<string, string>;
}

export function authorizeClassifierCopyRequestSerializer(
  item: AuthorizeClassifierCopyRequest,
): any {
  return {
    classifierId: item["classifierId"],
    description: item["description"],
    tags: item["tags"],
  };
}

/**
 * Authorization to copy a document classifier to the specified target resource and
 * classifierId.
 */
export interface ClassifierCopyAuthorization {
  /** ID of the target Azure resource where the document classifier should be copied to. */
  targetResourceId: string;
  /**
   * Location of the target Azure resource where the document classifier should be copied
   * to.
   */
  targetResourceRegion: string;
  /** Identifier of the target document classifier. */
  targetClassifierId: string;
  /** URL of the copied document classifier in the target account. */
  targetClassifierLocation: string;
  /** Token used to authorize the request. */
  accessToken: string;
  /** Date/time when the access token expires. */
  expirationDateTime: Date;
}

export function classifierCopyAuthorizationSerializer(item: ClassifierCopyAuthorization): any {
  return {
    targetResourceId: item["targetResourceId"],
    targetResourceRegion: item["targetResourceRegion"],
    targetClassifierId: item["targetClassifierId"],
    targetClassifierLocation: item["targetClassifierLocation"],
    accessToken: item["accessToken"],
    expirationDateTime: item["expirationDateTime"].toISOString(),
  };
}

export function classifierCopyAuthorizationDeserializer(item: any): ClassifierCopyAuthorization {
  return {
    targetResourceId: item["targetResourceId"],
    targetResourceRegion: item["targetResourceRegion"],
    targetClassifierId: item["targetClassifierId"],
    targetClassifierLocation: item["targetClassifierLocation"],
    accessToken: item["accessToken"],
    expirationDateTime: new Date(item["expirationDateTime"]),
  };
}

/** Paged collection of DocumentClassifierDetails items */
export interface _PagedDocumentClassifierDetails {
  /** The DocumentClassifierDetails items on this page */
  value: DocumentClassifierDetails[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedDocumentClassifierDetailsDeserializer(
  item: any,
): _PagedDocumentClassifierDetails {
  return {
    value: documentClassifierDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function documentClassifierDetailsArrayDeserializer(
  result: Array<DocumentClassifierDetails>,
): any[] {
  return result.map((item) => {
    return documentClassifierDetailsDeserializer(item);
  });
}

/** Additional output to generate during analysis. */
export type AnalyzeOutputOption = "pdf" | "figures";

/** Service API versions. */
export enum KnownVersions {
  /** The 2024-11-30 GA version of the DocumentIntelligence service. */
  V20241130 = "2024-11-30",
}

export type GetAnalyzeResultFigureResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeReadableStream;
};

export type GetAnalyzeResultPdfResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeReadableStream;
};
