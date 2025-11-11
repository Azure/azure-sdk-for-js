// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceLinkerManagementContext } from "../../api/serviceLinkerManagementContext.js";
import {
  listConfigurations,
  validate,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/linker/operations.js";
import type {
  LinkerListConfigurationsOptionalParams,
  LinkerValidateOptionalParams,
  LinkerListOptionalParams,
  LinkerDeleteOptionalParams,
  LinkerUpdateOptionalParams,
  LinkerCreateOrUpdateOptionalParams,
  LinkerGetOptionalParams,
} from "../../api/linker/options.js";
import type {
  ConfigurationResult,
  LinkerResource,
  LinkerPatch,
  ValidateOperationResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Linker operations. */
export interface LinkerOperations {
  /** list source configurations for a Linker. */
  listConfigurations: (
    resourceUri: string,
    linkerName: string,
    options?: LinkerListConfigurationsOptionalParams,
  ) => Promise<ConfigurationResult>;
  /** Validate a Linker. */
  validate: (
    resourceUri: string,
    linkerName: string,
    options?: LinkerValidateOptionalParams,
  ) => PollerLike<OperationState<ValidateOperationResult>, ValidateOperationResult>;
  /** Returns list of Linkers which connects to the resource. which supports to config both application and target service during the resource provision. */
  list: (
    resourceUri: string,
    options?: LinkerListOptionalParams,
  ) => PagedAsyncIterableIterator<LinkerResource>;
  /** Delete a Linker. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceUri: string,
    linkerName: string,
    options?: LinkerDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Operation to update an existing Linker. */
  update: (
    resourceUri: string,
    linkerName: string,
    parameters: LinkerPatch,
    options?: LinkerUpdateOptionalParams,
  ) => PollerLike<OperationState<LinkerResource>, LinkerResource>;
  /** Create or update Linker resource. */
  createOrUpdate: (
    resourceUri: string,
    linkerName: string,
    parameters: LinkerResource,
    options?: LinkerCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LinkerResource>, LinkerResource>;
  /** Returns Linker resource for a given name. */
  get: (
    resourceUri: string,
    linkerName: string,
    options?: LinkerGetOptionalParams,
  ) => Promise<LinkerResource>;
}

function _getLinker(context: ServiceLinkerManagementContext) {
  return {
    listConfigurations: (
      resourceUri: string,
      linkerName: string,
      options?: LinkerListConfigurationsOptionalParams,
    ) => listConfigurations(context, resourceUri, linkerName, options),
    validate: (resourceUri: string, linkerName: string, options?: LinkerValidateOptionalParams) =>
      validate(context, resourceUri, linkerName, options),
    list: (resourceUri: string, options?: LinkerListOptionalParams) =>
      list(context, resourceUri, options),
    delete: (resourceUri: string, linkerName: string, options?: LinkerDeleteOptionalParams) =>
      $delete(context, resourceUri, linkerName, options),
    update: (
      resourceUri: string,
      linkerName: string,
      parameters: LinkerPatch,
      options?: LinkerUpdateOptionalParams,
    ) => update(context, resourceUri, linkerName, parameters, options),
    createOrUpdate: (
      resourceUri: string,
      linkerName: string,
      parameters: LinkerResource,
      options?: LinkerCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, linkerName, parameters, options),
    get: (resourceUri: string, linkerName: string, options?: LinkerGetOptionalParams) =>
      get(context, resourceUri, linkerName, options),
  };
}

export function _getLinkerOperations(context: ServiceLinkerManagementContext): LinkerOperations {
  return {
    ..._getLinker(context),
  };
}
