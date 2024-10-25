// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesRuntimeContext } from "../../api/kubernetesRuntimeContext.js";
import {
  ServicesGetOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesListOptionalParams,
} from "../../api/options.js";
import {
  servicesGet,
  servicesCreateOrUpdate,
  servicesDelete,
  servicesList,
} from "../../api/services/index.js";
import { ServiceResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Services operations. */
export interface ServicesOperations {
  /** Get a ServiceResource */
  get: (
    resourceUri: string,
    serviceName: string,
    options?: ServicesGetOptionalParams,
  ) => Promise<ServiceResource>;
  /** Create a ServiceResource */
  createOrUpdate: (
    resourceUri: string,
    serviceName: string,
    resource: ServiceResource,
    options?: ServicesCreateOrUpdateOptionalParams,
  ) => Promise<ServiceResource>;
  /** Delete a ServiceResource */
  delete: (
    resourceUri: string,
    serviceName: string,
    options?: ServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** List ServiceResource resources by parent */
  list: (
    resourceUri: string,
    options?: ServicesListOptionalParams,
  ) => PagedAsyncIterableIterator<ServiceResource>;
}

export function getServices(context: KubernetesRuntimeContext) {
  return {
    get: (
      resourceUri: string,
      serviceName: string,
      options?: ServicesGetOptionalParams,
    ) => servicesGet(context, resourceUri, serviceName, options),
    createOrUpdate: (
      resourceUri: string,
      serviceName: string,
      resource: ServiceResource,
      options?: ServicesCreateOrUpdateOptionalParams,
    ) =>
      servicesCreateOrUpdate(
        context,
        resourceUri,
        serviceName,
        resource,
        options,
      ),
    delete: (
      resourceUri: string,
      serviceName: string,
      options?: ServicesDeleteOptionalParams,
    ) => servicesDelete(context, resourceUri, serviceName, options),
    list: (resourceUri: string, options?: ServicesListOptionalParams) =>
      servicesList(context, resourceUri, options),
  };
}

export function getServicesOperations(
  context: KubernetesRuntimeContext,
): ServicesOperations {
  return {
    ...getServices(context),
  };
}
