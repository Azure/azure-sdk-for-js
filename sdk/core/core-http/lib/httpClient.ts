// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestPolicy } from "./policies/requestPolicy";

/**
 * HTTP proxy settings (Node.js only)
 */
export interface ProxySettings {
  host: string;
  port: number;
  username?: string;
  password?: string;
}

/**
 * Options to configure an HttpClient implementation.  Some options may
 * not be supported in all environments (browser, Node.js).
 */
export interface HttpClientOptions {
  /**
   * Proxy settings which will be used for every HTTP request (Node.js only).
   */
  proxySettings?: ProxySettings;

  /**
   * When true, keeps the TCP socket alive across multiple requests (Node.js only).
   */
  keepAlive?: boolean;
}

/**
 * An interface that can send HttpRequests and receive promised HttpResponses.
 */
export interface HttpClient extends RequestPolicy {}
