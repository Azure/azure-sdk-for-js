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
    if (!Number(input)) {
      throw new Error("Invalid number");
    }
    this.value = input;
  }
}
