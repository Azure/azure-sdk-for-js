/**
 * Browser-specific client implementation.
 *
 * SOURCE LIMITATION: The source engine sees this alongside the node implementation.
 * It cannot distinguish that browser consumers get BrowserClient but NOT NodeClient.
 * COMPILED: The browser .d.ts only exports BrowserClient and browser-specific types.
 */

import { BaseClient, ClientOptions, Resource } from "./shared";
import type { HttpRequest, HttpResponse } from "some-http-lib";

/** Browser-specific options. */
export interface BrowserClientOptions extends ClientOptions {
  /** Whether to use fetch AbortController (browser-only). */
  useAbortController?: boolean;
  /** Custom fetch implementation (browser-only). */
  fetchImpl?: typeof fetch;
}

/** Client optimized for browser environments. */
export class BrowserClient extends BaseClient {
  constructor(options: BrowserClientOptions) {
    super(options);
  }

  /** Lists resources using browser fetch API. */
  async listResources(): Promise<Resource[]> {
    return [];
  }

  /**
   * Opens a resource in a new browser tab — browser-only API.
   * SOURCE LIMITATION: The source engine includes this in the unified API.
   * COMPILED: This method only appears in the browser .d.ts.
   */
  openInNewTab(resourceId: string): void {
    // browser-specific: window.open(...)
  }

  /**
   * Downloads a resource as a Blob — browser-only API.
   * Uses the Blob type which only exists in browser environments.
   */
  async downloadAsBlob(resourceId: string): Promise<Blob> {
    return new Blob();
  }

  /** Sends a raw HTTP request. */
  async sendRequest(request: HttpRequest): Promise<HttpResponse> {
    return {} as HttpResponse;
  }
}

export { ClientOptions, Resource } from "./shared";
