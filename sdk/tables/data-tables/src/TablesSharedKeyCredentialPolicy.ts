// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RequestPolicy,
  RequestPolicyOptionsLike,
  WebResource,
  BaseRequestPolicy,
  HttpOperationResponse,
  WebResourceLike
} from "@azure/core-http";
import { TablesSharedKeyCredentialLike } from "./TablesSharedKeyCredential";
import { HeaderConstants } from "./utils/constants";
import { URL } from "./utils/url";

/**
 * TablesSharedKeyCredentialPolicy is a policy used to sign HTTP request with a shared key.
 *
 * @export
 * @class TablesSharedKeyCredentialPolicy
 * @extends {CredentialPolicy}
 */
export class TablesSharedKeyCredentialPolicy extends BaseRequestPolicy {
  /**
   * Reference to {@link TablesSharedKeyCredential} which generates TablesSharedKeyCredentialPolicy
   *
   * @type {TablesSharedKeyCredential}
   */
  private readonly credential: TablesSharedKeyCredentialLike;

  /**
   * Creates an instance of TablesSharedKeyCredentialPolicy.
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @param {TablesSharedKeyCredential} factory
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptionsLike,
    credential: TablesSharedKeyCredentialLike
  ) {
    super(nextPolicy, options);
    this.credential = credential;
  }

  /**
   * Sends out request.
   *
   * @param {WebResource} request
   * @returns {Promise<HttpOperationResponse>}
   */
  public sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    return this._nextPolicy.sendRequest(this.signRequest(request));
  }

  /**
   * Signs request.
   *
   * @protected
   * @param {WebResource} request
   * @returns {WebResource}
   */
  protected signRequest(request: WebResourceLike): WebResource {
    request.headers.set(HeaderConstants.X_MS_DATE, new Date().toUTCString());

    if (request.body && typeof request.body === "string" && request.body.length > 0) {
      request.headers.set(HeaderConstants.CONTENT_LENGTH, Buffer.byteLength(request.body));
    }

    // If x-ms-date is present, use it otherwise date
    const dateHeader = this.getHeaderValueToSign(request, HeaderConstants.X_MS_DATE);

    if (!dateHeader) {
      throw new Error("Failed to sign request: x-ms-date or date header must be present");
    }

    const stringToSign: string = [dateHeader, this.getCanonicalizedResourceString(request)].join(
      "\n"
    );

    const signature: string = this.credential.computeHMACSHA256(stringToSign);
    request.headers.set(
      HeaderConstants.AUTHORIZATION,
      `SharedKeyLite ${this.credential.accountName}:${signature}`
    );
    return request;
  }

  /**
   * Retrieve header value according to shared key sign rules.
   * @see https://docs.microsoft.com/en-us/rest/api/services/authenticate-with-shared-key
   *
   * @private
   * @param {WebResource} request
   * @param {string} headerName
   * @returns {string}
   */
  private getHeaderValueToSign(request: WebResource, headerName: string): string {
    const value = request.headers.get(headerName);

    if (!value) {
      return "";
    }
    return value;
  }

  /**
   * Retrieves the webResource canonicalized resource string.
   *
   * @private
   * @param {WebResource} request
   * @returns {string}
   */
  private getCanonicalizedResourceString(request: WebResource): string {
    // https://docs.microsoft.com/en-us/rest/api/storageservices/authorize-with-shared-key#shared-key-lite-and-table-service-format-for-2009-09-19-and-later
    const url = new URL(request.url);
    const path = url.pathname || "/";
    let canonicalizedResourceString = "/" + this.credential.accountName + path.replace(/'/g, "%27");

    // The query string should include the question mark and the comp parameter (for example, ?comp=metadata). No other parameters should be included on the query string.
    const comp = url.searchParams.get("comp");

    if (comp) {
      canonicalizedResourceString = `${canonicalizedResourceString}?comp=${comp}`;
    }

    return canonicalizedResourceString;
  }
}
