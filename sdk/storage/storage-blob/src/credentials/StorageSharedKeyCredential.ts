// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest } from "@azure/core-https";
import { createHmac } from "crypto";
import { HeaderConstants } from "../utils/constants";
import { getURLPath, getURLQueries } from "../utils/utils.common";
import { Credential } from "./Credential";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * StorageSharedKeyCredential for account key authorization of Azure Storage service.
 */
export class StorageSharedKeyCredential extends Credential {
  public name = "storageSharedKeyCredential";

  /**
   * Azure Storage account name; readonly.
   */
  public readonly accountName: string;

  /**
   * Azure Storage account key; readonly.
   */
  private readonly accountKey: Buffer;

  /**
   * Creates an instance of StorageSharedKeyCredential.
   * @param accountName -
   * @param accountKey -
   */
  constructor(accountName: string, accountKey: string) {
    super();
    this.accountName = accountName;
    this.accountKey = Buffer.from(accountKey, "base64");
  }

  /**
   * Generates a hash signature for an HTTP request or for a SAS.
   *
   * @param stringToSign -
   */
  public computeHMACSHA256(stringToSign: string): string {
    return createHmac("sha256", this.accountKey)
      .update(stringToSign, "utf8")
      .digest("base64");
  }

  getHeaderValueToSign(request: PipelineRequest, headerName: string): string {
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

  getCanonicalizedHeadersString(request: PipelineRequest): string {
    let headersArray = [];
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

  getCanonicalizedResourceString(request: PipelineRequest, accountName: string): string {
    const path = getURLPath(request.url) || "/";

    let canonicalizedResourceString: string = "";
    canonicalizedResourceString += `/${accountName}${path}`;

    const queries = getURLQueries(request.url);
    const lowercaseQueries: { [key: string]: string } = {};
    if (queries) {
      const queryKeys: string[] = [];
      for (const key in queries) {
        if (queries.hasOwnProperty(key)) {
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

  signRequest(request: PipelineRequest): PipelineRequest {
    request.headers.set(HeaderConstants.X_MS_DATE, new Date().toUTCString());

    if (request.body && typeof request.body === "string" && request.body.length > 0) {
      request.headers.set(HeaderConstants.CONTENT_LENGTH, Buffer.byteLength(request.body));
    }

    const stringToSign: string =
      [
        request.method.toUpperCase(),
        this.getHeaderValueToSign(request, HeaderConstants.CONTENT_LANGUAGE),
        this.getHeaderValueToSign(request, HeaderConstants.CONTENT_ENCODING),
        this.getHeaderValueToSign(request, HeaderConstants.CONTENT_LENGTH),
        this.getHeaderValueToSign(request, HeaderConstants.CONTENT_MD5),
        this.getHeaderValueToSign(request, HeaderConstants.CONTENT_TYPE),
        this.getHeaderValueToSign(request, HeaderConstants.DATE),
        this.getHeaderValueToSign(request, HeaderConstants.IF_MODIFIED_SINCE),
        this.getHeaderValueToSign(request, HeaderConstants.IF_MATCH),
        this.getHeaderValueToSign(request, HeaderConstants.IF_NONE_MATCH),
        this.getHeaderValueToSign(request, HeaderConstants.IF_UNMODIFIED_SINCE),
        this.getHeaderValueToSign(request, HeaderConstants.RANGE)
      ].join("\n") +
      "\n" +
      this.getCanonicalizedHeadersString(request) +
      this.getCanonicalizedResourceString(request, this.accountName);

    const signature: string = this.computeHMACSHA256(stringToSign);
    request.headers.set(
      HeaderConstants.AUTHORIZATION,
      `SharedKey ${this.accountName}:${signature}`
    );

    // console.log(`[URL]:${request.url}`);
    // console.log(`[HEADERS]:${request.headers.toString()}`);
    // console.log(`[STRING TO SIGN]:${JSON.stringify(stringToSign)}`);
    // console.log(`[KEY]: ${request.headers.get(HeaderConstants.AUTHORIZATION)}`);
    return request;
  }
}
