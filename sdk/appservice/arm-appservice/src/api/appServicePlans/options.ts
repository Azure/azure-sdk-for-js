// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AppServicePlansListRoutesForVnetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansDeleteVnetRouteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansUpdateVnetRouteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansCreateOrUpdateVnetRouteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansGetRouteForVnetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansUpdateVnetGatewayOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansGetVnetGatewayOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansListVnetsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansGetVnetFromServerFarmOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansGetHybridConnectionPlanLimitOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansListWebAppsByHybridConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansListHybridConnectionKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansDeleteHybridConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansGetHybridConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansRebootWorkerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansListUsagesOptionalParams extends OperationOptions {
  /** Return only usages/metrics specified in the filter. Filter conforms to odata syntax. Example: $filter=(name.value eq 'Metric1' or name.value eq 'Metric2'). */
  filter?: string;
}

/** Optional parameters. */
export interface AppServicePlansGetServerFarmSkusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansListWebAppsOptionalParams extends OperationOptions {
  /** Skip to a web app in the list of webapps associated with app service plan. If specified, the resulting list will contain web apps starting from (including) the skipToken. Otherwise, the resulting list contains web apps from the start of the list */
  skipToken?: string;
  /** Supported filter: $filter=state eq running. Returns only web apps that are currently running */
  filter?: string;
  /** List page size. If specified, results are paged. */
  top?: string;
}

/** Optional parameters. */
export interface AppServicePlansRestartWebAppsOptionalParams extends OperationOptions {
  /** Specify <code>true</code> to perform a soft restart, applies the configuration settings and restarts the apps if necessary. The default is <code>false</code>, which always restarts and reprovisions the apps */
  softRestart?: boolean;
}

/** Optional parameters. */
export interface AppServicePlansListHybridConnectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansListCapabilitiesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansListOptionalParams extends OperationOptions {
  /**
   * Specify <code>true</code> to return all App Service plan properties. The default is <code>false</code>, which returns a subset of the properties.
   * Retrieval of all properties may increase the API latency.
   */
  detailed?: boolean;
}

/** Optional parameters. */
export interface AppServicePlansListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AppServicePlansGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansGetServerFarmInstanceDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansRecycleManagedInstanceWorkerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServicePlansGetServerFarmRdpPasswordOptionalParams extends OperationOptions {}
