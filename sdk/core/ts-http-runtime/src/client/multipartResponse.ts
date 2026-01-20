// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "../interfaces.js";
import { stringToUint8Array, uint8ArrayToString } from "../util/bytesEncoding.js";

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
  // Match boundary with or without quotes: boundary="value" or boundary=value
  const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|'([^']+)'|([^\s;,]+))/i);
  if (boundaryMatch) {
    // Return the matched value from one of the three capture groups
    return (boundaryMatch[1] || boundaryMatch[2] || boundaryMatch[3]).trim();
  }
  return undefined;
}

/**
 * Checks if the content type indicates a multipart response
 * @param contentType - The content-type header value
 * @returns true if the content type is multipart/*
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
  const bodyText = typeof body === "string" ? body : uint8ArrayToString(body, "utf-8");

  // Prepare boundary markers
  const boundaryMarker = `--${boundary}`;

  const parts: MultipartPart[] = [];

  // Split by boundary markers
  const sections = bodyText.split(boundaryMarker);

  for (const section of sections) {
    // Skip empty sections (typically the first one before the first boundary)
    if (!section.trim()) {
      continue;
    }

    // Check if this section starts with -- (ending boundary marker)
    // The end boundary is --boundary-- so after splitting by --boundary,
    // we'll have a section that starts with --
    if (section.trimStart().startsWith("--")) {
      break;
    }

    // Split headers and body by first occurrence of \r\n\r\n or \n\n
    const headerBodySeparator = section.indexOf("\r\n\r\n");
    const headerBodySeparatorAlt = section.indexOf("\n\n");

    let headersText: string;
    let partBody: string;

    if (headerBodySeparator !== -1) {
      headersText = section.substring(0, headerBodySeparator);
      partBody = section.substring(headerBodySeparator + 4); // skip \r\n\r\n
    } else if (headerBodySeparatorAlt !== -1) {
      headersText = section.substring(0, headerBodySeparatorAlt);
      partBody = section.substring(headerBodySeparatorAlt + 2); // skip \n\n
    } else {
      // No body, just headers
      headersText = section;
      partBody = "";
    }

    // Parse headers
    const headers: RawHttpHeaders = {};
    const headerLines = headersText.split(/\r?\n/).filter((line) => line.trim());

    for (const line of headerLines) {
      const colonIndex = line.indexOf(":");
      if (colonIndex !== -1) {
        const name = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        headers[name.toLowerCase()] = value;
      }
    }

    // Remove trailing \r\n from body if present
    let cleanBody = partBody;
    if (cleanBody.endsWith("\r\n")) {
      cleanBody = cleanBody.substring(0, cleanBody.length - 2);
    } else if (cleanBody.endsWith("\n")) {
      cleanBody = cleanBody.substring(0, cleanBody.length - 1);
    }

    // Convert body to Uint8Array
    const bodyBytes = stringToUint8Array(cleanBody, "utf-8");

    parts.push({
      headers,
      body: bodyBytes,
    });
  }

  return { parts };
}
