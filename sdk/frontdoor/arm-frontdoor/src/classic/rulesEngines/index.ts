// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext } from "../../api/frontDoorManagementContext.js";
import {
  listByFrontDoor,
  $delete,
  createOrUpdate,
  get,
} from "../../api/rulesEngines/operations.js";
import type {
  RulesEnginesListByFrontDoorOptionalParams,
  RulesEnginesDeleteOptionalParams,
  RulesEnginesCreateOrUpdateOptionalParams,
  RulesEnginesGetOptionalParams,
} from "../../api/rulesEngines/options.js";
import type { RulesEngine } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RulesEngines operations. */
export interface RulesEnginesOperations {
  /** Lists all of the Rules Engine Configurations within a Front Door. */
  listByFrontDoor: (
    resourceGroupName: string,
    frontDoorName: string,
    options?: RulesEnginesListByFrontDoorOptionalParams,
  ) => PagedAsyncIterableIterator<RulesEngine>;
  /** Deletes an existing Rules Engine Configuration with the specified parameters. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    frontDoorName: string,
    rulesEngineName: string,
    options?: RulesEnginesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    frontDoorName: string,
    rulesEngineName: string,
    options?: RulesEnginesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    frontDoorName: string,
    rulesEngineName: string,
    options?: RulesEnginesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new Rules Engine Configuration with the specified name within the specified Front Door. */
  createOrUpdate: (
    resourceGroupName: string,
    frontDoorName: string,
    rulesEngineName: string,
    rulesEngineParameters: RulesEngine,
    options?: RulesEnginesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<RulesEngine>, RulesEngine>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    frontDoorName: string,
    rulesEngineName: string,
    rulesEngineParameters: RulesEngine,
    options?: RulesEnginesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RulesEngine>, RulesEngine>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    frontDoorName: string,
    rulesEngineName: string,
    rulesEngineParameters: RulesEngine,
    options?: RulesEnginesCreateOrUpdateOptionalParams,
  ) => Promise<RulesEngine>;
  /** Gets a Rules Engine Configuration with the specified name within the specified Front Door. */
  get: (
    resourceGroupName: string,
    frontDoorName: string,
    rulesEngineName: string,
    options?: RulesEnginesGetOptionalParams,
  ) => Promise<RulesEngine>;
}

function _getRulesEngines(context: FrontDoorManagementContext) {
  return {
    listByFrontDoor: (
      resourceGroupName: string,
      frontDoorName: string,
      options?: RulesEnginesListByFrontDoorOptionalParams,
    ) => listByFrontDoor(context, resourceGroupName, frontDoorName, options),
    delete: (
      resourceGroupName: string,
      frontDoorName: string,
      rulesEngineName: string,
      options?: RulesEnginesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, frontDoorName, rulesEngineName, options),
    beginDelete: async (
      resourceGroupName: string,
      frontDoorName: string,
      rulesEngineName: string,
      options?: RulesEnginesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, frontDoorName, rulesEngineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      frontDoorName: string,
      rulesEngineName: string,
      options?: RulesEnginesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, frontDoorName, rulesEngineName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      frontDoorName: string,
      rulesEngineName: string,
      rulesEngineParameters: RulesEngine,
      options?: RulesEnginesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        frontDoorName,
        rulesEngineName,
        rulesEngineParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      frontDoorName: string,
      rulesEngineName: string,
      rulesEngineParameters: RulesEngine,
      options?: RulesEnginesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        frontDoorName,
        rulesEngineName,
        rulesEngineParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      frontDoorName: string,
      rulesEngineName: string,
      rulesEngineParameters: RulesEngine,
      options?: RulesEnginesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        frontDoorName,
        rulesEngineName,
        rulesEngineParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      frontDoorName: string,
      rulesEngineName: string,
      options?: RulesEnginesGetOptionalParams,
    ) => get(context, resourceGroupName, frontDoorName, rulesEngineName, options),
  };
}

export function _getRulesEnginesOperations(
  context: FrontDoorManagementContext,
): RulesEnginesOperations {
  return {
    ..._getRulesEngines(context),
  };
}
