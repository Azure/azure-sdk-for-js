// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ImageAnalysisResult,
  ImageUrl,
  segmentationMode,
} from "../models/models.js";
import {
  isUnexpected,
  ImageAnalysisContext as Client,
  AnalyzeFromStream200Response,
  AnalyzeFromStreamDefaultResponse,
  AnalyzeFromUrl200Response,
  AnalyzeFromUrlDefaultResponse,
  SegmentFromStream200Response,
  SegmentFromStreamDefaultResponse,
  SegmentFromUrl200Response,
  SegmentFromUrlDefaultResponse,
} from "../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";
import {
  AnalyzeFromStreamOptions,
  AnalyzeFromUrlOptions,
  SegmentFromUrlOptions,
  SegmentFromStreamOptions,
} from "../models/options.js";

export function _analyzeFromStreamSend(
  context: Client,
  imageContent: Uint8Array,
  options: AnalyzeFromStreamOptions = { requestOptions: {} }
): StreamableMethod<
  AnalyzeFromStream200Response | AnalyzeFromStreamDefaultResponse
> {
  return context
    .path("/imageanalysis:analyze")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: (options.contentType as any) ?? "application/octet-stream",
      queryParameters: {
        features: options?.visualFeatures,
        language: options?.language,
        "gender-neutral-caption": options?.genderNeutralCaption,
        "smartcrops-aspect-ratios": options?.smartCropsAspectRatios,
        "model-name": options?.modelName,
      },
      body: uint8ArrayToString(imageContent, "base64"),
    });
}

export async function _analyzeFromStreamDeserialize(
  result: AnalyzeFromStream200Response | AnalyzeFromStreamDefaultResponse
): Promise<ImageAnalysisResult> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    captionResult: !result.body.captionResult
      ? undefined
      : {
          confidence: result.body.captionResult?.["confidence"],
          text: result.body.captionResult?.["text"],
        },
    customModelResult: !result.body.customModelResult
      ? undefined
      : {
          objectsResult: {
            values: (
              result.body.customModelResult?.objectsResult["values"] ?? []
            ).map((p) => ({
              boundingBox: {
                x: p.boundingBox["x"],
                y: p.boundingBox["y"],
                w: p.boundingBox["w"],
                h: p.boundingBox["h"],
              },
              tags: (p["tags"] ?? []).map((p) => ({
                confidence: p["confidence"],
                name: p["name"],
              })),
            })),
          },
          tagsResult: {
            values: (
              result.body.customModelResult?.tagsResult["values"] ?? []
            ).map((p) => ({ confidence: p["confidence"], name: p["name"] })),
          },
        },
    denseCaptionsResult: !result.body.denseCaptionsResult
      ? undefined
      : {
          values: (result.body.denseCaptionsResult?.["values"] ?? []).map(
            (p) => ({
              confidence: p["confidence"],
              text: p["text"],
              boundingBox: {
                x: p.boundingBox["x"],
                y: p.boundingBox["y"],
                w: p.boundingBox["w"],
                h: p.boundingBox["h"],
              },
            })
          ),
        },
    metadata: {
      height: result.body.metadata["height"],
      width: result.body.metadata["width"],
    },
    modelVersion: result.body["modelVersion"],
    objectsResult: !result.body.objectsResult
      ? undefined
      : {
          values: (result.body.objectsResult?.["values"] ?? []).map((p) => ({
            boundingBox: {
              x: p.boundingBox["x"],
              y: p.boundingBox["y"],
              w: p.boundingBox["w"],
              h: p.boundingBox["h"],
            },
            tags: (p["tags"] ?? []).map((p) => ({
              confidence: p["confidence"],
              name: p["name"],
            })),
          })),
        },
    peopleResult: !result.body.peopleResult
      ? undefined
      : {
          values: (result.body.peopleResult?.["values"] ?? []).map((p) => ({
            boundingBox: {
              x: p.boundingBox["x"],
              y: p.boundingBox["y"],
              w: p.boundingBox["w"],
              h: p.boundingBox["h"],
            },
            confidence: p["confidence"],
          })),
        },
    readResult: !result.body.readResult
      ? undefined
      : {
          content: result.body.readResult?.["content"],
          pages: (result.body.readResult?.["pages"] ?? []).map((p) => ({
            angle: p["angle"],
            height: p["height"],
            lines: (p["lines"] ?? []).map((p) => ({
              boundingBox: p["boundingBox"],
              content: p["content"],
              spans: (p["spans"] ?? []).map((p) => ({
                length: p["length"],
                offset: p["offset"],
              })),
            })),
            pageNumber: p["pageNumber"],
            spans: (p["spans"] ?? []).map((p) => ({
              length: p["length"],
              offset: p["offset"],
            })),
            width: p["width"],
            words: (p["words"] ?? []).map((p) => ({
              boundingBox: p["boundingBox"],
              confidence: p["confidence"],
              content: p["content"],
              span: { length: p.span["length"], offset: p.span["offset"] },
            })),
          })),
          stringIndexType: result.body.readResult?.["stringIndexType"],
          styles: (result.body.readResult?.["styles"] ?? []).map((p) => ({
            confidence: p["confidence"],
            isHandwritten: p["isHandwritten"],
            spans: (p["spans"] ?? []).map((p) => ({
              length: p["length"],
              offset: p["offset"],
            })),
          })),
          modelVersion: result.body.readResult?.["modelVersion"],
        },
    smartCropsResult: !result.body.smartCropsResult
      ? undefined
      : {
          values: (result.body.smartCropsResult?.["values"] ?? []).map((p) => ({
            aspectRatio: p["aspectRatio"],
            boundingBox: {
              x: p.boundingBox["x"],
              y: p.boundingBox["y"],
              w: p.boundingBox["w"],
              h: p.boundingBox["h"],
            },
          })),
        },
    tagsResult: !result.body.tagsResult
      ? undefined
      : {
          values: (result.body.tagsResult?.["values"] ?? []).map((p) => ({
            confidence: p["confidence"],
            name: p["name"],
          })),
        },
  };
}

