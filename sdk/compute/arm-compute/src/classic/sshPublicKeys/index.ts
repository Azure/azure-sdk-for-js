// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  generateKeyPair,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/sshPublicKeys/operations.js";
import type {
  SshPublicKeysGenerateKeyPairOptionalParams,
  SshPublicKeysListBySubscriptionOptionalParams,
  SshPublicKeysListByResourceGroupOptionalParams,
  SshPublicKeysDeleteOptionalParams,
  SshPublicKeysUpdateOptionalParams,
  SshPublicKeysCreateOptionalParams,
  SshPublicKeysGetOptionalParams,
} from "../../api/sshPublicKeys/options.js";
import type {
  SshPublicKeyResource,
  SshPublicKeyUpdateResource,
  SshPublicKeyGenerateKeyPairResult,
} from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SshPublicKeys operations. */
export interface SshPublicKeysOperations {
  /** Generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource. */
  generateKeyPair: (
    resourceGroupName: string,
    sshPublicKeyName: string,
    options?: SshPublicKeysGenerateKeyPairOptionalParams,
  ) => Promise<SshPublicKeyGenerateKeyPairResult>;
  /** Lists all of the SSH public keys in the subscription. Use the nextLink property in the response to get the next page of SSH public keys. */
  listBySubscription: (
    options?: SshPublicKeysListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SshPublicKeyResource>;
  /** Lists all of the SSH public keys in the specified resource group. Use the nextLink property in the response to get the next page of SSH public keys. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SshPublicKeysListByResourceGroupOptionalParams,
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
    options?: SshPublicKeysDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a new SSH public key resource. */
  update: (
    resourceGroupName: string,
    sshPublicKeyName: string,
    parameters: SshPublicKeyUpdateResource,
    options?: SshPublicKeysUpdateOptionalParams,
  ) => Promise<SshPublicKeyResource>;
  /** Creates a new SSH public key resource. */
  create: (
    resourceGroupName: string,
    sshPublicKeyName: string,
    parameters: SshPublicKeyResource,
    options?: SshPublicKeysCreateOptionalParams,
  ) => Promise<SshPublicKeyResource>;
  /** Retrieves information about an SSH public key. */
  get: (
    resourceGroupName: string,
    sshPublicKeyName: string,
    options?: SshPublicKeysGetOptionalParams,
  ) => Promise<SshPublicKeyResource>;
}

function _getSshPublicKeys(context: ComputeContext) {
  return {
    generateKeyPair: (
      resourceGroupName: string,
      sshPublicKeyName: string,
      options?: SshPublicKeysGenerateKeyPairOptionalParams,
    ) => generateKeyPair(context, resourceGroupName, sshPublicKeyName, options),
    listBySubscription: (options?: SshPublicKeysListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SshPublicKeysListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      sshPublicKeyName: string,
      options?: SshPublicKeysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sshPublicKeyName, options),
    update: (
      resourceGroupName: string,
      sshPublicKeyName: string,
      parameters: SshPublicKeyUpdateResource,
      options?: SshPublicKeysUpdateOptionalParams,
    ) => update(context, resourceGroupName, sshPublicKeyName, parameters, options),
    create: (
      resourceGroupName: string,
      sshPublicKeyName: string,
      parameters: SshPublicKeyResource,
      options?: SshPublicKeysCreateOptionalParams,
    ) => create(context, resourceGroupName, sshPublicKeyName, parameters, options),
    get: (
      resourceGroupName: string,
      sshPublicKeyName: string,
      options?: SshPublicKeysGetOptionalParams,
    ) => get(context, resourceGroupName, sshPublicKeyName, options),
  };
}

export function _getSshPublicKeysOperations(context: ComputeContext): SshPublicKeysOperations {
  return {
    ..._getSshPublicKeys(context),
  };
}
