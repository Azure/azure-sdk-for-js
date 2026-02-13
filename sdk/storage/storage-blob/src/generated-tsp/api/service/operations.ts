// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobContext as Client } from "../index.js";
import {
  BlobServiceProperties,
  blobServicePropertiesXmlSerializer,
  blobServicePropertiesXmlDeserializer,
  Logging,
  RetentionPolicy,
  Metrics,
  CorsRule,
  StaticWebsite,
  errorXmlDeserializer,
  StorageServiceStats,
  storageServiceStatsXmlDeserializer,
  GeoReplication,
  ListContainersSegmentResponse,
  listContainersSegmentResponseXmlDeserializer,
  ContainerItem,
  KeyInfo,
  keyInfoXmlSerializer,
  UserDelegationKey,
  userDelegationKeyXmlDeserializer,
  _submitBatchRequestSerializer,
  _submitBatchRequestDeserializer,
  FilterBlobSegment,
  filterBlobSegmentXmlDeserializer,
  FilterBlobItem,
  SkuName,
  AccountKind,
} from "../../models/azure/storage/blobs/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ServiceFindBlobsByTagsOptionalParams,
  ServiceSubmitBatchOptionalParams,
  ServiceGetAccountInfoOptionalParams,
  ServiceGetUserDelegationKeyOptionalParams,
  ServiceListContainersOptionalParams,
  ServiceGetStatisticsOptionalParams,
  ServiceGetPropertiesOptionalParams,
  ServiceSetPropertiesOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _findBlobsByTagsSend(
  context: Client,
  filterExpression: string,
  options: ServiceFindBlobsByTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=blobs{?timeout,where,marker,maxresults,include}",
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

/** The Filter Blobs operation enables callers to list blobs across all containers whose tags match a given search expression. */
export async function findBlobsByTags(
  context: Client,
  filterExpression: string,
  options: ServiceFindBlobsByTagsOptionalParams = { requestOptions: {} },
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
  options: ServiceSubmitBatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=batch{?timeout}",
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
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    throw error;
  }

  return _submitBatchRequestDeserializer(result.body) as any;
}

