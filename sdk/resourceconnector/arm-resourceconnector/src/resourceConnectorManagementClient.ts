// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ResourceConnectorManagementContext,
  ResourceConnectorManagementClientOptionalParams,
  createResourceConnectorManagement,
} from "./api/index.js";
import { AppliancesOperations, _getAppliancesOperations } from "./classic/appliances/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ResourceConnectorManagementClientOptionalParams } from "./api/resourceConnectorManagementContext.js";

export class ResourceConnectorManagementClient {
  private _client: ResourceConnectorManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    options?: ResourceConnectorManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ResourceConnectorManagementClientOptionalParams,
  );
  /** The appliances Rest API spec. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ResourceConnectorManagementClientOptionalParams,
    options?: ResourceConnectorManagementClientOptionalParams,
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
    this._client = createResourceConnectorManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.appliances = _getAppliancesOperations(this._client);
  }

  /** The operation groups for appliances */
  public readonly appliances: AppliancesOperations;
}
