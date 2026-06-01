// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogContext } from "../../api/microsoftDatadogContext.js";
import { list, createOrUpdate, get } from "../../api/singleSignOnConfigurations/operations.js";
import {
  SingleSignOnConfigurationsListOptionalParams,
  SingleSignOnConfigurationsCreateOrUpdateOptionalParams,
  SingleSignOnConfigurationsGetOptionalParams,
} from "../../api/singleSignOnConfigurations/options.js";
import { DatadogSingleSignOnResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SingleSignOnConfigurations operations. */
export interface SingleSignOnConfigurationsOperations {
  /** List the single sign-on configurations for a given monitor resource. */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: SingleSignOnConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<DatadogSingleSignOnResource>;
  /** Configures single-sign-on for this resource. */
  createOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: SingleSignOnConfigurationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DatadogSingleSignOnResource>, DatadogSingleSignOnResource>;
  /** Gets the datadog single sign-on resource for the given Monitor. */
  get: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: SingleSignOnConfigurationsGetOptionalParams,
  ) => Promise<DatadogSingleSignOnResource>;
}

function _getSingleSignOnConfigurations(context: MicrosoftDatadogContext) {
  return {
    list: (
      resourceGroupName: string,
      monitorName: string,
      options?: SingleSignOnConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, monitorName, options),
    createOrUpdate: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      options?: SingleSignOnConfigurationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, monitorName, configurationName, options),
    get: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      options?: SingleSignOnConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, monitorName, configurationName, options),
  };
}

export function _getSingleSignOnConfigurationsOperations(
  context: MicrosoftDatadogContext,
): SingleSignOnConfigurationsOperations {
  return {
    ..._getSingleSignOnConfigurations(context),
  };
}
