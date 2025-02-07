// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The image analysis request. */
export interface AnalyzeImageOptions {
  /** The image to be analyzed. */
  image: ImageData;
  /** The categories will be analyzed. If they are not assigned, a default set of analysis results for the categories will be returned. */
  categories?: ImageCategory[];
  /**
   * This refers to the type of image analysis output. If no value is assigned, the default value will be "FourSeverityLevels".
   *
   * Possible values: "FourSeverityLevels"
   */
  outputType?: AnalyzeImageOutputType;
}

/** The image can be either base64 encoded bytes or a blob URL. You can choose only one of these options. If both are provided, the request will be refused. The maximum image size is 2048 x 2048 pixels and should not exceed 4 MB, while the minimum image size is 50 x 50 pixels. */
export interface ImageData {
  /** The Base64 encoding of the image. */
  content?: string;
  /** The blob url of the image. */
  blobUrl?: string;
}

/** The text analysis request. */
export interface AnalyzeTextOptions {
  /** The text to be analyzed. We support a maximum of 10k Unicode characters (Unicode code points) in the text of one request. */
  text: string;
  /** The categories will be analyzed. If they are not assigned, a default set of analysis results for the categories will be returned. */
  categories?: TextCategory[];
  /** The names of blocklists. */
  blocklistNames?: string[];
  /** When set to true, further analyses of harmful content will not be performed in cases where blocklists are hit. When set to false, all analyses of harmful content will be performed, whether or not blocklists are hit. */
  haltOnBlocklistHit?: boolean;
  /**
   * This refers to the type of text analysis output. If no value is assigned, the default value will be "FourSeverityLevels".
   *
   * Possible values: "FourSeverityLevels", "EightSeverityLevels"
   */
  outputType?: AnalyzeTextOutputType;
}

/** Text Blocklist. */
export interface TextBlocklist {
  /** Text blocklist name. */
  blocklistName: string;
  /** Text blocklist description. */
  description?: string;
}

/** The request to add blocklistItems to a text blocklist. */
export interface AddOrUpdateTextBlocklistItemsOptions {
  /** Array of blocklistItems to add. */
  blocklistItems: Array<TextBlocklistItem>;
}

/** Item in a TextBlocklist. */
export interface TextBlocklistItem {
  /** BlocklistItem description. */
  description?: string;
  /** BlocklistItem content. The length is counted using Unicode code point. */
  text: string;
}

/** The request to remove blocklistItems from a text blocklist. */
export interface RemoveTextBlocklistItemsOptions {
  /** Array of blocklistItemIds to remove. */
  blocklistItemIds: string[];
}

/** Alias for ImageCategory */
export type ImageCategory = string;
/** Alias for AnalyzeImageOutputType */
export type AnalyzeImageOutputType = string;
/** Alias for TextCategory */
export type TextCategory = string;
/** Alias for AnalyzeTextOutputType */
export type AnalyzeTextOutputType = string;
