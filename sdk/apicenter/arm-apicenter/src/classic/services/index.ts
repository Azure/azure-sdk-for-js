// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiCenterContext } from "../../api/apiCenterContext.js";
import {
  exportMetadataSchema,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/services/operations.js";
import type {
  ServicesExportMetadataSchemaOptionalParams,
  ServicesListBySubscriptionOptionalParams,
  ServicesListByResourceGroupOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
} from "../../api/services/options.js";
import type {
  Service,
  ServiceUpdate,
  MetadataSchemaExportRequest,
  MetadataSchemaExportResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Services operations. */
export interface ServicesOperations {
  /** Exports the effective metadata schema. */
  exportMetadataSchema: (
    resourceGroupName: string,
    serviceName: string,
    payload: MetadataSchemaExportRequest,
    options?: ServicesExportMetadataSchemaOptionalParams,
  ) => PollerLike<OperationState<MetadataSchemaExportResult>, MetadataSchemaExportResult>;
  /** @deprecated use exportMetadataSchema instead */
  beginExportMetadataSchema: (
    resourceGroupName: string,
    serviceName: string,
    payload: MetadataSchemaExportRequest,
    options?: ServicesExportMetadataSchemaOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MetadataSchemaExportResult>, MetadataSchemaExportResult>
  >;
  /** @deprecated use exportMetadataSchema instead */
  beginExportMetadataSchemaAndWait: (
    resourceGroupName: string,
    serviceName: string,
    payload: MetadataSchemaExportRequest,
    options?: ServicesExportMetadataSchemaOptionalParams,
  ) => Promise<MetadataSchemaExportResult>;
  /** Lists services within an Azure subscription. */
  listBySubscription: (
    options?: ServicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Service>;
  /** Returns a collection of services within the resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ServicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Service>;
  /** Deletes specified service. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    options?: ServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates existing service. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    payload: ServiceUpdate,
    options?: ServicesUpdateOptionalParams,
  ) => Promise<Service>;
  /** Creates new or updates existing API. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    resource: Service,
    options?: ServicesCreateOrUpdateOptionalParams,
  ) => Promise<Service>;
  /** Returns details of the service. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    options?: ServicesGetOptionalParams,
  ) => Promise<Service>;
}

function _getServices(context: ApiCenterContext) {
  return {
    exportMetadataSchema: (
      resourceGroupName: string,
      serviceName: string,
      payload: MetadataSchemaExportRequest,
      options?: ServicesExportMetadataSchemaOptionalParams,
    ) => exportMetadataSchema(context, resourceGroupName, serviceName, payload, options),
    beginExportMetadataSchema: async (
      resourceGroupName: string,
      serviceName: string,
      payload: MetadataSchemaExportRequest,
      options?: ServicesExportMetadataSchemaOptionalParams,
    ) => {
      const poller = exportMetadataSchema(
        context,
        resourceGroupName,
        serviceName,
        payload,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginExportMetadataSchemaAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      payload: MetadataSchemaExportRequest,
      options?: ServicesExportMetadataSchemaOptionalParams,
    ) => {
      return await exportMetadataSchema(context, resourceGroupName, serviceName, payload, options);
    },
    listBySubscription: (options?: ServicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ServicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      options?: ServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      payload: ServiceUpdate,
      options?: ServicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, payload, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      resource: Service,
      options?: ServicesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, resource, options),
    get: (resourceGroupName: string, serviceName: string, options?: ServicesGetOptionalParams) =>
      get(context, resourceGroupName, serviceName, options),
  };
}

export function _getServicesOperations(context: ApiCenterContext): ServicesOperations {
  return {
    ..._getServices(context),
  };
}
