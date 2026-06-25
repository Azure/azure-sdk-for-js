// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Represents the outcome of an Image Analysis operation. */
export interface ImageAnalysisResult {
  /** The generated phrase that describes the content of the analyzed image. */
  caption?: CaptionResult;
  /**
   * The up to 10 generated phrases, the first describing the content of the whole image,
   * and the others describing the content of different regions of the image.
   */
  denseCaptions?: DenseCaptionsResult;
  /** Metadata associated with the analyzed image. */
  metadata: ImageMetadata;
  /** The cloud AI model used for the analysis */
  modelVersion: string;
  /** A list of detected physical objects in the analyzed image, and their location. */
  objects?: ObjectsResult;
  /** A list of detected people in the analyzed image, and their location. */
  people?: PeopleResult;
  /** The extracted printed and hand-written text in the analyze image. Also knows as OCR. */
  read?: ReadResult;
  /**
   * A list of crop regions at the desired as aspect ratios (if provided) that can be used as image thumbnails.
   * These regions preserve as much content as possible from the analyzed image, with priority given to detected faces.
   */
  smartCrops?: SmartCropsResult;
  /** A list of content tags in the analyzed image. */
  tags?: TagsResult;
}

export function imageAnalysisResultDeserializer(item: any): ImageAnalysisResult {
  return {
    caption: !item["captionResult"]
      ? item["captionResult"]
      : captionResultDeserializer(item["captionResult"]),
    denseCaptions: !item["denseCaptionsResult"]
      ? item["denseCaptionsResult"]
      : denseCaptionsResultDeserializer(item["denseCaptionsResult"]),
    metadata: imageMetadataDeserializer(item["metadata"]),
    modelVersion: item["modelVersion"],
    objects: !item["objectsResult"]
      ? item["objectsResult"]
      : objectsResultDeserializer(item["objectsResult"]),
    people: !item["peopleResult"]
      ? item["peopleResult"]
      : peopleResultDeserializer(item["peopleResult"]),
    read: !item["readResult"] ? item["readResult"] : readResultDeserializer(item["readResult"]),
    smartCrops: !item["smartCropsResult"]
      ? item["smartCropsResult"]
      : smartCropsResultDeserializer(item["smartCropsResult"]),
    tags: !item["tagsResult"] ? item["tagsResult"] : tagsResultDeserializer(item["tagsResult"]),
  };
}

/** Represents a generated phrase that describes the content of the whole image. */
export interface CaptionResult {
  /**
   * A score, in the range of 0 to 1 (inclusive), representing the confidence that this description is accurate.
   * Higher values indicating higher confidence.
   */
  confidence: number;
  /** The text of the caption. */
  text: string;
}

export function captionResultDeserializer(item: any): CaptionResult {
  return {
    confidence: item["confidence"],
    text: item["text"],
  };
}

/**
 * Represents a list of up to 10 image captions for different regions of the image.
 * The first caption always applies to the whole image.
 */
export interface DenseCaptionsResult {
  /** The list of image captions. */
  values: DenseCaption[];
}

export function denseCaptionsResultDeserializer(item: any): DenseCaptionsResult {
  return {
    values: denseCaptionArrayDeserializer(item["values"]),
  };
}

export function denseCaptionArrayDeserializer(result: Array<DenseCaption>): any[] {
  return result.map((item) => {
    return denseCaptionDeserializer(item);
  });
}

/** Represents a generated phrase that describes the content of the whole image or a region in the image */
export interface DenseCaption {
  /**
   * A score, in the range of 0 to 1 (inclusive), representing the confidence that this description is accurate.
   * Higher values indicating higher confidence.
   */
  confidence: number;
  /** The text of the caption. */
  text: string;
  /** The image region of which this caption applies. */
  boundingBox: ImageBoundingBox;
}

export function denseCaptionDeserializer(item: any): DenseCaption {
  return {
    confidence: item["confidence"],
    text: item["text"],
    boundingBox: imageBoundingBoxDeserializer(item["boundingBox"]),
  };
}

/** A basic rectangle specifying a sub-region of the image. */
export interface ImageBoundingBox {
  /** X-coordinate of the top left point of the area, in pixels. */
  x: number;
  /** Y-coordinate of the top left point of the area, in pixels. */
  y: number;
  /** Width of the area, in pixels. */
  width: number;
  /** Height of the area, in pixels. */
  height: number;
}

