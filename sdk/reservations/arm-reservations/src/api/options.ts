// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GetAppliedReservationListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetCatalogOptionalParams extends OperationOptions {
  /** The type of the resource for which the skus should be provided. */
  reservedResourceType?: string;
  /** Filters the skus based on the location specified in this parameter. This can be an azure region or global */
  location?: string;
  /** Publisher id used to get the third party products */
  publisherId?: string;
  /** Offer id used to get the third party products */
  offerId?: string;
  /** Plan id used to get the third party products */
  planId?: string;
  /** May be used to filter by Catalog properties. The filter supports 'eq', 'or', and 'and'. */
  filter?: string;
  /** The number of reservations to skip from the list before returning results */
  skip?: number;
  /** To number of reservations to return */
  take?: number;
}
