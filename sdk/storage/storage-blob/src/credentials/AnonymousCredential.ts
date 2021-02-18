// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest } from "@azure/core-https";
import { Credential } from "./Credential";

/**
 * AnonymousCredential provides a credentialPolicyCreator member used to create
 * AnonymousCredentialPolicy objects. AnonymousCredentialPolicy is used with
 * HTTP(S) requests that read public resources or for use with Shared Access
 * Signatures (SAS).
 *
 * @export
 * @class AnonymousCredential
 * @extends {Credential}
 */
export class AnonymousCredential extends Credential {
  public name = "storageAnonymousCredential";
  signRequest(request: PipelineRequest): PipelineRequest {
    return request;
  }
}
