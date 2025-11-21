// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ResourceConnectorManagementContext,
  ResourceConnectorManagementClientOptionalParams,
} from "./api/index.js";
import { createResourceConnectorManagement } from "./api/index.js";
import type { AppliancesOperations } from "./classic/appliances/index.js";
import { _getAppliancesOperations } from "./classic/appliances/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ResourceConnectorManagementClientOptionalParams } from "./api/resourceConnectorManagementContext.js";

export class ResourceConnectorManagementClient {
  private _client: ResourceConnectorManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The appliances Rest API spec. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ResourceConnectorManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createResourceConnectorManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.appliances = _getAppliancesOperations(this._client);
  }

  /** The operation groups for appliances */
  public readonly appliances: AppliancesOperations;
}
