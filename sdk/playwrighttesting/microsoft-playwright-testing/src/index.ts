// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Library for integrating Microsoft Playwright Testing with existing playwright projects.
 *
 * @packageDocumentation
 */

import { ServiceAuth, ServiceOS, ServiceEnvironmentVariable } from "./common/constants";
import type {
  OsType,
  AuthenticationType,
  BrowserConnectOptions,
  MPTReporterConfig,
  EndpointOptions,
  ConnectOptions,
  PlaywrightServiceAdditionalOptions,
} from "./common/types";
import { getServiceConfig, getConnectOptions } from "./core/playwrightService";

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
  ConnectOptions,
  MPTReporterConfig,
  PlaywrightServiceAdditionalOptions,
};
