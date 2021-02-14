// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential } from "@azure/core-auth";
import {
  RequestPolicyFactory,
  RequestPolicy,
  BaseRequestPolicy,
  WebResourceLike,
  HttpOperationResponse,
  RequestPolicyOptionsLike
} from "@azure/core-http";

import { SignatureCredential } from "./sharedAccessSignitureCredential";
import { isKeyCredentialLike } from "./util";

/**
 * The name of the header to include when a Shared Key is used for authentication.
 */
const API_KEY_HEADER_NAME = "aeg-sas-key";

/**
 * The name of the header to include when Shared Access Signature is used for authentication.
 */
const SAS_TOKEN_HEADER_NAME = "aeg-sas-token";

/**
 * Create an HTTP pipeline policy to authenticate a request
 * using an `AzureKeyCredential` for Event Grid
 */
export function createEventGridCredentialPolicy(
  credential: KeyCredential | SignatureCredential
): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike) => {
      return new EventGridAzureKeyCredentialPolicy(nextPolicy, options, credential);
    }
  };
}

/**
 * A concrete implementation of an AzureKeyCredential policy
 * using the appropriate header for Event Grid
 */
class EventGridAzureKeyCredentialPolicy extends BaseRequestPolicy {
  private credential: KeyCredential | SignatureCredential;

  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptionsLike,
    credential: KeyCredential | SignatureCredential
  ) {
    super(nextPolicy, options);
    this.credential = credential;
  }

  public async sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse> {
    if (!webResource) {
      throw new Error("webResource cannot be null or undefined");
    }

    if (isKeyCredentialLike(this.credential)) {
      webResource.headers.set(API_KEY_HEADER_NAME, this.credential.key);
    } else {
      webResource.headers.set(SAS_TOKEN_HEADER_NAME, this.credential.signature());
    }

    return this._nextPolicy.sendRequest(webResource);
  }
}
