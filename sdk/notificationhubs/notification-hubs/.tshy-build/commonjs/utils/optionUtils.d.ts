import type { BroadcastSendNotificationOptions, DirectSendNotificationOptions, SendNotificationOptions } from "../models/options.js";
/**
 * Determines whether the options are of type BroadcastSendNotificationOptions.
 * @param options - The options to test if BroadcastSendNotificationOptions.
 * @returns true if BroadcastSendNotificationOptions otherwise false.
 */
export declare function isBroadcastSendNotificationOptions(options: unknown): options is BroadcastSendNotificationOptions;
/**
 * Determines whether the options are of type SendNotificationOptions.
 * @param options - The options to test if SendNotificationOptions.
 * @returns true if SendNotificationOptions otherwise false.
 */
export declare function isSendNotificationOptions(options: unknown): options is SendNotificationOptions;
/**
 * Determines whether the options are of type DirectSendNotificationOptions.
 * @param options - The options to test if DirectSendNotificationOptions.
 * @returns true if DirectSendNotificationOptions otherwise false.
 */
export declare function isDirectSendNotificationOptions(options: unknown): options is DirectSendNotificationOptions;
//# sourceMappingURL=optionUtils.d.ts.map