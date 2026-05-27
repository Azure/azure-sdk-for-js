// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CustomLocationsManagementContext,
  CustomLocationsManagementClientOptionalParams,
  createCustomLocationsManagement,
} from "./api/index.js";
import {
  CustomLocationsOperations,
  _getCustomLocationsOperations,
} from "./classic/customLocations/index.js";
import {
  ResourceSyncRulesOperations,
  _getResourceSyncRulesOperations,
} from "./classic/resourceSyncRules/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { CustomLocationsManagementClientOptionalParams } from "./api/customLocationsManagementContext.js";

export class CustomLocationsManagementClient {
  private _client: CustomLocationsManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: CustomLocationsManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: CustomLocationsManagementClientOptionalParams,
  );
  /** The customLocations Rest API spec. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | CustomLocationsManagementClientOptionalParams,
    options?: CustomLocationsManagementClientOptionalParams,
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
    this._client = createCustomLocationsManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.resourceSyncRules = _getResourceSyncRulesOperations(this._client);
    this.customLocations = _getCustomLocationsOperations(this._client);
  }

  /** The operation groups for resourceSyncRules */
  public readonly resourceSyncRules: ResourceSyncRulesOperations;
  /** The operation groups for customLocations */
  public readonly customLocations: CustomLocationsOperations;
}
