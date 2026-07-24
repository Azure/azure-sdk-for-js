// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as coreClient from "@azure/core-client";
import { parseXML } from "@azure/core-xml";
import type {
  ListBlobsFlatSegmentResponse,
  ListBlobsHierarchySegmentResponse,
} from "../generated/src/models/index.js";
import * as Mappers from "../generated/src/models/mappers.js";
import { readResponseBodyToBytes } from "./utils.common.js";

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
