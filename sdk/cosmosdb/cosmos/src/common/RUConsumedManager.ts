// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @hidden
 * @hidden
 * Specifies Net RUConsumed
 */
export class RUConsumedManager {
  private sharedBuffer: SharedArrayBuffer;
  private ruConsumedArray: BigInt64Array;
  private DECIMAL_PLACE_SCALING_FACTOR = 1000;

  constructor() {
    this.sharedBuffer = new SharedArrayBuffer(8); // 8 bytes for a 64-bit integer
    this.ruConsumedArray = new BigInt64Array(this.sharedBuffer);
    Atomics.store(this.ruConsumedArray, 0, BigInt(0)); // Initialize to 0
  }

  getRUConsumed(): number {
    const scaledValue = Atomics.load(this.ruConsumedArray, 0);
    return Number(scaledValue) / this.DECIMAL_PLACE_SCALING_FACTOR;
  }

  setRUConsumed(newValue: number): void {
    const scaledValue = BigInt(Math.round(newValue * this.DECIMAL_PLACE_SCALING_FACTOR));
    Atomics.store(this.ruConsumedArray, 0, scaledValue);
  }

  addToRUConsumed(value: number): void {
    const scaledValue = BigInt(Math.round(value * this.DECIMAL_PLACE_SCALING_FACTOR));
    Atomics.add(this.ruConsumedArray, 0, scaledValue);
  }
}
