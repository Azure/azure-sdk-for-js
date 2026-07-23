// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as coreClient from "@azure/core-client";
import { parseXML } from "@azure/core-xml";
import { ArrowTableReader } from "@azure/storage-common";
import type {
  BlobItemInternal,
  BlobPrefix as BlobPrefixInternal,
  BlobPropertiesInternal,
  BlobTags,
  ListBlobsFlatSegmentResponse,
  ListBlobsHierarchySegmentResponse,
} from "../generated/src/models/index.js";
import * as Mappers from "../generated/src/models/mappers.js";

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
  const bytes = await readResponseBodyToBytes(response);
  return parseBlobListArrowBytes(bytes);
}

/**
 * Parses an Apache Arrow IPC stream (as bytes) produced by the Blob List Blobs
 * Apache Arrow operation into blob items and prefixes.
 *
 * The Arrow data is columnar: each field (e.g. `Name`, `Content-Length`) is a
 * separate column. We reconstruct one {@link BlobItemInternal} row per row by reading
 * each column at that row index; the caller projects those to public models. The
 * continuation token travels in the schema metadata (a page-level value, not a column).
 *
 * @param bytes - The Apache Arrow IPC stream bytes.
 */
async function parseBlobListArrowBytes(
  bytes: Uint8Array,
): Promise<ParsedBlobListArrowSegment> {
  // Load apache-arrow lazily so the (sizable) dependency is only pulled in when a
  // caller actually opts into the Apache Arrow response format. This keeps the
  // default XML path and browser bundles lean.
  const { tableFromIPC } = await import("apache-arrow");
  const reader = new ArrowTableReader(tableFromIPC(bytes));

  const nextMarker = reader.metadata("NextMarker");

  const blobItems: BlobItemInternal[] = [];
  const blobPrefixes: BlobPrefixInternal[] = [];

  for (let i = 0; i < reader.rowCount; i++) {
    // BlobPrefix rows only populate the `Name` column; all others are null.
    const resourceType = reader.string(i, "ResourceType");
    if (resourceType !== undefined && resourceType.toLowerCase() === "blobprefix") {
      blobPrefixes.push({ name: { content: reader.string(i, "Name") ?? "" } });
      continue;
    }

    const properties: BlobPropertiesInternal = {
      createdOn: reader.date(i, "Creation-Time"),
      lastModified: reader.date(i, "Last-Modified") ?? new Date(0),
      etag: reader.string(i, "Etag") ?? "",
      contentLength: reader.number(i, "Content-Length"),
      contentType: reader.string(i, "Content-Type"),
      contentEncoding: reader.string(i, "Content-Encoding"),
      contentLanguage: reader.string(i, "Content-Language"),
      contentMD5: reader.bytesFromBase64(i, "Content-MD5"),
      contentDisposition: reader.string(i, "Content-Disposition"),
      cacheControl: reader.string(i, "Cache-Control"),
      blobSequenceNumber: reader.number(i, "x-ms-blob-sequence-number"),
      blobType: reader.string(i, "BlobType") as BlobPropertiesInternal["blobType"],
      leaseStatus: reader.string(i, "LeaseStatus") as BlobPropertiesInternal["leaseStatus"],
      leaseState: reader.string(i, "LeaseState") as BlobPropertiesInternal["leaseState"],
      leaseDuration: reader.string(i, "LeaseDuration") as BlobPropertiesInternal["leaseDuration"],
      copyId: reader.string(i, "CopyId"),
      copyStatus: reader.string(i, "CopyStatus") as BlobPropertiesInternal["copyStatus"],
      copySource: reader.string(i, "CopySource"),
      copyProgress: reader.string(i, "CopyProgress"),
      copyCompletedOn: reader.date(i, "CopyCompletionTime"),
      copyStatusDescription: reader.string(i, "CopyStatusDescription"),
      serverEncrypted: reader.boolean(i, "ServerEncrypted"),
      incrementalCopy: reader.boolean(i, "IncrementalCopy"),
      destinationSnapshot: reader.string(i, "CopyDestinationSnapshot"),
      deletedOn: reader.date(i, "DeletedTime"),
      remainingRetentionDays: reader.number(i, "RemainingRetentionDays"),
      accessTier: reader.string(i, "AccessTier") as BlobPropertiesInternal["accessTier"],
      accessTierInferred: reader.boolean(i, "AccessTierInferred"),
      archiveStatus: reader.string(i, "ArchiveStatus") as BlobPropertiesInternal["archiveStatus"],
      smartAccessTier: reader.string(i, "SmartAccessTier") as BlobPropertiesInternal["smartAccessTier"],
      customerProvidedKeySha256: reader.string(i, "CustomerProvidedKeySha256"),
      encryptionScope: reader.string(i, "EncryptionScope"),
      accessTierChangedOn: reader.date(i, "AccessTierChangeTime"),
      tagCount: reader.number(i, "TagCount"),
      isSealed: reader.boolean(i, "Sealed"),
      rehydratePriority: reader.string(
        i,
        "RehydratePriority",
      ) as BlobPropertiesInternal["rehydratePriority"],
      lastAccessedOn: reader.date(i, "LastAccessTime"),
      immutabilityPolicyExpiresOn: reader.date(i, "ImmutabilityPolicyUntilDate"),
      immutabilityPolicyMode: reader.string(
        i,
        "ImmutabilityPolicyMode",
      ) as BlobPropertiesInternal["immutabilityPolicyMode"],
      legalHold: reader.boolean(i, "LegalHold"),
    };

    blobItems.push({
      name: { content: reader.string(i, "Name") ?? "" },
      deleted: reader.boolean(i, "Deleted") ?? false,
      snapshot: reader.string(i, "Snapshot") ?? "",
      versionId: reader.string(i, "VersionId"),
      isCurrentVersion: reader.boolean(i, "IsCurrentVersion"),
      properties,
      metadata: reader.map(i, "Metadata"),
      blobTags: toBlobTags(reader.map(i, "Tags")),
      objectReplicationMetadata: reader.map(i, "OrMetadata"),
      hasVersionsOnly: reader.boolean(i, "HasVersionsOnly"),
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
  throw new RangeError("List Blobs Apache Arrow response body is empty or unavailable.");
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
