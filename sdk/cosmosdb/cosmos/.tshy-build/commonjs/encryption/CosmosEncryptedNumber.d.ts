/**
 * This enum represents the type of number in the Cosmos DB SDK.
 */
export declare enum CosmosEncryptedNumberType {
    /**
     * Represents an integer number.
     */
    Integer = "Integer",
    /**
     * Represents a floating-point number.
     */
    Float = "Float"
}
/**
 * This interface represents an encrypted number in the Cosmos DB SDK.
 *
 * @example
 * ```ts snippet:CosmosEncryptedNumber
 * import { CosmosEncryptedNumber, CosmosEncryptedNumberType } from "@azure/cosmos";
 *
 * const encryptedNumber1: CosmosEncryptedNumber = {
 *   value: 4,
 *   numberType: CosmosEncryptedNumberType.Integer,
 * };
 * const encryptedNumber2: CosmosEncryptedNumber = {
 *   value: 4.1,
 *   numberType: CosmosEncryptedNumberType.Float,
 * };
 * const encryptedNumber3: CosmosEncryptedNumber = {
 *   value: 4,
 *   numberType: CosmosEncryptedNumberType.Float, // represents 4.0
 * };
 * ```
 */
export interface CosmosEncryptedNumber {
    /**
     * The value to be encrypted.
     */
    value: number;
    /**
     * The type of number (Integer or Float).
     * Use CosmosEncryptedNumberType.Integer for integers and CosmosEncryptedNumberType.Float for floating-point numbers.
     */
    numberType: CosmosEncryptedNumberType;
}
//# sourceMappingURL=CosmosEncryptedNumber.d.ts.map