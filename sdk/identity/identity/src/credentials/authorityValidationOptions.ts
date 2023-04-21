// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Provides options to configure how the Identity library
 * does authority validation during authentication requests
 * to Azure Active Directory.
 */
export interface AuthorityValidationOptions {
  /**
   * The field determines whether or not instance discovery is performed when attempting to authenticate. 
   * Setting this to `true` will completely disable both instance discovery and authority validation.
   * This functionality is intended for use in scenarios where the metadata endpoint cannot be reached, such as in private clouds or Azure Stack.
   * The process of instance discovery entails retrieving authority metadata from https://login.microsoft.com/ to validate the authority.
   * By setting this to `true`, the validation of the authority is disabled.
   * As a result, it is crucial to ensure that the configured authority host is valid and trustworthy.
   */
  disableAuthorityValidationAndInstanceDiscovery?: boolean;
}
