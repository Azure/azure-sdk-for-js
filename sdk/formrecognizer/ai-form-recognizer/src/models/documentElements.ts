// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Point2D } from "../transforms/polygon";
import {
  DocumentPageKind,
  DocumentSpan,
  DocumentTableCellKind,
  DocumentField as GeneratedDocumentField,
  LengthUnit,
  ParagraphRole,
  SelectionMarkState,
} from "../generated";

/** Simple document elements such as words, selection marks and lines are bounded by the polygon. */
export interface HasBoundingPolygon {
  /** Bounding polygon of the entity. */
  polygon?: Point2D[];
}

// ------------------------------------
// Following are the interfaces that are redefined with the property `polygon?: Point2D[];`
// instead of the generated `polygon?: number[];` for the interfaces in the generated code with the same names.
//
// To avoid going out-of-sync with the generated types, we test the re-constructed interfaces are following the shapes in the generated interfaces in the following test file.
// `test/internal/convenienceModelAssignability.spec.ts`
//
// If the generated code is updated and if there are new additions in the generated interfaces, the function calls "checkAssign" would fail in the test file, which would mean we need to revisit the re-constructed shapes here.

/** Bounding polygon on a specific page of the input. */
export interface BoundingRegion extends HasBoundingPolygon {
  /** 1-based page number of page containing the bounding region. */
  pageNumber: number;
}

/** A word object consisting of a contiguous sequence of characters.  For non-space delimited languages, such as Chinese, Japanese, and Korean, each character is represented as its own word. */
export interface DocumentWord extends HasBoundingPolygon {
  /** Text content of the word. */
  content: string;
  /** Location of the word in the reading order concatenated content. */
  span: DocumentSpan;
  /** Confidence of correctly extracting the word. */
  confidence: number;
}

/** A selection mark object representing check boxes, radio buttons, and other elements indicating a selection. */
export interface DocumentSelectionMark extends HasBoundingPolygon {
  /** State of the selection mark. */
  state: SelectionMarkState;
  /** Location of the selection mark in the reading order concatenated content. */
  span: DocumentSpan;
  /** Confidence of correctly extracting the selection mark. */
  confidence: number;
}

/** A content line object consisting of an adjacent sequence of content elements, such as words and selection marks. */
export interface DocumentLine extends HasBoundingPolygon {
  /** Concatenated content of the contained elements in reading order. */
  content: string;
  /** Location of the line in the reading order concatenated content. */
  spans: DocumentSpan[];
  /**
   * Compute the `DocumentWord`s that are related to this line.
   *
   * This function produces a lazy iterator that will yield one word before computing the next.
   */
  words: () => IterableIterator<DocumentWord>;
}

/** A paragraph object consisting with contiguous lines generally with common alignment and spacing. */
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
}

/** An object representing the location and content of a table caption. */
export interface DocumentCaption {
  /** Table caption content. */
  content: string;
  /** Bounding regions covering the table caption. */
  boundingRegions?: BoundingRegion[];
  /** Location of the table caption in the reading order concatenated content. */
  spans: DocumentSpan[];
}

/** An object representing the location and content of a table footnote. */
export interface DocumentFootnote {
  /** Table footnote content. */
  content: string;
  /** Bounding regions covering the table footnote. */
  boundingRegions?: BoundingRegion[];
  /** Location of the table footnote in the reading order concatenated content. */
  spans: DocumentSpan[];
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

/** An object describing the location and semantic content of a document. */
export interface Document {
  /** Document type. */
  docType: string;
  /** Bounding regions covering the document. */
  boundingRegions?: BoundingRegion[];
  /** Location of the document in the reading order concatenated content. */
  spans: DocumentSpan[];
  /** Dictionary of named field values. */
  fields?: { [propertyName: string]: GeneratedDocumentField };
  /** Confidence of correctly extracting the document. */
  confidence: number;
}

/** An object representing a form field with distinct field label (key) and field value (may be empty). */
export interface DocumentKeyValuePair {
  /** Field label of the key-value pair. */
  key: DocumentKeyValueElement;
  /** Field value of the key-value pair. */
  value?: DocumentKeyValueElement;
  /** Confidence of correctly extracting the key-value pair. */
  confidence: number;
}

/** Content and layout elements extracted from a page from the input. */
export interface DocumentPage {
  /** Kind of document page. */
  kind: DocumentPageKind;
  /** 1-based page number in the input document. */
  pageNumber: number;
  /** The general orientation of the content in clockwise direction, measured in degrees between (-180, 180]. */
  angle?: number;
  /** The width of the image/PDF in pixels/inches, respectively. */
  width?: number;
  /** The height of the image/PDF in pixels/inches, respectively. */
  height?: number;
  /** The unit used by the width, height, and polygon properties. For images, the unit is "pixel". PDF, the unit is "inch". */
  unit?: LengthUnit;
  /** Location of the page in the reading order concatenated content. */
  spans: DocumentSpan[];
  /** Extracted words from the page. */
  words?: DocumentWord[];
  /** Extracted selection marks from the page. */
  selectionMarks?: DocumentSelectionMark[];
  /** Extracted lines from the page, potentially containing both textual and visual elements. */
  lines?: DocumentLine[];
}
