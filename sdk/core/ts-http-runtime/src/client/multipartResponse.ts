// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "../interfaces.js";
import { stringToUint8Array } from "../util/bytesEncoding.js";

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
 * @returns True if the content type starts with "multipart/"
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
  const bodyString = typeof body === "string" ? body : new TextDecoder().decode(body);

  // The boundary in the body is prefixed with --
  const boundaryDelimiter = `--${boundary}`;

  // Split by boundary markers
  const parts: MultipartPart[] = [];

  // Find all boundary positions
  let currentPos = 0;
  const boundaryPositions: number[] = [];

  while (currentPos < bodyString.length) {
    const pos = bodyString.indexOf(boundaryDelimiter, currentPos);
    if (pos === -1) break;
    boundaryPositions.push(pos);
    currentPos = pos + boundaryDelimiter.length;
  }

  // Process each part (skip first boundary, stop before closing boundary)
  for (let i = 0; i < boundaryPositions.length - 1; i++) {
    const startPos = boundaryPositions[i] + boundaryDelimiter.length;
    const endPos = boundaryPositions[i + 1];

    // Extract the part content
    let partContent = bodyString.substring(startPos, endPos);

    // Remove leading CRLF or LF (these come right after the boundary line)
    if (partContent.startsWith("\r\n")) {
      partContent = partContent.substring(2);
    } else if (partContent.startsWith("\n")) {
      partContent = partContent.substring(1);
    }

    // Remove trailing CRLF or LF (these come before the next boundary)
    if (partContent.endsWith("\r\n")) {
      partContent = partContent.substring(0, partContent.length - 2);
    } else if (partContent.endsWith("\n")) {
      partContent = partContent.substring(0, partContent.length - 1);
    }

    // Split headers and body
    // According to MIME spec, headers are separated from body by a blank line (CRLF CRLF)
    // If the part starts with CRLF, there are no headers
    const headers: RawHttpHeaders = {};
    let bodyContent: string;

    if (partContent.startsWith("\r\n")) {
      // No headers - part starts with the blank line separator
      bodyContent = partContent.substring(2);
    } else if (partContent.startsWith("\n")) {
      // No headers - part starts with the blank line separator (LF only)
      bodyContent = partContent.substring(1);
    } else {
      // Look for header/body separator
      let headerEndIndex = partContent.indexOf("\r\n\r\n");
      let headerSeparator = "\r\n\r\n";

      if (headerEndIndex === -1) {
        headerEndIndex = partContent.indexOf("\n\n");
        headerSeparator = "\n\n";
      }

      if (headerEndIndex !== -1) {
        const headersString = partContent.substring(0, headerEndIndex);
        bodyContent = partContent.substring(headerEndIndex + headerSeparator.length);

        // Parse headers
        const headerLines = headersString.split(/\r?\n/);
        for (const line of headerLines) {
          const colonIndex = line.indexOf(":");
          if (colonIndex > 0) {
            const name = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            headers[name] = value;
          }
        }
      } else {
        // No header/body separator found, treat entire content as body
        bodyContent = partContent;
      }
    }

    // Skip parts with empty body and no headers
    if (bodyContent.trim().length === 0 && Object.keys(headers).length === 0) {
      continue;
    }

    // Convert body to Uint8Array
    const bodyBytes = stringToUint8Array(bodyContent, "utf-8");

    parts.push({
      headers,
      body: bodyBytes,
    });
  }

  return { parts };
}
