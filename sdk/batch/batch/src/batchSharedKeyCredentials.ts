/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import {
  Constants,
  WebResource,
  ServiceClientCredentials,
  HttpHeadersLike,
  HttpMethods,
} from "@azure/ms-rest-js";
import { HmacSha256Sign } from "./hmacSha256";
import url from "url-parse";
import { Buffer } from "buffer";

/**
 * Creates a new BatchSharedKeyCredentials object.
 * @constructor
 * @param accountName The batch account name.
 * @param accountKey The batch account key.
 */
export class BatchSharedKeyCredentials implements ServiceClientCredentials {
  /**
   * The batch account name.
   */
  accountName: string;
  /**
   * The batch account key.
   */
  accountKey: string;

  private _signer: HmacSha256Sign;

  constructor(accountName: string, accountKey: string) {
    if (!accountName || typeof accountName.valueOf() !== "string") {
      throw new Error("accountName must be a non empty string.");
    }

    if (!accountKey || typeof accountKey.valueOf() !== "string") {
      throw new Error("accountKey must be a non empty string.");
    }
    this.accountName = accountName;
    this.accountKey = accountKey;
    this._signer = new HmacSha256Sign(accountKey);
  }

  /**
   * Signs a request with the Authentication header.
   *
   * @param {webResource} The WebResource to be signed.
   * @param {function(error)}  callback  The callback function.
   * @return {undefined}
   */
  signRequest(webResource: WebResource): Promise<WebResource> {
    // Help function to get header value, if header without value, append a newline
    function getvalueToAppend(value: HttpHeadersLike, headerName: string): string {
      if (!value || !value.get(headerName)) {
        return "\n";
      } else {
        return value.get(headerName) + "\n";
      }
    }

    // Help function to get content length
    function getContentLengthToAppend(
      value: HttpHeadersLike,
      method: HttpMethods,
      body: any
    ): string {
      if (!value || !value.get("Content-Length")) {
        // Get content length from body if available
        if (body) {
          return Buffer.byteLength(body) + "\n";
        }
        // For GET verb, do not add content-length
        if (method === "POST") {
          return "0\n";
        } else {
          return "\n";
        }
      } else {
        return value.get("Content-Length") + "\n";
      }
    }

    // Set Headers
    if (!webResource.headers.get("ocp-date")) {
      webResource.headers.set("ocp-date", new Date().toUTCString());
    }

    // Add verb and standard HTTP header as single line
    let stringToSign =
      webResource.method +
      "\n" +
      getvalueToAppend(webResource.headers, "Content-Encoding") +
      getvalueToAppend(webResource.headers, "Content-Language") +
      getContentLengthToAppend(webResource.headers, webResource.method, webResource.body) +
      getvalueToAppend(webResource.headers, "Content-MD5") +
      getvalueToAppend(webResource.headers, "Content-Type") +
      getvalueToAppend(webResource.headers, "Date") +
      getvalueToAppend(webResource.headers, "If-Modified-Since") +
      getvalueToAppend(webResource.headers, "If-Match") +
      getvalueToAppend(webResource.headers, "If-None-Match") +
      getvalueToAppend(webResource.headers, "If-Unmodified-Since") +
      getvalueToAppend(webResource.headers, "Range");

    // Add customize HTTP header
    stringToSign += this._getCanonicalizedHeaders(webResource);

    // Add path/query from uri
    stringToSign += this._getCanonicalizedResource(webResource);

    // Signed with sha256
    const signature = this._signer.sign(stringToSign);

    // Add authrization header
    webResource.headers.set(
      Constants.HeaderConstants.AUTHORIZATION,
      `SharedKey ${this.accountName}:${signature}`
    );
    return Promise.resolve(webResource);
  }

  /*
   * Constructs the Canonicalized Headers string.
   *
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
   * @param The WebResource object.
   * @return The canonicalized headers.
   */
  private _getCanonicalizedHeaders(webResource: WebResource): string {
    // Build canonicalized headers
    let canonicalizedHeaders = "";
    if (webResource.headers) {
      const canonicalizedHeadersArray = [];

      // Retrieve all headers for begin with ocp-
      for (const header of webResource.headers.headerNames()) {
        if (header.indexOf("ocp-") === 0) {
          canonicalizedHeadersArray.push(header);
        }
      }

      // Sort the header by header name
      canonicalizedHeadersArray.sort();
      for (const currentHeader of canonicalizedHeadersArray) {
        const value = webResource.headers.get(currentHeader);
        if (value) {
          // Make header value lower case and apend a new line for each header
          canonicalizedHeaders += currentHeader.toLowerCase() + ":" + value + "\n";
        }
      }
    }

    return canonicalizedHeaders;
  }

  /*
   * Retrieves the webresource's canonicalized resource string.
   * @param webResource The webresource to get the canonicalized resource string from.
   * @return The canonicalized resource string.
   */
  private _getCanonicalizedResource(webResource: WebResource): string {
    let path = "/";
    const urlstring = url(webResource.url, true);
    if (urlstring.pathname) {
      path = urlstring.pathname;
    }

    let canonicalizedResource = "/" + this.accountName + path;

    // Get the raw query string values for signing
    const queryStringValues = urlstring.query;

    // Build the canonicalized resource by sorting the values by name.
    if (queryStringValues) {
      let paramNames: string[] = [];
      Object.keys(queryStringValues).forEach((n) => {
        return paramNames.push(n);
      });

      // All the queries sorted by query name
      paramNames = paramNames.sort();
      for (const name of paramNames) {
        canonicalizedResource += "\n" + name + ":" + queryStringValues[name];
      }
    }

    return canonicalizedResource;
  }
}
