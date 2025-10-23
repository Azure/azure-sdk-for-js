// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  generateKeyPair,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/sshPublicKeyResources/operations.js";
import type {
  SshPublicKeyResourcesGenerateKeyPairOptionalParams,
  SshPublicKeyResourcesListBySubscriptionOptionalParams,
  SshPublicKeyResourcesListByResourceGroupOptionalParams,
  SshPublicKeyResourcesDeleteOptionalParams,
  SshPublicKeyResourcesUpdateOptionalParams,
  SshPublicKeyResourcesCreateOptionalParams,
  SshPublicKeyResourcesGetOptionalParams,
} from "../../api/sshPublicKeyResources/options.js";
import type {
  SshPublicKeyResource,
  SshPublicKeyUpdateResource,
  SshPublicKeyGenerateKeyPairResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SshPublicKeyResources operations. */
export interface SshPublicKeyResourcesOperations {
  /** Generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource. */
  generateKeyPair: (
    resourceGroupName: string,
    sshPublicKeyName: string,
    options?: SshPublicKeyResourcesGenerateKeyPairOptionalParams,
  ) => Promise<SshPublicKeyGenerateKeyPairResult>;
  /** Lists all of the SSH public keys in the subscription. Use the nextLink property in the response to get the next page of SSH public keys. */
  listBySubscription: (
    options?: SshPublicKeyResourcesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SshPublicKeyResource>;
  /** Lists all of the SSH public keys in the specified resource group. Use the nextLink property in the response to get the next page of SSH public keys. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SshPublicKeyResourcesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SshPublicKeyResource>;
  /** Delete an SSH public key. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    sshPublicKeyName: string,
    options?: SshPublicKeyResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a new SSH public key resource. */
  update: (
    resourceGroupName: string,
    sshPublicKeyName: string,
    parameters: SshPublicKeyUpdateResource,
    options?: SshPublicKeyResourcesUpdateOptionalParams,
  ) => Promise<SshPublicKeyResource>;
  /** Creates a new SSH public key resource. */
  create: (
    resourceGroupName: string,
    sshPublicKeyName: string,
    parameters: SshPublicKeyResource,
    options?: SshPublicKeyResourcesCreateOptionalParams,
  ) => Promise<SshPublicKeyResource>;
  /** Retrieves information about an SSH public key. */
  get: (
    resourceGroupName: string,
    sshPublicKeyName: string,
    options?: SshPublicKeyResourcesGetOptionalParams,
  ) => Promise<SshPublicKeyResource>;
}

function _getSshPublicKeyResources(context: ComputeManagementContext) {
  return {
    generateKeyPair: (
      resourceGroupName: string,
      sshPublicKeyName: string,
      options?: SshPublicKeyResourcesGenerateKeyPairOptionalParams,
    ) => generateKeyPair(context, resourceGroupName, sshPublicKeyName, options),
    listBySubscription: (options?: SshPublicKeyResourcesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SshPublicKeyResourcesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      sshPublicKeyName: string,
      options?: SshPublicKeyResourcesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sshPublicKeyName, options),
    update: (
      resourceGroupName: string,
      sshPublicKeyName: string,
      parameters: SshPublicKeyUpdateResource,
      options?: SshPublicKeyResourcesUpdateOptionalParams,
    ) => update(context, resourceGroupName, sshPublicKeyName, parameters, options),
    create: (
      resourceGroupName: string,
      sshPublicKeyName: string,
      parameters: SshPublicKeyResource,
      options?: SshPublicKeyResourcesCreateOptionalParams,
    ) => create(context, resourceGroupName, sshPublicKeyName, parameters, options),
    get: (
      resourceGroupName: string,
      sshPublicKeyName: string,
      options?: SshPublicKeyResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, sshPublicKeyName, options),
  };
}

export function _getSshPublicKeyResourcesOperations(
  context: ComputeManagementContext,
): SshPublicKeyResourcesOperations {
  return {
    ..._getSshPublicKeyResources(context),
  };
}
