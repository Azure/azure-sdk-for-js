// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ComputeLimitContext,
  ComputeLimitClientOptionalParams,
  createComputeLimit,
} from "./api/index.js";
import { FeaturesOperations, _getFeaturesOperations } from "./classic/features/index.js";
import {
  GuestSubscriptionsOperations,
  _getGuestSubscriptionsOperations,
} from "./classic/guestSubscriptions/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  SharedLimitsOperations,
  _getSharedLimitsOperations,
} from "./classic/sharedLimits/index.js";
import { VmFamiliesOperations, _getVmFamiliesOperations } from "./classic/vmFamilies/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ComputeLimitClientOptionalParams } from "./api/computeLimitContext.js";

export class ComputeLimitClient {
  private _client: ComputeLimitContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft Azure Compute Limit Resource Provider. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ComputeLimitClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createComputeLimit(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.vmFamilies = _getVmFamiliesOperations(this._client);
    this.features = _getFeaturesOperations(this._client);
    this.sharedLimits = _getSharedLimitsOperations(this._client);
    this.guestSubscriptions = _getGuestSubscriptionsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for vmFamilies */
  public readonly vmFamilies: VmFamiliesOperations;
  /** The operation groups for features */
  public readonly features: FeaturesOperations;
  /** The operation groups for sharedLimits */
  public readonly sharedLimits: SharedLimitsOperations;
  /** The operation groups for guestSubscriptions */
  public readonly guestSubscriptions: GuestSubscriptionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
