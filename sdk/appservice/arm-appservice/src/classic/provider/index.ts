// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  listAvailableStacksOnPrem,
  listWebAppStacks,
  listWebAppStacksForLocation,
  listFunctionAppStacksForLocation,
  listFunctionAppStacks,
  listAvailableStacks,
  listOperations,
} from "../../api/provider/operations.js";
import type {
  ProviderListAvailableStacksOnPremOptionalParams,
  ProviderListWebAppStacksOptionalParams,
  ProviderListWebAppStacksForLocationOptionalParams,
  ProviderListFunctionAppStacksForLocationOptionalParams,
  ProviderListFunctionAppStacksOptionalParams,
  ProviderListAvailableStacksOptionalParams,
  ProviderListOperationsOptionalParams,
} from "../../api/provider/options.js";
import type {
  CsmOperationDescription,
  ApplicationStackResource,
  FunctionAppStack,
  WebAppStack,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Provider operations. */
export interface ProviderOperations {
  /** Description for Get available application frameworks and their versions */
  listAvailableStacksOnPrem: (
    options?: ProviderListAvailableStacksOnPremOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationStackResource>;
  /** Description for Get available Web app frameworks and their versions */
  listWebAppStacks: (
    options?: ProviderListWebAppStacksOptionalParams,
  ) => PagedAsyncIterableIterator<WebAppStack>;
  /** Description for Get available Web app frameworks and their versions for location */
  listWebAppStacksForLocation: (
    location: string,
    options?: ProviderListWebAppStacksForLocationOptionalParams,
  ) => PagedAsyncIterableIterator<WebAppStack>;
  /** Description for Get available Function app frameworks and their versions for location */
  listFunctionAppStacksForLocation: (
    location: string,
    options?: ProviderListFunctionAppStacksForLocationOptionalParams,
  ) => PagedAsyncIterableIterator<FunctionAppStack>;
  /** Description for Get available Function app frameworks and their versions */
  listFunctionAppStacks: (
    options?: ProviderListFunctionAppStacksOptionalParams,
  ) => PagedAsyncIterableIterator<FunctionAppStack>;
  /** Description for Get available application frameworks and their versions */
  listAvailableStacks: (
    options?: ProviderListAvailableStacksOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationStackResource>;
  /** Description for Gets all available operations for the Microsoft.Web resource provider. Also exposes resource metric definitions */
  listOperations: (
    options?: ProviderListOperationsOptionalParams,
  ) => PagedAsyncIterableIterator<CsmOperationDescription>;
}

function _getProvider(context: WebSiteManagementContext) {
  return {
    listAvailableStacksOnPrem: (options?: ProviderListAvailableStacksOnPremOptionalParams) =>
      listAvailableStacksOnPrem(context, options),
    listWebAppStacks: (options?: ProviderListWebAppStacksOptionalParams) =>
      listWebAppStacks(context, options),
    listWebAppStacksForLocation: (
      location: string,
      options?: ProviderListWebAppStacksForLocationOptionalParams,
    ) => listWebAppStacksForLocation(context, location, options),
    listFunctionAppStacksForLocation: (
      location: string,
      options?: ProviderListFunctionAppStacksForLocationOptionalParams,
    ) => listFunctionAppStacksForLocation(context, location, options),
    listFunctionAppStacks: (options?: ProviderListFunctionAppStacksOptionalParams) =>
      listFunctionAppStacks(context, options),
    listAvailableStacks: (options?: ProviderListAvailableStacksOptionalParams) =>
      listAvailableStacks(context, options),
    listOperations: (options?: ProviderListOperationsOptionalParams) =>
      listOperations(context, options),
  };
}

export function _getProviderOperations(context: WebSiteManagementContext): ProviderOperations {
  return {
    ..._getProvider(context),
  };
}
