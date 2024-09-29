// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  getOperationsOperations,
  OperationsOperations,
} from "./classic/operations/index.js";
import {
  getCodeSigningAccountsOperations,
  CodeSigningAccountsOperations,
} from "./classic/codeSigningAccounts/index.js";
import {
  getCertificateProfilesOperations,
  CertificateProfilesOperations,
} from "./classic/certificateProfiles/index.js";
import {
  createCodeSigning,
  CodeSigningContext,
  CodeSigningClientOptionalParams,
} from "./api/index.js";

export { CodeSigningClientOptionalParams } from "./api/codeSigningContext.js";

export class CodeSigningClient {
  private _client: CodeSigningContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Code Signing resource provider api. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: CodeSigningClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : "azsdk-js-client";
    this._client = createCodeSigning(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.codeSigningAccounts = getCodeSigningAccountsOperations(
      this._client,
      subscriptionId,
    );
    this.certificateProfiles = getCertificateProfilesOperations(
      this._client,
      subscriptionId,
    );
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for CodeSigningAccounts */
  public readonly codeSigningAccounts: CodeSigningAccountsOperations;
  /** The operation groups for CertificateProfiles */
  public readonly certificateProfiles: CertificateProfilesOperations;
}
