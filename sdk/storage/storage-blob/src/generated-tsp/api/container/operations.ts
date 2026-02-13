// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobContext as Client } from "../index.js";
import {
  errorXmlDeserializer,
  LeaseStatus,
  LeaseState,
  LeaseDuration,
  PublicAccessType,
  _submitBatchRequestSerializer,
  _submitBatchRequestDeserializer,
  FilterBlobSegment,
  filterBlobSegmentXmlDeserializer,
  FilterBlobItem,
  SignedIdentifiers,
  signedIdentifiersXmlSerializer,
  signedIdentifiersXmlDeserializer,
  SignedIdentifier,
  ListBlobsResponse,
  listBlobsResponseXmlDeserializer,
  BlobFlatListSegment,
  ListBlobsHierarchySegmentResponse,
  listBlobsHierarchySegmentResponseXmlDeserializer,
  BlobHierarchyListSegment,
  SkuName,
  AccountKind,
} from "../../models/azure/storage/blobs/models.js";
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

/** Returns the sku name and account kind */
export async function getAccountInfo(
  context: Client,
  options: ContainerGetAccountInfoOptionalParams = { requestOptions: {} },
): Promise<{
  skuName?: SkuName;
  accountKind?: AccountKind;
  isHierarchicalNamespaceEnabled?: boolean;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _getAccountInfoSend(context, options);
  const headers = _getAccountInfoDeserializeHeaders(result);
  return { ...headers };
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
      maxresults: options?.maxresults,
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
      contentType: "application/xml",
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

/** The List Blobs operation returns a list of the blobs under the specified container. A delimiter can be used to traverse a virtual hierarchy of blobs as though it were a file system. */
export async function listBlobHierarchySegment(
  context: Client,
  delimiter: string,
  options: ContainerListBlobHierarchySegmentOptionalParams = { requestOptions: {} },
): Promise<{
  serviceEndpoint: string;
  containerName: string;
  delimiter?: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  segment: BlobHierarchyListSegment;
  continuationToken?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _listBlobHierarchySegmentSend(context, delimiter, options);
  const headers = _listBlobHierarchySegmentDeserializeHeaders(result);
  const payload = await _listBlobHierarchySegmentDeserialize(result);
  return { ...payload, ...headers };
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
      maxresults: options?.maxresults,
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
      contentType: "application/xml",
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

/** The List Blobs operation returns a list of the blobs under the specified container. */
export async function listBlobs(
  context: Client,
  options: ContainerListBlobsOptionalParams = { requestOptions: {} },
): Promise<{
  serviceEndpoint: string;
  containerName: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  segment: BlobFlatListSegment;
  continuationToken?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _listBlobsSend(context, options);
  const headers = _listBlobsDeserializeHeaders(result);
  const payload = await _listBlobsDeserialize(result);
  return { ...payload, ...headers };
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
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
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

/** The Change Lease operation is used to change the ID of an existing lease. */
export async function changeLease(
  context: Client,
  leaseId: string,
  proposedLeaseId: string,
  options: ContainerChangeLeaseOptionalParams = { requestOptions: {} },
): Promise<{
  leaseId?: string;
  etag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _changeLeaseSend(context, leaseId, proposedLeaseId, options);
  const headers = _changeLeaseDeserializeHeaders(result);
  return { ...headers };
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
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
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

/** The Break Lease operation ends a lease and ensures that another client can't acquire a new lease until the current lease period has expired. */
export async function breakLease(
  context: Client,
  options: ContainerBreakLeaseOptionalParams = { requestOptions: {} },
): Promise<{
  leaseTime?: number;
  etag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _breakLeaseSend(context, options);
  const headers = _breakLeaseDeserializeHeaders(result);
  return { ...headers };
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
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
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

/** The Renew Lease operation renews an existing lease. */
export async function renewLease(
  context: Client,
  leaseId: string,
  options: ContainerRenewLeaseOptionalParams = { requestOptions: {} },
): Promise<{
  leaseId?: string;
  etag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _renewLeaseSend(context, leaseId, options);
  const headers = _renewLeaseDeserializeHeaders(result);
  return { ...headers };
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
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
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

/** The Release Lease operation frees the lease if it's no longer needed, so that another client can immediately acquire a lease against the container. */
export async function releaseLease(
  context: Client,
  leaseId: string,
  options: ContainerReleaseLeaseOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _releaseLeaseSend(context, leaseId, options);
  const headers = _releaseLeaseDeserializeHeaders(result);
  return { ...headers };
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
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

/** The Acquire Lease operation requests a new lease on a container. The lease lock duration can be 15 to 60 seconds, or can be infinite. */
export async function acquireLease(
  context: Client,
  duration: number,
  options: ContainerAcquireLeaseOptionalParams = { requestOptions: {} },
): Promise<{
  leaseId?: string;
  etag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _acquireLeaseSend(context, duration, options);
  const headers = _acquireLeaseDeserializeHeaders(result);
  return { ...headers };
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
      maxresults: options?.maxresults,
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
      contentType: "application/xml",
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

/** The Filter Blobs operation enables callers to list blobs in a container whose tags match a given search expression.  Filter blobs searches within the given container. */
export async function findBlobsByTags(
  context: Client,
  filterExpression: string,
  options: ContainerFindBlobsByTagsOptionalParams = { requestOptions: {} },
): Promise<{
  serviceEndpoint: string;
  where: string;
  blobs: FilterBlobItem[];
  continuationToken?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _findBlobsByTagsSend(context, filterExpression, options);
  const headers = _findBlobsByTagsDeserializeHeaders(result);
  const payload = await _findBlobsByTagsDeserialize(result);
  return { ...payload, ...headers };
}

export function _submitBatchSend(
  context: Client,
  multipartContentType: string,
  contentLength: number,
  body: {
    name: string;
    body: Uint8Array;
  },
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
      contentType: multipartContentType,
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "content-length": contentLength,
        accept: "multipart/mixed",
        ...options.requestOptions?.headers,
      },
      body: _submitBatchRequestSerializer(body),
    });
}

export async function _submitBatchDeserialize(result: PathUncheckedResponse): Promise<{
  name: string;
  body: Uint8Array;
}> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    throw error;
  }

  return _submitBatchRequestDeserializer(result.body) as any;
}

export function _submitBatchDeserializeHeaders(result: PathUncheckedResponse): {
  requestId?: string;
  version: string;
  multipartContentType: "multipart/mixed";
} {
  return {
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    version: result.headers["x-ms-version"],
    multipartContentType: result.headers["content-type"] as any,
  };
}

/** The Batch operation allows multiple API calls to be embedded into a single HTTP request. */
export async function submitBatch(
  context: Client,
  multipartContentType: string,
  contentLength: number,
  body: {
    name: string;
    body: Uint8Array;
  },
  options: ContainerSubmitBatchOptionalParams = { requestOptions: {} },
): Promise<{
  name: string;
  body: Uint8Array;
  requestId?: string;
  version: string;
  multipartContentType: "multipart/mixed";
}> {
  const result = await _submitBatchSend(
    context,
    multipartContentType,
    contentLength,
    body,
    options,
  );
  const headers = _submitBatchDeserializeHeaders(result);
  const payload = await _submitBatchDeserialize(result);
  return { ...payload, ...headers };
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
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        "x-ms-source-container-name": sourceContainerName,
        ...(options?.sourceLeaseId !== undefined
          ? { "x-ms-source-lease-id": options?.sourceLeaseId }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
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

/** Renames an existing container. */
export async function rename(
  context: Client,
  sourceContainerName: string,
  options: ContainerRenameOptionalParams = { requestOptions: {} },
): Promise<{ date: Date; version: string; requestId?: string; clientRequestId?: string }> {
  const result = await _renameSend(context, sourceContainerName, options);
  const headers = _renameDeserializeHeaders(result);
  return { ...headers };
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
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.deletedContainerName !== undefined
          ? { "x-ms-deleted-container-name": options?.deletedContainerName }
          : {}),
        ...(options?.deletedContainerVersion !== undefined
          ? { "x-ms-deleted-container-version": options?.deletedContainerVersion }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
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

/** Restores a previously-deleted container. */
export async function restore(
  context: Client,
  options: ContainerRestoreOptionalParams = { requestOptions: {} },
): Promise<{ date: Date; version: string; requestId?: string; clientRequestId?: string }> {
  const result = await _restoreSend(context, options);
  const headers = _restoreDeserializeHeaders(result);
  return { ...headers };
}

export function _setAccessPolicySend(
  context: Client,
  containerAcl: SignedIdentifiers,
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: signedIdentifiersXmlSerializer(containerAcl),
    });
}

export async function _setAccessPolicyDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    throw error;
  }

  return;
}

export function _setAccessPolicyDeserializeHeaders(result: PathUncheckedResponse): {
  eTag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    eTag: result.headers["etag"],
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

/** sets the permissions for the specified container. The permissions indicate whether blobs in a container may be accessed publicly. */
export async function setAccessPolicy(
  context: Client,
  containerAcl: SignedIdentifiers,
  options: ContainerSetAccessPolicyOptionalParams = { requestOptions: {} },
): Promise<{
  eTag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _setAccessPolicySend(context, containerAcl, options);
  const headers = _setAccessPolicyDeserializeHeaders(result);
  return { ...headers };
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
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
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
    throw error;
  }

  return signedIdentifiersXmlDeserializer(result.body);
}

export function _getAccessPolicyDeserializeHeaders(result: PathUncheckedResponse): {
  access?: PublicAccessType;
  etag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
} {
  return {
    access: result.headers["x-ms-blob-public-access"] as any,
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

/** gets the permissions for the specified container. The permissions indicate whether container data may be accessed publicly. */
export async function getAccessPolicy(
  context: Client,
  options: ContainerGetAccessPolicyOptionalParams = { requestOptions: {} },
): Promise<{
  items: SignedIdentifier[];
  access?: PublicAccessType;
  etag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _getAccessPolicySend(context, options);
  const headers = _getAccessPolicyDeserializeHeaders(result);
  const payload = await _getAccessPolicyDeserialize(result);
  return { ...payload, ...headers };
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
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.metadata !== undefined ? { "x-ms-meta": options?.metadata } : {}),
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
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
    throw error;
  }

  return;
}

export function _setMetadataDeserializeHeaders(result: PathUncheckedResponse): {
  eTag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    eTag: result.headers["etag"],
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

/** operation sets one or more user-defined name-value pairs for the specified container. */
export async function setMetadata(
  context: Client,
  options: ContainerSetMetadataOptionalParams = { requestOptions: {} },
): Promise<{
  eTag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _setMetadataSend(context, options);
  const headers = _setMetadataDeserializeHeaders(result);
  return { ...headers };
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
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
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

/** operation marks the specified container for deletion. The container and any blobs contained within it are later deleted during garbage collection */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  options: ContainerDeleteOptionalParams = { requestOptions: {} },
): Promise<{ date: Date; version: string; requestId?: string; clientRequestId?: string }> {
  const result = await _$deleteSend(context, options);
  const headers = _$deleteDeserializeHeaders(result);
  return { ...headers };
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
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPropertiesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    throw error;
  }

  return;
}

export function _getPropertiesDeserializeHeaders(result: PathUncheckedResponse): {
  metadata?: Record<string, string>;
  etag: string;
  lastModified: Date;
  duration?: LeaseDuration;
  leaseState?: LeaseState;
  leaseStatus?: LeaseStatus;
  access?: PublicAccessType;
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
    metadata:
      result.headers["x-ms-meta"] === undefined || result.headers["x-ms-meta"] === null
        ? result.headers["x-ms-meta"]
        : Object.fromEntries(
            Object.entries(result.headers["x-ms-meta"]).map(([k, p]: [string, any]) => [k, p]),
          ),
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    duration: result.headers["x-ms-lease-duration"] as any,
    leaseState: result.headers["x-ms-lease-state"] as any,
    leaseStatus: result.headers["x-ms-lease-status"] as any,
    access: result.headers["x-ms-blob-public-access"] as any,
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

/** returns all user-defined metadata and system properties for the specified container. The data returned does not include the container's list of blobs */
export async function getProperties(
  context: Client,
  options: ContainerGetPropertiesOptionalParams = { requestOptions: {} },
): Promise<{
  metadata?: Record<string, string>;
  etag: string;
  lastModified: Date;
  duration?: LeaseDuration;
  leaseState?: LeaseState;
  leaseStatus?: LeaseStatus;
  access?: PublicAccessType;
  hasImmutabilityPolicy?: boolean;
  hasLegalHold?: boolean;
  defaultEncryptionScope?: string;
  preventEncryptionScopeOverride?: boolean;
  isImmutableStorageWithVersioningEnabled?: boolean;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _getPropertiesSend(context, options);
  const headers = _getPropertiesDeserializeHeaders(result);
  return { ...headers };
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
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.metadata !== undefined ? { "x-ms-meta": options?.metadata } : {}),
        ...(options?.access !== undefined ? { "x-ms-blob-public-access": options?.access } : {}),
        ...(options?.defaultEncryptionScope !== undefined
          ? { "x-ms-default-encryption-scope": options?.defaultEncryptionScope }
          : {}),
        ...(options?.preventEncryptionScopeOverride !== undefined
          ? { "x-ms-deny-encryption-scope-override": options?.preventEncryptionScopeOverride }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
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
    throw error;
  }

  return;
}

export function _createDeserializeHeaders(result: PathUncheckedResponse): {
  eTag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    eTag: result.headers["etag"],
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

/** Creates a new container under the specified account. If the container with the same name already exists, the operation fails. */
export async function create(
  context: Client,
  options: ContainerCreateOptionalParams = { requestOptions: {} },
): Promise<{
  eTag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _createSend(context, options);
  const headers = _createDeserializeHeaders(result);
  return { ...headers };
}