/** Performs a single Image Analysis operation */
export async function analyzeFromStream(
  context: Client,
  imageContent: Uint8Array,
  options: AnalyzeFromStreamOptions = { requestOptions: {} }
): Promise<ImageAnalysisResult> {
  const result = await _analyzeFromStreamSend(context, imageContent, options);
  return _analyzeFromStreamDeserialize(result);
}

export function _analyzeFromUrlSend(
  context: Client,
  imageContent: ImageUrl,
  options: AnalyzeFromUrlOptions = { requestOptions: {} }
): StreamableMethod<AnalyzeFromUrl200Response | AnalyzeFromUrlDefaultResponse> {
  return context
    .path("/imageanalysis:analyze")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: (options.contentType as any) ?? "application/json",
      queryParameters: {
        features: options?.visualFeatures,
        language: options?.language,
        "gender-neutral-caption": options?.genderNeutralCaption,
        "smartcrops-aspect-ratios": options?.smartCropsAspectRatios,
        "model-name": options?.modelName,
      },
      body: { url: imageContent["url"] },
    });
}

export async function _analyzeFromUrlDeserialize(
  result: AnalyzeFromUrl200Response | AnalyzeFromUrlDefaultResponse
): Promise<ImageAnalysisResult> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    captionResult: !result.body.captionResult
      ? undefined
      : {
          confidence: result.body.captionResult?.["confidence"],
          text: result.body.captionResult?.["text"],
        },
    customModelResult: !result.body.customModelResult
      ? undefined
      : {
          objectsResult: {
            values: (
              result.body.customModelResult?.objectsResult["values"] ?? []
            ).map((p) => ({
              boundingBox: {
                x: p.boundingBox["x"],
                y: p.boundingBox["y"],
                w: p.boundingBox["w"],
                h: p.boundingBox["h"],
              },
              tags: (p["tags"] ?? []).map((p) => ({
                confidence: p["confidence"],
                name: p["name"],
              })),
            })),
          },
          tagsResult: {
            values: (
              result.body.customModelResult?.tagsResult["values"] ?? []
            ).map((p) => ({ confidence: p["confidence"], name: p["name"] })),
          },
        },
    denseCaptionsResult: !result.body.denseCaptionsResult
      ? undefined
      : {
          values: (result.body.denseCaptionsResult?.["values"] ?? []).map(
            (p) => ({
              confidence: p["confidence"],
              text: p["text"],
              boundingBox: {
                x: p.boundingBox["x"],
                y: p.boundingBox["y"],
                w: p.boundingBox["w"],
                h: p.boundingBox["h"],
              },
            })
          ),
        },
    metadata: {
      height: result.body.metadata["height"],
      width: result.body.metadata["width"],
    },
    modelVersion: result.body["modelVersion"],
    objectsResult: !result.body.objectsResult
      ? undefined
      : {
          values: (result.body.objectsResult?.["values"] ?? []).map((p) => ({
            boundingBox: {
              x: p.boundingBox["x"],
              y: p.boundingBox["y"],
              w: p.boundingBox["w"],
              h: p.boundingBox["h"],
            },
            tags: (p["tags"] ?? []).map((p) => ({
              confidence: p["confidence"],
              name: p["name"],
            })),
          })),
        },
    peopleResult: !result.body.peopleResult
      ? undefined
      : {
          values: (result.body.peopleResult?.["values"] ?? []).map((p) => ({
            boundingBox: {
              x: p.boundingBox["x"],
              y: p.boundingBox["y"],
              w: p.boundingBox["w"],
              h: p.boundingBox["h"],
            },
            confidence: p["confidence"],
          })),
        },
    readResult: !result.body.readResult
      ? undefined
      : {
          content: result.body.readResult?.["content"],
          pages: (result.body.readResult?.["pages"] ?? []).map((p) => ({
            angle: p["angle"],
            height: p["height"],
            lines: (p["lines"] ?? []).map((p) => ({
              boundingBox: p["boundingBox"],
              content: p["content"],
              spans: (p["spans"] ?? []).map((p) => ({
                length: p["length"],
                offset: p["offset"],
              })),
            })),
            pageNumber: p["pageNumber"],
            spans: (p["spans"] ?? []).map((p) => ({
              length: p["length"],
              offset: p["offset"],
            })),
            width: p["width"],
            words: (p["words"] ?? []).map((p) => ({
              boundingBox: p["boundingBox"],
              confidence: p["confidence"],
              content: p["content"],
              span: { length: p.span["length"], offset: p.span["offset"] },
            })),
          })),
          stringIndexType: result.body.readResult?.["stringIndexType"],
          styles: (result.body.readResult?.["styles"] ?? []).map((p) => ({
            confidence: p["confidence"],
            isHandwritten: p["isHandwritten"],
            spans: (p["spans"] ?? []).map((p) => ({
              length: p["length"],
              offset: p["offset"],
            })),
          })),
          modelVersion: result.body.readResult?.["modelVersion"],
        },
    smartCropsResult: !result.body.smartCropsResult
      ? undefined
      : {
          values: (result.body.smartCropsResult?.["values"] ?? []).map((p) => ({
            aspectRatio: p["aspectRatio"],
            boundingBox: {
              x: p.boundingBox["x"],
              y: p.boundingBox["y"],
              w: p.boundingBox["w"],
              h: p.boundingBox["h"],
            },
          })),
        },
    tagsResult: !result.body.tagsResult
      ? undefined
      : {
          values: (result.body.tagsResult?.["values"] ?? []).map((p) => ({
            confidence: p["confidence"],
            name: p["name"],
          })),
        },
  };
}

