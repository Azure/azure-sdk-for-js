// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * The default time interval to wait before sending the next polling request.
 */
export const POLL_INTERVAL_IN_MS = 2000;
/**
 * The maximum polling interval, in milliseconds, that can be safely passed to the
 * platform timer. Node.js clamps a `setTimeout` delay greater than `2147483647`
 * (the largest 32-bit signed integer) to `1`, which would turn an intended long
 * delay into a near-continuous polling loop. Server-provided polling intervals
 * are bounded to this value before being scheduled.
 */
export const MAX_POLLING_INTERVAL_IN_MS = 2147483647;
/**
 * The closed set of terminal states.
 */
export const terminalStates = ["succeeded", "canceled", "failed"];
