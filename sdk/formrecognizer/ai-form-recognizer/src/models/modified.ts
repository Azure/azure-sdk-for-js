import { Point2D } from "../util";
import { DocumentWord as GeneratedDocumentWord, DocumentSelectionMark as GeneratedDocumentSelectionMark, DocumentImage as GeneratedDocumentImage, DocumentLine as GeneratedDocumentLine, BoundingRegion as GeneratedBoundingRegion, DocumentParagraph as GeneratedDocumentParagraph, DocumentTable as GeneratedDocumentTable, DocumentTableCell as GeneratedDocumentTableCell, DocumentTableCaption as GeneratedDocumentTableCaption, DocumentTableFootnote as GeneratedDocumentTableFootnote, DocumentKeyValueElement as GeneratedDocumentKeyValueElement, DocumentEntity as GeneratedDocumentEntity, Document as GeneratedDocument } from "./../generated";
export { GeneratedDocumentWord, GeneratedDocumentSelectionMark, GeneratedDocumentImage, GeneratedDocumentLine, GeneratedBoundingRegion, GeneratedDocumentParagraph, GeneratedDocumentTable, GeneratedDocumentTableCell, GeneratedDocumentTableCaption, GeneratedDocumentTableFootnote, GeneratedDocumentKeyValueElement, GeneratedDocumentEntity, GeneratedDocument };

export interface BoundingPolygonProperty {
  /** Bounding polygon of the entity. */
  polygon?: Point2D[];
}

/** Bounding polygon on a specific page of the input. */
export interface BoundingRegion extends Omit<GeneratedBoundingRegion, "polygon">, BoundingPolygonProperty { }

export interface BoundingRegionsProperty {
  /** Bounding regions covering the entity. */
  boundingRegions?: BoundingRegion[];
}

/** A word object consisting of a contiguous sequence of characters.  For non-space delimited languages, such as Chinese, Japanese, and Korean, each character is represented as its own word. */
export interface DocumentWord extends Omit<GeneratedDocumentWord, "polygon">, BoundingPolygonProperty { }

/** A selection mark object representing check boxes, radio buttons, and other elements indicating a selection. */
export interface DocumentSelectionMark extends Omit<GeneratedDocumentSelectionMark, "polygon">, BoundingPolygonProperty { }

/** An image object detected in the page. */
export interface DocumentImage extends Omit<GeneratedDocumentImage, "polygon">, BoundingPolygonProperty { }

/** A content line object consisting of an adjacent sequence of content elements, such as words and selection marks. */
export interface DocumentLine extends Omit<GeneratedDocumentLine, "polygon">, BoundingPolygonProperty { }

/** A paragraph object consisting with contiguous lines generally with common alignment and spacing. */
export interface DocumentParagraph extends Omit<GeneratedDocumentParagraph, "boundingRegions">, BoundingRegionsProperty { }

/** A table object consisting table cells arranged in a rectangular layout. */
export interface DocumentTable extends Omit<GeneratedDocumentTable, "boundingRegions">, BoundingRegionsProperty { }

/** An object representing the location and content of a table cell. */
export interface DocumentTableCell extends Omit<GeneratedDocumentTableCell, "boundingRegions">, BoundingRegionsProperty { }


/** An object representing the location and content of a table caption. */
export interface DocumentTableCaption extends Omit<GeneratedDocumentTableCaption, "boundingRegions">, BoundingRegionsProperty { }

/** An object representing the location and content of a table footnote. */
export interface DocumentTableFootnote extends Omit<GeneratedDocumentTableFootnote, "boundingRegions">, BoundingRegionsProperty { }

/** An object representing the field key or value in a key-value pair. */
export interface DocumentKeyValueElement extends Omit<GeneratedDocumentKeyValueElement, "boundingRegions">, BoundingRegionsProperty { }

/** An object representing various categories of entities. */
export interface DocumentEntity extends Omit<GeneratedDocumentEntity, "boundingRegions">, BoundingRegionsProperty { }

/** An object describing the location and semantic content of a document. */
export interface Document extends Omit<GeneratedDocument, "boundingRegions">, BoundingRegionsProperty { }

/** An object representing a form field with distinct field label (key) and field value (may be empty). */
export interface DocumentKeyValuePair {
  /** Field label of the key-value pair. */
  key: DocumentKeyValueElement;
  /** Field value of the key-value pair. */
  value?: DocumentKeyValueElement;
  /** Confidence of correctly extracting the key-value pair. */
  confidence: number;
}
