// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SaaSContext, SaaSClientOptionalParams } from "./api/index.js";
import { createSaaS } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { SaasOperationStatusesOperations } from "./classic/saasOperationStatuses/index.js";
import { _getSaasOperationStatusesOperations } from "./classic/saasOperationStatuses/index.js";
import type { SaasSubscriptionLevelOperations } from "./classic/saasSubscriptionLevel/index.js";
import { _getSaasSubscriptionLevelOperations } from "./classic/saasSubscriptionLevel/index.js";
import type { SaasSubscriptionLevelGlobalOperations } from "./classic/saasSubscriptionLevelGlobal/index.js";
import { _getSaasSubscriptionLevelGlobalOperations } from "./classic/saasSubscriptionLevelGlobal/index.js";
import type { SaasTenantLevelOperations } from "./classic/saasTenantLevel/index.js";
import { _getSaasTenantLevelOperations } from "./classic/saasTenantLevel/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { SaaSClientOptionalParams } from "./api/saaSContext.js";

export class SaaSClient {
  private _client: SaaSContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: SaaSClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: SaaSClientOptionalParams,
  );
  /** Microsoft.SaaS Resource Provider - GA API */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | SaaSClientOptionalParams,
    options?: SaaSClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    this._client = createSaaS(credential, subscriptionId ?? "", options);
    this.pipeline = this._client.pipeline;
    this.saasOperationStatuses = _getSaasOperationStatusesOperations(this._client);
    this.saasTenantLevel = _getSaasTenantLevelOperations(this._client);
    this.saasSubscriptionLevelGlobal = _getSaasSubscriptionLevelGlobalOperations(this._client);
    this.saasSubscriptionLevel = _getSaasSubscriptionLevelOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for saasOperationStatuses */
  public readonly saasOperationStatuses: SaasOperationStatusesOperations;
  /** The operation groups for saasTenantLevel */
  public readonly saasTenantLevel: SaasTenantLevelOperations;
  /** The operation groups for saasSubscriptionLevelGlobal */
  public readonly saasSubscriptionLevelGlobal: SaasSubscriptionLevelGlobalOperations;
  /** The operation groups for saasSubscriptionLevel */
  public readonly saasSubscriptionLevel: SaasSubscriptionLevelOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
