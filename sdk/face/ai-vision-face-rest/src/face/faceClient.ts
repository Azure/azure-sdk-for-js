// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FaceContext, FaceClientOptionalParams, createFace } from "./api/index.js";
import {
  FaceDetectionResult,
  FaceFindSimilarResult,
  FaceVerificationResult,
  FaceGroupingResult,
  FaceIdentificationResult,
} from "../models/models.js";
import {
  verifyFromLargePersonGroup,
  identifyFromLargePersonGroup,
  findSimilarFromLargeFaceList,
  group,
  verifyFaceToFace,
  findSimilar,
  detect,
  detectFromUrl,
} from "./api/operations.js";
import {
  VerifyFromLargePersonGroupOptionalParams,
  IdentifyFromLargePersonGroupOptionalParams,
  FindSimilarFromLargeFaceListOptionalParams,
  GroupOptionalParams,
  VerifyFaceToFaceOptionalParams,
  FindSimilarOptionalParams,
  DetectOptionalParams,
  DetectFromUrlOptionalParams,
} from "./api/options.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { FaceClientOptionalParams } from "./api/faceContext.js";

export class FaceClient {
  private _client: FaceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: FaceClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createFace(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Please refer to https://learn.microsoft.com/rest/api/face/face-recognition-operations/verify-from-large-person-group for more details. */
  verifyFromLargePersonGroup(
    faceId: string,
    largePersonGroupId: string,
    personId: string,
    options: VerifyFromLargePersonGroupOptionalParams = { requestOptions: {} },
  ): Promise<FaceVerificationResult> {
    return verifyFromLargePersonGroup(this._client, faceId, largePersonGroupId, personId, options);
  }

  /** Please refer to https://learn.microsoft.com/rest/api/face/face-recognition-operations/identify-from-person-group for more details. */
  identifyFromLargePersonGroup(
    faceIds: string[],
    largePersonGroupId: string,
    options: IdentifyFromLargePersonGroupOptionalParams = { requestOptions: {} },
  ): Promise<FaceIdentificationResult[]> {
    return identifyFromLargePersonGroup(this._client, faceIds, largePersonGroupId, options);
  }

  /** Please refer to https://learn.microsoft.com/rest/api/face/face-recognition-operations/find-similar-from-large-face-list for more details. */
  findSimilarFromLargeFaceList(
    faceId: string,
    largeFaceListId: string,
    options: FindSimilarFromLargeFaceListOptionalParams = { requestOptions: {} },
  ): Promise<FaceFindSimilarResult[]> {
    return findSimilarFromLargeFaceList(this._client, faceId, largeFaceListId, options);
  }

  /** Please refer to https://learn.microsoft.com/rest/api/face/face-recognition-operations/group for more details. */
  group(
    faceIds: string[],
    options: GroupOptionalParams = { requestOptions: {} },
  ): Promise<FaceGroupingResult> {
    return group(this._client, faceIds, options);
  }

  /** Please refer to https://learn.microsoft.com/rest/api/face/face-recognition-operations/verify-face-to-face for more details. */
  verifyFaceToFace(
    faceId1: string,
    faceId2: string,
    options: VerifyFaceToFaceOptionalParams = { requestOptions: {} },
  ): Promise<FaceVerificationResult> {
    return verifyFaceToFace(this._client, faceId1, faceId2, options);
  }

  /** Please refer to https://learn.microsoft.com/rest/api/face/face-recognition-operations/find-similar for more details. */
  findSimilar(
    faceId: string,
    faceIds: string[],
    options: FindSimilarOptionalParams = { requestOptions: {} },
  ): Promise<FaceFindSimilarResult[]> {
    return findSimilar(this._client, faceId, faceIds, options);
  }

  /** Please refer to https://learn.microsoft.com/rest/api/face/face-detection-operations/detect for more details. */
  detect(
    imageContent: Uint8Array,
    options: DetectOptionalParams = { requestOptions: {} },
  ): Promise<FaceDetectionResult[]> {
    return detect(this._client, imageContent, options);
  }

  /** Please refer to https://learn.microsoft.com/rest/api/face/face-detection-operations/detect-from-url for more details. */
  detectFromUrl(
    url: string,
    options: DetectFromUrlOptionalParams = { requestOptions: {} },
  ): Promise<FaceDetectionResult[]> {
    return detectFromUrl(this._client, url, options);
  }
}
