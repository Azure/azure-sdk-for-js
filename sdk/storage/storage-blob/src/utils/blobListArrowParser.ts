// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as coreClient from "@azure/core-client";
import { parseXML } from "@azure/core-xml";
import { stringToUint8Array } from "@azure/core-util";
import type {
  BlobPropertiesInternal,
  ListBlobsFlatSegmentResponse,
  ListBlobsHierarchySegmentResponse,
} from "../generated/src/models/index.js";
import * as Mappers from "../generated/src/models/mappers.js";
import type { BlobPrefix } from "../generatedModels.js";
import type { BlobItem } from "../ContainerClient.js";
import { parseObjectReplicationRecord } from "./utils.common.js";

/**
 * The result of parsing an Apache Arrow blob-listing segment: the blobs and
 * prefixes for the current page plus the continuation token for the next page.
 */
export interface ParsedBlobListArrowSegment {
  /** Continuation token for the next page, read from the Arrow schema metadata. */
  nextMarker?: string;
  /** The blobs in this page. */
  blobItems: BlobItem[];
  /** The blob prefixes in this page (only populated for hierarchy listings). */
  blobPrefixes: BlobPrefix[];
}

/**
 * Reads the raw body of an Apache Arrow List Blobs response (a Node.js readable
 * stream or a browser Blob) and parses it into blob items and prefixes.
 *
 * @param response - The raw stream response returned by the Apache Arrow list operation.
 */
export async function parseBlobListArrowResponse(response: {
  readableStreamBody?: NodeJS.ReadableStream;
  blobBody?: Promise<Blob>;
}): Promise<ParsedBlobListArrowSegment> {
  const bytes = await readResponseBodyToBytes(response);
  return parseBlobListArrowBytes(bytes);
}

/**
 * Parses an Apache Arrow IPC stream (as bytes) produced by the Blob List Blobs
 * Apache Arrow operation into blob items and prefixes.
 *
 * The Arrow data is columnar: each field (e.g. `Name`, `Content-Length`) is a
 * separate column. We reconstruct one {@link BlobItem} per row by reading each
 * column at that row index. The continuation token travels in the schema
 * metadata (it is a page-level value, not a per-row column).
 *
 * @param bytes - The Apache Arrow IPC stream bytes.
 */
