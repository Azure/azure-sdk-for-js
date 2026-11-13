// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { list, get } from "../../api/scenarioTemplateVersions/operations.js";
import type {
  ScenarioTemplateVersionsListOptionalParams,
  ScenarioTemplateVersionsGetOptionalParams,
} from "../../api/scenarioTemplateVersions/options.js";
import type { ScenarioTemplateVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScenarioTemplateVersions operations. */
export interface ScenarioTemplateVersionsOperations {
  /** Get a list of the published versions of a scenario template, including superseded ones. */
  list: (
    scenarioTemplateName: string,
    options?: ScenarioTemplateVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ScenarioTemplateVersion>;
  /** Get a single published version of a scenario template. */
  get: (
    scenarioTemplateName: string,
    version: string,
    options?: ScenarioTemplateVersionsGetOptionalParams,
  ) => Promise<ScenarioTemplateVersion>;
}

function _getScenarioTemplateVersions(context: ChaosManagementContext) {
  return {
    list: (scenarioTemplateName: string, options?: ScenarioTemplateVersionsListOptionalParams) =>
      list(context, scenarioTemplateName, options),
    get: (
      scenarioTemplateName: string,
      version: string,
      options?: ScenarioTemplateVersionsGetOptionalParams,
    ) => get(context, scenarioTemplateName, version, options),
  };
}

export function _getScenarioTemplateVersionsOperations(
  context: ChaosManagementContext,
): ScenarioTemplateVersionsOperations {
  return {
    ..._getScenarioTemplateVersions(context),
  };
}
