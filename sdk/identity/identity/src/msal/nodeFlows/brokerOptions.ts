// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * Parameters that enable WAM broker authentication in the InteractiveBrowserCredential.
 */
export type BrokerOptions = BrokerEnabledOptions | BrokerDisabledOptions;

/**
 * Parameters when WAM broker authentication is disabled.
 */
export interface BrokerDisabledOptions {
  /**
   * If set to true, broker will be enabled for WAM support on Windows
   */
  enabled: false;

  /**
   * If set to true, MSA account will be passed through, required for WAM authentication.
   */
  legacyEnableMSAPassthrough?: undefined;
  /**
   * Window handle for parent window, required for WAM authentication
   */
  parentWindowHandle: undefined;
}

/**
 * Parameters when WAM broker authentication is enabled.
 */
export interface BrokerEnabledOptions {
  /**
   * If set to true, broker will be enabled for WAM support on Windows
   */
  enabled: true;
  /**
   * If set to true, MSA account will be passed through, required for WAM authentication.
   */
  legacyEnableMSAPassthrough?: boolean;
  /**
   * Window handle for parent window, required for WAM authentication
   */
  parentWindowHandle: Uint8Array;
}