export async function parseBlobListArrowBytes(
  bytes: Uint8Array,
): Promise<ParsedBlobListArrowSegment> {
  // Load apache-arrow lazily so the (sizable) dependency is only pulled in when a
  // caller actually opts into the Apache Arrow response format. This keeps the
  // default XML path and browser bundles lean.
  const { tableFromIPC } = await import("apache-arrow");
  const table = tableFromIPC(bytes);

  const nextMarker = table.schema.metadata?.get("NextMarker") ?? undefined;

  const blobItems: BlobItem[] = [];
  const blobPrefixes: BlobPrefix[] = [];

  const getColumn = (columnName: string): { get(rowIndex: number): unknown } | null =>
    (
      table as unknown as {
        getChild(name: string): { get(rowIndex: number): unknown } | null;
      }
    ).getChild(columnName);

  const cell = (rowIndex: number, columnName: string): unknown =>
    getColumn(columnName)?.get(rowIndex);

  const asString = (rowIndex: number, columnName: string): string | undefined => {
    const value = cell(rowIndex, columnName);
    return value === undefined || value === null ? undefined : String(value);
  };
  const asBoolean = (rowIndex: number, columnName: string): boolean | undefined => {
    const value = cell(rowIndex, columnName);
    return value === undefined || value === null ? undefined : Boolean(value);
  };
  const asNumber = (rowIndex: number, columnName: string): number | undefined => {
    const value = cell(rowIndex, columnName);
    return value === undefined || value === null ? undefined : Number(value);
  };
  const asDate = (rowIndex: number, columnName: string): Date | undefined => {
    const value = cell(rowIndex, columnName);
    if (value === undefined || value === null) {
      return undefined;
    }
    // apache-arrow normalizes every Timestamp unit to epoch milliseconds when a
    // cell is read (SECOND x1000, MICROSECOND /1000, NANOSECOND /1e6), so the
    // value is already in the milliseconds a Date expects and must not be scaled
    // again. Fall back to string parsing if a column ever arrives non-numeric.
    const millis = Number(value);
    if (Number.isNaN(millis)) {
      const parsed = Date.parse(String(value));
      return Number.isNaN(parsed) ? undefined : new Date(parsed);
    }
    return new Date(millis);
  };
  const asBytesFromBase64 = (rowIndex: number, columnName: string): Uint8Array | undefined => {
    const value = asString(rowIndex, columnName);
    return value === undefined ? undefined : stringToUint8Array(value, "base64");
  };
  const asMap = (rowIndex: number, columnName: string): Record<string, string> | undefined =>
    toRecord(cell(rowIndex, columnName));

  for (let i = 0; i < table.numRows; i++) {
    // BlobPrefix rows only populate the `Name` column; all others are null.
    const resourceType = asString(i, "ResourceType");
    if (resourceType !== undefined && resourceType.toLowerCase() === "blobprefix") {
      blobPrefixes.push({ name: asString(i, "Name") ?? "" });
      continue;
    }

    const properties: BlobPropertiesInternal = {
      createdOn: asDate(i, "Creation-Time"),
      lastModified: asDate(i, "Last-Modified") ?? new Date(0),
      etag: asString(i, "Etag") ?? "",
      contentLength: asNumber(i, "Content-Length"),
      contentType: asString(i, "Content-Type"),
      contentEncoding: asString(i, "Content-Encoding"),
      contentLanguage: asString(i, "Content-Language"),
      contentMD5: asBytesFromBase64(i, "Content-MD5"),
      contentDisposition: asString(i, "Content-Disposition"),
      cacheControl: asString(i, "Cache-Control"),
      blobSequenceNumber: asNumber(i, "x-ms-blob-sequence-number"),
      blobType: asString(i, "BlobType") as BlobPropertiesInternal["blobType"],
      leaseStatus: asString(i, "LeaseStatus") as BlobPropertiesInternal["leaseStatus"],
      leaseState: asString(i, "LeaseState") as BlobPropertiesInternal["leaseState"],
      leaseDuration: asString(i, "LeaseDuration") as BlobPropertiesInternal["leaseDuration"],
      copyId: asString(i, "CopyId"),
      copyStatus: asString(i, "CopyStatus") as BlobPropertiesInternal["copyStatus"],
      copySource: asString(i, "CopySource"),
      copyProgress: asString(i, "CopyProgress"),
      copyCompletedOn: asDate(i, "CopyCompletionTime"),
      copyStatusDescription: asString(i, "CopyStatusDescription"),
      serverEncrypted: asBoolean(i, "ServerEncrypted"),
      incrementalCopy: asBoolean(i, "IncrementalCopy"),
      destinationSnapshot: asString(i, "CopyDestinationSnapshot"),
      deletedOn: asDate(i, "DeletedTime"),
      remainingRetentionDays: asNumber(i, "RemainingRetentionDays"),
      accessTier: asString(i, "AccessTier") as BlobPropertiesInternal["accessTier"],
      accessTierInferred: asBoolean(i, "AccessTierInferred"),
      archiveStatus: asString(i, "ArchiveStatus") as BlobPropertiesInternal["archiveStatus"],
      smartAccessTier: asString(i, "SmartAccessTier") as BlobPropertiesInternal["smartAccessTier"],
      customerProvidedKeySha256: asString(i, "CustomerProvidedKeySha256"),
      encryptionScope: asString(i, "EncryptionScope"),
      accessTierChangedOn: asDate(i, "AccessTierChangeTime"),
      tagCount: asNumber(i, "TagCount"),
      isSealed: asBoolean(i, "Sealed"),
      rehydratePriority: asString(
        i,
        "RehydratePriority",
      ) as BlobPropertiesInternal["rehydratePriority"],
      lastAccessedOn: asDate(i, "LastAccessTime"),
      immutabilityPolicyExpiresOn: asDate(i, "ImmutabilityPolicyUntilDate"),
      immutabilityPolicyMode: asString(
        i,
        "ImmutabilityPolicyMode",
      ) as BlobPropertiesInternal["immutabilityPolicyMode"],
      legalHold: asBoolean(i, "LegalHold"),
    };

    blobItems.push({
      name: asString(i, "Name") ?? "",
      deleted: asBoolean(i, "Deleted") ?? false,
      snapshot: asString(i, "Snapshot") ?? "",
      versionId: asString(i, "VersionId"),
      isCurrentVersion: asBoolean(i, "IsCurrentVersion"),
      properties,
      metadata: asMap(i, "Metadata"),
      tags: asMap(i, "Tags") as BlobItem["tags"],
      objectReplicationSourceProperties: parseObjectReplicationRecord(asMap(i, "OrMetadata")),
      hasVersionsOnly: asBoolean(i, "HasVersionsOnly"),
    });
  }

  return { nextMarker, blobItems, blobPrefixes };
}

