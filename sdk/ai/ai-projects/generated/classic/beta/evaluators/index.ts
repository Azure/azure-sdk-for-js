// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import { getCredentials, pendingUpload } from "../../../api/beta/evaluators/operations.js";
import {
  BetaEvaluatorsGetCredentialsOptionalParams,
  BetaEvaluatorsPendingUploadOptionalParams,
} from "../../../api/beta/evaluators/options.js";
import {
  PendingUploadRequest,
  PendingUploadResponse,
  DatasetCredential,
  EvaluatorCredentialRequest,
} from "../../../models/models.js";

/** Interface representing a BetaEvaluators operations. */
export interface BetaEvaluatorsOperations {
  /** Retrieves SAS credentials for accessing the storage account associated with the specified evaluator version. */
  getCredentials: (
    name: string,
    credentialRequest: EvaluatorCredentialRequest,
    version: string,
    options?: BetaEvaluatorsGetCredentialsOptionalParams,
  ) => Promise<DatasetCredential>;
  /** Initiates a new pending upload or retrieves an existing one for the specified evaluator version. */
  pendingUpload: (
    name: string,
    version: string,
    pendingUploadRequest: PendingUploadRequest,
    options?: BetaEvaluatorsPendingUploadOptionalParams,
  ) => Promise<PendingUploadResponse>;
}

function _getBetaEvaluators(context: AIProjectContext) {
  return {
    getCredentials: (
      name: string,
      credentialRequest: EvaluatorCredentialRequest,
      version: string,
      options?: BetaEvaluatorsGetCredentialsOptionalParams,
    ) => getCredentials(context, name, credentialRequest, version, options),
    pendingUpload: (
      name: string,
      version: string,
      pendingUploadRequest: PendingUploadRequest,
      options?: BetaEvaluatorsPendingUploadOptionalParams,
    ) => pendingUpload(context, name, version, pendingUploadRequest, options),
  };
}

export function _getBetaEvaluatorsOperations(context: AIProjectContext): BetaEvaluatorsOperations {
  return {
    ..._getBetaEvaluators(context),
  };
}
