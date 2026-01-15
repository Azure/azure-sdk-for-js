import type { CbsClient } from "@azure/core-amqp";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { ConnectionContext } from "./connectionContext.js";
import type { TimerLoop } from "./util/timerLoop.js";
import type { SimpleLogger } from "./logger.js";
/**
 *
 * @param callback - The callback to be executed after the token is obtained.
 * @param context - The connection context.
 * @param audience - The audience for which the token is needed.
 * @param timeoutInMs - The timeout in milliseconds.
 * @param logger - The logger to be used for logging.
 * @returns  A TimerLoop that keeps the token refreshed.
 * @internal
 */
export declare function withAuth(callback: () => Promise<void>, context: ConnectionContext, audience: string, timeoutInMs: number, logger: SimpleLogger, options: {
    abortSignal?: AbortSignalLike;
}): Promise<TimerLoop>;
/**
 * @internal
 */
export declare function openCbsSession(client: CbsClient, timeoutAfterStartTime: number, { abortSignal }?: {
    abortSignal?: AbortSignalLike;
}): Promise<void>;
//# sourceMappingURL=withAuth.d.ts.map