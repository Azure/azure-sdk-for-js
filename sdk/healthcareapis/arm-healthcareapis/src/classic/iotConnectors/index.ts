// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementContext } from "../../api/healthcareApisManagementContext.js";
import {
  $delete,
  update,
  listByWorkspace,
  createOrUpdate,
  get,
} from "../../api/iotConnectors/operations.js";
import {
  IotConnectorsDeleteOptionalParams,
  IotConnectorsUpdateOptionalParams,
  IotConnectorsListByWorkspaceOptionalParams,
  IotConnectorsCreateOrUpdateOptionalParams,
  IotConnectorsGetOptionalParams,
} from "../../api/iotConnectors/options.js";
import { IotConnector, IotConnectorPatchResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IotConnectors operations. */
export interface IotConnectorsOperations {
  /** Deletes an IoT Connector. */
  delete: (
    resourceGroupName: string,
    iotConnectorName: string,
    workspaceName: string,
    options?: IotConnectorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    iotConnectorName: string,
    workspaceName: string,
    options?: IotConnectorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    iotConnectorName: string,
    workspaceName: string,
    options?: IotConnectorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Patch an IoT Connector. */
  update: (
    resourceGroupName: string,
    iotConnectorName: string,
    workspaceName: string,
    iotConnectorPatchResource: IotConnectorPatchResource,
    options?: IotConnectorsUpdateOptionalParams,
  ) => PollerLike<OperationState<IotConnector>, IotConnector>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    iotConnectorName: string,
    workspaceName: string,
    iotConnectorPatchResource: IotConnectorPatchResource,
    options?: IotConnectorsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IotConnector>, IotConnector>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    iotConnectorName: string,
    workspaceName: string,
    iotConnectorPatchResource: IotConnectorPatchResource,
    options?: IotConnectorsUpdateOptionalParams,
  ) => Promise<IotConnector>;
  /** Lists all IoT Connectors for the given workspace */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: IotConnectorsListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<IotConnector>;
  /** Creates or updates an IoT Connector resource with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    iotConnectorName: string,
    iotConnector: IotConnector,
    options?: IotConnectorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<IotConnector>, IotConnector>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    iotConnectorName: string,
    iotConnector: IotConnector,
    options?: IotConnectorsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IotConnector>, IotConnector>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    iotConnectorName: string,
    iotConnector: IotConnector,
    options?: IotConnectorsCreateOrUpdateOptionalParams,
  ) => Promise<IotConnector>;
  /** Gets the properties of the specified IoT Connector. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    iotConnectorName: string,
    options?: IotConnectorsGetOptionalParams,
  ) => Promise<IotConnector>;
}

function _getIotConnectors(context: HealthcareApisManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      iotConnectorName: string,
      workspaceName: string,
      options?: IotConnectorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, iotConnectorName, workspaceName, options),
    beginDelete: async (
      resourceGroupName: string,
      iotConnectorName: string,
      workspaceName: string,
      options?: IotConnectorsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, iotConnectorName, workspaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      iotConnectorName: string,
      workspaceName: string,
      options?: IotConnectorsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, iotConnectorName, workspaceName, options);
    },
    update: (
      resourceGroupName: string,
      iotConnectorName: string,
      workspaceName: string,
      iotConnectorPatchResource: IotConnectorPatchResource,
      options?: IotConnectorsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        iotConnectorName,
        workspaceName,
        iotConnectorPatchResource,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      iotConnectorName: string,
      workspaceName: string,
      iotConnectorPatchResource: IotConnectorPatchResource,
      options?: IotConnectorsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        iotConnectorName,
        workspaceName,
        iotConnectorPatchResource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      iotConnectorName: string,
      workspaceName: string,
      iotConnectorPatchResource: IotConnectorPatchResource,
      options?: IotConnectorsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        iotConnectorName,
        workspaceName,
        iotConnectorPatchResource,
        options,
      );
    },
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: IotConnectorsListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      iotConnectorName: string,
      iotConnector: IotConnector,
      options?: IotConnectorsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        iotConnectorName,
        iotConnector,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      iotConnectorName: string,
      iotConnector: IotConnector,
      options?: IotConnectorsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        iotConnectorName,
        iotConnector,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      iotConnectorName: string,
      iotConnector: IotConnector,
      options?: IotConnectorsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        iotConnectorName,
        iotConnector,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      iotConnectorName: string,
      options?: IotConnectorsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, iotConnectorName, options),
  };
}

export function _getIotConnectorsOperations(
  context: HealthcareApisManagementContext,
): IotConnectorsOperations {
  return {
    ..._getIotConnectors(context),
  };
}
