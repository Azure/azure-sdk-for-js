// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext, SearchManagementClientOptionalParams } from "./api/index.js";
import { createSearchManagement } from "./api/index.js";
import { usageBySubscriptionSku } from "./api/operations.js";
import type { UsageBySubscriptionSkuOptionalParams } from "./api/options.js";
import type { AdminKeysOperations } from "./classic/adminKeys/index.js";
import { _getAdminKeysOperations } from "./classic/adminKeys/index.js";
import type { NetworkSecurityPerimeterConfigurationsOperations } from "./classic/networkSecurityPerimeterConfigurations/index.js";
import { _getNetworkSecurityPerimeterConfigurationsOperations } from "./classic/networkSecurityPerimeterConfigurations/index.js";
import type { OfferingsOperations } from "./classic/offerings/index.js";
import { _getOfferingsOperations } from "./classic/offerings/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { QueryKeysOperations } from "./classic/queryKeys/index.js";
import { _getQueryKeysOperations } from "./classic/queryKeys/index.js";
import type { ServicesOperations } from "./classic/services/index.js";
import { _getServicesOperations } from "./classic/services/index.js";
import type { SharedPrivateLinkResourcesOperations } from "./classic/sharedPrivateLinkResources/index.js";
import { _getSharedPrivateLinkResourcesOperations } from "./classic/sharedPrivateLinkResources/index.js";
import type { UsagesOperations } from "./classic/usages/index.js";
import { _getUsagesOperations } from "./classic/usages/index.js";
import type { QuotaUsageResult } from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { SearchManagementClientOptionalParams } from "./api/searchManagementContext.js";

export class SearchManagementClient {
  private _client: SearchManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: SearchManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: SearchManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | SearchManagementClientOptionalParams,
    options?: SearchManagementClientOptionalParams,
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
    this._client = createSearchManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.queryKeys = _getQueryKeysOperations(this._client);
    this.adminKeys = _getAdminKeysOperations(this._client);
    this.usages = _getUsagesOperations(this._client);
    this.services = _getServicesOperations(this._client);
    this.networkSecurityPerimeterConfigurations =
      _getNetworkSecurityPerimeterConfigurationsOperations(this._client);
    this.sharedPrivateLinkResources = _getSharedPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.offerings = _getOfferingsOperations(this._client);
  }

  /** Gets the quota usage for a search SKU in the given subscription. */
  usageBySubscriptionSku(
    location: string,
    skuName: string,
    options: UsageBySubscriptionSkuOptionalParams = { requestOptions: {} },
  ): Promise<QuotaUsageResult> {
    return usageBySubscriptionSku(this._client, location, skuName, options);
  }

  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for queryKeys */
  public readonly queryKeys: QueryKeysOperations;
  /** The operation groups for adminKeys */
  public readonly adminKeys: AdminKeysOperations;
  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for services */
  public readonly services: ServicesOperations;
  /** The operation groups for networkSecurityPerimeterConfigurations */
  public readonly networkSecurityPerimeterConfigurations: NetworkSecurityPerimeterConfigurationsOperations;
  /** The operation groups for sharedPrivateLinkResources */
  public readonly sharedPrivateLinkResources: SharedPrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for offerings */
  public readonly offerings: OfferingsOperations;
}
