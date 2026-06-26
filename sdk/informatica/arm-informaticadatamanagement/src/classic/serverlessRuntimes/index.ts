// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { InformaticaDataManagementContext } from "../../api/informaticaDataManagementContext.js";
import {
  serverlessResourceById,
  startFailedServerlessRuntime,
  checkDependencies,
  update,
  listByInformaticaOrganizationResource,
  $delete,
  createOrUpdate,
  get,
} from "../../api/serverlessRuntimes/operations.js";
import type {
  ServerlessRuntimesServerlessResourceByIdOptionalParams,
  ServerlessRuntimesStartFailedServerlessRuntimeOptionalParams,
  ServerlessRuntimesCheckDependenciesOptionalParams,
  ServerlessRuntimesUpdateOptionalParams,
  ServerlessRuntimesListByInformaticaOrganizationResourceOptionalParams,
  ServerlessRuntimesDeleteOptionalParams,
  ServerlessRuntimesCreateOrUpdateOptionalParams,
  ServerlessRuntimesGetOptionalParams,
} from "../../api/serverlessRuntimes/options.js";
import type {
  InformaticaServerlessRuntimeResource,
  InformaticaServerlessRuntimeResourceUpdate,
  CheckDependenciesResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerlessRuntimes operations. */
export interface ServerlessRuntimesOperations {
  /** Returns a serverless runtime resource by ID */
  serverlessResourceById: (
    resourceGroupName: string,
    organizationName: string,
    serverlessRuntimeName: string,
    options?: ServerlessRuntimesServerlessResourceByIdOptionalParams,
  ) => Promise<InformaticaServerlessRuntimeResource>;
  /** Starts a failed runtime resource */
  startFailedServerlessRuntime: (
    resourceGroupName: string,
    organizationName: string,
    serverlessRuntimeName: string,
    options?: ServerlessRuntimesStartFailedServerlessRuntimeOptionalParams,
  ) => Promise<void>;
  /** Checks all dependencies for a serverless runtime resource */
  checkDependencies: (
    resourceGroupName: string,
    organizationName: string,
    serverlessRuntimeName: string,
    options?: ServerlessRuntimesCheckDependenciesOptionalParams,
  ) => Promise<CheckDependenciesResponse>;
  /** Update a InformaticaServerlessRuntimeResource */
  update: (
    resourceGroupName: string,
    organizationName: string,
    serverlessRuntimeName: string,
    properties: InformaticaServerlessRuntimeResourceUpdate,
    options?: ServerlessRuntimesUpdateOptionalParams,
  ) => Promise<InformaticaServerlessRuntimeResource>;
  /** List InformaticaServerlessRuntimeResource resources by InformaticaOrganizationResource */
  listByInformaticaOrganizationResource: (
    resourceGroupName: string,
    organizationName: string,
    options?: ServerlessRuntimesListByInformaticaOrganizationResourceOptionalParams,
  ) => PagedAsyncIterableIterator<InformaticaServerlessRuntimeResource>;
  /** Delete a InformaticaServerlessRuntimeResource */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    serverlessRuntimeName: string,
    options?: ServerlessRuntimesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    organizationName: string,
    serverlessRuntimeName: string,
    options?: ServerlessRuntimesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    organizationName: string,
    serverlessRuntimeName: string,
    options?: ServerlessRuntimesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a InformaticaServerlessRuntimeResource */
  createOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    serverlessRuntimeName: string,
    resource: InformaticaServerlessRuntimeResource,
    options?: ServerlessRuntimesCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<InformaticaServerlessRuntimeResource>,
    InformaticaServerlessRuntimeResource
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    serverlessRuntimeName: string,
    resource: InformaticaServerlessRuntimeResource,
    options?: ServerlessRuntimesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<InformaticaServerlessRuntimeResource>,
      InformaticaServerlessRuntimeResource
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    organizationName: string,
    serverlessRuntimeName: string,
    resource: InformaticaServerlessRuntimeResource,
    options?: ServerlessRuntimesCreateOrUpdateOptionalParams,
  ) => Promise<InformaticaServerlessRuntimeResource>;
  /** Get a InformaticaServerlessRuntimeResource */
  get: (
    resourceGroupName: string,
    organizationName: string,
    serverlessRuntimeName: string,
    options?: ServerlessRuntimesGetOptionalParams,
  ) => Promise<InformaticaServerlessRuntimeResource>;
}

function _getServerlessRuntimes(context: InformaticaDataManagementContext) {
  return {
    serverlessResourceById: (
      resourceGroupName: string,
      organizationName: string,
      serverlessRuntimeName: string,
      options?: ServerlessRuntimesServerlessResourceByIdOptionalParams,
    ) =>
      serverlessResourceById(
        context,
        resourceGroupName,
        organizationName,
        serverlessRuntimeName,
        options,
      ),
    startFailedServerlessRuntime: (
      resourceGroupName: string,
      organizationName: string,
      serverlessRuntimeName: string,
      options?: ServerlessRuntimesStartFailedServerlessRuntimeOptionalParams,
    ) =>
      startFailedServerlessRuntime(
        context,
        resourceGroupName,
        organizationName,
        serverlessRuntimeName,
        options,
      ),
    checkDependencies: (
      resourceGroupName: string,
      organizationName: string,
      serverlessRuntimeName: string,
      options?: ServerlessRuntimesCheckDependenciesOptionalParams,
    ) =>
      checkDependencies(
        context,
        resourceGroupName,
        organizationName,
        serverlessRuntimeName,
        options,
      ),
    update: (
      resourceGroupName: string,
      organizationName: string,
      serverlessRuntimeName: string,
      properties: InformaticaServerlessRuntimeResourceUpdate,
      options?: ServerlessRuntimesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        organizationName,
        serverlessRuntimeName,
        properties,
        options,
      ),
    listByInformaticaOrganizationResource: (
      resourceGroupName: string,
      organizationName: string,
      options?: ServerlessRuntimesListByInformaticaOrganizationResourceOptionalParams,
    ) =>
      listByInformaticaOrganizationResource(context, resourceGroupName, organizationName, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      serverlessRuntimeName: string,
      options?: ServerlessRuntimesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, organizationName, serverlessRuntimeName, options),
    beginDelete: async (
      resourceGroupName: string,
      organizationName: string,
      serverlessRuntimeName: string,
      options?: ServerlessRuntimesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        organizationName,
        serverlessRuntimeName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      organizationName: string,
      serverlessRuntimeName: string,
      options?: ServerlessRuntimesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        organizationName,
        serverlessRuntimeName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      serverlessRuntimeName: string,
      resource: InformaticaServerlessRuntimeResource,
      options?: ServerlessRuntimesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        serverlessRuntimeName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      organizationName: string,
      serverlessRuntimeName: string,
      resource: InformaticaServerlessRuntimeResource,
      options?: ServerlessRuntimesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        serverlessRuntimeName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      organizationName: string,
      serverlessRuntimeName: string,
      resource: InformaticaServerlessRuntimeResource,
      options?: ServerlessRuntimesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        serverlessRuntimeName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      organizationName: string,
      serverlessRuntimeName: string,
      options?: ServerlessRuntimesGetOptionalParams,
    ) => get(context, resourceGroupName, organizationName, serverlessRuntimeName, options),
  };
}

export function _getServerlessRuntimesOperations(
  context: InformaticaDataManagementContext,
): ServerlessRuntimesOperations {
  return {
    ..._getServerlessRuntimes(context),
  };
}
