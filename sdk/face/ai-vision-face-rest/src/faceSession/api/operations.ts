// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FaceSessionContext as Client } from "./index.js";
import { getBinaryStreamResponse } from "#platform/static-helpers/serialization/get-binary-stream-response";
import {
  FaceDetectionResult,
  faceErrorResponseDeserializer,
  CreateLivenessSessionContent,
  createLivenessSessionContentSerializer,
  LivenessSession,
  livenessSessionDeserializer,
  CreateLivenessWithVerifySessionContent,
  createLivenessWithVerifySessionContentSerializer,
  LivenessWithVerifySession,
  livenessWithVerifySessionDeserializer,
  faceDetectionResultArrayDeserializer,
  GetSessionImageResponse,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  GetSessionImageOptionalParams,
  DetectFromSessionImageOptionalParams,
  GetLivenessWithVerifySessionResultOptionalParams,
  DeleteLivenessWithVerifySessionOptionalParams,
  CreateLivenessWithVerifySessionOptionalParams,
  GetLivenessSessionResultOptionalParams,
  DeleteLivenessSessionOptionalParams,
  CreateLivenessSessionOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSessionImageSend(
  context: Client,
  sessionImageId: string,
  options: GetSessionImageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/sessionImages/{sessionImageId}",
    {
      sessionImageId: sessionImageId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/octet-stream", ...options.requestOptions?.headers },
    });
}

export async function _getSessionImageDeserialize(
  result: PathUncheckedResponse & GetSessionImageResponse,
): Promise<GetSessionImageResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Please refer to https://learn.microsoft.com/rest/api/face/liveness-session-operations/get-session-image for more details. */
export async function getSessionImage(
  context: Client,
  sessionImageId: string,
  options: GetSessionImageOptionalParams = { requestOptions: {} },
): Promise<GetSessionImageResponse> {
  const streamableMethod = _getSessionImageSend(context, sessionImageId, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getSessionImageDeserialize(result);
}

export function _detectFromSessionImageSend(
  context: Client,
  sessionImageId: string,
  options: DetectFromSessionImageOptionalParams = { requestOptions: {} },
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
      body: { sessionImageId: sessionImageId },
    });
}

export async function _detectFromSessionImageDeserialize(
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

/** Please refer to https://learn.microsoft.com/rest/api/face/face-detection-operations/detect-from-session-image-id for more details. */
export async function detectFromSessionImage(
  context: Client,
  sessionImageId: string,
  options: DetectFromSessionImageOptionalParams = { requestOptions: {} },
): Promise<FaceDetectionResult[]> {
  const result = await _detectFromSessionImageSend(context, sessionImageId, options);
  return _detectFromSessionImageDeserialize(result);
}

export function _getLivenessWithVerifySessionResultSend(
  context: Client,
  sessionId: string,
  options: GetLivenessWithVerifySessionResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/detectLivenessWithVerify-sessions/{sessionId}",
    {
      sessionId: sessionId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getLivenessWithVerifySessionResultDeserialize(
  result: PathUncheckedResponse,
): Promise<LivenessWithVerifySession> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return livenessWithVerifySessionDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/liveness-session-operations/get-liveness-with-verify-session-result for more details. */
export async function getLivenessWithVerifySessionResult(
  context: Client,
  sessionId: string,
  options: GetLivenessWithVerifySessionResultOptionalParams = { requestOptions: {} },
): Promise<LivenessWithVerifySession> {
  const result = await _getLivenessWithVerifySessionResultSend(context, sessionId, options);
  return _getLivenessWithVerifySessionResultDeserialize(result);
}

export function _deleteLivenessWithVerifySessionSend(
  context: Client,
  sessionId: string,
  options: DeleteLivenessWithVerifySessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/detectLivenessWithVerify-sessions/{sessionId}",
    {
      sessionId: sessionId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteLivenessWithVerifySessionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Please refer to https://learn.microsoft.com/rest/api/face/liveness-session-operations/delete-liveness-with-verify-session for more details. */
export async function deleteLivenessWithVerifySession(
  context: Client,
  sessionId: string,
  options: DeleteLivenessWithVerifySessionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteLivenessWithVerifySessionSend(context, sessionId, options);
  return _deleteLivenessWithVerifySessionDeserialize(result);
}

export function _createLivenessWithVerifySessionSend(
  context: Client,
  body: CreateLivenessWithVerifySessionContent,
  options: CreateLivenessWithVerifySessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/detectLivenessWithVerify-sessions")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "multipart/form-data",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: createLivenessWithVerifySessionContentSerializer(body),
    });
}

export async function _createLivenessWithVerifySessionDeserialize(
  result: PathUncheckedResponse,
): Promise<LivenessWithVerifySession> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return livenessWithVerifySessionDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/liveness-session-operations/create-liveness-with-verify-session-with-verify-image for more details. */
export async function createLivenessWithVerifySession(
  context: Client,
  body: CreateLivenessWithVerifySessionContent,
  options: CreateLivenessWithVerifySessionOptionalParams = { requestOptions: {} },
): Promise<LivenessWithVerifySession> {
  const result = await _createLivenessWithVerifySessionSend(context, body, options);
  return _createLivenessWithVerifySessionDeserialize(result);
}

export function _getLivenessSessionResultSend(
  context: Client,
  sessionId: string,
  options: GetLivenessSessionResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/detectLiveness-sessions/{sessionId}",
    {
      sessionId: sessionId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getLivenessSessionResultDeserialize(
  result: PathUncheckedResponse,
): Promise<LivenessSession> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return livenessSessionDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/liveness-session-operations/get-liveness-session-result for more details. */
export async function getLivenessSessionResult(
  context: Client,
  sessionId: string,
  options: GetLivenessSessionResultOptionalParams = { requestOptions: {} },
): Promise<LivenessSession> {
  const result = await _getLivenessSessionResultSend(context, sessionId, options);
  return _getLivenessSessionResultDeserialize(result);
}

export function _deleteLivenessSessionSend(
  context: Client,
  sessionId: string,
  options: DeleteLivenessSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/detectLiveness-sessions/{sessionId}",
    {
      sessionId: sessionId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteLivenessSessionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Please refer to https://learn.microsoft.com/rest/api/face/liveness-session-operations/delete-liveness-session for more details. */
export async function deleteLivenessSession(
  context: Client,
  sessionId: string,
  options: DeleteLivenessSessionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteLivenessSessionSend(context, sessionId, options);
  return _deleteLivenessSessionDeserialize(result);
}

export function _createLivenessSessionSend(
  context: Client,
  body: CreateLivenessSessionContent,
  options: CreateLivenessSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/detectLiveness-sessions")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: createLivenessSessionContentSerializer(body),
    });
}

export async function _createLivenessSessionDeserialize(
  result: PathUncheckedResponse,
): Promise<LivenessSession> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return livenessSessionDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/liveness-session-operations/create-liveness-session for more details. */
export async function createLivenessSession(
  context: Client,
  body: CreateLivenessSessionContent,
  options: CreateLivenessSessionOptionalParams = { requestOptions: {} },
): Promise<LivenessSession> {
  const result = await _createLivenessSessionSend(context, body, options);
  return _createLivenessSessionDeserialize(result);
}
