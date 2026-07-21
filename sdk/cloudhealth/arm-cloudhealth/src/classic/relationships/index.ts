// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CloudHealthContext } from "../../api/cloudHealthContext.js";
import {
  listByHealthModel,
  $delete,
  createOrUpdate,
  get,
} from "../../api/relationships/operations.js";
import type {
  RelationshipsListByHealthModelOptionalParams,
  RelationshipsDeleteOptionalParams,
  RelationshipsCreateOrUpdateOptionalParams,
  RelationshipsGetOptionalParams,
} from "../../api/relationships/options.js";
import type { Relationship } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Relationships operations. */
export interface RelationshipsOperations {
  /** List Relationship resources by HealthModel */
  listByHealthModel: (
    resourceGroupName: string,
    healthModelName: string,
    options?: RelationshipsListByHealthModelOptionalParams,
  ) => PagedAsyncIterableIterator<Relationship>;
  /** Delete a Relationship */
  delete: (
    resourceGroupName: string,
    healthModelName: string,
    relationshipName: string,
    options?: RelationshipsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a Relationship */
  createOrUpdate: (
    resourceGroupName: string,
    healthModelName: string,
    relationshipName: string,
    resource: Relationship,
    options?: RelationshipsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Relationship>, Relationship>;
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
