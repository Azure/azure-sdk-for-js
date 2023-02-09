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

// Avoid situation where instanceDiscovery is undefined and the condition for false is satisfied
export function setDefaultInstanceDisovery(instanceDiscovery?: boolean): boolean {
  return instanceDiscovery === false ? false : true;
}
