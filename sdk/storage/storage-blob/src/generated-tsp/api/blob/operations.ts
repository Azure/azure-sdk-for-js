// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobContext as Client } from "../index.js";
import {
  errorXmlDeserializer,
  LeaseStatus,
  LeaseState,
  LeaseDuration,
  BlobTags,
  blobTagsXmlSerializer,
  blobTagsXmlDeserializer,
  BlobTag,
  BlobType,
  CopyStatus,
  AccessTier,
  ArchiveStatus,
  RehydratePriority,
  ImmutabilityPolicyMode,
  SkuName,
  AccountKind,
  BlobExpiryOptions,
} from "../../models/azure/storage/blobs/models.js";
import { getBinaryResponse } from "../../static-helpers/serialization/get-binary-response.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  BlobSetTagsOptionalParams,
  BlobGetTagsOptionalParams,
  BlobGetAccountInfoOptionalParams,
  BlobSetTierOptionalParams,
  BlobAbortCopyFromUrlOptionalParams,
  BlobCopyFromUrlOptionalParams,
  BlobStartCopyFromUrlOptionalParams,
  BlobCreateSnapshotOptionalParams,
  BlobBreakLeaseOptionalParams,
  BlobChangeLeaseOptionalParams,
  BlobRenewLeaseOptionalParams,
  BlobReleaseLeaseOptionalParams,
  BlobAcquireLeaseOptionalParams,
  BlobSetMetadataOptionalParams,
  BlobSetLegalHoldOptionalParams,
  BlobDeleteImmutabilityPolicyOptionalParams,
  BlobSetImmutabilityPolicyOptionalParams,
  BlobSetPropertiesOptionalParams,
  BlobSetExpiryOptionalParams,
  BlobUndeleteOptionalParams,
  BlobDeleteOptionalParams,
  BlobGetPropertiesOptionalParams,
  BlobDownloadOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

export function _setTagsSend(
  context: Client,
  tags: BlobTags,
  options: BlobSetTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=tags{?timeout,versionid}",
    {
      timeout: options?.timeout,
      versionid: options?.versionId,
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
        ...options.requestOptions?.headers,
      },
      body: blobTagsXmlSerializer(tags),
    });
}

