// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { Capability } from "../../models/models.js";
import {
  CapabilitiesListOptionalParams,
  CapabilitiesDeleteOptionalParams,
  CapabilitiesCreateOrUpdateOptionalParams,
  CapabilitiesGetOptionalParams,
} from "../../api/capabilities/options.js";
import { list, $delete, createOrUpdate, get } from "../../api/capabilities/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Capabilities operations. */
export interface CapabilitiesOperations {
  /** Get a list of Capability resources that extend a Target resource. */
  list: (
    resourceGroupName: string,
    parentProviderNamespace: string,
    parentResourceType: string,
    parentResourceName: string,
    targetName: string,
    options?: CapabilitiesListOptionalParams,
  ) => PagedAsyncIterableIterator<Capability>;
  /** Delete a Capability that extends a Target resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    parentProviderNamespace: string,
    parentResourceType: string,
    parentResourceName: string,
    targetName: string,
    capabilityName: string,
    options?: CapabilitiesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a Capability resource that extends a Target resource. */
  createOrUpdate: (
    resourceGroupName: string,
    parentProviderNamespace: string,
    parentResourceType: string,
    parentResourceName: string,
    targetName: string,
    capabilityName: string,
    resource: Capability,
    options?: CapabilitiesCreateOrUpdateOptionalParams,
  ) => Promise<Capability>;
  /** Get a Capability resource that extends a Target resource. */
  get: (
    resourceGroupName: string,
    parentProviderNamespace: string,
    parentResourceType: string,
    parentResourceName: string,
    targetName: string,
    capabilityName: string,
    options?: CapabilitiesGetOptionalParams,
  ) => Promise<Capability>;
}

function _getCapabilities(context: ChaosManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      parentProviderNamespace: string,
      parentResourceType: string,
      parentResourceName: string,
      targetName: string,
      options?: CapabilitiesListOptionalParams,
    ) =>
      list(
        context,
        resourceGroupName,
        parentProviderNamespace,
        parentResourceType,
        parentResourceName,
        targetName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      parentProviderNamespace: string,
      parentResourceType: string,
      parentResourceName: string,
      targetName: string,
      capabilityName: string,
      options?: CapabilitiesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        parentProviderNamespace,
        parentResourceType,
        parentResourceName,
        targetName,
        capabilityName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      parentProviderNamespace: string,
      parentResourceType: string,
      parentResourceName: string,
      targetName: string,
      capabilityName: string,
      resource: Capability,
      options?: CapabilitiesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        parentProviderNamespace,
        parentResourceType,
        parentResourceName,
        targetName,
        capabilityName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      parentProviderNamespace: string,
      parentResourceType: string,
      parentResourceName: string,
      targetName: string,
      capabilityName: string,
      options?: CapabilitiesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        parentProviderNamespace,
        parentResourceType,
        parentResourceName,
        targetName,
        capabilityName,
        options,
      ),
  };
}

export function _getCapabilitiesOperations(
  context: ChaosManagementContext,
): CapabilitiesOperations {
  return {
    ..._getCapabilities(context),
  };
}
