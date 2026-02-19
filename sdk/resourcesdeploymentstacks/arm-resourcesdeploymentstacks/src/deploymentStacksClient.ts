// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeploymentStacksContext, DeploymentStacksClientOptionalParams } from "./api/index.js";
import { createDeploymentStacks } from "./api/index.js";
import type { DeploymentStacksOperations } from "./classic/deploymentStacks/index.js";
import { _getDeploymentStacksOperations } from "./classic/deploymentStacks/index.js";
import type { DeploymentStacksWhatIfResultsAtManagementGroupOperations } from "./classic/deploymentStacksWhatIfResultsAtManagementGroup/index.js";
import { _getDeploymentStacksWhatIfResultsAtManagementGroupOperations } from "./classic/deploymentStacksWhatIfResultsAtManagementGroup/index.js";
import type { DeploymentStacksWhatIfResultsAtResourceGroupOperations } from "./classic/deploymentStacksWhatIfResultsAtResourceGroup/index.js";
import { _getDeploymentStacksWhatIfResultsAtResourceGroupOperations } from "./classic/deploymentStacksWhatIfResultsAtResourceGroup/index.js";
import type { DeploymentStacksWhatIfResultsAtSubscriptionOperations } from "./classic/deploymentStacksWhatIfResultsAtSubscription/index.js";
import { _getDeploymentStacksWhatIfResultsAtSubscriptionOperations } from "./classic/deploymentStacksWhatIfResultsAtSubscription/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { DeploymentStacksClientOptionalParams } from "./api/deploymentStacksContext.js";

export class DeploymentStacksClient {
  private _client: DeploymentStacksContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: DeploymentStacksClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: DeploymentStacksClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | DeploymentStacksClientOptionalParams,
    options?: DeploymentStacksClientOptionalParams,
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
    this._client = createDeploymentStacks(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.deploymentStacks = _getDeploymentStacksOperations(this._client);
    this.deploymentStacksWhatIfResultsAtManagementGroup =
      _getDeploymentStacksWhatIfResultsAtManagementGroupOperations(this._client);
    this.deploymentStacksWhatIfResultsAtSubscription =
      _getDeploymentStacksWhatIfResultsAtSubscriptionOperations(this._client);
    this.deploymentStacksWhatIfResultsAtResourceGroup =
      _getDeploymentStacksWhatIfResultsAtResourceGroupOperations(this._client);
  }

  /** The operation groups for deploymentStacks */
  public readonly deploymentStacks: DeploymentStacksOperations;
  /** The operation groups for deploymentStacksWhatIfResultsAtManagementGroup */
  public readonly deploymentStacksWhatIfResultsAtManagementGroup: DeploymentStacksWhatIfResultsAtManagementGroupOperations;
  /** The operation groups for deploymentStacksWhatIfResultsAtSubscription */
  public readonly deploymentStacksWhatIfResultsAtSubscription: DeploymentStacksWhatIfResultsAtSubscriptionOperations;
  /** The operation groups for deploymentStacksWhatIfResultsAtResourceGroup */
  public readonly deploymentStacksWhatIfResultsAtResourceGroup: DeploymentStacksWhatIfResultsAtResourceGroupOperations;
}
