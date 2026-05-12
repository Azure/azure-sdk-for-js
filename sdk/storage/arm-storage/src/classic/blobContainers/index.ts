// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext } from "../../api/storageManagementContext.js";
import {
  extendImmutabilityPolicy,
  lockImmutabilityPolicy,
  deleteImmutabilityPolicy,
  createOrUpdateImmutabilityPolicy,
  getImmutabilityPolicy,
  list,
  objectLevelWorm,
  lease,
  clearLegalHold,
  setLegalHold,
  $delete,
  update,
  create,
  get,
} from "../../api/blobContainers/operations.js";
import {
  BlobContainersExtendImmutabilityPolicyOptionalParams,
  BlobContainersLockImmutabilityPolicyOptionalParams,
  BlobContainersDeleteImmutabilityPolicyOptionalParams,
  BlobContainersCreateOrUpdateImmutabilityPolicyOptionalParams,
  BlobContainersGetImmutabilityPolicyOptionalParams,
  BlobContainersListOptionalParams,
  BlobContainersObjectLevelWormOptionalParams,
  BlobContainersLeaseOptionalParams,
  BlobContainersClearLegalHoldOptionalParams,
  BlobContainersSetLegalHoldOptionalParams,
  BlobContainersDeleteOptionalParams,
  BlobContainersUpdateOptionalParams,
  BlobContainersCreateOptionalParams,
  BlobContainersGetOptionalParams,
} from "../../api/blobContainers/options.js";
import {
  BlobContainer,
  LegalHold,
  LeaseContainerResponse,
  ListContainerItem,
  ImmutabilityPolicy,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BlobContainers operations. */
export interface BlobContainersOperations {
  /** Extends the immutabilityPeriodSinceCreationInDays of a locked immutabilityPolicy. The only action allowed on a Locked policy will be this action. ETag in If-Match is required for this operation. */
  extendImmutabilityPolicy: (
    resourceGroupName: string,
    accountName: string,
    containerName: string,
    ifMatch: string,
    options?: BlobContainersExtendImmutabilityPolicyOptionalParams,
  ) => Promise<ImmutabilityPolicy>;
  /** Sets the ImmutabilityPolicy to Locked state. The only action allowed on a Locked policy is ExtendImmutabilityPolicy action. ETag in If-Match is required for this operation. */
  lockImmutabilityPolicy: (
    resourceGroupName: string,
    accountName: string,
    containerName: string,
    ifMatch: string,
    options?: BlobContainersLockImmutabilityPolicyOptionalParams,
  ) => Promise<ImmutabilityPolicy>;
  /** Aborts an unlocked immutability policy. The response of delete has immutabilityPeriodSinceCreationInDays set to 0. ETag in If-Match is required for this operation. Deleting a locked immutability policy is not allowed, the only way is to delete the container after deleting all expired blobs inside the policy locked container. */
  deleteImmutabilityPolicy: (
    resourceGroupName: string,
    accountName: string,
    containerName: string,
    ifMatch: string,
    options?: BlobContainersDeleteImmutabilityPolicyOptionalParams,
  ) => Promise<ImmutabilityPolicy>;
  /** Creates or updates an unlocked immutability policy. ETag in If-Match is honored if given but not required for this operation. */
  createOrUpdateImmutabilityPolicy: (
    resourceGroupName: string,
    accountName: string,
    containerName: string,
    options?: BlobContainersCreateOrUpdateImmutabilityPolicyOptionalParams,
  ) => Promise<ImmutabilityPolicy>;
  /** Gets the existing immutability policy along with the corresponding ETag in response headers and body. */
  getImmutabilityPolicy: (
    resourceGroupName: string,
    accountName: string,
    containerName: string,
    options?: BlobContainersGetImmutabilityPolicyOptionalParams,
  ) => Promise<ImmutabilityPolicy>;
  /** Lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: BlobContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<ListContainerItem>;
  /** This operation migrates a blob container from container level WORM to object level immutability enabled container. Prerequisites require a container level immutability policy either in locked or unlocked state, Account level versioning must be enabled and there should be no Legal hold on the container. */
  objectLevelWorm: (
    resourceGroupName: string,
    accountName: string,
    containerName: string,
    options?: BlobContainersObjectLevelWormOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The Lease Container operation establishes and manages a lock on a container for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite. */
  lease: (
    resourceGroupName: string,
    accountName: string,
    containerName: string,
    options?: BlobContainersLeaseOptionalParams,
  ) => Promise<LeaseContainerResponse>;
  /** Clears legal hold tags. Clearing the same or non-existent tag results in an idempotent operation. ClearLegalHold clears out only the specified tags in the request. */
  clearLegalHold: (
    resourceGroupName: string,
    accountName: string,
    containerName: string,
    legalHold: LegalHold,
    options?: BlobContainersClearLegalHoldOptionalParams,
  ) => Promise<LegalHold>;
  /** Sets legal hold tags. Setting the same tag results in an idempotent operation. SetLegalHold follows an append pattern and does not clear out the existing tags that are not specified in the request. */
  setLegalHold: (
    resourceGroupName: string,
    accountName: string,
    containerName: string,
    legalHold: LegalHold,
    options?: BlobContainersSetLegalHoldOptionalParams,
  ) => Promise<LegalHold>;
  /** Deletes specified container under its account. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    containerName: string,
    options?: BlobContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates container properties as specified in request body. Properties not mentioned in the request will be unchanged. Update fails if the specified container doesn't already exist. */
  update: (
    resourceGroupName: string,
    accountName: string,
    containerName: string,
    blobContainer: BlobContainer,
    options?: BlobContainersUpdateOptionalParams,
  ) => Promise<BlobContainer>;
  /** Creates a new container under the specified account as described by request body. The container resource includes metadata and properties for that container. It does not include a list of the blobs contained by the container. */
  create: (
    resourceGroupName: string,
    accountName: string,
    containerName: string,
    blobContainer: BlobContainer,
    options?: BlobContainersCreateOptionalParams,
  ) => Promise<BlobContainer>;
  /** Gets properties of a specified container. */
  get: (
    resourceGroupName: string,
    accountName: string,
    containerName: string,
    options?: BlobContainersGetOptionalParams,
  ) => Promise<BlobContainer>;
}

function _getBlobContainers(context: StorageManagementContext) {
  return {
    extendImmutabilityPolicy: (
      resourceGroupName: string,
      accountName: string,
      containerName: string,
      ifMatch: string,
      options?: BlobContainersExtendImmutabilityPolicyOptionalParams,
    ) =>
      extendImmutabilityPolicy(
        context,
        resourceGroupName,
        accountName,
        containerName,
        ifMatch,
        options,
      ),
    lockImmutabilityPolicy: (
      resourceGroupName: string,
      accountName: string,
      containerName: string,
      ifMatch: string,
      options?: BlobContainersLockImmutabilityPolicyOptionalParams,
    ) =>
      lockImmutabilityPolicy(
        context,
        resourceGroupName,
        accountName,
        containerName,
        ifMatch,
        options,
      ),
    deleteImmutabilityPolicy: (
      resourceGroupName: string,
      accountName: string,
      containerName: string,
      ifMatch: string,
      options?: BlobContainersDeleteImmutabilityPolicyOptionalParams,
    ) =>
      deleteImmutabilityPolicy(
        context,
        resourceGroupName,
        accountName,
        containerName,
        ifMatch,
        options,
      ),
    createOrUpdateImmutabilityPolicy: (
      resourceGroupName: string,
      accountName: string,
      containerName: string,
      options?: BlobContainersCreateOrUpdateImmutabilityPolicyOptionalParams,
    ) =>
      createOrUpdateImmutabilityPolicy(
        context,
        resourceGroupName,
        accountName,
        containerName,
        options,
      ),
    getImmutabilityPolicy: (
      resourceGroupName: string,
      accountName: string,
      containerName: string,
      options?: BlobContainersGetImmutabilityPolicyOptionalParams,
    ) => getImmutabilityPolicy(context, resourceGroupName, accountName, containerName, options),
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: BlobContainersListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    objectLevelWorm: (
      resourceGroupName: string,
      accountName: string,
      containerName: string,
      options?: BlobContainersObjectLevelWormOptionalParams,
    ) => objectLevelWorm(context, resourceGroupName, accountName, containerName, options),
    lease: (
      resourceGroupName: string,
      accountName: string,
      containerName: string,
      options?: BlobContainersLeaseOptionalParams,
    ) => lease(context, resourceGroupName, accountName, containerName, options),
    clearLegalHold: (
      resourceGroupName: string,
      accountName: string,
      containerName: string,
      legalHold: LegalHold,
      options?: BlobContainersClearLegalHoldOptionalParams,
    ) => clearLegalHold(context, resourceGroupName, accountName, containerName, legalHold, options),
    setLegalHold: (
      resourceGroupName: string,
      accountName: string,
      containerName: string,
      legalHold: LegalHold,
      options?: BlobContainersSetLegalHoldOptionalParams,
    ) => setLegalHold(context, resourceGroupName, accountName, containerName, legalHold, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      containerName: string,
      options?: BlobContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, containerName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      containerName: string,
      blobContainer: BlobContainer,
      options?: BlobContainersUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, containerName, blobContainer, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      containerName: string,
      blobContainer: BlobContainer,
      options?: BlobContainersCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, containerName, blobContainer, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      containerName: string,
      options?: BlobContainersGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, containerName, options),
  };
}

export function _getBlobContainersOperations(
  context: StorageManagementContext,
): BlobContainersOperations {
  return {
    ..._getBlobContainers(context),
  };
}
