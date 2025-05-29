import { Serializer } from "./Serializer.js";
export declare class StringSerializer implements Serializer {
    private static characterEncoding;
    deserialize(bytes: Buffer): string;
    serialize(value: string): Buffer;
}
//# sourceMappingURL=StringSerializer.d.ts.map