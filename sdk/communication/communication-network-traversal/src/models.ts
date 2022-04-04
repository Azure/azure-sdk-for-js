// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// delete this pipeline options
import { OperationOptions, PipelineOptions } from "@azure/core-http";
import { RouteType } from "./generated/src/models";

/**
 * Client options used to configure the CommunicationNetworkTraversal API requests.
 */
export interface CommunicationRelayClientOptions extends PipelineOptions {}

/**
 * GetRelayConfiguration operation options for the request
 */
export interface GetRelayConfigurationOptions extends OperationOptions {
  /**
   * The user for whom to issue a token
   */
  id?: string;

  /*
   * The specified routeType for the relay request
   */
  routeType?: RouteType;

  /*
   * The specified time to live for the relay credential in seconds
   */
  ttl?: number;
}
