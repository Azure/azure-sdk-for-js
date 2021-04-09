/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.
*/
import { InteractiveBrowserCredential } from "@azure/identity";

export function getEnvironmentVariable(name: string): string {
  const value = process.env[name.toUpperCase()] || process.env[name.toLowerCase()];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined.`);
  }
  return value;
}

const clientId = getEnvironmentVariable("REACT_APP_AZURE_CLIENT_ID");
const tenantId = getEnvironmentVariable("REACT_APP_AZURE_TENANT_ID");

export const credential = new InteractiveBrowserCredential({ clientId, tenantId });
