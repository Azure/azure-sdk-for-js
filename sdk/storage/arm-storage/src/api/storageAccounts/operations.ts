// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  StorageAccountCheckNameAvailabilityParameters,
  storageAccountCheckNameAvailabilityParametersSerializer,
  CheckNameAvailabilityResult,
  checkNameAvailabilityResultDeserializer,
  StorageAccount,
  storageAccountDeserializer,
  BlobRestoreStatus,
  blobRestoreStatusDeserializer,
  BlobRestoreParameters,
  blobRestoreParametersSerializer,
  StorageAccountCreateParameters,
  storageAccountCreateParametersSerializer,
  StorageAccountUpdateParameters,
  storageAccountUpdateParametersSerializer,
  _StorageAccountListResult,
  _storageAccountListResultDeserializer,
  StorageAccountListKeysResult,
  storageAccountListKeysResultDeserializer,
  StorageAccountRegenerateKeyParameters,
  storageAccountRegenerateKeyParametersSerializer,
  AccountSasParameters,
  accountSasParametersSerializer,
  ListAccountSasResponse,
  listAccountSasResponseDeserializer,
  ServiceSasParameters,
  serviceSasParametersSerializer,
  ListServiceSasResponse,
  listServiceSasResponseDeserializer,
  StorageAccountMigration,
  storageAccountMigrationSerializer,
  storageAccountMigrationDeserializer,
  MigrationName,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StorageAccountsGetCustomerInitiatedMigrationOptionalParams,
  StorageAccountsRevokeUserDelegationKeysOptionalParams,
  StorageAccountsRestoreBlobRangesOptionalParams,
  StorageAccountsCustomerInitiatedMigrationOptionalParams,
  StorageAccountsAbortHierarchicalNamespaceMigrationOptionalParams,
  StorageAccountsHierarchicalNamespaceMigrationOptionalParams,
  StorageAccountsFailoverOptionalParams,
  StorageAccountsListServiceSASOptionalParams,
  StorageAccountsListAccountSASOptionalParams,
  StorageAccountsRegenerateKeyOptionalParams,
  StorageAccountsListKeysOptionalParams,
  StorageAccountsListOptionalParams,
  StorageAccountsListByResourceGroupOptionalParams,
  StorageAccountsDeleteOptionalParams,
  StorageAccountsUpdateOptionalParams,
  StorageAccountsCreateOptionalParams,
  StorageAccountsGetPropertiesOptionalParams,
  StorageAccountsCheckNameAvailabilityOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _getCustomerInitiatedMigrationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  migrationName: MigrationName,
  options: StorageAccountsGetCustomerInitiatedMigrationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/accountMigrations/{migrationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      migrationName: migrationName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getCustomerInitiatedMigrationDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageAccountMigration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return storageAccountMigrationDeserializer(result.body);
}

/** Gets the status of the ongoing migration for the specified storage account. */
export async function getCustomerInitiatedMigration(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  migrationName: MigrationName,
  options: StorageAccountsGetCustomerInitiatedMigrationOptionalParams = { requestOptions: {} },
): Promise<StorageAccountMigration> {
  const result = await _getCustomerInitiatedMigrationSend(
    context,
    resourceGroupName,
    accountName,
    migrationName,
    options,
  );
  return _getCustomerInitiatedMigrationDeserialize(result);
}

export function _revokeUserDelegationKeysSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: StorageAccountsRevokeUserDelegationKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/revokeUserDelegationKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _revokeUserDelegationKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Revoke user delegation keys. */
export async function revokeUserDelegationKeys(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: StorageAccountsRevokeUserDelegationKeysOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _revokeUserDelegationKeysSend(
    context,
    resourceGroupName,
    accountName,
    options,
  );
  return _revokeUserDelegationKeysDeserialize(result);
}

export function _restoreBlobRangesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: BlobRestoreParameters,
  options: StorageAccountsRestoreBlobRangesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/restoreBlobRanges{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: blobRestoreParametersSerializer(parameters),
  });
}

export async function _restoreBlobRangesDeserialize(
  result: PathUncheckedResponse,
): Promise<BlobRestoreStatus> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return blobRestoreStatusDeserializer(result.body);
}

