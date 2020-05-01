// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ClientEntityContext } from "../clientEntityContext";
import {
  defaultLock,
  AccessToken,
  TokenType,
  SharedKeyCredential,
  Constants
} from "@azure/core-amqp";
import * as log from "../log";

/**
 * Negotiates our authentication token and returns a timer that is
 * responsible for renewing it.
 * @param context
 * @param audience
 * @param setTokenRenewal
 */
export async function negotiateClaim(
  context: ClientEntityContext,
  setTokenRenewal?: boolean
): Promise<any> {
  const audience = `${context.namespace.config.endpoint}${context.entityPath}`;

  const loggingContext = {
    address: context.entityPath,
    name: context.clientId
  };

  // Acquire the lock and establish a cbs session if it does not exist on the connection.
  // Although node.js is single threaded, we need a locking mechanism to ensure that a
  // race condition does not happen while creating a shared resource (in this case the
  // cbs session, since we want to have exactly 1 cbs session per connection).
  log.link(
    "[%s] Acquiring cbs lock: '%s' for creating the cbs session: '%s' with address: '%s'.",
    context.namespace.connectionId,
    context.namespace.cbsSession.cbsLock,
    loggingContext.name,
    loggingContext.address
  );

  await defaultLock.acquire(context.namespace.cbsSession.cbsLock, () => {
    return context.namespace.cbsSession.init();
  });

  let tokenTimeout: number;

  let tokenObject: AccessToken;
  let tokenType: TokenType;
  if (context.namespace.tokenCredential instanceof SharedKeyCredential) {
    tokenObject = context.namespace.tokenCredential.getToken(audience);
    tokenType = TokenType.CbsTokenTypeSas;
    // renew sas token in every 45 minutess
    tokenTimeout = (3600 - 900) * 1000;
  } else {
    const aadToken = await context.namespace.tokenCredential.getToken(Constants.aadServiceBusScope);
    if (!aadToken) {
      throw new Error(`Failed to get token from the provided "TokenCredential" object`);
    }
    tokenObject = aadToken;
    tokenType = TokenType.CbsTokenTypeJwt;
    tokenTimeout = tokenObject.expiresOnTimestamp - Date.now() - 2 * 60 * 1000;
  }

  log.link(
    "[%s] Calling negotiateClaim for audience '%s'.",
    context.namespace.connectionId,
    audience
  );
  // Acquire the lock to negotiate the CBS claim.
  log.link(
    "[%s] Acquiring cbs lock: '%s' for cbs auth: '%s' with address '%s'.",
    context.namespace.connectionId,
    context.namespace.negotiateClaimLock,
    loggingContext.name,
    loggingContext.address
  );
  if (!tokenObject) {
    throw new Error("Token cannot be null");
  }
  await defaultLock.acquire(context.namespace.negotiateClaimLock, () => {
    return context.namespace.cbsSession.negotiateClaim(audience, tokenObject, tokenType);
  });
  log.link(
    "[%s] Negotiated claim '%s' with with address: %s",
    context.namespace.connectionId,
    loggingContext.name,
    loggingContext.address
  );

  let tokenRenewalTimer: any;

  if (setTokenRenewal && tokenTimeout) {
    tokenRenewalTimer = setTimeout(async () => {
      try {
        await negotiateClaim(context, true);
      } catch (err) {
        log.error(
          "[%s] '%s' with address %s, an error occurred while renewing the token: %O",
          context.namespace.connectionId,
          loggingContext.name,
          loggingContext.address,
          err
        );
      }
    }, tokenTimeout);
    log.link(
      "[%s] '%s' with address %s, has next token renewal in %d milliseconds @(%s).",
      context.namespace.connectionId,
      loggingContext.name,
      loggingContext.address,
      tokenTimeout,
      new Date(Date.now() + tokenTimeout).toString()
    );
  }

  return tokenRenewalTimer;
}
