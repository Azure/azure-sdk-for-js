// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Constants,
  TokenType,
  defaultCancellableLock,
  isSasTokenProvider,
  SasTokenProvider,
  CbsClient,
  CbsResponse,
} from "@azure/core-amqp";
import { AbortSignalLike } from "@azure/abort-controller";
import { AccessToken, TokenCredential } from "@azure/core-auth";
import { ConnectionContext } from "./connectionContext.js";
import { createTimerLoop, TimerLoop } from "./util/timerLoop.js";
import { SimpleLogger, logObj } from "./logger.js";

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
export async function withAuth(
  callback: () => Promise<void>,
  context: ConnectionContext,
  audience: string,
  timeoutInMs: number,
  logger: SimpleLogger,
  options: {
    abortSignal?: AbortSignalLike;
  },
): Promise<TimerLoop> {
  const info = await getTokenInfo(context.tokenCredential, audience);
  await setupClaimNegotiation(context, audience, info, timeoutInMs, logger, options);
  await callback();
  async function createTask(): Promise<void> {
    try {
      const info2 = await getTokenInfo(context.tokenCredential, audience);
      await setupClaimNegotiation(context, audience, info2, timeoutInMs, logger, options);
      logger.verbose(
        `next token renewal is in ${info2.timeToLiveInMs} milliseconds @(${new Date(
          Date.now() + info2.timeToLiveInMs,
        ).toString()}).`,
      );
    } catch (err) {
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
export async function openCbsSession(
  client: CbsClient,
  timeoutAfterStartTime: number,
  { abortSignal }: { abortSignal?: AbortSignalLike } = {},
): Promise<void> {
  return defaultCancellableLock.acquire(
    client.cbsLock,
    () =>
      client.init({
        abortSignal,
        timeoutInMs: timeoutAfterStartTime - Date.now(),
      }),
    {
      abortSignal,
      timeoutInMs: timeoutAfterStartTime - Date.now(),
    },
  );
}

/**
 * A representation of an access token.
 * @internal
 */
interface TokenInfo {
  /** The access token */
  token: AccessToken;
  /** The type of the token */
  type: TokenType;
  /** The time duration after which the token should be refreshed */
  timeToLiveInMs: number;
}

async function getAadToken(cred: TokenCredential): Promise<TokenInfo> {
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

async function getSharedKeyBasedToken(
  cred: SasTokenProvider,
  audience: string,
): Promise<TokenInfo> {
  return {
    token: await cred.getToken(audience),
    type: TokenType.CbsTokenTypeSas,
    timeToLiveInMs: 45 * 60 * 1000,
  };
}

async function getTokenInfo(
  cred: SasTokenProvider | TokenCredential,
  audience: string,
): Promise<TokenInfo> {
  return isSasTokenProvider(cred) ? getSharedKeyBasedToken(cred, audience) : getAadToken(cred);
}

function negotiateClaim(
  { token, type }: TokenInfo,
  audience: string,
  cbsSession: CbsClient,
  timeoutAfterStartTime: number,
  lock: string,
  abortSignal?: AbortSignalLike,
): Promise<CbsResponse> {
  return defaultCancellableLock.acquire(
    lock,
    () =>
      cbsSession.negotiateClaim(audience, token.token, type, {
        abortSignal,
        timeoutInMs: timeoutAfterStartTime - Date.now(),
      }),
    {
      abortSignal,
      timeoutInMs: timeoutAfterStartTime - Date.now(),
    },
  );
}

async function setupClaimNegotiation(
  context: ConnectionContext,
  audience: string,
  info: TokenInfo,
  timeoutInMs: number,
  logger: SimpleLogger,
  {
    abortSignal,
  }: {
    abortSignal?: AbortSignalLike;
  },
): Promise<void> {
  const startTime = Date.now();
  logger.verbose(
    `acquiring cbs lock: '${context.cbsSession.cbsLock}' for creating the cbs session`,
  );

  await openCbsSession(context.cbsSession, timeoutInMs + startTime, { abortSignal });
  logger.verbose(`acquiring cbs lock: '${context.negotiateClaimLock}' for cbs auth`);
  await negotiateClaim(
    info,
    audience,
    context.cbsSession,
    timeoutInMs + startTime,
    context.negotiateClaimLock,
    abortSignal,
  );
  logger.verbose("claim negotiation succeeded");
}
