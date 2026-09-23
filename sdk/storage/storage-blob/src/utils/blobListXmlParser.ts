// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ListBlobsResponse,
  ListBlobsHierarchicalResponse,
} from "../generated/models/index.js";
import {
  listBlobsResponseXmlDeserializer,
  listBlobsHierarchicalResponseXmlDeserializer,
} from "../generated/models/models.js";
import { readResponseBodyToBytes } from "./utils.common.js";

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
 * @param response - The raw stream response from the list operation, with an XML body.
 */
export async function deserializeListBlobFlatSegmentXml(response: {
  readableStreamBody?: NodeJS.ReadableStream;
  blobBody?: Promise<Blob>;
}): Promise<{ parsed: ListBlobsResponse; bodyAsText: string }> {
  const bodyAsText = await readResponseBodyToText(response);
  const parsed = listBlobsResponseXmlDeserializer(bodyAsText);
  return {
    parsed,
    bodyAsText,
  };
}

/**
 * Deserializes a List Blobs by hierarchy XML response body (see
 * {@link deserializeListBlobFlatSegmentXml}).
 *
 * @param response - The raw stream response from the list operation, with an XML body.
 */
export async function deserializeListBlobHierarchySegmentXml(response: {
  readableStreamBody?: NodeJS.ReadableStream;
  blobBody?: Promise<Blob>;
}): Promise<{ parsed: ListBlobsHierarchicalResponse; bodyAsText: string }> {
  const bodyAsText = await readResponseBodyToText(response);
  const parsed = listBlobsHierarchicalResponseXmlDeserializer(bodyAsText);
  return {
    parsed,
    bodyAsText,
  };
}
