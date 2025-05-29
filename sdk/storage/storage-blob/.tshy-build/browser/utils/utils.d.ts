/**
 * Convert a Browser Blob object into ArrayBuffer.
 *
 * @param blob -
 */
export declare function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer>;
/**
 * Convert a Browser Blob object into string.
 *
 * @param blob -
 */
export declare function blobToString(blob: Blob): Promise<string>;
export declare function streamToBuffer(): void;
export declare function streamToBuffer2(): void;
export declare function readStreamToLocalFile(): void;
export declare const fsStat: () => void;
export declare const fsCreateReadStream: () => void;
//# sourceMappingURL=utils-browser.d.mts.map