// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The image analysis response. */
export interface AnalyzeImageResultOutput {
  /** Analysis result for categories. */
  categoriesAnalysis: Array<ImageCategoriesAnalysisOutput>;
}

/** Image analysis result. */
export interface ImageCategoriesAnalysisOutput {
  /**
   * The image analysis category.
   *
   * Possible values: "Hate", "SelfHarm", "Sexual", "Violence"
   */
  category: ImageCategoryOutput;
  /** The value increases with the severity of the input content. The value of this field is determined by the output type specified in the request. The output type could be ‘FourSeverityLevels’, and the output value can be 0, 2, 4, 6. */
  severity?: number;
}

/** The text analysis response. */
export interface AnalyzeTextResultOutput {
  /** The blocklist match details. */
  blocklistsMatch?: Array<TextBlocklistMatchOutput>;
  /** Analysis result for categories. */
  categoriesAnalysis: Array<TextCategoriesAnalysisOutput>;
}

/** The result of blocklist match. */
export interface TextBlocklistMatchOutput {
  /** The name of the matched blocklist. */
  blocklistName: string;
  /** The ID of the matched item. */
  blocklistItemId: string;
  /** The content of the matched item. */
  blocklistItemText: string;
}

/** Text analysis result. */
export interface TextCategoriesAnalysisOutput {
  /**
   * The text analysis category.
   *
   * Possible values: "Hate", "SelfHarm", "Sexual", "Violence"
   */
  category: TextCategoryOutput;
  /** The value increases with the severity of the input content. The value of this field is determined by the output type specified in the request. The output type could be ‘FourSeverityLevels’ or ‘EightSeverity Levels’, and the output value can be 0, 2, 4, 6 or 0, 1, 2, 3, 4, 5, 6, or 7. */
  severity?: number;
}

/** The combined analysis results of potential direct or indirect injection attacks. */
export interface ShieldPromptResultOutput {
  /** Direct injection attacks analysis result for the given user prompt. */
  userPromptAnalysis?: UserPromptInjectionAnalysisResultOutput;
  /** Direct and indirect injection attacks analysis result for the given documents. */
  documentsAnalysis?: Array<DocumentInjectionAnalysisResultOutput>;
}

/** The individual analysis result of potential injection attacks in the given user prompt. */
export interface UserPromptInjectionAnalysisResultOutput {
  /** Whether a potential injection attack is detected or not. */
  attackDetected: boolean;
}

/** The individual analysis result of potential injection attacks in the given documents. */
export interface DocumentInjectionAnalysisResultOutput {
  /** Whether a potential injection attack is detected or not. */
  attackDetected: boolean;
}

/** The combined detection results of potential protected material. */
export interface DetectTextProtectedMaterialResultOutput {
  /** Analysis result for the given text. */
  protectedMaterialAnalysis: TextProtectedMaterialAnalysisResultOutput;
}

/** The individual detection result of potential protected material. */
export interface TextProtectedMaterialAnalysisResultOutput {
  /** Whether potential protected material is detected or not. */
  detected: boolean;
}

/** Text Blocklist. */
export interface TextBlocklistOutput {
  /** Text blocklist name. */
  blocklistName: string;
  /** Text blocklist description. */
  description?: string;
}

/** Paged collection of TextBlocklist items */
export interface PagedTextBlocklistOutput {
  /** The TextBlocklist items on this page */
  value: Array<TextBlocklistOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Item in a TextBlocklist. */
export interface TextBlocklistItemOutput {
  /** The service will generate a BlocklistItemId, which will be a UUID. */
  readonly blocklistItemId: string;
  /** BlocklistItem description. */
  description?: string;
  /** BlocklistItem content. The length is counted using Unicode code point. */
  text: string;
  /** An optional properties indicating whether this item is to be matched as a regular expression. */
  isRegex?: boolean;
}

/** The response of adding blocklistItems to the text blocklist. */
export interface AddOrUpdateTextBlocklistItemsResultOutput {
  /** Array of blocklistItems have been added. */
  blocklistItems: Array<TextBlocklistItemOutput>;
}

/** Paged collection of TextBlocklistItem items */
export interface PagedTextBlocklistItemOutput {
  /** The TextBlocklistItem items on this page */
  value: Array<TextBlocklistItemOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Alias for ImageCategoryOutput */
export type ImageCategoryOutput = string;
/** Alias for TextCategoryOutput */
export type TextCategoryOutput = string;
