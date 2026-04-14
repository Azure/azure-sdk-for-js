// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  TrafficManagerManagementContext,
  TrafficManagerManagementClientOptionalParams,
} from "./api/index.js";
import { createTrafficManagerManagement } from "./api/index.js";
import type { EndpointsOperations } from "./classic/endpoints/index.js";
import { _getEndpointsOperations } from "./classic/endpoints/index.js";
import type { GeographicHierarchiesOperations } from "./classic/geographicHierarchies/index.js";
import { _getGeographicHierarchiesOperations } from "./classic/geographicHierarchies/index.js";
import type { HeatMapOperations } from "./classic/heatMap/index.js";
import { _getHeatMapOperations } from "./classic/heatMap/index.js";
import type { ProfilesOperations } from "./classic/profiles/index.js";
import { _getProfilesOperations } from "./classic/profiles/index.js";
import type { TrafficManagerUserMetricsKeysOperations } from "./classic/trafficManagerUserMetricsKeys/index.js";
import { _getTrafficManagerUserMetricsKeysOperations } from "./classic/trafficManagerUserMetricsKeys/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { TrafficManagerManagementClientOptionalParams } from "./api/trafficManagerManagementContext.js";

export class TrafficManagerManagementClient {
  private _client: TrafficManagerManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: TrafficManagerManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: TrafficManagerManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | TrafficManagerManagementClientOptionalParams,
    options?: TrafficManagerManagementClientOptionalParams,
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
    this._client = createTrafficManagerManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.trafficManagerUserMetricsKeys = _getTrafficManagerUserMetricsKeysOperations(this._client);
    this.heatMap = _getHeatMapOperations(this._client);
    this.geographicHierarchies = _getGeographicHierarchiesOperations(this._client);
    this.profiles = _getProfilesOperations(this._client);
    this.endpoints = _getEndpointsOperations(this._client);
  }

  /** The operation groups for trafficManagerUserMetricsKeys */
  public readonly trafficManagerUserMetricsKeys: TrafficManagerUserMetricsKeysOperations;
  /** The operation groups for heatMap */
  public readonly heatMap: HeatMapOperations;
  /** The operation groups for geographicHierarchies */
  public readonly geographicHierarchies: GeographicHierarchiesOperations;
  /** The operation groups for profiles */
  public readonly profiles: ProfilesOperations;
  /** The operation groups for endpoints */
  public readonly endpoints: EndpointsOperations;
}
