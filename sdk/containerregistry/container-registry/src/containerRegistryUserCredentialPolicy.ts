// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest
} from "@azure/core-rest-pipeline";

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

export const createContainerRegistryUserCredentialPolicyName =
  "createContainerRegistryUserCredentialPolicy";

/**
 * Creates an HTTP pipeline policy to authenticate a request
 * using an `ContainerRegistryUserCredential`
 */
export function createContainerRegistryUserCredentialPolicy(
  credential: ContainerRegistryUserCredential
): PipelinePolicy {
  return {
    name: createContainerRegistryUserCredentialPolicyName,
    sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const encoded = Buffer.from(`${credential.username}:${credential.pass}`).toString("base64");
      request.headers.set("Authorization", `Basic ${encoded}`);
      return next(request);
    }
  };
}
