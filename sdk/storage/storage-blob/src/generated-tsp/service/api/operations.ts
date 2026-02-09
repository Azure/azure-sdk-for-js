// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceContext as Client } from "./index.js";
import {
  BlobServiceProperties,
  blobServicePropertiesXmlSerializer,
  blobServicePropertiesXmlDeserializer,
  Logging,
  RetentionPolicy,
  Metrics,
  CorsRule,
  StaticWebsite,
  storageErrorDeserializer,
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
  FindBlobsByTagsOptionalParams,
  SubmitBatchOptionalParams,
  GetAccountInfoOptionalParams,
  GetUserDelegationKeyOptionalParams,
  ListContainersSegmentOptionalParams,
  GetStatisticsOptionalParams,
  GetPropertiesOptionalParams,
  SetPropertiesOptionalParams,
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
  options: FindBlobsByTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=blobs{?timeout,where,marker,maxresults,include}",
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return filterBlobSegmentXmlDeserializer(result.body);
}

/** The Filter Blobs operation enables callers to list blobs across all containers whose tags match a given search expression. */
export async function findBlobsByTags(
  context: Client,
  filterExpression: string,
  options: FindBlobsByTagsOptionalParams = { requestOptions: {} },
): Promise<{
  serviceEndpoint: string;
  where: string;
  blobs: FilterBlobItem[];
  nextMarker?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _findBlobsByTagsSend(context, filterExpression, options);
  const headers = {
    date: new Date(result.headers["Date"]),
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
    contentType: result.headers["Content-Type"] as any,
  };
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
  options: SubmitBatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=batch{?timeout}",
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return _submitBatchRequestDeserializer(result.body) as any;
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
  options: SubmitBatchOptionalParams = { requestOptions: {} },
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
  const headers = {
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
    contentType: result.headers["Content-Type"] as any,
  };
  const payload = await _submitBatchDeserialize(result);
  return { ...payload, ...headers };
}

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

/** Returns the sku name and account kind. */
export async function getAccountInfo(
  context: Client,
  options: GetAccountInfoOptionalParams = { requestOptions: {} },
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
  const headers = {
    skuName: result.headers["x-ms-sku-name"] as any,
    accountKind: result.headers["x-ms-account-kind"] as any,
    isHierarchicalNamespaceEnabled:
      result.headers["x-ms-is-hns-enabled"] === undefined ||
      result.headers["x-ms-is-hns-enabled"] === null
        ? result.headers["x-ms-is-hns-enabled"]
        : result.headers["x-ms-is-hns-enabled"].trim().toLowerCase() === "true",
    date: new Date(result.headers["Date"]),
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
  return { ...headers };
}

export function _getUserDelegationKeySend(
  context: Client,
  keyInfo: KeyInfo,
  options: GetUserDelegationKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=service&comp=userdelegationkey{?timeout}",
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return userDelegationKeyXmlDeserializer(result.body);
}

/** Retrieves a user delegation key for the Blob service. This is only a valid operation when using bearer token authentication. */
export async function getUserDelegationKey(
  context: Client,
  keyInfo: KeyInfo,
  options: GetUserDelegationKeyOptionalParams = { requestOptions: {} },
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
  const headers = {
    date: new Date(result.headers["Date"]),
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
    contentType: result.headers["Content-Type"] as any,
  };
  const payload = await _getUserDelegationKeyDeserialize(result);
  return { ...payload, ...headers };
}

export function _listContainersSegmentSend(
  context: Client,
  options: ListContainersSegmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=list{?prefix,marker,maxresults,timeout,include}",
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

export async function _listContainersSegmentDeserialize(
  result: PathUncheckedResponse,
): Promise<ListContainersSegmentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return listContainersSegmentResponseXmlDeserializer(result.body);
}

/** The List Containers Segment operation returns a list of the containers under the specified account */
export async function listContainersSegment(
  context: Client,
  options: ListContainersSegmentOptionalParams = { requestOptions: {} },
): Promise<{
  serviceEndpoint: string;
  prefix?: string;
  marker?: string;
  maxResults?: number;
  containerItems: ContainerItem[];
  nextMarker?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _listContainersSegmentSend(context, options);
  const headers = {
    date: new Date(result.headers["Date"]),
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
    contentType: result.headers["Content-Type"] as any,
  };
  const payload = await _listContainersSegmentDeserialize(result);
  return { ...payload, ...headers };
}

export function _getStatisticsSend(
  context: Client,
  options: GetStatisticsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=service&comp=stats{?timeout}",
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return storageServiceStatsXmlDeserializer(result.body);
}

/** Retrieves statistics related to replication for the Blob service. It is only available on the secondary location endpoint when read-access geo-redundant replication is enabled for the storage account. */
export async function getStatistics(
  context: Client,
  options: GetStatisticsOptionalParams = { requestOptions: {} },
): Promise<{
  geoReplication?: GeoReplication;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _getStatisticsSend(context, options);
  const headers = {
    date: new Date(result.headers["Date"]),
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
    contentType: result.headers["Content-Type"] as any,
  };
  const payload = await _getStatisticsDeserialize(result);
  return { ...payload, ...headers };
}

export function _getPropertiesSend(
  context: Client,
  options: GetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=service&comp=properties{?timeout}",
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return blobServicePropertiesXmlDeserializer(result.body);
}

/** Retrieves properties of a storage account's Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
export async function getProperties(
  context: Client,
  options: GetPropertiesOptionalParams = { requestOptions: {} },
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
  const headers = {
    date: new Date(result.headers["Date"]),
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
    contentType: result.headers["Content-Type"] as any,
  };
  const payload = await _getPropertiesDeserialize(result);
  return { ...payload, ...headers };
}

export function _setPropertiesSend(
  context: Client,
  storageServiceProperties: BlobServiceProperties,
  options: SetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=service&comp=properties{?timeout}",
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
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Sets properties for a storage account's Blob service endpoint, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules */
export async function setProperties(
  context: Client,
  storageServiceProperties: BlobServiceProperties,
  options: SetPropertiesOptionalParams = { requestOptions: {} },
): Promise<{ date: Date; version: string; requestId?: string; clientRequestId?: string }> {
  const result = await _setPropertiesSend(context, storageServiceProperties, options);
  const headers = {
    date: new Date(result.headers["Date"]),
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
  return { ...headers };
}
