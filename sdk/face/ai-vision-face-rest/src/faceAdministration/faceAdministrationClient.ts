// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  FaceAdministrationContext,
  FaceAdministrationClientOptionalParams,
  createFaceAdministration,
} from "./api/index.js";
import {
  LargeFaceListOperations,
  _getLargeFaceListOperations,
} from "./classic/largeFaceList/index.js";
import {
  LargePersonGroupOperations,
  _getLargePersonGroupOperations,
} from "./classic/largePersonGroup/index.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { FaceAdministrationClientOptionalParams } from "./api/faceAdministrationContext.js";

export class FaceAdministrationClient {
  private _client: FaceAdministrationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: FaceAdministrationClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createFaceAdministration(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.largePersonGroup = _getLargePersonGroupOperations(this._client);
    this.largeFaceList = _getLargeFaceListOperations(this._client);
  }

  /** The operation groups for largePersonGroup */
  public readonly largePersonGroup: LargePersonGroupOperations;
  /** The operation groups for largeFaceList */
  public readonly largeFaceList: LargeFaceListOperations;
}