/** Restore blobs in the specified blob ranges */
export function restoreBlobRanges(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: BlobRestoreParameters,
  options: StorageAccountsRestoreBlobRangesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BlobRestoreStatus>, BlobRestoreStatus> {
  return getLongRunningPoller(context, _restoreBlobRangesDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restoreBlobRangesSend(context, resourceGroupName, accountName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01",
  }) as PollerLike<OperationState<BlobRestoreStatus>, BlobRestoreStatus>;
}

export function _customerInitiatedMigrationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: StorageAccountMigration,
  options: StorageAccountsCustomerInitiatedMigrationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/startAccountMigration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: storageAccountMigrationSerializer(parameters),
  });
}

export async function _customerInitiatedMigrationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Account Migration request can be triggered for a storage account to change its redundancy level. The migration updates the non-zonal redundant storage account to a zonal redundant account or vice-versa in order to have better reliability and availability. Zone-redundant storage (ZRS) replicates your storage account synchronously across three Azure availability zones in the primary region. */
export function customerInitiatedMigration(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: StorageAccountMigration,
  options: StorageAccountsCustomerInitiatedMigrationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _customerInitiatedMigrationDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _customerInitiatedMigrationSend(
          context,
          resourceGroupName,
          accountName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-04-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _abortHierarchicalNamespaceMigrationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: StorageAccountsAbortHierarchicalNamespaceMigrationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/aborthnsonmigration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _abortHierarchicalNamespaceMigrationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Abort live Migration of storage account to enable Hns */
export function abortHierarchicalNamespaceMigration(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: StorageAccountsAbortHierarchicalNamespaceMigrationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _abortHierarchicalNamespaceMigrationDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _abortHierarchicalNamespaceMigrationSend(context, resourceGroupName, accountName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-04-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _hierarchicalNamespaceMigrationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  requestType: string,
  options: StorageAccountsHierarchicalNamespaceMigrationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/hnsonmigration{?api%2Dversion,requestType}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
      requestType: requestType,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _hierarchicalNamespaceMigrationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Live Migration of storage account to enable Hns */
export function hierarchicalNamespaceMigration(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  requestType: string,
  options: StorageAccountsHierarchicalNamespaceMigrationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _hierarchicalNamespaceMigrationDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _hierarchicalNamespaceMigrationSend(
          context,
          resourceGroupName,
          accountName,
          requestType,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-04-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _failoverSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: StorageAccountsFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/failover{?api%2Dversion,failoverType}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
      failoverType: !options?.failoverType ? options?.failoverType : "Planned",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _failoverDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** A failover request can be triggered for a storage account in the event a primary endpoint becomes unavailable for any reason. The failover occurs from the storage account's primary cluster to the secondary cluster for RA-GRS accounts. The secondary cluster will become primary after failover and the account is converted to LRS. In the case of a Planned Failover, the primary and secondary clusters are swapped after failover and the account remains geo-replicated. Failover should continue to be used in the event of availability issues as Planned failover is only available while the primary and secondary endpoints are available. The primary use case of a Planned Failover is disaster recovery testing drills. This type of failover is invoked by setting FailoverType parameter to 'Planned'. Learn more about the failover options here- https://learn.microsoft.com/azure/storage/common/storage-disaster-recovery-guidance */
export function failover(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: StorageAccountsFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _failoverDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _failoverSend(context, resourceGroupName, accountName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listServiceSASSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: ServiceSasParameters,
  options: StorageAccountsListServiceSASOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/listServiceSas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serviceSasParametersSerializer(parameters),
  });
}

export async function _listServiceSASDeserialize(
  result: PathUncheckedResponse,
): Promise<ListServiceSasResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return listServiceSasResponseDeserializer(result.body);
}

/** List service SAS credentials of a specific resource. */
export async function listServiceSAS(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: ServiceSasParameters,
  options: StorageAccountsListServiceSASOptionalParams = { requestOptions: {} },
): Promise<ListServiceSasResponse> {
  const result = await _listServiceSASSend(
    context,
    resourceGroupName,
    accountName,
    parameters,
    options,
  );
  return _listServiceSASDeserialize(result);
}

export function _listAccountSASSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: AccountSasParameters,
  options: StorageAccountsListAccountSASOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/listAccountSas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: accountSasParametersSerializer(parameters),
  });
}

export async function _listAccountSASDeserialize(
  result: PathUncheckedResponse,
): Promise<ListAccountSasResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return listAccountSasResponseDeserializer(result.body);
}

