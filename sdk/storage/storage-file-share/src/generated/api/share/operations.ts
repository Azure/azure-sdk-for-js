// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileContext as Client } from "../index.js";
import {
  errorXmlDeserializer,
  SharePermission,
  sharePermissionSerializer,
  sharePermissionDeserializer,
  SignedIdentifier,
  ShareStats,
  shareStatsXmlDeserializer,
  signedIdentifierArraySerializer,
  signedIdentifierArrayDeserializer,
} from "../../models/azure/storage/files/shares/models.js";
import {
  StorageCompatResponseInfo,
  createStorageCompatOnResponse,
  addStorageCompatResponse,
} from "../../static-helpers/storageCompatResponse.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ShareRestoreOptionalParams,
  ShareGetStatisticsOptionalParams,
  ShareSetAccessPolicyOptionalParams,
  ShareGetAccessPolicyOptionalParams,
  ShareSetMetadataOptionalParams,
  ShareSetPropertiesOptionalParams,
  ShareGetPermissionOptionalParams,
  ShareCreatePermissionOptionalParams,
  ShareCreateSnapshotOptionalParams,
  ShareBreakLeaseOptionalParams,
  ShareRenewLeaseOptionalParams,
  ShareChangeLeaseOptionalParams,
  ShareReleaseLeaseOptionalParams,
  ShareAcquireLeaseOptionalParams,
  ShareDeleteOptionalParams,
  ShareGetPropertiesOptionalParams,
  ShareCreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _restoreSend(
  context: Client,
  options: ShareRestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share&comp=undelete{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.deletedShareName !== undefined
          ? { "x-ms-deleted-share-name": options?.deletedShareName }
          : {}),
        ...(options?.deletedShareVersion !== undefined
          ? { "x-ms-deleted-share-version": options?.deletedShareVersion }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _restoreDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), ..._restoreDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _restoreDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  quota?: number;
  shareProvisionedIops?: number;
  shareProvisionedBandwidthMibps?: number;
  shareIncludedBurstIops?: number;
  shareMaxBurstCreditsForIops?: number;
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    quota:
      result.headers["x-ms-share-quota"] === undefined ||
      result.headers["x-ms-share-quota"] === null
        ? result.headers["x-ms-share-quota"]
        : Number(result.headers["x-ms-share-quota"]),
    shareProvisionedIops:
      result.headers["x-ms-share-provisioned-iops"] === undefined ||
      result.headers["x-ms-share-provisioned-iops"] === null
        ? result.headers["x-ms-share-provisioned-iops"]
        : Number(result.headers["x-ms-share-provisioned-iops"]),
    shareProvisionedBandwidthMibps:
      result.headers["x-ms-share-provisioned-bandwidth-mibps"] === undefined ||
      result.headers["x-ms-share-provisioned-bandwidth-mibps"] === null
        ? result.headers["x-ms-share-provisioned-bandwidth-mibps"]
        : Number(result.headers["x-ms-share-provisioned-bandwidth-mibps"]),
    shareIncludedBurstIops:
      result.headers["x-ms-share-included-burst-iops"] === undefined ||
      result.headers["x-ms-share-included-burst-iops"] === null
        ? result.headers["x-ms-share-included-burst-iops"]
        : Number(result.headers["x-ms-share-included-burst-iops"]),
    shareMaxBurstCreditsForIops:
      result.headers["x-ms-share-max-burst-credits-for-iops"] === undefined ||
      result.headers["x-ms-share-max-burst-credits-for-iops"] === null
        ? result.headers["x-ms-share-max-burst-credits-for-iops"]
        : Number(result.headers["x-ms-share-max-burst-credits-for-iops"]),
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _restoreDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** Restores a previously deleted share. */
export async function restore(
  context: Client,
  options: ShareRestoreOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    quota?: number;
    shareProvisionedIops?: number;
    shareProvisionedBandwidthMibps?: number;
    shareIncludedBurstIops?: number;
    shareMaxBurstCreditsForIops?: number;
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      quota?: number;
      shareProvisionedIops?: number;
      shareProvisionedBandwidthMibps?: number;
      shareIncludedBurstIops?: number;
      shareMaxBurstCreditsForIops?: number;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _restoreSend(context, { ...options, onResponse: _storageCompat.onResponse });
  await _restoreDeserialize(result);
  const parsedHeaders = _restoreDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _getStatisticsSend(
  context: Client,
  options: ShareGetStatisticsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share&comp=stats{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
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
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getStatisticsDeserialize(
  result: PathUncheckedResponse,
): Promise<ShareStats> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._getStatisticsDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return shareStatsXmlDeserializer(result.body);
}

export function _getStatisticsDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
  };
}

export function _getStatisticsDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** Retrieves statistics related to the share. */
export async function getStatistics(
  context: Client,
  options: ShareGetStatisticsOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & ShareStats &
    StorageCompatResponseInfo<
      ShareStats,
      {
        etag: string;
        lastModified: Date;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getStatisticsSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _getStatisticsDeserialize(result);
  const parsedHeaders = _getStatisticsDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _setAccessPolicySend(
  context: Client,
  options: ShareSetAccessPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share&comp=acl{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: !options["shareAcl"]
        ? options["shareAcl"]
        : signedIdentifierArraySerializer(options["shareAcl"]),
    });
}

export async function _setAccessPolicyDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._setAccessPolicyDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _setAccessPolicyDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _setAccessPolicyDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** Sets stored access policies for the share that may be used with Shared Access Signatures. */
export async function setAccessPolicy(
  context: Client,
  options: ShareSetAccessPolicyOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _setAccessPolicySend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _setAccessPolicyDeserialize(result);
  const parsedHeaders = _setAccessPolicyDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _getAccessPolicySend(
  context: Client,
  options: ShareGetAccessPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share&comp=acl{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
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
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getAccessPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<SignedIdentifier[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._getAccessPolicyDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return signedIdentifierArrayDeserializer(result.body);
}

export function _getAccessPolicyDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
  };
}

export function _getAccessPolicyDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** Returns information about stored access policies specified on the share that may be used with Shared Access Signatures. */
export async function getAccessPolicy(
  context: Client,
  options: ShareGetAccessPolicyOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & SignedIdentifier[] &
    StorageCompatResponseInfo<
      SignedIdentifier[],
      {
        etag: string;
        lastModified: Date;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getAccessPolicySend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _getAccessPolicyDeserialize(result);
  const parsedHeaders = _getAccessPolicyDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _setMetadataSend(
  context: Client,
  options: ShareSetMetadataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share&comp=metadata{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setMetadataDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._setMetadataDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _setMetadataDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _setMetadataDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** Sets one or more user-defined name-value pairs for the specified share. */
export async function setMetadata(
  context: Client,
  options: ShareSetMetadataOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _setMetadataSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _setMetadataDeserialize(result);
  const parsedHeaders = _setMetadataDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _setPropertiesSend(
  context: Client,
  options: ShareSetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share&comp=properties{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.quota !== undefined ? { "x-ms-share-quota": options?.quota } : {}),
        ...(options?.accessTier !== undefined ? { "x-ms-access-tier": options?.accessTier } : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.rootSquash !== undefined ? { "x-ms-root-squash": options?.rootSquash } : {}),
        ...(options?.enableSnapshotVirtualDirectoryAccess !== undefined
          ? {
              "x-ms-enable-snapshot-virtual-directory-access":
                options?.enableSnapshotVirtualDirectoryAccess,
            }
          : {}),
        ...(options?.paidBurstingEnabled !== undefined
          ? { "x-ms-share-paid-bursting-enabled": options?.paidBurstingEnabled }
          : {}),
        ...(options?.paidBurstingMaxIops !== undefined
          ? { "x-ms-share-paid-bursting-max-iops": options?.paidBurstingMaxIops }
          : {}),
        ...(options?.paidBurstingMaxBandwidthMibps !== undefined
          ? {
              "x-ms-share-paid-bursting-max-bandwidth-mibps":
                options?.paidBurstingMaxBandwidthMibps,
            }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...(options?.shareProvisionedIops !== undefined
          ? { "x-ms-share-provisioned-iops": options?.shareProvisionedIops }
          : {}),
        ...(options?.shareProvisionedBandwidthMibps !== undefined
          ? { "x-ms-share-provisioned-bandwidth-mibps": options?.shareProvisionedBandwidthMibps }
          : {}),
        ...(options?.enableSmbDirectoryLease !== undefined
          ? { "x-ms-enable-smb-directory-lease": options?.enableSmbDirectoryLease }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setPropertiesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._setPropertiesDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _setPropertiesDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  quota?: number;
  shareProvisionedIops?: number;
  shareProvisionedBandwidthMibps?: number;
  shareIncludedBurstIops?: number;
  shareMaxBurstCreditsForIops?: number;
  shareNextAllowedQuotaDowngradeTime?: string;
  shareNextAllowedProvisionedIopsDowngradeTime?: string;
  shareNextAllowedProvisionedBandwidthDowngradeTime?: string;
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    quota:
      result.headers["x-ms-share-quota"] === undefined ||
      result.headers["x-ms-share-quota"] === null
        ? result.headers["x-ms-share-quota"]
        : Number(result.headers["x-ms-share-quota"]),
    shareProvisionedIops:
      result.headers["x-ms-share-provisioned-iops"] === undefined ||
      result.headers["x-ms-share-provisioned-iops"] === null
        ? result.headers["x-ms-share-provisioned-iops"]
        : Number(result.headers["x-ms-share-provisioned-iops"]),
    shareProvisionedBandwidthMibps:
      result.headers["x-ms-share-provisioned-bandwidth-mibps"] === undefined ||
      result.headers["x-ms-share-provisioned-bandwidth-mibps"] === null
        ? result.headers["x-ms-share-provisioned-bandwidth-mibps"]
        : Number(result.headers["x-ms-share-provisioned-bandwidth-mibps"]),
    shareIncludedBurstIops:
      result.headers["x-ms-share-included-burst-iops"] === undefined ||
      result.headers["x-ms-share-included-burst-iops"] === null
        ? result.headers["x-ms-share-included-burst-iops"]
        : Number(result.headers["x-ms-share-included-burst-iops"]),
    shareMaxBurstCreditsForIops:
      result.headers["x-ms-share-max-burst-credits-for-iops"] === undefined ||
      result.headers["x-ms-share-max-burst-credits-for-iops"] === null
        ? result.headers["x-ms-share-max-burst-credits-for-iops"]
        : Number(result.headers["x-ms-share-max-burst-credits-for-iops"]),
    shareNextAllowedQuotaDowngradeTime:
      result.headers["x-ms-share-next-allowed-quota-downgrade-time"] === undefined ||
      result.headers["x-ms-share-next-allowed-quota-downgrade-time"] === null
        ? result.headers["x-ms-share-next-allowed-quota-downgrade-time"]
        : result.headers["x-ms-share-next-allowed-quota-downgrade-time"],
    shareNextAllowedProvisionedIopsDowngradeTime:
      result.headers["x-ms-share-next-allowed-provisioned-iops-downgrade-time"] === undefined ||
      result.headers["x-ms-share-next-allowed-provisioned-iops-downgrade-time"] === null
        ? result.headers["x-ms-share-next-allowed-provisioned-iops-downgrade-time"]
        : result.headers["x-ms-share-next-allowed-provisioned-iops-downgrade-time"],
    shareNextAllowedProvisionedBandwidthDowngradeTime:
      result.headers["x-ms-share-next-allowed-provisioned-bandwidth-downgrade-time"] ===
        undefined ||
      result.headers["x-ms-share-next-allowed-provisioned-bandwidth-downgrade-time"] === null
        ? result.headers["x-ms-share-next-allowed-provisioned-bandwidth-downgrade-time"]
        : result.headers["x-ms-share-next-allowed-provisioned-bandwidth-downgrade-time"],
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _setPropertiesDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** Sets properties for the specified share. */
export async function setProperties(
  context: Client,
  options: ShareSetPropertiesOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    quota?: number;
    shareProvisionedIops?: number;
    shareProvisionedBandwidthMibps?: number;
    shareIncludedBurstIops?: number;
    shareMaxBurstCreditsForIops?: number;
    shareNextAllowedQuotaDowngradeTime?: string;
    shareNextAllowedProvisionedIopsDowngradeTime?: string;
    shareNextAllowedProvisionedBandwidthDowngradeTime?: string;
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      quota?: number;
      shareProvisionedIops?: number;
      shareProvisionedBandwidthMibps?: number;
      shareIncludedBurstIops?: number;
      shareMaxBurstCreditsForIops?: number;
      shareNextAllowedQuotaDowngradeTime?: string;
      shareNextAllowedProvisionedIopsDowngradeTime?: string;
      shareNextAllowedProvisionedBandwidthDowngradeTime?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _setPropertiesSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _setPropertiesDeserialize(result);
  const parsedHeaders = _setPropertiesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _getPermissionSend(
  context: Client,
  filePermissionKey: string,
  options: ShareGetPermissionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share&comp=filepermission{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
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
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "x-ms-file-permission-key": filePermissionKey,
        ...(options?.filePermissionFormat !== undefined
          ? { "x-ms-file-permission-format": options?.filePermissionFormat }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPermissionDeserialize(
  result: PathUncheckedResponse,
): Promise<SharePermission> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._getPermissionDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return sharePermissionDeserializer(result.body);
}

export function _getPermissionDeserializeHeaders(result: PathUncheckedResponse): {
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/json";
} {
  return {
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
  };
}

export function _getPermissionDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** Returns the permission (security descriptor) for a given permission key. This is used to support file level ACLs for SMB shares. */
export async function getPermission(
  context: Client,
  filePermissionKey: string,
  options: ShareGetPermissionOptionalParams = { requestOptions: {} },
): Promise<
  {
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/json";
  } & SharePermission &
    StorageCompatResponseInfo<
      SharePermission,
      {
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
        contentType: "application/json";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getPermissionSend(context, filePermissionKey, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _getPermissionDeserialize(result);
  const parsedHeaders = _getPermissionDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _createPermissionSend(
  context: Client,
  permission: SharePermission,
  options: ShareCreatePermissionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share&comp=filepermission{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
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
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: sharePermissionSerializer(permission),
    });
}

export async function _createPermissionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._createPermissionDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _createPermissionDeserializeHeaders(result: PathUncheckedResponse): {
  filePermissionKey: string;
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    filePermissionKey: result.headers["x-ms-file-permission-key"],
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _createPermissionDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** Create a permission (a security descriptor). This is used to support file level ACLs for SMB shares. */
export async function createPermission(
  context: Client,
  permission: SharePermission,
  options: ShareCreatePermissionOptionalParams = { requestOptions: {} },
): Promise<
  {
    filePermissionKey: string;
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      filePermissionKey: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _createPermissionSend(context, permission, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _createPermissionDeserialize(result);
  const parsedHeaders = _createPermissionDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _createSnapshotSend(
  context: Client,
  options: ShareCreateSnapshotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share&comp=snapshot{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _createSnapshotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._createSnapshotDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _createSnapshotDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  snapshot: string;
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    snapshot: result.headers["x-ms-snapshot"],
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _createSnapshotDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** Creates a read-only snapshot of a share. */
export async function createSnapshot(
  context: Client,
  options: ShareCreateSnapshotOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    snapshot: string;
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      snapshot: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _createSnapshotSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _createSnapshotDeserialize(result);
  const parsedHeaders = _createSnapshotDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _breakLeaseSend(
  context: Client,
  options: ShareBreakLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share&comp=lease&break{?timeout,sharesnapshot}",
    {
      timeout: options?.timeoutInSeconds,
      sharesnapshot: options?.shareSnapshot,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.breakPeriod !== undefined
          ? { "x-ms-lease-break-period": options?.breakPeriod }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        "x-ms-lease-action": "break",
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _breakLeaseDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._breakLeaseDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _breakLeaseDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  leaseTimeInSeconds?: number;
  leaseId?: string;
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    leaseTimeInSeconds:
      result.headers["x-ms-lease-time"] === undefined || result.headers["x-ms-lease-time"] === null
        ? result.headers["x-ms-lease-time"]
        : Number(result.headers["x-ms-lease-time"]),
    leaseId:
      result.headers["x-ms-lease-id"] === undefined || result.headers["x-ms-lease-id"] === null
        ? result.headers["x-ms-lease-id"]
        : result.headers["x-ms-lease-id"],
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _breakLeaseDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** The Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite. */
export async function breakLease(
  context: Client,
  options: ShareBreakLeaseOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    leaseTimeInSeconds?: number;
    leaseId?: string;
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      leaseTimeInSeconds?: number;
      leaseId?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _breakLeaseSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _breakLeaseDeserialize(result);
  const parsedHeaders = _breakLeaseDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _renewLeaseSend(
  context: Client,
  leaseId: string,
  options: ShareRenewLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share&comp=lease&renew{?timeout,sharesnapshot}",
    {
      timeout: options?.timeoutInSeconds,
      sharesnapshot: options?.shareSnapshot,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "x-ms-lease-id": leaseId,
        "x-ms-lease-action": "renew",
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _renewLeaseDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._renewLeaseDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _renewLeaseDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  leaseId?: string;
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    leaseId:
      result.headers["x-ms-lease-id"] === undefined || result.headers["x-ms-lease-id"] === null
        ? result.headers["x-ms-lease-id"]
        : result.headers["x-ms-lease-id"],
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _renewLeaseDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** The Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite. */
export async function renewLease(
  context: Client,
  leaseId: string,
  options: ShareRenewLeaseOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    leaseId?: string;
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      leaseId?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _renewLeaseSend(context, leaseId, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _renewLeaseDeserialize(result);
  const parsedHeaders = _renewLeaseDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _changeLeaseSend(
  context: Client,
  leaseId: string,
  options: ShareChangeLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share&comp=lease&change{?timeout,sharesnapshot}",
    {
      timeout: options?.timeoutInSeconds,
      sharesnapshot: options?.shareSnapshot,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "x-ms-lease-id": leaseId,
        ...(options?.proposedLeaseId !== undefined
          ? { "x-ms-proposed-lease-id": options?.proposedLeaseId }
          : {}),
        "x-ms-lease-action": "change",
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _changeLeaseDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._changeLeaseDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _changeLeaseDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  leaseId?: string;
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    leaseId:
      result.headers["x-ms-lease-id"] === undefined || result.headers["x-ms-lease-id"] === null
        ? result.headers["x-ms-lease-id"]
        : result.headers["x-ms-lease-id"],
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _changeLeaseDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** The Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite. */
export async function changeLease(
  context: Client,
  leaseId: string,
  options: ShareChangeLeaseOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    leaseId?: string;
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      leaseId?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _changeLeaseSend(context, leaseId, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _changeLeaseDeserialize(result);
  const parsedHeaders = _changeLeaseDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _releaseLeaseSend(
  context: Client,
  leaseId: string,
  options: ShareReleaseLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share&comp=lease&release{?timeout,sharesnapshot}",
    {
      timeout: options?.timeoutInSeconds,
      sharesnapshot: options?.shareSnapshot,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "x-ms-lease-id": leaseId,
        "x-ms-lease-action": "release",
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _releaseLeaseDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._releaseLeaseDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _releaseLeaseDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _releaseLeaseDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** The Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite. */
export async function releaseLease(
  context: Client,
  leaseId: string,
  options: ShareReleaseLeaseOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _releaseLeaseSend(context, leaseId, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _releaseLeaseDeserialize(result);
  const parsedHeaders = _releaseLeaseDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _acquireLeaseSend(
  context: Client,
  options: ShareAcquireLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share&comp=lease&acquire{?timeout,sharesnapshot}",
    {
      timeout: options?.timeoutInSeconds,
      sharesnapshot: options?.shareSnapshot,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.leaseDuration !== undefined
          ? { "x-ms-lease-duration": options?.leaseDuration }
          : {}),
        ...(options?.proposedLeaseId !== undefined
          ? { "x-ms-proposed-lease-id": options?.proposedLeaseId }
          : {}),
        "x-ms-lease-action": "acquire",
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _acquireLeaseDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._acquireLeaseDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _acquireLeaseDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  leaseId?: string;
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    leaseId:
      result.headers["x-ms-lease-id"] === undefined || result.headers["x-ms-lease-id"] === null
        ? result.headers["x-ms-lease-id"]
        : result.headers["x-ms-lease-id"],
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _acquireLeaseDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** The Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite. */
export async function acquireLease(
  context: Client,
  options: ShareAcquireLeaseOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    leaseId?: string;
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      leaseId?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _acquireLeaseSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _acquireLeaseDeserialize(result);
  const parsedHeaders = _acquireLeaseDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _$deleteSend(
  context: Client,
  options: ShareDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share{?sharesnapshot,timeout}",
    {
      sharesnapshot: options?.shareSnapshot,
      timeout: options?.timeoutInSeconds,
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
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.deleteSnapshots !== undefined
          ? { "x-ms-delete-snapshots": options?.deleteSnapshots }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), ..._$deleteDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _$deleteDeserializeHeaders(result: PathUncheckedResponse): {
  usageBytes?: number;
  snapshotUsageBytes?: number;
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    usageBytes:
      result.headers["x-ms-file-share-usage-bytes"] === undefined ||
      result.headers["x-ms-file-share-usage-bytes"] === null
        ? result.headers["x-ms-file-share-usage-bytes"]
        : Number(result.headers["x-ms-file-share-usage-bytes"]),
    snapshotUsageBytes:
      result.headers["x-ms-file-share-snapshot-usage-bytes"] === undefined ||
      result.headers["x-ms-file-share-snapshot-usage-bytes"] === null
        ? result.headers["x-ms-file-share-snapshot-usage-bytes"]
        : Number(result.headers["x-ms-file-share-snapshot-usage-bytes"]),
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _$deleteDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** Operation marks the specified share or share snapshot for deletion. The share or share snapshot and any files contained within it are later deleted during garbage collection. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  options: ShareDeleteOptionalParams = { requestOptions: {} },
): Promise<
  {
    usageBytes?: number;
    snapshotUsageBytes?: number;
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      usageBytes?: number;
      snapshotUsageBytes?: number;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _$deleteSend(context, { ...options, onResponse: _storageCompat.onResponse });
  await _$deleteDeserialize(result);
  const parsedHeaders = _$deleteDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _getPropertiesSend(
  context: Client,
  options: ShareGetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share{?sharesnapshot,timeout}",
    {
      sharesnapshot: options?.shareSnapshot,
      timeout: options?.timeoutInSeconds,
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
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPropertiesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._getPropertiesDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _getPropertiesDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  quota: number;
  shareProvisionedIops?: number;
  shareProvisionedIngressMbps?: number;
  shareProvisionedEgressMbps?: number;
  shareNextAllowedQuotaDowngradeTime?: string;
  shareProvisionedBandwidthMibps?: number;
  leaseDuration?: string;
  leaseState?: string;
  leaseStatus?: string;
  accessTier?: string;
  accessTierChangeTime?: string;
  accessTierTransitionState?: string;
  enabledProtocols?: string;
  rootSquash?: string;
  enableSnapshotVirtualDirectoryAccess?: boolean;
  paidBurstingEnabled?: boolean;
  paidBurstingMaxIops?: number;
  paidBurstingMaxBandwidthMibps?: number;
  includedBurstIops?: number;
  maxBurstCreditsForIops?: number;
  shareNextAllowedProvisionedIopsDowngradeTime?: string;
  shareNextAllowedProvisionedBandwidthDowngradeTime?: string;
  enableSmbDirectoryLease?: boolean;
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    quota: Number(result.headers["x-ms-share-quota"]),
    shareProvisionedIops:
      result.headers["x-ms-share-provisioned-iops"] === undefined ||
      result.headers["x-ms-share-provisioned-iops"] === null
        ? result.headers["x-ms-share-provisioned-iops"]
        : Number(result.headers["x-ms-share-provisioned-iops"]),
    shareProvisionedIngressMbps:
      result.headers["x-ms-share-provisioned-ingress-mbps"] === undefined ||
      result.headers["x-ms-share-provisioned-ingress-mbps"] === null
        ? result.headers["x-ms-share-provisioned-ingress-mbps"]
        : Number(result.headers["x-ms-share-provisioned-ingress-mbps"]),
    shareProvisionedEgressMbps:
      result.headers["x-ms-share-provisioned-egress-mbps"] === undefined ||
      result.headers["x-ms-share-provisioned-egress-mbps"] === null
        ? result.headers["x-ms-share-provisioned-egress-mbps"]
        : Number(result.headers["x-ms-share-provisioned-egress-mbps"]),
    shareNextAllowedQuotaDowngradeTime:
      result.headers["x-ms-share-next-allowed-quota-downgrade-time"] === undefined ||
      result.headers["x-ms-share-next-allowed-quota-downgrade-time"] === null
        ? result.headers["x-ms-share-next-allowed-quota-downgrade-time"]
        : result.headers["x-ms-share-next-allowed-quota-downgrade-time"],
    shareProvisionedBandwidthMibps:
      result.headers["x-ms-share-provisioned-bandwidth-mibps"] === undefined ||
      result.headers["x-ms-share-provisioned-bandwidth-mibps"] === null
        ? result.headers["x-ms-share-provisioned-bandwidth-mibps"]
        : Number(result.headers["x-ms-share-provisioned-bandwidth-mibps"]),
    leaseDuration:
      result.headers["x-ms-lease-duration"] === undefined ||
      result.headers["x-ms-lease-duration"] === null
        ? result.headers["x-ms-lease-duration"]
        : result.headers["x-ms-lease-duration"],
    leaseState:
      result.headers["x-ms-lease-state"] === undefined ||
      result.headers["x-ms-lease-state"] === null
        ? result.headers["x-ms-lease-state"]
        : result.headers["x-ms-lease-state"],
    leaseStatus:
      result.headers["x-ms-lease-status"] === undefined ||
      result.headers["x-ms-lease-status"] === null
        ? result.headers["x-ms-lease-status"]
        : result.headers["x-ms-lease-status"],
    accessTier:
      result.headers["x-ms-access-tier"] === undefined ||
      result.headers["x-ms-access-tier"] === null
        ? result.headers["x-ms-access-tier"]
        : result.headers["x-ms-access-tier"],
    accessTierChangeTime:
      result.headers["x-ms-access-tier-change-time"] === undefined ||
      result.headers["x-ms-access-tier-change-time"] === null
        ? result.headers["x-ms-access-tier-change-time"]
        : result.headers["x-ms-access-tier-change-time"],
    accessTierTransitionState:
      result.headers["x-ms-access-tier-transition-state"] === undefined ||
      result.headers["x-ms-access-tier-transition-state"] === null
        ? result.headers["x-ms-access-tier-transition-state"]
        : result.headers["x-ms-access-tier-transition-state"],
    enabledProtocols:
      result.headers["x-ms-enabled-protocols"] === undefined ||
      result.headers["x-ms-enabled-protocols"] === null
        ? result.headers["x-ms-enabled-protocols"]
        : result.headers["x-ms-enabled-protocols"],
    rootSquash:
      result.headers["x-ms-root-squash"] === undefined ||
      result.headers["x-ms-root-squash"] === null
        ? result.headers["x-ms-root-squash"]
        : result.headers["x-ms-root-squash"],
    enableSnapshotVirtualDirectoryAccess:
      result.headers["x-ms-enable-snapshot-virtual-directory-access"] === undefined ||
      result.headers["x-ms-enable-snapshot-virtual-directory-access"] === null
        ? result.headers["x-ms-enable-snapshot-virtual-directory-access"]
        : result.headers["x-ms-enable-snapshot-virtual-directory-access"].trim().toLowerCase() ===
          "true",
    paidBurstingEnabled:
      result.headers["x-ms-share-paid-bursting-enabled"] === undefined ||
      result.headers["x-ms-share-paid-bursting-enabled"] === null
        ? result.headers["x-ms-share-paid-bursting-enabled"]
        : result.headers["x-ms-share-paid-bursting-enabled"].trim().toLowerCase() === "true",
    paidBurstingMaxIops:
      result.headers["x-ms-share-paid-bursting-max-iops"] === undefined ||
      result.headers["x-ms-share-paid-bursting-max-iops"] === null
        ? result.headers["x-ms-share-paid-bursting-max-iops"]
        : Number(result.headers["x-ms-share-paid-bursting-max-iops"]),
    paidBurstingMaxBandwidthMibps:
      result.headers["x-ms-share-paid-bursting-max-bandwidth-mibps"] === undefined ||
      result.headers["x-ms-share-paid-bursting-max-bandwidth-mibps"] === null
        ? result.headers["x-ms-share-paid-bursting-max-bandwidth-mibps"]
        : Number(result.headers["x-ms-share-paid-bursting-max-bandwidth-mibps"]),
    includedBurstIops:
      result.headers["x-ms-share-included-burst-iops"] === undefined ||
      result.headers["x-ms-share-included-burst-iops"] === null
        ? result.headers["x-ms-share-included-burst-iops"]
        : Number(result.headers["x-ms-share-included-burst-iops"]),
    maxBurstCreditsForIops:
      result.headers["x-ms-share-max-burst-credits-for-iops"] === undefined ||
      result.headers["x-ms-share-max-burst-credits-for-iops"] === null
        ? result.headers["x-ms-share-max-burst-credits-for-iops"]
        : Number(result.headers["x-ms-share-max-burst-credits-for-iops"]),
    shareNextAllowedProvisionedIopsDowngradeTime:
      result.headers["x-ms-share-next-allowed-provisioned-iops-downgrade-time"] === undefined ||
      result.headers["x-ms-share-next-allowed-provisioned-iops-downgrade-time"] === null
        ? result.headers["x-ms-share-next-allowed-provisioned-iops-downgrade-time"]
        : result.headers["x-ms-share-next-allowed-provisioned-iops-downgrade-time"],
    shareNextAllowedProvisionedBandwidthDowngradeTime:
      result.headers["x-ms-share-next-allowed-provisioned-bandwidth-downgrade-time"] ===
        undefined ||
      result.headers["x-ms-share-next-allowed-provisioned-bandwidth-downgrade-time"] === null
        ? result.headers["x-ms-share-next-allowed-provisioned-bandwidth-downgrade-time"]
        : result.headers["x-ms-share-next-allowed-provisioned-bandwidth-downgrade-time"],
    enableSmbDirectoryLease:
      result.headers["x-ms-enable-smb-directory-lease"] === undefined ||
      result.headers["x-ms-enable-smb-directory-lease"] === null
        ? result.headers["x-ms-enable-smb-directory-lease"]
        : result.headers["x-ms-enable-smb-directory-lease"].trim().toLowerCase() === "true",
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _getPropertiesDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** Returns all user-defined metadata and system properties for the specified share or share snapshot. */
export async function getProperties(
  context: Client,
  options: ShareGetPropertiesOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    quota: number;
    shareProvisionedIops?: number;
    shareProvisionedIngressMbps?: number;
    shareProvisionedEgressMbps?: number;
    shareNextAllowedQuotaDowngradeTime?: string;
    shareProvisionedBandwidthMibps?: number;
    leaseDuration?: string;
    leaseState?: string;
    leaseStatus?: string;
    accessTier?: string;
    accessTierChangeTime?: string;
    accessTierTransitionState?: string;
    enabledProtocols?: string;
    rootSquash?: string;
    enableSnapshotVirtualDirectoryAccess?: boolean;
    paidBurstingEnabled?: boolean;
    paidBurstingMaxIops?: number;
    paidBurstingMaxBandwidthMibps?: number;
    includedBurstIops?: number;
    maxBurstCreditsForIops?: number;
    shareNextAllowedProvisionedIopsDowngradeTime?: string;
    shareNextAllowedProvisionedBandwidthDowngradeTime?: string;
    enableSmbDirectoryLease?: boolean;
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      quota: number;
      shareProvisionedIops?: number;
      shareProvisionedIngressMbps?: number;
      shareProvisionedEgressMbps?: number;
      shareNextAllowedQuotaDowngradeTime?: string;
      shareProvisionedBandwidthMibps?: number;
      leaseDuration?: string;
      leaseState?: string;
      leaseStatus?: string;
      accessTier?: string;
      accessTierChangeTime?: string;
      accessTierTransitionState?: string;
      enabledProtocols?: string;
      rootSquash?: string;
      enableSnapshotVirtualDirectoryAccess?: boolean;
      paidBurstingEnabled?: boolean;
      paidBurstingMaxIops?: number;
      paidBurstingMaxBandwidthMibps?: number;
      includedBurstIops?: number;
      maxBurstCreditsForIops?: number;
      shareNextAllowedProvisionedIopsDowngradeTime?: string;
      shareNextAllowedProvisionedBandwidthDowngradeTime?: string;
      enableSmbDirectoryLease?: boolean;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getPropertiesSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _getPropertiesDeserialize(result);
  const parsedHeaders = _getPropertiesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _createSend(
  context: Client,
  options: ShareCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=share{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.quota !== undefined ? { "x-ms-share-quota": options?.quota } : {}),
        ...(options?.accessTier !== undefined ? { "x-ms-access-tier": options?.accessTier } : {}),
        ...(options?.enabledProtocols !== undefined
          ? { "x-ms-enabled-protocols": options?.enabledProtocols }
          : {}),
        ...(options?.rootSquash !== undefined ? { "x-ms-root-squash": options?.rootSquash } : {}),
        ...(options?.enableSnapshotVirtualDirectoryAccess !== undefined
          ? {
              "x-ms-enable-snapshot-virtual-directory-access":
                options?.enableSnapshotVirtualDirectoryAccess,
            }
          : {}),
        ...(options?.paidBurstingEnabled !== undefined
          ? { "x-ms-share-paid-bursting-enabled": options?.paidBurstingEnabled }
          : {}),
        ...(options?.paidBurstingMaxIops !== undefined
          ? { "x-ms-share-paid-bursting-max-iops": options?.paidBurstingMaxIops }
          : {}),
        ...(options?.paidBurstingMaxBandwidthMibps !== undefined
          ? {
              "x-ms-share-paid-bursting-max-bandwidth-mibps":
                options?.paidBurstingMaxBandwidthMibps,
            }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...(options?.shareProvisionedIops !== undefined
          ? { "x-ms-share-provisioned-iops": options?.shareProvisionedIops }
          : {}),
        ...(options?.shareProvisionedBandwidthMibps !== undefined
          ? { "x-ms-share-provisioned-bandwidth-mibps": options?.shareProvisionedBandwidthMibps }
          : {}),
        ...(options?.enableSmbDirectoryLease !== undefined
          ? { "x-ms-enable-smb-directory-lease": options?.enableSmbDirectoryLease }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), ..._createDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _createDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  quota?: number;
  shareProvisionedIops?: number;
  shareProvisionedBandwidthMibps?: number;
  shareIncludedBurstIops?: number;
  shareMaxBurstCreditsForIops?: number;
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    quota:
      result.headers["x-ms-share-quota"] === undefined ||
      result.headers["x-ms-share-quota"] === null
        ? result.headers["x-ms-share-quota"]
        : Number(result.headers["x-ms-share-quota"]),
    shareProvisionedIops:
      result.headers["x-ms-share-provisioned-iops"] === undefined ||
      result.headers["x-ms-share-provisioned-iops"] === null
        ? result.headers["x-ms-share-provisioned-iops"]
        : Number(result.headers["x-ms-share-provisioned-iops"]),
    shareProvisionedBandwidthMibps:
      result.headers["x-ms-share-provisioned-bandwidth-mibps"] === undefined ||
      result.headers["x-ms-share-provisioned-bandwidth-mibps"] === null
        ? result.headers["x-ms-share-provisioned-bandwidth-mibps"]
        : Number(result.headers["x-ms-share-provisioned-bandwidth-mibps"]),
    shareIncludedBurstIops:
      result.headers["x-ms-share-included-burst-iops"] === undefined ||
      result.headers["x-ms-share-included-burst-iops"] === null
        ? result.headers["x-ms-share-included-burst-iops"]
        : Number(result.headers["x-ms-share-included-burst-iops"]),
    shareMaxBurstCreditsForIops:
      result.headers["x-ms-share-max-burst-credits-for-iops"] === undefined ||
      result.headers["x-ms-share-max-burst-credits-for-iops"] === null
        ? result.headers["x-ms-share-max-burst-credits-for-iops"]
        : Number(result.headers["x-ms-share-max-burst-credits-for-iops"]),
    apiVersion: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _createDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** Creates a new share under the specified account. If the share with the same name already exists, the operation fails. */
export async function create(
  context: Client,
  options: ShareCreateOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    quota?: number;
    shareProvisionedIops?: number;
    shareProvisionedBandwidthMibps?: number;
    shareIncludedBurstIops?: number;
    shareMaxBurstCreditsForIops?: number;
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      quota?: number;
      shareProvisionedIops?: number;
      shareProvisionedBandwidthMibps?: number;
      shareIncludedBurstIops?: number;
      shareMaxBurstCreditsForIops?: number;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _createSend(context, { ...options, onResponse: _storageCompat.onResponse });
  await _createDeserialize(result);
  const parsedHeaders = _createDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}
