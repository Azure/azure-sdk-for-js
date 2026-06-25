// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FaceContext as Client } from "./index.js";
import {
  FaceDetectionResult,
  faceErrorResponseDeserializer,
  FaceFindSimilarResult,
  FaceVerificationResult,
  faceVerificationResultDeserializer,
  FaceGroupingResult,
  faceGroupingResultDeserializer,
  FaceIdentificationResult,
  faceDetectionResultArrayDeserializer,
  faceFindSimilarResultArrayDeserializer,
  faceIdentificationResultArrayDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  VerifyFromLargePersonGroupOptionalParams,
  IdentifyFromLargePersonGroupOptionalParams,
  FindSimilarFromLargeFaceListOptionalParams,
  GroupOptionalParams,
  VerifyFaceToFaceOptionalParams,
  FindSimilarOptionalParams,
  DetectOptionalParams,
  DetectFromUrlOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _verifyFromLargePersonGroupSend(
  context: Client,
  faceId: string,
  largePersonGroupId: string,
  personId: string,
  options: VerifyFromLargePersonGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/verify")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: { faceId: faceId, largePersonGroupId: largePersonGroupId, personId: personId },
    });
}

export async function _verifyFromLargePersonGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<FaceVerificationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return faceVerificationResultDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/face-recognition-operations/verify-from-large-person-group for more details. */
export async function verifyFromLargePersonGroup(
  context: Client,
  faceId: string,
  largePersonGroupId: string,
  personId: string,
  options: VerifyFromLargePersonGroupOptionalParams = { requestOptions: {} },
): Promise<FaceVerificationResult> {
  const result = await _verifyFromLargePersonGroupSend(
    context,
    faceId,
    largePersonGroupId,
    personId,
    options,
  );
  return _verifyFromLargePersonGroupDeserialize(result);
}

export function _identifyFromLargePersonGroupSend(
  context: Client,
  faceIds: string[],
  largePersonGroupId: string,
  options: IdentifyFromLargePersonGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context.path("/identify").post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      faceIds: faceIds.map((p: any) => {
        return p;
      }),
      largePersonGroupId: largePersonGroupId,
      maxNumOfCandidatesReturned: options?.maxNumOfCandidatesReturned,
      confidenceThreshold: options?.confidenceThreshold,
    },
  });
}

export async function _identifyFromLargePersonGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<FaceIdentificationResult[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return faceIdentificationResultArrayDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/face-recognition-operations/identify-from-person-group for more details. */
export async function identifyFromLargePersonGroup(
  context: Client,
  faceIds: string[],
  largePersonGroupId: string,
  options: IdentifyFromLargePersonGroupOptionalParams = { requestOptions: {} },
): Promise<FaceIdentificationResult[]> {
  const result = await _identifyFromLargePersonGroupSend(
    context,
    faceIds,
    largePersonGroupId,
    options,
  );
  return _identifyFromLargePersonGroupDeserialize(result);
}

export function _findSimilarFromLargeFaceListSend(
  context: Client,
  faceId: string,
  largeFaceListId: string,
  options: FindSimilarFromLargeFaceListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/findsimilars")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: {
        faceId: faceId,
        maxNumOfCandidatesReturned: options?.maxNumOfCandidatesReturned,
        mode: options?.mode,
        largeFaceListId: largeFaceListId,
      },
    });
}

export async function _findSimilarFromLargeFaceListDeserialize(
  result: PathUncheckedResponse,
): Promise<FaceFindSimilarResult[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return faceFindSimilarResultArrayDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/face-recognition-operations/find-similar-from-large-face-list for more details. */
export async function findSimilarFromLargeFaceList(
  context: Client,
  faceId: string,
  largeFaceListId: string,
  options: FindSimilarFromLargeFaceListOptionalParams = { requestOptions: {} },
): Promise<FaceFindSimilarResult[]> {
  const result = await _findSimilarFromLargeFaceListSend(context, faceId, largeFaceListId, options);
  return _findSimilarFromLargeFaceListDeserialize(result);
}

export function _groupSend(
  context: Client,
  faceIds: string[],
  options: GroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context.path("/group").post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      faceIds: faceIds.map((p: any) => {
        return p;
      }),
    },
  });
}

export async function _groupDeserialize(
  result: PathUncheckedResponse,
): Promise<FaceGroupingResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return faceGroupingResultDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/face-recognition-operations/group for more details. */
export async function group(
  context: Client,
  faceIds: string[],
  options: GroupOptionalParams = { requestOptions: {} },
): Promise<FaceGroupingResult> {
  const result = await _groupSend(context, faceIds, options);
  return _groupDeserialize(result);
}

