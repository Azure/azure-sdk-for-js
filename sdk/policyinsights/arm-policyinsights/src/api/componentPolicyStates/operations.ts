// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext as Client } from "../index.js";
import type {
  ComponentPolicyStatesQueryResults,
  ComponentPolicyStatesResource,
} from "../../models/policyInsightsApi/models.js";
import {
  errorResponseDeserializer,
  componentPolicyStatesQueryResultsDeserializer,
} from "../../models/policyInsightsApi/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ComponentPolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
  ComponentPolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
  ComponentPolicyStatesListQueryResultsForPolicyDefinitionOptionalParams,
  ComponentPolicyStatesListQueryResultsForResourceOptionalParams,
  ComponentPolicyStatesListQueryResultsForResourceGroupOptionalParams,
  ComponentPolicyStatesListQueryResultsForSubscriptionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listQueryResultsForResourceGroupLevelPolicyAssignmentSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  policyAssignmentName: string,
  componentPolicyStatesResource: ComponentPolicyStatesResource,
  options: ComponentPolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{authorizationNamespace}/policyAssignments/{policyAssignmentName}/providers/Microsoft.PolicyInsights/componentPolicyStates/{componentPolicyStatesResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply}",
    {
      subscriptionId: subscriptionId,
      resourceGroupName: resourceGroupName,
      authorizationNamespace: "Microsoft.Authorization",
      policyAssignmentName: policyAssignmentName,
      componentPolicyStatesResource: componentPolicyStatesResource,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.top,
      "%24orderby": options?.orderBy,
      "%24select": options?.select,
      "%24from": !options?.from ? options?.from : options?.from.toISOString(),
      "%24to": !options?.to ? options?.to : options?.to.toISOString(),
      "%24filter": options?.filter,
      "%24apply": options?.apply,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listQueryResultsForResourceGroupLevelPolicyAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<ComponentPolicyStatesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return componentPolicyStatesQueryResultsDeserializer(result.body);
}

/** Queries component policy states for the resource group level policy assignment. */
export async function listQueryResultsForResourceGroupLevelPolicyAssignment(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  policyAssignmentName: string,
  componentPolicyStatesResource: ComponentPolicyStatesResource,
  options: ComponentPolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams = {
    requestOptions: {},
  },
): Promise<ComponentPolicyStatesQueryResults> {
  const result = await _listQueryResultsForResourceGroupLevelPolicyAssignmentSend(
    context,
    subscriptionId,
    resourceGroupName,
    policyAssignmentName,
    componentPolicyStatesResource,
    options,
  );
  return _listQueryResultsForResourceGroupLevelPolicyAssignmentDeserialize(result);
}

