// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Represents the outcome of an Image Analysis operation. */
export interface ImageAnalysisResultOutput {
  /** The generated phrase that describes the content of the analyzed image. */
  captionResult?: CaptionResultOutput;
  /**
   * The up to 10 generated phrases, the first describing the content of the whole image,
   * and the others describing the content of different regions of the image.
   */
  denseCaptionsResult?: DenseCaptionsResultOutput;
  /** Metadata associated with the analyzed image. */
  metadata: ImageMetadataOutput;
  /** The cloud AI model used for the analysis */
  modelVersion: string;
  /** A list of detected physical objects in the analyzed image, and their location. */
  objectsResult?: ObjectsResultOutput;
  /** A list of detected people in the analyzed image, and their location. */
  peopleResult?: PeopleResultOutput;
  /** The extracted printed and hand-written text in the analyze image. Also knows as OCR. */
  readResult?: ReadResultOutput;
  /**
   * A list of crop regions at the desired as aspect ratios (if provided) that can be used as image thumbnails.
   * These regions preserve as much content as possible from the analyzed image, with priority given to detected faces.
   */
  smartCropsResult?: SmartCropsResultOutput;
  /** A list of content tags in the analyzed image. */
  tagsResult?: TagsResultOutput;
}

/** Represents a generated phrase that describes the content of the whole image. */
export interface CaptionResultOutput {
  /**
   * A score, in the range of 0 to 1 (inclusive), representing the confidence that this description is accurate.
   * Higher values indicating higher confidence.
   */
  confidence: number;
  /** The text of the caption. */
  text: string;
}

/**
 * Represents a list of up to 10 image captions for different regions of the image.
 * The first caption always applies to the whole image.
 */
export interface DenseCaptionsResultOutput {
  /** The list of image captions. */
  values: Array<DenseCaptionOutput>;
}

/** Represents a generated phrase that describes the content of the whole image or a region in the image */
export interface DenseCaptionOutput {
  /**
   * A score, in the range of 0 to 1 (inclusive), representing the confidence that this description is accurate.
   * Higher values indicating higher confidence.
   */
  confidence: number;
  /** The text of the caption. */
  text: string;
  /** The image region of which this caption applies. */
  boundingBox: ImageBoundingBoxOutput;
}

/** A basic rectangle specifying a sub-region of the image. */
export interface ImageBoundingBoxOutput {
  /** X-coordinate of the top left point of the area, in pixels. */
  x: number;
  /** Y-coordinate of the top left point of the area, in pixels. */
  y: number;
  /** Width of the area, in pixels. */
  w: number;
  /** Height of the area, in pixels. */
  h: number;
}

/** Metadata associated with the analyzed image. */
export interface ImageMetadataOutput {
  /** The height of the image in pixels. */
  height: number;
  /** The width of the image in pixels. */
  width: number;
}

/** Represents a list of physical object detected in an image and their location. */
export interface ObjectsResultOutput {
  /** A list of physical object detected in an image and their location. */
  values: Array<DetectedObjectOutput>;
}

/** Represents a physical object detected in an image. */
export interface DetectedObjectOutput {
  /** A rectangular boundary where the object was detected. */
  boundingBox: ImageBoundingBoxOutput;
  /** A single-item list containing the object information. */
  tags: Array<DetectedTagOutput>;
}

/**
 * A content entity observation in the image. A tag can be a physical object, living being, scenery, or action
 * that appear in the image.
 */
export interface DetectedTagOutput {
  /**
   * A score, in the range of 0 to 1 (inclusive), representing the confidence that this entity was observed.
   * Higher values indicating higher confidence.
   */
  confidence: number;
  /** Name of the entity. */
  name: string;
}

/** Represents a list of people detected in an image and their location. */
export interface PeopleResultOutput {
  /** A list of people detected in an image and their location. */
  values: Array<DetectedPersonOutput>;
}

/** Represents a person detected in an image. */
export interface DetectedPersonOutput {
  /** A rectangular boundary where the person was detected. */
  readonly boundingBox: ImageBoundingBoxOutput;
  /**
   * A score, in the range of 0 to 1 (inclusive), representing the confidence that this detection was accurate.
   * Higher values indicating higher confidence.
   */
  readonly confidence: number;
}

/** The results of a Read (OCR) operation. */
export interface ReadResultOutput {
  /** A list of text blocks in the image. At the moment only one block is returned, containing all the text detected in the image. */
  blocks: Array<DetectedTextBlockOutput>;
}

/** Represents a single block of detected text in the image. */
export interface DetectedTextBlockOutput {
  /** A list of text lines in this block. */
  lines: Array<DetectedTextLineOutput>;
}

/** Represents a single line of text in the image. */
export interface DetectedTextLineOutput {
  /** Text content of the detected text line. */
  text: string;
  /** A bounding polygon around the text line. At the moment only quadrilaterals are supported (represented by 4 image points). */
  boundingPolygon: Array<ImagePointOutput>;
  /** A list of words in this line. */
  words: Array<DetectedTextWordOutput>;
}

/** Represents the coordinates of a single pixel in the image. */
export interface ImagePointOutput {
  /** The horizontal x-coordinate of this point, in pixels. Zero values corresponds to the left-most pixels in the image. */
  x: number;
  /** The vertical y-coordinate of this point, in pixels. Zero values corresponds to the top-most pixels in the image. */
  y: number;
}

/**
 * A word object consisting of a contiguous sequence of characters. For non-space delimited languages,
 * such as Chinese, Japanese, and Korean, each character is represented as its own word.
 */
export interface DetectedTextWordOutput {
  /** Text content of the word. */
  text: string;
  /** A bounding polygon around the word. At the moment only quadrilaterals are supported (represented by 4 image points). */
  boundingPolygon: Array<ImagePointOutput>;
  /** The level of confidence that the word was detected. Confidence scores span the range of 0.0 to 1.0 (inclusive), with higher values indicating a higher confidence of detection. */
  confidence: number;
}

/**
 * Smart cropping result. A list of crop regions at the desired as aspect ratios (if provided) that can be used as image thumbnails.
 * These regions preserve as much content as possible from the analyzed image, with priority given to detected faces.
 */
export interface SmartCropsResultOutput {
  /** A list of crop regions. */
  values: Array<CropRegionOutput>;
}

/**
 * A region at the desired aspect ratio that can be used as image thumbnail.
 * The region preserves as much content as possible from the analyzed image, with priority given to detected faces.
 */
export interface CropRegionOutput {
  /**
   * The aspect ratio of the crop region.
   * Aspect ratio is calculated by dividing the width of the region in pixels by its height in pixels.
   * The aspect ratio will be in the range 0.75 to 1.8 (inclusive) if provided by the developer during the analyze call.
   * Otherwise, it will be in the range 0.5 to 2.0 (inclusive).
   */
  aspectRatio: number;
  /** The bounding box of the region. */
  boundingBox: ImageBoundingBoxOutput;
}

/**
 * A list of entities observed in the image. Tags can be physical objects, living being, scenery, or actions
 * that appear in the image.
 */
export interface TagsResultOutput {
  /** A list of tags. */
  values: Array<DetectedTagOutput>;
}
