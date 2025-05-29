import type { OperationOptions, ServiceClient } from "@azure/core-client";
import type { Fetcher } from "./fetcherAbstract.js";
import type { DTDL } from "./psuedoDtdl.js";
/**
 * The HTTP Fetcher implements the Fetcher interface to
 * retrieve models through HTTP calls.
 *
 * @internal
 */
export declare class HttpFetcher implements Fetcher {
    private _client;
    private _baseURL;
    constructor(baseURL: string, client: ServiceClient);
    fetch(path: string, options?: OperationOptions): Promise<DTDL | DTDL[]>;
}
//# sourceMappingURL=fetcherHTTP.d.ts.map