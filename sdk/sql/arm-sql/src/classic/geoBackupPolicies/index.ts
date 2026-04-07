// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { list, createOrUpdate, get } from "../../api/geoBackupPolicies/operations.js";
import type {
  GeoBackupPoliciesListOptionalParams,
  GeoBackupPoliciesCreateOrUpdateOptionalParams,
  GeoBackupPoliciesGetOptionalParams,
} from "../../api/geoBackupPolicies/options.js";
import type { GeoBackupPolicy, GeoBackupPolicyName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GeoBackupPolicies operations. */
export interface GeoBackupPoliciesOperations {
  /** Gets a list of Geo backup policies for the given database resource. */
  list: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: GeoBackupPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<GeoBackupPolicy>;
  /** Create or update a database default Geo backup policy. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    geoBackupPolicyName: GeoBackupPolicyName,
    parameters: GeoBackupPolicy,
    options?: GeoBackupPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<GeoBackupPolicy>;
  /** Gets a Geo backup policy for the given database resource. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    geoBackupPolicyName: GeoBackupPolicyName,
    options?: GeoBackupPoliciesGetOptionalParams,
  ) => Promise<GeoBackupPolicy>;
}

function _getGeoBackupPolicies(context: SqlContext) {
  return {
    list: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: GeoBackupPoliciesListOptionalParams,
    ) => list(context, resourceGroupName, serverName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      geoBackupPolicyName: GeoBackupPolicyName,
      parameters: GeoBackupPolicy,
      options?: GeoBackupPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        geoBackupPolicyName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      geoBackupPolicyName: GeoBackupPolicyName,
      options?: GeoBackupPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, geoBackupPolicyName, options),
  };
}

export function _getGeoBackupPoliciesOperations(context: SqlContext): GeoBackupPoliciesOperations {
  return {
    ..._getGeoBackupPolicies(context),
  };
}
