// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureRedHatOpenShiftContext,
  AzureRedHatOpenShiftClientOptionalParams,
  createAzureRedHatOpenShift,
} from "./api/index.js";
import {
  OpenShiftClustersOperations,
  _getOpenShiftClustersOperations,
} from "./classic/openShiftClusters/index.js";
import {
  OpenShiftVersionsOperations,
  _getOpenShiftVersionsOperations,
} from "./classic/openShiftVersions/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PlatformWorkloadIdentityRoleSetOperations,
  _getPlatformWorkloadIdentityRoleSetOperations,
} from "./classic/platformWorkloadIdentityRoleSet/index.js";
import {
  PlatformWorkloadIdentityRoleSetsOperations,
  _getPlatformWorkloadIdentityRoleSetsOperations,
} from "./classic/platformWorkloadIdentityRoleSets/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureRedHatOpenShiftClientOptionalParams } from "./api/azureRedHatOpenShiftContext.js";

export class AzureRedHatOpenShiftClient {
  private _client: AzureRedHatOpenShiftContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: AzureRedHatOpenShiftClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: AzureRedHatOpenShiftClientOptionalParams,
  );
  /** Rest API for Azure Red Hat OpenShift 4 */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | AzureRedHatOpenShiftClientOptionalParams,
    options?: AzureRedHatOpenShiftClientOptionalParams,
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
    this._client = createAzureRedHatOpenShift(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.platformWorkloadIdentityRoleSet = _getPlatformWorkloadIdentityRoleSetOperations(
      this._client,
    );
    this.openShiftClusters = _getOpenShiftClustersOperations(this._client);
    this.platformWorkloadIdentityRoleSets = _getPlatformWorkloadIdentityRoleSetsOperations(
      this._client,
    );
    this.openShiftVersions = _getOpenShiftVersionsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for platformWorkloadIdentityRoleSet */
  public readonly platformWorkloadIdentityRoleSet: PlatformWorkloadIdentityRoleSetOperations;
  /** The operation groups for openShiftClusters */
  public readonly openShiftClusters: OpenShiftClustersOperations;
  /** The operation groups for platformWorkloadIdentityRoleSets */
  public readonly platformWorkloadIdentityRoleSets: PlatformWorkloadIdentityRoleSetsOperations;
  /** The operation groups for openShiftVersions */
  public readonly openShiftVersions: OpenShiftVersionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