export function _listQueryResultsForSubscriptionLevelPolicyAssignmentSend(
  context: Client,
  subscriptionId: string,
  policyAssignmentName: string,
  componentPolicyStatesResource: ComponentPolicyStatesResource,
  options: ComponentPolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{authorizationNamespace}/policyAssignments/{policyAssignmentName}/providers/Microsoft.PolicyInsights/componentPolicyStates/{componentPolicyStatesResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply}",
    {
      subscriptionId: subscriptionId,
      authorizationNamespace: "Microsoft.Authorization",
      policyAssignmentName: policyAssignmentName,
      componentPolicyStatesResource: componentPolicyStatesResource,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.top,
      "%24orderby": options?.orderBy,
      "%24select": options?.select,
      "%24from": !options?.from ? options?.from : options?.from.toISOString(),
      "%24to": !options?.to ? options?.to : options?.to.toISOString(),
      "%24filter": options?.filter,
      "%24apply": options?.apply,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listQueryResultsForSubscriptionLevelPolicyAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<ComponentPolicyStatesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return componentPolicyStatesQueryResultsDeserializer(result.body);
}

/** Queries component policy states for the subscription level policy assignment. */
export async function listQueryResultsForSubscriptionLevelPolicyAssignment(
  context: Client,
  subscriptionId: string,
  policyAssignmentName: string,
  componentPolicyStatesResource: ComponentPolicyStatesResource,
  options: ComponentPolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams = {
    requestOptions: {},
  },
): Promise<ComponentPolicyStatesQueryResults> {
  const result = await _listQueryResultsForSubscriptionLevelPolicyAssignmentSend(
    context,
    subscriptionId,
    policyAssignmentName,
    componentPolicyStatesResource,
    options,
  );
  return _listQueryResultsForSubscriptionLevelPolicyAssignmentDeserialize(result);
}

export function _listQueryResultsForPolicyDefinitionSend(
  context: Client,
  subscriptionId: string,
  policyDefinitionName: string,
  componentPolicyStatesResource: ComponentPolicyStatesResource,
  options: ComponentPolicyStatesListQueryResultsForPolicyDefinitionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{authorizationNamespace}/policyDefinitions/{policyDefinitionName}/providers/Microsoft.PolicyInsights/componentPolicyStates/{componentPolicyStatesResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply}",
    {
      subscriptionId: subscriptionId,
      authorizationNamespace: "Microsoft.Authorization",
      policyDefinitionName: policyDefinitionName,
      componentPolicyStatesResource: componentPolicyStatesResource,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.top,
      "%24orderby": options?.orderBy,
      "%24select": options?.select,
      "%24from": !options?.from ? options?.from : options?.from.toISOString(),
      "%24to": !options?.to ? options?.to : options?.to.toISOString(),
      "%24filter": options?.filter,
      "%24apply": options?.apply,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listQueryResultsForPolicyDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<ComponentPolicyStatesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return componentPolicyStatesQueryResultsDeserializer(result.body);
}

/** Queries component policy states for the subscription level policy definition. */
export async function listQueryResultsForPolicyDefinition(
  context: Client,
  subscriptionId: string,
  policyDefinitionName: string,
  componentPolicyStatesResource: ComponentPolicyStatesResource,
  options: ComponentPolicyStatesListQueryResultsForPolicyDefinitionOptionalParams = {
    requestOptions: {},
  },
): Promise<ComponentPolicyStatesQueryResults> {
  const result = await _listQueryResultsForPolicyDefinitionSend(
    context,
    subscriptionId,
    policyDefinitionName,
    componentPolicyStatesResource,
    options,
  );
  return _listQueryResultsForPolicyDefinitionDeserialize(result);
}

export function _listQueryResultsForResourceSend(
  context: Client,
  resourceId: string,
  componentPolicyStatesResource: ComponentPolicyStatesResource,
  options: ComponentPolicyStatesListQueryResultsForResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.PolicyInsights/componentPolicyStates/{componentPolicyStatesResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24expand}",
    {
      resourceId: resourceId,
      componentPolicyStatesResource: componentPolicyStatesResource,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.top,
      "%24orderby": options?.orderBy,
      "%24select": options?.select,
      "%24from": !options?.from ? options?.from : options?.from.toISOString(),
      "%24to": !options?.to ? options?.to : options?.to.toISOString(),
      "%24filter": options?.filter,
      "%24apply": options?.apply,
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listQueryResultsForResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<ComponentPolicyStatesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return componentPolicyStatesQueryResultsDeserializer(result.body);
}

/** Queries component policy states for the resource. */
export async function listQueryResultsForResource(
  context: Client,
  resourceId: string,
  componentPolicyStatesResource: ComponentPolicyStatesResource,
  options: ComponentPolicyStatesListQueryResultsForResourceOptionalParams = { requestOptions: {} },
): Promise<ComponentPolicyStatesQueryResults> {
  const result = await _listQueryResultsForResourceSend(
    context,
    resourceId,
    componentPolicyStatesResource,
    options,
  );
  return _listQueryResultsForResourceDeserialize(result);
}

export function _listQueryResultsForResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  componentPolicyStatesResource: ComponentPolicyStatesResource,
  options: ComponentPolicyStatesListQueryResultsForResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/componentPolicyStates/{componentPolicyStatesResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply}",
    {
      subscriptionId: subscriptionId,
      resourceGroupName: resourceGroupName,
      componentPolicyStatesResource: componentPolicyStatesResource,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.top,
      "%24orderby": options?.orderBy,
      "%24select": options?.select,
      "%24from": !options?.from ? options?.from : options?.from.toISOString(),
      "%24to": !options?.to ? options?.to : options?.to.toISOString(),
      "%24filter": options?.filter,
      "%24apply": options?.apply,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listQueryResultsForResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<ComponentPolicyStatesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return componentPolicyStatesQueryResultsDeserializer(result.body);
}

/** Queries component policy states under resource group scope. */
export async function listQueryResultsForResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  componentPolicyStatesResource: ComponentPolicyStatesResource,
  options: ComponentPolicyStatesListQueryResultsForResourceGroupOptionalParams = {
    requestOptions: {},
  },
): Promise<ComponentPolicyStatesQueryResults> {
  const result = await _listQueryResultsForResourceGroupSend(
    context,
    subscriptionId,
    resourceGroupName,
    componentPolicyStatesResource,
    options,
  );
  return _listQueryResultsForResourceGroupDeserialize(result);
}

export function _listQueryResultsForSubscriptionSend(
  context: Client,
  subscriptionId: string,
  componentPolicyStatesResource: ComponentPolicyStatesResource,
  options: ComponentPolicyStatesListQueryResultsForSubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/componentPolicyStates/{componentPolicyStatesResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply}",
    {
      subscriptionId: subscriptionId,
      componentPolicyStatesResource: componentPolicyStatesResource,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.top,
      "%24orderby": options?.orderBy,
      "%24select": options?.select,
      "%24from": !options?.from ? options?.from : options?.from.toISOString(),
      "%24to": !options?.to ? options?.to : options?.to.toISOString(),
      "%24filter": options?.filter,
      "%24apply": options?.apply,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listQueryResultsForSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<ComponentPolicyStatesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return componentPolicyStatesQueryResultsDeserializer(result.body);
}

/** Queries component policy states under subscription scope. */
export async function listQueryResultsForSubscription(
  context: Client,
  subscriptionId: string,
  componentPolicyStatesResource: ComponentPolicyStatesResource,
  options: ComponentPolicyStatesListQueryResultsForSubscriptionOptionalParams = {
    requestOptions: {},
  },
): Promise<ComponentPolicyStatesQueryResults> {
  const result = await _listQueryResultsForSubscriptionSend(
    context,
    subscriptionId,
    componentPolicyStatesResource,
    options,
  );
  return _listQueryResultsForSubscriptionDeserialize(result);
}
