import type { SmsApiClient } from "./generated/src/smsApiClient.js";
import type { OperationOptions } from "@azure/core-client";
/**
 * The result of Opt Out Check request.
 */
export interface OptOutCheckResult {
    /**
     * The recipient's phone number in E.164 format.
     */
    to: string;
    /**
     * Indicates if the recipient's phone number in opted out from receiving messages or not.
     */
    isOptedOut: boolean;
    /**
     * HTTP Status code.
     */
    httpStatusCode: number;
    /**
     * Optional error message in case of 4xx/5xx/repeatable errors.
     */
    errorMessage?: string;
}
/**
 * The result of Opt Out Add request.
 */
export interface OptOutAddResult {
    /**
     * The recipient's phone number in E.164 format.
     */
    to: string;
    /**
     * HTTP Status code.
     */
    httpStatusCode: number;
    /**
     * Optional error message in case of 4xx/5xx/repeatable errors.
     */
    errorMessage?: string;
}
/**
 * The result of Opt Out Remove request.
 */
export interface OptOutRemoveResult {
    /**
     * The recipient's phone number in E.164 format.
     */
    to: string;
    /**
     * HTTP Status code.
     */
    httpStatusCode: number;
    /**
     * Optional error message in case of 4xx/5xx/repeatable errors.
     */
    errorMessage?: string;
}
/**
 * Client options used to configure OptOuts Client API Check requests.
 */
export interface CheckOptions extends OperationOptions {
}
/**
 * Client options used to configure OptOuts Client API Add requests.
 */
export interface AddOptions extends OperationOptions {
}
/**
 * Client options used to configure OptOuts Client API Remove requests.
 */
export interface RemoveOptions extends OperationOptions {
}
/**
 * A OptOutsClient represents a Client to the Azure Communication Sms service allowing you
 * to call Opt Out Management Api methods.
 */
export declare class OptOutsClient {
    private readonly api;
    constructor(api: SmsApiClient);
    /**
     * Removes phone numbers from the optouts list.
     *
     * @param from - The sender's phone number
     * @param to - The recipient's phone numbers
     * @param options - Additional request options
     */
    remove(from: string, to: string[], options?: RemoveOptions): Promise<OptOutRemoveResult[]>;
    /**
     * Adds phone numbers to the optouts list.
     *
     * @param from - The sender's phone number
     * @param to - The recipient's phone numbers
     * @param options - Additional request options
     */
    add(from: string, to: string[], options?: AddOptions): Promise<OptOutAddResult[]>;
    /**
     * Checks if phone numbers are in the optouts list.
     *
     * @param from - The sender's phone number
     * @param to - The recipient's phone numbers
     * @param options - Additional request options
     */
    check(from: string, to: string[], options?: CheckOptions): Promise<OptOutCheckResult[]>;
}
//# sourceMappingURL=optOutsClient.d.ts.map