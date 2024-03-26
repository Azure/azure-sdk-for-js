// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";

export interface OperationsListOptions extends OperationOptions {}

export interface CatalogsGetOptions extends OperationOptions {}

export interface CatalogsCreateOrUpdateOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface CatalogsUpdateOptions extends OperationOptions {}

export interface CatalogsDeleteOperationOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface CatalogsListByResourceGroupOptions extends OperationOptions {}

export interface CatalogsListBySubscriptionOptions extends OperationOptions {}

export interface CatalogsDeprecatedOptions extends OperationOptions {}

export interface CatalogsCountDevicesOptions extends OperationOptions {}

export interface CatalogsListDeviceInsightsOptions extends OperationOptions {
  /** Filter the result list using the given expression */
  filter?: string;
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface CatalogsListDevicesOptions extends OperationOptions {
  /** Filter the result list using the given expression */
  filter?: string;
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface CatalogsListDeploymentsOptions extends OperationOptions {
  /** Filter the result list using the given expression */
  filter?: string;
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface CatalogsListDeviceGroupsOptions extends OperationOptions {
  /** Filter the result list using the given expression */
  filter?: string;
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface CatalogsUploadImageOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface ImagesGetOptions extends OperationOptions {}

export interface ImagesListByCatalogOptions extends OperationOptions {
  /** Filter the result list using the given expression */
  filter?: string;
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ImagesCreateOrUpdateOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface ImagesDeleteOperationOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DeviceGroupsListByProductOptions extends OperationOptions {
  /** Filter the result list using the given expression */
  filter?: string;
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface DeviceGroupsGetOptions extends OperationOptions {}

export interface DeviceGroupsCreateOrUpdateOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DeviceGroupsDeleteOperationOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DeviceGroupsUpdateOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DeviceGroupsDeprecatedCountDevicesOptions
  extends OperationOptions {}

export interface DeviceGroupsCountDevicesOptions extends OperationOptions {}

export interface DeviceGroupsDeprecatedClaimDevicesOptions
  extends OperationOptions {}

export interface DeviceGroupsClaimDevicesOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface CertificatesGetOptions extends OperationOptions {}

export interface CertificatesListByCatalogOptions extends OperationOptions {
  /** Filter the result list using the given expression */
  filter?: string;
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface CertificatesRetrieveCertChainOptions
  extends OperationOptions {}

export interface CertificatesRetrieveProofOfPossessionNonceOptions
  extends OperationOptions {}

export interface DeploymentsGetOptions extends OperationOptions {}

export interface DeploymentsListByDeviceGroupOptions extends OperationOptions {
  /** Filter the result list using the given expression */
  filter?: string;
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface DeploymentsCreateOrUpdateOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DeploymentsDeleteOperationOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DevicesGetOptions extends OperationOptions {}

export interface DevicesCreateOrUpdateOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DevicesListByDeviceGroupOptions extends OperationOptions {}

export interface DevicesDeleteOperationOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DevicesUpdateOptions extends OperationOptions {}

export interface DevicesDeprecatedGenerateCapabilityImageOptions
  extends OperationOptions {}

export interface DevicesGenerateCapabilityImageOptions
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface ProductsListByCatalogOptions extends OperationOptions {}

export interface ProductsGetOptions extends OperationOptions {}

export interface ProductsCreateOrUpdateOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface ProductsDeleteOperationOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface ProductsUpdateOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface ProductsGenerateDefaultDeviceGroupsOptions
  extends OperationOptions {}

export interface ProductsDeprecatedOptions extends OperationOptions {}

export interface ProductsCountDevicesOptions extends OperationOptions {}
