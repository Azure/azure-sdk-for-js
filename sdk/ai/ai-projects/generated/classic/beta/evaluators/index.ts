// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  getCredentials,
  startPendingUpload,
  updateVersion,
  createVersion,
  deleteVersion,
  getVersion,
  list,
  listVersions,
} from "../../../api/beta/evaluators/operations.js";
import {
  BetaEvaluatorsGetCredentialsOptionalParams,
  BetaEvaluatorsStartPendingUploadOptionalParams,
  BetaEvaluatorsUpdateVersionOptionalParams,
  BetaEvaluatorsCreateVersionOptionalParams,
  BetaEvaluatorsDeleteVersionOptionalParams,
  BetaEvaluatorsGetVersionOptionalParams,
  BetaEvaluatorsListOptionalParams,
  BetaEvaluatorsListVersionsOptionalParams,
} from "../../../api/beta/evaluators/options.js";
import {
  PendingUploadRequest,
  PendingUploadResponse,
  DatasetCredential,
  EvaluatorVersion,
  EvaluatorCredentialRequest,
} from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaEvaluators operations. */
export interface BetaEvaluatorsOperations {
  /** Get the SAS credential to access the storage account associated with an Evaluator version. */
  getCredentials: (
    name: string,
    credentialRequest: EvaluatorCredentialRequest,
    version: string,
    options?: BetaEvaluatorsGetCredentialsOptionalParams,
  ) => Promise<DatasetCredential>;
  /** Start a new or get an existing pending upload of an evaluator for a specific version. */
  startPendingUpload: (
    name: string,
    version: string,
    pendingUploadRequest: PendingUploadRequest,
    options?: BetaEvaluatorsStartPendingUploadOptionalParams,
  ) => Promise<PendingUploadResponse>;
  /** Update an existing EvaluatorVersion with the given version id */
  updateVersion: (
    name: string,
    foundryFeatures: "Evaluations=V1Preview",
    version: string,
    evaluatorVersion: EvaluatorVersion,
    options?: BetaEvaluatorsUpdateVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** Create a new EvaluatorVersion with auto incremented version id */
  createVersion: (
    name: string,
    foundryFeatures: "Evaluations=V1Preview",
    evaluatorVersion: EvaluatorVersion,
    options?: BetaEvaluatorsCreateVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** Delete the specific version of the EvaluatorVersion. The service returns 204 No Content if the EvaluatorVersion was deleted successfully or if the EvaluatorVersion does not exist. */
  deleteVersion: (
    name: string,
    foundryFeatures: "Evaluations=V1Preview",
    version: string,
    options?: BetaEvaluatorsDeleteVersionOptionalParams,
  ) => Promise<void>;
  /** Get the specific version of the EvaluatorVersion. The service returns 404 Not Found error if the EvaluatorVersion does not exist. */
  getVersion: (
    name: string,
    foundryFeatures: "Evaluations=V1Preview",
    version: string,
    options?: BetaEvaluatorsGetVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** List the latest version of each evaluator */
  list: (
    foundryFeatures: "Evaluations=V1Preview",
    options?: BetaEvaluatorsListOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluatorVersion>;
  /** List all versions of the given evaluator */
  listVersions: (
    name: string,
    foundryFeatures: "Evaluations=V1Preview",
    options?: BetaEvaluatorsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluatorVersion>;
}

function _getBetaEvaluators(context: AIProjectContext) {
  return {
    getCredentials: (
      name: string,
      credentialRequest: EvaluatorCredentialRequest,
      version: string,
      options?: BetaEvaluatorsGetCredentialsOptionalParams,
    ) => getCredentials(context, name, credentialRequest, version, options),
    startPendingUpload: (
      name: string,
      version: string,
      pendingUploadRequest: PendingUploadRequest,
      options?: BetaEvaluatorsStartPendingUploadOptionalParams,
    ) => startPendingUpload(context, name, version, pendingUploadRequest, options),
    updateVersion: (
      name: string,
      foundryFeatures: "Evaluations=V1Preview",
      version: string,
      evaluatorVersion: EvaluatorVersion,
      options?: BetaEvaluatorsUpdateVersionOptionalParams,
    ) => updateVersion(context, name, foundryFeatures, version, evaluatorVersion, options),
    createVersion: (
      name: string,
      foundryFeatures: "Evaluations=V1Preview",
      evaluatorVersion: EvaluatorVersion,
      options?: BetaEvaluatorsCreateVersionOptionalParams,
    ) => createVersion(context, name, foundryFeatures, evaluatorVersion, options),
    deleteVersion: (
      name: string,
      foundryFeatures: "Evaluations=V1Preview",
      version: string,
      options?: BetaEvaluatorsDeleteVersionOptionalParams,
    ) => deleteVersion(context, name, foundryFeatures, version, options),
    getVersion: (
      name: string,
      foundryFeatures: "Evaluations=V1Preview",
      version: string,
      options?: BetaEvaluatorsGetVersionOptionalParams,
    ) => getVersion(context, name, foundryFeatures, version, options),
    list: (foundryFeatures: "Evaluations=V1Preview", options?: BetaEvaluatorsListOptionalParams) =>
      list(context, foundryFeatures, options),
    listVersions: (
      name: string,
      foundryFeatures: "Evaluations=V1Preview",
      options?: BetaEvaluatorsListVersionsOptionalParams,
    ) => listVersions(context, name, foundryFeatures, options),
  };
}

export function _getBetaEvaluatorsOperations(context: AIProjectContext): BetaEvaluatorsOperations {
  return {
    ..._getBetaEvaluators(context),
  };
}
