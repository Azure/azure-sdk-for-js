// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** The analysis request of the text. */
export interface AnalyzeTextOptions {
  /** The text needs to be scanned. We support at most 1000 characters (unicode code points) in text of one request. */
  text: string;
  /** The categories will be analyzed. If not assigned, a default set of the categories' analysis results will be returned. */
  categories?: string[];
  /** The names of blocklists. */
  blocklistNames?: string[];
  /** When set to true, further analyses of harmful content will not be performed in cases where blocklists are hit. When set to false, all analyses of harmful content will be performed, whether or not blocklists are hit. */
  breakByBlocklists?: boolean;
}

/** The analysis request of the image. */
export interface AnalyzeImageOptions {
  /** The image needs to be analyzed. */
  image: ImageData;
  /** The categories will be analyzed. If not assigned, a default set of the categories' analysis results will be returned. */
  categories?: string[];
}

/** The content or blob url of image, could be base64 encoding bytes or blob url. If both are given, the request will be refused. The maximum size of image is 2048 pixels * 2048 pixels, no larger than 4MB at the same time. The minimum size of image is 50 pixels * 50 pixels. */
export interface ImageData {
  /** Base64 encoding of image. */
  content?: string;
  /** The blob url of image. */
  blobUrl?: string;
}

/** Text Blocklist. */
export interface TextBlocklist {
  /** Text blocklist name. */
  blocklistName: string;
  /** Text blocklist description. */
  description?: string;
}

/** The request of adding blockItems to text blocklist. */
export interface AddBlockItemsOptions {
  /** Array of blockItemInfo to add. */
  blockItems: Array<TextBlockItemInfo>;
}

/** Block item info in text blocklist. */
export interface TextBlockItemInfo {
  /** Block item description. */
  description?: string;
  /** Block item content. */
  text: string;
}

/** The request of removing blockItems from text blocklist. */
export interface RemoveBlockItemsOptions {
  /** Array of blockItemIds to remove. */
  blockItemIds: string[];
}
