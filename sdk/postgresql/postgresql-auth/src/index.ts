// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Provides helpers for configuring Microsoft Entra ID authentication and acquiring
 * access tokens for Azure Database for PostgreSQL connections.
 *
 * This package is intended to be used by higher-level PostgreSQL clients that need
 * to authenticate using Microsoft Entra ID (formerly Azure Active Directory).
 *
 * @packageDocumentation
 */
export { configureEntraAuthentication, entraTokenProvider } from "./entraConnection.js";
export type {
  ConfigureEntraIdAuthOptions,
  GetEntraTokenPasswordOptions,
  SequelizeBeforeConnectHook,
} from "./entraConnection.js";
