// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthContext } from "../../api/cloudHealthContext.js";
import { Entity } from "../../models/models.js";
import {
  EntitiesListByHealthModelOptionalParams,
  EntitiesDeleteOptionalParams,
  EntitiesCreateOrUpdateOptionalParams,
  EntitiesGetOptionalParams,
} from "../../api/entities/options.js";
import { listByHealthModel, $delete, createOrUpdate, get } from "../../api/entities/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Entities operations. */
export interface EntitiesOperations {
  /** List Entity resources by HealthModel */
  listByHealthModel: (
    resourceGroupName: string,
    healthModelName: string,
    options?: EntitiesListByHealthModelOptionalParams,
  ) => PagedAsyncIterableIterator<Entity>;
  /** Delete a Entity */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    healthModelName: string,
    entityName: string,
    options?: EntitiesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a Entity */
  createOrUpdate: (
    resourceGroupName: string,
    healthModelName: string,
    entityName: string,
    resource: Entity,
    options?: EntitiesCreateOrUpdateOptionalParams,
  ) => Promise<Entity>;
  /** Get a Entity */
  get: (
    resourceGroupName: string,
    healthModelName: string,
    entityName: string,
    options?: EntitiesGetOptionalParams,
  ) => Promise<Entity>;
}

function _getEntities(context: CloudHealthContext) {
  return {
    listByHealthModel: (
      resourceGroupName: string,
      healthModelName: string,
      options?: EntitiesListByHealthModelOptionalParams,
    ) => listByHealthModel(context, resourceGroupName, healthModelName, options),
    delete: (
      resourceGroupName: string,
      healthModelName: string,
      entityName: string,
      options?: EntitiesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, healthModelName, entityName, options),
    createOrUpdate: (
      resourceGroupName: string,
      healthModelName: string,
      entityName: string,
      resource: Entity,
      options?: EntitiesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, healthModelName, entityName, resource, options),
    get: (
      resourceGroupName: string,
      healthModelName: string,
      entityName: string,
      options?: EntitiesGetOptionalParams,
    ) => get(context, resourceGroupName, healthModelName, entityName, options),
  };
}

export function _getEntitiesOperations(context: CloudHealthContext): EntitiesOperations {
  return {
    ..._getEntities(context),
  };
}
