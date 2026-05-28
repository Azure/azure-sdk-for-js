// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/httpRouteConfig/operations.js";
import {
  HttpRouteConfigListOptionalParams,
  HttpRouteConfigDeleteOptionalParams,
  HttpRouteConfigUpdateOptionalParams,
  HttpRouteConfigCreateOrUpdateOptionalParams,
  HttpRouteConfigGetOptionalParams,
} from "../../api/httpRouteConfig/options.js";
import { HttpRouteConfig } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a HttpRouteConfig operations. */
export interface HttpRouteConfigOperations {
  /** Get the Managed Http Routes in a given managed environment. */
  list: (
    resourceGroupName: string,
    environmentName: string,
    options?: HttpRouteConfigListOptionalParams,
  ) => PagedAsyncIterableIterator<HttpRouteConfig>;
  /** Deletes the specified Managed Http Route. */
  delete: (
    resourceGroupName: string,
    environmentName: string,
    httpRouteName: string,
    options?: HttpRouteConfigDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    environmentName: string,
    httpRouteName: string,
    options?: HttpRouteConfigDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    environmentName: string,
    httpRouteName: string,
    options?: HttpRouteConfigDeleteOptionalParams,
  ) => Promise<void>;
  /** Patches an http route config resource. Only patching of tags is supported */
  update: (
    resourceGroupName: string,
    environmentName: string,
    httpRouteName: string,
    httpRouteConfigEnvelope: HttpRouteConfig,
    options?: HttpRouteConfigUpdateOptionalParams,
  ) => Promise<HttpRouteConfig>;
  /** Create or Update a Http Route Config. */
  createOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    httpRouteName: string,
    options?: HttpRouteConfigCreateOrUpdateOptionalParams,
  ) => Promise<HttpRouteConfig>;
  /** Get the specified Managed Http Route Config. */
  get: (
    resourceGroupName: string,
    environmentName: string,
    httpRouteName: string,
    options?: HttpRouteConfigGetOptionalParams,
  ) => Promise<HttpRouteConfig>;
}

function _getHttpRouteConfig(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      environmentName: string,
      options?: HttpRouteConfigListOptionalParams,
    ) => list(context, resourceGroupName, environmentName, options),
    delete: (
      resourceGroupName: string,
      environmentName: string,
      httpRouteName: string,
      options?: HttpRouteConfigDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, environmentName, httpRouteName, options),
    beginDelete: async (
      resourceGroupName: string,
      environmentName: string,
      httpRouteName: string,
      options?: HttpRouteConfigDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, environmentName, httpRouteName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      environmentName: string,
      httpRouteName: string,
      options?: HttpRouteConfigDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, environmentName, httpRouteName, options);
    },
    update: (
      resourceGroupName: string,
      environmentName: string,
      httpRouteName: string,
      httpRouteConfigEnvelope: HttpRouteConfig,
      options?: HttpRouteConfigUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        environmentName,
        httpRouteName,
        httpRouteConfigEnvelope,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      environmentName: string,
      httpRouteName: string,
      options?: HttpRouteConfigCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, environmentName, httpRouteName, options),
    get: (
      resourceGroupName: string,
      environmentName: string,
      httpRouteName: string,
      options?: HttpRouteConfigGetOptionalParams,
    ) => get(context, resourceGroupName, environmentName, httpRouteName, options),
  };
}

export function _getHttpRouteConfigOperations(
  context: ContainerAppsAPIContext,
): HttpRouteConfigOperations {
  return {
    ..._getHttpRouteConfig(context),
  };
}
