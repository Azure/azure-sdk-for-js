// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  getCredentials,
  pendingUpload,
  updateVersion,
  createVersion,
  deleteVersion,
  getVersion,
  listLatestVersions,
  listVersions,
} from "../../../api/beta/evaluators/operations.js";
import type {
  BetaEvaluatorsGetCredentialsOptionalParams,
  BetaEvaluatorsPendingUploadOptionalParams,
  BetaEvaluatorsUpdateVersionOptionalParams,
  BetaEvaluatorsCreateVersionOptionalParams,
  BetaEvaluatorsDeleteVersionOptionalParams,
  BetaEvaluatorsGetVersionOptionalParams,
  BetaEvaluatorsListLatestVersionsOptionalParams,
  BetaEvaluatorsListVersionsOptionalParams,
} from "../../../api/beta/evaluators/options.js";
import type {
  PendingUploadRequest,
  PendingUploadResponse,
  DatasetCredential,
  EvaluatorVersion,
  EvaluatorCredentialRequest,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaEvaluators operations. */
export interface BetaEvaluatorsOperations {
  /** Get the SAS credential to access the storage account associated with an Evaluator version. */
  getCredentials: (
    name: string,
    foundryFeatures: "Evaluations=V1Preview",
    credentialRequest: EvaluatorCredentialRequest,
    version: string,
    options?: BetaEvaluatorsGetCredentialsOptionalParams,
  ) => Promise<DatasetCredential>;
  /** Start a new or get an existing pending upload of an evaluator for a specific version. */
  pendingUpload: (
    name: string,
    foundryFeatures: "Evaluations=V1Preview",
    pendingUploadRequest: PendingUploadRequest,
    version: string,
    options?: BetaEvaluatorsPendingUploadOptionalParams,
  ) => Promise<PendingUploadResponse>;
  /** Update an existing EvaluatorVersion with the given version id */
  updateVersion: (
    name: string,
    version: string,
    evaluatorVersion: EvaluatorVersion,
    options?: BetaEvaluatorsUpdateVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** Create a new EvaluatorVersion with auto incremented version id */
  createVersion: (
    name: string,
    evaluatorVersion: EvaluatorVersion,
    options?: BetaEvaluatorsCreateVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** Delete the specific version of the EvaluatorVersion. The service returns 204 No Content if the EvaluatorVersion was deleted successfully or if the EvaluatorVersion does not exist. */
  deleteVersion: (
    name: string,
    version: string,
    options?: BetaEvaluatorsDeleteVersionOptionalParams,
  ) => Promise<void>;
  /** Get the specific version of the EvaluatorVersion. The service returns 404 Not Found error if the EvaluatorVersion does not exist. */
  getVersion: (
    name: string,
    version: string,
    options?: BetaEvaluatorsGetVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** List the latest version of each evaluator */
  list: (
    options?: BetaEvaluatorsListLatestVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluatorVersion>;
  /** List all versions of the given evaluator */
  listVersions: (
    name: string,
    options?: BetaEvaluatorsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluatorVersion>;
}

function _getBetaEvaluators(context: AIProjectContext) {
  return {
    getCredentials: (
      name: string,
      foundryFeatures: "Evaluations=V1Preview",
      credentialRequest: EvaluatorCredentialRequest,
      version: string,
      options?: BetaEvaluatorsGetCredentialsOptionalParams,
    ) => getCredentials(context, name, foundryFeatures, credentialRequest, version, options),
    pendingUpload: (
      name: string,
      foundryFeatures: "Evaluations=V1Preview",
      pendingUploadRequest: PendingUploadRequest,
      version: string,
      options?: BetaEvaluatorsPendingUploadOptionalParams,
    ) => pendingUpload(context, name, foundryFeatures, pendingUploadRequest, version, options),
    updateVersion: (
      name: string,
      version: string,
      evaluatorVersion: EvaluatorVersion,
      options?: BetaEvaluatorsUpdateVersionOptionalParams,
    ) => updateVersion(context, name, version, evaluatorVersion, options),
    createVersion: (
      name: string,
      evaluatorVersion: EvaluatorVersion,
      options?: BetaEvaluatorsCreateVersionOptionalParams,
    ) => createVersion(context, name, evaluatorVersion, options),
    deleteVersion: (
      name: string,
      version: string,
      options?: BetaEvaluatorsDeleteVersionOptionalParams,
    ) => deleteVersion(context, name, version, options),
    getVersion: (name: string, version: string, options?: BetaEvaluatorsGetVersionOptionalParams) =>
      getVersion(context, name, version, options),
    list: (options?: BetaEvaluatorsListLatestVersionsOptionalParams) =>
      listLatestVersions(context, options),
    listVersions: (name: string, options?: BetaEvaluatorsListVersionsOptionalParams) =>
      listVersions(context, name, options),
  };
}

export function _getBetaEvaluatorsOperations(context: AIProjectContext): BetaEvaluatorsOperations {
  return {
    ..._getBetaEvaluators(context),
  };
}
