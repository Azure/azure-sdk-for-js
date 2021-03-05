// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RequestPolicyFactory,
  RequestPolicy,
  RequestPolicyOptions,
  BaseRequestPolicy,
  HttpOperationResponse,
  RequestPolicyOptionsLike,
  WebResourceLike
} from "@azure/core-http";

/**
 * Credential used to authenticate and authorize with Container Registry service
 */
export class ContainerRegistryUserCredential {
  private _username: string;
  private _pass: string;

  /**
   * Creates an instance of ContainerRegistryUserCredential
   *
   * @param username - username
   * @param pass - pass
   */
  constructor(username: string, pass: string) {
    if (!username || !pass) {
      throw new RangeError("'username' or 'pass' doesn't have a valid value");
    }
    this._username = username;
    this._pass = pass;
  }

  /**
   * Gets pass
   */
  public get pass(): string {
    return this._pass;
  }

  /**
   * Get username
   */
  public get username(): string {
    return this._username;
  }

  /**
   * Change the value of pass.
   *
   * Updates will take effect upon the next request after
   * updating the value.
   *
   * @param pass - The new pass value
   */
  public update(pass: string): void {
    if (!pass) {
      throw new RangeError("pass must be a non-empty string");
    }
    this._pass = pass;
  }
}

/**
 * Creates an HTTP pipeline policy to authenticate a request
 * using an `ContainerRegistryUserCredential`
 */
export function createContainerRegistryUserCredentialPolicy(
  credential: ContainerRegistryUserCredential
): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new ContainerRegistryUserCredentialPolicy(nextPolicy, options, credential);
    }
  };
}

/**
 * A concrete implementation of an ContainerRegistryUserCredential policy
 * using the appropriate header
 */
class ContainerRegistryUserCredentialPolicy extends BaseRequestPolicy {
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptionsLike,
    private _credential: ContainerRegistryUserCredential
  ) {
    super(nextPolicy, options);
  }

  public async sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse> {
    if (!webResource) {
      throw new Error("webResource cannot be null or undefined");
    }

    const encoded = Buffer.from(`${this._credential.username}:${this._credential.pass}`).toString(
      "base64"
    );
    webResource.headers.set("Authorization", `Basic ${encoded}`);
    return this._nextPolicy.sendRequest(webResource);
  }
}
