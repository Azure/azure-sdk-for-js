// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  BlobContainer,
  blobContainerSerializer,
  blobContainerDeserializer,
  LegalHold,
  legalHoldSerializer,
  legalHoldDeserializer,
  leaseContainerRequestSerializer,
  LeaseContainerResponse,
  leaseContainerResponseDeserializer,
  cloudErrorDeserializer,
  _ListContainerItems,
  _listContainerItemsDeserializer,
  ListContainerItem,
  ImmutabilityPolicy,
  immutabilityPolicySerializer,
  immutabilityPolicyDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _extendImmutabilityPolicySend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  ifMatch: string,
  options: BlobContainersExtendImmutabilityPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/immutabilityPolicies/default/extend{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        "if-match": ifMatch,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: !options?.parameters
        ? options?.parameters
        : immutabilityPolicySerializer(options?.parameters),
    });
}

export async function _extendImmutabilityPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<ImmutabilityPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return immutabilityPolicyDeserializer(result.body);
}

/** Extends the immutabilityPeriodSinceCreationInDays of a locked immutabilityPolicy. The only action allowed on a Locked policy will be this action. ETag in If-Match is required for this operation. */
export async function extendImmutabilityPolicy(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  ifMatch: string,
  options: BlobContainersExtendImmutabilityPolicyOptionalParams = { requestOptions: {} },
): Promise<ImmutabilityPolicy> {
  const result = await _extendImmutabilityPolicySend(
    context,
    resourceGroupName,
    accountName,
    containerName,
    ifMatch,
    options,
  );
  return _extendImmutabilityPolicyDeserialize(result);
}

export function _lockImmutabilityPolicySend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  ifMatch: string,
  options: BlobContainersLockImmutabilityPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/immutabilityPolicies/default/lock{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "if-match": ifMatch,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _lockImmutabilityPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<ImmutabilityPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return immutabilityPolicyDeserializer(result.body);
}

/** Sets the ImmutabilityPolicy to Locked state. The only action allowed on a Locked policy is ExtendImmutabilityPolicy action. ETag in If-Match is required for this operation. */
export async function lockImmutabilityPolicy(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  ifMatch: string,
  options: BlobContainersLockImmutabilityPolicyOptionalParams = { requestOptions: {} },
): Promise<ImmutabilityPolicy> {
  const result = await _lockImmutabilityPolicySend(
    context,
    resourceGroupName,
    accountName,
    containerName,
    ifMatch,
    options,
  );
  return _lockImmutabilityPolicyDeserialize(result);
}

export function _deleteImmutabilityPolicySend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  ifMatch: string,
  options: BlobContainersDeleteImmutabilityPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/immutabilityPolicies/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "if-match": ifMatch,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteImmutabilityPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<ImmutabilityPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return immutabilityPolicyDeserializer(result.body);
}

/** Aborts an unlocked immutability policy. The response of delete has immutabilityPeriodSinceCreationInDays set to 0. ETag in If-Match is required for this operation. Deleting a locked immutability policy is not allowed, the only way is to delete the container after deleting all expired blobs inside the policy locked container. */
export async function deleteImmutabilityPolicy(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  ifMatch: string,
  options: BlobContainersDeleteImmutabilityPolicyOptionalParams = { requestOptions: {} },
): Promise<ImmutabilityPolicy> {
  const result = await _deleteImmutabilityPolicySend(
    context,
    resourceGroupName,
    accountName,
    containerName,
    ifMatch,
    options,
  );
  return _deleteImmutabilityPolicyDeserialize(result);
}

export function _createOrUpdateImmutabilityPolicySend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  options: BlobContainersCreateOrUpdateImmutabilityPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/immutabilityPolicies/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: !options?.parameters
        ? options?.parameters
        : immutabilityPolicySerializer(options?.parameters),
    });
}

export async function _createOrUpdateImmutabilityPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<ImmutabilityPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return immutabilityPolicyDeserializer(result.body);
}

/** Creates or updates an unlocked immutability policy. ETag in If-Match is honored if given but not required for this operation. */
export async function createOrUpdateImmutabilityPolicy(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  options: BlobContainersCreateOrUpdateImmutabilityPolicyOptionalParams = { requestOptions: {} },
): Promise<ImmutabilityPolicy> {
  const result = await _createOrUpdateImmutabilityPolicySend(
    context,
    resourceGroupName,
    accountName,
    containerName,
    options,
  );
  return _createOrUpdateImmutabilityPolicyDeserialize(result);
}

export function _getImmutabilityPolicySend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  options: BlobContainersGetImmutabilityPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/immutabilityPolicies/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getImmutabilityPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<ImmutabilityPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return immutabilityPolicyDeserializer(result.body);
}

