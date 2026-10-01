// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HanaManagementContext, HanaManagementClientOptionalParams } from "./api/index.js";
import { createHanaManagement } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ProviderInstancesOperations } from "./classic/providerInstances/index.js";
import { _getProviderInstancesOperations } from "./classic/providerInstances/index.js";
import type { SapMonitorsOperations } from "./classic/sapMonitors/index.js";
import { _getSapMonitorsOperations } from "./classic/sapMonitors/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { HanaManagementClientOptionalParams } from "./api/hanaManagementContext.js";

export class HanaManagementClient {
  private _client: HanaManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: HanaManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: HanaManagementClientOptionalParams,
  );
  /** The SAP HANA on Azure Management Client. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | HanaManagementClientOptionalParams,
    options?: HanaManagementClientOptionalParams,
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
    this._client = createHanaManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.providerInstances = _getProviderInstancesOperations(this._client);
    this.sapMonitors = _getSapMonitorsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for providerInstances */
  public readonly providerInstances: ProviderInstancesOperations;
  /** The operation groups for sapMonitors */
  public readonly sapMonitors: SapMonitorsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
