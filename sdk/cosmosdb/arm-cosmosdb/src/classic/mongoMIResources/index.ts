// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import {
  listMongoMIRoleAssignments,
  deleteMongoMIRoleAssignment,
  createUpdateMongoMIRoleAssignment,
  getMongoMIRoleAssignment,
  listMongoMIRoleDefinitions,
  deleteMongoMIRoleDefinition,
  createUpdateMongoMIRoleDefinition,
  getMongoMIRoleDefinition,
} from "../../api/mongoMIResources/operations.js";
import type {
  MongoMIResourcesListMongoMIRoleAssignmentsOptionalParams,
  MongoMIResourcesDeleteMongoMIRoleAssignmentOptionalParams,
  MongoMIResourcesCreateUpdateMongoMIRoleAssignmentOptionalParams,
  MongoMIResourcesGetMongoMIRoleAssignmentOptionalParams,
  MongoMIResourcesListMongoMIRoleDefinitionsOptionalParams,
  MongoMIResourcesDeleteMongoMIRoleDefinitionOptionalParams,
  MongoMIResourcesCreateUpdateMongoMIRoleDefinitionOptionalParams,
  MongoMIResourcesGetMongoMIRoleDefinitionOptionalParams,
} from "../../api/mongoMIResources/options.js";
import type {
  MongoMIRoleDefinitionResource,
  MongoMIRoleAssignmentResource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MongoMIResources operations. */
export interface MongoMIResourcesOperations {
  /** Retrieves the list of all Azure Cosmos DB MongoMI Role Assignments. */
  listMongoMIRoleAssignments: (
    resourceGroupName: string,
    accountName: string,
    options?: MongoMIResourcesListMongoMIRoleAssignmentsOptionalParams,
  ) => PagedAsyncIterableIterator<MongoMIRoleAssignmentResource>;
  /** Deletes an existing Azure Cosmos DB MongoMI Role Assignment. */
  deleteMongoMIRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: MongoMIResourcesDeleteMongoMIRoleAssignmentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteMongoMIRoleAssignment instead */
  beginDeleteMongoMIRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: MongoMIResourcesDeleteMongoMIRoleAssignmentOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteMongoMIRoleAssignment instead */
  beginDeleteMongoMIRoleAssignmentAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: MongoMIResourcesDeleteMongoMIRoleAssignmentOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an Azure Cosmos DB MongoMI Role Assignment. */
  createUpdateMongoMIRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    createUpdateMongoMIRoleAssignmentParameters: MongoMIRoleAssignmentResource,
    options?: MongoMIResourcesCreateUpdateMongoMIRoleAssignmentOptionalParams,
  ) => PollerLike<OperationState<MongoMIRoleAssignmentResource>, MongoMIRoleAssignmentResource>;
  /** @deprecated use createUpdateMongoMIRoleAssignment instead */
  beginCreateUpdateMongoMIRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    createUpdateMongoMIRoleAssignmentParameters: MongoMIRoleAssignmentResource,
    options?: MongoMIResourcesCreateUpdateMongoMIRoleAssignmentOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MongoMIRoleAssignmentResource>, MongoMIRoleAssignmentResource>
  >;
  /** @deprecated use createUpdateMongoMIRoleAssignment instead */
  beginCreateUpdateMongoMIRoleAssignmentAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    createUpdateMongoMIRoleAssignmentParameters: MongoMIRoleAssignmentResource,
    options?: MongoMIResourcesCreateUpdateMongoMIRoleAssignmentOptionalParams,
  ) => Promise<MongoMIRoleAssignmentResource>;
  /** Retrieves the properties of an existing Azure Cosmos DB MongoMI Role Assignment with the given Id. */
  getMongoMIRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: MongoMIResourcesGetMongoMIRoleAssignmentOptionalParams,
  ) => Promise<MongoMIRoleAssignmentResource>;
  /** Retrieves the list of all Azure Cosmos DB MongoMI Role Definitions. */
  listMongoMIRoleDefinitions: (
    resourceGroupName: string,
    accountName: string,
    options?: MongoMIResourcesListMongoMIRoleDefinitionsOptionalParams,
  ) => PagedAsyncIterableIterator<MongoMIRoleDefinitionResource>;
  /** Deletes an existing Azure Cosmos DB MongoMI Role Definition. */
  deleteMongoMIRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: MongoMIResourcesDeleteMongoMIRoleDefinitionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteMongoMIRoleDefinition instead */
  beginDeleteMongoMIRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: MongoMIResourcesDeleteMongoMIRoleDefinitionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteMongoMIRoleDefinition instead */
  beginDeleteMongoMIRoleDefinitionAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: MongoMIResourcesDeleteMongoMIRoleDefinitionOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an Azure Cosmos DB MongoMI Role Definition. */
  createUpdateMongoMIRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    createUpdateMongoMIRoleDefinitionParameters: MongoMIRoleDefinitionResource,
    options?: MongoMIResourcesCreateUpdateMongoMIRoleDefinitionOptionalParams,
  ) => PollerLike<OperationState<MongoMIRoleDefinitionResource>, MongoMIRoleDefinitionResource>;
  /** @deprecated use createUpdateMongoMIRoleDefinition instead */
  beginCreateUpdateMongoMIRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    createUpdateMongoMIRoleDefinitionParameters: MongoMIRoleDefinitionResource,
    options?: MongoMIResourcesCreateUpdateMongoMIRoleDefinitionOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MongoMIRoleDefinitionResource>, MongoMIRoleDefinitionResource>
  >;
  /** @deprecated use createUpdateMongoMIRoleDefinition instead */
  beginCreateUpdateMongoMIRoleDefinitionAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    createUpdateMongoMIRoleDefinitionParameters: MongoMIRoleDefinitionResource,
    options?: MongoMIResourcesCreateUpdateMongoMIRoleDefinitionOptionalParams,
  ) => Promise<MongoMIRoleDefinitionResource>;
  /** Retrieves the properties of an existing Azure Cosmos DB MongoMI Role Definition with the given Id. */
  getMongoMIRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: MongoMIResourcesGetMongoMIRoleDefinitionOptionalParams,
  ) => Promise<MongoMIRoleDefinitionResource>;
}

