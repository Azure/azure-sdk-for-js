// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EdgeContext, EdgeClientOptionalParams } from "./api/index.js";
import { createEdge } from "./api/index.js";
import type { ArtifactsOperations } from "./classic/artifacts/index.js";
import { _getArtifactsOperations } from "./classic/artifacts/index.js";
import type { DisconnectedOperationsOperations } from "./classic/disconnectedOperations/index.js";
import { _getDisconnectedOperationsOperations } from "./classic/disconnectedOperations/index.js";
import type { ImagesOperations } from "./classic/images/index.js";
import { _getImagesOperations } from "./classic/images/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { EdgeClientOptionalParams } from "./api/edgeContext.js";

export class EdgeClient {
  private _client: EdgeContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Disconnected operations service API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: EdgeClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createEdge(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.artifacts = _getArtifactsOperations(this._client);
    this.images = _getImagesOperations(this._client);
    this.disconnectedOperations = _getDisconnectedOperationsOperations(this._client);
  }

  /** The operation groups for artifacts */
  public readonly artifacts: ArtifactsOperations;
  /** The operation groups for images */
  public readonly images: ImagesOperations;
  /** The operation groups for disconnectedOperations */
  public readonly disconnectedOperations: DisconnectedOperationsOperations;
}
