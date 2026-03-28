// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/gatewayCertificateAuthority/operations.js";
import type {
  GatewayCertificateAuthorityListByServiceOptionalParams,
  GatewayCertificateAuthorityDeleteOptionalParams,
  GatewayCertificateAuthorityCreateOrUpdateOptionalParams,
  GatewayCertificateAuthorityGetEntityTagOptionalParams,
  GatewayCertificateAuthorityGetOptionalParams,
} from "../../api/gatewayCertificateAuthority/options.js";
import type { GatewayCertificateAuthorityContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GatewayCertificateAuthority operations. */
export interface GatewayCertificateAuthorityOperations {
  /** Lists the collection of Certificate Authorities for the specified Gateway entity. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    options?: GatewayCertificateAuthorityListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<GatewayCertificateAuthorityContract>;
  /** Remove relationship between Certificate Authority and Gateway entity. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    certificateId: string,
    ifMatch: string,
    options?: GatewayCertificateAuthorityDeleteOptionalParams,
  ) => Promise<void>;
  /** Assign Certificate entity to Gateway entity as Certificate Authority. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    certificateId: string,
    parameters: GatewayCertificateAuthorityContract,
    options?: GatewayCertificateAuthorityCreateOrUpdateOptionalParams,
  ) => Promise<GatewayCertificateAuthorityContract>;
  /** Checks if Certificate entity is assigned to Gateway entity as Certificate Authority. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    certificateId: string,
    options?: GatewayCertificateAuthorityGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get assigned Gateway Certificate Authority details. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    certificateId: string,
    options?: GatewayCertificateAuthorityGetOptionalParams,
  ) => Promise<GatewayCertificateAuthorityContract>;
}

function _getGatewayCertificateAuthority(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      options?: GatewayCertificateAuthorityListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, gatewayId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      certificateId: string,
      ifMatch: string,
      options?: GatewayCertificateAuthorityDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, serviceName, gatewayId, certificateId, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      certificateId: string,
      parameters: GatewayCertificateAuthorityContract,
      options?: GatewayCertificateAuthorityCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        gatewayId,
        certificateId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      certificateId: string,
      options?: GatewayCertificateAuthorityGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, gatewayId, certificateId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      certificateId: string,
      options?: GatewayCertificateAuthorityGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, gatewayId, certificateId, options),
  };
}

export function _getGatewayCertificateAuthorityOperations(
  context: ApiManagementContext,
): GatewayCertificateAuthorityOperations {
  return {
    ..._getGatewayCertificateAuthority(context),
  };
}
