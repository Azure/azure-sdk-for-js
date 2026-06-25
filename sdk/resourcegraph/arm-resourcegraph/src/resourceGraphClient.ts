// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ResourceGraphContext,
  ResourceGraphClientOptionalParams,
  createResourceGraph,
} from "./api/index.js";
import {
  resourcesHistory,
  resources,
  resourceChangeDetails,
  resourceChanges,
} from "./api/operations.js";
import {
  ResourcesHistoryOptionalParams,
  ResourcesOptionalParams,
  ResourceChangeDetailsOptionalParams,
  ResourceChangesOptionalParams,
} from "./api/options.js";
import { GraphQueryOperations, _getGraphQueryOperations } from "./classic/graphQuery/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { ResourcesHistoryResponse } from "./models/models.js";
import {
  ResourceChangesRequestParameters,
  ResourceChangeList,
  ResourceChangeData,
  ResourceChangeDetailsRequestParameters,
} from "./models/resourceChanges/models.js";
import { QueryRequest, QueryResponse } from "./models/resourceGraphApi/models.js";
import { ResourcesHistoryRequest } from "./models/resourceHistory/models.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ResourceGraphClientOptionalParams } from "./api/resourceGraphContext.js";

export class ResourceGraphClient {
  private _client: ResourceGraphContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ResourceGraphClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ResourceGraphClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ResourceGraphClientOptionalParams,
    options?: ResourceGraphClientOptionalParams,
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
    this._client = createResourceGraph(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.graphQuery = _getGraphQueryOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** List all snapshots of a resource for a given time interval. */
  resourcesHistory(
    request: ResourcesHistoryRequest,
    options: ResourcesHistoryOptionalParams = { requestOptions: {} },
  ): Promise<ResourcesHistoryResponse> {
    return resourcesHistory(this._client, request, options);
  }

  /** Queries the resources managed by Azure Resource Manager for scopes specified in the request. */
  resources(
    query: QueryRequest,
    options: ResourcesOptionalParams = { requestOptions: {} },
  ): Promise<QueryResponse> {
    return resources(this._client, query, options);
  }

  /** Get resource change details. */
  resourceChangeDetails(
    parameters: ResourceChangeDetailsRequestParameters,
    options: ResourceChangeDetailsOptionalParams = { requestOptions: {} },
  ): Promise<ResourceChangeData[]> {
    return resourceChangeDetails(this._client, parameters, options);
  }

  /** List changes to a resource for a given time interval. */
  resourceChanges(
    parameters: ResourceChangesRequestParameters,
    options: ResourceChangesOptionalParams = { requestOptions: {} },
  ): Promise<ResourceChangeList> {
    return resourceChanges(this._client, parameters, options);
  }

  /** The operation groups for graphQuery */
  public readonly graphQuery: GraphQueryOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
