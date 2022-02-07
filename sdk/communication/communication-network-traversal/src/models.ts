// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// delete this pipeline options
import { OperationOptions, PipelineOptions } from "@azure/core-http";

/**
 * Client options used to configure the CommunicationNetworkTraversal API requests.
 */
export interface CommunicationRelayClientOptions extends PipelineOptions {}

/**
 * GetRelayConfiguration operation options for the request
 */
export interface GetRelayConfigurationOptions extends OperationOptions {}
