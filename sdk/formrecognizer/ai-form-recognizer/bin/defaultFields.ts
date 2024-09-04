// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DocumentModelDetails } from "../src";
import { Field } from "./utils";

/**
 * @internal
 * Field information for the top level fields of `AnalyzeResult`.
 */
export const defaultResultFields: Record<string, Field> = {
  pages: {
    name: "pages",
    docContents: "Extracted pages.",
    type: "fr.DocumentPage[]",
    optional: true,
  },
  tables: {
    name: "tables",
    docContents: "Extracted tables.",
    type: "fr.DocumentTable[]",
    optional: true,
  },
  keyValuePairs: {
    name: "keyValuePairs",
    docContents: "Extracted key-value pairs.",
    type: "fr.DocumentKeyValuePair[]",
    optional: true,
  },
  languages: {
    name: "languages",
    docContents: "Extracted text languages.",
    type: "fr.DocumentLanguage[]",
    optional: true,
  },
  styles: {
    name: "styles",
    docContents: "Extracted font styles.",
    type: "fr.DocumentStyle[]",
    optional: true,
  },
  unconstrainedDocuments: {
    name: "documents",
    docContents: "Extracted documents containing any extracted fields.",
    type: "fr.AnalyzedDocument[]",
    optional: true,
  },
  paragraphs: {
    name: "paragraphs",
    docContents: "Extracted document paragraphs.",
    type: "fr.DocumentParagraph[]",
    optional: true,
  },
} as const;

const allFeatures = [
  "pages",
  "tables",
  "keyValuePairs",
  "languages",
  "styles",
  "paragraphs",
  "_documents",
];

const textFeatures = ["pages", "paragraphs", "styles"];
const layoutFeatures = [...textFeatures, "tables"];
const documentFeatures = [...layoutFeatures, "keyValuePairs"];

/**
 * @internal
 * @param model - the model to get the features of
 * @returns the list of features supported by the model
 */
export function getFeatures(model: DocumentModelDetails): string[] {
  return (
    (model as any).features ??
    {
      "prebuilt-read": [...textFeatures, "languages"],
      "prebuilt-layout": layoutFeatures,
      "prebuilt-document": [...documentFeatures, "unconstrainedDocuments"],
      "prebuilt-receipt": [...textFeatures, "keyValuePairs", "_documents"],
      "prebuilt-invoice": [...layoutFeatures, "keyValuePairs", "_documents"],
      "prebuilt-idDocument": [...textFeatures, "keyValuePairs", "_documents"],
      "prebuilt-businessCard": [...textFeatures, "keyValuePairs", "_documents"],
      "prebuilt-tax.us.w2": [...textFeatures, "keyValuePairs", "_documents"],
      "prebuilt-vaccinationCard": [...textFeatures, "keyValuePairs", "_documents"],
      "prebuilt-healthInsuranceCard.us": [...textFeatures, "keyValuePairs", "_documents"],
    }[model.modelId] ??
    (model.modelId.startsWith("prebuilt-") ? allFeatures : [...documentFeatures, "_documents"])
  );
}
