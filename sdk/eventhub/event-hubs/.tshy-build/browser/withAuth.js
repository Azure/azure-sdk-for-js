// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants, TokenType, defaultCancellableLock, isSasTokenProvider } from "@azure/core-amqp";
import { createTimerLoop } from "./util/timerLoop.js";
import { logObj } from "./logger.js";
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
export async function withAuth(callback, context, audience, timeoutInMs, logger, options) {
    const info = await getTokenInfo(context.tokenCredential, audience);
    await setupClaimNegotiation(context, audience, info, timeoutInMs, logger, options);
    await callback();
    async function createTask() {
        try {
            const info2 = await getTokenInfo(context.tokenCredential, audience);
            await setupClaimNegotiation(context, audience, info2, timeoutInMs, logger, options);
            logger.verbose(`next token renewal is in ${info2.timeToLiveInMs} milliseconds @(${new Date(Date.now() + info2.timeToLiveInMs).toString()}).`);
        }
        catch (err) {
            logger.verbose(`an error occurred while renewing the token: ${logObj(err)}`);
        }
    }
    const loop = createTimerLoop(info.timeToLiveInMs, createTask);
    loop.start();
    return loop;
}
/**
 * @internal
 */
export async function openCbsSession(client, timeoutAfterStartTime, { abortSignal } = {}) {
    return defaultCancellableLock.acquire(client.cbsLock, () => client.init({
        abortSignal,
        timeoutInMs: timeoutAfterStartTime - Date.now(),
    }), {
        abortSignal,
        timeoutInMs: timeoutAfterStartTime - Date.now(),
    });
}
async function getAadToken(cred) {
    const token = await cred.getToken(Constants.aadEventHubsScope);
    if (!token) {
        throw new Error(`Failed to get token from the provided "TokenCredential" object`);
    }
    return {
        token,
        type: TokenType.CbsTokenTypeJwt,
        timeToLiveInMs: token.expiresOnTimestamp - Date.now() - 2 * 60 * 1000,
    };
}
async function getSharedKeyBasedToken(cred, audience) {
    return {
        token: await cred.getToken(audience),
        type: TokenType.CbsTokenTypeSas,
        timeToLiveInMs: 45 * 60 * 1000,
    };
}
async function getTokenInfo(cred, audience) {
    return isSasTokenProvider(cred) ? getSharedKeyBasedToken(cred, audience) : getAadToken(cred);
}
function negotiateClaim({ token, type }, audience, cbsSession, timeoutAfterStartTime, lock, abortSignal) {
    return defaultCancellableLock.acquire(lock, () => cbsSession.negotiateClaim(audience, token.token, type, {
        abortSignal,
        timeoutInMs: timeoutAfterStartTime - Date.now(),
    }), {
        abortSignal,
        timeoutInMs: timeoutAfterStartTime - Date.now(),
    });
}
async function setupClaimNegotiation(context, audience, info, timeoutInMs, logger, { abortSignal, }) {
    const startTime = Date.now();
    logger.verbose(`acquiring cbs lock: '${context.cbsSession.cbsLock}' for creating the cbs session`);
    await openCbsSession(context.cbsSession, timeoutInMs + startTime, { abortSignal });
    logger.verbose(`acquiring cbs lock: '${context.negotiateClaimLock}' for cbs auth`);
    await negotiateClaim(info, audience, context.cbsSession, timeoutInMs + startTime, context.negotiateClaimLock, abortSignal);
    logger.verbose("claim negotiation succeeded");
}
//# sourceMappingURL=withAuth.js.map