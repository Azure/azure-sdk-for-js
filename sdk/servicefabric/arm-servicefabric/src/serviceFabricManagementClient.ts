// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ServiceFabricManagementContext,
  ServiceFabricManagementClientOptionalParams,
} from "./api/index.js";
import { createServiceFabricManagement } from "./api/index.js";
import type { ApplicationTypeVersionsOperations } from "./classic/applicationTypeVersions/index.js";
import { _getApplicationTypeVersionsOperations } from "./classic/applicationTypeVersions/index.js";
import type { ApplicationTypesOperations } from "./classic/applicationTypes/index.js";
import { _getApplicationTypesOperations } from "./classic/applicationTypes/index.js";
import type { ApplicationsOperations } from "./classic/applications/index.js";
import { _getApplicationsOperations } from "./classic/applications/index.js";
import type { ClusterVersionsOperations } from "./classic/clusterVersions/index.js";
import { _getClusterVersionsOperations } from "./classic/clusterVersions/index.js";
import type { ClustersOperations } from "./classic/clusters/index.js";
import { _getClustersOperations } from "./classic/clusters/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ServicesOperations } from "./classic/services/index.js";
import { _getServicesOperations } from "./classic/services/index.js";
import type { UnsupportedVmSizesOperations } from "./classic/unsupportedVmSizes/index.js";
import { _getUnsupportedVmSizesOperations } from "./classic/unsupportedVmSizes/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ServiceFabricManagementClientOptionalParams } from "./api/serviceFabricManagementContext.js";

export class ServiceFabricManagementClient {
  private _client: ServiceFabricManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ServiceFabricManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ServiceFabricManagementClientOptionalParams,
  );
  /** Azure Service Fabric Resource Provider API Client */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ServiceFabricManagementClientOptionalParams,
    options?: ServiceFabricManagementClientOptionalParams,
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
    this._client = createServiceFabricManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.clusterVersions = _getClusterVersionsOperations(this._client);
    this.services = _getServicesOperations(this._client);
    this.applications = _getApplicationsOperations(this._client);
    this.applicationTypeVersions = _getApplicationTypeVersionsOperations(this._client);
    this.applicationTypes = _getApplicationTypesOperations(this._client);
    this.unsupportedVmSizes = _getUnsupportedVmSizesOperations(this._client);
    this.clusters = _getClustersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for clusterVersions */
  public readonly clusterVersions: ClusterVersionsOperations;
  /** The operation groups for services */
  public readonly services: ServicesOperations;
  /** The operation groups for applications */
  public readonly applications: ApplicationsOperations;
  /** The operation groups for applicationTypeVersions */
  public readonly applicationTypeVersions: ApplicationTypeVersionsOperations;
  /** The operation groups for applicationTypes */
  public readonly applicationTypes: ApplicationTypesOperations;
  /** The operation groups for unsupportedVmSizes */
  public readonly unsupportedVmSizes: UnsupportedVmSizesOperations;
  /** The operation groups for clusters */
  public readonly clusters: ClustersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
