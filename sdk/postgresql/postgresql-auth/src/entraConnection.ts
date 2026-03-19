// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { logger } from "./logger.js";

/**
 * Options for {@link getEntraTokenPassword}.
 */
export interface GetEntraTokenPasswordOptions {
  /**
   * The OAuth scope to request. Defaults to the Azure Database for
   * PostgreSQL scope (`https://ossrdbms-aad.database.windows.net/.default`).
   */
  scope?: string;
}

/**
 * Options for configuring Entra ID authentication with Sequelize.
 */
export interface ConfigureEntraIdAuthOptions {
  /**
   * Fallback username to use if the token does not contain a `upn` or `appid` claim.
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
 * @returns The same Sequelize instance, for chaining.
 *
 * @example
 * ```ts snippet:ConfigureEntraIdAuth
 * import { Sequelize } from "sequelize";
 * import { DefaultAzureCredential } from "@azure/identity";
 * import { configureEntraIdAuth } from "@azure/postgresql-auth";
 *
 * const sequelize = new Sequelize({
 *   dialect: "postgres",
 *   host: process.env.PGHOST,
 *   port: Number(process.env.PGPORT || 5432),
 *   database: process.env.PGDATABASE,
 * });
 *
 * const credential = new DefaultAzureCredential();
 * configureEntraIdAuth(sequelize, credential);
 * await sequelize.authenticate();
 * ```
 */
export function configureEntraIdAuth(
  sequelizeInstance: {
    beforeConnect: (
      callback: (config: { username?: string; password?: string }) => Promise<void>,
    ) => void;
  },
  credential: TokenCredential,
  options: ConfigureEntraIdAuthOptions = {},
): typeof sequelizeInstance {
  if (!credential) {
    throw new Error("credential is required");
  }
  const { fallbackUsername } = options;

  // Runs before every new connection is created by Sequelize
  sequelizeInstance.beforeConnect(async (config: { username?: string; password?: string }) => {
    logger.info("Fetching Entra ID access token...");
    const token = await getEntraTokenPassword(credential);

    // Derive username from token if you want (optional):
    const claims = decodeJwtToken(token);
    const derivedUser = claims?.upn || claims?.appid || fallbackUsername || process.env.PGUSER;
    if (!derivedUser) {
      throw new Error("Could not determine DB username");
    }

    config.username = derivedUser; // must match an AAD-mapped role in Postgres
    config.password = token; // raw token, no "Bearer "
  });

  return sequelizeInstance;
}

/**
 * Acquires an Entra ID access token suitable for use as a PostgreSQL password.
 *
 * This function requests a token from the provided {@link TokenCredential} using
 * the Azure Database for PostgreSQL scope. The returned token string can be used
 * directly as the `password` parameter for `pg.Client`, `pg.Pool`, or similar
 * PostgreSQL client configurations.
 *
 * @param credential - An Azure {@link TokenCredential} used to acquire tokens
 *   (e.g., `DefaultAzureCredential`).
 * @param options - Optional settings such as a custom OAuth scope.
 * @returns A promise that resolves to the access token string.
 *
 * @example
 * ```ts snippet:GetEntraTokenPassword
 * import pg from "pg";
 * import { DefaultAzureCredential } from "@azure/identity";
 * import { getEntraTokenPassword } from "@azure/postgresql-auth";
 *
 * const credential = new DefaultAzureCredential();
 * const pool = new pg.Pool({
 *   host: process.env.PGHOST,
 *   port: Number(process.env.PGPORT || 5432),
 *   database: process.env.PGDATABASE,
 *   user: process.env.PGUSER,
 *   password: () => getEntraTokenPassword(credential),
 *   ssl: { rejectUnauthorized: false },
 * });
 * ```
 */
export async function getEntraTokenPassword(
  credential: TokenCredential,
  options: GetEntraTokenPasswordOptions = {},
): Promise<string> {
  if (!credential) {
    throw new Error("credential is required");
  }
  const { scope = DEFAULT_SCOPE } = options;
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
}
