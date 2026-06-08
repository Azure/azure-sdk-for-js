// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/javaComponents/operations.js";
import {
  JavaComponentsListOptionalParams,
  JavaComponentsDeleteOptionalParams,
  JavaComponentsUpdateOptionalParams,
  JavaComponentsCreateOrUpdateOptionalParams,
  JavaComponentsGetOptionalParams,
} from "../../api/javaComponents/options.js";
import { JavaComponent } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a JavaComponents operations. */
export interface JavaComponentsOperations {
  /** Get the Java Components for a managed environment. */
  list: (
    resourceGroupName: string,
    environmentName: string,
    options?: JavaComponentsListOptionalParams,
  ) => PagedAsyncIterableIterator<JavaComponent>;
  /** Delete a Java Component. */
  delete: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    options?: JavaComponentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    options?: JavaComponentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    options?: JavaComponentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Patches a Java Component using JSON Merge Patch */
  update: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    javaComponentEnvelope: JavaComponent,
    options?: JavaComponentsUpdateOptionalParams,
  ) => PollerLike<OperationState<JavaComponent>, JavaComponent>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    javaComponentEnvelope: JavaComponent,
    options?: JavaComponentsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<JavaComponent>, JavaComponent>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    javaComponentEnvelope: JavaComponent,
    options?: JavaComponentsUpdateOptionalParams,
  ) => Promise<JavaComponent>;
  /** Creates or updates a Java Component in a Managed Environment. */
  createOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    javaComponentEnvelope: JavaComponent,
    options?: JavaComponentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<JavaComponent>, JavaComponent>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    javaComponentEnvelope: JavaComponent,
    options?: JavaComponentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<JavaComponent>, JavaComponent>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    javaComponentEnvelope: JavaComponent,
    options?: JavaComponentsCreateOrUpdateOptionalParams,
  ) => Promise<JavaComponent>;
  /** Get a Java Component. */
  get: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    options?: JavaComponentsGetOptionalParams,
  ) => Promise<JavaComponent>;
}

function _getJavaComponents(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      environmentName: string,
      options?: JavaComponentsListOptionalParams,
    ) => list(context, resourceGroupName, environmentName, options),
    delete: (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      options?: JavaComponentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, environmentName, name, options),
    beginDelete: async (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      options?: JavaComponentsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, environmentName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      options?: JavaComponentsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, environmentName, name, options);
    },
    update: (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      javaComponentEnvelope: JavaComponent,
      options?: JavaComponentsUpdateOptionalParams,
    ) => update(context, resourceGroupName, environmentName, name, javaComponentEnvelope, options),
    beginUpdate: async (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      javaComponentEnvelope: JavaComponent,
      options?: JavaComponentsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        environmentName,
        name,
        javaComponentEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      javaComponentEnvelope: JavaComponent,
      options?: JavaComponentsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        environmentName,
        name,
        javaComponentEnvelope,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      javaComponentEnvelope: JavaComponent,
      options?: JavaComponentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        name,
        javaComponentEnvelope,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      javaComponentEnvelope: JavaComponent,
      options?: JavaComponentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        name,
        javaComponentEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      javaComponentEnvelope: JavaComponent,
      options?: JavaComponentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        name,
        javaComponentEnvelope,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      options?: JavaComponentsGetOptionalParams,
    ) => get(context, resourceGroupName, environmentName, name, options),
  };
}

export function _getJavaComponentsOperations(
  context: ContainerAppsAPIContext,
): JavaComponentsOperations {
  return {
    ..._getJavaComponents(context),
  };
}
