// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OrganizationResource, OrganizationResourceUpdate } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OrganizationCreateApiKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OrganizationListClustersOptionalParams extends OperationOptions {
  /** Pagination size */
  pageSize?: number;
  /** An opaque pagination token to fetch the next set of records */
  pageToken?: string;
}

/** Optional parameters. */
export interface OrganizationGetClusterByIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OrganizationGetSchemaRegistryClusterByIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OrganizationListSchemaRegistryClustersOptionalParams extends OperationOptions {
  /** Pagination size */
  pageSize?: number;
  /** An opaque pagination token to fetch the next set of records */
  pageToken?: string;
}

/** Optional parameters. */
export interface OrganizationListEnvironmentsOptionalParams extends OperationOptions {
  /** Pagination size */
  pageSize?: number;
  /** An opaque pagination token to fetch the next set of records */
  pageToken?: string;
}

/** Optional parameters. */
export interface OrganizationGetEnvironmentByIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OrganizationListRegionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OrganizationListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OrganizationListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OrganizationDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OrganizationUpdateOptionalParams extends OperationOptions {
  /** Updated Organization resource */
  body?: OrganizationResourceUpdate;
}

/** Optional parameters. */
export interface OrganizationCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Organization resource model */
  body?: OrganizationResource;
}

/** Optional parameters. */
export interface OrganizationGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OrganizationDeleteClusterAPIKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OrganizationGetClusterAPIKeyOptionalParams extends OperationOptions {}
