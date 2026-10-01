// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ResourceManagementContext,
  ResourceManagementClientOptionalParams,
  createResourceManagement,
} from "./api/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  ProviderResourceTypesOperations,
  _getProviderResourceTypesOperations,
} from "./classic/providerResourceTypes/index.js";
import { ProvidersOperations, _getProvidersOperations } from "./classic/providers/index.js";
import {
  ResourceGroupsOperations,
  _getResourceGroupsOperations,
} from "./classic/resourceGroups/index.js";
import { ResourcesOperations, _getResourcesOperations } from "./classic/resources/index.js";
import {
  TagsOperationsOperations,
  _getTagsOperationsOperations,
} from "./classic/tagsOperations/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ResourceManagementClientOptionalParams } from "./api/resourceManagementContext.js";

export class ResourceManagementClient {
  private _client: ResourceManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ResourceManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ResourceManagementClientOptionalParams,
  );
  /** Provides operations for working with resources and resource groups. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ResourceManagementClientOptionalParams,
    options?: ResourceManagementClientOptionalParams,
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
    this._client = createResourceManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.providerResourceTypes = _getProviderResourceTypesOperations(this._client);
    this.providers = _getProvidersOperations(this._client);
    this.tagsOperations = _getTagsOperationsOperations(this._client);
    this.resources = _getResourcesOperations(this._client);
    this.resourceGroups = _getResourceGroupsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for providerResourceTypes */
  public readonly providerResourceTypes: ProviderResourceTypesOperations;
  /** The operation groups for providers */
  public readonly providers: ProvidersOperations;
  /** The operation groups for tagsOperations */
  public readonly tagsOperations: TagsOperationsOperations;
  /** The operation groups for resources */
  public readonly resources: ResourcesOperations;
  /** The operation groups for resourceGroups */
  public readonly resourceGroups: ResourceGroupsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
