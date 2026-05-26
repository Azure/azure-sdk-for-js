// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/appResiliency/operations.js";
import {
  AppResiliencyListOptionalParams,
  AppResiliencyDeleteOptionalParams,
  AppResiliencyUpdateOptionalParams,
  AppResiliencyCreateOrUpdateOptionalParams,
  AppResiliencyGetOptionalParams,
} from "../../api/appResiliency/options.js";
import { AppResiliency } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AppResiliency operations. */
export interface AppResiliencyOperations {
  /** List container app resiliency policies. */
  list: (
    resourceGroupName: string,
    appName: string,
    options?: AppResiliencyListOptionalParams,
  ) => PagedAsyncIterableIterator<AppResiliency>;
  /** Delete container app resiliency policy. */
  delete: (
    resourceGroupName: string,
    appName: string,
    name: string,
    options?: AppResiliencyDeleteOptionalParams,
  ) => Promise<void>;
  /** Update container app resiliency policy. */
  update: (
    resourceGroupName: string,
    appName: string,
    name: string,
    resiliencyEnvelope: AppResiliency,
    options?: AppResiliencyUpdateOptionalParams,
  ) => Promise<AppResiliency>;
  /** Create or update container app resiliency policy. */
  createOrUpdate: (
    resourceGroupName: string,
    appName: string,
    name: string,
    resiliencyEnvelope: AppResiliency,
    options?: AppResiliencyCreateOrUpdateOptionalParams,
  ) => Promise<AppResiliency>;
  /** Get container app resiliency policy. */
  get: (
    resourceGroupName: string,
    appName: string,
    name: string,
    options?: AppResiliencyGetOptionalParams,
  ) => Promise<AppResiliency>;
}

function _getAppResiliency(context: ContainerAppsAPIContext) {
  return {
    list: (resourceGroupName: string, appName: string, options?: AppResiliencyListOptionalParams) =>
      list(context, resourceGroupName, appName, options),
    delete: (
      resourceGroupName: string,
      appName: string,
      name: string,
      options?: AppResiliencyDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, appName, name, options),
    update: (
      resourceGroupName: string,
      appName: string,
      name: string,
      resiliencyEnvelope: AppResiliency,
      options?: AppResiliencyUpdateOptionalParams,
    ) => update(context, resourceGroupName, appName, name, resiliencyEnvelope, options),
    createOrUpdate: (
      resourceGroupName: string,
      appName: string,
      name: string,
      resiliencyEnvelope: AppResiliency,
      options?: AppResiliencyCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, appName, name, resiliencyEnvelope, options),
    get: (
      resourceGroupName: string,
      appName: string,
      name: string,
      options?: AppResiliencyGetOptionalParams,
    ) => get(context, resourceGroupName, appName, name, options),
  };
}

export function _getAppResiliencyOperations(
  context: ContainerAppsAPIContext,
): AppResiliencyOperations {
  return {
    ..._getAppResiliency(context),
  };
}
