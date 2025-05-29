import type { AbortSignalLike } from "@azure/abort-controller";
import type { AvroReadable } from "./AvroReadable.js";
/**
 * Options to configure the {@link AvroReader.parseObjects} operation.
 */
export interface AvroParseOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
export declare class AvroReader {
    private readonly _dataStream;
    private readonly _headerStream;
    private _syncMarker?;
    private _metadata?;
    private _itemType?;
    private _itemsRemainingInBlock?;
    private readonly _initialBlockOffset;
    private _blockOffset;
    get blockOffset(): number;
    private _objectIndex;
    get objectIndex(): number;
    private _initialized;
    constructor(dataStream: AvroReadable);
    constructor(dataStream: AvroReadable, headerStream: AvroReadable, currentBlockOffset: number, indexWithinCurrentBlock: number);
    private initialize;
    hasNext(): boolean;
    parseObjects(options?: AvroParseOptions): AsyncIterableIterator<Record<string, any> | null>;
}
//# sourceMappingURL=AvroReader.d.ts.map