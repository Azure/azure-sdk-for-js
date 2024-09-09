// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Location, TestStep } from "@playwright/test/reporter";
import { ServiceAuth, ServiceOS } from "./constants";
import type { TokenCredential } from "@azure/identity";

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
  aid?: string;
  accountId?: string;
};

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
 * Connect options for the service.
 */
export type ConnectOptions = {
  /**
   * @public
   *
   * Additional HTTP headers to be sent with web socket connect request.
   */
  headers?: { [key: string]: string };

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
   * Maximum time in milliseconds to wait for the connection to be established.
   *
   * @defaultValue `30000`
   */
  timeout?: number;

  /**
   * @public
   *
   * Slows down Playwright operations by the specified amount of milliseconds.
   *
   * @defaultValue `0`
   */
  slowMo?: number;
};

/**
 * @public
 *
 * Browser connect options for the service. This includes endpoint options and connect options.
 *
 * @example
 * ```
 * import playwright, { test, expect, BrowserType } from "@playwright/test";
 * import { getConnectOptions } from "@azure/microsoft-playwright-testing";
 * 
 * test("has title", async ({ browserName }) => {
 *  const { wsEndpoint, options } = await getConnectOptions();
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
 * Base playwright configuration inputs required for generating the service config.
 */
export type PlaywrightConfigInput = {
  /**
   * @public
   *
   * Path to the global setup file. This file will be required and run before all the tests. It must export a single
   * function that takes a [`TestConfig`] argument.
   *
   * Learn more about {@link https://playwright.dev/docs/test-global-setup-teardown | global setup and teardown}.
   */
  globalSetup?: string;

  /**
   * @public
   *
   * Path to the global teardown file. This file will be required and run after all the tests. It must export a single
   * function. See also
   * {@link https://playwright.dev/docs/api/class-testconfig#test-config-global-teardown | testConfig.globalTeardown}.
   *
   * Learn more about {@link https://playwright.dev/docs/test-global-setup-teardown | global setup and teardown}.
   */
  globalTeardown?: string;
};

/**
 * @public
 *
 * Playwright configuration integrated with Microsoft Playwright Testing.
 *
 * @remarks
 *
 * GlobalSetup and globalTeardown wraps around any existing global setup
 * and teardown present in the base playwright configuration and runs it.
 */
export type PlaywrightConfig = {
  use?: {
    connectOptions: BrowserConnectOptions;
  };
  globalSetup?: string;
  globalTeardown?: string;
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
   * Authentication types supported by Microsoft Playwright Testing.
   *
   * @defaultValue  `ENTRA_ID`
   */
  serviceAuthType?: AuthenticationType;

  /**
   * @public
   *
   * Operating system types supported by Microsoft Playwright Testing.
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
  timeout?: number;

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
   * Use cloud hosted browsers.
   *
   * @defaultValue `false`
   */
  useCloudHostedBrowsers?: boolean;

  /**
   * @public
   *
   * Custom token credential for Entra ID authentication. Learn more at {@link https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/using-azure-identity.md | Using Azure Identity}.
   *
   * @defaultValue `DefaultAzureCredential`
   */
  credential?: TokenCredential;
};

/**
 * @public
 *
 * OS Types supported by Microsoft Playwright Testing.
 */
export type OsType = (typeof ServiceOS)[keyof typeof ServiceOS];

/**
 * @public
 *
 * Authentication types supported by Microsoft Playwright Testing.
 */
export type AuthenticationType = (typeof ServiceAuth)[keyof typeof ServiceAuth];

export type ErrorDetails = {
  message: string;
  location?: Location;
};
export type ApiErrorMessage = {
  [key: string]: {
    [key: number]: string;
  };
};
/**
 * @public
 *
 * Optional configuration for MPT Reporter.
 *
 * @example
 *
 * ```
 * import { defineConfig } from "@playwright/test";
 *
 * export default defineConfig({
 *  reporter: [["@azure/microsoft-playwright-testing/reporter", {
 *   enableGitHubSummary: true
 *  }]],
 * });
 * ```
 */
export interface MPTReporterConfig {
  /**
   * @public
   *
   * Enable GitHub Actions annotations to diagnose test failures and deep link to MPT Portal.
   *
   * @defaultValue `true`
   */
  enableGitHubSummary?: boolean;

  /**
   * @public
   *
   * Enable result publishing for the test run. This will upload the test result and artifacts to the MPT Portal.
   *
   * @defaultValue `true`
   */
  enableResultPublish?: boolean;
}
export type DedupedStep = { step: TestStep; count: number; duration: number };

export type RawTestStep = {
  title: string;
  category: string;
  startTime: string;
  duration: number;
  error?: string;
  steps: RawTestStep[];
  location?: Location;
  snippet?: string;
  count: number;
};

export type IBackOffOptions = {
  numOfAttempts: number;
  retry: (e: any, attemptNumber: number) => boolean | Promise<boolean>;
  jitter: JitterType;
};

export type JitterType = "full" | "none";

export type VersionInfo = {
  major: number;
  minor: number;
  patch: number;
};

export type PackageManager = {
  runCommand: (command: string, args: string) => string;
  getVersionFromStdout: (stdout: string) => string;
};

// Playwright OSS Types

export interface FullConfig {
  configFile?: string;
}
