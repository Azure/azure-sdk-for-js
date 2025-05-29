import type { ServiceBusLogger } from "../log.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import { AbortError } from "@azure/abort-controller";
import type { PipelineResponse } from "@azure/core-rest-pipeline";
import type { HttpResponse } from "./compat/index.js";
/**
 * @internal
 * Provides a uniue name by appending a string guid to the given string in the following format:
 * `{name}-{uuid}`.
 * @param name - The nme of the entity
 */
export declare function getUniqueName(name: string): string;
/**
 * @internal
 * Returns the passed identifier if it is not undefined or empty;
 * otherwise generate and returns a unique one in the following format;
 *   `{prefix}-{uuid}`.
 * @param prefix - The prefix used to generate identifier
 * @param identifier - an identifier name
 */
export declare function ensureValidIdentifier(prefix: string, identifier?: string): string;
/**
 * @internal
 * If you try to turn a Guid into a Buffer in .NET, the bytes of the first three groups get
 * flipped within the group, but the last two groups don't get flipped, so we end up with a
 * different byte order. This is the order of bytes needed to make Service Bus recognize the token.
 *
 * @param lockToken - The lock token whose bytes need to be reorded.
 * @returns Buffer representing reordered bytes.
 */
export declare function reorderLockToken(lockTokenBytes: Buffer): Buffer;
/**
 * @internal
 * Provides the time in milliseconds after which the lock renewal should occur.
 * @param lockedUntilUtc - The time until which the message is locked.
 */
export declare function calculateRenewAfterDuration(lockedUntilUtc: Date): number;
/**
 * @internal
 * Converts the .net ticks to a JS Date object.
 *
 * - The epoch for the DateTimeOffset type is `0000-01-01`, while the epoch for JS Dates is
 * `1970-01-01`.
 * - The DateTimeOffset ticks value for the date `1970-01-01` is `621355968000000000`.
 *   - Hence, to convert it to the JS epoch; we `subtract` the delta from the given value.
 * - Ticks in DateTimeOffset is `1/10000000` second, while ticks in JS Date is `1/1000` second.
 *   - Thus, we `divide` the value by `10000` to convert it to JS Date ticks.
 *
 * @param buf - Input as a Buffer
 * @returns The JS Date object.
 */
export declare function convertTicksToDate(buf: number[]): Date;
/**
 * @internal
 * Converts any given input to a Buffer.
 * @param input - The input that needs to be converted to a Buffer.
 */
export declare function toBuffer(input: unknown): Buffer;
/**
 * @internal
 * Helper utility to retrieve `string` value from given string,
 * or throws error if undefined.
 */
export declare function getString(value: unknown, nameOfProperty: string): string;
/**
 * @internal
 * Helper utility to retrieve `string` value from given input,
 * or undefined if not passed in.
 */
export declare function getStringOrUndefined(value: any): string | undefined;
/**
 * @internal
 * Helper utility to retrieve `integer` value from given string,
 * or throws error if undefined.
 */
export declare function getInteger(value: unknown, nameOfProperty: string): number;
/**
 * @internal
 * Helper utility to retrieve `integer` value from given string,
 * or undefined if not passed in.
 */
export declare function getIntegerOrUndefined(value: any): number | undefined;
/**
 * @internal
 * Helper utility to convert ISO-8601 time into Date type.
 */
export declare function getDate(value: string, nameOfProperty: string): Date;
/**
 * @internal
 * Helper utility to retrieve `boolean` value from given string,
 * or throws error if undefined.
 */
export declare function getBoolean(value: unknown, nameOfProperty: string): boolean;
/**
 * @internal
 * Helper utility to retrieve `boolean` value from given string,
 * or undefined if not passed in.
 */
export declare function getBooleanOrUndefined(value: any): boolean | undefined;
/**
 * @internal
 * Returns `true` if given input is a JSON like object.
 */
export declare function isJSONLikeObject(value: any): boolean;
/**
 * @internal
 * Helper utility to retrieve message count details from given input,
 */
export declare function getMessageCountDetails(value: any): MessageCountDetails;
/**
 * @internal
 * Gets the xmlns prefix from the root of the objects that are part of the parsed response body.
 */
export declare function getXMLNSPrefix(value: any): string;
/**
 * Represents type of message count details in ATOM based management operations.
 * @internal
 */
export type MessageCountDetails = {
    activeMessageCount: number;
    deadLetterMessageCount: number;
    scheduledMessageCount: number;
    transferMessageCount: number;
    transferDeadLetterMessageCount: number;
};
/**
 * Represents type of `AuthorizationRule` in ATOM based management operations.
 */
