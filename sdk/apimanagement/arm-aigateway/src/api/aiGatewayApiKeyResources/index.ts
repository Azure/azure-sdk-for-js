// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  regenerateSecondaryKey,
  regeneratePrimaryKey,
  listSecrets,
  listByAiGateway,
  $delete,
  update,
  createOrUpdate,
  get,
  checkExistence,
} from "./operations.js";
export type {
  AiGatewayApiKeyResourcesRegenerateSecondaryKeyOptionalParams,
  AiGatewayApiKeyResourcesRegeneratePrimaryKeyOptionalParams,
  AiGatewayApiKeyResourcesListSecretsOptionalParams,
  AiGatewayApiKeyResourcesListByAiGatewayOptionalParams,
  AiGatewayApiKeyResourcesDeleteOptionalParams,
  AiGatewayApiKeyResourcesUpdateOptionalParams,
  AiGatewayApiKeyResourcesCreateOrUpdateOptionalParams,
  AiGatewayApiKeyResourcesGetOptionalParams,
  AiGatewayApiKeyResourcesCheckExistenceOptionalParams,
} from "./options.js";
