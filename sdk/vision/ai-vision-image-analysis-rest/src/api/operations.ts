// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImageAnalysisContext as Client } from "./index.js";
import {
  ImageAnalysisResult,
  imageAnalysisResultDeserializer,
  ImageUrl,
  imageUrlSerializer,
  VisualFeatures,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import { AnalyzeFromUrlOptionalParams, AnalyzeFromImageDataOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _analyzeFromUrlSend(
  context: Client,
  imageUrl: ImageUrl,
  visualFeatures: VisualFeatures[],
  options: AnalyzeFromUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/imageanalysis:analyze{?api%2Dversion,features,language,gender%2Dneutral%2Dcaption,smartcrops%2Daspect%2Dratios,model%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2023-10-01",
      features: visualFeatures.map((p: any) => {
        return p;
      }),
      language: options?.language,
      "gender%2Dneutral%2Dcaption": options?.genderNeutralCaption,
      "smartcrops%2Daspect%2Dratios": !options?.smartCropsAspectRatios
        ? options?.smartCropsAspectRatios
        : options?.smartCropsAspectRatios.map((p: any) => {
            return p;
          }),
      "model%2Dversion": options?.modelVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: imageUrlSerializer(imageUrl),
    });
}

export async function _analyzeFromUrlDeserialize(
  result: PathUncheckedResponse,
): Promise<ImageAnalysisResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return imageAnalysisResultDeserializer(result.body);
}

/** Performs a single Image Analysis operation */
export async function analyzeFromUrl(
  context: Client,
  imageUrl: ImageUrl,
  visualFeatures: VisualFeatures[],
  options: AnalyzeFromUrlOptionalParams = { requestOptions: {} },
): Promise<ImageAnalysisResult> {
  const result = await _analyzeFromUrlSend(context, imageUrl, visualFeatures, options);
  return _analyzeFromUrlDeserialize(result);
}

export function _analyzeFromImageDataSend(
  context: Client,
  imageData: Uint8Array,
  visualFeatures: VisualFeatures[],
  options: AnalyzeFromImageDataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/imageanalysis:analyze{?api%2Dversion,features,language,gender%2Dneutral%2Dcaption,smartcrops%2Daspect%2Dratios,model%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2023-10-01",
      features: visualFeatures.map((p: any) => {
        return p;
      }),
      language: options?.language,
      "gender%2Dneutral%2Dcaption": options?.genderNeutralCaption,
      "smartcrops%2Daspect%2Dratios": !options?.smartCropsAspectRatios
        ? options?.smartCropsAspectRatios
        : options?.smartCropsAspectRatios.map((p: any) => {
            return p;
          }),
      "model%2Dversion": options?.modelVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/octet-stream",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: imageData,
    });
}

export async function _analyzeFromImageDataDeserialize(
  result: PathUncheckedResponse,
): Promise<ImageAnalysisResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return imageAnalysisResultDeserializer(result.body);
}

/** Performs a single Image Analysis operation */
export async function analyzeFromImageData(
  context: Client,
  imageData: Uint8Array,
  visualFeatures: VisualFeatures[],
  options: AnalyzeFromImageDataOptionalParams = { requestOptions: {} },
): Promise<ImageAnalysisResult> {
  const result = await _analyzeFromImageDataSend(context, imageData, visualFeatures, options);
  return _analyzeFromImageDataDeserialize(result);
}