export interface AuthorizationRule {
    /**
     * The claim type.
     */
    claimType: string;
    /**
     * The list of rights("Manage" | "Send" | "Listen").
     */
    accessRights?: ("Manage" | "Send" | "Listen")[];
    /**
     * The authorization rule key name.
     */
    keyName: string;
    /**
     * The primary key for the authorization rule.
     */
    primaryKey?: string;
    /**
     * The secondary key for the authorization rule.
     */
    secondaryKey?: string;
}
/**
 * @internal
 * Helper utility to retrieve array of `AuthorizationRule` from given input,
 * or undefined if not passed in.
 */
export declare function getAuthorizationRulesOrUndefined(value: any): AuthorizationRule[] | undefined;
/**
 * @internal
 * Helper utility to extract output containing array of `RawAuthorizationRule` instances from given input,
 * or undefined if not passed in.
 */
export declare function getRawAuthorizationRules(authorizationRules: AuthorizationRule[] | undefined): any;
/**
 * @internal
 * Helper utility to check if given string is an absolute URL
 */
export declare function isAbsoluteUrl(url: string): boolean;
/**
 * Possible values for `status` of the Service Bus messaging entities.
 */
export type EntityStatus = "Active" | "Creating" | "Deleting" | "ReceiveDisabled" | "SendDisabled" | "Disabled" | "Renaming" | "Restoring" | "Unknown";
/**
 * Possible values for `availabilityStatus` of the Service Bus messaging entities.
 */
export type EntityAvailabilityStatus = "Available" | "Limited" | "Renaming" | "Restoring" | "Unknown";
/**
 * @internal
 */
type setTimeoutArgs = (callback: (...args: any[]) => void, ms: number, ...args: any[]) => any;
/**
 * An executor for a function that returns a Promise that obeys both a timeout and an
 * optional AbortSignal.
 * @param timeoutMs - The number of milliseconds to allow before throwing an OperationTimeoutError.
 * @param timeoutMessage - The message to place in the .description field for the thrown exception for Timeout.
 * @param abortSignal - The abortSignal associated with containing operation.
 * @param abortErrorMsg - The abort error message associated with containing operation.
 * @param value - The value to be resolved with after a timeout of t milliseconds.
 *
 * @internal
 */
export declare function waitForTimeoutOrAbortOrResolve<T>(args: {
    actionFn: () => Promise<T>;
    timeoutMs: number;
    timeoutMessage: string;
    abortSignal?: AbortSignalLike;
    timeoutFunctions?: {
        setTimeoutFn: setTimeoutArgs;
        clearTimeoutFn: (timeoutId: any) => void;
    };
}): Promise<T>;
/**
 * Registers listener to the abort event on the abortSignal to call your abortFn and
 * returns a function that will clear the same listener.
 *
 * If abort signal is already aborted, then throws an AbortError and returns a function that does nothing
 *
 * @returns A function that removes any of our attached event listeners on the abort signal or an empty function if
 * the abortSignal was not defined.
 *
 * @internal
 */
export declare function checkAndRegisterWithAbortSignal(onAbortFn: (abortError: AbortError) => void, abortSignal?: AbortSignalLike): () => void;
/**
 * @internal
 * The user agent prefix string for the ServiceBus client.
 * See guideline at https://azure.github.io/azure-sdk/general_azurecore.html#telemetry-policy
 */
export declare const libInfo: string;
/**
 * @internal
 * Returns the formatted prefix by removing the spaces, by appending the libInfo.
 */
export declare function formatUserAgentPrefix(prefix?: string): string;
/**
 * @internal
 * Helper method which returns `HttpResponse` from an object of shape `PipelineResponse`.
 * TODO: remove this and use toHttpResponse() directly
 */
export declare const getHttpResponseOnly: (pipelineResponse: PipelineResponse) => HttpResponse;
/**
 * @internal
 * Type with the service versions for the ATOM API.
 */
export type ServiceBusAtomAPIVersion = "2021-05" | "2017-04";
/**
 * @internal
 * Waits for one second if a sender is not sendable then check again. Throws
 * SenderBusyError if it is still not sendable.
 * Only waits when operation timeout is greater than one second.
 * @returns the actual waiting time.
 */
export declare function waitForSendable(sendLogger: ServiceBusLogger, logPrefix: string, name: string, timeout: number, sender: {
    sendable: () => boolean;
    credit: number;
} | undefined, outgoingAvaiable: number): Promise<number>;
export {};
//# sourceMappingURL=utils.d.ts.map