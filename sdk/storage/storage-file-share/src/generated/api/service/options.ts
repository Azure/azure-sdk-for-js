// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ShareTokenIntent,
  ListSharesIncludeType,
} from "../../models/azure/storage/files/shares/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServiceGetUserDelegationKeyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
}

/** Optional parameters. */
export interface ServiceListSharesSegmentOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Filters the results to return only items whose name begins with the specified prefix. */
  prefix?: string;
  /** A string value that identifies the portion of the list to be returned with the next listing operation. */
  marker?: string;
  /** Specifies the maximum number of items to return. */
  maxResults?: number;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** Include this parameter to specify one or more datasets to include in the response. */
  include?: ListSharesIncludeType[];
}

/** Optional parameters. */
export interface ServiceGetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface ServiceSetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}
