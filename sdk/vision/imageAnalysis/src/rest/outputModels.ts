// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Describe the combined results of different types of image analysis. */
export interface ImageAnalysisResultOutput {
  /** A CaptionResult for the image. */
  captionResult?: CaptionResultOutput;
  /** A list of categories for the image. */
  customModelResult?: CustomModelResultOutput;
  /** A denseCaptionsResult for the image. */
  denseCaptionsResult?: DenseCaptionsResultOutput;
  /** The model used for the analysis */
  metadata: ImageMetadataOutput;
  /** The model used for the analysis */
  modelVersion: string;
  /** A list of objects for the image. */
  objectsResult?: ObjectsResultOutput;
  /** A list of people for the image. */
  peopleResult?: PeopleResultOutput;
  /** A readResult for the image. */
  readResult?: ReadResultOutput;
  /** A list of regions for the image. */
  smartCropsResult?: SmartCropsResultOutput;
  /** A list of tags for the image. */
  tagsResult?: TagsResultOutput;
}

/** A brief description of what the image depicts. */
export interface CaptionResultOutput {
  /** The level of confidence the service has in the caption. */
  confidence: number;
  /** The text of the caption. */
  text: string;
}

/** Describes the result of image analysis using a custom model. */
export interface CustomModelResultOutput {
  /** The list of predicted objects. */
  objectsResult: ObjectsResultOutput;
  /** The list of predicted tags. */
  tagsResult: TagsResultOutput;
}

/** Describes detected objects in an image. */
export interface ObjectsResultOutput {
  /** An array of detected objects. */
  values: Array<DetectedObjectOutput>;
}

/** Describes a detected object in an image. */
export interface DetectedObjectOutput {
  /** Gets a rectangular boundary within which the object was detected. */
  boundingBox: BoundingBoxOutput;
  /** Classification confidences of the detected object. */
  tags: Array<DetectedTagOutput>;
}

/** A basic rectangle */
export interface BoundingBoxOutput {
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
export interface DetectedTagOutput {
  /** The level of confidence that the entity was observed. */
  confidence: number;
  /** Name of the entity. */
  name: string;
}

/** A list of tags with confidence level. */
export interface TagsResultOutput {
  /** A list of tags with confidence level. */
  values: Array<DetectedTagOutput>;
}

/** A list of captions. */
export interface DenseCaptionsResultOutput {
  /** The list of captions. */
  values: Array<DenseCaptionOutput>;
}

/** A brief description of what the image depicts. */
export interface DenseCaptionOutput {
  /** The level of confidence the service has in the caption. */
  confidence: number;
  /** The text of the caption. */
  text: string;
  /** The bounding box of the caption. */
  boundingBox: BoundingBoxOutput;
}

/** The image metadata information such as height and width. */
export interface ImageMetadataOutput {
  /** The height of the image in pixels. */
  height: number;
  /** The width of the image in pixels. */
  width: number;
}

/** An object describing whether the image contains people. */
export interface PeopleResultOutput {
  /** An array of detected people. */
  values: Array<DetectedPersonOutput>;
}

/** Represents a person detected in an image */
export interface DetectedPersonOutput {
  /** Gets a rectangular boundary within which the person was detected. */
  readonly boundingBox: BoundingBoxOutput;
  /** Gets the confidence value of the detected person. */
  readonly confidence: number;
}

/** The results of an Read operation. */
export interface ReadResultOutput {
  /** Concatenate string representation of all textual and visual elements in reading order. */
  content: string;
  /** A list of analyzed pages. */
  pages: Array<DocumentPageOutput>;
  /** The method used to compute string offset and length, possible values include: 'textElements', 'unicodeCodePoint', 'utf16CodeUnit' etc. */
  stringIndexType: string;
  /** Extracted font styles. */
  styles: Array<DocumentStyleOutput>;
  /** The model used to generate the Read result. */
  modelVersion: string;
}

/** The content and layout elements extracted from a page from the input. */
export interface DocumentPageOutput {
  /** The general orientation of the content in clockwise direction, measured in degrees between (-180, 180]. */
  angle: number;
  /** The height of the image/PDF in pixels/inches, respectively. */
  height: number;
  /** Extracted lines from the page, potentially containing both textual and visual elements. */
  lines: Array<DocumentLineOutput>;
  /** 1-based page number in the input document. */
  pageNumber: number;
  /** Location of the page in the reading order concatenated content. */
  spans: Array<DocumentSpanOutput>;
  /** The width of the image/PDF in pixels/inches, respectively. */
  width: number;
  /** Extracted words from the page. */
  words: Array<DocumentWordOutput>;
}

/** A content line object consisting of an adjacent sequence of content elements, such as words and selection marks. */
export interface DocumentLineOutput {
  /** The bounding box of the line. */
  boundingBox: number[];
  /** Concatenated content of the contained elements in reading order. */
  content: string;
  /** Location of the line in the reading order concatenated content. */
  spans: Array<DocumentSpanOutput>;
}

/** Contiguous region of the concatenated content property, specified as an offset and length. */
export interface DocumentSpanOutput {
  /** Number of characters in the content represented by the span. */
  length: number;
  /** Zero-based index of the content represented by the span. */
  offset: number;
}

/**
 * A word object consisting of a contiguous sequence of characters. For non-space delimited languages,
 * such as Chinese, Japanese, and Korean, each character is represented as its own word.
 */
export interface DocumentWordOutput {
  /** Bounding box of the word. */
  boundingBox: number[];
  /** Confidence of correctly extracting the word. */
  confidence: number;
  /** Text content of the word. */
  content: string;
  /** Location of the word in the reading order concatenated content. */
  span: DocumentSpanOutput;
}

/** An object representing observed text styles. */
export interface DocumentStyleOutput {
  /** Confidence of correctly identifying the style. */
  confidence: number;
  /** Is content handwritten or not. */
  isHandwritten: boolean;
  /** Location of the text elements in the concatenated content the style applies to. */
  spans: Array<DocumentSpanOutput>;
}

/** Smart cropping result. */
export interface SmartCropsResultOutput {
  /** Recommended regions for cropping the image. */
  values: Array<CropRegionOutput>;
}

/** A region identified for smart cropping. There will be one region returned for each requested aspect ratio. */
export interface CropRegionOutput {
  /** The aspect ratio of the crop region. */
  aspectRatio: number;
  /** The bounding box of the crop region. */
  boundingBox: BoundingBoxOutput;
}

/** A JSON document with a URL pointing to the image that is to be analyzed. */
export interface ImageUrlOutput {
  /** Publicly reachable URL of an image. */
  url: string;
}
