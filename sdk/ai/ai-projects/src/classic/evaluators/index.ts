// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  updateVersion,
  createVersion,
  deleteVersion,
  getVersion,
  listLatestVersions,
  listVersions,
} from "../../api/evaluators/operations.js";
import {
  EvaluatorsUpdateVersionOptionalParams,
  EvaluatorsCreateVersionOptionalParams,
  EvaluatorsDeleteVersionOptionalParams,
  EvaluatorsGetVersionOptionalParams,
  EvaluatorsListLatestVersionsOptionalParams,
  EvaluatorsListVersionsOptionalParams,
} from "../../api/evaluators/options.js";
import { EvaluatorVersion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Evaluators operations. */
export interface EvaluatorsOperations {
  /** Update an existing EvaluatorVersion with the given version id */
  updateVersion: (
    name: string,
    version: string,
    evaluatorVersion: EvaluatorVersion,
    options?: EvaluatorsUpdateVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** Create a new EvaluatorVersion with auto incremented version id */
  createVersion: (
    name: string,
    evaluatorVersion: EvaluatorVersion,
    options?: EvaluatorsCreateVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** Delete the specific version of the EvaluatorVersion. The service returns 204 No Content if the EvaluatorVersion was deleted successfully or if the EvaluatorVersion does not exist. */
  deleteVersion: (
    name: string,
    version: string,
    options?: EvaluatorsDeleteVersionOptionalParams,
  ) => Promise<void>;
  /** Get the specific version of the EvaluatorVersion. The service returns 404 Not Found error if the EvaluatorVersion does not exist. */
  getVersion: (
    name: string,
    version: string,
    options?: EvaluatorsGetVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** List the latest version of each evaluator */
  listLatestVersions: (
    options?: EvaluatorsListLatestVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluatorVersion>;
  /** List all versions of the given evaluator */
  listVersions: (
    name: string,
    options?: EvaluatorsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluatorVersion>;
}

function _getEvaluators(context: AIProjectContext) {
  return {
    updateVersion: (
      name: string,
      version: string,
      evaluatorVersion: EvaluatorVersion,
      options?: EvaluatorsUpdateVersionOptionalParams,
    ) => updateVersion(context, name, version, evaluatorVersion, options),
    createVersion: (
      name: string,
      evaluatorVersion: EvaluatorVersion,
      options?: EvaluatorsCreateVersionOptionalParams,
    ) => createVersion(context, name, evaluatorVersion, options),
    deleteVersion: (
      name: string,
      version: string,
      options?: EvaluatorsDeleteVersionOptionalParams,
    ) => deleteVersion(context, name, version, options),
    getVersion: (name: string, version: string, options?: EvaluatorsGetVersionOptionalParams) =>
      getVersion(context, name, version, options),
    listLatestVersions: (options?: EvaluatorsListLatestVersionsOptionalParams) =>
      listLatestVersions(context, options),
    listVersions: (name: string, options?: EvaluatorsListVersionsOptionalParams) =>
      listVersions(context, name, options),
  };
}

export function _getEvaluatorsOperations(context: AIProjectContext): EvaluatorsOperations {
  return {
    ..._getEvaluators(context),
  };
}