export function imageBoundingBoxDeserializer(item: any): ImageBoundingBox {
  return {
    x: item["x"],
    y: item["y"],
    width: item["w"],
    height: item["h"],
  };
}

/** Metadata associated with the analyzed image. */
export interface ImageMetadata {
  /** The height of the image in pixels. */
  height: number;
  /** The width of the image in pixels. */
  width: number;
}

export function imageMetadataDeserializer(item: any): ImageMetadata {
  return {
    height: item["height"],
    width: item["width"],
  };
}

/** Represents a list of physical object detected in an image and their location. */
export interface ObjectsResult {
  /** A list of physical object detected in an image and their location. */
  values: DetectedObject[];
}

export function objectsResultDeserializer(item: any): ObjectsResult {
  return {
    values: detectedObjectArrayDeserializer(item["values"]),
  };
}

export function detectedObjectArrayDeserializer(result: Array<DetectedObject>): any[] {
  return result.map((item) => {
    return detectedObjectDeserializer(item);
  });
}

/** Represents a physical object detected in an image. */
export interface DetectedObject {
  /** A rectangular boundary where the object was detected. */
  boundingBox: ImageBoundingBox;
  /** A single-item list containing the object information. */
  tags: DetectedTag[];
}

export function detectedObjectDeserializer(item: any): DetectedObject {
  return {
    boundingBox: imageBoundingBoxDeserializer(item["boundingBox"]),
    tags: detectedTagArrayDeserializer(item["tags"]),
  };
}

export function detectedTagArrayDeserializer(result: Array<DetectedTag>): any[] {
  return result.map((item) => {
    return detectedTagDeserializer(item);
  });
}

/**
 * A content entity observation in the image. A tag can be a physical object, living being, scenery, or action
 * that appear in the image.
 */
export interface DetectedTag {
  /**
   * A score, in the range of 0 to 1 (inclusive), representing the confidence that this entity was observed.
   * Higher values indicating higher confidence.
   */
  confidence: number;
  /** Name of the entity. */
  name: string;
}

export function detectedTagDeserializer(item: any): DetectedTag {
  return {
    confidence: item["confidence"],
    name: item["name"],
  };
}

/** Represents a list of people detected in an image and their location. */
export interface PeopleResult {
  /** A list of people detected in an image and their location. */
  values: DetectedPerson[];
}

export function peopleResultDeserializer(item: any): PeopleResult {
  return {
    values: detectedPersonArrayDeserializer(item["values"]),
  };
}

export function detectedPersonArrayDeserializer(result: Array<DetectedPerson>): any[] {
  return result.map((item) => {
    return detectedPersonDeserializer(item);
  });
}

/** Represents a person detected in an image. */
export interface DetectedPerson {
  /** A rectangular boundary where the person was detected. */
  readonly boundingBox: ImageBoundingBox;
  /**
   * A score, in the range of 0 to 1 (inclusive), representing the confidence that this detection was accurate.
   * Higher values indicating higher confidence.
   */
  readonly confidence: number;
}

export function detectedPersonDeserializer(item: any): DetectedPerson {
  return {
    boundingBox: imageBoundingBoxDeserializer(item["boundingBox"]),
    confidence: item["confidence"],
  };
}

/** The results of a Read (OCR) operation. */
export interface ReadResult {
  /** A list of text blocks in the image. At the moment only one block is returned, containing all the text detected in the image. */
  blocks: DetectedTextBlock[];
}

export function readResultDeserializer(item: any): ReadResult {
  return {
    blocks: detectedTextBlockArrayDeserializer(item["blocks"]),
  };
}

export function detectedTextBlockArrayDeserializer(result: Array<DetectedTextBlock>): any[] {
  return result.map((item) => {
    return detectedTextBlockDeserializer(item);
  });
}

/** Represents a single block of detected text in the image. */
export interface DetectedTextBlock {
  /** A list of text lines in this block. */
  lines: DetectedTextLine[];
}

export function detectedTextBlockDeserializer(item: any): DetectedTextBlock {
  return {
    lines: detectedTextLineArrayDeserializer(item["lines"]),
  };
}

export function detectedTextLineArrayDeserializer(result: Array<DetectedTextLine>): any[] {
  return result.map((item) => {
    return detectedTextLineDeserializer(item);
  });
}

/** Represents a single line of text in the image. */
export interface DetectedTextLine {
  /** Text content of the detected text line. */
  text: string;
  /** A bounding polygon around the text line. At the moment only quadrilaterals are supported (represented by 4 image points). */
  boundingPolygon: ImagePoint[];
  /** A list of words in this line. */
  words: DetectedTextWord[];
}

