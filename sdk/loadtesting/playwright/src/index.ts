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
import { getServiceConfig, getConnectOptions } from "./core/playwrightService.js";

export {
  getServiceConfig,
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
