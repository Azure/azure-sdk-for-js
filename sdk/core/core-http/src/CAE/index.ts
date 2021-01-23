// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * CAEProperties represents known CAE challenge properties, with input examples on the comments.
 */
// eslint-disable-next-line @azure/azure-sdk/ts-no-namespaces
export namespace CAEProperties {
  // CAE - Insufficient Claims
  // Example: Bearer realm="", authorization_uri="https://login.microsoftonline.com/common/oauth2/authorize", client_id="00000003-0000-0000-c000-000000000000", error="insufficient_claims", claims="eyJhY2Nlc3NfdG9rZW4iOiB7ImZvbyI6ICJiYXIifX0="
  export type InsufficientClaims = "authorization_uri" | "client_id" | "error" | "claims" | "realm";

  // CAE - Sessions Revoked
  // Example: Bearer authorization_uri="https://login.windows-ppe.net/", error="invalid_token", error_description="User session has been revoked", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwgInZhbHVlIjoiMTYwMzc0MjgwMCJ9fX0="
  export type SessionRevoked = "authorization_uri" | "error" | "error_description" | "claims";

  // CAE - IP Policy
  // Example: Bearer authorization_uri="https://login.windows.net/", error="invalid_token", error_description="Tenant IP Policy validate failed.", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwidmFsdWUiOiIxNjEwNTYzMDA2In0sInhtc19ycF9pcGFkZHIiOnsidmFsdWUiOiIxLjIuMy40In19fQ"
  export type IPPolicy = "authorization_uri" | "error" | "error_description" | "claims";

  // CAE - Key Vault
  // Even though the service is moving to "scope", both "resource" and "scope" should be supported.
  // Example: Bearer authorization="https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47", resource="https://vault.azure.net", scope="https://some.url"
  export type KeyVault = "authorization" | "resource" | "scope";

  // CAE - ARM
  // Example: Bearer authorization_uri="https://login.windows.net/", error="invalid_token", error_description="The authentication failed because of missing \'Authorization\' header."
  export type ARM = "authorization_uri" | "error" | "error_description";
}

/**
 * CAEPropertiesAny represents any of the property sets,
 * so that they can be discoverable through the editor,
 * and also so that code using these types can pick which set of properties to use.
 */
export type CAEPropertiesAny =
  | CAEProperties.InsufficientClaims
  | CAEProperties.SessionRevoked
  | CAEProperties.IPPolicy
  | CAEProperties.KeyVault
  | CAEProperties.ARM;

/**
 * CAEChallenge represents the CAE Challenge in plan object form.
 */
export type CAEChallenge = Record<CAEPropertiesAny, string>;

/**
 * parseCAEChallenges Parses multiple challenges into an array of objects.
 */
export function parseCAEChallenges(challenges: string): CAEChallenge[] {
  if (!challenges) return [{} as CAEChallenge];

  // Each set of challenges will be separated by "Bearer ".
  return (
    challenges
      .split("Bearer ")
      // Keeping only the non-empty segments.
      .filter((x) => x)
      // Looping through each challenge.
      .map((challenge) =>
        // Each key-value pair in a challenge will be separated by a comma.
        challenge.split(",").reduce((accumulator, property) => {
          // We can safely split key-value pairs by the equal sign "=".
          const separatorPosition = property.indexOf("=");
          const key = property.slice(0, separatorPosition).trim();

          // Will slice out the equal and the surrounding quotes.
          const value = property.slice(separatorPosition + 2, -1).trim();

          accumulator[key as CAEPropertiesAny] = value;
          return accumulator;
        }, {} as CAEChallenge)
      )
  );
}
