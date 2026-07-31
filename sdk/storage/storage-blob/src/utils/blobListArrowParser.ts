// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array } from "@azure/core-util";
import type { Table } from "apache-arrow";
import type {
  BlobItemInternal,
  BlobPrefix as BlobPrefixInternal,
  BlobPropertiesInternal,
  BlobTags,
} from "../generated/src/models/index.js";
import { readResponseBodyToBytes } from "./utils.common.js";

/**
 * The result of parsing an Apache Arrow blob-listing segment: the blobs and
 * prefixes for the current page plus the continuation token for the next page.
 */
export interface ParsedBlobListArrowSegment {
  /** Continuation token for the next page, read from the Arrow schema metadata. */
  nextMarker?: string;
  /** The blobs in this page, in the generated internal shape (projected to public models by the caller). */
  blobItems: BlobItemInternal[];
  /** The blob prefixes in this page (only populated for hierarchy listings). */
  blobPrefixes: BlobPrefixInternal[];
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
  // Load apache-arrow lazily so it is only pulled in when the Arrow format is requested.
  const { tableFromIPC } = await import("apache-arrow");
  // Node streams the body into apache-arrow so record batches are read incrementally;
  // the browser reads the whole Blob.
  const table = response.readableStreamBody
    ? await tableFromIPC(response.readableStreamBody)
    : tableFromIPC(await readResponseBodyToBytes(response));
  return projectArrowTable(table);
}

/**
 * Reconstructs blob items and prefixes from a decoded Apache Arrow table.
 *
 * The Arrow data is columnar: each field (e.g. `Name`, `Content-Length`) is a
 * separate column. We reconstruct one {@link BlobItemInternal} row per row by reading
 * each column at that row index; the caller projects those to public models. The
 * continuation token travels in the schema metadata (a page-level value, not a column).
 */
function projectArrowTable(table: Table): ParsedBlobListArrowSegment {
  const nextMarker = table.schema.metadata?.get("NextMarker") ?? undefined;

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

  const blobItems: BlobItemInternal[] = [];
  const blobPrefixes: BlobPrefixInternal[] = [];

  for (let i = 0; i < table.numRows; i++) {
    // BlobPrefix rows only populate the `Name` column; all others are null.
    const resourceType = asString(i, "ResourceType");
    if (resourceType !== undefined && resourceType.toLowerCase() === "blobprefix") {
      blobPrefixes.push({ name: { content: asString(i, "Name") ?? "" } });
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
      expiresOn: asDate(i, "Expiry-Time"),
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
      name: { content: asString(i, "Name") ?? "" },
      deleted: asBoolean(i, "Deleted") ?? false,
      snapshot: asString(i, "Snapshot") ?? "",
      versionId: asString(i, "VersionId"),
      isCurrentVersion: asBoolean(i, "IsCurrentVersion"),
      properties,
      metadata: asMap(i, "Metadata"),
      blobTags: toBlobTags(asMap(i, "Tags")),
      objectReplicationMetadata: asMap(i, "OrMetadata"),
      hasVersionsOnly: asBoolean(i, "HasVersionsOnly"),
    });
  }

  return { nextMarker, blobItems, blobPrefixes };
}

/**
 * Converts an Apache Arrow map cell (a plain string dictionary) into the generated
 * {@link BlobTags} shape, so the shared projection layer can flatten it exactly like
 * the XML path does.
 */
function toBlobTags(map: Record<string, string> | undefined): BlobTags | undefined {
  return map === undefined
    ? undefined
    : { blobTagSet: Object.entries(map).map(([key, value]) => ({ key, value })) };
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
  const entries: Array<[string, string]> = [];
  const asText = (v: unknown): string => (v === undefined || v === null ? "" : String(v));
  if (typeof (value as { [Symbol.iterator]?: unknown })[Symbol.iterator] === "function") {
    for (const entry of value as Iterable<unknown>) {
      if (Array.isArray(entry)) {
        entries.push([String(entry[0]), asText(entry[1])]);
      } else if (entry && typeof entry === "object" && "key" in entry) {
        const { key, value: entryValue } = entry as { key: unknown; value: unknown };
        entries.push([String(key), asText(entryValue)]);
      }
    }
  } else if (typeof value === "object") {
    for (const [key, entryValue] of Object.entries(value as Record<string, unknown>)) {
      entries.push([key, asText(entryValue)]);
    }
  }
  return Object.fromEntries(entries);
}
