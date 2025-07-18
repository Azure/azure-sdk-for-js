// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceContext } from "../../api/containerServiceContext.js";
import { DeploymentSafeguard, DeploymentSafeguardCreateOrUpdate } from "../../models/models.js";
import {
  DeploymentSafeguardsListOptionalParams,
  DeploymentSafeguardsDeleteOptionalParams,
  DeploymentSafeguardsCreateOptionalParams,
  DeploymentSafeguardsGetOptionalParams,
} from "../../api/deploymentSafeguards/options.js";
import { list, $delete, create, get } from "../../api/deploymentSafeguards/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DeploymentSafeguards operations. */
export interface DeploymentSafeguardsOperations {
  /** List DeploymentSafeguards by parent resource */
  list: (
    resourceUri: string,
    options?: DeploymentSafeguardsListOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentSafeguard>;
  /** Delete DeploymentSafeguards */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceUri: string,
    options?: DeploymentSafeguardsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates a deploymentSafeguard */
  create: (
    resourceUri: string,
    resource: DeploymentSafeguardCreateOrUpdate,
    options?: DeploymentSafeguardsCreateOptionalParams,
  ) => PollerLike<
    OperationState<DeploymentSafeguardCreateOrUpdate>,
    DeploymentSafeguardCreateOrUpdate
  >;
  /** Fetch a deployment safeguard by name */
  get: (
    resourceUri: string,
    options?: DeploymentSafeguardsGetOptionalParams,
  ) => Promise<DeploymentSafeguard>;
}

function _getDeploymentSafeguards(context: ContainerServiceContext) {
  return {
    list: (resourceUri: string, options?: DeploymentSafeguardsListOptionalParams) =>
      list(context, resourceUri, options),
    delete: (resourceUri: string, options?: DeploymentSafeguardsDeleteOptionalParams) =>
      $delete(context, resourceUri, options),
    create: (
      resourceUri: string,
      resource: DeploymentSafeguardCreateOrUpdate,
      options?: DeploymentSafeguardsCreateOptionalParams,
    ) => create(context, resourceUri, resource, options),
    get: (resourceUri: string, options?: DeploymentSafeguardsGetOptionalParams) =>
      get(context, resourceUri, options),
  };
}

export function _getDeploymentSafeguardsOperations(
  context: ContainerServiceContext,
): DeploymentSafeguardsOperations {
  return {
    ..._getDeploymentSafeguards(context),
  };
}