/** Performs a single Image Analysis operation */
export async function analyzeFromUrl(
  context: Client,
  imageContent: ImageUrl,
  options: AnalyzeFromUrlOptions = { requestOptions: {} }
): Promise<ImageAnalysisResult> {
  const result = await _analyzeFromUrlSend(context, imageContent, options);
  return _analyzeFromUrlDeserialize(result);
}

export function _segmentFromUrlSend(
  context: Client,
  mode: segmentationMode,
  imageContent: ImageUrl,
  options: SegmentFromUrlOptions = { requestOptions: {} }
): StreamableMethod<SegmentFromUrl200Response | SegmentFromUrlDefaultResponse> {
  return context
    .path("/imageanalysis:segment")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: (options.contentType as any) ?? "application/json",
      queryParameters: { mode: mode },
      body: { url: imageContent["url"] },
    });
}

export async function _segmentFromUrlDeserialize(
  result: SegmentFromUrl200Response | SegmentFromUrlDefaultResponse
): Promise<Uint8Array> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return typeof result.body === "string"
    ? stringToUint8Array(result.body, "base64")
    : result.body;
}

/** Segment the input image. An image stream of content type 'image/png' is returned, where the pixel values depend on the analysis mode. The returned image has the same dimensions as the input image for modes: foregroundMatting. The returned image has the same aspect ratio and same dimensions as the input image up to a limit of 16 megapixels for modes: backgroundRemoval. */
export async function segmentFromUrl(
  context: Client,
  mode: segmentationMode,
  imageContent: ImageUrl,
  options: SegmentFromUrlOptions = { requestOptions: {} }
): Promise<Uint8Array> {
  const result = await _segmentFromUrlSend(
    context,
    mode,
    imageContent,
    options
  );
  return _segmentFromUrlDeserialize(result);
}

export function _segmentFromStreamSend(
  context: Client,
  mode: segmentationMode,
  imageContent: Uint8Array,
  options: SegmentFromStreamOptions = { requestOptions: {} }
): StreamableMethod<
  SegmentFromStream200Response | SegmentFromStreamDefaultResponse
> {
  return context
    .path("/imageanalysis:segment")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: (options.contentType as any) ?? "application/octet-stream",
      queryParameters: { mode: mode },
      body: uint8ArrayToString(imageContent, "base64"),
    });
}

export async function _segmentFromStreamDeserialize(
  result: SegmentFromStream200Response | SegmentFromStreamDefaultResponse
): Promise<Uint8Array> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return typeof result.body === "string"
    ? stringToUint8Array(result.body, "base64")
    : result.body;
}

/** Segment the input image. An image stream of content type 'image/png' is returned, where the pixel values depend on the analysis mode. The returned image has the same dimensions as the input image for modes: foregroundMatting. The returned image has the same aspect ratio and same dimensions as the input image up to a limit of 16 megapixels for modes: backgroundRemoval. */
export async function segmentFromStream(
  context: Client,
  mode: segmentationMode,
  imageContent: Uint8Array,
  options: SegmentFromStreamOptions = { requestOptions: {} }
): Promise<Uint8Array> {
  const result = await _segmentFromStreamSend(
    context,
    mode,
    imageContent,
    options
  );
  return _segmentFromStreamDeserialize(result);
}
