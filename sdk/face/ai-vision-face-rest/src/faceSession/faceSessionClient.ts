// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  FaceSessionContext,
  FaceSessionClientOptionalParams,
  createFaceSession,
} from "./api/index.js";
import {
  FaceDetectionResult,
  CreateLivenessSessionContent,
  LivenessSession,
  CreateLivenessWithVerifySessionContent,
  LivenessWithVerifySession,
  GetSessionImageResponse,
} from "../models/models.js";
import {
  getSessionImage,
  detectFromSessionImage,
  getLivenessWithVerifySessionResult,
  deleteLivenessWithVerifySession,
  createLivenessWithVerifySession,
  getLivenessSessionResult,
  deleteLivenessSession,
  createLivenessSession,
} from "./api/operations.js";
import {
  GetSessionImageOptionalParams,
  DetectFromSessionImageOptionalParams,
  GetLivenessWithVerifySessionResultOptionalParams,
  DeleteLivenessWithVerifySessionOptionalParams,
  CreateLivenessWithVerifySessionOptionalParams,
  GetLivenessSessionResultOptionalParams,
  DeleteLivenessSessionOptionalParams,
  CreateLivenessSessionOptionalParams,
} from "./api/options.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { FaceSessionClientOptionalParams } from "./api/faceSessionContext.js";

export class FaceSessionClient {
  private _client: FaceSessionContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: FaceSessionClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createFaceSession(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Please refer to https://learn.microsoft.com/rest/api/face/liveness-session-operations/get-session-image for more details. */
  getSessionImage(
    sessionImageId: string,
    options: GetSessionImageOptionalParams = { requestOptions: {} },
  ): Promise<GetSessionImageResponse> {
    return getSessionImage(this._client, sessionImageId, options);
  }

  /** Please refer to https://learn.microsoft.com/rest/api/face/face-detection-operations/detect-from-session-image-id for more details. */
  detectFromSessionImage(
    sessionImageId: string,
    options: DetectFromSessionImageOptionalParams = { requestOptions: {} },
  ): Promise<FaceDetectionResult[]> {
    return detectFromSessionImage(this._client, sessionImageId, options);
  }

  /** Please refer to https://learn.microsoft.com/rest/api/face/liveness-session-operations/get-liveness-with-verify-session-result for more details. */
  getLivenessWithVerifySessionResult(
    sessionId: string,
    options: GetLivenessWithVerifySessionResultOptionalParams = { requestOptions: {} },
  ): Promise<LivenessWithVerifySession> {
    return getLivenessWithVerifySessionResult(this._client, sessionId, options);
  }

  /** Please refer to https://learn.microsoft.com/rest/api/face/liveness-session-operations/delete-liveness-with-verify-session for more details. */
  deleteLivenessWithVerifySession(
    sessionId: string,
    options: DeleteLivenessWithVerifySessionOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteLivenessWithVerifySession(this._client, sessionId, options);
  }

  /** Please refer to https://learn.microsoft.com/rest/api/face/liveness-session-operations/create-liveness-with-verify-session-with-verify-image for more details. */
  createLivenessWithVerifySession(
    body: CreateLivenessWithVerifySessionContent,
    options: CreateLivenessWithVerifySessionOptionalParams = { requestOptions: {} },
  ): Promise<LivenessWithVerifySession> {
    return createLivenessWithVerifySession(this._client, body, options);
  }

  /** Please refer to https://learn.microsoft.com/rest/api/face/liveness-session-operations/get-liveness-session-result for more details. */
  getLivenessSessionResult(
    sessionId: string,
    options: GetLivenessSessionResultOptionalParams = { requestOptions: {} },
  ): Promise<LivenessSession> {
    return getLivenessSessionResult(this._client, sessionId, options);
  }

  /** Please refer to https://learn.microsoft.com/rest/api/face/liveness-session-operations/delete-liveness-session for more details. */
  deleteLivenessSession(
    sessionId: string,
    options: DeleteLivenessSessionOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteLivenessSession(this._client, sessionId, options);
  }

  /** Please refer to https://learn.microsoft.com/rest/api/face/liveness-session-operations/create-liveness-session for more details. */
  createLivenessSession(
    body: CreateLivenessSessionContent,
    options: CreateLivenessSessionOptionalParams = { requestOptions: {} },
  ): Promise<LivenessSession> {
    return createLivenessSession(this._client, body, options);
  }
}
