// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Library for integrating Microsoft Playwright Testing with existing playwright projects.
 *
 * @packageDocumentation
 */

import { ServiceAuth, ServiceOS, ServiceEnvironmentVariable } from "./common/constants.js";
import type {
  PlaywrightConfig,
  PlaywrightConfigInput,
  OsType,
  AuthenticationType,
  BrowserConnectOptions,
  MPTReporterConfig,
  EndpointOptions,
  ConnectOptions,
  PlaywrightServiceAdditionalOptions,
} from "./common/types.js";
import { getServiceConfig, getConnectOptions } from "./core/playwrightService.js";

export {
  getServiceConfig,
  getConnectOptions,
  ServiceOS,
  ServiceAuth,
  ServiceEnvironmentVariable,
  PlaywrightConfig,
  PlaywrightConfigInput,
  OsType,
  AuthenticationType,
  BrowserConnectOptions,
  EndpointOptions,
  ConnectOptions,
  MPTReporterConfig,
  PlaywrightServiceAdditionalOptions,
};
