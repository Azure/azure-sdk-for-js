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
} from "../../api/blobAccessPointConfigurations/operations.js";
import type {
  BlobAccessPointConfigurationsTestExistingConnectionOptionalParams,
  BlobAccessPointConfigurationsListByStorageAccountOptionalParams,
  BlobAccessPointConfigurationsDeleteOptionalParams,
  BlobAccessPointConfigurationsUpdateOptionalParams,
  BlobAccessPointConfigurationsCreateOptionalParams,
  BlobAccessPointConfigurationsGetOptionalParams,
} from "../../api/blobAccessPointConfigurations/options.js";
import type {
  BlobAccessPointConfiguration,
  BlobAccessPointConfigurationUpdate,
  BlobAccessPointConnectionTestRequest,
  BlobAccessPointConnectionTestResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BlobAccessPointConfigurations operations. */
export interface BlobAccessPointConfigurationsOperations {
  /** Test the connection configured on an existing Blob Access Point configuration. */
  testExistingConnection: (
    resourceGroupName: string,
    accountName: string,
    blobAccessPointConfigurationName: string,
    body: BlobAccessPointConnectionTestRequest,
    options?: BlobAccessPointConfigurationsTestExistingConnectionOptionalParams,
  ) => PollerLike<
    OperationState<BlobAccessPointConnectionTestResponse>,
    BlobAccessPointConnectionTestResponse
  >;
  /** @deprecated use testExistingConnection instead */
  beginTestExistingConnection: (
    resourceGroupName: string,
    accountName: string,
    blobAccessPointConfigurationName: string,
    body: BlobAccessPointConnectionTestRequest,
    options?: BlobAccessPointConfigurationsTestExistingConnectionOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<BlobAccessPointConnectionTestResponse>,
      BlobAccessPointConnectionTestResponse
    >
  >;
  /** @deprecated use testExistingConnection instead */
  beginTestExistingConnectionAndWait: (
    resourceGroupName: string,
    accountName: string,
    blobAccessPointConfigurationName: string,
    body: BlobAccessPointConnectionTestRequest,
    options?: BlobAccessPointConfigurationsTestExistingConnectionOptionalParams,
  ) => Promise<BlobAccessPointConnectionTestResponse>;
  /** List all Blob Access Point configurations in a Storage Account. */
  listByStorageAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: BlobAccessPointConfigurationsListByStorageAccountOptionalParams,
  ) => PagedAsyncIterableIterator<BlobAccessPointConfiguration>;
  /** Delete a Blob Access Point configuration. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    blobAccessPointConfigurationName: string,
    options?: BlobAccessPointConfigurationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    blobAccessPointConfigurationName: string,
    options?: BlobAccessPointConfigurationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    blobAccessPointConfigurationName: string,
    options?: BlobAccessPointConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a Blob Access Point configuration. */
  update: (
    resourceGroupName: string,
    accountName: string,
    blobAccessPointConfigurationName: string,
    properties: BlobAccessPointConfigurationUpdate,
    options?: BlobAccessPointConfigurationsUpdateOptionalParams,
  ) => PollerLike<OperationState<BlobAccessPointConfiguration>, BlobAccessPointConfiguration>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    accountName: string,
    blobAccessPointConfigurationName: string,
    properties: BlobAccessPointConfigurationUpdate,
    options?: BlobAccessPointConfigurationsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<BlobAccessPointConfiguration>, BlobAccessPointConfiguration>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    blobAccessPointConfigurationName: string,
    properties: BlobAccessPointConfigurationUpdate,
    options?: BlobAccessPointConfigurationsUpdateOptionalParams,
  ) => Promise<BlobAccessPointConfiguration>;
  /** Creates or updates a Blob Access Point configuration. */
  create: (
    resourceGroupName: string,
    accountName: string,
    blobAccessPointConfigurationName: string,
    resource: BlobAccessPointConfiguration,
    options?: BlobAccessPointConfigurationsCreateOptionalParams,
  ) => PollerLike<OperationState<BlobAccessPointConfiguration>, BlobAccessPointConfiguration>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    accountName: string,
    blobAccessPointConfigurationName: string,
    resource: BlobAccessPointConfiguration,
    options?: BlobAccessPointConfigurationsCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<BlobAccessPointConfiguration>, BlobAccessPointConfiguration>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    accountName: string,
    blobAccessPointConfigurationName: string,
    resource: BlobAccessPointConfiguration,
    options?: BlobAccessPointConfigurationsCreateOptionalParams,
  ) => Promise<BlobAccessPointConfiguration>;
  /** Get the specified Blob Access Point configuration. */
  get: (
    resourceGroupName: string,
    accountName: string,
    blobAccessPointConfigurationName: string,
    options?: BlobAccessPointConfigurationsGetOptionalParams,
  ) => Promise<BlobAccessPointConfiguration>;
}