/** Gets the existing immutability policy along with the corresponding ETag in response headers and body. */
export async function getImmutabilityPolicy(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  options: BlobContainersGetImmutabilityPolicyOptionalParams = { requestOptions: {} },
): Promise<ImmutabilityPolicy> {
  const result = await _getImmutabilityPolicySend(
    context,
    resourceGroupName,
    accountName,
    containerName,
    options,
  );
  return _getImmutabilityPolicyDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: BlobContainersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers{?api%2Dversion,%24maxpagesize,%24filter,%24include}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
      "%24maxpagesize": options?.maxpagesize,
      "%24filter": options?.filter,
      "%24include": options?.include,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListContainerItems> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _listContainerItemsDeserializer(result.body);
}

/** Lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: BlobContainersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ListContainerItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _objectLevelWormSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  options: BlobContainersObjectLevelWormOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/migrate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _objectLevelWormDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** This operation migrates a blob container from container level WORM to object level immutability enabled container. Prerequisites require a container level immutability policy either in locked or unlocked state, Account level versioning must be enabled and there should be no Legal hold on the container. */
export function objectLevelWorm(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  options: BlobContainersObjectLevelWormOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _objectLevelWormDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _objectLevelWormSend(context, resourceGroupName, accountName, containerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _leaseSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  options: BlobContainersLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/lease{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: !options?.parameters
        ? options?.parameters
        : leaseContainerRequestSerializer(options?.parameters),
    });
}

export async function _leaseDeserialize(
  result: PathUncheckedResponse,
): Promise<LeaseContainerResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return leaseContainerResponseDeserializer(result.body);
}

/** The Lease Container operation establishes and manages a lock on a container for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite. */
export async function lease(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  options: BlobContainersLeaseOptionalParams = { requestOptions: {} },
): Promise<LeaseContainerResponse> {
  const result = await _leaseSend(context, resourceGroupName, accountName, containerName, options);
  return _leaseDeserialize(result);
}

export function _clearLegalHoldSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  legalHold: LegalHold,
  options: BlobContainersClearLegalHoldOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/clearLegalHold{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: legalHoldSerializer(legalHold),
    });
}

export async function _clearLegalHoldDeserialize(
  result: PathUncheckedResponse,
): Promise<LegalHold> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return legalHoldDeserializer(result.body);
}

/** Clears legal hold tags. Clearing the same or non-existent tag results in an idempotent operation. ClearLegalHold clears out only the specified tags in the request. */
export async function clearLegalHold(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  legalHold: LegalHold,
  options: BlobContainersClearLegalHoldOptionalParams = { requestOptions: {} },
): Promise<LegalHold> {
  const result = await _clearLegalHoldSend(
    context,
    resourceGroupName,
    accountName,
    containerName,
    legalHold,
    options,
  );
  return _clearLegalHoldDeserialize(result);
}

export function _setLegalHoldSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  legalHold: LegalHold,
  options: BlobContainersSetLegalHoldOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/setLegalHold{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: legalHoldSerializer(legalHold),
    });
}

export async function _setLegalHoldDeserialize(result: PathUncheckedResponse): Promise<LegalHold> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return legalHoldDeserializer(result.body);
}

/** Sets legal hold tags. Setting the same tag results in an idempotent operation. SetLegalHold follows an append pattern and does not clear out the existing tags that are not specified in the request. */
export async function setLegalHold(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  legalHold: LegalHold,
  options: BlobContainersSetLegalHoldOptionalParams = { requestOptions: {} },
): Promise<LegalHold> {
  const result = await _setLegalHoldSend(
    context,
    resourceGroupName,
    accountName,
    containerName,
    legalHold,
    options,
  );
  return _setLegalHoldDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  options: BlobContainersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes specified container under its account. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  options: BlobContainersDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    accountName,
    containerName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  blobContainer: BlobContainer,
  options: BlobContainersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: blobContainerSerializer(blobContainer),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<BlobContainer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return blobContainerDeserializer(result.body);
}

/** Updates container properties as specified in request body. Properties not mentioned in the request will be unchanged. Update fails if the specified container doesn't already exist. */
export async function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  blobContainer: BlobContainer,
  options: BlobContainersUpdateOptionalParams = { requestOptions: {} },
): Promise<BlobContainer> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    accountName,
    containerName,
    blobContainer,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  blobContainer: BlobContainer,
  options: BlobContainersCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: blobContainerSerializer(blobContainer),
    });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<BlobContainer> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return blobContainerDeserializer(result.body);
}

/** Creates a new container under the specified account as described by request body. The container resource includes metadata and properties for that container. It does not include a list of the blobs contained by the container. */
export async function create(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  blobContainer: BlobContainer,
  options: BlobContainersCreateOptionalParams = { requestOptions: {} },
): Promise<BlobContainer> {
  const result = await _createSend(
    context,
    resourceGroupName,
    accountName,
    containerName,
    blobContainer,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  options: BlobContainersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<BlobContainer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return blobContainerDeserializer(result.body);
}

/** Gets properties of a specified container. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  containerName: string,
  options: BlobContainersGetOptionalParams = { requestOptions: {} },
): Promise<BlobContainer> {
  const result = await _getSend(context, resourceGroupName, accountName, containerName, options);
  return _getDeserialize(result);
}
