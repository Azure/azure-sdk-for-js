import type { Fetcher } from "./fetcherAbstract.js";
import type { DTDL } from "./psuedoDtdl.js";
/**
 * The Filesystem Fetcher implements the generic Fetcher interface
 * so that models are fetched from a filesystem endpoint.
 *
 * @internal
 */
export declare class FilesystemFetcher implements Fetcher {
    private _baseFilePath;
    constructor(baseFilePath: string);
    fetch(filePath: string): Promise<DTDL | DTDL[]>;
}
//# sourceMappingURL=fetcherFilesystem.d.ts.map