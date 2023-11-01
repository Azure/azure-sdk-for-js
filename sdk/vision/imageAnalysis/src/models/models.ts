// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Describe the combined results of different types of image analysis. */
export interface ImageAnalysisResult {
  /** A CaptionResult for the image. */
  captionResult?: CaptionResult;
  /** A list of categories for the image. */
  customModelResult?: CustomModelResult;
  /** A denseCaptionsResult for the image. */
  denseCaptionsResult?: DenseCaptionsResult;
  /** The model used for the analysis */
  metadata: ImageMetadata;
  /** The model used for the analysis */
  modelVersion: string;
  /** A list of objects for the image. */
  objectsResult?: ObjectsResult;
  /** A list of people for the image. */
  peopleResult?: PeopleResult;
  /** A readResult for the image. */
  readResult?: ReadResult;
  /** A list of regions for the image. */
  smartCropsResult?: SmartCropsResult;
  /** A list of tags for the image. */
  tagsResult?: TagsResult;
}

/** A brief description of what the image depicts. */
export interface CaptionResult {
  /** The level of confidence the service has in the caption. */
  confidence: number;
  /** The text of the caption. */
  text: string;
}

/** Describes the result of image analysis using a custom model. */
export interface CustomModelResult {
  /** The list of predicted objects. */
  objectsResult: ObjectsResult;
  /** The list of predicted tags. */
  tagsResult: TagsResult;
}

/** Describes detected objects in an image. */
export interface ObjectsResult {
  /** An array of detected objects. */
  values: DetectedObject[];
}

/** Describes a detected object in an image. */
export interface DetectedObject {
  /** Gets a rectangular boundary within which the object was detected. */
  boundingBox: BoundingBox;
  /** Classification confidences of the detected object. */
  tags: DetectedTag[];
}

/** A basic rectangle */
export interface BoundingBox {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Width of the box */
  w: number;
  /** Height of the box */
  h: number;
}

/** An entity observation in the image, along with the confidence score. */
export interface DetectedTag {
  /** The level of confidence that the entity was observed. */
  confidence: number;
  /** Name of the entity. */
  name: string;
}

/** A list of tags with confidence level. */
export interface TagsResult {
  /** A list of tags with confidence level. */
  values: DetectedTag[];
}

/** A list of captions. */
export interface DenseCaptionsResult {
  /** The list of captions. */
  values: DenseCaption[];
}

/** A brief description of what the image depicts. */
export interface DenseCaption {
  /** The level of confidence the service has in the caption. */
  confidence: number;
  /** The text of the caption. */
  text: string;
  /** The bounding box of the caption. */
  boundingBox: BoundingBox;
}

/** The image metadata information such as height and width. */
export interface ImageMetadata {
  /** The height of the image in pixels. */
  height: number;
  /** The width of the image in pixels. */
  width: number;
}

/** An object describing whether the image contains people. */
export interface PeopleResult {
  /** An array of detected people. */
  values: DetectedPerson[];
}

/** Represents a person detected in an image */
export interface DetectedPerson {
  /** Gets a rectangular boundary within which the person was detected. */
  readonly boundingBox: BoundingBox;
  /** Gets the confidence value of the detected person. */
  readonly confidence: number;
}

/** The results of an Read operation. */
export interface ReadResult {
  /** Concatenate string representation of all textual and visual elements in reading order. */
  content: string;
  /** A list of analyzed pages. */
  pages: DocumentPage[];
  /** The method used to compute string offset and length, possible values include: 'textElements', 'unicodeCodePoint', 'utf16CodeUnit' etc. */
  stringIndexType: string;
  /** Extracted font styles. */
  styles: DocumentStyle[];
  /** The model used to generate the Read result. */
  modelVersion: string;
}

/** The content and layout elements extracted from a page from the input. */
export interface DocumentPage {
  /** The general orientation of the content in clockwise direction, measured in degrees between (-180, 180]. */
  angle: number;
  /** The height of the image/PDF in pixels/inches, respectively. */
  height: number;
  /** Extracted lines from the page, potentially containing both textual and visual elements. */
  lines: DocumentLine[];
  /** 1-based page number in the input document. */
  pageNumber: number;
  /** Location of the page in the reading order concatenated content. */
  spans: DocumentSpan[];
  /** The width of the image/PDF in pixels/inches, respectively. */
  width: number;
  /** Extracted words from the page. */
  words: DocumentWord[];
}

/** A content line object consisting of an adjacent sequence of content elements, such as words and selection marks. */
export interface DocumentLine {
  /** The bounding box of the line. */
  boundingBox: number[];
  /** Concatenated content of the contained elements in reading order. */
  content: string;
  /** Location of the line in the reading order concatenated content. */
  spans: DocumentSpan[];
}

/** Contiguous region of the concatenated content property, specified as an offset and length. */
export interface DocumentSpan {
  /** Number of characters in the content represented by the span. */
  length: number;
  /** Zero-based index of the content represented by the span. */
  offset: number;
}

/**
 * A word object consisting of a contiguous sequence of characters. For non-space delimited languages,
 * such as Chinese, Japanese, and Korean, each character is represented as its own word.
 */
export interface DocumentWord {
  /** Bounding box of the word. */
  boundingBox: number[];
  /** Confidence of correctly extracting the word. */
  confidence: number;
  /** Text content of the word. */
  content: string;
  /** Location of the word in the reading order concatenated content. */
  span: DocumentSpan;
}

/** An object representing observed text styles. */
export interface DocumentStyle {
  /** Confidence of correctly identifying the style. */
  confidence: number;
  /** Is content handwritten or not. */
  isHandwritten: boolean;
  /** Location of the text elements in the concatenated content the style applies to. */
  spans: DocumentSpan[];
}

/** Smart cropping result. */
export interface SmartCropsResult {
  /** Recommended regions for cropping the image. */
  values: CropRegion[];
}

/** A region identified for smart cropping. There will be one region returned for each requested aspect ratio. */
export interface CropRegion {
  /** The aspect ratio of the crop region. */
  aspectRatio: number;
  /** The bounding box of the crop region. */
  boundingBox: BoundingBox;
}

/** A JSON document with a URL pointing to the image that is to be analyzed. */
export interface ImageUrl {
  /** Publicly reachable URL of an image. */
  url: string;
}

/** The visual features requested: tags, objects, caption, denseCaptions, read, smartCrops, people. This parameter needs to be specified if the parameter "model-name" is not specified. */
/** "tags", "caption", "denseCaptions", "objects", "read", "smartCrops", "people" */
export type VisualFeatures = string;
/** The segmentation mode requested. */
/** "backgroundRemoval", "foregroundMatting" */
export type segmentationMode = string;
