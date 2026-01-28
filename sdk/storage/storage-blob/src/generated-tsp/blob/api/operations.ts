// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobContext as Client } from "./index.js";
import {
  storageErrorDeserializer,
  BlobTags,
  blobTagsXmlSerializer,
  blobTagsXmlDeserializer,
  AccessTier,
  BlobExpiryOptions,
} from "../../models/azure/storage/blobs/models.js";
import { getBinaryResponse } from "../../static-helpers/serialization/get-binary-response.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SetTagsOptionalParams,
  GetTagsOptionalParams,
  GetAccountInfoOptionalParams,
  SetTierOptionalParams,
  AbortCopyFromUrlOptionalParams,
  CopyFromUrlOptionalParams,
  StartCopyFromUrlOptionalParams,
  CreateSnapshotOptionalParams,
  BreakLeaseOptionalParams,
  ChangeLeaseOptionalParams,
  RenewLeaseOptionalParams,
  ReleaseLeaseOptionalParams,
  AcquireLeaseOptionalParams,
  SetMetadataOptionalParams,
  SetLegalHoldOptionalParams,
  DeleteImmutabilityPolicyOptionalParams,
  SetImmutabilityPolicyOptionalParams,
  SetPropertiesOptionalParams,
  SetExpiryOptionalParams,
  UndeleteOptionalParams,
  DeleteOptionalParams,
  GetPropertiesOptionalParams,
  DownloadOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { uint8ArrayToString } from "@azure/core-util";

