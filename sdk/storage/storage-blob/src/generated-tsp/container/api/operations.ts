// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerContext as Client } from "./index.js";
import {
  storageErrorDeserializer,
  _submitBatchRequestSerializer,
  _submitBatchRequestDeserializer,
  FilterBlobSegment,
  filterBlobSegmentXmlDeserializer,
  SignedIdentifiers,
  signedIdentifiersXmlSerializer,
  signedIdentifiersXmlDeserializer,
  _ListBlobsFlatSegmentResponse,
  _listBlobsFlatSegmentResponseXmlDeserializer,
  BlobItemInternal,
  _ListBlobsHierarchySegmentResponse,
  _listBlobsHierarchySegmentResponseXmlDeserializer,
} from "../../models/azure/storage/blobs/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  GetAccountInfoOptionalParams,
  ListBlobHierarchySegmentOptionalParams,
  ListBlobFlatSegmentOptionalParams,
  ChangeLeaseOptionalParams,
  BreakLeaseOptionalParams,
  RenewLeaseOptionalParams,
  ReleaseLeaseOptionalParams,
  AcquireLeaseOptionalParams,
  FindBlobsByTagsOptionalParams,
  SubmitBatchOptionalParams,
  RenameOptionalParams,
  RestoreOptionalParams,
  SetAccessPolicyOptionalParams,
  GetAccessPolicyOptionalParams,
  SetMetadataOptionalParams,
  DeleteOptionalParams,
  GetPropertiesOptionalParams,
  CreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getAccountInfoSend(
  context: Client,
  options: GetAccountInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=account&comp=properties{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version,
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Returns the sku name and account kind */
export async function getAccountInfo(
  context: Client,
  options: GetAccountInfoOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getAccountInfoSend(context, options);
  return _getAccountInfoDeserialize(result);
}

export function _listBlobHierarchySegmentSend(
  context: Client,
  delimiter: string,
  options: ListBlobHierarchySegmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=container&comp=list&hierarchy{?delimiter,prefix,marker,maxresults,include,timeout,startFrom}",
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
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version,
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
): Promise<_ListBlobsHierarchySegmentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return _listBlobsHierarchySegmentResponseXmlDeserializer(result.body);
}

/** The List Blobs operation returns a list of the blobs under the specified container. A delimiter can be used to traverse a virtual hierarchy of blobs as though it were a file system. */
export function listBlobHierarchySegment(
  context: Client,
  delimiter: string,
  options: ListBlobHierarchySegmentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BlobItemInternal> {
  return buildPagedAsyncIterator(
    context,
    () => _listBlobHierarchySegmentSend(context, delimiter, options),
    _listBlobHierarchySegmentDeserialize,
    ["200"],
    { itemName: "segment.blobItems" },
  );
}

export function _listBlobFlatSegmentSend(
  context: Client,
  options: ListBlobFlatSegmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=container&comp=list&flat{?prefix,marker,maxresults,include,timeout,startFrom}",
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
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version,
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listBlobFlatSegmentDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListBlobsFlatSegmentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return _listBlobsFlatSegmentResponseXmlDeserializer(result.body);
}

/** The List Blobs operation returns a list of the blobs under the specified container. */
export function listBlobFlatSegment(
  context: Client,
  options: ListBlobFlatSegmentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BlobItemInternal> {
  return buildPagedAsyncIterator(
    context,
    () => _listBlobFlatSegmentSend(context, options),
    _listBlobFlatSegmentDeserialize,
    ["200"],
    { itemName: "segment.blobItems" },
  );
}

export function _changeLeaseSend(
  context: Client,
  leaseId: string,
  proposedLeaseId: string,
  options: ChangeLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=lease&restype=container&change{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version,
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Change Lease operation is used to change the ID of an existing lease. */
export async function changeLease(
  context: Client,
  leaseId: string,
  proposedLeaseId: string,
  options: ChangeLeaseOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _changeLeaseSend(context, leaseId, proposedLeaseId, options);
  return _changeLeaseDeserialize(result);
}

export function _breakLeaseSend(
  context: Client,
  options: BreakLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=lease&restype=container&break{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version,
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Break Lease operation ends a lease and ensures that another client can't acquire a new lease until the current lease period has expired. */
export async function breakLease(
  context: Client,
  options: BreakLeaseOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _breakLeaseSend(context, options);
  return _breakLeaseDeserialize(result);
}

export function _renewLeaseSend(
  context: Client,
  leaseId: string,
  options: RenewLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=lease&restype=container&renew{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version,
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Renew Lease operation renews an existing lease. */
export async function renewLease(
  context: Client,
  leaseId: string,
  options: RenewLeaseOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _renewLeaseSend(context, leaseId, options);
  return _renewLeaseDeserialize(result);
}

export function _releaseLeaseSend(
  context: Client,
  leaseId: string,
  options: ReleaseLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=lease&restype=container&release{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version,
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Release Lease operation frees the lease if it's no longer needed, so that another client can immediately acquire a lease against the container. */
export async function releaseLease(
  context: Client,
  leaseId: string,
  options: ReleaseLeaseOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _releaseLeaseSend(context, leaseId, options);
  return _releaseLeaseDeserialize(result);
}

export function _acquireLeaseSend(
  context: Client,
  duration: number,
  options: AcquireLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=lease&restype=container&acquire{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version,
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Acquire Lease operation requests a new lease on a container. The lease lock duration can be 15 to 60 seconds, or can be infinite. */
export async function acquireLease(
  context: Client,
  duration: number,
  options: AcquireLeaseOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _acquireLeaseSend(context, duration, options);
  return _acquireLeaseDeserialize(result);
}

export function _findBlobsByTagsSend(
  context: Client,
  filterExpression: string,
  options: FindBlobsByTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=container&comp=blobs{?timeout,where,marker,maxresults,include}",
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
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version,
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return filterBlobSegmentXmlDeserializer(result.body);
}

/** The Filter Blobs operation enables callers to list blobs in a container whose tags match a given search expression.  Filter blobs searches within the given container. */
export async function findBlobsByTags(
  context: Client,
  filterExpression: string,
  options: FindBlobsByTagsOptionalParams = { requestOptions: {} },
): Promise<FilterBlobSegment> {
  const result = await _findBlobsByTagsSend(context, filterExpression, options);
  return _findBlobsByTagsDeserialize(result);
}

export function _submitBatchSend(
  context: Client,
  body: {
    name: string;
    body: Uint8Array;
  },
  contentLength: number,
  options: SubmitBatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=container&comp=batch{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "multipart/mixed",
      headers: {
        "content-length": contentLength,
        "x-ms-version": context.version,
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return _submitBatchRequestDeserializer(result.body) as any;
}

/** The Batch operation allows multiple API calls to be embedded into a single HTTP request. */
export async function submitBatch(
  context: Client,
  body: {
    name: string;
    body: Uint8Array;
  },
  contentLength: number,
  options: SubmitBatchOptionalParams = { requestOptions: {} },
): Promise<{
  name: string;
  body: Uint8Array;
}> {
  const result = await _submitBatchSend(context, body, contentLength, options);
  return _submitBatchDeserialize(result);
}

export function _renameSend(
  context: Client,
  sourceContainerName: string,
  options: RenameOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=container&comp=rename{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version,
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Renames an existing container. */
export async function rename(
  context: Client,
  sourceContainerName: string,
  options: RenameOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _renameSend(context, sourceContainerName, options);
  return _renameDeserialize(result);
}

export function _restoreSend(
  context: Client,
  options: RestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=container&comp=undelete{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version,
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Restores a previously-deleted container. */
export async function restore(
  context: Client,
  options: RestoreOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _restoreSend(context, options);
  return _restoreDeserialize(result);
}

export function _setAccessPolicySend(
  context: Client,
  containerAcl: SignedIdentifiers,
  options: SetAccessPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=container&comp=acl{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version,
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** sets the permissions for the specified container. The permissions indicate whether blobs in a container may be accessed publicly. */
export async function setAccessPolicy(
  context: Client,
  containerAcl: SignedIdentifiers,
  options: SetAccessPolicyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _setAccessPolicySend(context, containerAcl, options);
  return _setAccessPolicyDeserialize(result);
}

export function _getAccessPolicySend(
  context: Client,
  options: GetAccessPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=container&comp=acl{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version,
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return signedIdentifiersXmlDeserializer(result.body);
}

/** gets the permissions for the specified container. The permissions indicate whether container data may be accessed publicly. */
export async function getAccessPolicy(
  context: Client,
  options: GetAccessPolicyOptionalParams = { requestOptions: {} },
): Promise<SignedIdentifiers> {
  const result = await _getAccessPolicySend(context, options);
  return _getAccessPolicyDeserialize(result);
}

export function _setMetadataSend(
  context: Client,
  metadata: string,
  options: SetMetadataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=container&comp=metadata{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version,
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        "x-ms-meta": metadata,
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** operation sets one or more user-defined name-value pairs for the specified container. */
export async function setMetadata(
  context: Client,
  metadata: string,
  options: SetMetadataOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _setMetadataSend(context, metadata, options);
  return _setMetadataDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  options: DeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=container{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version,
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** operation marks the specified container for deletion. The container and any blobs contained within it are later deleted during garbage collection */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  options: DeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, options);
  return _$deleteDeserialize(result);
}

export function _getPropertiesSend(
  context: Client,
  options: GetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=container{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version,
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** returns all user-defined metadata and system properties for the specified container. The data returned does not include the container's list of blobs */
export async function getProperties(
  context: Client,
  options: GetPropertiesOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getPropertiesSend(context, options);
  return _getPropertiesDeserialize(result);
}

export function _createSend(
  context: Client,
  options: CreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=container{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version,
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Creates a new container under the specified account. If the container with the same name already exists, the operation fails. */
export async function create(
  context: Client,
  options: CreateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _createSend(context, options);
  return _createDeserialize(result);
}
