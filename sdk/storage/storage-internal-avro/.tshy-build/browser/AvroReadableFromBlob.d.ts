import type { AvroReadableReadOptions } from "./AvroReadable.js";
import { AvroReadable } from "./AvroReadable.js";
export declare class AvroReadableFromBlob extends AvroReadable {
    private _position;
    private _blob;
    constructor(blob: Blob);
    get position(): number;
    read(size: number, options?: AvroReadableReadOptions): Promise<Uint8Array>;
}
//# sourceMappingURL=AvroReadableFromBlob.d.ts.map