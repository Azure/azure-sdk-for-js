/**
 * Encodes a string in base64 format.
 * @param value - the string to encode
 */
export declare function encodeString(value: string): string;
/**
 * Encodes a byte array in base64 format.
 * @param value - the Uint8Array to encode
 */
export declare function base64EncodeByteArray(value: Uint8Array): string;
/**
 * Encodes a byte array in base64 format.
 * @param value - the Uint8Array to encode
 */
export declare function base64UrlEncodeByteArray(value: Uint8Array): string;
/**
 * Decodes a base64 string into a byte array.
 * @param value - the base64 string to decode
 */
export declare function base64DecodeString(value: string): Uint8Array;
/**
 * Decodes a base64url string into a byte array.
 * @param value - the base64url string to decode
 */
export declare function base64UrlDecodeString(value: string): Uint8Array;
export declare function hexToByteArray(value: string): Uint8Array;
export declare function byteArrayToHex(value: Uint8Array): string;
//# sourceMappingURL=base64.d.ts.map