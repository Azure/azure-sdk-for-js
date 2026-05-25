// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderOsTypeSelected, ProviderStackOsType } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProviderListAvailableStacksOnPremOptionalParams extends OperationOptions {
  osTypeSelected?: ProviderOsTypeSelected;
}

/** Optional parameters. */
export interface ProviderListWebAppStacksOptionalParams extends OperationOptions {
  /** Stack OS Type */
  stackOsType?: ProviderStackOsType;
}

/** Optional parameters. */
export interface ProviderListWebAppStacksForLocationOptionalParams extends OperationOptions {
  /** Stack OS Type */
  stackOsType?: ProviderStackOsType;
}

/** Optional parameters. */
export interface ProviderListFunctionAppStacksForLocationOptionalParams extends OperationOptions {
  /** Stack OS Type */
  stackOsType?: ProviderStackOsType;
}

/** Optional parameters. */
export interface ProviderListFunctionAppStacksOptionalParams extends OperationOptions {
  /** Stack OS Type */
  stackOsType?: ProviderStackOsType;
}

/** Optional parameters. */
export interface ProviderListAvailableStacksOptionalParams extends OperationOptions {
  osTypeSelected?: ProviderOsTypeSelected;
}

/** Optional parameters. */
export interface ProviderListOperationsOptionalParams extends OperationOptions {}
