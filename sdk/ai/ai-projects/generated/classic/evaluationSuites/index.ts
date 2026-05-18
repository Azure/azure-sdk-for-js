// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  createOrUpdateVersion,
  deleteVersion,
  getVersion,
  listLatest,
  listVersions,
} from "../../api/evaluationSuites/operations.js";
import {
  EvaluationSuitesCreateOrUpdateVersionOptionalParams,
  EvaluationSuitesDeleteVersionOptionalParams,
  EvaluationSuitesGetVersionOptionalParams,
  EvaluationSuitesListLatestOptionalParams,
  EvaluationSuitesListVersionsOptionalParams,
} from "../../api/evaluationSuites/options.js";
import { EvaluationSuiteVersion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EvaluationSuites operations. */
export interface EvaluationSuitesOperations {
  /** Create a new or update an existing EvaluationSuiteVersion with the given version id */
  createOrUpdateVersion: (
    name: string,
    evaluationSuiteVersion: EvaluationSuiteVersion,
    version: string,
    options?: EvaluationSuitesCreateOrUpdateVersionOptionalParams,
  ) => Promise<EvaluationSuiteVersion>;
  /** Delete the specific version of the EvaluationSuiteVersion. The service returns 204 No Content if the EvaluationSuiteVersion was deleted successfully or if the EvaluationSuiteVersion does not exist. */
  deleteVersion: (
    name: string,
    version: string,
    options?: EvaluationSuitesDeleteVersionOptionalParams,
  ) => Promise<void>;
  /** Get the specific version of the EvaluationSuiteVersion. The service returns 404 Not Found error if the EvaluationSuiteVersion does not exist. */
  getVersion: (
    name: string,
    version: string,
    options?: EvaluationSuitesGetVersionOptionalParams,
  ) => Promise<EvaluationSuiteVersion>;
  /** List the latest version of each EvaluationSuiteVersion */
  listLatest: (
    options?: EvaluationSuitesListLatestOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluationSuiteVersion>;
  /** List all versions of the given EvaluationSuiteVersion */
  listVersions: (
    name: string,
    options?: EvaluationSuitesListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluationSuiteVersion>;
}

function _getEvaluationSuites(context: AIProjectContext) {
  return {
    createOrUpdateVersion: (
      name: string,
      evaluationSuiteVersion: EvaluationSuiteVersion,
      version: string,
      options?: EvaluationSuitesCreateOrUpdateVersionOptionalParams,
    ) => createOrUpdateVersion(context, name, evaluationSuiteVersion, version, options),
    deleteVersion: (
      name: string,
      version: string,
      options?: EvaluationSuitesDeleteVersionOptionalParams,
    ) => deleteVersion(context, name, version, options),
    getVersion: (
      name: string,
      version: string,
      options?: EvaluationSuitesGetVersionOptionalParams,
    ) => getVersion(context, name, version, options),
    listLatest: (options?: EvaluationSuitesListLatestOptionalParams) =>
      listLatest(context, options),
    listVersions: (name: string, options?: EvaluationSuitesListVersionsOptionalParams) =>
      listVersions(context, name, options),
  };
}

export function _getEvaluationSuitesOperations(
  context: AIProjectContext,
): EvaluationSuitesOperations {
  return {
    ..._getEvaluationSuites(context),
  };
}
