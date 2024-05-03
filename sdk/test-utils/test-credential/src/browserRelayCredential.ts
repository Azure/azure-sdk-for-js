import { AccessToken, TokenCredential } from "@azure/core-auth";

/**
 * Options for creating a browser relay credential.
 */
export interface CreateBrowserRelayCredentialOptions {
  /**
   * The relay endpoint. Defaults to http://localhost:4343/token.
   */
  endpoint?: string;
}

/**
 * Create a credential that can be used in the browser to get tokens from a relay server.
 * This credential should be used in conjunction with the relay server provided by this package.
 *
 * @param options options for creating the credential.
 * @returns a credential which will use the relay endpoint to get access tokens.
 */
export function createBrowserRelayCredential(
  options: CreateBrowserRelayCredentialOptions = {}
): TokenCredential {
  const endpoint = options.endpoint ?? "http://localhost:4343/token";
  return {
    getToken: async (scopes, options) => {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scopes,
          options,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to get token from the relay server: ${response.statusText}`);
      }

      return (await response.json()) as AccessToken;
    },
  };
}
