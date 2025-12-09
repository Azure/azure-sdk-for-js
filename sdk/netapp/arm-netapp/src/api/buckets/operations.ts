// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type {
  Bucket,
  BucketPatch,
  _BucketList,
  BucketCredentialsExpiry,
  BucketGenerateCredentials,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  bucketSerializer,
  bucketDeserializer,
  bucketPatchSerializer,
  _bucketListDeserializer,
  bucketCredentialsExpirySerializer,
  bucketGenerateCredentialsDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BucketsGenerateCredentialsOptionalParams,
  BucketsListOptionalParams,
  BucketsDeleteOptionalParams,
  BucketsUpdateOptionalParams,
  BucketsCreateOrUpdateOptionalParams,
  BucketsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _generateCredentialsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  bucketName: string,
  body: BucketCredentialsExpiry,
  options: BucketsGenerateCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/buckets/{bucketName}/generateCredentials{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      bucketName: bucketName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: bucketCredentialsExpirySerializer(body),
  });
}

export async function _generateCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<BucketGenerateCredentials> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return bucketGenerateCredentialsDeserializer(result.body);
}

/** Generate the access key and secret key used for accessing the specified volume bucket. Also return expiry date and time of key pair (in UTC). */
export async function generateCredentials(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  bucketName: string,
  body: BucketCredentialsExpiry,
  options: BucketsGenerateCredentialsOptionalParams = { requestOptions: {} },
): Promise<BucketGenerateCredentials> {
  const result = await _generateCredentialsSend(
    context,
    resourceGroupName,
    accountName,
    poolName,
    volumeName,
    bucketName,
    body,
    options,
  );
  return _generateCredentialsDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: BucketsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/buckets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_BucketList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _bucketListDeserializer(result.body);
}

/** Describes all buckets belonging to a volume. Buckets allow additional services, such as AI services, connect to the volume data contained in those buckets. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: BucketsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Bucket> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, poolName, volumeName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  bucketName: string,
  options: BucketsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/buckets/{bucketName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      bucketName: bucketName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a volume's bucket. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  bucketName: string,
  options: BucketsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        bucketName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  bucketName: string,
  body: BucketPatch,
  options: BucketsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/buckets/{bucketName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      bucketName: bucketName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: bucketPatchSerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Bucket> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return bucketDeserializer(result.body);
}

/** Updates the details of a volume bucket. */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  bucketName: string,
  body: BucketPatch,
  options: BucketsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Bucket>, Bucket> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        bucketName,
        body,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Bucket>, Bucket>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  bucketName: string,
  body: Bucket,
  options: BucketsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/buckets/{bucketName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      bucketName: bucketName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: bucketSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Bucket> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return bucketDeserializer(result.body);
}

/** Creates or updates a bucket for a volume. A bucket allows additional services, such as AI services, connect to the volume data contained in those buckets. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  bucketName: string,
  body: Bucket,
  options: BucketsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Bucket>, Bucket> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        bucketName,
        body,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Bucket>, Bucket>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  bucketName: string,
  options: BucketsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/buckets/{bucketName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      bucketName: bucketName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Bucket> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return bucketDeserializer(result.body);
}

/** Get the details of the specified volume's bucket. A bucket allows additional services, such as AI services, connect to the volume data contained in those buckets. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  bucketName: string,
  options: BucketsGetOptionalParams = { requestOptions: {} },
): Promise<Bucket> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    poolName,
    volumeName,
    bucketName,
    options,
  );
  return _getDeserialize(result);
}
