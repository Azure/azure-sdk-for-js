// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceLinkerManagementContext } from "../../api/serviceLinkerManagementContext.js";
import {
  listDaprConfigurations,
  generateConfigurations,
  listDryrun,
  deleteDryrun,
  updateDryrun,
  createDryrun,
  getDryrun,
} from "../../api/linkers/operations.js";
import type {
  LinkersListDaprConfigurationsOptionalParams,
  LinkersGenerateConfigurationsOptionalParams,
  LinkersListDryrunOptionalParams,
  LinkersDeleteDryrunOptionalParams,
  LinkersUpdateDryrunOptionalParams,
  LinkersCreateDryrunOptionalParams,
  LinkersGetDryrunOptionalParams,
} from "../../api/linkers/options.js";
import type {
  DryrunResource,
  DryrunPatch,
  ConfigurationResult,
  DaprConfigurationResource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Linkers operations. */
export interface LinkersOperations {
  /** List the dapr configuration supported by Service Connector. */
  listDaprConfigurations: (
    resourceUri: string,
    options?: LinkersListDaprConfigurationsOptionalParams,
  ) => PagedAsyncIterableIterator<DaprConfigurationResource>;
  /** Generate configurations for a Linker. */
  generateConfigurations: (
    resourceUri: string,
    linkerName: string,
    options?: LinkersGenerateConfigurationsOptionalParams,
  ) => Promise<ConfigurationResult>;
  /** list dryrun jobs */
  listDryrun: (
    resourceUri: string,
    options?: LinkersListDryrunOptionalParams,
  ) => PagedAsyncIterableIterator<DryrunResource>;
  /** delete a dryrun job */
  deleteDryrun: (
    resourceUri: string,
    dryrunName: string,
    options?: LinkersDeleteDryrunOptionalParams,
  ) => Promise<void>;
  /** add a dryrun job to do necessary check before actual creation */
  updateDryrun: (
    resourceUri: string,
    dryrunName: string,
    parameters: DryrunPatch,
    options?: LinkersUpdateDryrunOptionalParams,
  ) => PollerLike<OperationState<DryrunResource>, DryrunResource>;
  /** create a dryrun job to do necessary check before actual creation */
  createDryrun: (
    resourceUri: string,
    dryrunName: string,
    parameters: DryrunResource,
    options?: LinkersCreateDryrunOptionalParams,
  ) => PollerLike<OperationState<DryrunResource>, DryrunResource>;
  /** get a dryrun job */
  getDryrun: (
    resourceUri: string,
    dryrunName: string,
    options?: LinkersGetDryrunOptionalParams,
  ) => Promise<DryrunResource>;
}

function _getLinkers(context: ServiceLinkerManagementContext) {
  return {
    listDaprConfigurations: (
      resourceUri: string,
      options?: LinkersListDaprConfigurationsOptionalParams,
    ) => listDaprConfigurations(context, resourceUri, options),
    generateConfigurations: (
      resourceUri: string,
      linkerName: string,
      options?: LinkersGenerateConfigurationsOptionalParams,
    ) => generateConfigurations(context, resourceUri, linkerName, options),
    listDryrun: (resourceUri: string, options?: LinkersListDryrunOptionalParams) =>
      listDryrun(context, resourceUri, options),
    deleteDryrun: (
      resourceUri: string,
      dryrunName: string,
      options?: LinkersDeleteDryrunOptionalParams,
    ) => deleteDryrun(context, resourceUri, dryrunName, options),
    updateDryrun: (
      resourceUri: string,
      dryrunName: string,
      parameters: DryrunPatch,
      options?: LinkersUpdateDryrunOptionalParams,
    ) => updateDryrun(context, resourceUri, dryrunName, parameters, options),
    createDryrun: (
      resourceUri: string,
      dryrunName: string,
      parameters: DryrunResource,
      options?: LinkersCreateDryrunOptionalParams,
    ) => createDryrun(context, resourceUri, dryrunName, parameters, options),
    getDryrun: (
      resourceUri: string,
      dryrunName: string,
      options?: LinkersGetDryrunOptionalParams,
    ) => getDryrun(context, resourceUri, dryrunName, options),
  };
}

export function _getLinkersOperations(context: ServiceLinkerManagementContext): LinkersOperations {
  return {
    ..._getLinkers(context),
  };
}
