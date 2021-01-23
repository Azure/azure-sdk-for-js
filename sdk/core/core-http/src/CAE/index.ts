// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * CAEProperties represents known CAE challenge properties, with input examples on the comments.
 */
// eslint-disable-next-line @azure/azure-sdk/ts-no-namespaces
export namespace CAEProperties {
  /**
   * CAE - Insufficient Claims
   * Example: Bearer realm="", authorization_uri="https://login.microsoftonline.com/common/oauth2/authorize", client_id="00000003-0000-0000-c000-000000000000", error="insufficient_claims", claims="eyJhY2Nlc3NfdG9rZW4iOiB7ImZvbyI6ICJiYXIifX0="
   */
  export type InsufficientClaims = "authorization_uri" | "client_id" | "error" | "claims" | "realm";
  /**
   * CAE - Sessions Revoked
   * Example: Bearer authorization_uri="https://login.windows-ppe.net/", error="invalid_token", error_description="User session has been revoked", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwgInZhbHVlIjoiMTYwMzc0MjgwMCJ9fX0="
   */
  export type SessionRevoked = "authorization_uri" | "error" | "error_description" | "claims";
  /**
   * CAE - IP Policy
   * Example: Bearer authorization_uri="https://login.windows.net/", error="invalid_token", error_description="Tenant IP Policy validate failed.", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwidmFsdWUiOiIxNjEwNTYzMDA2In0sInhtc19ycF9pcGFkZHIiOnsidmFsdWUiOiIxLjIuMy40In19fQ"
   */
  export type IPPolicy = "authorization_uri" | "error" | "error_description" | "claims";
  /**
   * CAE - Key Vault with the resource property.
   * Even though the service is moving to "scope", both "resource" and "scope" should be supported.
   * Example: Bearer authorization="https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47", resource="https://vault.azure.net"
   */
  export type KeyVaultResource = "authorization" | "resource";
  /**
   * CAE - Key Vault with the scope property.
   * Even though the service is moving to "scope", both "resource" and "scope" should be supported.
   * Example: Bearer authorization="https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47", scope="https://some.url"
   */
  export type KeyVaultScope = "authorization" | "scope";
  /**
   * CAE - ARM
   * Example: Bearer authorization_uri="https://login.windows.net/", error="invalid_token", error_description="The authentication failed because of missing \'Authorization\' header."
   */
  export type ARM = "authorization_uri" | "error" | "error_description";
}

/**
 * Group of strict representation of the known CAE challenges, in their plain object form.
 */
// eslint-disable-next-line @azure/azure-sdk/ts-no-namespaces
export namespace CAEParsed {
  /**
   * CAE - Insufficient Claims
   */
  export type InsufficientClaims = Record<CAEProperties.InsufficientClaims, string>;
  /**
   * CAE - Sessions Revoked
   */
  export type SessionRevoked = Record<CAEProperties.SessionRevoked, string>;
  /**
   * CAE - IP Policy
   */
  export type IPPolicy = Record<CAEProperties.IPPolicy, string>;
  /**
   * CAE - Key Vault with the resource property.
   */
  export type KeyVaultResource = Record<CAEProperties.KeyVaultResource, string>;
  /**
   * CAE - Key Vault with the scope property.
   */
  export type KeyVaultScope = Record<CAEProperties.KeyVaultScope, string>;
  /**
   * CAE - Key Vault
   */
  export type KeyVault = KeyVaultResource | KeyVaultScope;
  /**
   * CAE - ARM
   */
  export type ARM = Record<CAEProperties.ARM, string>;
}

/**
 * CAEPropertiesAny represents any known set of properties for a CAE challenge.
 */
export type CAEPropertiesAny =
  | CAEProperties.InsufficientClaims
  | CAEProperties.SessionRevoked
  | CAEProperties.IPPolicy
  | CAEProperties.KeyVaultResource
  | CAEProperties.KeyVaultScope
  | CAEProperties.ARM;

/**
 * Strict representation of either of the known challenges.
 */
export type CAEChallengeEither =
  | CAEParsed.InsufficientClaims
  | CAEParsed.SessionRevoked
  | CAEParsed.IPPolicy
  | CAEParsed.KeyVault
  | CAEParsed.ARM;

/**
 * Loose representation of a CAE challenge. Any known property accepted.
 */
export type CAEChallengeAny = Record<CAEPropertiesAny, string>;

/**
 * parseCAEChallenges Parses multiple challenges into an array of objects.
 */
export function parseCAEChallenges(challenges: string): CAEChallengeEither[] {
  if (!challenges) return [{} as CAEChallengeEither];

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
          property = property.trim();
          if (!property) return accumulator;

          // We can safely split key-value pairs by the equal sign "=".
          const separatorPosition = property.indexOf("=");
          const key = property.slice(0, separatorPosition);

          // Will slice out the equal and the surrounding quotes.
          const value = property.slice(separatorPosition + 2, -1);

          const vagueAccumulator = accumulator as CAEChallengeAny;
          vagueAccumulator[key as CAEPropertiesAny] = value;
          return accumulator;
        }, {} as CAEChallengeAny)
      )
  );
}
