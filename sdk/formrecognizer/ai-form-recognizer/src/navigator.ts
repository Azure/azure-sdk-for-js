import {
  AnalyzedDocument,
  DocumentAnnotation,
  DocumentBarcode,
  DocumentCaption,
  DocumentField,
  DocumentFootnote,
  DocumentFormula,
  DocumentKeyValueElement,
  DocumentKeyValuePair,
  DocumentLine,
  DocumentPage,
  DocumentParagraph,
  DocumentSelectionMark,
  DocumentSpan,
  DocumentStyle,
  DocumentTableCell,
  DocumentWord,
} from ".";
import { AnalyzeResult } from "./lro/analysis";
import { Document } from "./models/documentElements";

export type DocumentElement =
  | DocumentKeyValuePair
  | DocumentLine
  | DocumentWord
  | DocumentSelectionMark
  | DocumentParagraph
  | DocumentPage
  | DocumentField
  | DocumentStyle
  | DocumentAnnotation
  | DocumentFormula
  | DocumentBarcode
  | DocumentKeyValueElement
  | DocumentTableCell
  | DocumentFootnote
  | DocumentCaption
  | AnalyzedDocument;

export interface ParentElement {
  spans?: DocumentSpan[];
}

export interface ChildElement {
  span?: DocumentSpan;
}

export type NavigationMode = (typeof NavigationMode)[keyof typeof NavigationMode];

export const NavigationMode = {
  Contains: "contains",
  Overlaps: "overlaps",
} as const;

export interface ElementNavigator {
  getAllChildren(element: ParentElement, mode?: NavigationMode): DocumentElement;
}

export const ElementNavigator = Object.freeze({
  fromAnalyzeResult(result: AnalyzeResult): ElementNavigator {
    return {
      getAllChildren(element, mode = NavigationMode.Contains) {},
    };
  },
} as const);