export function _setTagsSend(
  context: Client,
  tags: BlobTags,
  options: SetTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=tags{?timeout,versionid}",
    {
      timeout: options?.timeout,
      versionid: options?.versionId,
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
        ...(options?.transactionalContentMD5 !== undefined
          ? {
              "content-md5": !options?.transactionalContentMD5
                ? options?.transactionalContentMD5
                : uint8ArrayToString(options?.transactionalContentMD5, "base64"),
            }
          : {}),
        ...(options?.transactionalContentCrc64 !== undefined
          ? {
              "x-ms-content-crc64": !options?.transactionalContentCrc64
                ? options?.transactionalContentCrc64
                : uint8ArrayToString(options?.transactionalContentCrc64, "base64"),
            }
          : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.ifModifiedSince !== undefined
          ? {
              "x-ms-blob-if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "x-ms-blob-if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifMatch !== undefined ? { "x-ms-blob-if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined
          ? { "x-ms-blob-if-none-match": options?.ifNoneMatch }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: blobTagsXmlSerializer(tags),
    });
}

export async function _setTagsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Set Tags operation enables users to set tags on a blob. */
export async function setTags(
  context: Client,
  tags: BlobTags,
  options: SetTagsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _setTagsSend(context, tags, options);
  return _setTagsDeserialize(result);
}

export function _getTagsSend(
  context: Client,
  options: GetTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=tags{?timeout,snapshot,versionid}",
    {
      timeout: options?.timeout,
      snapshot: options?.snapshot,
      versionid: options?.versionId,
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
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        ...(options?.ifModifiedSince !== undefined
          ? {
              "x-ms-blob-if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "x-ms-blob-if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifMatch !== undefined ? { "x-ms-blob-if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined
          ? { "x-ms-blob-if-none-match": options?.ifNoneMatch }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getTagsDeserialize(result: PathUncheckedResponse): Promise<BlobTags> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return blobTagsXmlDeserializer(result.body);
}

/** The Get Blob Tags operation enables users to get tags on a blob. */
export async function getTags(
  context: Client,
  options: GetTagsOptionalParams = { requestOptions: {} },
): Promise<BlobTags> {
  const result = await _getTagsSend(context, options);
  return _getTagsDeserialize(result);
}

export function _getAccountInfoSend(
  context: Client,
  options: GetAccountInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=account&comp=properties&blob{?timeout}",
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

export function _setTierSend(
  context: Client,
  tier: AccessTier,
  options: SetTierOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=tier{?snapshot,versionid,timeout}",
    {
      snapshot: options?.snapshot,
      versionid: options?.versionId,
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
        "x-ms-access-tier": tier,
        ...(options?.rehydratePriority !== undefined
          ? { "x-ms-rehydrate-priority": options?.rehydratePriority }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setTierDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Set Tier operation sets the tier on a block blob. The operation is allowed on a page blob or block blob, but not on an append blob. A block blob's tier determines Hot/Cool/Archive storage type. This operation does not update the blob's ETag. */
export async function setTier(
  context: Client,
  tier: AccessTier,
  options: SetTierOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _setTierSend(context, tier, options);
  return _setTierDeserialize(result);
}

export function _abortCopyFromUrlSend(
  context: Client,
  copyId: string,
  options: AbortCopyFromUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=copy&copyid{?timeout,copyid}",
    {
      timeout: options?.timeout,
      copyid: copyId,
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
        "x-ms-copy-action": "abort",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _abortCopyFromUrlDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Abort Copy From URL operation aborts a pending Copy From URL operation, and leaves a destination blob with zero length and full metadata. */
export async function abortCopyFromUrl(
  context: Client,
  copyId: string,
  options: AbortCopyFromUrlOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _abortCopyFromUrlSend(context, copyId, options);
  return _abortCopyFromUrlDeserialize(result);
}

export function _copyFromUrlSend(
  context: Client,
  copySource: string,
  options: CopyFromUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=copy&sync{?timeout}",
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
        ...(options?.tier !== undefined ? { "x-ms-access-tier": options?.tier } : {}),
        ...(options?.sourceIfModifiedSince !== undefined
          ? {
              "x-ms-source-if-modified-since": !options?.sourceIfModifiedSince
                ? options?.sourceIfModifiedSince
                : options?.sourceIfModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.sourceIfUnmodifiedSince !== undefined
          ? {
              "x-ms-source-if-unmodified-since": !options?.sourceIfUnmodifiedSince
                ? options?.sourceIfUnmodifiedSince
                : options?.sourceIfUnmodifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.sourceIfMatch !== undefined
          ? { "x-ms-source-if-match": options?.sourceIfMatch }
          : {}),
        ...(options?.sourceIfNoneMatch !== undefined
          ? { "x-ms-source-if-none-match": options?.sourceIfNoneMatch }
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
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        "x-ms-copy-source": copySource,
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.sourceContentMd5 !== undefined
          ? {
              "x-ms-source-content-md5": !options?.sourceContentMd5
                ? options?.sourceContentMd5
                : uint8ArrayToString(options?.sourceContentMd5, "base64"),
            }
          : {}),
        ...(options?.blobTagsString !== undefined ? { "x-ms-tags": options?.blobTagsString } : {}),
        ...(options?.immutabilityPolicyExpiry !== undefined
          ? {
              "x-ms-immutability-policy-until-date": !options?.immutabilityPolicyExpiry
                ? options?.immutabilityPolicyExpiry
                : options?.immutabilityPolicyExpiry.toUTCString(),
            }
          : {}),
        ...(options?.immutabilityPolicyMode !== undefined
          ? { "x-ms-immutability-policy-mode": options?.immutabilityPolicyMode }
          : {}),
        ...(options?.legalHold !== undefined ? { "x-ms-legal-hold": options?.legalHold } : {}),
        ...(options?.copySourceAuthorization !== undefined
          ? { "x-ms-copy-source-authorization": options?.copySourceAuthorization }
          : {}),
        ...(options?.encryptionScope !== undefined
          ? { "x-ms-encryption-scope": options?.encryptionScope }
          : {}),
        ...(options?.copySourceTags !== undefined
          ? { "x-ms-copy-source-tag-option": options?.copySourceTags }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        "x-ms-requires-sync": "true",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _copyFromUrlDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Copy From URL operation copies a blob or an internet resource to a new blob. It will not return a response until the copy is complete. */
export async function copyFromUrl(
  context: Client,
  copySource: string,
  options: CopyFromUrlOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _copyFromUrlSend(context, copySource, options);
  return _copyFromUrlDeserialize(result);
}

export function _startCopyFromUrlSend(
  context: Client,
  copySource: string,
  options: StartCopyFromUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{?timeout}",
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
        ...(options?.tier !== undefined ? { "x-ms-access-tier": options?.tier } : {}),
        ...(options?.rehydratePriority !== undefined
          ? { "x-ms-rehydrate-priority": options?.rehydratePriority }
          : {}),
        ...(options?.sourceIfModifiedSince !== undefined
          ? {
              "x-ms-source-if-modified-since": !options?.sourceIfModifiedSince
                ? options?.sourceIfModifiedSince
                : options?.sourceIfModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.sourceIfUnmodifiedSince !== undefined
          ? {
              "x-ms-source-if-unmodified-since": !options?.sourceIfUnmodifiedSince
                ? options?.sourceIfUnmodifiedSince
                : options?.sourceIfUnmodifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.sourceIfMatch !== undefined
          ? { "x-ms-source-if-match": options?.sourceIfMatch }
          : {}),
        ...(options?.sourceIfNoneMatch !== undefined
          ? { "x-ms-source-if-none-match": options?.sourceIfNoneMatch }
          : {}),
        ...(options?.sourceIfTags !== undefined
          ? { "x-ms-source-if-tags": options?.sourceIfTags }
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
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        "x-ms-copy-source": copySource,
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.blobTagsString !== undefined ? { "x-ms-tags": options?.blobTagsString } : {}),
        ...(options?.sealBlob !== undefined ? { "x-ms-seal-blob": options?.sealBlob } : {}),
        ...(options?.immutabilityPolicyExpiry !== undefined
          ? {
              "x-ms-immutability-policy-until-date": !options?.immutabilityPolicyExpiry
                ? options?.immutabilityPolicyExpiry
                : options?.immutabilityPolicyExpiry.toUTCString(),
            }
          : {}),
        ...(options?.immutabilityPolicyMode !== undefined
          ? { "x-ms-immutability-policy-mode": options?.immutabilityPolicyMode }
          : {}),
        ...(options?.legalHold !== undefined ? { "x-ms-legal-hold": options?.legalHold } : {}),
        "x-ms-requires-sync": true,
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _startCopyFromUrlDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Start Copy From URL operation copies a blob or an internet resource to a new blob. */
export async function startCopyFromUrl(
  context: Client,
  copySource: string,
  options: StartCopyFromUrlOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _startCopyFromUrlSend(context, copySource, options);
  return _startCopyFromUrlDeserialize(result);
}

export function _createSnapshotSend(
  context: Client,
  options: CreateSnapshotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=snapshot{?timeout}",
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
        ...(options?.encryptionKey !== undefined
          ? { "x-ms-encryption-key": options?.encryptionKey }
          : {}),
        ...(options?.encryptionKeySha256 !== undefined
          ? { "x-ms-encryption-key-sha256": options?.encryptionKeySha256 }
          : {}),
        ...(options?.encryptionAlgorithm !== undefined
          ? { "x-ms-encryption-algorithm": options?.encryptionAlgorithm }
          : {}),
        ...(options?.encryptionScope !== undefined
          ? { "x-ms-encryption-scope": options?.encryptionScope }
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
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _createSnapshotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Create Snapshot operation creates a read-only snapshot of a blob */
export async function createSnapshot(
  context: Client,
  options: CreateSnapshotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _createSnapshotSend(context, options);
  return _createSnapshotDeserialize(result);
}

export function _breakLeaseSend(
  context: Client,
  options: BreakLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=lease&break{?timeout}",
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
        ...(options?.breakPeriod !== undefined
          ? { "x-ms-lease-break-period": options?.breakPeriod }
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
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
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

export function _changeLeaseSend(
  context: Client,
  leaseId: string,
  proposedLeaseId: string,
  options: ChangeLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=lease&change{?timeout}",
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
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
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

export function _renewLeaseSend(
  context: Client,
  leaseId: string,
  options: RenewLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=lease&renew{?timeout}",
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
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
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
    "/?comp=lease&release{?timeout}",
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
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
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

/** The Release Lease operation frees the lease if it's no longer needed, so that another client can immediately acquire a lease against the blob. */
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
    "/?comp=lease&acquire{?timeout}",
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
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
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

/** The Acquire Lease operation requests a new lease on a blob. The lease lock duration can be 15 to 60 seconds, or can be infinite. */
export async function acquireLease(
  context: Client,
  duration: number,
  options: AcquireLeaseOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _acquireLeaseSend(context, duration, options);
  return _acquireLeaseDeserialize(result);
}

export function _setMetadataSend(
  context: Client,
  metadata: string,
  options: SetMetadataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=metadata{?timeout}",
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
        "x-ms-meta": metadata,
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.encryptionKey !== undefined
          ? { "x-ms-encryption-key": options?.encryptionKey }
          : {}),
        ...(options?.encryptionKeySha256 !== undefined
          ? { "x-ms-encryption-key-sha256": options?.encryptionKeySha256 }
          : {}),
        ...(options?.encryptionAlgorithm !== undefined
          ? { "x-ms-encryption-algorithm": options?.encryptionAlgorithm }
          : {}),
        ...(options?.encryptionScope !== undefined
          ? { "x-ms-encryption-scope": options?.encryptionScope }
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
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
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

/** The Set Metadata operation sets user-defined metadata for the specified blob as one or more name-value pairs. */
export async function setMetadata(
  context: Client,
  metadata: string,
  options: SetMetadataOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _setMetadataSend(context, metadata, options);
  return _setMetadataDeserialize(result);
}

export function _setLegalHoldSend(
  context: Client,
  legalHold: boolean,
  options: SetLegalHoldOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=legalhold{?timeout,snapshot,versionid}",
    {
      timeout: options?.timeout,
      snapshot: options?.snapshot,
      versionid: options?.versionId,
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
        "x-ms-legal-hold": legalHold,
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setLegalHoldDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Set Legal Hold operation sets a legal hold on the blob. */
export async function setLegalHold(
  context: Client,
  legalHold: boolean,
  options: SetLegalHoldOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _setLegalHoldSend(context, legalHold, options);
  return _setLegalHoldDeserialize(result);
}

export function _deleteImmutabilityPolicySend(
  context: Client,
  options: DeleteImmutabilityPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=immutabilityPolicies{?timeout,snapshot,versionid}",
    {
      timeout: options?.timeout,
      snapshot: options?.snapshot,
      versionid: options?.versionId,
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteImmutabilityPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Delete Immutability Policy operation deletes the immutability policy on the blob. */
export async function deleteImmutabilityPolicy(
  context: Client,
  options: DeleteImmutabilityPolicyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteImmutabilityPolicySend(context, options);
  return _deleteImmutabilityPolicyDeserialize(result);
}

export function _setImmutabilityPolicySend(
  context: Client,
  expiry: Date,
  options: SetImmutabilityPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=immutabilityPolicies{?timeout,snapshot,versionid}",
    {
      timeout: options?.timeout,
      snapshot: options?.snapshot,
      versionid: options?.versionId,
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
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        "x-ms-immutability-policy-until-date": expiry.toUTCString(),
        ...(options?.immutabilityPolicyMode !== undefined
          ? { "x-ms-immutability-policy-mode": options?.immutabilityPolicyMode }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setImmutabilityPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Set the immutability policy of a blob */
export async function setImmutabilityPolicy(
  context: Client,
  expiry: Date,
  options: SetImmutabilityPolicyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _setImmutabilityPolicySend(context, expiry, options);
  return _setImmutabilityPolicyDeserialize(result);
}

export function _setPropertiesSend(
  context: Client,
  options: SetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=properties&SetHTTPHeaders{?timeout}",
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
        ...(options?.blobCacheControl !== undefined
          ? { "x-ms-blob-cache-control": options?.blobCacheControl }
          : {}),
        ...(options?.blobContentType !== undefined
          ? { "x-ms-blob-content-type": options?.blobContentType }
          : {}),
        ...(options?.blobContentMd5 !== undefined
          ? {
              "x-ms-blob-content-md5": !options?.blobContentMd5
                ? options?.blobContentMd5
                : uint8ArrayToString(options?.blobContentMd5, "base64"),
            }
          : {}),
        ...(options?.blobContentEncoding !== undefined
          ? { "x-ms-blob-content-encoding": options?.blobContentEncoding }
          : {}),
        ...(options?.blobContentLanguage !== undefined
          ? { "x-ms-blob-content-language": options?.blobContentLanguage }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.blobContentDisposition !== undefined
          ? { "x-ms-blob-content-disposition": options?.blobContentDisposition }
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
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setPropertiesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Set HTTP Headers operation sets system properties on the blob. */
export async function setProperties(
  context: Client,
  options: SetPropertiesOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _setPropertiesSend(context, options);
  return _setPropertiesDeserialize(result);
}

export function _setExpirySend(
  context: Client,
  expiryOptions: BlobExpiryOptions,
  options: SetExpiryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=expiry{?timeout}",
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
        "x-ms-expiry-option": expiryOptions,
        ...(options?.expiresOn !== undefined
          ? {
              "x-ms-expiry-time": !options?.expiresOn
                ? options?.expiresOn
                : options?.expiresOn.toUTCString(),
            }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setExpiryDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Set the expiration time of a blob */
export async function setExpiry(
  context: Client,
  expiryOptions: BlobExpiryOptions,
  options: SetExpiryOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _setExpirySend(context, expiryOptions, options);
  return _setExpiryDeserialize(result);
}

export function _undeleteSend(
  context: Client,
  options: UndeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=undelete{?timeout}",
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _undeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Undelete a blob that was previously soft deleted */
export async function undelete(
  context: Client,
  options: UndeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _undeleteSend(context, options);
  return _undeleteDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  options: DeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{?snapshot,versionid,timeout,deletetype}",
    {
      snapshot: options?.snapshot,
      versionid: options?.versionId,
      timeout: options?.timeout,
      deletetype: options?.blobDeleteType,
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
        ...(options?.deleteSnapshots !== undefined
          ? { "x-ms-delete-snapshots": options?.deleteSnapshots }
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
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        ...(options?.accessTierIfModifiedSince !== undefined
          ? {
              "x-ms-access-tier-if-modified-since": !options?.accessTierIfModifiedSince
                ? options?.accessTierIfModifiedSince
                : options?.accessTierIfModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.accessTierIfUnmodifiedSince !== undefined
          ? {
              "x-ms-access-tier-if-unmodified-since": !options?.accessTierIfUnmodifiedSince
                ? options?.accessTierIfUnmodifiedSince
                : options?.accessTierIfUnmodifiedSince.toUTCString(),
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

/** If the storage account's soft delete feature is disabled then, when a blob is deleted, it is permanently removed from the storage account. If the storage account's soft delete feature is enabled, then, when a blob is deleted, it is marked for deletion and becomes inaccessible immediately. However, the blob service retains the blob or snapshot for the number of days specified by the DeleteRetentionPolicy section of [Storage service properties] (Set-Blob-Service-Properties.md). After the specified number of days has passed, the blob's data is permanently removed from the storage account. Note that you continue to be charged for the soft-deleted blob's storage until it is permanently removed. Use the List Blobs API and specify the \"include=deleted\" query parameter to discover which blobs and snapshots have been soft deleted. You can then use the Undelete Blob API to restore a soft-deleted blob. All other operations on a soft-deleted blob or snapshot causes the service to return an HTTP status code of 404 (ResourceNotFound). */
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
    "/{?snapshot,versionid,timeout}",
    {
      snapshot: options?.snapshot,
      versionid: options?.versionId,
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .head({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version,
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.encryptionKey !== undefined
          ? { "x-ms-encryption-key": options?.encryptionKey }
          : {}),
        ...(options?.encryptionKeySha256 !== undefined
          ? { "x-ms-encryption-key-sha256": options?.encryptionKeySha256 }
          : {}),
        ...(options?.encryptionAlgorithm !== undefined
          ? { "x-ms-encryption-algorithm": options?.encryptionAlgorithm }
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
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
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

/** The Get Properties operation returns all user-defined metadata, standard HTTP properties, and system properties for the blob. It does not return the content of the blob. */
export async function getProperties(
  context: Client,
  options: GetPropertiesOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getPropertiesSend(context, options);
  return _getPropertiesDeserialize(result);
}

export function _downloadSend(
  context: Client,
  options: DownloadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{?snapshot,versionid,timeout}",
    {
      snapshot: options?.snapshot,
      versionid: options?.versionId,
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
      headers: {
        "x-ms-version": context.version,
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.range !== undefined ? { range: options?.range } : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.rangeGetContentMd5 !== undefined
          ? { "x-ms-range-get-content-md5": options?.rangeGetContentMd5 }
          : {}),
        ...(options?.rangeGetContentCrc64 !== undefined
          ? { "x-ms-range-get-content-crc64": options?.rangeGetContentCrc64 }
          : {}),
        ...(options?.structuredBodyType !== undefined
          ? { "x-ms-structured-body": options?.structuredBodyType }
          : {}),
        ...(options?.encryptionKey !== undefined
          ? { "x-ms-encryption-key": options?.encryptionKey }
          : {}),
        ...(options?.encryptionKeySha256 !== undefined
          ? { "x-ms-encryption-key-sha256": options?.encryptionKeySha256 }
          : {}),
        ...(options?.encryptionAlgorithm !== undefined
          ? { "x-ms-encryption-algorithm": options?.encryptionAlgorithm }
          : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        accept: "application/octet-stream",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _downloadDeserialize(result: PathUncheckedResponse): Promise<Uint8Array> {
  const expectedStatuses = ["200", "206"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return result.body;
}

/** The Download operation reads or downloads a blob from the system, including its metadata and properties. You can also call Download to read a snapshot. */
export async function download(
  context: Client,
  options: DownloadOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const streamableMethod = _downloadSend(context, options);
  const result = await getBinaryResponse(streamableMethod);
  return _downloadDeserialize(result);
}
