import type { OperationOptions } from "@azure/core-client";
import type { DTDL } from "./psuedoDtdl.js";
import type { Fetcher } from "./fetcherAbstract.js";
/**
 * DtmiResolver handles reformatting the DTMIs to paths and passing options
 * down to the configured fetcher. It is almost like a middle man between the
 * user-facing API and the PsuedoParser (which identifies if there are sub-dependencies
 * to resolve), and the configured fetcher, which will go out to the endpoint,
 * either in the filesystem or through a URI, and actually get the model we want.
 *
 * @internal
 */
export declare class DtmiResolver {
    private _fetcher;
    constructor(fetcher: Fetcher);
    resolve(dtmis: string[], expandedModel: boolean, options?: OperationOptions): Promise<{
        [dtmi: string]: DTDL;
    }>;
}
//# sourceMappingURL=dtmiResolver.d.ts.map