/** List SAS credentials of a storage account. */
export async function listAccountSAS(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: AccountSasParameters,
  options: StorageAccountsListAccountSASOptionalParams = { requestOptions: {} },
): Promise<ListAccountSasResponse> {
  const result = await _listAccountSASSend(
    context,
    resourceGroupName,
    accountName,
    parameters,
    options,
  );
  return _listAccountSASDeserialize(result);
}

export function _regenerateKeySend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  regenerateKeyParameter: StorageAccountRegenerateKeyParameters,
  options: StorageAccountsRegenerateKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/regenerateKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: storageAccountRegenerateKeyParametersSerializer(regenerateKeyParameter),
  });
}

export async function _regenerateKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageAccountListKeysResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return storageAccountListKeysResultDeserializer(result.body);
}

/** Regenerates one of the access keys or Kerberos keys for the specified storage account. */
export async function regenerateKey(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  regenerateKeyParameter: StorageAccountRegenerateKeyParameters,
  options: StorageAccountsRegenerateKeyOptionalParams = { requestOptions: {} },
): Promise<StorageAccountListKeysResult> {
  const result = await _regenerateKeySend(
    context,
    resourceGroupName,
    accountName,
    regenerateKeyParameter,
    options,
  );
  return _regenerateKeyDeserialize(result);
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: StorageAccountsListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/listKeys{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
      "%24expand": !options?.expand ? options?.expand : "kerb",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageAccountListKeysResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return storageAccountListKeysResultDeserializer(result.body);
}

/** Lists the access keys or Kerberos keys (if active directory enabled) for the specified storage account. */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: StorageAccountsListKeysOptionalParams = { requestOptions: {} },
): Promise<StorageAccountListKeysResult> {
  const result = await _listKeysSend(context, resourceGroupName, accountName, options);
  return _listKeysDeserialize(result);
}

export function _listSend(
  context: Client,
  options: StorageAccountsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Storage/storageAccounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_StorageAccountListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _storageAccountListResultDeserializer(result.body);
}

/** Lists all the storage accounts available under the subscription. Note that storage keys are not returned; use the ListKeys operation for this. */
export function list(
  context: Client,
  options: StorageAccountsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageAccount> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-04-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: StorageAccountsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_StorageAccountListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _storageAccountListResultDeserializer(result.body);
}

/** Lists all the storage accounts available under the given resource group. Note that storage keys are not returned; use the ListKeys operation for this. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: StorageAccountsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageAccount> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: StorageAccountsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a storage account in Microsoft Azure. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: StorageAccountsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, accountName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: StorageAccountUpdateParameters,
  options: StorageAccountsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: storageAccountUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<StorageAccount> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return storageAccountDeserializer(result.body);
}

/** The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation. */
export async function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: StorageAccountUpdateParameters,
  options: StorageAccountsUpdateOptionalParams = { requestOptions: {} },
): Promise<StorageAccount> {
  const result = await _updateSend(context, resourceGroupName, accountName, parameters, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: StorageAccountCreateParameters,
  options: StorageAccountsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: storageAccountCreateParametersSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<StorageAccount> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return storageAccountDeserializer(result.body);
}

/** Asynchronously creates a new storage account with the specified parameters. If an account is already created and a subsequent create request is issued with different properties, the account properties will be updated. If an account is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed. */
export function create(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: StorageAccountCreateParameters,
  options: StorageAccountsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageAccount>, StorageAccount> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, accountName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01",
  }) as PollerLike<OperationState<StorageAccount>, StorageAccount>;
}

export function _getPropertiesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: StorageAccountsGetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getPropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageAccount> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return storageAccountDeserializer(result.body);
}

/** Returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys. */
export async function getProperties(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: StorageAccountsGetPropertiesOptionalParams = { requestOptions: {} },
): Promise<StorageAccount> {
  const result = await _getPropertiesSend(context, resourceGroupName, accountName, options);
  return _getPropertiesDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  accountName: StorageAccountCheckNameAvailabilityParameters,
  options: StorageAccountsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Storage/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: storageAccountCheckNameAvailabilityParametersSerializer(accountName),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return checkNameAvailabilityResultDeserializer(result.body);
}

/** Checks that the storage account name is valid and is not already in use. */
export async function checkNameAvailability(
  context: Client,
  accountName: StorageAccountCheckNameAvailabilityParameters,
  options: StorageAccountsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResult> {
  const result = await _checkNameAvailabilitySend(context, accountName, options);
  return _checkNameAvailabilityDeserialize(result);
}
