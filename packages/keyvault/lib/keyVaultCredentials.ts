// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ServiceCallback, WebResource, RequestPolicyFactory, RequestPolicy, RequestPolicyOptions } from "ms-rest-js";
import { KeyVaultCredentialsPolicy } from "./keyVaultCredentialsPolicy";

export type PipelineFunction = (webResource: WebResource, next: PipelineFunction, callback: ServiceCallback<any>) => any;

/**
 * An object that performs authentication for Key Vault.
 * @class
 * @param {KeyVaultCredentials~authRequest} authenticator  A callback that receives a challenge and returns an authentication token.
 * @param {object} challengeCache A object used to store a previous challenge
 * @param {credentials} credentials - Credentials needed for the client to connect to Azure.
 */
export class KeyVaultCredentials implements RequestPolicyFactory {
  constructor(private authenticator: any) {
    if (!authenticator) {
      throw new Error("Authenticator callback must be provided.");
    }
  }

  create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): RequestPolicy {
    return new KeyVaultCredentialsPolicy(nextPolicy, options, this.authenticator);
  }
}
