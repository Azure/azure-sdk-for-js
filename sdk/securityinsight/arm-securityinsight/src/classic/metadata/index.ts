// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, update, create, get } from "../../api/metadata/operations.js";
import type {
  MetadataListOptionalParams,
  MetadataDeleteOptionalParams,
  MetadataUpdateOptionalParams,
  MetadataCreateOptionalParams,
  MetadataGetOptionalParams,
} from "../../api/metadata/options.js";
import type { MetadataModel, MetadataPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Metadata operations. */
export interface MetadataOperations {
  /** List of all metadata */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: MetadataListOptionalParams,
  ) => PagedAsyncIterableIterator<MetadataModel>;
  /** Delete a Metadata. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    metadataName: string,
    options?: MetadataDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an existing Metadata. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    metadataName: string,
    metadataPatch: MetadataPatch,
    options?: MetadataUpdateOptionalParams,
  ) => Promise<MetadataModel>;
  /** Create a Metadata. */
  create: (
    resourceGroupName: string,
    workspaceName: string,
    metadataName: string,
    metadata: MetadataModel,
    options?: MetadataCreateOptionalParams,
  ) => Promise<MetadataModel>;
  /** Get a Metadata. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    metadataName: string,
    options?: MetadataGetOptionalParams,
  ) => Promise<MetadataModel>;
}

function _getMetadata(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: MetadataListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      metadataName: string,
      options?: MetadataDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, metadataName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      metadataName: string,
      metadataPatch: MetadataPatch,
      options?: MetadataUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, metadataName, metadataPatch, options),
    create: (
      resourceGroupName: string,
      workspaceName: string,
      metadataName: string,
      metadata: MetadataModel,
      options?: MetadataCreateOptionalParams,
    ) => create(context, resourceGroupName, workspaceName, metadataName, metadata, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      metadataName: string,
      options?: MetadataGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, metadataName, options),
  };
}

export function _getMetadataOperations(context: SecurityInsightsContext): MetadataOperations {
  return {
    ..._getMetadata(context),
  };
}
