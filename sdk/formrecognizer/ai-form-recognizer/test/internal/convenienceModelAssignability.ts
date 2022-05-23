import {
  DocumentWord as GeneratedDocumentWord,
  DocumentSelectionMark as GeneratedDocumentSelectionMark,
  DocumentImage as GeneratedDocumentImage,
  DocumentLine as GeneratedDocumentLine,
  DocumentParagraph as GeneratedDocumentParagraph,
  DocumentTable as GeneratedDocumentTable,
  DocumentTableCell as GeneratedDocumentTableCell,
  DocumentCaption as GeneratedDocumentCaption,
  DocumentFootnote as GeneratedDocumentFootnote,
  DocumentKeyValueElement as GeneratedDocumentKeyValueElement,
  DocumentEntity as GeneratedDocumentEntity,
  Document as GeneratedDocument,
  DocumentPage as GeneratedDocumentPage,
} from "../../src/generated";
import {
  Document,
  DocumentEntity,
  DocumentImage,
  DocumentKeyValueElement,
  DocumentLine,
  DocumentPage,
  DocumentParagraph,
  DocumentSelectionMark,
  DocumentTable,
  DocumentCaption,
  DocumentTableCell,
  DocumentFootnote,
  DocumentWord,
} from "../../src/models/documentElements";

// To avoid going out-of-sync with the generated types, we test the re-constructed interfaces are following the shapes in the generated interfaces in this test file.

function checkAssign<T>(_model: T) { }

declare const word: DocumentWord;
declare const selectionMark: DocumentSelectionMark;
declare const documentImage: DocumentImage;
declare const documentLine: DocumentLine;
declare const documentParagraph: DocumentParagraph;
declare const documentTable: DocumentTable;
declare const documentTableCell: DocumentTableCell;
declare const documentCaption: DocumentCaption;
declare const documentFootnote: DocumentFootnote;
declare const documentKeyValueElement: DocumentKeyValueElement;
declare const documentEntity: DocumentEntity;
declare const document: Document;
declare const documentPage: DocumentPage;

checkAssign<Omit<GeneratedDocumentWord, "polygon">>(word);
checkAssign<Omit<GeneratedDocumentSelectionMark, "polygon">>(selectionMark);
checkAssign<Omit<GeneratedDocumentImage, "polygon">>(documentImage);
checkAssign<Omit<GeneratedDocumentLine, "polygon">>(documentLine);
checkAssign<Omit<GeneratedDocumentParagraph, "boundingRegions">>(documentParagraph);
checkAssign<Omit<GeneratedDocumentTableCell, "boundingRegions">>(documentTableCell);
checkAssign<Omit<GeneratedDocumentCaption, "boundingRegions">>(documentCaption);
checkAssign<Omit<GeneratedDocumentFootnote, "boundingRegions">>(documentFootnote);
checkAssign<Omit<GeneratedDocumentTable, "boundingRegions" | "cells" | "caption" | "footnotes">>(
  documentTable
);
checkAssign<Omit<GeneratedDocumentKeyValueElement, "boundingRegions">>(documentKeyValueElement);
checkAssign<Omit<GeneratedDocumentEntity, "boundingRegions">>(documentEntity);
checkAssign<Omit<GeneratedDocument, "boundingRegions">>(document);
checkAssign<Omit<GeneratedDocumentPage, "images" | "words" | "selectionMarks" | "lines">>(
  documentPage
);

// The following completes the test for mutual assignability, makes sure there are no mismatches w.r.t the {required/optional}-ity for the properties in Generated vs Publicly Exposed.

declare const generatedWord: GeneratedDocumentWord;
declare const generatedSelectionMark: GeneratedDocumentSelectionMark;
declare const generatedDocumentImage: GeneratedDocumentImage;
declare const generatedDocumentLine: GeneratedDocumentLine;
declare const generatedDocumentParagraph: GeneratedDocumentParagraph;
declare const generatedDocumentTable: GeneratedDocumentTable;
declare const generatedDocumentTableCell: GeneratedDocumentTableCell;
declare const generatedDocumentCaption: GeneratedDocumentCaption;
declare const generatedDocumentFootnote: GeneratedDocumentFootnote;
declare const generatedDocumentKeyValueElement: GeneratedDocumentKeyValueElement;
declare const generatedDocumentEntity: GeneratedDocumentEntity;
declare const generatedDocument: GeneratedDocument;
declare const generatedDocumentPage: GeneratedDocumentPage;

checkAssign<Omit<DocumentWord, "polygon">>(generatedWord);
checkAssign<Omit<DocumentSelectionMark, "polygon">>(generatedSelectionMark);
checkAssign<Omit<DocumentImage, "polygon">>(generatedDocumentImage);
checkAssign<Omit<DocumentLine, "polygon" | "words">>(generatedDocumentLine);
checkAssign<Omit<DocumentParagraph, "boundingRegions">>(generatedDocumentParagraph);
checkAssign<Omit<DocumentTableCell, "boundingRegions">>(generatedDocumentTableCell);
checkAssign<Omit<DocumentCaption, "boundingRegions">>(generatedDocumentCaption);
checkAssign<Omit<DocumentFootnote, "boundingRegions">>(generatedDocumentFootnote);
checkAssign<Omit<DocumentTable, "boundingRegions" | "cells" | "caption" | "footnotes">>(generatedDocumentTable
);
checkAssign<Omit<DocumentKeyValueElement, "boundingRegions">>(generatedDocumentKeyValueElement);
checkAssign<Omit<DocumentEntity, "boundingRegions">>(generatedDocumentEntity);
checkAssign<Omit<Document, "boundingRegions">>(generatedDocument);
checkAssign<Omit<DocumentPage, "images" | "words" | "selectionMarks" | "lines">>(generatedDocumentPage
);