function _getMongoMIResources(context: CosmosDBManagementContext) {
  return {
    listMongoMIRoleAssignments: (
      resourceGroupName: string,
      accountName: string,
      options?: MongoMIResourcesListMongoMIRoleAssignmentsOptionalParams,
    ) => listMongoMIRoleAssignments(context, resourceGroupName, accountName, options),
    deleteMongoMIRoleAssignment: (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: MongoMIResourcesDeleteMongoMIRoleAssignmentOptionalParams,
    ) =>
      deleteMongoMIRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        options,
      ),
    beginDeleteMongoMIRoleAssignment: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: MongoMIResourcesDeleteMongoMIRoleAssignmentOptionalParams,
    ) => {
      const poller = deleteMongoMIRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteMongoMIRoleAssignmentAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: MongoMIResourcesDeleteMongoMIRoleAssignmentOptionalParams,
    ) => {
      return await deleteMongoMIRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        options,
      );
    },
    createUpdateMongoMIRoleAssignment: (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      createUpdateMongoMIRoleAssignmentParameters: MongoMIRoleAssignmentResource,
      options?: MongoMIResourcesCreateUpdateMongoMIRoleAssignmentOptionalParams,
    ) =>
      createUpdateMongoMIRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        createUpdateMongoMIRoleAssignmentParameters,
        options,
      ),
    beginCreateUpdateMongoMIRoleAssignment: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      createUpdateMongoMIRoleAssignmentParameters: MongoMIRoleAssignmentResource,
      options?: MongoMIResourcesCreateUpdateMongoMIRoleAssignmentOptionalParams,
    ) => {
      const poller = createUpdateMongoMIRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        createUpdateMongoMIRoleAssignmentParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateMongoMIRoleAssignmentAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      createUpdateMongoMIRoleAssignmentParameters: MongoMIRoleAssignmentResource,
      options?: MongoMIResourcesCreateUpdateMongoMIRoleAssignmentOptionalParams,
    ) => {
      return await createUpdateMongoMIRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        createUpdateMongoMIRoleAssignmentParameters,
        options,
      );
    },
    getMongoMIRoleAssignment: (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: MongoMIResourcesGetMongoMIRoleAssignmentOptionalParams,
    ) =>
      getMongoMIRoleAssignment(context, resourceGroupName, accountName, roleAssignmentId, options),
    listMongoMIRoleDefinitions: (
      resourceGroupName: string,
      accountName: string,
      options?: MongoMIResourcesListMongoMIRoleDefinitionsOptionalParams,
    ) => listMongoMIRoleDefinitions(context, resourceGroupName, accountName, options),
    deleteMongoMIRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: MongoMIResourcesDeleteMongoMIRoleDefinitionOptionalParams,
    ) =>
      deleteMongoMIRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        options,
      ),
    beginDeleteMongoMIRoleDefinition: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: MongoMIResourcesDeleteMongoMIRoleDefinitionOptionalParams,
    ) => {
      const poller = deleteMongoMIRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteMongoMIRoleDefinitionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: MongoMIResourcesDeleteMongoMIRoleDefinitionOptionalParams,
    ) => {
      return await deleteMongoMIRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        options,
      );
    },
    createUpdateMongoMIRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      createUpdateMongoMIRoleDefinitionParameters: MongoMIRoleDefinitionResource,
      options?: MongoMIResourcesCreateUpdateMongoMIRoleDefinitionOptionalParams,
    ) =>
      createUpdateMongoMIRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        createUpdateMongoMIRoleDefinitionParameters,
        options,
      ),
    beginCreateUpdateMongoMIRoleDefinition: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      createUpdateMongoMIRoleDefinitionParameters: MongoMIRoleDefinitionResource,
      options?: MongoMIResourcesCreateUpdateMongoMIRoleDefinitionOptionalParams,
    ) => {
      const poller = createUpdateMongoMIRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        createUpdateMongoMIRoleDefinitionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateMongoMIRoleDefinitionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      createUpdateMongoMIRoleDefinitionParameters: MongoMIRoleDefinitionResource,
      options?: MongoMIResourcesCreateUpdateMongoMIRoleDefinitionOptionalParams,
    ) => {
      return await createUpdateMongoMIRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        createUpdateMongoMIRoleDefinitionParameters,
        options,
      );
    },
    getMongoMIRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: MongoMIResourcesGetMongoMIRoleDefinitionOptionalParams,
    ) =>
      getMongoMIRoleDefinition(context, resourceGroupName, accountName, roleDefinitionId, options),
  };
}

export function _getMongoMIResourcesOperations(
  context: CosmosDBManagementContext,
): MongoMIResourcesOperations {
  return {
    ..._getMongoMIResources(context),
  };
}
