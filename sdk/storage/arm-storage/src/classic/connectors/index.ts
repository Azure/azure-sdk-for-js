// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import {
  testExistingConnection,
  listByStorageAccount,
  $delete,
  update,
  create,
  get,
} from "../../api/connectors/operations.js";
import type {
  ConnectorsTestExistingConnectionOptionalParams,
  ConnectorsListByStorageAccountOptionalParams,
  ConnectorsDeleteOptionalParams,
  ConnectorsUpdateOptionalParams,
  ConnectorsCreateOptionalParams,
  ConnectorsGetOptionalParams,
} from "../../api/connectors/options.js";
import type {
  Connector,
  ConnectorUpdate,
  TestExistingConnectionRequest,
  TestConnectionResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Connectors operations. */
export interface ConnectorsOperations {
  /**
   * This method is used to verify that the connection to the backing data store works.
   * This API is designed to be used for monitoring and debugging purposes. From the caller’s perspective,
   * this method does the following: Calls List on the backing data store, attempting to list up to one blob/object/etc.
   * If the above succeeds, and if a blob/object/etc is found, calls Get on that object, attempting to download one byte.
   */
  testExistingConnection: (
    resourceGroupName: string,
    accountName: string,
    connectorName: string,
    body: TestExistingConnectionRequest,
    options?: ConnectorsTestExistingConnectionOptionalParams,
  ) => PollerLike<OperationState<TestConnectionResponse>, TestConnectionResponse>;
  /** @deprecated use testExistingConnection instead */
  beginTestExistingConnection: (
    resourceGroupName: string,
    accountName: string,
    connectorName: string,
    body: TestExistingConnectionRequest,
    options?: ConnectorsTestExistingConnectionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<TestConnectionResponse>, TestConnectionResponse>>;
  /** @deprecated use testExistingConnection instead */
  beginTestExistingConnectionAndWait: (
    resourceGroupName: string,
    accountName: string,
    connectorName: string,
    body: TestExistingConnectionRequest,
    options?: ConnectorsTestExistingConnectionOptionalParams,
  ) => Promise<TestConnectionResponse>;
  /** List all Storage Connectors in a Storage Account. */
  listByStorageAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: ConnectorsListByStorageAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Connector>;
  /** Delete a Storage Connector. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    connectorName: string,
    options?: ConnectorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    connectorName: string,
    options?: ConnectorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    connectorName: string,
    options?: ConnectorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a Storage Connector. */
  update: (
    resourceGroupName: string,
    accountName: string,
    connectorName: string,
    properties: ConnectorUpdate,
    options?: ConnectorsUpdateOptionalParams,
  ) => PollerLike<OperationState<Connector>, Connector>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    accountName: string,
    connectorName: string,
    properties: ConnectorUpdate,
    options?: ConnectorsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Connector>, Connector>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    connectorName: string,
    properties: ConnectorUpdate,
    options?: ConnectorsUpdateOptionalParams,
  ) => Promise<Connector>;
  /** Create a Storage Connector if it does not already exist; otherwise, error out. This API will not allow you to replace an already existing resource. */
  create: (
    resourceGroupName: string,
    accountName: string,
    connectorName: string,
    resource: Connector,
    options?: ConnectorsCreateOptionalParams,
  ) => PollerLike<OperationState<Connector>, Connector>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    accountName: string,
    connectorName: string,
    resource: Connector,
    options?: ConnectorsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Connector>, Connector>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    accountName: string,
    connectorName: string,
    resource: Connector,
    options?: ConnectorsCreateOptionalParams,
  ) => Promise<Connector>;
  /** Get the specified Storage Connector. */
  get: (
    resourceGroupName: string,
    accountName: string,
    connectorName: string,
    options?: ConnectorsGetOptionalParams,
  ) => Promise<Connector>;
}

function _getConnectors(context: StorageManagementContext) {
  return {
    testExistingConnection: (
      resourceGroupName: string,
      accountName: string,
      connectorName: string,
      body: TestExistingConnectionRequest,
      options?: ConnectorsTestExistingConnectionOptionalParams,
    ) =>
      testExistingConnection(context, resourceGroupName, accountName, connectorName, body, options),
    beginTestExistingConnection: async (
      resourceGroupName: string,
      accountName: string,
      connectorName: string,
      body: TestExistingConnectionRequest,
      options?: ConnectorsTestExistingConnectionOptionalParams,
    ) => {
      const poller = testExistingConnection(
        context,
        resourceGroupName,
        accountName,
        connectorName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTestExistingConnectionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      connectorName: string,
      body: TestExistingConnectionRequest,
      options?: ConnectorsTestExistingConnectionOptionalParams,
    ) => {
      return await testExistingConnection(
        context,
        resourceGroupName,
        accountName,
        connectorName,
        body,
        options,
      );
    },
    listByStorageAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: ConnectorsListByStorageAccountOptionalParams,
    ) => listByStorageAccount(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      connectorName: string,
      options?: ConnectorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, connectorName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      connectorName: string,
      options?: ConnectorsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accountName, connectorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      connectorName: string,
      options?: ConnectorsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, connectorName, options);
    },
    update: (
      resourceGroupName: string,
      accountName: string,
      connectorName: string,
      properties: ConnectorUpdate,
      options?: ConnectorsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, connectorName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      accountName: string,
      connectorName: string,
      properties: ConnectorUpdate,
      options?: ConnectorsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        accountName,
        connectorName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      connectorName: string,
      properties: ConnectorUpdate,
      options?: ConnectorsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        accountName,
        connectorName,
        properties,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      accountName: string,
      connectorName: string,
      resource: Connector,
      options?: ConnectorsCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, connectorName, resource, options),
    beginCreate: async (
      resourceGroupName: string,
      accountName: string,
      connectorName: string,
      resource: Connector,
      options?: ConnectorsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        accountName,
        connectorName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      connectorName: string,
      resource: Connector,
      options?: ConnectorsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        accountName,
        connectorName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      accountName: string,
      connectorName: string,
      options?: ConnectorsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, connectorName, options),
  };
}

export function _getConnectorsOperations(context: StorageManagementContext): ConnectorsOperations {
  return {
    ..._getConnectors(context),
  };
}
