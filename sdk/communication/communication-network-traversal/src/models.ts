// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// delete this pipeline options
import { PipelineOptions } from "@azure/core-http";
import { CommunicationTurnServer } from "../src/generated/src/models";

/**
 * Client options used to configure the CommunicationNetworkTraversal API requests.
 */
export interface CommunicationRelayClientOptions extends PipelineOptions {}

/**
 * A TURN credentials response.
 */
export interface CommunicationRelayConfiguration {
  /**
   * The date for which the username and credentials are not longer valid.
   */
  expiresOn: Date;
  /**
   * An array representing the credentials and the TURN server URL.
   */
  turnServers: CommunicationTurnServer[];
}
