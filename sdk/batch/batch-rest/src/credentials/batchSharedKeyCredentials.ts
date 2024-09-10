// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type AzureNamedKeyCredential } from "@azure/core-auth";
import { HttpHeaders, HttpMethods, PipelinePolicy } from "@azure/core-rest-pipeline";
import { createHmac } from "crypto";

export function createBatchSharedKeyCredentialsPolicy(
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  credentials: AzureNamedKeyCredential,
): PipelinePolicy {
  return {
    name: "BatchSharedKeyCredentialsPolicy",
    async sendRequest(request, next) {
      const accountName = credentials.name;
      const accountKey = Buffer.from(credentials.key, "base64");

      const ocpDate = request.headers.get("ocp-date");
      if (!ocpDate) {
        request.headers.set("ocp-date", new Date().toUTCString());
      }

      let stringToSign =
        `${request.method}\n` +
        getHeaderToAppend(request.headers, "Content-Encoding") +
        getHeaderToAppend(request.headers, "Content-Language") +
        getContentLengthToAppend(request.headers, request.method, request.body) +
        getHeaderToAppend(request.headers, "Content-MD5") +
        getHeaderToAppend(request.headers, "Content-Type") +
        getHeaderToAppend(request.headers, "Date") +
        getHeaderToAppend(request.headers, "If-Modified-Since") +
        getHeaderToAppend(request.headers, "If-Match") +
        getHeaderToAppend(request.headers, "If-None-Match") +
        getHeaderToAppend(request.headers, "If-Unmodified-Since") +
        getHeaderToAppend(request.headers, "Range");

      // Add canonicalized headers
      stringToSign += getCanonicalizedHeaders(request.headers);

      // Add canonicalized resource
      stringToSign += getCanonicalizedResource(request.url, accountName);

      // Signed with sha256
      const signature = createHmac("sha256", accountKey)
        .update(stringToSign, "utf8")
        .digest("base64");

      request.headers.set("Authorization", `SharedKey ${accountName}:${signature}`);
      return next(request);
    },
  };
}

/**
 * Get header value, if header without value, append a newline
 * @param headers - The pipeline headers object.
 * @param headerName - The header name
 * @returns The header value
 */
function getHeaderToAppend(headers: HttpHeaders, headerName: string): string {
  return (headers.get(headerName) ?? "") + "\n";
}

/**
 * Get content length
 * @param headers - The pipeline headers object.
 * @param method - The HTTP method
 * @param body - The request body
 * @returns The content length
 */
function getContentLengthToAppend(headers: HttpHeaders, method: HttpMethods, body?: any): string {
  const contentLength = headers.get("Content-Length");

  if (contentLength) {
    return contentLength + "\n";
  }

  if (body) {
    return Buffer.byteLength(body) + "\n";
  }

  // For POST verb, add 0 content-length
  if (method === "POST") {
    return "0\n";
  }

  return "\n";
}
/**
 * Constructs the Canonicalized Headers string.
 * To construct the CanonicalizedHeaders portion of the signature string,
 * follow these steps: 1. Retrieve all headers for the resource that begin
 * with ocp-, including the ocp-date header. 2. Convert each HTTP header
 * name to lowercase. 3. Sort the headers lexicographically by header name,
 * in ascending order. Each header may appear only once in the
 * string. 4. Unfold the string by replacing any breaking white space with a
 * single space. 5. Trim any white space around the colon in the header. 6.
 * Finally, append a new line character to each canonicalized header in the
 * resulting list. Construct the CanonicalizedHeaders string by
 * concatenating all headers in this list into a single string.
 *
 * @param headers - The pipeline headers object.
 * @returns The canonicalized headers.
 */
function getCanonicalizedHeaders(headers: HttpHeaders): string {
  let canonicalizedHeaders = "";
  const canonicalizedHeadersArray = [];

  for (const [key] of headers) {
    const lowerCaseKey = key.toLocaleLowerCase();
    if (lowerCaseKey.startsWith("ocp-")) {
      canonicalizedHeadersArray.push(lowerCaseKey);
    }
  }

  canonicalizedHeadersArray.sort();
  for (const currentHeader of canonicalizedHeadersArray) {
    const headerValue = headers.get(currentHeader);
    if (headerValue) {
      canonicalizedHeaders += currentHeader.toLowerCase() + ":" + headerValue + "\n";
    }
  }
  return canonicalizedHeaders;
}

/**
 * Retrieves the header's canonicalized resource string.
 * @param url - The URL of the resource.
 * @param accountName - The batch account name.
 * @returns The canonicalized resource string.
 */
function getCanonicalizedResource(url: string, accountName: string): string {
  let path = "/";
  const urlstring = new URL(url);
  if (urlstring.pathname) {
    path = urlstring.pathname;
  }

  let canonicalizedResource = "/" + accountName + path;

  const queryString = urlstring.searchParams;
  const sortedQueryString = [...queryString.entries()].sort();
  for (const [key, value] of sortedQueryString) {
    canonicalizedResource += `\n${key}:${value}`;
  }
  return canonicalizedResource;
}
