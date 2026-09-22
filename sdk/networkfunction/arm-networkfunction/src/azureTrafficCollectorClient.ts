// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AzureTrafficCollectorContext,
  AzureTrafficCollectorClientOptionalParams,
} from "./api/index.js";
import { createAzureTrafficCollector } from "./api/index.js";
import type { AzureTrafficCollectorsOperations } from "./classic/azureTrafficCollectors/index.js";
import { _getAzureTrafficCollectorsOperations } from "./classic/azureTrafficCollectors/index.js";
import type { AzureTrafficCollectorsByResourceGroupOperations } from "./classic/azureTrafficCollectorsByResourceGroup/index.js";
import { _getAzureTrafficCollectorsByResourceGroupOperations } from "./classic/azureTrafficCollectorsByResourceGroup/index.js";
import type { AzureTrafficCollectorsBySubscriptionOperations } from "./classic/azureTrafficCollectorsBySubscription/index.js";
import { _getAzureTrafficCollectorsBySubscriptionOperations } from "./classic/azureTrafficCollectorsBySubscription/index.js";
import type { CollectorPoliciesOperations } from "./classic/collectorPolicies/index.js";
import { _getCollectorPoliciesOperations } from "./classic/collectorPolicies/index.js";
import type { NetworkFunctionOperations } from "./classic/networkFunction/index.js";
import { _getNetworkFunctionOperations } from "./classic/networkFunction/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureTrafficCollectorClientOptionalParams } from "./api/azureTrafficCollectorContext.js";

export class AzureTrafficCollectorClient {
  private _client: AzureTrafficCollectorContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: AzureTrafficCollectorClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: AzureTrafficCollectorClientOptionalParams,
  );
  /** Azure Traffic Collector service */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | AzureTrafficCollectorClientOptionalParams,
    options?: AzureTrafficCollectorClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureTrafficCollector(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.azureTrafficCollectorsBySubscription = _getAzureTrafficCollectorsBySubscriptionOperations(
      this._client,
    );
    this.azureTrafficCollectorsByResourceGroup =
      _getAzureTrafficCollectorsByResourceGroupOperations(this._client);
    this.networkFunction = _getNetworkFunctionOperations(this._client);
    this.collectorPolicies = _getCollectorPoliciesOperations(this._client);
    this.azureTrafficCollectors = _getAzureTrafficCollectorsOperations(this._client);
  }

  /** The operation groups for azureTrafficCollectorsBySubscription */
  public readonly azureTrafficCollectorsBySubscription: AzureTrafficCollectorsBySubscriptionOperations;
  /** The operation groups for azureTrafficCollectorsByResourceGroup */
  public readonly azureTrafficCollectorsByResourceGroup: AzureTrafficCollectorsByResourceGroupOperations;
  /** The operation groups for networkFunction */
  public readonly networkFunction: NetworkFunctionOperations;
  /** The operation groups for collectorPolicies */
  public readonly collectorPolicies: CollectorPoliciesOperations;
  /** The operation groups for azureTrafficCollectors */
  public readonly azureTrafficCollectors: AzureTrafficCollectorsOperations;
}
