// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByInstance, get } from "../../api/endpointCertificates/operations.js";
import {
  EndpointCertificatesListByInstanceOptionalParams,
  EndpointCertificatesGetOptionalParams,
} from "../../api/endpointCertificates/options.js";
import { EndpointCertificate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EndpointCertificates operations. */
export interface EndpointCertificatesOperations {
  /** List certificates used on endpoints on the target instance. */
  listByInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: EndpointCertificatesListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<EndpointCertificate>;
  /** Gets a certificate used on the endpoint with the given id. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    endpointType: string,
    options?: EndpointCertificatesGetOptionalParams,
  ) => Promise<EndpointCertificate>;
}

function _getEndpointCertificates(context: SqlManagementContext) {
  return {
    listByInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: EndpointCertificatesListByInstanceOptionalParams,
    ) => listByInstance(context, resourceGroupName, managedInstanceName, options),
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      endpointType: string,
      options?: EndpointCertificatesGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, endpointType, options),
  };
}

export function _getEndpointCertificatesOperations(
  context: SqlManagementContext,
): EndpointCertificatesOperations {
  return {
    ..._getEndpointCertificates(context),
  };
}
