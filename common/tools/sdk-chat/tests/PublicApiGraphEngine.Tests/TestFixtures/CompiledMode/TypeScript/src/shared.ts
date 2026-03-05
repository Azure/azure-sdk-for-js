/**
 * Shared types and base client used by both node and browser targets.
 *
 * SOURCE LIMITATION: The source engine processes this file directly and sees
 * ONE API surface. It cannot distinguish that the built package produces DIFFERENT
 * .d.ts entry points for node vs browser with different exported symbols.
 * COMPILED: Each .d.ts entry file is processed separately, revealing per-target APIs.
 *
 * EXTERNAL DEP LIMITATION: This file references HttpPolicy from an external
 * npm package (some-http-lib). Without node_modules installed, the source
 * engine cannot resolve the import or track the dependency.
 * COMPILED: The .d.ts files have resolved type references with package info.
 */

// This import cannot be resolved without `npm install`.
// The source engine sees the import but can't follow it to node_modules.
import type { HttpPolicy, HttpRequest, HttpResponse } from "some-http-lib";

/** Options for configuring the client. */
export interface ClientOptions {
  /** The service endpoint. */
  endpoint: string;
  /** Request timeout in milliseconds. */
  timeout?: number;
  /**
   * Custom HTTP policies.
   * SOURCE LIMITATION: HttpPolicy is from some-http-lib.
   * Without node_modules, the type is unresolved (TypeKind.Error equivalent).
   * COMPILED: The .d.ts has HttpPolicy fully resolved with package attribution.
   */
  policies?: HttpPolicy[];
}

/** A resource returned by the service. */
export interface Resource {
  /** The resource ID. */
  id: string;
  /** The resource name. */
  name: string;
  /** Creation timestamp. */
  createdAt: Date;
}

/** Base client with shared functionality. */
export abstract class BaseClient {
  protected readonly endpoint: string;

  constructor(options: ClientOptions) {
    this.endpoint = options.endpoint;
  }

  /** Lists resources. */
  abstract listResources(): Promise<Resource[]>;

  /**
   * Sends a raw HTTP request.
   * SOURCE LIMITATION: HttpRequest and HttpResponse are from some-http-lib.
   * Without the package installed, the source engine cannot attribute
   * these types to their origin package.
   * COMPILED: The .d.ts resolves these to some-http-lib types.
   */
  abstract sendRequest(request: HttpRequest): Promise<HttpResponse>;
}
