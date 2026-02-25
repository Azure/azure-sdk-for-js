// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConnectOptions } from "@playwright/test";
import type { ServiceAuth, ServiceOS, SDKLanguage } from "./constants.js";
import type { TokenCredential } from "@azure/identity";
import { CIInfo } from "../utils/cIInfoProvider.js";

// Public APIs

/**
 * @public
 *
 * Endpoint options for the service.
 */
export type EndpointOptions = {
  /**
   * @public
   *
   * A browser websocket endpoint to connect to.
   */
  wsEndpoint: string;
};

/**
 * @public
 *
 * Browser connect options for the service. This includes endpoint options and connect options.
 *
 * @example
 * ```
 * import playwright, { test, expect, BrowserType } from "@playwright/test";
 * import { getConnectOptions, BrowserConnectOptions } from "@azure/playwright";
 *
 * test("has title", async ({ browserName }) => {
 *  const { wsEndpoint, options } : BrowserConnectOptions = await getConnectOptions();
 *  const browser = await (playwright[browserName] as BrowserType).connect(wsEndpoint, options);
 *  const context = await browser.newContext();
 *  const page = await context.newPage();
 *
 *  await page.goto("https://playwright.dev/");
 *  await expect(page).toHaveTitle(/Playwright/);
 *
 *  await page.close();
 *  await context.close();
 *  await browser.close();
 * });
 * ```
 */
export type BrowserConnectOptions = EndpointOptions & {
  options: ConnectOptions;
};

/**
 * @public
 *
 * Additional options for the service.
 */
export type PlaywrightServiceAdditionalOptions = {
  /**
   * @public
   *
   * Authentication types supported by Azure Playwright.
   *
   * @defaultValue  `ENTRA_ID`
   */
  serviceAuthType?: AuthenticationType;

  /**
   * @public
   *
   * Operating system types supported by Azure Playwright.
   *
   * @defaultValue  `linux`
   */
  os?: OsType;

  /**
   * @public
   *
   * Run id for the test run.
   *
   * @defaultValue `current datetime as ISO string`
   */
  runId?: string;

  /**
   * @public
   *
   * Maximum time in milliseconds to wait for the connection to be established.
   *
   * @defaultValue `30000`
   */
  connectTimeout?: number;

  /**
   * @public
   *
   * Slows down Playwright operations by the specified amount of milliseconds.
   *
   * @defaultValue `0`
   */
  slowMo?: number;

  /**
   * @public
   *
   * Exposes network available on the connecting client to the browser being connected to.
   *
   * @defaultValue `<loopback>`
   */
  exposeNetwork?: string;

  /**
   * @public
   *
   * Custom token credential for Entra ID authentication. Learn more at {@link https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/using-azure-identity.md | Using Azure Identity}.
   *
   * @defaultValue `DefaultAzureCredential`
   */
  credential?: TokenCredential;
  /**
   * @public
   *
   * Run name for the test run.
   *
   * @defaultValue `guid`
   */
  runName?: string;

  /**
   * @public
   *
   * API Version
   *
   * @defaultValue `2025-09-01`
   */
  apiVersion?: "2025-09-01";
};

/**
 * @public
 *
 * OS Types supported by Azure Playwright.
 */
export type OsType = (typeof ServiceOS)[keyof typeof ServiceOS];

/**
 * @public
 *
 * Authentication types supported by Azure Playwright.
 */
export type AuthenticationType = (typeof ServiceAuth)[keyof typeof ServiceAuth];

// Internal APIs

export type JwtPayload = {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
};

export type AccessTokenClaims = JwtPayload & {
  pwid?: string;
};

export type VersionInfo = {
  major: number;
  minor: number;
  patch: number;
};

export type PackageManager = {
  runCommand: (command: string, args: string) => string;
  getVersionFromStdout: (stdout: string) => string;
};

export type RunConfig = {
  framework?: RunFramework;
  sdkLanguage?: (typeof SDKLanguage)[keyof typeof SDKLanguage];
  maxWorkers?: number;
};

export type RunFramework = {
  name?: string;
  version?: string;
  runnerName?: string;
};

export type TestRunCreatePayload = {
  displayName: string;
  config?: RunConfig;
  ciConfig?: CIInfo;
};

export type WorkspaceMetaData = {
  id?: string;
  resourceId?: string;
  name?: string;
  state?: string;
  subscriptionId?: string;
  subscriptionState?: string;
  tenantId?: string;
  location?: string;
  regionalAffinity?: string;
  localAuth?: string;
  storageUri?: string;
  reporting?: string;
};

export type TenantInfo = {
  tenantId?: string;
  defaultDomain?: string;
};

export interface UploadResult {
  success: boolean;
  errorMessage?: string;
  failedFileCount?: number;
  totalFiles?: number;
  failedFiles?: string[];
  failedFileDetails?: Array<{ fileName: string; error: string }>;
  partialSuccess?: boolean;
}
