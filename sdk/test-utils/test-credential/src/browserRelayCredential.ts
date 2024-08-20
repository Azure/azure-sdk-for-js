// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { CreateTestCredentialOptions, DefaultAzureCredentialCombinedOptions } from ".";

/**
 * Authentication error thrown when the relay server could not authenticate.
 */
export class RelayAuthenticationError extends Error {
  constructor(
    message: string,
    public cause?: unknown,
  ) {
    super(message);
    this.name = "RelayAuthenticationError";
  }
}

/**
 * Ask the relay server to create a credential
 * @param relayServer Relay server URL
 * @returns id of the created credential, to be passed back to the relay when calling getToken
 */
async function createCredential(
  relayServer: string,
  options: DefaultAzureCredentialCombinedOptions = {},
): Promise<string> {
  const response = await fetch(`${relayServer}credential/`, {
    method: "PUT",
    body: JSON.stringify(options),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    if (response.status === 400) {
      // Throw the error that the relay received
      throw new RelayAuthenticationError(
        "Relay could not create credential",
        ((await response.json()) as { error: unknown }).error,
      );
    }

    throw new RelayAuthenticationError(
      `Relay could not create credential: got error code ${response.status}`,
    );
  }

  return ((await response.json()) as { id: string }).id;
}

/**
 * Get a token from the relay
 * @param relayServer Relay server URL
 * @param credentialId ID of the credential (created using createCredential) to get the token with
 * @param scopes Scopes
 * @param options Credential options to be passed to getToken
 * @returns Access token from the relay
 */
async function getTokenFromRelay(
  relayServer: string,
  credentialId: string,
  scopes: string | string[],
  options: GetTokenOptions = {},
): Promise<AccessToken> {
  const params = new URLSearchParams({
    scopes,
    options: JSON.stringify(options),
  });

  const response = await fetch(`${relayServer}credential/${credentialId}/token?${params}`);

  if (!response.ok) {
    if (response.status === 400) {
      const error = await response.json();
      console.log("Error received", error);
      // Throw the error that the relay received
      throw new RelayAuthenticationError(
        "Relay was unable to get token",
        ((error) as { error: unknown }).error,
      );
    }

    throw new RelayAuthenticationError(
      `Could not get token from relay server: got error code ${response.status}`,
    );
  }

  return (await response.json()) as AccessToken;
}

/**
 * Create a credential that can be used in the browser to get tokens from a relay server.
 * This credential should be used in conjunction with the relay server provided by the dev-tool package.
 *
 * @param options options for creating the credential.
 * @returns a credential which will use the relay endpoint to get access tokens.
 */
export function createBrowserRelayCredential(
  options: CreateTestCredentialOptions = {},
): TokenCredential {
  let credentialId: string | undefined = undefined;

  const { browserRelayServerUrl = "http://localhost:4895/", ...dacOptions } = options;

  return {
    async getToken(scopes, getTokenOptions) {
      if (!credentialId) {
        credentialId = await createCredential(browserRelayServerUrl, dacOptions);
      }

      return await getTokenFromRelay(browserRelayServerUrl, credentialId, scopes, getTokenOptions);
    },
  };
}
