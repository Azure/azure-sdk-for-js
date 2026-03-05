/**
 * Node.js-specific client implementation.
 *
 * SOURCE LIMITATION: The source engine sees this file as part of the same module.
 * It has no concept of "this is only exported under the node condition".
 * COMPILED: The node .d.ts entry file only exports NodeClient and node-specific types.
 */

import { BaseClient, ClientOptions, Resource } from "./shared";
import type { HttpRequest, HttpResponse } from "some-http-lib";

/** Node-specific options with filesystem support. */
export interface NodeClientOptions extends ClientOptions {
  /** Path to the certificate file (node-only). */
  certPath?: string;
  /** Whether to use HTTP/2 (node-only). */
  useHttp2?: boolean;
}

/** Client optimized for Node.js with streaming and filesystem support. */
export class NodeClient extends BaseClient {
  private certPath?: string;

  constructor(options: NodeClientOptions) {
    super(options);
    this.certPath = options.certPath;
  }

  /** Lists resources using Node.js HTTP client. */
  async listResources(): Promise<Resource[]> {
    return [];
  }

  /**
   * Streams a resource to a file path — node-only API.
   * SOURCE LIMITATION: The source engine includes this method in the unified API.
   * It cannot know that the browser target does NOT export this method.
   * COMPILED: This method only appears in the node .d.ts, not the browser .d.ts.
   */
  async streamToFile(resourceId: string, filePath: string): Promise<void> {
    // node-specific implementation using fs
  }

  /**
   * Reads a resource from a file — node-only API.
   * Same limitation: source engine cannot distinguish per-target availability.
   */
  async readFromFile(filePath: string): Promise<Resource> {
    return { id: "", name: "", createdAt: new Date() };
  }

  /** Sends a raw HTTP request. */
  async sendRequest(request: HttpRequest): Promise<HttpResponse> {
    return {} as HttpResponse;
  }
}

export { ClientOptions, Resource } from "./shared";
