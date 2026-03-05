// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// @ts-expect-error the crc64 js file is auto generated
import NativeCRC64 from "./crc64.js";

/**
 * Class used to calculator CRC64 checksum
 */
export class StorageCRC64Calculator {
  private nativeCrc64Hash: any;
  private static nativeInstance: any;
  constructor() {
    this.nativeCrc64Hash = new StorageCRC64Calculator.nativeInstance.Crc64Hash();
  }

  private static initPromise?: Promise<void>;

  /**
   * Initialize environment for CRC64 checksum calculator
   */
  public static async init(): Promise<void> {
    if (!this.initPromise) {
      this.initPromise = NativeCRC64().then((instance: any) => {
        this.nativeInstance = instance;
        return;
      });
    }
    return this.initPromise;
  }

  /**
   * Append data for CRC64 checksum calculator
   * @param body - content to be append
   * @param length - length of the content
   */
  public append(body: Uint8Array, length: number): void {
    const ptr = StorageCRC64Calculator.nativeInstance._malloc(length);
    StorageCRC64Calculator.nativeInstance.HEAPU8.set(body, ptr);

    this.nativeCrc64Hash.OnAppend(ptr, length);
    StorageCRC64Calculator.nativeInstance._free(ptr);
  }

  /**
   * Complete CRC64 checksum calculating and get the final result.
   * @param body -
   * @param length -
   * @returns
   */
  public final(body: Uint8Array, length: number): Uint8Array {
    const ptr = StorageCRC64Calculator.nativeInstance._malloc(length);
    StorageCRC64Calculator.nativeInstance.HEAPU8.set(body, ptr);

    const result = StorageCRC64Calculator.nativeInstance._malloc(8);
    this.nativeCrc64Hash.OnFinal(ptr, length, result);
    StorageCRC64Calculator.nativeInstance._free(ptr);
    const resultArray = new Uint8Array(8);
    resultArray.set(StorageCRC64Calculator.nativeInstance.HEAPU8.subarray(result, result + 8));
    StorageCRC64Calculator.nativeInstance._free(result);
    return resultArray;
  }
}
