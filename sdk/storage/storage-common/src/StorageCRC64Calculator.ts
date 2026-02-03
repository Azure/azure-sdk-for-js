//import { HttpRequestBody } from "@azure/core-http";
// @ts-ignore
import NativeCRC64 from "./crc64.js"; // @ts-ignore

export class StorageCRC64Calculator {
  private nativeCrc64Hash: any;
  static nativeInstance: any;
  static isInitializing: boolean = false;
  constructor() {
    this.nativeCrc64Hash = new StorageCRC64Calculator.nativeInstance.Crc64Hash();
  }

  public static async init(): Promise<void> {
    if (this.nativeInstance === undefined) {
      if (!this.isInitializing) {
        this.isInitializing = true;
        this.nativeInstance = await NativeCRC64();
      } else {
        let count = 0;
        while (this.nativeInstance === undefined) {
          ++count;
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve("Done");
            }, 10);
          });
        }
      }
    }
  }

  public Append(body: Uint8Array, length: number) {
    let ptr = StorageCRC64Calculator.nativeInstance._malloc(length);
    StorageCRC64Calculator.nativeInstance.HEAPU8.set(body, ptr);

    this.nativeCrc64Hash.OnAppend(ptr, length);
    StorageCRC64Calculator.nativeInstance._free(ptr);
  }

  public Final(body: Uint8Array, length: number): Uint8Array {
    let ptr = StorageCRC64Calculator.nativeInstance._malloc(length);
    StorageCRC64Calculator.nativeInstance.HEAPU8.set(body, ptr);

    let result = StorageCRC64Calculator.nativeInstance._malloc(8);
    this.nativeCrc64Hash.OnFinal(ptr, length, result);
    StorageCRC64Calculator.nativeInstance._free(ptr);
    const resultArray = new Uint8Array(8);
    resultArray.set(StorageCRC64Calculator.nativeInstance.HEAPU8.subarray(result, result + 8));
    StorageCRC64Calculator.nativeInstance._free(result);
    return resultArray;
  }
}
