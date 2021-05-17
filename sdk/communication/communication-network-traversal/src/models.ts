// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// delete this pipeline options
import { PipelineOptions } from "@azure/core-http";

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

/**
 * An instance of a TURN server with credentials.
 */
export interface CommunicationTurnServer {
  /**
   * List of TURN server URLs.
   */
  urls: string[];
  /**
   * User account name which uniquely identifies the credentials.
   */
  username: string;
  /**
   * Credential for the server.
   */
  credential: string;
}
