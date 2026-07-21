// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataMigrationManagementContext } from "../../api/dataMigrationManagementContext.js";
import {
  checkNameAvailability,
  checkChildrenNameAvailability,
  listSkus,
  stop,
  start,
  checkStatus,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/services/operations.js";
import type {
  ServicesCheckNameAvailabilityOptionalParams,
  ServicesCheckChildrenNameAvailabilityOptionalParams,
  ServicesListSkusOptionalParams,
  ServicesStopOptionalParams,
  ServicesStartOptionalParams,
  ServicesCheckStatusOptionalParams,
  ServicesListOptionalParams,
  ServicesListByResourceGroupOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
} from "../../api/services/options.js";
import type {
  DataMigrationService,
  DataMigrationServiceStatusResponse,
  AvailableServiceSku,
  NameAvailabilityRequest,
  NameAvailabilityResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Services operations. */
export interface ServicesOperations {
  /** This method checks whether a proposed top-level resource name is valid and available. */
  checkNameAvailability: (
    location: string,
    parameters: NameAvailabilityRequest,
    options?: ServicesCheckNameAvailabilityOptionalParams,
  ) => Promise<NameAvailabilityResponse>;
  /** This method checks whether a proposed nested resource name is valid and available. */
  checkChildrenNameAvailability: (
    groupName: string,
    serviceName: string,
    parameters: NameAvailabilityRequest,
    options?: ServicesCheckChildrenNameAvailabilityOptionalParams,
  ) => Promise<NameAvailabilityResponse>;
  /** The services resource is the top-level resource that represents the Database Migration Service (classic). The skus action returns the list of SKUs that a service resource can be updated to. */
  listSkus: (
    groupName: string,
    serviceName: string,
    options?: ServicesListSkusOptionalParams,
  ) => PagedAsyncIterableIterator<AvailableServiceSku>;
  /** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This action stops the service and the service cannot be used for data migration. The service owner won't be billed when the service is stopped. */
  stop: (
    groupName: string,
    serviceName: string,
    options?: ServicesStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use stop instead */
  beginStop: (
    groupName: string,
    serviceName: string,
    options?: ServicesStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    groupName: string,
    serviceName: string,
    options?: ServicesStopOptionalParams,
  ) => Promise<void>;
  /** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This action starts the service and the service can be used for data migration. */
  start: (
    groupName: string,
    serviceName: string,
    options?: ServicesStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    groupName: string,
    serviceName: string,
    options?: ServicesStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    groupName: string,
    serviceName: string,
    options?: ServicesStartOptionalParams,
  ) => Promise<void>;
  /** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This action performs a health check and returns the status of the service and virtual machine size. */
  checkStatus: (
    groupName: string,
    serviceName: string,
    options?: ServicesCheckStatusOptionalParams,
  ) => Promise<DataMigrationServiceStatusResponse>;
  /** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of service resources in a subscription. */
  list: (options?: ServicesListOptionalParams) => PagedAsyncIterableIterator<DataMigrationService>;
  /** The Services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of service resources in a resource group. */
  listByResourceGroup: (
    groupName: string,
    options?: ServicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DataMigrationService>;
  /** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). The DELETE method deletes a service. Any running tasks will be canceled. */
  delete: (
    groupName: string,
    serviceName: string,
    options?: ServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    groupName: string,
    serviceName: string,
    options?: ServicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    groupName: string,
    serviceName: string,
    options?: ServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). The PATCH method updates an existing service. This method can change the kind, SKU, and network of the service, but if tasks are currently running (i.e. the service is busy), this will fail with 400 Bad Request ("ServiceIsBusy"). */
  update: (
    groupName: string,
    serviceName: string,
    parameters: DataMigrationService,
    options?: ServicesUpdateOptionalParams,
  ) => PollerLike<OperationState<DataMigrationService>, DataMigrationService>;
  /** @deprecated use update instead */
  beginUpdate: (
    groupName: string,
    serviceName: string,
    parameters: DataMigrationService,
    options?: ServicesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DataMigrationService>, DataMigrationService>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    groupName: string,
    serviceName: string,
    parameters: DataMigrationService,
    options?: ServicesUpdateOptionalParams,
  ) => Promise<DataMigrationService>;
  /** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). The PUT method creates a new service or updates an existing one. When a service is updated, existing child resources (i.e. tasks) are unaffected. Services currently support a single kind, "vm", which refers to a VM-based service, although other kinds may be added in the future. This method can change the kind, SKU, and network of the service, but if tasks are currently running (i.e. the service is busy), this will fail with 400 Bad Request ("ServiceIsBusy"). The provider will reply when successful with 200 OK or 201 Created. Long-running operations use the provisioningState property. */
  createOrUpdate: (
    groupName: string,
    serviceName: string,
    parameters: DataMigrationService,
    options?: ServicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DataMigrationService>, DataMigrationService>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    groupName: string,
    serviceName: string,
    parameters: DataMigrationService,
    options?: ServicesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DataMigrationService>, DataMigrationService>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    groupName: string,
    serviceName: string,
    parameters: DataMigrationService,
    options?: ServicesCreateOrUpdateOptionalParams,
  ) => Promise<DataMigrationService>;
  /** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). The GET method retrieves information about a service instance. */
  get: (
    groupName: string,
    serviceName: string,
    options?: ServicesGetOptionalParams,
  ) => Promise<DataMigrationService>;
}

function _getServices(context: DataMigrationManagementContext) {
  return {
    checkNameAvailability: (
      location: string,
      parameters: NameAvailabilityRequest,
      options?: ServicesCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, location, parameters, options),
    checkChildrenNameAvailability: (
      groupName: string,
      serviceName: string,
      parameters: NameAvailabilityRequest,
      options?: ServicesCheckChildrenNameAvailabilityOptionalParams,
    ) => checkChildrenNameAvailability(context, groupName, serviceName, parameters, options),
    listSkus: (groupName: string, serviceName: string, options?: ServicesListSkusOptionalParams) =>
      listSkus(context, groupName, serviceName, options),
    stop: (groupName: string, serviceName: string, options?: ServicesStopOptionalParams) =>
      stop(context, groupName, serviceName, options),
    beginStop: async (
      groupName: string,
      serviceName: string,
      options?: ServicesStopOptionalParams,
    ) => {
      const poller = stop(context, groupName, serviceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      groupName: string,
      serviceName: string,
      options?: ServicesStopOptionalParams,
    ) => {
      return await stop(context, groupName, serviceName, options);
    },
    start: (groupName: string, serviceName: string, options?: ServicesStartOptionalParams) =>
      start(context, groupName, serviceName, options),
    beginStart: async (
      groupName: string,
      serviceName: string,
      options?: ServicesStartOptionalParams,
    ) => {
      const poller = start(context, groupName, serviceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      groupName: string,
      serviceName: string,
      options?: ServicesStartOptionalParams,
    ) => {
      return await start(context, groupName, serviceName, options);
    },
    checkStatus: (
      groupName: string,
      serviceName: string,
      options?: ServicesCheckStatusOptionalParams,
    ) => checkStatus(context, groupName, serviceName, options),
    list: (options?: ServicesListOptionalParams) => list(context, options),
    listByResourceGroup: (groupName: string, options?: ServicesListByResourceGroupOptionalParams) =>
      listByResourceGroup(context, groupName, options),
    delete: (groupName: string, serviceName: string, options?: ServicesDeleteOptionalParams) =>
      $delete(context, groupName, serviceName, options),
    beginDelete: async (
      groupName: string,
      serviceName: string,
      options?: ServicesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, groupName, serviceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      groupName: string,
      serviceName: string,
      options?: ServicesDeleteOptionalParams,
    ) => {
      return await $delete(context, groupName, serviceName, options);
    },
    update: (
      groupName: string,
      serviceName: string,
      parameters: DataMigrationService,
      options?: ServicesUpdateOptionalParams,
    ) => update(context, groupName, serviceName, parameters, options),
    beginUpdate: async (
      groupName: string,
      serviceName: string,
      parameters: DataMigrationService,
      options?: ServicesUpdateOptionalParams,
    ) => {
      const poller = update(context, groupName, serviceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      groupName: string,
      serviceName: string,
      parameters: DataMigrationService,
      options?: ServicesUpdateOptionalParams,
    ) => {
      return await update(context, groupName, serviceName, parameters, options);
    },
    createOrUpdate: (
      groupName: string,
      serviceName: string,
      parameters: DataMigrationService,
      options?: ServicesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, groupName, serviceName, parameters, options),
    beginCreateOrUpdate: async (
      groupName: string,
      serviceName: string,
      parameters: DataMigrationService,
      options?: ServicesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, groupName, serviceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      groupName: string,
      serviceName: string,
      parameters: DataMigrationService,
      options?: ServicesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, groupName, serviceName, parameters, options);
    },
    get: (groupName: string, serviceName: string, options?: ServicesGetOptionalParams) =>
      get(context, groupName, serviceName, options),
  };
}

export function _getServicesOperations(
  context: DataMigrationManagementContext,
): ServicesOperations {
  return {
    ..._getServices(context),
  };
}
