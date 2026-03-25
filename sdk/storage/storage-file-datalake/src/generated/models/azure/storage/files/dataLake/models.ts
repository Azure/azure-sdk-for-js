// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  XmlPropertyDeserializeMetadata,
  deserializeFromXml,
  deserializeXmlObject,
} from "../../../../../static-helpers/serialization/xml-helpers.js";
import { stringToUint8Array } from "@azure/core-util";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A list of filesystems. */
export interface FileSystemList {
  /** The list of filesystems. */
  filesystems?: FileSystemItem[];
}

export function fileSystemListDeserializer(item: any): FileSystemList {
  return {
    filesystems: !item["filesystems"]
      ? item["filesystems"]
      : fileSystemItemArrayDeserializer(item["filesystems"]),
  };
}

export function fileSystemItemArrayDeserializer(result: Array<FileSystemItem>): any[] {
  return result.map((item) => {
    return fileSystemItemDeserializer(item);
  });
}

/** Represents a filesystem. */
export interface FileSystemItem {
  /** The filesystem name. */
  name?: string;
  /** The last modified time. */
  lastModified?: string;
  /** The entity tag. */
  etag?: string;
}

export function fileSystemItemDeserializer(item: any): FileSystemItem {
  return {
    name: item["name"],
    lastModified: item["lastModified"],
    etag: item["eTag"],
  };
}

/** The storage error response. */
export interface StorageError {
  /** The service error response object. */
  error?: StorageErrorBody;
}

export function storageErrorDeserializer(item: any): StorageError {
  return {
    error: !item["error"] ? item["error"] : storageErrorBodyDeserializer(item["error"]),
  };
}

/** The service error response body. */
export interface StorageErrorBody {
  /** The service error code. */
  code?: string;
  /** The service error message. */
  message?: string;
}

export function storageErrorBodyDeserializer(item: any): StorageErrorBody {
  return {
    code: item["code"],
    message: item["message"],
  };
}

