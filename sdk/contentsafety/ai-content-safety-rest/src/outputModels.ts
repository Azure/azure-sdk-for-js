// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Paged } from "@azure/core-paging";

/** The text analysis request. */
export interface AnalyzeTextOptionsOutput {
  /** The text needs to be analyzed. We support a maximum of 10k Unicode characters (Unicode code points) in the text of one request. */
  text: string;
  /** The categories will be analyzed. If they are not assigned, a default set of analysis results for the categories will be returned. */
  categories?: string[];
  /** The names of blocklists. */
  blocklistNames?: string[];
  /** When set to true, further analyses of harmful content will not be performed in cases where blocklists are hit. When set to false, all analyses of harmful content will be performed, whether or not blocklists are hit. */
  haltOnBlocklistHit?: boolean;
  /**
   * This refers to the type of text analysis output. If no value is assigned, the default value will be "FourSeverityLevels".
   *
   * Possible values: FourSeverityLevels, EightSeverityLevels
   */
  outputType?: string;
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
   * Possible values: Hate, SelfHarm, Sexual, Violence
   */
  category: string;
  /** The value increases with the severity of the input content. The value of this field is determined by the output type specified in the request. The output type could be ‘FourSeverityLevels’ or ‘EightSeverity Levels’, and the output value can be 0, 2, 4, 6 or 0, 1, 2, 3, 4, 5, 6, or 7. */
  severity?: number;
}

/** The image analysis request. */
export interface AnalyzeImageOptionsOutput {
  /** The image needs to be analyzed. */
  image: ImageDataOutput;
  /** The categories will be analyzed. If they are not assigned, a default set of analysis results for the categories will be returned. */
  categories?: string[];
  /**
   * This refers to the type of image analysis output. If no value is assigned, the default value will be "FourSeverityLevels".
   *
   * Possible values: FourSeverityLevels
   */
  outputType?: string;
}

/** The image can be either base64 encoded bytes or a blob URL. You can choose only one of these options. If both are provided, the request will be refused. The maximum image size is 2048 x 2048 pixels and should not exceed 4 MB, while the minimum image size is 50 x 50 pixels. */
export interface ImageDataOutput {
  /** The Base64 encoding of the image. */
  content?: string;
  /** The blob url of the image. */
  blobUrl?: string;
}

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
   * Possible values: Hate, SelfHarm, Sexual, Violence
   */
  category: string;
  /** The value increases with the severity of the input content. The value of this field is determined by the output type specified in the request. The output type could be ‘FourSeverityLevels’, and the output value can be 0, 2, 4, 6. */
  severity?: number;
}

/** Text Blocklist. */
export interface TextBlocklistOutput {
  /** Text blocklist name. */
  blocklistName: string;
  /** Text blocklist description. */
  description?: string;
}

/** Item in a TextBlocklist. */
export interface TextBlocklistItemOutput {
  /** The service will generate a BlocklistItemId, which will be a UUID. */
  readonly blocklistItemId: string;
  /** BlocklistItem description. */
  description?: string;
  /** BlocklistItem content. */
  text: string;
}

/** The response of adding blocklistItems to the text blocklist. */
export interface AddOrUpdateTextBlocklistItemsResultOutput {
  /** Array of blocklistItems have been added. */
  blocklistItems: Array<TextBlocklistItemOutput>;
}

/** Paged collection of TextBlocklist items */
export type PagedTextBlocklistOutput = Paged<TextBlocklistOutput>;
/** Paged collection of TextBlocklistItem items */
export type PagedTextBlocklistItemOutput = Paged<TextBlocklistItemOutput>;
