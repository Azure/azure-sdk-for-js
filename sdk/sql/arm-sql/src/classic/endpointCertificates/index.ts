// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { listByInstance, get } from "../../api/endpointCertificates/operations.js";
import type {
  EndpointCertificatesListByInstanceOptionalParams,
  EndpointCertificatesGetOptionalParams,
} from "../../api/endpointCertificates/options.js";
import type { EndpointCertificate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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

function _getEndpointCertificates(context: SqlContext) {
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
  context: SqlContext,
): EndpointCertificatesOperations {
  return {
    ..._getEndpointCertificates(context),
  };
}
