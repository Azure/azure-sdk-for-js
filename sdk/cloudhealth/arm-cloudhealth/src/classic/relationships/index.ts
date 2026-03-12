// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthContext } from "../../api/cloudHealthContext.js";
import { Relationship } from "../../models/models.js";
import {
  RelationshipsListByHealthModelOptionalParams,
  RelationshipsDeleteOptionalParams,
  RelationshipsCreateOrUpdateOptionalParams,
  RelationshipsGetOptionalParams,
} from "../../api/relationships/options.js";
import {
  listByHealthModel,
  $delete,
  createOrUpdate,
  get,
} from "../../api/relationships/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Relationships operations. */
export interface RelationshipsOperations {
  /** List Relationship resources by HealthModel */
  listByHealthModel: (
    resourceGroupName: string,
    healthModelName: string,
    options?: RelationshipsListByHealthModelOptionalParams,
  ) => PagedAsyncIterableIterator<Relationship>;
  /** Delete a Relationship */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    healthModelName: string,
    relationshipName: string,
    options?: RelationshipsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a Relationship */
  createOrUpdate: (
    resourceGroupName: string,
    healthModelName: string,
    relationshipName: string,
    resource: Relationship,
    options?: RelationshipsCreateOrUpdateOptionalParams,
  ) => Promise<Relationship>;
  /** Get a Relationship */
  get: (
    resourceGroupName: string,
    healthModelName: string,
    relationshipName: string,
    options?: RelationshipsGetOptionalParams,
  ) => Promise<Relationship>;
}

function _getRelationships(context: CloudHealthContext) {
  return {
    listByHealthModel: (
      resourceGroupName: string,
      healthModelName: string,
      options?: RelationshipsListByHealthModelOptionalParams,
    ) => listByHealthModel(context, resourceGroupName, healthModelName, options),
    delete: (
      resourceGroupName: string,
      healthModelName: string,
      relationshipName: string,
      options?: RelationshipsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, healthModelName, relationshipName, options),
    createOrUpdate: (
      resourceGroupName: string,
      healthModelName: string,
      relationshipName: string,
      resource: Relationship,
      options?: RelationshipsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        healthModelName,
        relationshipName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      healthModelName: string,
      relationshipName: string,
      options?: RelationshipsGetOptionalParams,
    ) => get(context, resourceGroupName, healthModelName, relationshipName, options),
  };
}

export function _getRelationshipsOperations(context: CloudHealthContext): RelationshipsOperations {
  return {
    ..._getRelationships(context),
  };
}
