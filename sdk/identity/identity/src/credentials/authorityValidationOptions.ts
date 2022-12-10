// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Provides options to configure how the Identity library
 * does authority validation during authentication requests
 * to Azure Active Directory.
 */
export interface AuthorityValidationOptions {
  instanceDiscovery?: boolean;
}
