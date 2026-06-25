// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CodeSigningContext,
  CodeSigningClientOptionalParams,
  createCodeSigning,
} from "./api/index.js";
import {
  CertificateProfilesOperations,
  _getCertificateProfilesOperations,
} from "./classic/certificateProfiles/index.js";
import {
  CodeSigningAccountsOperations,
  _getCodeSigningAccountsOperations,
} from "./classic/codeSigningAccounts/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { CodeSigningClientOptionalParams } from "./api/codeSigningContext.js";

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
