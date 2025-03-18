// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This class represents an encrypted number in the Cosmos DB SDK.
 * Use an instance of this class to represent a number that is encrypted in CosmosDB backend.
 * Input to the constructor should be a string representation of the number.
 * @example
 * const encryptedNumber = new CosmosEncryptedNumber("4");
 * const encryptedNumber2 = new CosmosEncryptedNumber("4.1");
 * const encryptedNumber3 = new CosmosEncryptedNumber("4.0");
 */
export class CosmosEncryptedNumber {
  value: string;
  constructor(input: string) {
    if (input.trim() === "") {
      throw new Error("CosmosEncryptedNumber error: Input cannot be an empty string.");
    }
    const num = Number(input);
    if (isNaN(num)) {
      throw new Error(`CosmosEncryptedNumber error: The input '${input}' is not a valid number.`);
    }
    if (!isFinite(num)) {
      throw new Error(`CosmosEncryptedNumber error: The number '${input}' must be finite.`);
    }
    if (/e/i.test(input)) {
      throw new Error(
        `CosmosEncryptedNumber error: Exponential notation is not allowed. Received '${input}'.`,
      );
    }
    this.value = input;
  }
}
