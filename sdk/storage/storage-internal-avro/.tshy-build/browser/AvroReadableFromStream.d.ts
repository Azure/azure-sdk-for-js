import type { AvroReadableReadOptions } from "./AvroReadable.js";
import { AvroReadable } from "./AvroReadable.js";
export declare class AvroReadableFromStream extends AvroReadable {
    private _position;
    private _readable;
    private toUint8Array;
    constructor(readable: NodeJS.ReadableStream);
    get position(): number;
    read(size: number, options?: AvroReadableReadOptions): Promise<Uint8Array>;
}
//# sourceMappingURL=AvroReadableFromStream.d.ts.map