/**
 * Converts an Apache Arrow map cell into a plain string dictionary. Handles the
 * possible shapes an arrow map value can take (iterable of `[key, value]` pairs,
 * iterable of `{ key, value }` structs, or a plain object).
 */
function toRecord(value: unknown): Record<string, string> | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  const result: Record<string, string> = {};
  const asText = (v: unknown): string => (v === undefined || v === null ? "" : String(v));
  if (typeof (value as { [Symbol.iterator]?: unknown })[Symbol.iterator] === "function") {
    for (const entry of value as Iterable<unknown>) {
      if (Array.isArray(entry)) {
        result[String(entry[0])] = asText(entry[1]);
      } else if (entry && typeof entry === "object" && "key" in entry) {
        const { key, value: entryValue } = entry as { key: unknown; value: unknown };
        result[String(key)] = asText(entryValue);
      }
    }
  } else if (typeof value === "object") {
    for (const [key, entryValue] of Object.entries(value as Record<string, unknown>)) {
      result[key] = asText(entryValue);
    }
  }
  return result;
}

/**
 * Reads a raw response body (a Node.js readable stream or a browser Blob) into a
 * single byte array so it can be handed to the isomorphic Apache Arrow reader.
 */
async function readResponseBodyToBytes(response: {
  readableStreamBody?: NodeJS.ReadableStream;
  blobBody?: Promise<Blob>;
}): Promise<Uint8Array> {
  if (response.blobBody) {
    const blob = await response.blobBody;
    return new Uint8Array(await blob.arrayBuffer());
  }
  if (response.readableStreamBody) {
    return readNodeStreamToBytes(response.readableStreamBody);
  }
  return new Uint8Array(0);
}

function readNodeStreamToBytes(stream: NodeJS.ReadableStream): Promise<Uint8Array> {
  return new Promise<Uint8Array>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    let totalLength = 0;
    stream.on("data", (chunk: Uint8Array | string) => {
      const bytes = typeof chunk === "string" ? new TextEncoder().encode(chunk) : chunk;
      chunks.push(bytes);
      totalLength += bytes.byteLength;
    });
    stream.on("end", () => {
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.byteLength;
      }
      resolve(result);
    });
    stream.on("error", reject);
  });
}

const listBlobsXmlSerializer = coreClient.createSerializer(Mappers, /* isXml */ true);

/**
 * Reads a raw response body (a Node.js readable stream or a browser Blob) as text,
 * used for the XML fallback path.
 */
async function readResponseBodyToText(response: {
  readableStreamBody?: NodeJS.ReadableStream;
  blobBody?: Promise<Blob>;
}): Promise<string> {
  const bytes = await readResponseBodyToBytes(response);
  return new TextDecoder().decode(bytes);
}

/**
 * Deserializes a List Blobs (flat) XML response body. Used when the service falls
 * back to XML for an account that does not support Apache Arrow; parses the
 * already-received stream instead of issuing a second request.
 *
 * @param response - The raw stream response returned by the Apache Arrow list operation.
 */
export async function deserializeListBlobFlatSegmentXml(response: {
  readableStreamBody?: NodeJS.ReadableStream;
  blobBody?: Promise<Blob>;
}): Promise<ListBlobsFlatSegmentResponse> {
  const parsed = (await parseXML(await readResponseBodyToText(response), {
    includeRoot: true,
  })) as Record<string, unknown>;
  return listBlobsXmlSerializer.deserialize(
    Mappers.ListBlobsFlatSegmentResponse,
    parsed.EnumerationResults ?? parsed,
    "EnumerationResults",
  ) as ListBlobsFlatSegmentResponse;
}

/**
 * Deserializes a List Blobs by hierarchy XML response body (see
 * {@link deserializeListBlobFlatSegmentXml}).
 *
 * @param response - The raw stream response returned by the Apache Arrow list operation.
 */
export async function deserializeListBlobHierarchySegmentXml(response: {
  readableStreamBody?: NodeJS.ReadableStream;
  blobBody?: Promise<Blob>;
}): Promise<ListBlobsHierarchySegmentResponse> {
  const parsed = (await parseXML(await readResponseBodyToText(response), {
    includeRoot: true,
  })) as Record<string, unknown>;
  return listBlobsXmlSerializer.deserialize(
    Mappers.ListBlobsHierarchySegmentResponse,
    parsed.EnumerationResults ?? parsed,
    "EnumerationResults",
  ) as ListBlobsHierarchySegmentResponse;
}
