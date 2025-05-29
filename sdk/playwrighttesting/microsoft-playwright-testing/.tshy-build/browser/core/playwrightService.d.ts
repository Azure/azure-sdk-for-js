import type { PlaywrightServiceAdditionalOptions, BrowserConnectOptions } from "../common/types.js";
import type { PlaywrightTestConfig } from "@playwright/test";
/**
 * @public
 *
 * Generate playwright configuration integrated with Microsoft Playwright Testing.
 *
 * @param config - base playwright configuration
 * @param options - additional options for the service
 * @returns PlaywrightConfig
 *
 * @example
 * ```
 * import { defineConfig } from "playwright/test";
 * import { getServiceConfig } from "@azure/microsoft-playwright-testing";
 * import playwrightConfig from "./playwright.config";
 *
 * export default defineConfig(playwrightConfig, getServiceConfig(playwrightConfig));
 * ```
 *
 * @example
 * ```
 * import { defineConfig } from "playwright/test";
 * import { getServiceConfig, ServiceOS } from "@azure/microsoft-playwright-testing";
 * import playwrightConfig from "./playwright.config";
 *
 * export default defineConfig(playwrightConfig, getServiceConfig(playwrightConfig, {
 *  runId: "custom run id",
 *  os: ServiceOS.WINDOWS
 * }));
 * ```
 */
declare const getServiceConfig: (config: PlaywrightTestConfig, options?: PlaywrightServiceAdditionalOptions) => PlaywrightTestConfig;
/**
 * @public
 *
 * Get connect options required to connect to Microsoft Playwright Testing's cloud hosted browsers.
 *
 * @param options - additional options for the service
 * @returns BrowserConnectOptions
 *
 * @example
 * ```
 * import playwright, { test, expect, BrowserType } from "@playwright/test";
 * import { getConnectOptions } from "@azure/microsoft-playwright-testing";
 *
 * test('has title', async ({ browserName }) => {
 *  const { wsEndpoint, options } = await getConnectOptions();
 *  const browser = await (playwright[browserName] as BrowserType).connect(wsEndpoint, options);
 *  const context = await browser.newContext();
 *  const page = await context.newPage();
 *
 *  await page.goto('https://playwright.dev/');
 *  await expect(page).toHaveTitle(/Playwright/);
 *
 *  await page.close();
 *  await context.close();
 *  await browser.close();
 * });
 * ```
 */
declare const getConnectOptions: (options?: Omit<PlaywrightServiceAdditionalOptions, "serviceAuthType">) => Promise<BrowserConnectOptions>;
export { getServiceConfig, getConnectOptions };
//# sourceMappingURL=playwrightService.d.ts.map