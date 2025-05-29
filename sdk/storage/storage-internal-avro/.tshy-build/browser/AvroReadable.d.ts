import type { AbortSignalLike } from "@azure/abort-controller";
/**
 * Options to configure the {@link AvroReadable.read} operation.
 */
export interface AvroReadableReadOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
export declare abstract class AvroReadable {
    abstract get position(): number;
    abstract read(size: number, options?: AvroReadableReadOptions): Promise<Uint8Array>;
}
//# sourceMappingURL=AvroReadable.d.ts.map