export function storageErrorBodyXmlDeserializer(xmlString: string): StorageErrorBody {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "code",
      xmlOptions: { name: "Code" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "message",
      xmlOptions: { name: "Message" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<StorageErrorBody>(
    xmlString,
    properties,
    "StorageErrorBody",
    undefined,
    undefined,
    { propertyName: "additionalProperties", excludeNames: ["Code", "Message"] },
  );
}

/** A list of paths. */
export interface PathList {
  /** The list of paths. */
  paths?: PathItem[];
}

export function pathListDeserializer(item: any): PathList {
  return {
    paths: !item["paths"] ? item["paths"] : pathItemArrayDeserializer(item["paths"]),
  };
}

export function pathItemArrayDeserializer(result: Array<PathItem>): any[] {
  return result.map((item) => {
    return pathItemDeserializer(item);
  });
}

/** Represents a path in a filesystem. */
export interface PathItem {
  /** The path name. */
  name?: string;
  /** Whether the path is a directory. */
  isDirectory?: boolean;
  /** The last modified time. */
  lastModified?: string;
  /** The entity tag. */
  etag?: string;
  /** The content length. */
  contentLength?: number;
  /** The owner of the path. */
  owner?: string;
  /** The owning group of the path. */
  group?: string;
  /** The POSIX access permissions. */
  permissions?: string;
  /** The name of the encryption scope under which the blob is encrypted. */
  encryptionScope?: string;
  /** The creation time. */
  creationTime?: string;
  /** The expiry time. */
  expiryTime?: string;
  /** The encryption context. */
  encryptionContext?: string;
}

export function pathItemDeserializer(item: any): PathItem {
  return {
    name: item["name"],
    isDirectory: item["isDirectory"],
    lastModified: item["lastModified"],
    etag: item["eTag"],
    contentLength: item["contentLength"],
    owner: item["owner"],
    group: item["group"],
    permissions: item["permissions"],
    encryptionScope: item["encryptionScope"],
    creationTime: item["creationTime"],
    expiryTime: item["expiryTime"],
    encryptionContext: item["encryptionContext"],
  };
}

export function pathItemXmlDeserializer(xmlString: string): PathItem {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "name" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "isDirectory",
      xmlOptions: { name: "isDirectory" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "lastModified",
      xmlOptions: { name: "lastModified" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "etag",
      xmlOptions: { name: "eTag" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "contentLength",
      xmlOptions: { name: "contentLength" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "owner",
      xmlOptions: { name: "owner" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "group",
      xmlOptions: { name: "group" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "permissions",
      xmlOptions: { name: "permissions" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "encryptionScope",
      xmlOptions: { name: "EncryptionScope" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "creationTime",
      xmlOptions: { name: "creationTime" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "expiryTime",
      xmlOptions: { name: "expiryTime" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "encryptionContext",
      xmlOptions: { name: "EncryptionContext" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<PathItem>(xmlString, properties, "PathItem");
}

/** An enumeration of blobs. */
export interface ListBlobsHierarchySegmentResponse {
  /** The service endpoint. */
  serviceEndpoint: string;
  /** The container name. */
  containerName: string;
  /** The prefix filter. */
  prefix?: string;
  /** The marker for pagination. */
  marker?: string;
  /** The maximum number of results. */
  maxResults?: number;
  /** The delimiter used for hierarchy. */
  delimiter?: string;
  /** The blob segment. */
  segment: BlobHierarchyListSegment;
  /** The next marker for pagination. */
  nextMarker?: string;
}

export function listBlobsHierarchySegmentResponseDeserializer(
  item: any,
): ListBlobsHierarchySegmentResponse {
  return {
    serviceEndpoint: item["serviceEndpoint"],
    containerName: item["containerName"],
    prefix: item["prefix"],
    marker: item["marker"],
    maxResults: item["maxResults"],
    delimiter: item["delimiter"],
    segment: blobHierarchyListSegmentDeserializer(item["segment"]),
    nextMarker: item["nextMarker"],
  };
}

export function listBlobsHierarchySegmentResponseXmlDeserializer(
  xmlString: string,
): ListBlobsHierarchySegmentResponse {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "serviceEndpoint",
      xmlOptions: { name: "ServiceEndpoint", attribute: true },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "containerName",
      xmlOptions: { name: "ContainerName", attribute: true },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "prefix",
      xmlOptions: { name: "Prefix" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "marker",
      xmlOptions: { name: "Marker" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "maxResults",
      xmlOptions: { name: "MaxResults" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "delimiter",
      xmlOptions: { name: "Delimiter" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "segment",
      xmlOptions: { name: "Blobs" },
      type: "object",
      deserializer: blobHierarchyListSegmentXmlObjectDeserializer,
    },
    {
      propertyName: "nextMarker",
      xmlOptions: { name: "NextMarker" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<ListBlobsHierarchySegmentResponse>(
    xmlString,
    properties,
    "EnumerationResults",
  );
}

/** A segment of blob hierarchy items. */
export interface BlobHierarchyListSegment {
  /** The blob prefixes. */
  blobPrefixes?: BlobPrefix[];
  /** The blob items. */
  blobItems: BlobItemModel[];
}

export function blobHierarchyListSegmentDeserializer(item: any): BlobHierarchyListSegment {
  return {
    blobPrefixes: !item["blobPrefixes"]
      ? item["blobPrefixes"]
      : blobPrefixArrayDeserializer(item["blobPrefixes"]),
    blobItems: blobItemModelArrayDeserializer(item["blobItems"]),
  };
}

export function blobHierarchyListSegmentXmlDeserializer(
  xmlString: string,
): BlobHierarchyListSegment {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "blobPrefixes",
      xmlOptions: { name: "BlobPrefix", unwrapped: true, itemsName: "BlobPrefix" },
      type: "array",
      deserializer: blobPrefixXmlObjectDeserializer,
    },
    {
      propertyName: "blobItems",
      xmlOptions: { name: "Blob", unwrapped: true, itemsName: "Blob" },
      type: "array",
      deserializer: blobItemModelXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<BlobHierarchyListSegment>(xmlString, properties, "Blobs");
}

export function blobHierarchyListSegmentXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): BlobHierarchyListSegment {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "blobPrefixes",
      xmlOptions: { name: "BlobPrefix", unwrapped: true, itemsName: "BlobPrefix" },
      type: "array",
      deserializer: blobPrefixXmlObjectDeserializer,
    },
    {
      propertyName: "blobItems",
      xmlOptions: { name: "Blob", unwrapped: true, itemsName: "Blob" },
      type: "array",
      deserializer: blobItemModelXmlObjectDeserializer,
    },
  ];
  return deserializeXmlObject<BlobHierarchyListSegment>(xmlObject, properties);
}

export function blobPrefixArrayDeserializer(result: Array<BlobPrefix>): any[] {
  return result.map((item) => {
    return blobPrefixDeserializer(item);
  });
}

/** A blob prefix. */
export interface BlobPrefix {
  /** The prefix name. */
  name: string;
}

export function blobPrefixDeserializer(item: any): BlobPrefix {
  return {
    name: item["name"],
  };
}

export function blobPrefixXmlDeserializer(xmlString: string): BlobPrefix {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "Name" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<BlobPrefix>(xmlString, properties, "BlobPrefix");
}

export function blobPrefixXmlObjectDeserializer(xmlObject: Record<string, unknown>): BlobPrefix {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "Name" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeXmlObject<BlobPrefix>(xmlObject, properties);
}

export function blobItemModelArrayDeserializer(result: Array<BlobItemModel>): any[] {
  return result.map((item) => {
    return blobItemModelDeserializer(item);
  });
}

/** An Azure Storage blob. */
export interface BlobItemModel {
  /** The blob name. */
  name: string;
  /** Whether the blob is deleted. */
  deleted: boolean;
  /** The snapshot. */
  snapshot: string;
  /** The version ID. */
  versionId?: string;
  /** Whether this is the current version. */
  isCurrentVersion?: boolean;
  /** The blob properties. */
  properties: BlobPropertiesModel;
  /** The deletion ID. */
  deletionId?: string;
}

export function blobItemModelDeserializer(item: any): BlobItemModel {
  return {
    name: item["name"],
    deleted: item["deleted"],
    snapshot: item["snapshot"],
    versionId: item["versionId"],
    isCurrentVersion: item["isCurrentVersion"],
    properties: blobPropertiesModelDeserializer(item["properties"]),
    deletionId: item["deletionId"],
  };
}

export function blobItemModelXmlDeserializer(xmlString: string): BlobItemModel {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "Name" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "deleted",
      xmlOptions: { name: "Deleted" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "snapshot",
      xmlOptions: { name: "Snapshot" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "versionId",
      xmlOptions: { name: "VersionId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "isCurrentVersion",
      xmlOptions: { name: "IsCurrentVersion" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "properties",
      xmlOptions: { name: "Properties" },
      type: "object",
      deserializer: blobPropertiesModelXmlObjectDeserializer,
    },
    {
      propertyName: "deletionId",
      xmlOptions: { name: "DeletionId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<BlobItemModel>(xmlString, properties, "Blob");
}

export function blobItemModelXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): BlobItemModel {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "Name" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "deleted",
      xmlOptions: { name: "Deleted" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "snapshot",
      xmlOptions: { name: "Snapshot" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "versionId",
      xmlOptions: { name: "VersionId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "isCurrentVersion",
      xmlOptions: { name: "IsCurrentVersion" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "properties",
      xmlOptions: { name: "Properties" },
      type: "object",
      deserializer: blobPropertiesModelXmlObjectDeserializer,
    },
    {
      propertyName: "deletionId",
      xmlOptions: { name: "DeletionId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeXmlObject<BlobItemModel>(xmlObject, properties);
}

/** Properties of a blob. */
export interface BlobPropertiesModel {
  /** The creation time. */
  creationTime?: Date;
  /** The last modified time. */
  lastModified: Date;
  /** The entity tag. */
  etag: string;
  /** Size in bytes. */
  contentLength?: number;
  /** The content type. */
  contentType?: string;
  /** The content encoding. */
  contentEncoding?: string;
  /** The content language. */
  contentLanguage?: string;
  /** The content MD5 hash. */
  contentMd5?: Uint8Array;
  /** The content disposition. */
  contentDisposition?: string;
  /** The cache control. */
  cacheControl?: string;
  /** The blob sequence number. */
  blobSequenceNumber?: number;
  /** The copy ID. */
  copyId?: string;
  /** The copy source. */
  copySource?: string;
  /** The copy progress. */
  copyProgress?: string;
  /** The copy completion time. */
  copyCompletionTime?: Date;
  /** The copy status description. */
  copyStatusDescription?: string;
  /** Whether the server is encrypted. */
  serverEncrypted?: boolean;
  /** Whether it is an incremental copy. */
  incrementalCopy?: boolean;
  /** The destination snapshot. */
  destinationSnapshot?: string;
  /** The deleted time. */
  deletedTime?: Date;
  /** The remaining retention days. */
  remainingRetentionDays?: number;
  /** Whether the access tier is inferred. */
  accessTierInferred?: boolean;
  /** The customer-provided key SHA256 hash. */
  customerProvidedKeySha256?: string;
  /** The name of the encryption scope under which the blob is encrypted. */
  encryptionScope?: string;
  /** The access tier change time. */
  accessTierChangeTime?: Date;
  /** The tag count. */
  tagCount?: number;
  /** The expiry time. */
  expiresOn?: Date;
  /** Whether the blob is sealed. */
  sealed?: boolean;
  /** The last accessed time. */
  lastAccessedOn?: Date;
  /** The delete time. */
  deleteTime?: Date;
}

export function blobPropertiesModelDeserializer(item: any): BlobPropertiesModel {
  return {
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModified: new Date(item["lastModified"]),
    etag: item["etag"],
    contentLength: item["contentLength"],
    contentType: item["contentType"],
    contentEncoding: item["contentEncoding"],
    contentLanguage: item["contentLanguage"],
    contentMd5: !item["contentMd5"]
      ? item["contentMd5"]
      : typeof item["contentMd5"] === "string"
        ? stringToUint8Array(item["contentMd5"], "base64")
        : item["contentMd5"],
    contentDisposition: item["contentDisposition"],
    cacheControl: item["cacheControl"],
    blobSequenceNumber: item["blobSequenceNumber"],
    copyId: item["copyId"],
    copySource: item["copySource"],
    copyProgress: item["copyProgress"],
    copyCompletionTime: !item["copyCompletionTime"]
      ? item["copyCompletionTime"]
      : new Date(item["copyCompletionTime"]),
    copyStatusDescription: item["copyStatusDescription"],
    serverEncrypted: item["serverEncrypted"],
    incrementalCopy: item["incrementalCopy"],
    destinationSnapshot: item["destinationSnapshot"],
    deletedTime: !item["deletedTime"] ? item["deletedTime"] : new Date(item["deletedTime"]),
    remainingRetentionDays: item["remainingRetentionDays"],
    accessTierInferred: item["accessTierInferred"],
    customerProvidedKeySha256: item["customerProvidedKeySha256"],
    encryptionScope: item["encryptionScope"],
    accessTierChangeTime: !item["accessTierChangeTime"]
      ? item["accessTierChangeTime"]
      : new Date(item["accessTierChangeTime"]),
    tagCount: item["tagCount"],
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : new Date(item["expiresOn"]),
    sealed: item["sealed"],
    lastAccessedOn: !item["lastAccessedOn"]
      ? item["lastAccessedOn"]
      : new Date(item["lastAccessedOn"]),
    deleteTime: !item["deleteTime"] ? item["deleteTime"] : new Date(item["deleteTime"]),
  };
}

export function blobPropertiesModelXmlDeserializer(xmlString: string): BlobPropertiesModel {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "creationTime",
      xmlOptions: { name: "Creation-Time" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "lastModified",
      xmlOptions: { name: "Last-Modified" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "etag",
      xmlOptions: { name: "Etag" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "contentLength",
      xmlOptions: { name: "Content-Length" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "contentType",
      xmlOptions: { name: "Content-Type" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "contentEncoding",
      xmlOptions: { name: "Content-Encoding" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "contentLanguage",
      xmlOptions: { name: "Content-Language" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "contentMd5",
      xmlOptions: { name: "Content-MD5" },
      type: "bytes",
      bytesEncoding: "base64",
    },
    {
      propertyName: "contentDisposition",
      xmlOptions: { name: "Content-Disposition" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "cacheControl",
      xmlOptions: { name: "Cache-Control" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "blobSequenceNumber",
      xmlOptions: { name: "x-ms-blob-sequence-number" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "copyId",
      xmlOptions: { name: "CopyId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "copySource",
      xmlOptions: { name: "CopySource" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "copyProgress",
      xmlOptions: { name: "CopyProgress" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "copyCompletionTime",
      xmlOptions: { name: "CopyCompletionTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "copyStatusDescription",
      xmlOptions: { name: "CopyStatusDescription" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "serverEncrypted",
      xmlOptions: { name: "ServerEncrypted" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "incrementalCopy",
      xmlOptions: { name: "IncrementalCopy" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "destinationSnapshot",
      xmlOptions: { name: "DestinationSnapshot" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "deletedTime",
      xmlOptions: { name: "DeletedTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "remainingRetentionDays",
      xmlOptions: { name: "RemainingRetentionDays" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "accessTierInferred",
      xmlOptions: { name: "AccessTierInferred" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "customerProvidedKeySha256",
      xmlOptions: { name: "CustomerProvidedKeySha256" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "encryptionScope",
      xmlOptions: { name: "EncryptionScope" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "accessTierChangeTime",
      xmlOptions: { name: "AccessTierChangeTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "tagCount",
      xmlOptions: { name: "TagCount" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "expiresOn",
      xmlOptions: { name: "Expiry-Time" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "sealed",
      xmlOptions: { name: "Sealed" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "lastAccessedOn",
      xmlOptions: { name: "LastAccessTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "deleteTime",
      xmlOptions: { name: "DeleteTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
  ];
  return deserializeFromXml<BlobPropertiesModel>(xmlString, properties, "Properties");
}

export function blobPropertiesModelXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): BlobPropertiesModel {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "creationTime",
      xmlOptions: { name: "Creation-Time" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "lastModified",
      xmlOptions: { name: "Last-Modified" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "etag",
      xmlOptions: { name: "Etag" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "contentLength",
      xmlOptions: { name: "Content-Length" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "contentType",
      xmlOptions: { name: "Content-Type" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "contentEncoding",
      xmlOptions: { name: "Content-Encoding" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "contentLanguage",
      xmlOptions: { name: "Content-Language" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "contentMd5",
      xmlOptions: { name: "Content-MD5" },
      type: "bytes",
      bytesEncoding: "base64",
    },
    {
      propertyName: "contentDisposition",
      xmlOptions: { name: "Content-Disposition" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "cacheControl",
      xmlOptions: { name: "Cache-Control" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "blobSequenceNumber",
      xmlOptions: { name: "x-ms-blob-sequence-number" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "copyId",
      xmlOptions: { name: "CopyId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "copySource",
      xmlOptions: { name: "CopySource" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "copyProgress",
      xmlOptions: { name: "CopyProgress" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "copyCompletionTime",
      xmlOptions: { name: "CopyCompletionTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "copyStatusDescription",
      xmlOptions: { name: "CopyStatusDescription" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "serverEncrypted",
      xmlOptions: { name: "ServerEncrypted" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "incrementalCopy",
      xmlOptions: { name: "IncrementalCopy" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "destinationSnapshot",
      xmlOptions: { name: "DestinationSnapshot" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "deletedTime",
      xmlOptions: { name: "DeletedTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "remainingRetentionDays",
      xmlOptions: { name: "RemainingRetentionDays" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "accessTierInferred",
      xmlOptions: { name: "AccessTierInferred" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "customerProvidedKeySha256",
      xmlOptions: { name: "CustomerProvidedKeySha256" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "encryptionScope",
      xmlOptions: { name: "EncryptionScope" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "accessTierChangeTime",
      xmlOptions: { name: "AccessTierChangeTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "tagCount",
      xmlOptions: { name: "TagCount" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "expiresOn",
      xmlOptions: { name: "Expiry-Time" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "sealed",
      xmlOptions: { name: "Sealed" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "lastAccessedOn",
      xmlOptions: { name: "LastAccessTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "deleteTime",
      xmlOptions: { name: "DeleteTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
  ];
  return deserializeXmlObject<BlobPropertiesModel>(xmlObject, properties);
}

/** The response for set access control recursive operations. */
export interface SetAccessControlRecursiveResponse {
  /** The number of directories successfully processed. */
  directoriesSuccessful?: number;
  /** The number of files successfully processed. */
  filesSuccessful?: number;
  /** The number of failures. */
  failureCount?: number;
  /** The list of failed entries. */
  failedEntries?: AclFailedEntry[];
}

export function setAccessControlRecursiveResponseDeserializer(
  item: any,
): SetAccessControlRecursiveResponse {
  return {
    directoriesSuccessful: item["directoriesSuccessful"],
    filesSuccessful: item["filesSuccessful"],
    failureCount: item["failureCount"],
    failedEntries: !item["failedEntries"]
      ? item["failedEntries"]
      : aclFailedEntryArrayDeserializer(item["failedEntries"]),
  };
}

export function aclFailedEntryArrayDeserializer(result: Array<AclFailedEntry>): any[] {
  return result.map((item) => {
    return aclFailedEntryDeserializer(item);
  });
}

/** An ACL failed entry. */
export interface AclFailedEntry {
  /** The name of the entry. */
  name?: string;
  /** The type of the entry. */
  type?: string;
  /** The error message. */
  errorMessage?: string;
}

export function aclFailedEntryDeserializer(item: any): AclFailedEntry {
  return {
    name: item["name"],
    type: item["type"],
    errorMessage: item["errorMessage"],
  };
}

/** The value must be "account" for all account operations. */
export type AccountResourceType = "account";
/** The value must be "filesystem" for all filesystem operations. */
export type FileSystemResourceType = "filesystem";
/** Include this parameter to specify one or more datasets to include in the response. */
export type ListBlobsIncludeItem =
  | "copy"
  | "deleted"
  | "metadata"
  | "snapshots"
  | "uncommittedblobs"
  | "versions"
  | "tags";
/** The show only filter for list blobs. */
export type ListBlobsShowOnly = "deleted";
/** Required only for Create File and Create Directory. The value must be "file" or "directory". */
export type PathResourceType = "directory" | "file";
/** The rename mode. The value must be "legacy" or "posix". */
export type PathRenameMode = "legacy" | "posix";
/** The encryption algorithm type. */
export type EncryptionAlgorithmType = "AES256";

/** The path expiry options. */
export enum KnownPathExpiryOptions {
  /** Never expire. */
  NeverExpire = "NeverExpire",
  /** Relative to creation time. */
  RelativeToCreation = "RelativeToCreation",
  /** Relative to now. */
  RelativeToNow = "RelativeToNow",
  /** Absolute time. */
  Absolute = "Absolute",
}

/**
 * The path expiry options. \
 * {@link KnownPathExpiryOptions} can be used interchangeably with PathExpiryOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NeverExpire**: Never expire. \
 * **RelativeToCreation**: Relative to creation time. \
 * **RelativeToNow**: Relative to now. \
 * **Absolute**: Absolute time.
 */
export type PathExpiryOptions = string;
/** The action to perform on the path during update. */
export type PathUpdateAction =
  | "append"
  | "flush"
  | "setProperties"
  | "setAccessControl"
  | "setAccessControlRecursive";
/** The mode for recursive access control operations. */
export type PathSetAccessControlRecursiveMode = "set" | "modify" | "remove";
/** The lease action for Path_Lease. */
export type PathLeaseAction = "acquire" | "break" | "change" | "renew" | "release";
/** The action for Path_GetProperties. */
export type PathGetPropertiesAction = "getAccessControl" | "getStatus";
/** The lease action for append and flush operations. */
export type LeaseAction = "acquire" | "auto-renew" | "release" | "acquire-release";

/** The Azure Data Lake Storage service versions. */
export enum KnownVersions {
  /** The 2026-02-06 version of the Azure Data Lake Storage service. */
  V20260206 = "2026-02-06",
}
