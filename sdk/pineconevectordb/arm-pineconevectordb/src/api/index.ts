// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  OrganizationsListBySubscriptionOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsUpdateOptionalParams,
  OrganizationsCreateOrUpdateOptionalParams,
  OrganizationsGetOptionalParams,
  OperationsListOptionalParams,
} from "./options.js";
export {
  createVectorDb,
  VectorDbContext,
  VectorDbClientOptionalParams,
} from "./vectorDbContext.js";
export { operationsList } from "./operations/index.js";
export {
  organizationsListBySubscription,
  organizationsListByResourceGroup,
  organizationsDelete,
  organizationsUpdate,
  organizationsCreateOrUpdate,
  organizationsGet,
} from "./organizations/index.js";
