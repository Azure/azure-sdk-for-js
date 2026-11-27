// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  regenerateSecondaryKey,
  regeneratePrimaryKey,
  listSecrets,
  listByAiGateway,
  $delete,
  update,
  createOrUpdate,
  get,
  checkExistence,
} from "../../api/aiGatewayApiKeyResources/operations.js";
import type {
  AiGatewayApiKeyResourcesRegenerateSecondaryKeyOptionalParams,
  AiGatewayApiKeyResourcesRegeneratePrimaryKeyOptionalParams,
  AiGatewayApiKeyResourcesListSecretsOptionalParams,
  AiGatewayApiKeyResourcesListByAiGatewayOptionalParams,
  AiGatewayApiKeyResourcesDeleteOptionalParams,
  AiGatewayApiKeyResourcesUpdateOptionalParams,
  AiGatewayApiKeyResourcesCreateOrUpdateOptionalParams,
  AiGatewayApiKeyResourcesGetOptionalParams,
  AiGatewayApiKeyResourcesCheckExistenceOptionalParams,
} from "../../api/aiGatewayApiKeyResources/options.js";
import type {
  AiGatewayApiKeyResource,
  AiGatewayApiKeyUpdateParameters,
  AiGatewayApiKeyValues,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AiGatewayApiKeyResources operations. */
export interface AiGatewayApiKeyResourcesOperations {
  /** Regenerates the secondary API key value. */
  regenerateSecondaryKey: (
    resourceGroupName: string,
    aiGatewayName: string,
    apiKeyName: string,
    options?: AiGatewayApiKeyResourcesRegenerateSecondaryKeyOptionalParams,
  ) => Promise<void>;
  /** Regenerates the primary API key value. */
  regeneratePrimaryKey: (
    resourceGroupName: string,
    aiGatewayName: string,
    apiKeyName: string,
    options?: AiGatewayApiKeyResourcesRegeneratePrimaryKeyOptionalParams,
  ) => Promise<void>;
  /** Returns primary and secondary key values. */
  listSecrets: (
    resourceGroupName: string,
    aiGatewayName: string,
    apiKeyName: string,
    options?: AiGatewayApiKeyResourcesListSecretsOptionalParams,
  ) => Promise<AiGatewayApiKeyValues>;
  /** List AiGatewayApiKeyResource resources by AiGatewayResource */
  listByAiGateway: (
    resourceGroupName: string,
    aiGatewayName: string,
    options?: AiGatewayApiKeyResourcesListByAiGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<AiGatewayApiKeyResource>;
  /** Delete a AiGatewayApiKeyResource */
  delete: (
    resourceGroupName: string,
    aiGatewayName: string,
    apiKeyName: string,
    ifMatch: string,
    options?: AiGatewayApiKeyResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a AiGatewayApiKeyResource */
  update: (
    resourceGroupName: string,
    aiGatewayName: string,
    apiKeyName: string,
    ifMatch: string,
    properties: AiGatewayApiKeyUpdateParameters,
    options?: AiGatewayApiKeyResourcesUpdateOptionalParams,
  ) => Promise<AiGatewayApiKeyResource>;
  /** Create a AiGatewayApiKeyResource */
  createOrUpdate: (
    resourceGroupName: string,
    aiGatewayName: string,
    apiKeyName: string,
    resource: AiGatewayApiKeyResource,
    options?: AiGatewayApiKeyResourcesCreateOrUpdateOptionalParams,
  ) => Promise<AiGatewayApiKeyResource>;
  /** Get a AiGatewayApiKeyResource */
  get: (
    resourceGroupName: string,
    aiGatewayName: string,
    apiKeyName: string,
    options?: AiGatewayApiKeyResourcesGetOptionalParams,
  ) => Promise<AiGatewayApiKeyResource>;
  /** Check for the existence of a AiGatewayApiKeyResource */
  checkExistence: (
    resourceGroupName: string,
    aiGatewayName: string,
    apiKeyName: string,
    options?: AiGatewayApiKeyResourcesCheckExistenceOptionalParams,
  ) => Promise<void>;
}

function _getAiGatewayApiKeyResources(context: ApiManagementContext) {
  return {
    regenerateSecondaryKey: (
      resourceGroupName: string,
      aiGatewayName: string,
      apiKeyName: string,
      options?: AiGatewayApiKeyResourcesRegenerateSecondaryKeyOptionalParams,
    ) => regenerateSecondaryKey(context, resourceGroupName, aiGatewayName, apiKeyName, options),
    regeneratePrimaryKey: (
      resourceGroupName: string,
      aiGatewayName: string,
      apiKeyName: string,
      options?: AiGatewayApiKeyResourcesRegeneratePrimaryKeyOptionalParams,
    ) => regeneratePrimaryKey(context, resourceGroupName, aiGatewayName, apiKeyName, options),
    listSecrets: (
      resourceGroupName: string,
      aiGatewayName: string,
      apiKeyName: string,
      options?: AiGatewayApiKeyResourcesListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, aiGatewayName, apiKeyName, options),
    listByAiGateway: (
      resourceGroupName: string,
      aiGatewayName: string,
      options?: AiGatewayApiKeyResourcesListByAiGatewayOptionalParams,
    ) => listByAiGateway(context, resourceGroupName, aiGatewayName, options),
    delete: (
      resourceGroupName: string,
      aiGatewayName: string,
      apiKeyName: string,
      ifMatch: string,
      options?: AiGatewayApiKeyResourcesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, aiGatewayName, apiKeyName, ifMatch, options),
    update: (
      resourceGroupName: string,
      aiGatewayName: string,
      apiKeyName: string,
      ifMatch: string,
      properties: AiGatewayApiKeyUpdateParameters,
      options?: AiGatewayApiKeyResourcesUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, aiGatewayName, apiKeyName, ifMatch, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      aiGatewayName: string,
      apiKeyName: string,
      resource: AiGatewayApiKeyResource,
      options?: AiGatewayApiKeyResourcesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, aiGatewayName, apiKeyName, resource, options),
    get: (
      resourceGroupName: string,
      aiGatewayName: string,
      apiKeyName: string,
      options?: AiGatewayApiKeyResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, aiGatewayName, apiKeyName, options),
    checkExistence: (
      resourceGroupName: string,
      aiGatewayName: string,
      apiKeyName: string,
      options?: AiGatewayApiKeyResourcesCheckExistenceOptionalParams,
    ) => checkExistence(context, resourceGroupName, aiGatewayName, apiKeyName, options),
  };
}

export function _getAiGatewayApiKeyResourcesOperations(
  context: ApiManagementContext,
): AiGatewayApiKeyResourcesOperations {
  return {
    ..._getAiGatewayApiKeyResources(context),
  };
}
