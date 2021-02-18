// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy, PipelineRequest, PipelineResponse, SendRequest } from "@azure/core-https";

/**
 * Credential is an abstract class for Azure Storage HTTP requests signing. This
 * class will host an credentialPolicyCreator factory which generates CredentialPolicy.
 *
 * @export
 * @abstract
 * @class Credential
 */
export abstract class Credential implements PipelinePolicy {
  public abstract name: string;
  public sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
    return next(this.signRequest(request));
  }
  protected abstract signRequest(request: PipelineRequest): PipelineRequest;
}
