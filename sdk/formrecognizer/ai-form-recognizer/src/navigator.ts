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
// @ts-ignore
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
  fromAnalyzeResult(_result: AnalyzeResult): ElementNavigator {
    return {
      getAllChildren(_element, _mode = NavigationMode.Contains) {
        return null as unknown as  DocumentElement;
      },
    };
  },
} as const);
