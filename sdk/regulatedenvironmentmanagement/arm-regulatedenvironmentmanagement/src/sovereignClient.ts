// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  _getLandingZoneRegistrationOperationsOperations,
  LandingZoneRegistrationOperationsOperations,
} from "./classic/landingZoneRegistrationOperations/index.js";
import {
  _getLandingZoneConfigurationOperationsOperations,
  LandingZoneConfigurationOperationsOperations,
} from "./classic/landingZoneConfigurationOperations/index.js";
import {
  _getLandingZoneAccountOperationsOperations,
  LandingZoneAccountOperationsOperations,
} from "./classic/landingZoneAccountOperations/index.js";
import { _getOperationsOperations, OperationsOperations } from "./classic/operations/index.js";
import { createSovereign, SovereignContext, SovereignClientOptionalParams } from "./api/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { SovereignClientOptionalParams } from "./api/sovereignContext.js";

export class SovereignClient {
  private _client: SovereignContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: SovereignClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createSovereign(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.landingZoneRegistrationOperations = _getLandingZoneRegistrationOperationsOperations(
      this._client,
    );
    this.landingZoneConfigurationOperations = _getLandingZoneConfigurationOperationsOperations(
      this._client,
    );
    this.landingZoneAccountOperations = _getLandingZoneAccountOperationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for landingZoneRegistrationOperations */
  public readonly landingZoneRegistrationOperations: LandingZoneRegistrationOperationsOperations;
  /** The operation groups for landingZoneConfigurationOperations */
  public readonly landingZoneConfigurationOperations: LandingZoneConfigurationOperationsOperations;
  /** The operation groups for landingZoneAccountOperations */
  public readonly landingZoneAccountOperations: LandingZoneAccountOperationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
