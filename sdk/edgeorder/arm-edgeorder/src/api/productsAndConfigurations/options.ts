// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProductsAndConfigurationsListProductFamiliesMetadataOptionalParams
  extends OperationOptions {
  /** $skipToken is supported on list of product families metadata, which provides the next page in the list of product families metadata. */
  skipToken?: string;
}

/** Optional parameters. */
export interface ProductsAndConfigurationsListProductFamiliesOptionalParams
  extends OperationOptions {
  /** $expand is supported on configurations parameter for product, which provides details on the configurations for the product. */
  expand?: string;
  /** $skipToken is supported on list of product families, which provides the next page in the list of product families. */
  skipToken?: string;
}

/** Optional parameters. */
export interface ProductsAndConfigurationsListConfigurationsOptionalParams
  extends OperationOptions {
  /** $skipToken is supported on list of configurations, which provides the next page in the list of configurations. */
  skipToken?: string;
}
