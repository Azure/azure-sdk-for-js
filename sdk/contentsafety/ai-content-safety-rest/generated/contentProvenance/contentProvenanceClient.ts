// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ContentProvenanceContext,
  ContentProvenanceClientOptionalParams,
  createContentProvenance,
} from "./api/index.js";
import {
  DetectProvenanceOptions,
  DetectProvenanceResult,
  ProvenanceDetectOperation,
} from "../models/models.js";
import { getOperationStatus, detect } from "./api/operations.js";
import { GetOperationStatusOptionalParams, DetectOptionalParams } from "./api/options.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { PollerLike, OperationState } from "@azure/core-lro";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ContentProvenanceClientOptionalParams } from "./api/contentProvenanceContext.js";

export class ContentProvenanceClient {
  private _client: ContentProvenanceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: ContentProvenanceClientOptionalParams = {},
  ) {
    this._client = createContentProvenance(endpointParam, credential, options);
    this.pipeline = this._client.pipeline;
  }

  /** Gets the status, result, or error of an asynchronous Content Provenance Detection operation. */
  getOperationStatus(
    operationId: string,
    options: GetOperationStatusOptionalParams = { requestOptions: {} },
  ): Promise<ProvenanceDetectOperation> {
    return getOperationStatus(this._client, operationId, options);
  }

  /** Starts an asynchronous Content Provenance Detection operation that inspects the supplied media for Microsoft-issued C2PA and imperceptible watermark signals indicating the content was created or modified using AI. */
  detect(
    options: DetectProvenanceOptions,
    optionalParams: DetectOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<DetectProvenanceResult>, DetectProvenanceResult> {
    return detect(this._client, options, optionalParams);
  }
}
