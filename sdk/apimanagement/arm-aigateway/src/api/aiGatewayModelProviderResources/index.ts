// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listSecrets,
  listByWorkspace,
  $delete,
  update,
  createOrUpdate,
  get,
  checkExistence,
} from "./operations.js";
export type {
  AiGatewayModelProviderResourcesListSecretsOptionalParams,
  AiGatewayModelProviderResourcesListByWorkspaceOptionalParams,
  AiGatewayModelProviderResourcesDeleteOptionalParams,
  AiGatewayModelProviderResourcesUpdateOptionalParams,
  AiGatewayModelProviderResourcesCreateOrUpdateOptionalParams,
  AiGatewayModelProviderResourcesGetOptionalParams,
  AiGatewayModelProviderResourcesCheckExistenceOptionalParams,
} from "./options.js";
