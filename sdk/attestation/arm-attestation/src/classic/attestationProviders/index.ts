// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AttestationManagementContext } from "../../api/attestationManagementContext.js";
import {
  getDefaultByLocation,
  listDefault,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/attestationProviders/operations.js";
import type {
  AttestationProvidersGetDefaultByLocationOptionalParams,
  AttestationProvidersListDefaultOptionalParams,
  AttestationProvidersListOptionalParams,
  AttestationProvidersListByResourceGroupOptionalParams,
  AttestationProvidersDeleteOptionalParams,
  AttestationProvidersUpdateOptionalParams,
  AttestationProvidersCreateOptionalParams,
  AttestationProvidersGetOptionalParams,
} from "../../api/attestationProviders/options.js";
import type {
  AttestationProvider,
  AttestationServiceCreationParams,
  AttestationServicePatchParams,
  AttestationProviderListResult,
} from "../../models/models.js";

/** Interface representing a AttestationProviders operations. */
export interface AttestationProvidersOperations {
  /** Get the default provider by location. */
  getDefaultByLocation: (
    location: string,
    options?: AttestationProvidersGetDefaultByLocationOptionalParams,
  ) => Promise<AttestationProvider>;
  /** Get the default provider */
  listDefault: (
    options?: AttestationProvidersListDefaultOptionalParams,
  ) => Promise<AttestationProviderListResult>;
  /** Returns a list of attestation providers in a subscription. */
  list: (
    options?: AttestationProvidersListOptionalParams,
  ) => Promise<AttestationProviderListResult>;
  /** Returns attestation providers list in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AttestationProvidersListByResourceGroupOptionalParams,
  ) => Promise<AttestationProviderListResult>;
  /** Delete Attestation Service. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    providerName: string,
    options?: AttestationProvidersDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the Attestation Provider. */
  update: (
    resourceGroupName: string,
    providerName: string,
    updateParams: AttestationServicePatchParams,
    options?: AttestationProvidersUpdateOptionalParams,
  ) => Promise<AttestationProvider>;
  /** Creates or updates an Attestation Provider. */
  create: (
    resourceGroupName: string,
    providerName: string,
    creationParams: AttestationServiceCreationParams,
    options?: AttestationProvidersCreateOptionalParams,
  ) => Promise<AttestationProvider>;
  /** Get the status of Attestation Provider. */
  get: (
    resourceGroupName: string,
    providerName: string,
    options?: AttestationProvidersGetOptionalParams,
  ) => Promise<AttestationProvider>;
}

function _getAttestationProviders(context: AttestationManagementContext) {
  return {
    getDefaultByLocation: (
      location: string,
      options?: AttestationProvidersGetDefaultByLocationOptionalParams,
    ) => getDefaultByLocation(context, location, options),
    listDefault: (options?: AttestationProvidersListDefaultOptionalParams) =>
      listDefault(context, options),
    list: (options?: AttestationProvidersListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AttestationProvidersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      providerName: string,
      options?: AttestationProvidersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, providerName, options),
    update: (
      resourceGroupName: string,
      providerName: string,
      updateParams: AttestationServicePatchParams,
      options?: AttestationProvidersUpdateOptionalParams,
    ) => update(context, resourceGroupName, providerName, updateParams, options),
    create: (
      resourceGroupName: string,
      providerName: string,
      creationParams: AttestationServiceCreationParams,
      options?: AttestationProvidersCreateOptionalParams,
    ) => create(context, resourceGroupName, providerName, creationParams, options),
    get: (
      resourceGroupName: string,
      providerName: string,
      options?: AttestationProvidersGetOptionalParams,
    ) => get(context, resourceGroupName, providerName, options),
  };
}

export function _getAttestationProvidersOperations(
  context: AttestationManagementContext,
): AttestationProvidersOperations {
  return {
    ..._getAttestationProviders(context),
  };
}
