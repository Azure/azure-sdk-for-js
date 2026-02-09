// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  updateVersion,
  createVersion,
  deleteVersion,
  getVersion,
  listLatestVersions,
  listVersions,
} from "../../../api/beta/evaluators/operations.js";
import {
  BetaEvaluatorsUpdateVersionOptionalParams,
  BetaEvaluatorsCreateVersionOptionalParams,
  BetaEvaluatorsDeleteVersionOptionalParams,
  BetaEvaluatorsGetVersionOptionalParams,
  BetaEvaluatorsListLatestVersionsOptionalParams,
  BetaEvaluatorsListVersionsOptionalParams,
} from "../../../api/beta/evaluators/options.js";
import { EvaluatorVersion } from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaEvaluators operations. */
export interface BetaEvaluatorsOperations {
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
  listLatestVersions: (
    foundryFeatures: "Evaluations=V1Preview",
    options?: BetaEvaluatorsListLatestVersionsOptionalParams,
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
    listLatestVersions: (
      foundryFeatures: "Evaluations=V1Preview",
      options?: BetaEvaluatorsListLatestVersionsOptionalParams,
    ) => listLatestVersions(context, foundryFeatures, options),
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
