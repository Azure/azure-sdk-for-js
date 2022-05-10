import {
  DocumentWord as GeneratedDocumentWord,
  DocumentSelectionMark as GeneratedDocumentSelectionMark,
  DocumentImage as GeneratedDocumentImage,
  DocumentLine as GeneratedDocumentLine,
  DocumentParagraph as GeneratedDocumentParagraph,
  DocumentTable as GeneratedDocumentTable,
  DocumentTableCell as GeneratedDocumentTableCell,
  DocumentTableCaption as GeneratedDocumentTableCaption,
  DocumentTableFootnote as GeneratedDocumentTableFootnote,
  DocumentKeyValueElement as GeneratedDocumentKeyValueElement,
  DocumentEntity as GeneratedDocumentEntity,
  Document as GeneratedDocument,
} from "../../src/generated";
import {
  Document,
  DocumentEntity,
  DocumentImage,
  DocumentKeyValueElement,
  DocumentLine,
  DocumentParagraph,
  DocumentSelectionMark,
  DocumentTable,
  DocumentTableCaption,
  DocumentTableCell,
  DocumentTableFootnote,
  DocumentWord,
} from "../../src/models/modified";

function checkAssign<Generated>(_model: Generated) {}

declare const word: DocumentWord;
declare const selectionMark: DocumentSelectionMark;
declare const documentImage: DocumentImage;
declare const documentLine: DocumentLine;
declare const documentParagraph: DocumentParagraph;
declare const documentTable: DocumentTable;
declare const documentTableCell: DocumentTableCell;
declare const documentTableCaption: DocumentTableCaption;
declare const documentTableFootnote: DocumentTableFootnote;
declare const documentKeyValueElement: DocumentKeyValueElement;
declare const documentEntity: DocumentEntity;
declare const document: Document;

checkAssign<Omit<GeneratedDocumentWord, "polygon">>(word);
checkAssign<Omit<GeneratedDocumentSelectionMark, "polygon">>(selectionMark);
checkAssign<Omit<GeneratedDocumentImage, "polygon">>(documentImage);
checkAssign<Omit<GeneratedDocumentLine, "polygon">>(documentLine);
checkAssign<Omit<GeneratedDocumentParagraph, "boundingRegions">>(documentParagraph);
checkAssign<Omit<GeneratedDocumentTableCell, "boundingRegions">>(documentTableCell);
checkAssign<Omit<GeneratedDocumentTableCaption, "boundingRegions">>(documentTableCaption);
checkAssign<Omit<GeneratedDocumentTableFootnote, "boundingRegions">>(documentTableFootnote);
checkAssign<Omit<GeneratedDocumentTable, "boundingRegions" | "cells" | "caption" | "footnotes">>(
  documentTable
);
checkAssign<Omit<GeneratedDocumentKeyValueElement, "boundingRegions">>(documentKeyValueElement);
checkAssign<Omit<GeneratedDocumentEntity, "boundingRegions">>(documentEntity);
checkAssign<Omit<GeneratedDocument, "boundingRegions">>(document);
