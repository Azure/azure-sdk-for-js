declare function x86Hash32(bytes: Uint8Array, seed?: number): number;
declare function x86Hash128(bytes: Uint8Array, seed?: number): string;
declare function x64Hash128(bytes: Uint8Array, seed?: number): string;
export declare function reverse(buff: Uint8Array): Uint8Array<ArrayBuffer>;
declare const _default: {
    version: string;
    x86: {
        hash32: typeof x86Hash32;
        hash128: typeof x86Hash128;
    };
    x64: {
        hash128: typeof x64Hash128;
    };
    inputValidation: boolean;
};
export default _default;
//# sourceMappingURL=murmurHash.d.ts.map