// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { list, get } from "../../api/scenarioTemplates/operations.js";
import type {
  ScenarioTemplatesListOptionalParams,
  ScenarioTemplatesGetOptionalParams,
} from "../../api/scenarioTemplates/options.js";
import type { ScenarioTemplate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScenarioTemplates operations. */
export interface ScenarioTemplatesOperations {
  /** Get a list of the scenario templates published by Microsoft. */
  list: (
    options?: ScenarioTemplatesListOptionalParams,
  ) => PagedAsyncIterableIterator<ScenarioTemplate>;
  /** Get a scenario template, described by its newest published version. */
  get: (
    scenarioTemplateName: string,
    options?: ScenarioTemplatesGetOptionalParams,
  ) => Promise<ScenarioTemplate>;
}

function _getScenarioTemplates(context: ChaosManagementContext) {
  return {
    list: (options?: ScenarioTemplatesListOptionalParams) => list(context, options),
    get: (scenarioTemplateName: string, options?: ScenarioTemplatesGetOptionalParams) =>
      get(context, scenarioTemplateName, options),
  };
}

export function _getScenarioTemplatesOperations(
  context: ChaosManagementContext,
): ScenarioTemplatesOperations {
  return {
    ..._getScenarioTemplates(context),
  };
}
