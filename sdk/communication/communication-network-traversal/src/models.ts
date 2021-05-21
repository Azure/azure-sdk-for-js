// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// delete this pipeline options
import { PipelineOptions } from "@azure/core-http";
import { CommunicationTurnCredentialsResponse } from "../src/generated/src/models";

export type CommunicationRelayConfiguration = CommunicationTurnCredentialsResponse;

/**
 * Client options used to configure the CommunicationNetworkTraversal API requests.
 */
export interface CommunicationRelayClientOptions extends PipelineOptions {}
