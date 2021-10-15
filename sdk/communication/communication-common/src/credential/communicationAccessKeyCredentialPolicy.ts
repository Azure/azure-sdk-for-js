// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential } from "@azure/core-auth";
import {
  URLBuilder,
  WebResource,
  isNode,
  RequestPolicy,
  RequestPolicyOptionsLike,
  RequestPolicyFactory,
  WebResourceLike,
  HttpOperationResponse,
  BaseRequestPolicy
} from "@azure/core-http";
import { shaHash, shaHMAC } from "./cryptoUtils";

/**
 * Creates an HTTP pipeline policy to authenticate a request using a `KeyCredential`.
 * @hidden
 *
 * @param credential - The key credential.
 */
export const createCommunicationAccessKeyCredentialPolicy = (
  credential: KeyCredential
): RequestPolicyFactory => {
  return {
    create: (nextpolicy: RequestPolicy, options: RequestPolicyOptionsLike) => {
      return new CommunicationAccessKeyCredentialPolicy(credential, nextpolicy, options);
    }
  };
};

/**
 * CommunicationAccessKeyCredentialPolicy provides a means of signing requests made through
 * the SmsClient.
 */
class CommunicationAccessKeyCredentialPolicy extends BaseRequestPolicy {
  /**
   * Initializes a new instance of the CommunicationAccessKeyCredential class
   * using a base64 encoded key.
   * @param accessKey - The base64 encoded key to be used for signing.
   */
  constructor(
    private readonly accessKey: KeyCredential,
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptionsLike
  ) {
    super(nextPolicy, options);
  }

  /**
   * Signs a request with the provided access key.
   *
   * @param webResource - The WebResource to be signed.
   */
  private async signRequest(webResource: WebResource): Promise<WebResource> {
    const verb = webResource.method.toUpperCase();
    const utcNow = new Date().toUTCString();
    const contentHash = await shaHash(webResource.body || "");
    const dateHeader = "x-ms-date";
    const signedHeaders = `${dateHeader};host;x-ms-content-sha256`;

    const urlBuilder = URLBuilder.parse(webResource.url);
    const query = urlBuilder.getQuery();
    let urlPathAndQuery = query ? `${urlBuilder.getPath()}?${query}` : urlBuilder.getPath();
    const port = urlBuilder.getPort();
    let hostAndPort = port ? `${urlBuilder.getHost()}:${port}` : urlBuilder.getHost();

    if (isNode && !webResource.headers.get("UriToSignWith")) {
      webResource.headers.set("Host", hostAndPort || "");
    }

    if (webResource.headers.get("UriToSignWith")) {
      const uri_to_sign_with = webResource.headers.get("UriToSignWith");
      const q = URLBuilder.parse(uri_to_sign_with!);
      hostAndPort = q.getHost()! + (q.getPort() !== undefined ? q.getPort() : "");
      webResource.headers.set("x-ms-host", String(hostAndPort));
      urlPathAndQuery = q.getPath()! + (q.getQuery() !== undefined ? q.getQuery() : "");
    }

    const stringToSign = `${verb}\n${urlPathAndQuery}\n${utcNow};${hostAndPort};${contentHash}`;
    const signature = await shaHMAC(this.accessKey.key, stringToSign);

    webResource.headers.set(dateHeader, utcNow);
    webResource.headers.set("x-ms-content-sha256", contentHash);
    webResource.headers.set(
      "Authorization",
      `HMAC-SHA256 SignedHeaders=${signedHeaders}&Signature=${signature}`
    );

    return webResource;
  }

  /**
   * Signs the request and calls the next policy in the factory.
   */
  public async sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse> {
    if (!webResource) {
      throw new Error("webResource cannot be null or undefined");
    }

    return this._nextPolicy.sendRequest(await this.signRequest(webResource));
  }
}
