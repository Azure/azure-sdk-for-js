// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ContainerInstanceManagementContext,
  ContainerInstanceManagementClientOptionalParams,
} from "./api/index.js";
import { createContainerInstanceManagement } from "./api/index.js";
import type { CGProfileOperations } from "./classic/cgProfile/index.js";
import { _getCGProfileOperations } from "./classic/cgProfile/index.js";
import type { CGProfilesOperations } from "./classic/cgProfiles/index.js";
import { _getCGProfilesOperations } from "./classic/cgProfiles/index.js";
import type { ContainerGroupsOperations } from "./classic/containerGroups/index.js";
import { _getContainerGroupsOperations } from "./classic/containerGroups/index.js";
import type { ContainersOperations } from "./classic/containers/index.js";
import { _getContainersOperations } from "./classic/containers/index.js";
import type { LocationOperations } from "./classic/location/index.js";
import { _getLocationOperations } from "./classic/location/index.js";
import type { NGroupsOperations } from "./classic/nGroups/index.js";
import { _getNGroupsOperations } from "./classic/nGroups/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { SandboxGroupsOperations } from "./classic/sandboxGroups/index.js";
import { _getSandboxGroupsOperations } from "./classic/sandboxGroups/index.js";
import type { SubnetServiceAssociationLinkOperations } from "./classic/subnetServiceAssociationLink/index.js";
import { _getSubnetServiceAssociationLinkOperations } from "./classic/subnetServiceAssociationLink/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ContainerInstanceManagementClientOptionalParams } from "./api/containerInstanceManagementContext.js";

export class ContainerInstanceManagementClient {
  private _client: ContainerInstanceManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    options?: ContainerInstanceManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ContainerInstanceManagementClientOptionalParams,
  );
  /** ContainerInstance */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ContainerInstanceManagementClientOptionalParams,
    options?: ContainerInstanceManagementClientOptionalParams,
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
    this._client = createContainerInstanceManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.subnetServiceAssociationLink = _getSubnetServiceAssociationLinkOperations(this._client);
    this.location = _getLocationOperations(this._client);
    this.cgProfiles = _getCGProfilesOperations(this._client);
    this.containers = _getContainersOperations(this._client);
    this.sandboxGroups = _getSandboxGroupsOperations(this._client);
    this.cgProfile = _getCGProfileOperations(this._client);
    this.nGroups = _getNGroupsOperations(this._client);
    this.containerGroups = _getContainerGroupsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for subnetServiceAssociationLink */
  public readonly subnetServiceAssociationLink: SubnetServiceAssociationLinkOperations;
  /** The operation groups for location */
  public readonly location: LocationOperations;
  /** The operation groups for cgProfiles */
  public readonly cgProfiles: CGProfilesOperations;
  /** The operation groups for containers */
  public readonly containers: ContainersOperations;
  /** The operation groups for sandboxGroups */
  public readonly sandboxGroups: SandboxGroupsOperations;
  /** The operation groups for cgProfile */
  public readonly cgProfile: CGProfileOperations;
  /** The operation groups for nGroups */
  public readonly nGroups: NGroupsOperations;
  /** The operation groups for containerGroups */
  public readonly containerGroups: ContainerGroupsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