export function _submitBatchDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "multipart/mixed";
} {
  return {
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

/** The Batch operation allows multiple API calls to be embedded into a single HTTP request. */
export async function submitBatch(
  context: Client,
  multipartContentType: string,
  contentLength: number,
  body: {
    name: string;
    body: Uint8Array;
  },
  options: ServiceSubmitBatchOptionalParams = { requestOptions: {} },
): Promise<{
  name: string;
  body: Uint8Array;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "multipart/mixed";
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

export function _getAccountInfoSend(
  context: Client,
  options: ServiceGetAccountInfoOptionalParams = { requestOptions: {} },
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

/** Returns the sku name and account kind. */
export async function getAccountInfo(
  context: Client,
  options: ServiceGetAccountInfoOptionalParams = { requestOptions: {} },
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

export function _getUserDelegationKeySend(
  context: Client,
  keyInfo: KeyInfo,
  options: ServiceGetUserDelegationKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=service&comp=userdelegationkey{?timeout}",
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
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
      body: keyInfoXmlSerializer(keyInfo),
    });
}

export async function _getUserDelegationKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<UserDelegationKey> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    throw error;
  }

  return userDelegationKeyXmlDeserializer(result.body);
}

export function _getUserDelegationKeyDeserializeHeaders(result: PathUncheckedResponse): {
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

/** Retrieves a user delegation key for the Blob service. This is only a valid operation when using bearer token authentication. */
export async function getUserDelegationKey(
  context: Client,
  keyInfo: KeyInfo,
  options: ServiceGetUserDelegationKeyOptionalParams = { requestOptions: {} },
): Promise<{
  signedObjectId: string;
  signedTenantId: string;
  signedStartsOn: string;
  signedExpiresOn: string;
  signedService: string;
  signedVersion: string;
  signedDelegatedUserTid?: string;
  value: Uint8Array;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _getUserDelegationKeySend(context, keyInfo, options);
  const headers = _getUserDelegationKeyDeserializeHeaders(result);
  const payload = await _getUserDelegationKeyDeserialize(result);
  return { ...payload, ...headers };
}

export function _listContainersSend(
  context: Client,
  options: ServiceListContainersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=list{?prefix,marker,maxresults,timeout,include}",
    {
      prefix: options?.prefix,
      marker: options?.marker,
      maxresults: options?.maxresults,
      timeout: options?.timeout,
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

export async function _listContainersDeserialize(
  result: PathUncheckedResponse,
): Promise<ListContainersSegmentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    throw error;
  }

  return listContainersSegmentResponseXmlDeserializer(result.body);
}

export function _listContainersDeserializeHeaders(result: PathUncheckedResponse): {
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

/** The List Containers Segment operation returns a list of the containers under the specified account */
export async function listContainers(
  context: Client,
  options: ServiceListContainersOptionalParams = { requestOptions: {} },
): Promise<{
  serviceEndpoint: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  containerItems: ContainerItem[];
  continuationToken?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _listContainersSend(context, options);
  const headers = _listContainersDeserializeHeaders(result);
  const payload = await _listContainersDeserialize(result);
  return { ...payload, ...headers };
}

export function _getStatisticsSend(
  context: Client,
  options: ServiceGetStatisticsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=service&comp=stats{?timeout}",
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getStatisticsDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageServiceStats> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    throw error;
  }

  return storageServiceStatsXmlDeserializer(result.body);
}

export function _getStatisticsDeserializeHeaders(result: PathUncheckedResponse): {
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

/** Retrieves statistics related to replication for the Blob service. It is only available on the secondary location endpoint when read-access geo-redundant replication is enabled for the storage account. */
export async function getStatistics(
  context: Client,
  options: ServiceGetStatisticsOptionalParams = { requestOptions: {} },
): Promise<{
  geoReplication?: GeoReplication;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _getStatisticsSend(context, options);
  const headers = _getStatisticsDeserializeHeaders(result);
  const payload = await _getStatisticsDeserialize(result);
  return { ...payload, ...headers };
}

export function _getPropertiesSend(
  context: Client,
  options: ServiceGetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=service&comp=properties{?timeout}",
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<BlobServiceProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    throw error;
  }

  return blobServicePropertiesXmlDeserializer(result.body);
}

export function _getPropertiesDeserializeHeaders(result: PathUncheckedResponse): {
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

/** Retrieves properties of a storage account's Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
export async function getProperties(
  context: Client,
  options: ServiceGetPropertiesOptionalParams = { requestOptions: {} },
): Promise<{
  blobAnalyticsLogging?: Logging;
  hourMetrics?: Metrics;
  minuteMetrics?: Metrics;
  cors?: CorsRule[];
  defaultServiceVersion?: string;
  deleteRetentionPolicy?: RetentionPolicy;
  staticWebsite?: StaticWebsite;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _getPropertiesSend(context, options);
  const headers = _getPropertiesDeserializeHeaders(result);
  const payload = await _getPropertiesDeserialize(result);
  return { ...payload, ...headers };
}

export function _setPropertiesSend(
  context: Client,
  storageServiceProperties: BlobServiceProperties,
  options: ServiceSetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=service&comp=properties{?timeout}",
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
        ...options.requestOptions?.headers,
      },
      body: blobServicePropertiesXmlSerializer(storageServiceProperties),
    });
}

export async function _setPropertiesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    throw error;
  }

  return;
}

export function _setPropertiesDeserializeHeaders(result: PathUncheckedResponse): {
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

/** Sets properties for a storage account's Blob service endpoint, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules */
export async function setProperties(
  context: Client,
  storageServiceProperties: BlobServiceProperties,
  options: ServiceSetPropertiesOptionalParams = { requestOptions: {} },
): Promise<{ date: Date; version: string; requestId?: string; clientRequestId?: string }> {
  const result = await _setPropertiesSend(context, storageServiceProperties, options);
  const headers = _setPropertiesDeserializeHeaders(result);
  return { ...headers };
}
