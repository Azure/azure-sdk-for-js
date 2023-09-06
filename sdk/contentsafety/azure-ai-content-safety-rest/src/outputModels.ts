// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Paged } from "@azure/core-paging";

/** The analysis request of the text. */
export interface AnalyzeTextOptionsOutput {
  /** The text needs to be scanned. We support at most 1000 characters (unicode code points) in text of one request. */
  text: string;
  /** The categories will be analyzed. If not assigned, a default set of the categories' analysis results will be returned. */
  categories?: string[];
  /** The names of blocklists. */
  blocklistNames?: string[];
  /** When set to true, further analyses of harmful content will not be performed in cases where blocklists are hit. When set to false, all analyses of harmful content will be performed, whether or not blocklists are hit. */
  breakByBlocklists?: boolean;
}

/** The analysis response of the text */
export interface AnalyzeTextResultOutput {
  /** The details of blocklist match. */
  blocklistsMatchResults?: Array<TextBlocklistMatchResultOutput>;
  /** Analysis result for Hate category. */
  hateResult?: TextAnalyzeSeverityResultOutput;
  /** Analysis result for SelfHarm category. */
  selfHarmResult?: TextAnalyzeSeverityResultOutput;
  /** Analysis result for Sexual category. */
  sexualResult?: TextAnalyzeSeverityResultOutput;
  /** Analysis result for Violence category. */
  violenceResult?: TextAnalyzeSeverityResultOutput;
}

/** The result of blocklist match. */
export interface TextBlocklistMatchResultOutput {
  /** The name of matched blocklist. */
  blocklistName: string;
  /** The id of matched item. */
  blockItemId: string;
  /** The content of matched item. */
  blockItemText: string;
  /** The character offset of matched text in original input. */
  offset: number;
  /** The length of matched text in original input. */
  length: number;
}

/** Text analysis result. */
export interface TextAnalyzeSeverityResultOutput {
  /**
   * The text category.
   *
   * Possible values: Hate, SelfHarm, Sexual, Violence
   */
  category: string;
  /** The higher the severity of input content, the larger this value is. The values could be: 0,2,4,6. */
  severity: number;
}

/** The analysis request of the image. */
export interface AnalyzeImageOptionsOutput {
  /** The image needs to be analyzed. */
  image: ImageDataOutput;
  /** The categories will be analyzed. If not assigned, a default set of the categories' analysis results will be returned. */
  categories?: string[];
}

/** The content or blob url of image, could be base64 encoding bytes or blob url. If both are given, the request will be refused. The maximum size of image is 2048 pixels * 2048 pixels, no larger than 4MB at the same time. The minimum size of image is 50 pixels * 50 pixels. */
export interface ImageDataOutput {
  /** Base64 encoding of image. */
  content?: string;
  /** The blob url of image. */
  blobUrl?: string;
}

/** The analysis response of the image. */
export interface AnalyzeImageResultOutput {
  /** Analysis result for Hate category. */
  hateResult?: ImageAnalyzeSeverityResultOutput;
  /** Analysis result for SelfHarm category. */
  selfHarmResult?: ImageAnalyzeSeverityResultOutput;
  /** Analysis result for Sexual category. */
  sexualResult?: ImageAnalyzeSeverityResultOutput;
  /** Analysis result for Violence category. */
  violenceResult?: ImageAnalyzeSeverityResultOutput;
}

/** Image analysis result. */
export interface ImageAnalyzeSeverityResultOutput {
  /**
   * The image category.
   *
   * Possible values: Hate, SelfHarm, Sexual, Violence
   */
  category: string;
  /** The higher the severity of input content, the larger this value, currently its value could be: 0,2,4,6. */
  severity: number;
}

/** Text Blocklist. */
export interface TextBlocklistOutput {
  /** Text blocklist name. */
  blocklistName: string;
  /** Text blocklist description. */
  description?: string;
}

/** The response of adding blockItems to text blocklist. */
export interface AddBlockItemsResultOutput {
  /** Array of blockItems added. */
  value?: Array<TextBlockItemOutput>;
}

/** Item in TextBlocklist. */
export interface TextBlockItemOutput {
  /** Block Item Id. It will be uuid. */
  blockItemId: string;
  /** Block item description. */
  description?: string;
  /** Block item content. */
  text: string;
}

/** Paged collection of TextBlocklist items */
export type PagedTextBlocklistOutput = Paged<TextBlocklistOutput>;
/** Paged collection of TextBlockItem items */
export type PagedTextBlockItemOutput = Paged<TextBlockItemOutput>;
