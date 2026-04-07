// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobContext as Client } from "../index.js";
import {
  errorXmlDeserializer,
  LeaseStatus,
  LeaseState,
  LeaseDuration,
  PublicAccessType,
  _submitBatchRequestDeserializer,
  FilterBlobSegment,
  filterBlobSegmentXmlDeserializer,
  SignedIdentifiers,
  signedIdentifiersXmlSerializer,
  signedIdentifiersXmlDeserializer,
  ListBlobsResponse,
  listBlobsResponseXmlDeserializer,
  ListBlobsHierarchySegmentResponse,
  listBlobsHierarchySegmentResponseXmlDeserializer,
  SkuName,
  AccountKind,
} from "../../models/azure/storage/blobs/models.js";
import { FileContents } from "../../static-helpers/multipartHelpers.js";
import {
  StorageCompatResponseInfo,
  createStorageCompatOnResponse,
  addStorageCompatResponse,
} from "../../static-helpers/storageCompatResponse.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ContainerGetAccountInfoOptionalParams,
  ContainerListBlobHierarchySegmentOptionalParams,
  ContainerListBlobsOptionalParams,
  ContainerChangeLeaseOptionalParams,
  ContainerBreakLeaseOptionalParams,
  ContainerRenewLeaseOptionalParams,
  ContainerReleaseLeaseOptionalParams,
  ContainerAcquireLeaseOptionalParams,
  ContainerFindBlobsByTagsOptionalParams,
  ContainerSubmitBatchOptionalParams,
  ContainerRenameOptionalParams,
  ContainerRestoreOptionalParams,
  ContainerSetAccessPolicyOptionalParams,
  ContainerGetAccessPolicyOptionalParams,
  ContainerSetMetadataOptionalParams,
  ContainerDeleteOptionalParams,
  ContainerGetPropertiesOptionalParams,
  ContainerCreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getAccountInfoSend(
  context: Client,
  options: ContainerGetAccountInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=account&comp=properties{?timeout}",
    {
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getAccountInfoDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._getAccountInfoDeserializeExceptionHeaders(result),
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

export function _getAccountInfoDeserializeHeaders(result: PathUncheckedResponse): {
  skuName?: SkuName;
  accountKind?: AccountKind;
  isHierarchicalNamespaceEnabled?: boolean;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    skuName: result.headers["x-ms-sku-name"] as any,
    accountKind: result.headers["x-ms-account-kind"] as any,
    isHierarchicalNamespaceEnabled:
      result.headers["x-ms-is-hns-enabled"] === undefined ||
      result.headers["x-ms-is-hns-enabled"] === null
        ? result.headers["x-ms-is-hns-enabled"]
        : result.headers["x-ms-is-hns-enabled"].trim().toLowerCase() === "true",
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
  };
}

export function _getAccountInfoDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Returns the sku name and account kind */
export async function getAccountInfo(
  context: Client,
  options: ContainerGetAccountInfoOptionalParams = { requestOptions: {} },
): Promise<
  {
    skuName?: SkuName;
    accountKind?: AccountKind;
    isHierarchicalNamespaceEnabled?: boolean;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      skuName?: SkuName;
      accountKind?: AccountKind;
      isHierarchicalNamespaceEnabled?: boolean;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getAccountInfoSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _getAccountInfoDeserialize(result);
  const parsedHeaders = _getAccountInfoDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _listBlobHierarchySegmentSend(
  context: Client,
  delimiter: string,
  options: ContainerListBlobHierarchySegmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=container&comp=list{?delimiter,prefix,marker,maxresults,include,timeout,startFrom}",
    {
      delimiter: delimiter,
      prefix: options?.prefix,
      marker: options?.marker,
      maxresults: options?.maxPageSize,
      include: !options?.include
        ? options?.include
        : options?.include.map((p: any) => {
            return p;
          }),
      timeout: options?.timeout,
      startFrom: options?.startFrom,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listBlobHierarchySegmentDeserialize(
  result: PathUncheckedResponse,
): Promise<ListBlobsHierarchySegmentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._listBlobHierarchySegmentDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return listBlobsHierarchySegmentResponseXmlDeserializer(result.body);
}

export function _listBlobHierarchySegmentDeserializeHeaders(result: PathUncheckedResponse): {
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
} {
  return {
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    contentType: result.headers["content-type"] as any,
  };
}

export function _listBlobHierarchySegmentDeserializeExceptionHeaders(
  result: PathUncheckedResponse,
): { errorCode?: string; xMsCopySourceErrorCode?: string; xMsCopySourceStatusCode?: number } {
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

/** The List Blobs operation returns a list of the blobs under the specified container. A delimiter can be used to traverse a virtual hierarchy of blobs as though it were a file system. */
export async function listBlobHierarchySegment(
  context: Client,
  delimiter: string,
  options: ContainerListBlobHierarchySegmentOptionalParams = { requestOptions: {} },
): Promise<
  {
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  } & ListBlobsHierarchySegmentResponse &
    StorageCompatResponseInfo<
      ListBlobsHierarchySegmentResponse,
      {
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _listBlobHierarchySegmentSend(context, delimiter, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _listBlobHierarchySegmentDeserialize(result);
  const parsedHeaders = _listBlobHierarchySegmentDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _listBlobsSend(
  context: Client,
  options: ContainerListBlobsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=container&comp=list{?prefix,marker,maxresults,include,timeout,startFrom}",
    {
      prefix: options?.prefix,
      marker: options?.marker,
      maxresults: options?.maxPageSize,
      include: !options?.include
        ? options?.include
        : options?.include.map((p: any) => {
            return p;
          }),
      timeout: options?.timeout,
      startFrom: options?.startFrom,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listBlobsDeserialize(
  result: PathUncheckedResponse,
): Promise<ListBlobsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), ..._listBlobsDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return listBlobsResponseXmlDeserializer(result.body);
}

export function _listBlobsDeserializeHeaders(result: PathUncheckedResponse): {
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
} {
  return {
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    contentType: result.headers["content-type"] as any,
  };
}

export function _listBlobsDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** The List Blobs operation returns a list of the blobs under the specified container. */
export async function listBlobs(
  context: Client,
  options: ContainerListBlobsOptionalParams = { requestOptions: {} },
): Promise<
  {
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  } & ListBlobsResponse &
    StorageCompatResponseInfo<
      ListBlobsResponse,
      {
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _listBlobsSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _listBlobsDeserialize(result);
  const parsedHeaders = _listBlobsDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _changeLeaseSend(
  context: Client,
  leaseId: string,
  proposedLeaseId: string,
  options: ContainerChangeLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=lease&restype=container{?timeout}",
    {
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "x-ms-lease-id": leaseId,
        "x-ms-proposed-lease-id": proposedLeaseId,
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        "x-ms-lease-action": "change",
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
  leaseId?: string;
  etag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    leaseId:
      result.headers["x-ms-lease-id"] === undefined || result.headers["x-ms-lease-id"] === null
        ? result.headers["x-ms-lease-id"]
        : result.headers["x-ms-lease-id"],
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
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

/** The Change Lease operation is used to change the ID of an existing lease. */
export async function changeLease(
  context: Client,
  leaseId: string,
  proposedLeaseId: string,
  options: ContainerChangeLeaseOptionalParams = { requestOptions: {} },
): Promise<
  {
    leaseId?: string;
    etag: string;
    lastModified: Date;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      leaseId?: string;
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _changeLeaseSend(context, leaseId, proposedLeaseId, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _changeLeaseDeserialize(result);
  const parsedHeaders = _changeLeaseDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _breakLeaseSend(
  context: Client,
  options: ContainerBreakLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=lease&restype=container{?timeout}",
    {
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.breakPeriod !== undefined
          ? { "x-ms-lease-break-period": options?.breakPeriod }
          : {}),
        "x-ms-lease-action": "break",
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
  leaseTime?: number;
  etag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    leaseTime:
      result.headers["x-ms-lease-time"] === undefined || result.headers["x-ms-lease-time"] === null
        ? result.headers["x-ms-lease-time"]
        : Number(result.headers["x-ms-lease-time"]),
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
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

/** The Break Lease operation ends a lease and ensures that another client can't acquire a new lease until the current lease period has expired. */
export async function breakLease(
  context: Client,
  options: ContainerBreakLeaseOptionalParams = { requestOptions: {} },
): Promise<
  {
    leaseTime?: number;
    etag: string;
    lastModified: Date;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      leaseTime?: number;
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
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
  options: ContainerRenewLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=lease&restype=container{?timeout}",
    {
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "x-ms-lease-id": leaseId,
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        "x-ms-lease-action": "renew",
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
  leaseId?: string;
  etag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    leaseId:
      result.headers["x-ms-lease-id"] === undefined || result.headers["x-ms-lease-id"] === null
        ? result.headers["x-ms-lease-id"]
        : result.headers["x-ms-lease-id"],
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
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

/** The Renew Lease operation renews an existing lease. */
export async function renewLease(
  context: Client,
  leaseId: string,
  options: ContainerRenewLeaseOptionalParams = { requestOptions: {} },
): Promise<
  {
    leaseId?: string;
    etag: string;
    lastModified: Date;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      leaseId?: string;
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
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

export function _releaseLeaseSend(
  context: Client,
  leaseId: string,
  options: ContainerReleaseLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=lease&restype=container{?timeout}",
    {
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "x-ms-lease-id": leaseId,
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        "x-ms-lease-action": "release",
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
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
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

/** The Release Lease operation frees the lease if it's no longer needed, so that another client can immediately acquire a lease against the container. */
export async function releaseLease(
  context: Client,
  leaseId: string,
  options: ContainerReleaseLeaseOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
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
  duration: number,
  options: ContainerAcquireLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=lease&restype=container{?timeout}",
    {
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "x-ms-lease-duration": duration,
        ...(options?.proposedLeaseId !== undefined
          ? { "x-ms-proposed-lease-id": options?.proposedLeaseId }
          : {}),
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        "x-ms-lease-action": "acquire",
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
  leaseId?: string;
  etag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    leaseId:
      result.headers["x-ms-lease-id"] === undefined || result.headers["x-ms-lease-id"] === null
        ? result.headers["x-ms-lease-id"]
        : result.headers["x-ms-lease-id"],
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
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

/** The Acquire Lease operation requests a new lease on a container. The lease lock duration can be 15 to 60 seconds, or can be infinite. */
export async function acquireLease(
  context: Client,
  duration: number,
  options: ContainerAcquireLeaseOptionalParams = { requestOptions: {} },
): Promise<
  {
    leaseId?: string;
    etag: string;
    lastModified: Date;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      leaseId?: string;
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _acquireLeaseSend(context, duration, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _acquireLeaseDeserialize(result);
  const parsedHeaders = _acquireLeaseDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _findBlobsByTagsSend(
  context: Client,
  filterExpression: string,
  options: ContainerFindBlobsByTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=container&comp=blobs{?timeout,where,marker,maxresults,include}",
    {
      timeout: options?.timeout,
      where: filterExpression,
      marker: options?.marker,
      maxresults: options?.maxPageSize,
      include: !options?.include
        ? options?.include
        : options?.include.map((p: any) => {
            return p;
          }),
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _findBlobsByTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<FilterBlobSegment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._findBlobsByTagsDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return filterBlobSegmentXmlDeserializer(result.body);
}

export function _findBlobsByTagsDeserializeHeaders(result: PathUncheckedResponse): {
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
} {
  return {
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    contentType: result.headers["content-type"] as any,
  };
}

export function _findBlobsByTagsDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** The Filter Blobs operation enables callers to list blobs in a container whose tags match a given search expression.  Filter blobs searches within the given container. */
export async function findBlobsByTags(
  context: Client,
  filterExpression: string,
  options: ContainerFindBlobsByTagsOptionalParams = { requestOptions: {} },
): Promise<
  {
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  } & FilterBlobSegment &
    StorageCompatResponseInfo<
      FilterBlobSegment,
      {
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _findBlobsByTagsSend(context, filterExpression, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _findBlobsByTagsDeserialize(result);
  const parsedHeaders = _findBlobsByTagsDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _submitBatchSend(
  context: Client,
  contentType: string,
  contentLength: number,
  body: string,
  options: ContainerSubmitBatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=container&comp=batch{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: contentType,
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "content-length": contentLength,
        accept: "multipart/mixed",
        ...options.requestOptions?.headers,
      },
      body: body,
    });
}

export async function _submitBatchDeserialize(result: PathUncheckedResponse): Promise<{
  body: FileContents | { contents: FileContents; contentType?: string; filename?: string };
}> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._submitBatchDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return _submitBatchRequestDeserializer(result.body) as any;
}

export function _submitBatchDeserializeHeaders(result: PathUncheckedResponse): {
  requestId?: string;
  version: string;
  contentType: "multipart/mixed";
} {
  return {
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    version: result.headers["x-ms-version"],
    contentType: result.headers["content-type"] as any,
  };
}

export function _submitBatchDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** The Batch operation allows multiple API calls to be embedded into a single HTTP request. */
export async function submitBatch(
  context: Client,
  contentType: string,
  contentLength: number,
  body: string,
  options: ContainerSubmitBatchOptionalParams = { requestOptions: {} },
): Promise<
  { requestId?: string; version: string; contentType: "multipart/mixed" } & {
    body: FileContents | { contents: FileContents; contentType?: string; filename?: string };
  } & StorageCompatResponseInfo<
      {
        body: FileContents | { contents: FileContents; contentType?: string; filename?: string };
      },
      { requestId?: string; version: string; contentType: "multipart/mixed" }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _submitBatchSend(context, contentType, contentLength, body, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _submitBatchDeserialize(result);
  const parsedHeaders = _submitBatchDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _renameSend(
  context: Client,
  sourceContainerName: string,
  options: ContainerRenameOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=container&comp=rename{?timeout}",
    {
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "x-ms-source-container-name": sourceContainerName,
        ...(options?.sourceLeaseId !== undefined
          ? { "x-ms-source-lease-id": options?.sourceLeaseId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _renameDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), ..._renameDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _renameDeserializeHeaders(result: PathUncheckedResponse): {
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
  };
}

export function _renameDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Renames an existing container. */
export async function rename(
  context: Client,
  sourceContainerName: string,
  options: ContainerRenameOptionalParams = { requestOptions: {} },
): Promise<
  {
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    { date: Date; version: string; requestId?: string; clientRequestId?: string }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _renameSend(context, sourceContainerName, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _renameDeserialize(result);
  const parsedHeaders = _renameDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _restoreSend(
  context: Client,
  options: ContainerRestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=container&comp=undelete{?timeout}",
    {
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.deletedContainerName !== undefined
          ? { "x-ms-deleted-container-name": options?.deletedContainerName }
          : {}),
        ...(options?.deletedContainerVersion !== undefined
          ? { "x-ms-deleted-container-version": options?.deletedContainerVersion }
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
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
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

/** Restores a previously-deleted container. */
export async function restore(
  context: Client,
  options: ContainerRestoreOptionalParams = { requestOptions: {} },
): Promise<
  {
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    { date: Date; version: string; requestId?: string; clientRequestId?: string }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _restoreSend(context, { ...options, onResponse: _storageCompat.onResponse });
  await _restoreDeserialize(result);
  const parsedHeaders = _restoreDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _setAccessPolicySend(
  context: Client,
  options: ContainerSetAccessPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=container&comp=acl{?timeout}",
    {
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.access !== undefined ? { "x-ms-blob-public-access": options?.access } : {}),
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: !options["containerAcl"]
        ? options["containerAcl"]
        : signedIdentifiersXmlSerializer(options["containerAcl"]),
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
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
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

/** sets the permissions for the specified container. The permissions indicate whether blobs in a container may be accessed publicly. */
export async function setAccessPolicy(
  context: Client,
  options: ContainerSetAccessPolicyOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
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
  options: ContainerGetAccessPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=container&comp=acl{?timeout}",
    {
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getAccessPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<SignedIdentifiers> {
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

  return signedIdentifiersXmlDeserializer(result.body);
}

export function _getAccessPolicyDeserializeHeaders(result: PathUncheckedResponse): {
  blobPublicAccess?: PublicAccessType;
  etag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
} {
  return {
    blobPublicAccess: result.headers["x-ms-blob-public-access"] as any,
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
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

/** gets the permissions for the specified container. The permissions indicate whether container data may be accessed publicly. */
export async function getAccessPolicy(
  context: Client,
  options: ContainerGetAccessPolicyOptionalParams = { requestOptions: {} },
): Promise<
  {
    blobPublicAccess?: PublicAccessType;
    etag: string;
    lastModified: Date;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  } & SignedIdentifiers &
    StorageCompatResponseInfo<
      SignedIdentifiers,
      {
        blobPublicAccess?: PublicAccessType;
        etag: string;
        lastModified: Date;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
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
  options: ContainerSetMetadataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=container&comp=metadata{?timeout}",
    {
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
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
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
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

/** operation sets one or more user-defined name-value pairs for the specified container. */
export async function setMetadata(
  context: Client,
  options: ContainerSetMetadataOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
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

export function _$deleteSend(
  context: Client,
  options: ContainerDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=container{?timeout}",
    {
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
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
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
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

/** operation marks the specified container for deletion. The container and any blobs contained within it are later deleted during garbage collection */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  options: ContainerDeleteOptionalParams = { requestOptions: {} },
): Promise<
  {
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    { date: Date; version: string; requestId?: string; clientRequestId?: string }
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
  options: ContainerGetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=container{?timeout}",
    {
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
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
  leaseDuration?: LeaseDuration;
  leaseState?: LeaseState;
  leaseStatus?: LeaseStatus;
  blobPublicAccess?: PublicAccessType;
  hasImmutabilityPolicy?: boolean;
  hasLegalHold?: boolean;
  defaultEncryptionScope?: string;
  preventEncryptionScopeOverride?: boolean;
  isImmutableStorageWithVersioningEnabled?: boolean;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    leaseDuration: result.headers["x-ms-lease-duration"] as any,
    leaseState: result.headers["x-ms-lease-state"] as any,
    leaseStatus: result.headers["x-ms-lease-status"] as any,
    blobPublicAccess: result.headers["x-ms-blob-public-access"] as any,
    hasImmutabilityPolicy:
      result.headers["x-ms-has-immutability-policy"] === undefined ||
      result.headers["x-ms-has-immutability-policy"] === null
        ? result.headers["x-ms-has-immutability-policy"]
        : result.headers["x-ms-has-immutability-policy"].trim().toLowerCase() === "true",
    hasLegalHold:
      result.headers["x-ms-has-legal-hold"] === undefined ||
      result.headers["x-ms-has-legal-hold"] === null
        ? result.headers["x-ms-has-legal-hold"]
        : result.headers["x-ms-has-legal-hold"].trim().toLowerCase() === "true",
    defaultEncryptionScope:
      result.headers["x-ms-default-encryption-scope"] === undefined ||
      result.headers["x-ms-default-encryption-scope"] === null
        ? result.headers["x-ms-default-encryption-scope"]
        : result.headers["x-ms-default-encryption-scope"],
    preventEncryptionScopeOverride:
      result.headers["x-ms-deny-encryption-scope-override"] === undefined ||
      result.headers["x-ms-deny-encryption-scope-override"] === null
        ? result.headers["x-ms-deny-encryption-scope-override"]
        : result.headers["x-ms-deny-encryption-scope-override"].trim().toLowerCase() === "true",
    isImmutableStorageWithVersioningEnabled:
      result.headers["x-ms-immutable-storage-with-versioning-enabled"] === undefined ||
      result.headers["x-ms-immutable-storage-with-versioning-enabled"] === null
        ? result.headers["x-ms-immutable-storage-with-versioning-enabled"]
        : result.headers["x-ms-immutable-storage-with-versioning-enabled"].trim().toLowerCase() ===
          "true",
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
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

/** returns all user-defined metadata and system properties for the specified container. The data returned does not include the container's list of blobs */
export async function getProperties(
  context: Client,
  options: ContainerGetPropertiesOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    leaseDuration?: LeaseDuration;
    leaseState?: LeaseState;
    leaseStatus?: LeaseStatus;
    blobPublicAccess?: PublicAccessType;
    hasImmutabilityPolicy?: boolean;
    hasLegalHold?: boolean;
    defaultEncryptionScope?: string;
    preventEncryptionScopeOverride?: boolean;
    isImmutableStorageWithVersioningEnabled?: boolean;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      leaseDuration?: LeaseDuration;
      leaseState?: LeaseState;
      leaseStatus?: LeaseStatus;
      blobPublicAccess?: PublicAccessType;
      hasImmutabilityPolicy?: boolean;
      hasLegalHold?: boolean;
      defaultEncryptionScope?: string;
      preventEncryptionScopeOverride?: boolean;
      isImmutableStorageWithVersioningEnabled?: boolean;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
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
  options: ContainerCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=container{?timeout}",
    {
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.access !== undefined ? { "x-ms-blob-public-access": options?.access } : {}),
        ...(options?.defaultEncryptionScope !== undefined
          ? { "x-ms-default-encryption-scope": options?.defaultEncryptionScope }
          : {}),
        ...(options?.preventEncryptionScopeOverride !== undefined
          ? { "x-ms-deny-encryption-scope-override": options?.preventEncryptionScopeOverride }
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
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
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

/** Creates a new container under the specified account. If the container with the same name already exists, the operation fails. */
export async function create(
  context: Client,
  options: ContainerCreateOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _createSend(context, { ...options, onResponse: _storageCompat.onResponse });
  await _createDeserialize(result);
  const parsedHeaders = _createDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}
