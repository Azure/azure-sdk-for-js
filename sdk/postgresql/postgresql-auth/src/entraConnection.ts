// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { logger } from "./logger.js";

/**
 * Options for {@link entraTokenProvider}.
 */
export interface EntraTokenProviderOptions  {
  /**
   * The OAuth scope to request. Defaults to the Azure Database for
   * PostgreSQL scope (`https://ossrdbms-aad.database.windows.net/.default`).
   */
  scope?: string | string[];
}

/**
 * Options for configuring Entra ID authentication with Sequelize.
 */
export interface ConfigureEntraAuthenticationOptions {
  /**
   * Fallback username to use when the access token does not contain a usable `upn` or `appid` claim.
   *
   * The database username is resolved in the following order:
   * 1. `upn` claim from the access token (if present).
   * 2. `appid` claim from the access token (if present).
   * 3. This `fallbackUsername` option (if provided).
   * 4. The `PGUSER` environment variable (`process.env.PGUSER`), if set.
   *
   * If none of these values are available, an error is thrown because the username
   * cannot be determined.
   */
  fallbackUsername?: string;
}

/**
 * The default scope used for acquiring tokens for Azure Database for PostgreSQL.
 */
const DEFAULT_SCOPE = "https://ossrdbms-aad.database.windows.net/.default";

/**
 * Decoded JWT token payload with optional claims used for deriving the database username.
 */
interface DecodedJwtPayload {
  upn?: string;
  appid?: string;
  [key: string]: unknown;
}

/**
 * A structural type representing a Sequelize-like instance that supports
 * the `beforeConnect` lifecycle hook. This avoids a hard dependency on the
 * `sequelize` package while still providing type safety.
 */
export interface SequelizeBeforeConnectHook {
  /**
   * Registers a callback that runs before each new database connection.
   */
  beforeConnect: (
    callback: (config: { username?: string; password?: string }) => Promise<void>,
  ) => void;
}

/**
 * Decodes a JWT token to extract the payload claims.
 *
 * @param token - The JWT access token string.
 * @returns The decoded payload, or `null` if decoding fails.
 */
function decodeJwtToken(token: string): DecodedJwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT token format");
    }

    const payload = parts[1];
    // Add padding if needed for base64 decoding
    const paddedPayload = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const decodedPayload = Buffer.from(paddedPayload, "base64url").toString("utf8");

    return JSON.parse(decodedPayload) as DecodedJwtPayload;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error(`Error decoding JWT token: ${message}`);
    return null;
  }
}

/**
 * Configures a Sequelize instance to use Entra ID authentication.
 *
 * This function registers a `beforeConnect` hook on the Sequelize instance that
 * automatically acquires an Entra ID token before each new database connection.
 * The hook extracts the username from the JWT token claims (`upn` or `appid`)
 * and sets both the username and password on the connection config.
 *
 * @param sequelizeInstance - The Sequelize instance to configure. Must support the
 *   `beforeConnect` lifecycle hook.
 * @param credential - An Azure {@link TokenCredential} used to acquire tokens
 *   (e.g., `DefaultAzureCredential`).
 * @param options - Optional configuration for the authentication behavior.
 *
 * @example
 * ```ts snippet:configureEntraAuthentication
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const { configureEntraAuthentication } = await import("@azure/postgresql-auth");
 * const { Sequelize } = await import("sequelize");
 * const sequelize = new Sequelize({
 *   dialect: "postgres",
 *   host: process.env.PGHOST,
 *   port: Number(process.env.PGPORT || 5432),
 *   database: process.env.PGDATABASE,
 * });
 * const credential = new DefaultAzureCredential();
 * configureEntraAuthentication(sequelize, credential);
 * await sequelize.authenticate();
 * ```
 */
export function configureEntraAuthentication(
  sequelizeInstance: SequelizeBeforeConnectHook,
  credential: TokenCredential,
  options: ConfigureEntraAuthenticationOptions = {},
): void {
  if (!credential) {
    throw new Error("credential is required");
  }
  const { fallbackUsername } = options;

  // Runs before every new connection is created by Sequelize
  sequelizeInstance.beforeConnect(async (config: { username?: string; password?: string }) => {
    logger.info("Fetching Entra ID access token...");
    const token = await entraTokenProvider(credential)();

    // Derive username from token if you want (optional):
    const claims = decodeJwtToken(token);
    const derivedUser = claims?.upn || claims?.appid || fallbackUsername || process.env.PGUSER;
    if (!derivedUser) {
      throw new Error("Could not determine DB username");
    }

    config.username = derivedUser; // must match an AAD-mapped role in Postgres
    config.password = token; // raw token, no "Bearer "
  });
}

/**
 * Creates a password provider function that acquires an Entra ID access token
 * suitable for use as a PostgreSQL password.
 *
 * This function returns a callback that, when invoked, requests a token from the
 * provided {@link TokenCredential} using the Azure Database for PostgreSQL scope.
 * The returned callback can be passed directly as the `password` option for
 * `pg.Client`, `pg.Pool`, or similar PostgreSQL client configurations.
 *
 * @param credential - An Azure {@link TokenCredential} used to acquire tokens
 *   (e.g., `DefaultAzureCredential`).
 * @param options - Optional settings such as a custom OAuth scope.
 * @returns A function that, when called, returns a promise resolving to the access token string.
 *
 * @example
 * ```ts snippet:entraTokenProvider
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const { entraTokenProvider } = await import("@azure/postgresql-auth");
 * const pg = await import("pg");
 * const credential = new DefaultAzureCredential();
 * const pool = new pg.Pool({
 *   host: process.env.PGHOST,
 *   port: Number(process.env.PGPORT || 5432),
 *   database: process.env.PGDATABASE,
 *   user: process.env.PGUSER,
 *   password: entraTokenProvider(credential),
 *   ssl: { rejectUnauthorized: true },
 * });
 * ```
 */
export function entraTokenProvider(
  credential: TokenCredential,
  options: EntraTokenProviderOptions = {},
): () => Promise<string> {
  const { scope = DEFAULT_SCOPE } = options;
  return async () => {
    if (!credential) {
      throw new Error("credential is required");
    }
    try {
      const t = await credential.getToken(scope);
      if (!t?.token) {
        throw new Error("Failed to acquire Entra ID token");
      }
      return t.token;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      logger.error(`Token acquisition failed: ${message}`);
      throw error;
    }
  };
}
