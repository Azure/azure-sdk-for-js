// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { AuthenticationRecord } from "./authentication";

/**
 * Defines options for the DeviceCodeCredential class.
 */
export interface DeviceCodeCredentialOptions extends TokenCredentialOptions {
  /**
   * The cache options to use when credentials are being checked.
   */
  cacheOptions?: {
    cachePlugin?: {
      readFromStorage: () => Promise<string>;
      writeToStorage: (getMergedState: (oldState: string) => string) => Promise<void>;
    };
  };

  /**
   * The authentication record to use to find existing tokens in the cache
   */
  authenticationRecord?: AuthenticationRecord;
}
