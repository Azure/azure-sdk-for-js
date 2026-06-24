// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  Identity,
  CustomLocationPropertiesAuthentication,
  HostType,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CustomLocationsFindTargetResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomLocationsListEnabledResourceTypesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomLocationsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomLocationsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomLocationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CustomLocationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CustomLocationsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomLocationsListOperationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomLocationsUpdateOptionalParams extends OperationOptions {
  /** Identity for the resource. */
  identity?: Identity;
  /** This is optional input that contains the authentication that should be used to generate the namespace. */
  authentication?: CustomLocationPropertiesAuthentication;
  /** Contains the reference to the add-on that contains charts to deploy CRDs and operators. */
  clusterExtensionIds?: string[];
  /** Display name for the Custom Locations location. */
  displayName?: string;
  /** Connected Cluster or AKS Cluster. The Custom Locations RP will perform a checkAccess API for listAdminCredentials permissions. */
  hostResourceId?: string;
  /** Type of host the Custom Locations is referencing (Kubernetes, etc...). */
  hostType?: HostType;
  /** Kubernetes namespace that will be created on the specified cluster. */
  namespace?: string;
  /** Provisioning State for the Custom Location. */
  provisioningState?: string;
  /** Resource tags */
  tags?: Record<string, string>;
}