export function detectedTextLineDeserializer(item: any): DetectedTextLine {
  return {
    text: item["text"],
    boundingPolygon: imagePointArrayDeserializer(item["boundingPolygon"]),
    words: detectedTextWordArrayDeserializer(item["words"]),
  };
}

export function imagePointArrayDeserializer(result: Array<ImagePoint>): any[] {
  return result.map((item) => {
    return imagePointDeserializer(item);
  });
}

/** Represents the coordinates of a single pixel in the image. */
export interface ImagePoint {
  /** The horizontal x-coordinate of this point, in pixels. Zero values corresponds to the left-most pixels in the image. */
  x: number;
  /** The vertical y-coordinate of this point, in pixels. Zero values corresponds to the top-most pixels in the image. */
  y: number;
}

export function imagePointDeserializer(item: any): ImagePoint {
  return {
    x: item["x"],
    y: item["y"],
  };
}

export function detectedTextWordArrayDeserializer(result: Array<DetectedTextWord>): any[] {
  return result.map((item) => {
    return detectedTextWordDeserializer(item);
  });
}

/**
 * A word object consisting of a contiguous sequence of characters. For non-space delimited languages,
 * such as Chinese, Japanese, and Korean, each character is represented as its own word.
 */
export interface DetectedTextWord {
  /** Text content of the word. */
  text: string;
  /** A bounding polygon around the word. At the moment only quadrilaterals are supported (represented by 4 image points). */
  boundingPolygon: ImagePoint[];
  /** The level of confidence that the word was detected. Confidence scores span the range of 0.0 to 1.0 (inclusive), with higher values indicating a higher confidence of detection. */
  confidence: number;
}

export function detectedTextWordDeserializer(item: any): DetectedTextWord {
  return {
    text: item["text"],
    boundingPolygon: imagePointArrayDeserializer(item["boundingPolygon"]),
    confidence: item["confidence"],
  };
}

/**
 * Smart cropping result. A list of crop regions at the desired as aspect ratios (if provided) that can be used as image thumbnails.
 * These regions preserve as much content as possible from the analyzed image, with priority given to detected faces.
 */
export interface SmartCropsResult {
  /** A list of crop regions. */
  values: CropRegion[];
}

export function smartCropsResultDeserializer(item: any): SmartCropsResult {
  return {
    values: cropRegionArrayDeserializer(item["values"]),
  };
}

export function cropRegionArrayDeserializer(result: Array<CropRegion>): any[] {
  return result.map((item) => {
    return cropRegionDeserializer(item);
  });
}

/**
 * A region at the desired aspect ratio that can be used as image thumbnail.
 * The region preserves as much content as possible from the analyzed image, with priority given to detected faces.
 */
export interface CropRegion {
  /**
   * The aspect ratio of the crop region.
   * Aspect ratio is calculated by dividing the width of the region in pixels by its height in pixels.
   * The aspect ratio will be in the range 0.75 to 1.8 (inclusive) if provided by the developer during the analyze call.
   * Otherwise, it will be in the range 0.5 to 2.0 (inclusive).
   */
  aspectRatio: number;
  /** The bounding box of the region. */
  boundingBox: ImageBoundingBox;
}

export function cropRegionDeserializer(item: any): CropRegion {
  return {
    aspectRatio: item["aspectRatio"],
    boundingBox: imageBoundingBoxDeserializer(item["boundingBox"]),
  };
}

/**
 * A list of entities observed in the image. Tags can be physical objects, living being, scenery, or actions
 * that appear in the image.
 */
export interface TagsResult {
  /** A list of tags. */
  values: DetectedTag[];
}

export function tagsResultDeserializer(item: any): TagsResult {
  return {
    values: detectedTagArrayDeserializer(item["values"]),
  };
}

/** An object holding the publicly reachable URL of an image to analyze. */
export interface ImageUrl {
  /** Publicly reachable URL of an image to analyze. */
  url: string;
}

export function imageUrlSerializer(item: ImageUrl): any {
  return { url: item["url"] };
}

/** The visual features supported by the Image Analysis service */
export type VisualFeatures =
  | "tags"
  | "caption"
  | "denseCaptions"
  | "objects"
  | "read"
  | "smartCrops"
  | "people";

/** Known values of {@link Versions} that the service accepts. */
export enum KnownVersions {
  /** 2023-10-01 */
  V20231001 = "2023-10-01",
}
