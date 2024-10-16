// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { BrokerOptions } from "../msal/nodeFlows/brokerOptions";

/**
 * Configuration options for InteractiveBrowserCredential
 * to support WAM Broker Authentication.
 */

export interface BrokerAuthOptions {
  /**
   * Options to allow broker authentication when using InteractiveBrowserCredential
   *
   */
  brokerOptions?: BrokerOptions;
}
