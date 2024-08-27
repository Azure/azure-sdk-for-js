// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Document as GeneratedDocument,
  DocumentKeyValueElement as GeneratedDocumentKeyValueElement,
  DocumentLine as GeneratedDocumentLine,
  DocumentPage as GeneratedDocumentPage,
  DocumentParagraph as GeneratedDocumentParagraph,
  DocumentSelectionMark as GeneratedDocumentSelectionMark,
  DocumentTable as GeneratedDocumentTable,
  DocumentTableCell as GeneratedDocumentTableCell,
  DocumentWord as GeneratedDocumentWord,
  DocumentBarcode as GeneratedDocumentBarcode,
  DocumentFormula as GeneratedDocumentFormula,
} from "../../src/generated";
import {
  Document,
  DocumentKeyValueElement,
  DocumentLine,
  DocumentPage,
  DocumentParagraph,
  DocumentSelectionMark,
  DocumentTable,
  DocumentTableCell,
  DocumentWord,
  DocumentAnnotation,
  DocumentBarcode,
  DocumentFormula,
} from "../../src/models/documentElements";

// To avoid going out-of-sync with the generated types, we test the re-constructed interfaces are following the shapes in the generated interfaces in this test file.

function checkAssign<T>(_model: T) {
  /* intentionally empty */
}

declare const word: DocumentWord;
declare const selectionMark: DocumentSelectionMark;
declare const documentLine: DocumentLine;
declare const documentParagraph: DocumentParagraph;
declare const documentTable: DocumentTable;
declare const documentTableCell: DocumentTableCell;
declare const documentKeyValueElement: DocumentKeyValueElement;
declare const document: Document;
declare const documentPage: DocumentPage;
declare const documentAnnotation: DocumentAnnotation;
declare const documentBarcode: DocumentBarcode;
declare const documentFormula: DocumentFormula;

checkAssign<Omit<GeneratedDocumentWord, "polygon">>(word);
checkAssign<Omit<GeneratedDocumentSelectionMark, "polygon">>(selectionMark);
checkAssign<Omit<GeneratedDocumentLine, "polygon">>(documentLine);
checkAssign<Omit<GeneratedDocumentBarcode, "polygon">>(documentBarcode);
checkAssign<Omit<GeneratedDocumentFormula, "polygon">>(documentFormula);
checkAssign<Omit<GeneratedDocumentParagraph, "boundingRegions">>(documentParagraph);
checkAssign<Omit<GeneratedDocumentTableCell, "boundingRegions">>(documentTableCell);
checkAssign<Omit<GeneratedDocumentTable, "boundingRegions" | "cells" | "caption" | "footnotes">>(
  documentTable,
);
checkAssign<Omit<GeneratedDocumentKeyValueElement, "boundingRegions">>(documentKeyValueElement);
checkAssign<Omit<GeneratedDocument, "boundingRegions">>(document);
checkAssign<
  Omit<
    GeneratedDocumentPage,
    "images" | "words" | "selectionMarks" | "lines" | "annotations" | "barcodes" | "formulas"
  >
>(documentPage);

// The following completes the test for mutual assignability, makes sure there are no mismatches w.r.t the {required/optional}-ity for the properties in Generated vs Publicly Exposed.

declare const generatedWord: GeneratedDocumentWord;
declare const generatedSelectionMark: GeneratedDocumentSelectionMark;
declare const generatedDocumentLine: GeneratedDocumentLine;
declare const generatedDocumentParagraph: GeneratedDocumentParagraph;
declare const generatedDocumentTable: GeneratedDocumentTable;
declare const generatedDocumentTableCell: GeneratedDocumentTableCell;
declare const generatedDocumentKeyValueElement: GeneratedDocumentKeyValueElement;
declare const generatedDocument: GeneratedDocument;
declare const generatedDocumentPage: GeneratedDocumentPage;
declare const generatedDocumentBarcode: GeneratedDocumentBarcode;
declare const generatedDocumentFormula: GeneratedDocumentFormula;

checkAssign<Omit<DocumentWord, "polygon">>(generatedWord);
checkAssign<Omit<DocumentSelectionMark, "polygon">>(generatedSelectionMark);
checkAssign<Omit<DocumentLine, "polygon" | "words">>(generatedDocumentLine);
checkAssign<Omit<DocumentBarcode, "polygon">>(generatedDocumentBarcode);
checkAssign<Omit<DocumentFormula, "polygon">>(generatedDocumentFormula);
checkAssign<Omit<DocumentParagraph, "boundingRegions">>(generatedDocumentParagraph);
checkAssign<Omit<DocumentTableCell, "boundingRegions">>(generatedDocumentTableCell);
checkAssign<Omit<DocumentTable, "boundingRegions" | "cells" | "caption" | "footnotes">>(
  generatedDocumentTable,
);
checkAssign<Omit<DocumentKeyValueElement, "boundingRegions">>(generatedDocumentKeyValueElement);
checkAssign<Omit<Document, "boundingRegions">>(generatedDocument);
checkAssign<
  Omit<DocumentPage, "words" | "selectionMarks" | "lines" | "annotations" | "barcodes" | "formulas">
>(generatedDocumentPage);
