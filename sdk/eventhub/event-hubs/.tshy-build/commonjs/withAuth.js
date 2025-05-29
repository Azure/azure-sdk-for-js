"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAuth = withAuth;
exports.openCbsSession = openCbsSession;
const core_amqp_1 = require("@azure/core-amqp");
const timerLoop_js_1 = require("./util/timerLoop.js");
const logger_js_1 = require("./logger.js");
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
async function withAuth(callback, context, audience, timeoutInMs, logger, options) {
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
            logger.verbose(`an error occurred while renewing the token: ${(0, logger_js_1.logObj)(err)}`);
        }
    }
    const loop = (0, timerLoop_js_1.createTimerLoop)(info.timeToLiveInMs, createTask);
    loop.start();
    return loop;
}
/**
 * @internal
 */
async function openCbsSession(client, timeoutAfterStartTime, { abortSignal } = {}) {
    return core_amqp_1.defaultCancellableLock.acquire(client.cbsLock, () => client.init({
        abortSignal,
        timeoutInMs: timeoutAfterStartTime - Date.now(),
    }), {
        abortSignal,
        timeoutInMs: timeoutAfterStartTime - Date.now(),
    });
}
async function getAadToken(cred) {
    const token = await cred.getToken(core_amqp_1.Constants.aadEventHubsScope);
    if (!token) {
        throw new Error(`Failed to get token from the provided "TokenCredential" object`);
    }
    return {
        token,
        type: core_amqp_1.TokenType.CbsTokenTypeJwt,
        timeToLiveInMs: token.expiresOnTimestamp - Date.now() - 2 * 60 * 1000,
    };
}
async function getSharedKeyBasedToken(cred, audience) {
    return {
        token: await cred.getToken(audience),
        type: core_amqp_1.TokenType.CbsTokenTypeSas,
        timeToLiveInMs: 45 * 60 * 1000,
    };
}
async function getTokenInfo(cred, audience) {
    return (0, core_amqp_1.isSasTokenProvider)(cred) ? getSharedKeyBasedToken(cred, audience) : getAadToken(cred);
}
function negotiateClaim({ token, type }, audience, cbsSession, timeoutAfterStartTime, lock, abortSignal) {
    return core_amqp_1.defaultCancellableLock.acquire(lock, () => cbsSession.negotiateClaim(audience, token.token, type, {
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