import type { Serializer } from "./Serializer.js";
export declare class NumberSerializer implements Serializer {
    deserialize(bytes: Buffer): number;
    serialize(value: number): Buffer;
}
//# sourceMappingURL=NumberSerializer.d.ts.map