// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import { getCredentials, startPendingUpload } from "../../api/evaluators/operations.js";
import {
  EvaluatorsGetCredentialsOptionalParams,
  EvaluatorsStartPendingUploadOptionalParams,
} from "../../api/evaluators/options.js";
import {
  PendingUploadRequest,
  PendingUploadResponse,
  DatasetCredential,
  EvaluatorCredentialRequest,
} from "../../models/models.js";

/** Interface representing a Evaluators operations. */
export interface EvaluatorsOperations {
  /** Get the SAS credential to access the storage account associated with an Evaluator version. */
  getCredentials: (
    name: string,
    credentialRequest: EvaluatorCredentialRequest,
    version: string,
    options?: EvaluatorsGetCredentialsOptionalParams,
  ) => Promise<DatasetCredential>;
  /** Start a new or get an existing pending upload of an evaluator for a specific version. */
  startPendingUpload: (
    name: string,
    version: string,
    pendingUploadRequest: PendingUploadRequest,
    options?: EvaluatorsStartPendingUploadOptionalParams,
  ) => Promise<PendingUploadResponse>;
}

function _getEvaluators(context: AIProjectContext) {
  return {
    getCredentials: (
      name: string,
      credentialRequest: EvaluatorCredentialRequest,
      version: string,
      options?: EvaluatorsGetCredentialsOptionalParams,
    ) => getCredentials(context, name, credentialRequest, version, options),
    startPendingUpload: (
      name: string,
      version: string,
      pendingUploadRequest: PendingUploadRequest,
      options?: EvaluatorsStartPendingUploadOptionalParams,
    ) => startPendingUpload(context, name, version, pendingUploadRequest, options),
  };
}

export function _getEvaluatorsOperations(context: AIProjectContext): EvaluatorsOperations {
  return {
    ..._getEvaluators(context),
  };
}
