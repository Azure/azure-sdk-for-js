// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceLinkerManagementContext } from "../../api/serviceLinkerManagementContext.js";
import {
  generateConfigurations,
  validate,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
  listDryrun,
  deleteDryrun,
  updateDryrun,
  createDryrun,
  getDryrun,
} from "../../api/connector/operations.js";
import type {
  ConnectorGenerateConfigurationsOptionalParams,
  ConnectorValidateOptionalParams,
  ConnectorListOptionalParams,
  ConnectorDeleteOptionalParams,
  ConnectorUpdateOptionalParams,
  ConnectorCreateOrUpdateOptionalParams,
  ConnectorGetOptionalParams,
  ConnectorListDryrunOptionalParams,
  ConnectorDeleteDryrunOptionalParams,
  ConnectorUpdateDryrunOptionalParams,
  ConnectorCreateDryrunOptionalParams,
  ConnectorGetDryrunOptionalParams,
} from "../../api/connector/options.js";
import type {
  DryrunResource,
  DryrunPatch,
  ConfigurationResult,
  LinkerResource,
  LinkerPatch,
  ValidateOperationResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Connector operations. */
export interface ConnectorOperations {
  /** Generate configurations for a Connector. */
  generateConfigurations: (
    resourceGroupName: string,
    location: string,
    connectorName: string,
    options?: ConnectorGenerateConfigurationsOptionalParams,
  ) => Promise<ConfigurationResult>;
  /** Validate a Connector. */
  validate: (
    resourceGroupName: string,
    location: string,
    connectorName: string,
    options?: ConnectorValidateOptionalParams,
  ) => PollerLike<OperationState<ValidateOperationResult>, ValidateOperationResult>;
  /** Returns list of connector which connects to the resource, which supports to config the target service during the resource provision. */
  list: (
    resourceGroupName: string,
    location: string,
    options?: ConnectorListOptionalParams,
  ) => PagedAsyncIterableIterator<LinkerResource>;
  /** Delete a Connector. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    location: string,
    connectorName: string,
    options?: ConnectorDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Operation to update an existing Connector. */
  update: (
    resourceGroupName: string,
    location: string,
    connectorName: string,
    parameters: LinkerPatch,
    options?: ConnectorUpdateOptionalParams,
  ) => PollerLike<OperationState<LinkerResource>, LinkerResource>;
  /** Create or update Connector resource. */
  createOrUpdate: (
    resourceGroupName: string,
    location: string,
    connectorName: string,
    parameters: LinkerResource,
    options?: ConnectorCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LinkerResource>, LinkerResource>;
  /** Returns Connector resource for a given name. */
  get: (
    resourceGroupName: string,
    location: string,
    connectorName: string,
    options?: ConnectorGetOptionalParams,
  ) => Promise<LinkerResource>;
  /** list dryrun jobs */
  listDryrun: (
    resourceGroupName: string,
    location: string,
    options?: ConnectorListDryrunOptionalParams,
  ) => PagedAsyncIterableIterator<DryrunResource>;
  /** delete a dryrun job */
  deleteDryrun: (
    resourceGroupName: string,
    location: string,
    dryrunName: string,
    options?: ConnectorDeleteDryrunOptionalParams,
  ) => Promise<void>;
  /** update a dryrun job to do necessary check before actual creation */
  updateDryrun: (
    resourceGroupName: string,
    location: string,
    dryrunName: string,
    parameters: DryrunPatch,
    options?: ConnectorUpdateDryrunOptionalParams,
  ) => PollerLike<OperationState<DryrunResource>, DryrunResource>;
  /** create a dryrun job to do necessary check before actual creation */
  createDryrun: (
    resourceGroupName: string,
    location: string,
    dryrunName: string,
    parameters: DryrunResource,
    options?: ConnectorCreateDryrunOptionalParams,
  ) => PollerLike<OperationState<DryrunResource>, DryrunResource>;
  /** get a dryrun job */
  getDryrun: (
    resourceGroupName: string,
    location: string,
    dryrunName: string,
    options?: ConnectorGetDryrunOptionalParams,
  ) => Promise<DryrunResource>;
}

function _getConnector(context: ServiceLinkerManagementContext) {
  return {
    generateConfigurations: (
      resourceGroupName: string,
      location: string,
      connectorName: string,
      options?: ConnectorGenerateConfigurationsOptionalParams,
    ) => generateConfigurations(context, resourceGroupName, location, connectorName, options),
    validate: (
      resourceGroupName: string,
      location: string,
      connectorName: string,
      options?: ConnectorValidateOptionalParams,
    ) => validate(context, resourceGroupName, location, connectorName, options),
    list: (resourceGroupName: string, location: string, options?: ConnectorListOptionalParams) =>
      list(context, resourceGroupName, location, options),
    delete: (
      resourceGroupName: string,
      location: string,
      connectorName: string,
      options?: ConnectorDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, location, connectorName, options),
    update: (
      resourceGroupName: string,
      location: string,
      connectorName: string,
      parameters: LinkerPatch,
      options?: ConnectorUpdateOptionalParams,
    ) => update(context, resourceGroupName, location, connectorName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      location: string,
      connectorName: string,
      parameters: LinkerResource,
      options?: ConnectorCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, location, connectorName, parameters, options),
    get: (
      resourceGroupName: string,
      location: string,
      connectorName: string,
      options?: ConnectorGetOptionalParams,
    ) => get(context, resourceGroupName, location, connectorName, options),
    listDryrun: (
      resourceGroupName: string,
      location: string,
      options?: ConnectorListDryrunOptionalParams,
    ) => listDryrun(context, resourceGroupName, location, options),
    deleteDryrun: (
      resourceGroupName: string,
      location: string,
      dryrunName: string,
      options?: ConnectorDeleteDryrunOptionalParams,
    ) => deleteDryrun(context, resourceGroupName, location, dryrunName, options),
    updateDryrun: (
      resourceGroupName: string,
      location: string,
      dryrunName: string,
      parameters: DryrunPatch,
      options?: ConnectorUpdateDryrunOptionalParams,
    ) => updateDryrun(context, resourceGroupName, location, dryrunName, parameters, options),
    createDryrun: (
      resourceGroupName: string,
      location: string,
      dryrunName: string,
      parameters: DryrunResource,
      options?: ConnectorCreateDryrunOptionalParams,
    ) => createDryrun(context, resourceGroupName, location, dryrunName, parameters, options),
    getDryrun: (
      resourceGroupName: string,
      location: string,
      dryrunName: string,
      options?: ConnectorGetDryrunOptionalParams,
    ) => getDryrun(context, resourceGroupName, location, dryrunName, options),
  };
}

export function _getConnectorOperations(
  context: ServiceLinkerManagementContext,
): ConnectorOperations {
  return {
    ..._getConnector(context),
  };
}
