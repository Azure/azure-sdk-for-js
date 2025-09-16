// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Library for integrating Azure Playwright with existing playwright projects.
 *
 * @packageDocumentation
 */

import { ServiceAuth, ServiceOS, ServiceEnvironmentVariable } from "./common/constants.js";
import type {
  OsType,
  AuthenticationType,
  BrowserConnectOptions,
  EndpointOptions,
  PlaywrightServiceAdditionalOptions,
} from "./common/types.js";
import { createAzurePlaywrightConfig, getConnectOptions } from "./core/playwrightService.js";

export {
  createAzurePlaywrightConfig,
  getConnectOptions,
  ServiceOS,
  ServiceAuth,
  ServiceEnvironmentVariable,
  OsType,
  AuthenticationType,
  BrowserConnectOptions,
  EndpointOptions,
  PlaywrightServiceAdditionalOptions,
};
