// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHmac } from "crypto";
import {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";
import { HeaderConstants } from "../utils/constants";
import { getURLPath, getURLQueries } from "../utils/utils.common";

/**
 * The programmatic identifier of the storageSharedKeyCredentialPolicy.
 */
export const storageSharedKeyCredentialPolicyName = "storageSharedKeyCredentialPolicy";

/**
 * Options used to configure StorageSharedKeyCredentialPolicy.
 */
export interface StorageSharedKeyCredentialPolicyOptions {
  accountName: string;
  accountKey: Buffer;
}

/**
 * storageSharedKeyCredentialPolicy handles signing requests using storage account keys.
 */
export function storageSharedKeyCredentialPolicy(
  options: StorageSharedKeyCredentialPolicyOptions
): PipelinePolicy {
  function signRequest(request: PipelineRequest): void {
    request.headers.set(HeaderConstants.X_MS_DATE, new Date().toUTCString());

    if (
      request.body &&
      (typeof request.body === "string" || Buffer.isBuffer(request.body)) &&
      request.body.length > 0
    ) {
      request.headers.set(HeaderConstants.CONTENT_LENGTH, Buffer.byteLength(request.body));
    }

    const stringToSign: string =
      [
        request.method.toUpperCase(),
        getHeaderValueToSign(request, HeaderConstants.CONTENT_LANGUAGE),
        getHeaderValueToSign(request, HeaderConstants.CONTENT_ENCODING),
        getHeaderValueToSign(request, HeaderConstants.CONTENT_LENGTH),
        getHeaderValueToSign(request, HeaderConstants.CONTENT_MD5),
        getHeaderValueToSign(request, HeaderConstants.CONTENT_TYPE),
        getHeaderValueToSign(request, HeaderConstants.DATE),
        getHeaderValueToSign(request, HeaderConstants.IF_MODIFIED_SINCE),
        getHeaderValueToSign(request, HeaderConstants.IF_MATCH),
        getHeaderValueToSign(request, HeaderConstants.IF_NONE_MATCH),
        getHeaderValueToSign(request, HeaderConstants.IF_UNMODIFIED_SINCE),
        getHeaderValueToSign(request, HeaderConstants.RANGE),
      ].join("\n") +
      "\n" +
      getCanonicalizedHeadersString(request) +
      getCanonicalizedResourceString(request);

    const signature: string = createHmac("sha256", options.accountKey)
      .update(stringToSign, "utf8")
      .digest("base64");
    request.headers.set(
      HeaderConstants.AUTHORIZATION,
      `SharedKey ${options.accountName}:${signature}`
    );

    // console.log(`[URL]:${request.url}`);
    // console.log(`[HEADERS]:${request.headers.toString()}`);
    // console.log(`[STRING TO SIGN]:${JSON.stringify(stringToSign)}`);
    // console.log(`[KEY]: ${request.headers.get(HeaderConstants.AUTHORIZATION)}`);
  }

  /**
   * Retrieve header value according to shared key sign rules.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/authenticate-with-shared-key
   */
  function getHeaderValueToSign(request: PipelineRequest, headerName: string): string {
    const value = request.headers.get(headerName);

    if (!value) {
      return "";
    }

    // When using version 2015-02-21 or later, if Content-Length is zero, then
    // set the Content-Length part of the StringToSign to an empty string.
    // https://docs.microsoft.com/en-us/rest/api/storageservices/authenticate-with-shared-key
    if (headerName === HeaderConstants.CONTENT_LENGTH && value === "0") {
      return "";
    }

    return value;
  }

  /**
   * To construct the CanonicalizedHeaders portion of the signature string, follow these steps:
   * 1. Retrieve all headers for the resource that begin with x-ms-, including the x-ms-date header.
   * 2. Convert each HTTP header name to lowercase.
   * 3. Sort the headers lexicographically by header name, in ascending order.
   *    Each header may appear only once in the string.
   * 4. Replace any linear whitespace in the header value with a single space.
   * 5. Trim any whitespace around the colon in the header.
   * 6. Finally, append a new-line character to each canonicalized header in the resulting list.
   *    Construct the CanonicalizedHeaders string by concatenating all headers in this list into a single string.
   *
   */
  function getCanonicalizedHeadersString(request: PipelineRequest): string {
    let headersArray: Array<{ name: string; value: string }> = [];
    for (const [name, value] of request.headers) {
      if (name.toLowerCase().startsWith(HeaderConstants.PREFIX_FOR_STORAGE)) {
        headersArray.push({ name, value });
      }
    }

    headersArray.sort((a, b): number => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    // Remove duplicate headers
    headersArray = headersArray.filter((value, index, array) => {
      if (index > 0 && value.name.toLowerCase() === array[index - 1].name.toLowerCase()) {
        return false;
      }
      return true;
    });

    let canonicalizedHeadersStringToSign: string = "";
    headersArray.forEach((header) => {
      canonicalizedHeadersStringToSign += `${header.name
        .toLowerCase()
        .trimRight()}:${header.value.trimLeft()}\n`;
    });

    return canonicalizedHeadersStringToSign;
  }

  function getCanonicalizedResourceString(request: PipelineRequest): string {
    const path = getURLPath(request.url) || "/";

    let canonicalizedResourceString: string = "";
    canonicalizedResourceString += `/${options.accountName}${path}`;

    const queries = getURLQueries(request.url);
    const lowercaseQueries: { [key: string]: string } = {};
    if (queries) {
      const queryKeys: string[] = [];
      for (const key in queries) {
        if (Object.prototype.hasOwnProperty.call(queries, key)) {
          const lowercaseKey = key.toLowerCase();
          lowercaseQueries[lowercaseKey] = queries[key];
          queryKeys.push(lowercaseKey);
        }
      }

      queryKeys.sort();
      for (const key of queryKeys) {
        canonicalizedResourceString += `\n${key}:${decodeURIComponent(lowercaseQueries[key])}`;
      }
    }

    return canonicalizedResourceString;
  }

  return {
    name: storageSharedKeyCredentialPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      signRequest(request);
      return next(request);
    },
  };
}
