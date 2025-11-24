// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CodeSigningContext, CodeSigningClientOptionalParams } from "./api/index.js";
import { createCodeSigning } from "./api/index.js";
import type { CertificateProfilesOperations } from "./classic/certificateProfiles/index.js";
import { _getCertificateProfilesOperations } from "./classic/certificateProfiles/index.js";
import type { CodeSigningAccountsOperations } from "./classic/codeSigningAccounts/index.js";
import { _getCodeSigningAccountsOperations } from "./classic/codeSigningAccounts/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
      : `azsdk-js-client`;
    this._client = createCodeSigning(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.certificateProfiles = _getCertificateProfilesOperations(this._client);
    this.codeSigningAccounts = _getCodeSigningAccountsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for certificateProfiles */
  public readonly certificateProfiles: CertificateProfilesOperations;
  /** The operation groups for codeSigningAccounts */
  public readonly codeSigningAccounts: CodeSigningAccountsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