export function _verifyFaceToFaceSend(
  context: Client,
  faceId1: string,
  faceId2: string,
  options: VerifyFaceToFaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/verify")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: { faceId1: faceId1, faceId2: faceId2 },
    });
}

export async function _verifyFaceToFaceDeserialize(
  result: PathUncheckedResponse,
): Promise<FaceVerificationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return faceVerificationResultDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/face-recognition-operations/verify-face-to-face for more details. */
export async function verifyFaceToFace(
  context: Client,
  faceId1: string,
  faceId2: string,
  options: VerifyFaceToFaceOptionalParams = { requestOptions: {} },
): Promise<FaceVerificationResult> {
  const result = await _verifyFaceToFaceSend(context, faceId1, faceId2, options);
  return _verifyFaceToFaceDeserialize(result);
}

export function _findSimilarSend(
  context: Client,
  faceId: string,
  faceIds: string[],
  options: FindSimilarOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context.path("/findsimilars").post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      faceId: faceId,
      maxNumOfCandidatesReturned: options?.maxNumOfCandidatesReturned,
      mode: options?.mode,
      faceIds: faceIds.map((p: any) => {
        return p;
      }),
    },
  });
}

export async function _findSimilarDeserialize(
  result: PathUncheckedResponse,
): Promise<FaceFindSimilarResult[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return faceFindSimilarResultArrayDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/face-recognition-operations/find-similar for more details. */
export async function findSimilar(
  context: Client,
  faceId: string,
  faceIds: string[],
  options: FindSimilarOptionalParams = { requestOptions: {} },
): Promise<FaceFindSimilarResult[]> {
  const result = await _findSimilarSend(context, faceId, faceIds, options);
  return _findSimilarDeserialize(result);
}

export function _detectSend(
  context: Client,
  imageContent: Uint8Array,
  options: DetectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/detect{?detectionModel,recognitionModel,returnFaceId,returnFaceAttributes,returnFaceLandmarks,returnRecognitionModel,faceIdTimeToLive}",
    {
      detectionModel: options?.detectionModel,
      recognitionModel: options?.recognitionModel,
      returnFaceId: options?.returnFaceId,
      returnFaceAttributes: !options?.returnFaceAttributes
        ? options?.returnFaceAttributes
        : options?.returnFaceAttributes.map((p: any) => {
            return p;
          }),
      returnFaceLandmarks: options?.returnFaceLandmarks,
      returnRecognitionModel: options?.returnRecognitionModel,
      faceIdTimeToLive: options?.faceIdTimeToLive,
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
      body: imageContent,
    });
}

export async function _detectDeserialize(
  result: PathUncheckedResponse,
): Promise<FaceDetectionResult[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return faceDetectionResultArrayDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/face-detection-operations/detect for more details. */
export async function detect(
  context: Client,
  imageContent: Uint8Array,
  options: DetectOptionalParams = { requestOptions: {} },
): Promise<FaceDetectionResult[]> {
  const result = await _detectSend(context, imageContent, options);
  return _detectDeserialize(result);
}

export function _detectFromUrlSend(
  context: Client,
  url: string,
  options: DetectFromUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/detect{?detectionModel,recognitionModel,returnFaceId,returnFaceAttributes,returnFaceLandmarks,returnRecognitionModel,faceIdTimeToLive}",
    {
      detectionModel: options?.detectionModel,
      recognitionModel: options?.recognitionModel,
      returnFaceId: options?.returnFaceId,
      returnFaceAttributes: !options?.returnFaceAttributes
        ? options?.returnFaceAttributes
        : options?.returnFaceAttributes.map((p: any) => {
            return p;
          }),
      returnFaceLandmarks: options?.returnFaceLandmarks,
      returnRecognitionModel: options?.returnRecognitionModel,
      faceIdTimeToLive: options?.faceIdTimeToLive,
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
      body: { url: url },
    });
}

export async function _detectFromUrlDeserialize(
  result: PathUncheckedResponse,
): Promise<FaceDetectionResult[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return faceDetectionResultArrayDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/face-detection-operations/detect-from-url for more details. */
export async function detectFromUrl(
  context: Client,
  url: string,
  options: DetectFromUrlOptionalParams = { requestOptions: {} },
): Promise<FaceDetectionResult[]> {
  const result = await _detectFromUrlSend(context, url, options);
  return _detectFromUrlDeserialize(result);
}
