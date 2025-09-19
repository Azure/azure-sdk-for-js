// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { getStatus, list, $delete, createOrUpdate, get } from "../../api/openAI/operations.js";
import type {
  OpenAIGetStatusOptionalParams,
  OpenAIListOptionalParams,
  OpenAIDeleteOptionalParams,
  OpenAICreateOrUpdateOptionalParams,
  OpenAIGetOptionalParams,
} from "../../api/openAI/options.js";
import type {
  OpenAIIntegrationRPModel,
  OpenAIIntegrationStatusResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a OpenAI operations. */
export interface OpenAIOperations {
  /** Get the status of OpenAI integration for a given Elastic monitor resource, ensuring optimal observability and performance. */
  getStatus: (
    resourceGroupName: string,
    monitorName: string,
    integrationName: string,
    options?: OpenAIGetStatusOptionalParams,
  ) => Promise<OpenAIIntegrationStatusResponse>;
  /** List all OpenAI integration rules for a given Elastic monitor resource, helping you manage AI-driven observability and monitoring. */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: OpenAIListOptionalParams,
  ) => PagedAsyncIterableIterator<OpenAIIntegrationRPModel>;
  /** Delete an OpenAI integration rule for a given Elastic monitor resource, removing AI-driven observability and monitoring capabilities. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    monitorName: string,
    integrationName: string,
    options?: OpenAIDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update an OpenAI integration rule for a given Elastic monitor resource, enabling advanced AI-driven observability and monitoring. */
  createOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    integrationName: string,
    options?: OpenAICreateOrUpdateOptionalParams,
  ) => Promise<OpenAIIntegrationRPModel>;
  /** Get detailed information about OpenAI integration rules for a given Elastic monitor resource. */
  get: (
    resourceGroupName: string,
    monitorName: string,
    integrationName: string,
    options?: OpenAIGetOptionalParams,
  ) => Promise<OpenAIIntegrationRPModel>;
}

function _getOpenAI(context: MicrosoftElasticContext) {
  return {
    getStatus: (
      resourceGroupName: string,
      monitorName: string,
      integrationName: string,
      options?: OpenAIGetStatusOptionalParams,
    ) => getStatus(context, resourceGroupName, monitorName, integrationName, options),
    list: (resourceGroupName: string, monitorName: string, options?: OpenAIListOptionalParams) =>
      list(context, resourceGroupName, monitorName, options),
    delete: (
      resourceGroupName: string,
      monitorName: string,
      integrationName: string,
      options?: OpenAIDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, monitorName, integrationName, options),
    createOrUpdate: (
      resourceGroupName: string,
      monitorName: string,
      integrationName: string,
      options?: OpenAICreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, monitorName, integrationName, options),
    get: (
      resourceGroupName: string,
      monitorName: string,
      integrationName: string,
      options?: OpenAIGetOptionalParams,
    ) => get(context, resourceGroupName, monitorName, integrationName, options),
  };
}

export function _getOpenAIOperations(context: MicrosoftElasticContext): OpenAIOperations {
  return {
    ..._getOpenAI(context),
  };
}