function _getBlobAccessPointConfigurations(context: StorageManagementContext) {
  return {
    testExistingConnection: (
      resourceGroupName: string,
      accountName: string,
      blobAccessPointConfigurationName: string,
      body: BlobAccessPointConnectionTestRequest,
      options?: BlobAccessPointConfigurationsTestExistingConnectionOptionalParams,
    ) =>
      testExistingConnection(
        context,
        resourceGroupName,
        accountName,
        blobAccessPointConfigurationName,
        body,
        options,
      ),
    beginTestExistingConnection: async (
      resourceGroupName: string,
      accountName: string,
      blobAccessPointConfigurationName: string,
      body: BlobAccessPointConnectionTestRequest,
      options?: BlobAccessPointConfigurationsTestExistingConnectionOptionalParams,
    ) => {
      const poller = testExistingConnection(
        context,
        resourceGroupName,
        accountName,
        blobAccessPointConfigurationName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTestExistingConnectionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      blobAccessPointConfigurationName: string,
      body: BlobAccessPointConnectionTestRequest,
      options?: BlobAccessPointConfigurationsTestExistingConnectionOptionalParams,
    ) => {
      return await testExistingConnection(
        context,
        resourceGroupName,
        accountName,
        blobAccessPointConfigurationName,
        body,
        options,
      );
    },
    listByStorageAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: BlobAccessPointConfigurationsListByStorageAccountOptionalParams,
    ) => listByStorageAccount(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      blobAccessPointConfigurationName: string,
      options?: BlobAccessPointConfigurationsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, accountName, blobAccessPointConfigurationName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      blobAccessPointConfigurationName: string,
      options?: BlobAccessPointConfigurationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        accountName,
        blobAccessPointConfigurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      blobAccessPointConfigurationName: string,
      options?: BlobAccessPointConfigurationsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        accountName,
        blobAccessPointConfigurationName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      accountName: string,
      blobAccessPointConfigurationName: string,
      properties: BlobAccessPointConfigurationUpdate,
      options?: BlobAccessPointConfigurationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        accountName,
        blobAccessPointConfigurationName,
        properties,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      accountName: string,
      blobAccessPointConfigurationName: string,
      properties: BlobAccessPointConfigurationUpdate,
      options?: BlobAccessPointConfigurationsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        accountName,
        blobAccessPointConfigurationName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      blobAccessPointConfigurationName: string,
      properties: BlobAccessPointConfigurationUpdate,
      options?: BlobAccessPointConfigurationsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        accountName,
        blobAccessPointConfigurationName,
        properties,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      accountName: string,
      blobAccessPointConfigurationName: string,
      resource: BlobAccessPointConfiguration,
      options?: BlobAccessPointConfigurationsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        accountName,
        blobAccessPointConfigurationName,
        resource,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      accountName: string,
      blobAccessPointConfigurationName: string,
      resource: BlobAccessPointConfiguration,
      options?: BlobAccessPointConfigurationsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        accountName,
        blobAccessPointConfigurationName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      blobAccessPointConfigurationName: string,
      resource: BlobAccessPointConfiguration,
      options?: BlobAccessPointConfigurationsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        accountName,
        blobAccessPointConfigurationName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      accountName: string,
      blobAccessPointConfigurationName: string,
      options?: BlobAccessPointConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, blobAccessPointConfigurationName, options),
  };
}

export function _getBlobAccessPointConfigurationsOperations(
  context: StorageManagementContext,
): BlobAccessPointConfigurationsOperations {
  return {
    ..._getBlobAccessPointConfigurations(context),
  };
}
