import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { env } from "./recorder";

// Async iterator's polyfill for Node 8
if (!Symbol || !Symbol.asyncIterator) {
  (Symbol as any).asyncIterator = Symbol.for("Symbol.asyncIterator");
}

export function getCredentialWithServicePrincipalSecret(): Promise<
  msRest.ServiceClientCredentials
> {
  const clientIdEnvVarName = "AAD_CLIENT_ID";
  const clientSecretEnvVarName = "AAD_CLIENT_SECRET";
  const tenantIdEnvVarName = "AAD_TENANT_ID";

  let clientId: string | undefined = env[clientIdEnvVarName];
  let clientSecret: string | undefined = env[clientSecretEnvVarName];
  let tenantId: string | undefined = env[tenantIdEnvVarName];

  if (!clientId || !clientSecret || !tenantId) {
    throw new Error(
      `${clientIdEnvVarName} and/or ${clientSecretEnvVarName} and/or ${tenantIdEnvVarName} environment variables not specified.`
    );
  }

  return msRestNodeAuth.loginWithServicePrincipalSecret(clientId, clientSecret, tenantId, {
    tokenAudience: "https://vault.azure.net"
  });
}

export function getKeyvaultName(): string {
  const keyVaultEnvVarName = "KEYVAULT_NAME";
  let keyVaultName: string | undefined = env[keyVaultEnvVarName];

  if (!keyVaultName) {
    throw new Error(`${keyVaultEnvVarName} environment variable not specified.`);
  }

  return keyVaultName;
}

function padStart(currentString: string, targetLength: number, padString: string = " "): string {
  // To run the tests under ts-node the compiler option { module: "commonjs" } is needed,
  // which prevent the usage of `padStart()`.
  // if (String.prototype.padStart) {
  //   return currentString.padStart(targetLength, padString);
  // }

  padString = padString || " ";
  if (currentString.length > targetLength) {
    return currentString;
  } else {
    targetLength = targetLength - currentString.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + currentString;
  }
}
