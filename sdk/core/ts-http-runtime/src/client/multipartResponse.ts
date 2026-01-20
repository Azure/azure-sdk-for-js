// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "../interfaces.js";
import { uint8ArrayToString } from "../util/bytesEncoding.js";

/**
 * Represents a single part in a parsed multipart response
 */
export interface MultipartPart {
  /**
   * Headers for this part
   */
  headers: RawHttpHeaders;
  /**
   * Body content as bytes
   */
  body: Uint8Array;
}

/**
 * Represents a parsed multipart response body
 */
export interface MultipartResponseBody {
  /**
   * The parts contained in the multipart response
   */
  parts: MultipartPart[];
}

/**
 * Extracts the boundary parameter from a multipart content-type header
 * @param contentType - The content-type header value
 * @returns The boundary string, or undefined if not found
 */
export function getBoundaryFromContentType(contentType: string): string | undefined {
  const boundaryMatch = contentType.match(/boundary=([^;]+)/i);
  if (boundaryMatch) {
    // Remove quotes if present
    return boundaryMatch[1].replace(/^["']|["']$/g, "").trim();
  }
  return undefined;
}

/**
 * Checks if the content type indicates a multipart response
 * @param contentType - The content-type header value
 * @returns True if the content type is multipart/*
 */
export function isMultipartContentType(contentType: string): boolean {
  return contentType.toLowerCase().startsWith("multipart/");
}

/**
 * Parses a multipart response body into its constituent parts
 * @param body - The raw response body as string or Uint8Array
 * @param boundary - The boundary string from the Content-Type header
 * @returns The parsed multipart body with individual parts
 */
export function parseMultipartResponse(
  body: string | Uint8Array,
  boundary: string,
): MultipartResponseBody {
  // Convert body to string if Uint8Array
  const bodyString = typeof body === "string" ? body : uint8ArrayToString(body, "utf-8");

  // Prepare boundary markers
  const boundaryMarker = `--${boundary}`;

  // Split by boundary marker
  const parts: MultipartPart[] = [];

  // Split the body by boundary markers
  const segments = bodyString.split(boundaryMarker);

  // Skip the first segment (before first boundary) and process the rest
  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i];

    // Skip empty segments, closing boundary, or segments that only contain whitespace
    if (!segment || segment.trim() === "" || segment.trim().startsWith("--")) {
      continue;
    }

    // Parse the part: headers and body are separated by \r\n\r\n or \n\n
    const doubleCrLf = segment.indexOf("\r\n\r\n");
    const doubleLineFeed = segment.indexOf("\n\n");

    let headerEndIndex: number;
    let bodyStartOffset: number;

    if (doubleCrLf !== -1 && (doubleLineFeed === -1 || doubleCrLf < doubleLineFeed)) {
      headerEndIndex = doubleCrLf;
      bodyStartOffset = 4; // \r\n\r\n
    } else if (doubleLineFeed !== -1) {
      headerEndIndex = doubleLineFeed;
      bodyStartOffset = 2; // \n\n
    } else {
      // No body separator found, treat entire segment as headers
      headerEndIndex = segment.length;
      bodyStartOffset = 0;
    }

    const headerSection = segment.substring(0, headerEndIndex);
    const bodySection = segment.substring(headerEndIndex + bodyStartOffset);

    // Parse headers
    const headers: RawHttpHeaders = {};
    const headerLines = headerSection.split(/\r?\n/);

    for (const line of headerLines) {
      const colonIndex = line.indexOf(":");
      if (colonIndex > 0) {
        const headerName = line.substring(0, colonIndex).trim();
        const headerValue = line.substring(colonIndex + 1).trim();
        if (headerName) {
          headers[headerName] = headerValue;
        }
      }
    }

    // Convert body to Uint8Array, removing trailing \r\n if present
    let bodyText = bodySection;
    if (bodyText.endsWith("\r\n")) {
      bodyText = bodyText.substring(0, bodyText.length - 2);
    } else if (bodyText.endsWith("\n")) {
      bodyText = bodyText.substring(0, bodyText.length - 1);
    }

    const bodyBytes = new TextEncoder().encode(bodyText);

    parts.push({
      headers,
      body: bodyBytes,
    });
  }

  return { parts };
}