export async function _setTagsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _setTagsDeserializeHeaders(result: PathUncheckedResponse): {
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

/** The Set Tags operation enables users to set tags on a blob. */
export async function setTags(
  context: Client,
  tags: BlobTags,
  options: BlobSetTagsOptionalParams = { requestOptions: {} },
): Promise<{ date: Date; version: string; requestId?: string; clientRequestId?: string }> {
  const result = await _setTagsSend(context, tags, options);
  const headers = _setTagsDeserializeHeaders(result);
  await _setTagsDeserialize(result);
  return { ...headers };
}

export function _getTagsSend(
  context: Client,
  options: BlobGetTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=tags{?timeout,snapshot,versionid}",
    {
      timeout: options?.timeout,
      snapshot: options?.snapshot,
      versionid: options?.versionId,
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
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getTagsDeserialize(result: PathUncheckedResponse): Promise<BlobTags> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return blobTagsXmlDeserializer(result.body);
}

export function _getTagsDeserializeHeaders(result: PathUncheckedResponse): {
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

/** The Get Blob Tags operation enables users to get tags on a blob. */
export async function getTags(
  context: Client,
  options: BlobGetTagsOptionalParams = { requestOptions: {} },
): Promise<{
  blobTagSet: BlobTag[];
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _getTagsSend(context, options);
  const headers = _getTagsDeserializeHeaders(result);
  const payload = await _getTagsDeserialize(result);
  return { ...payload, ...headers };
}

export function _getAccountInfoSend(
  context: Client,
  options: BlobGetAccountInfoOptionalParams = { requestOptions: {} },
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
  accountKind?: AccountKind;
  skuName?: SkuName;
  isHierarchicalNamespaceEnabled?: boolean;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    accountKind: result.headers["x-ms-account-kind"] as any,
    skuName: result.headers["x-ms-sku-name"] as any,
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
  options: BlobGetAccountInfoOptionalParams = { requestOptions: {} },
): Promise<{
  accountKind?: AccountKind;
  skuName?: SkuName;
  isHierarchicalNamespaceEnabled?: boolean;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _getAccountInfoSend(context, options);
  const headers = _getAccountInfoDeserializeHeaders(result);
  await _getAccountInfoDeserialize(result);
  return { ...headers };
}

export function _setTierSend(
  context: Client,
  tier: AccessTier,
  options: BlobSetTierOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=tier{?snapshot,versionid,timeout}",
    {
      snapshot: options?.snapshot,
      versionid: options?.versionId,
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
        "x-ms-access-tier": tier,
        ...(options?.rehydratePriority !== undefined
          ? { "x-ms-rehydrate-priority": options?.rehydratePriority }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setTierDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _setTierDeserializeHeaders(result: PathUncheckedResponse): {
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

/** The Set Tier operation sets the tier on a block blob. The operation is allowed on a page blob or block blob, but not on an append blob. A block blob's tier determines Hot/Cool/Archive storage type. This operation does not update the blob's ETag. */
export async function setTier(
  context: Client,
  tier: AccessTier,
  options: BlobSetTierOptionalParams = { requestOptions: {} },
): Promise<{ date: Date; version: string; requestId?: string; clientRequestId?: string }> {
  const result = await _setTierSend(context, tier, options);
  const headers = _setTierDeserializeHeaders(result);
  await _setTierDeserialize(result);
  return { ...headers };
}

export function _abortCopyFromUrlSend(
  context: Client,
  copyId: string,
  options: BlobAbortCopyFromUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=copy{?timeout,copyid}",
    {
      timeout: options?.timeout,
      copyid: copyId,
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
        "x-ms-copy-action": "abort",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _abortCopyFromUrlDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _abortCopyFromUrlDeserializeHeaders(result: PathUncheckedResponse): {
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

/** The Abort Copy From URL operation aborts a pending Copy From URL operation, and leaves a destination blob with zero length and full metadata. */
export async function abortCopyFromUrl(
  context: Client,
  copyId: string,
  options: BlobAbortCopyFromUrlOptionalParams = { requestOptions: {} },
): Promise<{ date: Date; version: string; requestId?: string; clientRequestId?: string }> {
  const result = await _abortCopyFromUrlSend(context, copyId, options);
  const headers = _abortCopyFromUrlDeserializeHeaders(result);
  await _abortCopyFromUrlDeserialize(result);
  return { ...headers };
}

export function _copyFromUrlSend(
  context: Client,
  copySource: string,
  options: BlobCopyFromUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=copy{?timeout}",
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
        ...(options?.sourceContentMD5 !== undefined
          ? {
              "x-ms-source-content-md5": !options?.sourceContentMD5
                ? options?.sourceContentMD5
                : uint8ArrayToString(options?.sourceContentMD5, "base64"),
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _copyFromUrlDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _copyFromUrlDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  versionId: string;
  copyId?: string;
  copyStatus?: "success";
  contentMD5: Uint8Array;
  contentCrc64?: Uint8Array;
  encryptionScope?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    versionId: result.headers["x-ms-version-id"],
    copyId:
      result.headers["x-ms-copy-id"] === undefined || result.headers["x-ms-copy-id"] === null
        ? result.headers["x-ms-copy-id"]
        : result.headers["x-ms-copy-id"],
    copyStatus: result.headers["x-ms-copy-status"] as any,
    contentMD5:
      typeof result.headers["content-md5"] === "string"
        ? stringToUint8Array(result.headers["content-md5"], "base64")
        : result.headers["content-md5"],
    contentCrc64:
      result.headers["x-ms-content-crc64"] === undefined ||
      result.headers["x-ms-content-crc64"] === null
        ? result.headers["x-ms-content-crc64"]
        : typeof result.headers["x-ms-content-crc64"] === "string"
          ? stringToUint8Array(result.headers["x-ms-content-crc64"], "base64")
          : result.headers["x-ms-content-crc64"],
    encryptionScope:
      result.headers["x-ms-encryption-scope"] === undefined ||
      result.headers["x-ms-encryption-scope"] === null
        ? result.headers["x-ms-encryption-scope"]
        : result.headers["x-ms-encryption-scope"],
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

/** The Copy From URL operation copies a blob or an internet resource to a new blob. It will not return a response until the copy is complete. */
export async function copyFromUrl(
  context: Client,
  copySource: string,
  options: BlobCopyFromUrlOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  versionId: string;
  copyId?: string;
  copyStatus?: "success";
  contentMD5: Uint8Array;
  contentCrc64?: Uint8Array;
  encryptionScope?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _copyFromUrlSend(context, copySource, options);
  const headers = _copyFromUrlDeserializeHeaders(result);
  await _copyFromUrlDeserialize(result);
  return { ...headers };
}

export function _startCopyFromUrlSend(
  context: Client,
  copySource: string,
  options: BlobStartCopyFromUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?timeout}",
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _startCopyFromUrlDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _startCopyFromUrlDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  versionId: string;
  copyId?: string;
  copyStatus?: CopyStatus;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    versionId: result.headers["x-ms-version-id"],
    copyId:
      result.headers["x-ms-copy-id"] === undefined || result.headers["x-ms-copy-id"] === null
        ? result.headers["x-ms-copy-id"]
        : result.headers["x-ms-copy-id"],
    copyStatus: result.headers["x-ms-copy-status"] as any,
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

/** The Start Copy From URL operation copies a blob or an internet resource to a new blob. */
export async function startCopyFromUrl(
  context: Client,
  copySource: string,
  options: BlobStartCopyFromUrlOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  versionId: string;
  copyId?: string;
  copyStatus?: CopyStatus;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _startCopyFromUrlSend(context, copySource, options);
  const headers = _startCopyFromUrlDeserializeHeaders(result);
  await _startCopyFromUrlDeserialize(result);
  return { ...headers };
}

export function _createSnapshotSend(
  context: Client,
  options: BlobCreateSnapshotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=snapshot{?timeout}",
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _createSnapshotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
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
  snapshot?: string;
  etag: string;
  lastModified: Date;
  versionId: string;
  isServerEncrypted?: boolean;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    snapshot:
      result.headers["x-ms-snapshot"] === undefined || result.headers["x-ms-snapshot"] === null
        ? result.headers["x-ms-snapshot"]
        : result.headers["x-ms-snapshot"],
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    versionId: result.headers["x-ms-version-id"],
    isServerEncrypted:
      result.headers["x-ms-request-server-encrypted"] === undefined ||
      result.headers["x-ms-request-server-encrypted"] === null
        ? result.headers["x-ms-request-server-encrypted"]
        : result.headers["x-ms-request-server-encrypted"].trim().toLowerCase() === "true",
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

/** The Create Snapshot operation creates a read-only snapshot of a blob */
export async function createSnapshot(
  context: Client,
  options: BlobCreateSnapshotOptionalParams = { requestOptions: {} },
): Promise<{
  snapshot?: string;
  etag: string;
  lastModified: Date;
  versionId: string;
  isServerEncrypted?: boolean;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _createSnapshotSend(context, options);
  const headers = _createSnapshotDeserializeHeaders(result);
  await _createSnapshotDeserialize(result);
  return { ...headers };
}

export function _breakLeaseSend(
  context: Client,
  options: BlobBreakLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=lease{?timeout}",
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _breakLeaseDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
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
  leaseTime?: number;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    leaseTime:
      result.headers["x-ms-lease-time"] === undefined || result.headers["x-ms-lease-time"] === null
        ? result.headers["x-ms-lease-time"]
        : Number(result.headers["x-ms-lease-time"]),
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
  options: BlobBreakLeaseOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  leaseTime?: number;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _breakLeaseSend(context, options);
  const headers = _breakLeaseDeserializeHeaders(result);
  await _breakLeaseDeserialize(result);
  return { ...headers };
}

export function _changeLeaseSend(
  context: Client,
  leaseId: string,
  proposedLeaseId: string,
  options: BlobChangeLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=lease{?timeout}",
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
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
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
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    leaseId:
      result.headers["x-ms-lease-id"] === undefined || result.headers["x-ms-lease-id"] === null
        ? result.headers["x-ms-lease-id"]
        : result.headers["x-ms-lease-id"],
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
  options: BlobChangeLeaseOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  leaseId?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _changeLeaseSend(context, leaseId, proposedLeaseId, options);
  const headers = _changeLeaseDeserializeHeaders(result);
  await _changeLeaseDeserialize(result);
  return { ...headers };
}

export function _renewLeaseSend(
  context: Client,
  leaseId: string,
  options: BlobRenewLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=lease{?timeout}",
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
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
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
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    leaseId:
      result.headers["x-ms-lease-id"] === undefined || result.headers["x-ms-lease-id"] === null
        ? result.headers["x-ms-lease-id"]
        : result.headers["x-ms-lease-id"],
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
  options: BlobRenewLeaseOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  leaseId?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _renewLeaseSend(context, leaseId, options);
  const headers = _renewLeaseDeserializeHeaders(result);
  await _renewLeaseDeserialize(result);
  return { ...headers };
}

export function _releaseLeaseSend(
  context: Client,
  leaseId: string,
  options: BlobReleaseLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=lease{?timeout}",
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
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
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

/** The Release Lease operation frees the lease if it's no longer needed, so that another client can immediately acquire a lease against the blob. */
export async function releaseLease(
  context: Client,
  leaseId: string,
  options: BlobReleaseLeaseOptionalParams = { requestOptions: {} },
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
  await _releaseLeaseDeserialize(result);
  return { ...headers };
}

export function _acquireLeaseSend(
  context: Client,
  duration: number,
  options: BlobAcquireLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=lease{?timeout}",
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
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
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
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    leaseId:
      result.headers["x-ms-lease-id"] === undefined || result.headers["x-ms-lease-id"] === null
        ? result.headers["x-ms-lease-id"]
        : result.headers["x-ms-lease-id"],
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

/** The Acquire Lease operation requests a new lease on a blob. The lease lock duration can be 15 to 60 seconds, or can be infinite. */
export async function acquireLease(
  context: Client,
  duration: number,
  options: BlobAcquireLeaseOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  leaseId?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _acquireLeaseSend(context, duration, options);
  const headers = _acquireLeaseDeserializeHeaders(result);
  await _acquireLeaseDeserialize(result);
  return { ...headers };
}

export function _setMetadataSend(
  context: Client,
  options: BlobSetMetadataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=metadata{?timeout}",
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
        ...(options?.metadata !== undefined ? { "x-ms-meta": options?.metadata } : {}),
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setMetadataDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
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
  eTag: string;
  lastModified: Date;
  versionId: string;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  encryptionScope?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    eTag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    versionId: result.headers["x-ms-version-id"],
    isServerEncrypted:
      result.headers["x-ms-request-server-encrypted"] === undefined ||
      result.headers["x-ms-request-server-encrypted"] === null
        ? result.headers["x-ms-request-server-encrypted"]
        : result.headers["x-ms-request-server-encrypted"].trim().toLowerCase() === "true",
    encryptionKeySha256:
      result.headers["x-ms-encryption-key-sha256"] === undefined ||
      result.headers["x-ms-encryption-key-sha256"] === null
        ? result.headers["x-ms-encryption-key-sha256"]
        : result.headers["x-ms-encryption-key-sha256"],
    encryptionScope:
      result.headers["x-ms-encryption-scope"] === undefined ||
      result.headers["x-ms-encryption-scope"] === null
        ? result.headers["x-ms-encryption-scope"]
        : result.headers["x-ms-encryption-scope"],
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

/** The Set Metadata operation sets user-defined metadata for the specified blob as one or more name-value pairs. */
export async function setMetadata(
  context: Client,
  options: BlobSetMetadataOptionalParams = { requestOptions: {} },
): Promise<{
  eTag: string;
  lastModified: Date;
  versionId: string;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  encryptionScope?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _setMetadataSend(context, options);
  const headers = _setMetadataDeserializeHeaders(result);
  await _setMetadataDeserialize(result);
  return { ...headers };
}

export function _setLegalHoldSend(
  context: Client,
  legalHold: boolean,
  options: BlobSetLegalHoldOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=legalhold{?timeout,snapshot,versionid}",
    {
      timeout: options?.timeout,
      snapshot: options?.snapshot,
      versionid: options?.versionId,
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
        "x-ms-legal-hold": legalHold,
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setLegalHoldDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _setLegalHoldDeserializeHeaders(result: PathUncheckedResponse): {
  legalHold: boolean;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    legalHold: result.headers["x-ms-legal-hold"].trim().toLowerCase() === "true",
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

/** The Set Legal Hold operation sets a legal hold on the blob. */
export async function setLegalHold(
  context: Client,
  legalHold: boolean,
  options: BlobSetLegalHoldOptionalParams = { requestOptions: {} },
): Promise<{
  legalHold: boolean;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _setLegalHoldSend(context, legalHold, options);
  const headers = _setLegalHoldDeserializeHeaders(result);
  await _setLegalHoldDeserialize(result);
  return { ...headers };
}

export function _deleteImmutabilityPolicySend(
  context: Client,
  options: BlobDeleteImmutabilityPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=immutabilityPolicies{?timeout,snapshot,versionid}",
    {
      timeout: options?.timeout,
      snapshot: options?.snapshot,
      versionid: options?.versionId,
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
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _deleteImmutabilityPolicyDeserializeHeaders(result: PathUncheckedResponse): {
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

/** The Delete Immutability Policy operation deletes the immutability policy on the blob. */
export async function deleteImmutabilityPolicy(
  context: Client,
  options: BlobDeleteImmutabilityPolicyOptionalParams = { requestOptions: {} },
): Promise<{ date: Date; version: string; requestId?: string; clientRequestId?: string }> {
  const result = await _deleteImmutabilityPolicySend(context, options);
  const headers = _deleteImmutabilityPolicyDeserializeHeaders(result);
  await _deleteImmutabilityPolicyDeserialize(result);
  return { ...headers };
}

export function _setImmutabilityPolicySend(
  context: Client,
  expiry: Date,
  options: BlobSetImmutabilityPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=immutabilityPolicies{?timeout,snapshot,versionid}",
    {
      timeout: options?.timeout,
      snapshot: options?.snapshot,
      versionid: options?.versionId,
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
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _setImmutabilityPolicyDeserializeHeaders(result: PathUncheckedResponse): {
  immutabilityPolicyExpiresOn?: Date;
  immutabilityPolicyMode: ImmutabilityPolicyMode;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    immutabilityPolicyExpiresOn:
      result.headers["x-ms-immutability-policy-until-date"] === undefined ||
      result.headers["x-ms-immutability-policy-until-date"] === null
        ? result.headers["x-ms-immutability-policy-until-date"]
        : new Date(result.headers["x-ms-immutability-policy-until-date"]),
    immutabilityPolicyMode: result.headers["x-ms-immutability-policy-mode"] as any,
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

/** Set the immutability policy of a blob */
export async function setImmutabilityPolicy(
  context: Client,
  expiry: Date,
  options: BlobSetImmutabilityPolicyOptionalParams = { requestOptions: {} },
): Promise<{
  immutabilityPolicyExpiresOn?: Date;
  immutabilityPolicyMode: ImmutabilityPolicyMode;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _setImmutabilityPolicySend(context, expiry, options);
  const headers = _setImmutabilityPolicyDeserializeHeaders(result);
  await _setImmutabilityPolicyDeserialize(result);
  return { ...headers };
}

export function _setPropertiesSend(
  context: Client,
  options: BlobSetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=properties{?timeout}",
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
        ...(options?.blobCacheControl !== undefined
          ? { "x-ms-blob-cache-control": options?.blobCacheControl }
          : {}),
        ...(options?.blobContentType !== undefined
          ? { "x-ms-blob-content-type": options?.blobContentType }
          : {}),
        ...(options?.blobContentMD5 !== undefined
          ? {
              "x-ms-blob-content-md5": !options?.blobContentMD5
                ? options?.blobContentMD5
                : uint8ArrayToString(options?.blobContentMD5, "base64"),
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setPropertiesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
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
  eTag: string;
  lastModified: Date;
  blobSequenceNumber: number;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    eTag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    blobSequenceNumber: Number(result.headers["x-ms-blob-sequence-number"]),
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

/** The Set HTTP Headers operation sets system properties on the blob. */
export async function setProperties(
  context: Client,
  options: BlobSetPropertiesOptionalParams = { requestOptions: {} },
): Promise<{
  eTag: string;
  lastModified: Date;
  blobSequenceNumber: number;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _setPropertiesSend(context, options);
  const headers = _setPropertiesDeserializeHeaders(result);
  await _setPropertiesDeserialize(result);
  return { ...headers };
}

export function _setExpirySend(
  context: Client,
  expiryOptions: BlobExpiryOptions,
  options: BlobSetExpiryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=expiry{?timeout}",
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
        "x-ms-expiry-option": expiryOptions,
        ...(options?.expiresOn !== undefined
          ? {
              "x-ms-expiry-time": !options?.expiresOn
                ? options?.expiresOn
                : options?.expiresOn.toUTCString(),
            }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setExpiryDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _setExpiryDeserializeHeaders(result: PathUncheckedResponse): {
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

/** Set the expiration time of a blob */
export async function setExpiry(
  context: Client,
  expiryOptions: BlobExpiryOptions,
  options: BlobSetExpiryOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _setExpirySend(context, expiryOptions, options);
  const headers = _setExpiryDeserializeHeaders(result);
  await _setExpiryDeserialize(result);
  return { ...headers };
}

export function _undeleteSend(
  context: Client,
  options: BlobUndeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=undelete{?timeout}",
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _undeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _undeleteDeserializeHeaders(result: PathUncheckedResponse): {
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

/** Undelete a blob that was previously soft deleted */
export async function undelete(
  context: Client,
  options: BlobUndeleteOptionalParams = { requestOptions: {} },
): Promise<{ date: Date; version: string; requestId?: string; clientRequestId?: string }> {
  const result = await _undeleteSend(context, options);
  const headers = _undeleteDeserializeHeaders(result);
  await _undeleteDeserialize(result);
  return { ...headers };
}

export function _$deleteSend(
  context: Client,
  options: BlobDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?snapshot,versionid,timeout,deletetype}",
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
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

/** If the storage account's soft delete feature is disabled then, when a blob is deleted, it is permanently removed from the storage account. If the storage account's soft delete feature is enabled, then, when a blob is deleted, it is marked for deletion and becomes inaccessible immediately. However, the blob service retains the blob or snapshot for the number of days specified by the DeleteRetentionPolicy section of [Storage service properties] (Set-Blob-Service-Properties.md). After the specified number of days has passed, the blob's data is permanently removed from the storage account. Note that you continue to be charged for the soft-deleted blob's storage until it is permanently removed. Use the List Blobs API and specify the \"include=deleted\" query parameter to discover which blobs and snapshots have been soft deleted. You can then use the Undelete Blob API to restore a soft-deleted blob. All other operations on a soft-deleted blob or snapshot causes the service to return an HTTP status code of 404 (ResourceNotFound). */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  options: BlobDeleteOptionalParams = { requestOptions: {} },
): Promise<{ date: Date; version: string; requestId?: string; clientRequestId?: string }> {
  const result = await _$deleteSend(context, options);
  const headers = _$deleteDeserializeHeaders(result);
  await _$deleteDeserialize(result);
  return { ...headers };
}

export function _getPropertiesSend(
  context: Client,
  options: BlobGetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?snapshot,versionid,timeout}",
    {
      snapshot: options?.snapshot,
      versionid: options?.versionId,
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .head({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPropertiesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
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
  contentType?: string;
  metadata?: Record<string, string>;
  objectReplicationRules?: Record<string, string>;
  lastModified: Date;
  creationTime: Date;
  objectReplicationPolicyId?: string;
  blobType?: BlobType;
  copyCompletionTime?: Date;
  copyStatusDescription?: string;
  copyId?: string;
  copyProgress?: string;
  copyStatus?: CopyStatus;
  copySource?: string;
  isIncrementalCopy?: boolean;
  destinationSnapshot?: string;
  leaseDuration?: LeaseDuration;
  leaseState?: LeaseState;
  leaseStatus?: LeaseStatus;
  contentLength: number;
  etag: string;
  contentMD5: Uint8Array;
  contentEncoding: string;
  contentDisposition: string;
  contentLanguage: string;
  cacheControl: string;
  blobSequenceNumber: number;
  acceptRanges?: string;
  blobCommittedBlockCount?: number;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  encryptionScope?: string;
  accessTier?: string;
  accessTierInferred?: boolean;
  archiveStatus?: ArchiveStatus;
  accessTierChangeTime?: Date;
  versionId: string;
  isCurrentVersion?: boolean;
  tagCount?: number;
  expiresOn?: Date;
  isSealed?: boolean;
  rehydratePriority?: RehydratePriority;
  lastAccessed?: Date;
  immutabilityPolicyExpiresOn?: Date;
  immutabilityPolicyMode: ImmutabilityPolicyMode;
  legalHold?: boolean;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    contentType:
      result.headers["content-type"] === undefined || result.headers["content-type"] === null
        ? result.headers["content-type"]
        : result.headers["content-type"],
    metadata:
      result.headers["x-ms-meta"] === undefined || result.headers["x-ms-meta"] === null
        ? result.headers["x-ms-meta"]
        : Object.fromEntries(
            Object.entries(result.headers["x-ms-meta"]).map(([k, p]: [string, any]) => [k, p]),
          ),
    objectReplicationRules:
      result.headers["x-ms-or"] === undefined || result.headers["x-ms-or"] === null
        ? result.headers["x-ms-or"]
        : Object.fromEntries(
            Object.entries(result.headers["x-ms-or"]).map(([k, p]: [string, any]) => [k, p]),
          ),
    lastModified: new Date(result.headers["last-modified"]),
    creationTime: new Date(result.headers["x-ms-creation-time"]),
    objectReplicationPolicyId:
      result.headers["x-ms-or-policy-id"] === undefined ||
      result.headers["x-ms-or-policy-id"] === null
        ? result.headers["x-ms-or-policy-id"]
        : result.headers["x-ms-or-policy-id"],
    blobType: result.headers["x-ms-blob-type"] as any,
    copyCompletionTime:
      result.headers["x-ms-copy-completion-time"] === undefined ||
      result.headers["x-ms-copy-completion-time"] === null
        ? result.headers["x-ms-copy-completion-time"]
        : new Date(result.headers["x-ms-copy-completion-time"]),
    copyStatusDescription:
      result.headers["x-ms-copy-status-description"] === undefined ||
      result.headers["x-ms-copy-status-description"] === null
        ? result.headers["x-ms-copy-status-description"]
        : result.headers["x-ms-copy-status-description"],
    copyId:
      result.headers["x-ms-copy-id"] === undefined || result.headers["x-ms-copy-id"] === null
        ? result.headers["x-ms-copy-id"]
        : result.headers["x-ms-copy-id"],
    copyProgress:
      result.headers["x-ms-copy-progress"] === undefined ||
      result.headers["x-ms-copy-progress"] === null
        ? result.headers["x-ms-copy-progress"]
        : result.headers["x-ms-copy-progress"],
    copyStatus: result.headers["x-ms-copy-status"] as any,
    copySource:
      result.headers["x-ms-copy-source"] === undefined ||
      result.headers["x-ms-copy-source"] === null
        ? result.headers["x-ms-copy-source"]
        : result.headers["x-ms-copy-source"],
    isIncrementalCopy:
      result.headers["x-ms-incremental-copy"] === undefined ||
      result.headers["x-ms-incremental-copy"] === null
        ? result.headers["x-ms-incremental-copy"]
        : result.headers["x-ms-incremental-copy"].trim().toLowerCase() === "true",
    destinationSnapshot:
      result.headers["x-ms-copy-destination-snapshot"] === undefined ||
      result.headers["x-ms-copy-destination-snapshot"] === null
        ? result.headers["x-ms-copy-destination-snapshot"]
        : result.headers["x-ms-copy-destination-snapshot"],
    leaseDuration: result.headers["x-ms-lease-duration"] as any,
    leaseState: result.headers["x-ms-lease-state"] as any,
    leaseStatus: result.headers["x-ms-lease-status"] as any,
    contentLength: Number(result.headers["content-length"]),
    etag: result.headers["etag"],
    contentMD5:
      typeof result.headers["content-md5"] === "string"
        ? stringToUint8Array(result.headers["content-md5"], "base64")
        : result.headers["content-md5"],
    contentEncoding: result.headers["content-encoding"],
    contentDisposition: result.headers["content-disposition"],
    contentLanguage: result.headers["content-language"],
    cacheControl: result.headers["cache-control"],
    blobSequenceNumber: Number(result.headers["x-ms-blob-sequence-number"]),
    acceptRanges:
      result.headers["accept-ranges"] === undefined || result.headers["accept-ranges"] === null
        ? result.headers["accept-ranges"]
        : result.headers["accept-ranges"],
    blobCommittedBlockCount:
      result.headers["x-ms-blob-committed-block-count"] === undefined ||
      result.headers["x-ms-blob-committed-block-count"] === null
        ? result.headers["x-ms-blob-committed-block-count"]
        : Number(result.headers["x-ms-blob-committed-block-count"]),
    isServerEncrypted:
      result.headers["x-ms-server-encrypted"] === undefined ||
      result.headers["x-ms-server-encrypted"] === null
        ? result.headers["x-ms-server-encrypted"]
        : result.headers["x-ms-server-encrypted"].trim().toLowerCase() === "true",
    encryptionKeySha256:
      result.headers["x-ms-encryption-key-sha256"] === undefined ||
      result.headers["x-ms-encryption-key-sha256"] === null
        ? result.headers["x-ms-encryption-key-sha256"]
        : result.headers["x-ms-encryption-key-sha256"],
    encryptionScope:
      result.headers["x-ms-encryption-scope"] === undefined ||
      result.headers["x-ms-encryption-scope"] === null
        ? result.headers["x-ms-encryption-scope"]
        : result.headers["x-ms-encryption-scope"],
    accessTier:
      result.headers["x-ms-access-tier"] === undefined ||
      result.headers["x-ms-access-tier"] === null
        ? result.headers["x-ms-access-tier"]
        : result.headers["x-ms-access-tier"],
    accessTierInferred:
      result.headers["x-ms-access-tier-inferred"] === undefined ||
      result.headers["x-ms-access-tier-inferred"] === null
        ? result.headers["x-ms-access-tier-inferred"]
        : result.headers["x-ms-access-tier-inferred"].trim().toLowerCase() === "true",
    archiveStatus: result.headers["x-ms-archive-status"] as any,
    accessTierChangeTime:
      result.headers["x-ms-access-tier-change-time"] === undefined ||
      result.headers["x-ms-access-tier-change-time"] === null
        ? result.headers["x-ms-access-tier-change-time"]
        : new Date(result.headers["x-ms-access-tier-change-time"]),
    versionId: result.headers["x-ms-version-id"],
    isCurrentVersion:
      result.headers["x-ms-is-current-version"] === undefined ||
      result.headers["x-ms-is-current-version"] === null
        ? result.headers["x-ms-is-current-version"]
        : result.headers["x-ms-is-current-version"].trim().toLowerCase() === "true",
    tagCount:
      result.headers["x-ms-tag-count"] === undefined || result.headers["x-ms-tag-count"] === null
        ? result.headers["x-ms-tag-count"]
        : Number(result.headers["x-ms-tag-count"]),
    expiresOn:
      result.headers["x-ms-expiry-time"] === undefined ||
      result.headers["x-ms-expiry-time"] === null
        ? result.headers["x-ms-expiry-time"]
        : new Date(result.headers["x-ms-expiry-time"]),
    isSealed:
      result.headers["x-ms-blob-sealed"] === undefined ||
      result.headers["x-ms-blob-sealed"] === null
        ? result.headers["x-ms-blob-sealed"]
        : result.headers["x-ms-blob-sealed"].trim().toLowerCase() === "true",
    rehydratePriority: result.headers["x-ms-rehydrate-priority"] as any,
    lastAccessed:
      result.headers["x-ms-last-access-time"] === undefined ||
      result.headers["x-ms-last-access-time"] === null
        ? result.headers["x-ms-last-access-time"]
        : new Date(result.headers["x-ms-last-access-time"]),
    immutabilityPolicyExpiresOn:
      result.headers["x-ms-immutability-policy-until-date"] === undefined ||
      result.headers["x-ms-immutability-policy-until-date"] === null
        ? result.headers["x-ms-immutability-policy-until-date"]
        : new Date(result.headers["x-ms-immutability-policy-until-date"]),
    immutabilityPolicyMode: result.headers["x-ms-immutability-policy-mode"] as any,
    legalHold:
      result.headers["x-ms-legal-hold"] === undefined || result.headers["x-ms-legal-hold"] === null
        ? result.headers["x-ms-legal-hold"]
        : result.headers["x-ms-legal-hold"].trim().toLowerCase() === "true",
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

/** The Get Properties operation returns all user-defined metadata, standard HTTP properties, and system properties for the blob. It does not return the content of the blob. */
export async function getProperties(
  context: Client,
  options: BlobGetPropertiesOptionalParams = { requestOptions: {} },
): Promise<{
  contentType?: string;
  metadata?: Record<string, string>;
  objectReplicationRules?: Record<string, string>;
  lastModified: Date;
  creationTime: Date;
  objectReplicationPolicyId?: string;
  blobType?: BlobType;
  copyCompletionTime?: Date;
  copyStatusDescription?: string;
  copyId?: string;
  copyProgress?: string;
  copyStatus?: CopyStatus;
  copySource?: string;
  isIncrementalCopy?: boolean;
  destinationSnapshot?: string;
  leaseDuration?: LeaseDuration;
  leaseState?: LeaseState;
  leaseStatus?: LeaseStatus;
  contentLength: number;
  etag: string;
  contentMD5: Uint8Array;
  contentEncoding: string;
  contentDisposition: string;
  contentLanguage: string;
  cacheControl: string;
  blobSequenceNumber: number;
  acceptRanges?: string;
  blobCommittedBlockCount?: number;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  encryptionScope?: string;
  accessTier?: string;
  accessTierInferred?: boolean;
  archiveStatus?: ArchiveStatus;
  accessTierChangeTime?: Date;
  versionId: string;
  isCurrentVersion?: boolean;
  tagCount?: number;
  expiresOn?: Date;
  isSealed?: boolean;
  rehydratePriority?: RehydratePriority;
  lastAccessed?: Date;
  immutabilityPolicyExpiresOn?: Date;
  immutabilityPolicyMode: ImmutabilityPolicyMode;
  legalHold?: boolean;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _getPropertiesSend(context, options);
  const headers = _getPropertiesDeserializeHeaders(result);
  await _getPropertiesDeserialize(result);
  return { ...headers };
}

export function _downloadSend(
  context: Client,
  options: BlobDownloadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?snapshot,versionid,timeout}",
    {
      snapshot: options?.snapshot,
      versionid: options?.versionId,
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
        ...(options?.range !== undefined ? { range: options?.range } : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.rangeGetContentMD5 !== undefined
          ? { "x-ms-range-get-content-md5": options?.rangeGetContentMD5 }
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
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return result.body;
}

export function _downloadDeserializeHeaders(result: PathUncheckedResponse): {
  requestId?: string;
  clientRequestId?: string;
  metadata?: Record<string, string>;
  objectReplicationRules?: Record<string, string>;
  lastModified: Date;
  creationTime: Date;
  objectReplicationPolicyId?: string;
  contentLength: number;
  contentRange: string;
  etag: string;
  contentMD5: Uint8Array;
  contentEncoding: string;
  cacheControl: string;
  contentDisposition: string;
  contentLanguage: string;
  blobSequenceNumber: number;
  blobType?: BlobType;
  copyCompletionTime?: Date;
  copyStatusDescription?: string;
  copyId?: string;
  copyProgress?: string;
  copyStatus?: CopyStatus;
  copySource?: string;
  leaseDuration?: LeaseDuration;
  leaseState?: LeaseState;
  leaseStatus?: LeaseStatus;
  versionId: string;
  isCurrentVersion?: boolean;
  acceptRanges?: string;
  date: Date;
  blobCommittedBlockCount?: number;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  encryptionScope?: string;
  blobContentMD5?: Uint8Array;
  tagCount?: number;
  isSealed?: boolean;
  lastAccessed?: Date;
  immutabilityPolicyExpiresOn?: Date;
  immutabilityPolicyMode: ImmutabilityPolicyMode;
  legalHold?: boolean;
  structuredBodyType?: string;
  structuredContentLength?: number;
  version: string;
  contentType: "application/octet-stream";
  contentCrc64?: Uint8Array;
} {
  return {
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    metadata:
      result.headers["x-ms-meta"] === undefined || result.headers["x-ms-meta"] === null
        ? result.headers["x-ms-meta"]
        : Object.fromEntries(
            Object.entries(result.headers["x-ms-meta"]).map(([k, p]: [string, any]) => [k, p]),
          ),
    objectReplicationRules:
      result.headers["x-ms-or"] === undefined || result.headers["x-ms-or"] === null
        ? result.headers["x-ms-or"]
        : Object.fromEntries(
            Object.entries(result.headers["x-ms-or"]).map(([k, p]: [string, any]) => [k, p]),
          ),
    lastModified: new Date(result.headers["last-modified"]),
    creationTime: new Date(result.headers["x-ms-creation-time"]),
    objectReplicationPolicyId:
      result.headers["x-ms-or-policy-id"] === undefined ||
      result.headers["x-ms-or-policy-id"] === null
        ? result.headers["x-ms-or-policy-id"]
        : result.headers["x-ms-or-policy-id"],
    contentLength: Number(result.headers["content-length"]),
    contentRange: result.headers["content-range"],
    etag: result.headers["etag"],
    contentMD5:
      typeof result.headers["content-md5"] === "string"
        ? stringToUint8Array(result.headers["content-md5"], "base64")
        : result.headers["content-md5"],
    contentEncoding: result.headers["content-encoding"],
    cacheControl: result.headers["cache-control"],
    contentDisposition: result.headers["content-disposition"],
    contentLanguage: result.headers["content-language"],
    blobSequenceNumber: Number(result.headers["x-ms-blob-sequence-number"]),
    blobType: result.headers["x-ms-blob-type"] as any,
    copyCompletionTime:
      result.headers["x-ms-copy-completion-time"] === undefined ||
      result.headers["x-ms-copy-completion-time"] === null
        ? result.headers["x-ms-copy-completion-time"]
        : new Date(result.headers["x-ms-copy-completion-time"]),
    copyStatusDescription:
      result.headers["x-ms-copy-status-description"] === undefined ||
      result.headers["x-ms-copy-status-description"] === null
        ? result.headers["x-ms-copy-status-description"]
        : result.headers["x-ms-copy-status-description"],
    copyId:
      result.headers["x-ms-copy-id"] === undefined || result.headers["x-ms-copy-id"] === null
        ? result.headers["x-ms-copy-id"]
        : result.headers["x-ms-copy-id"],
    copyProgress:
      result.headers["x-ms-copy-progress"] === undefined ||
      result.headers["x-ms-copy-progress"] === null
        ? result.headers["x-ms-copy-progress"]
        : result.headers["x-ms-copy-progress"],
    copyStatus: result.headers["x-ms-copy-status"] as any,
    copySource:
      result.headers["x-ms-copy-source"] === undefined ||
      result.headers["x-ms-copy-source"] === null
        ? result.headers["x-ms-copy-source"]
        : result.headers["x-ms-copy-source"],
    leaseDuration: result.headers["x-ms-lease-duration"] as any,
    leaseState: result.headers["x-ms-lease-state"] as any,
    leaseStatus: result.headers["x-ms-lease-status"] as any,
    versionId: result.headers["x-ms-version-id"],
    isCurrentVersion:
      result.headers["x-ms-is-current-version"] === undefined ||
      result.headers["x-ms-is-current-version"] === null
        ? result.headers["x-ms-is-current-version"]
        : result.headers["x-ms-is-current-version"].trim().toLowerCase() === "true",
    acceptRanges:
      result.headers["accept-ranges"] === undefined || result.headers["accept-ranges"] === null
        ? result.headers["accept-ranges"]
        : result.headers["accept-ranges"],
    date: new Date(result.headers["date"]),
    blobCommittedBlockCount:
      result.headers["x-ms-blob-committed-block-count"] === undefined ||
      result.headers["x-ms-blob-committed-block-count"] === null
        ? result.headers["x-ms-blob-committed-block-count"]
        : Number(result.headers["x-ms-blob-committed-block-count"]),
    isServerEncrypted:
      result.headers["x-ms-server-encrypted"] === undefined ||
      result.headers["x-ms-server-encrypted"] === null
        ? result.headers["x-ms-server-encrypted"]
        : result.headers["x-ms-server-encrypted"].trim().toLowerCase() === "true",
    encryptionKeySha256:
      result.headers["x-ms-encryption-key-sha256"] === undefined ||
      result.headers["x-ms-encryption-key-sha256"] === null
        ? result.headers["x-ms-encryption-key-sha256"]
        : result.headers["x-ms-encryption-key-sha256"],
    encryptionScope:
      result.headers["x-ms-encryption-scope"] === undefined ||
      result.headers["x-ms-encryption-scope"] === null
        ? result.headers["x-ms-encryption-scope"]
        : result.headers["x-ms-encryption-scope"],
    blobContentMD5:
      result.headers["x-ms-blob-content-md5"] === undefined ||
      result.headers["x-ms-blob-content-md5"] === null
        ? result.headers["x-ms-blob-content-md5"]
        : typeof result.headers["x-ms-blob-content-md5"] === "string"
          ? stringToUint8Array(result.headers["x-ms-blob-content-md5"], "base64")
          : result.headers["x-ms-blob-content-md5"],
    tagCount:
      result.headers["x-ms-tag-count"] === undefined || result.headers["x-ms-tag-count"] === null
        ? result.headers["x-ms-tag-count"]
        : Number(result.headers["x-ms-tag-count"]),
    isSealed:
      result.headers["x-ms-blob-sealed"] === undefined ||
      result.headers["x-ms-blob-sealed"] === null
        ? result.headers["x-ms-blob-sealed"]
        : result.headers["x-ms-blob-sealed"].trim().toLowerCase() === "true",
    lastAccessed:
      result.headers["x-ms-last-access-time"] === undefined ||
      result.headers["x-ms-last-access-time"] === null
        ? result.headers["x-ms-last-access-time"]
        : new Date(result.headers["x-ms-last-access-time"]),
    immutabilityPolicyExpiresOn:
      result.headers["x-ms-immutability-policy-until-date"] === undefined ||
      result.headers["x-ms-immutability-policy-until-date"] === null
        ? result.headers["x-ms-immutability-policy-until-date"]
        : new Date(result.headers["x-ms-immutability-policy-until-date"]),
    immutabilityPolicyMode: result.headers["x-ms-immutability-policy-mode"] as any,
    legalHold:
      result.headers["x-ms-legal-hold"] === undefined || result.headers["x-ms-legal-hold"] === null
        ? result.headers["x-ms-legal-hold"]
        : result.headers["x-ms-legal-hold"].trim().toLowerCase() === "true",
    structuredBodyType:
      result.headers["x-ms-structured-body"] === undefined ||
      result.headers["x-ms-structured-body"] === null
        ? result.headers["x-ms-structured-body"]
        : result.headers["x-ms-structured-body"],
    structuredContentLength:
      result.headers["x-ms-structured-content-length"] === undefined ||
      result.headers["x-ms-structured-content-length"] === null
        ? result.headers["x-ms-structured-content-length"]
        : Number(result.headers["x-ms-structured-content-length"]),
    version: result.headers["x-ms-version"],
    contentType: result.headers["content-type"] as any,
    contentCrc64:
      result.headers["x-ms-content-crc64"] === undefined ||
      result.headers["x-ms-content-crc64"] === null
        ? result.headers["x-ms-content-crc64"]
        : typeof result.headers["x-ms-content-crc64"] === "string"
          ? stringToUint8Array(result.headers["x-ms-content-crc64"], "base64")
          : result.headers["x-ms-content-crc64"],
  };
}

/** The Download operation reads or downloads a blob from the system, including its metadata and properties. You can also call Download to read a snapshot. */
export async function download(
  context: Client,
  options: BlobDownloadOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const streamableMethod = _downloadSend(context, options);
  const result = await getBinaryResponse(streamableMethod);
  const headers = _downloadDeserializeHeaders(result);
  const payload = await _downloadDeserialize(result);
  return { ...payload, ...headers };
}
