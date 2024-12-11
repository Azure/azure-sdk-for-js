import type { AbortSignalLike } from "@azure/abort-controller";
import type { AvroReadable } from "./AvroReadable.js";
/**
 * Options to configure the AvroParser read methods.
 * See {@link AvroParser.readFixedBytes}, {@link AvroParser.readMap} and etc.
 */
interface AvroParserReadOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
export declare class AvroParser {
    /**
     * Reads a fixed number of bytes from the stream.
     *
     * @param stream -
     * @param length -
     * @param options -
     */
    static readFixedBytes(stream: AvroReadable, length: number, options?: AvroParserReadOptions): Promise<Uint8Array>;
    /**
     * Reads a single byte from the stream.
     *
     * @param stream -
     * @param options -
     */
    private static readByte;
    private static readZigZagLong;
    static readLong(stream: AvroReadable, options?: AvroParserReadOptions): Promise<number>;
    static readInt(stream: AvroReadable, options?: AvroParserReadOptions): Promise<number>;
    static readNull(): Promise<null>;
    static readBoolean(stream: AvroReadable, options?: AvroParserReadOptions): Promise<boolean>;
    static readFloat(stream: AvroReadable, options?: AvroParserReadOptions): Promise<number>;
    static readDouble(stream: AvroReadable, options?: AvroParserReadOptions): Promise<number>;
    static readBytes(stream: AvroReadable, options?: AvroParserReadOptions): Promise<Uint8Array>;
    static readString(stream: AvroReadable, options?: AvroParserReadOptions): Promise<string>;
    private static readMapPair;
    static readMap<T>(stream: AvroReadable, readItemMethod: (s: AvroReadable, options?: AvroParserReadOptions) => Promise<T>, options?: AvroParserReadOptions): Promise<Record<string, T>>;
    private static readArray;
}
export declare abstract class AvroType {
    /**
     * Reads an object from the stream.
     */
    abstract read(stream: AvroReadable, options?: AvroParserReadOptions): Promise<Object | null>;
    /**
     * Determines the AvroType from the Avro Schema.
     */
    static fromSchema(schema: string | Object): AvroType;
    private static fromStringSchema;
    private static fromArraySchema;
    private static fromObjectSchema;
}
export {};
//# sourceMappingURL=AvroParser.d.ts.map