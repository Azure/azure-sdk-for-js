// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates usage of @azure/identity-broker and @azure/identity
 * packages for SHR Pop support in WAM scenario with a custom Pop Token Authentication Policy.
 */

const { InteractiveBrowserCredential, useIdentityPlugin } = require("@azure/identity");
const { nativeBrokerPlugin } = require("@azure/identity-broker");
const { setLogLevel } = require("@azure/logger");
const dotenv = require("dotenv");
const { app, BrowserWindow } = require("electron");
const { createEmptyPipeline, createPipelineRequest, createDefaultHttpClient } = require('@azure/core-rest-pipeline');

setLogLevel("info");
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AbortError } = require('@azure/abort-controller');

// Default options for the cycler if none are provided
const DEFAULT_CYCLER_OPTIONS = {
    forcedRefreshWindowInMs: 1000, // Force waiting for a refresh 1s before the token expires
    retryIntervalInMs: 3000, // Allow refresh attempts every 3s
    refreshWindowInMs: 1000 * 60 * 2, // Start refreshing 2m before expiry
};
/**
 * Converts an an unreliable access token getter (which may resolve with null)
 * into an AccessTokenGetter by retrying the unreliable getter in a regular
 * interval.
 *
 * @param getAccessToken - A function that produces a promise of an access token that may fail by returning null.
 * @param retryIntervalInMs - The time (in milliseconds) to wait between retry attempts.
 * @param refreshTimeout - The timestamp after which the refresh attempt will fail, throwing an exception.
 * @returns - A promise that, if it resolves, will resolve with an access token.
 */
async function beginRefresh(getAccessToken, retryIntervalInMs, refreshTimeout) {
    // This wrapper handles exceptions gracefully as long as we haven't exceeded
    // the timeout.
    async function tryGetAccessToken() {
        if (Date.now() < refreshTimeout) {
            try {
                return await getAccessToken();
            }
            catch {
                return null;
            }
        }
        else {
            const finalToken = await getAccessToken();
            // Timeout is up, so throw if it's still null
            if (finalToken === null) {
                throw new Error("Failed to refresh access token.");
            }
            return finalToken;
        }
    }
    let token = await tryGetAccessToken();
    while (token === null) {
        await delay(retryIntervalInMs);
        token = await tryGetAccessToken();
    }
    return token;
}
/**
 * Creates a token cycler from a credential, scopes, and optional settings.
 *
 * A token cycler represents a way to reliably retrieve a valid access token
 * from a TokenCredential. It will handle initializing the token, refreshing it
 * when it nears expiration, and synchronizes refresh attempts to avoid
 * concurrency hazards.
 *
 * @param credential - the underlying TokenCredential that provides the access
 * token
 * @param tokenCyclerOptions - optionally override default settings for the cycler
 *
 * @returns - a function that reliably produces a valid access token
 */
function createTokenCycler(credential, tokenCyclerOptions) {
    let refreshWorker = null;
    let token = null;
    let tenantId;
    const options = {
        ...DEFAULT_CYCLER_OPTIONS,
        ...tokenCyclerOptions,
    };
    /**
     * This little holder defines several predicates that we use to construct
     * the rules of refreshing the token.
     */
    const cycler = {
        /**
         * Produces true if a refresh job is currently in progress.
         */
        get isRefreshing() {
            return refreshWorker !== null;
        },
        /**
         * Produces true if the cycler SHOULD refresh (we are within the refresh
         * window and not already refreshing)
         */
        get shouldRefresh() {
            if (cycler.isRefreshing) {
                return false;
            }
            if (token?.refreshAfterTimestamp && token.refreshAfterTimestamp < Date.now()) {
                return true;
            }
            return (token?.expiresOnTimestamp ?? 0) - options.refreshWindowInMs < Date.now();
        },
        /**
         * Produces true if the cycler MUST refresh (null or nearly-expired
         * token).
         */
        get mustRefresh() {
            return (token === null || token.expiresOnTimestamp - options.forcedRefreshWindowInMs < Date.now());
        },
    };
    /**
     * Starts a refresh job or returns the existing job if one is already
     * running.
     */
    function refresh(scopes, getTokenOptions) {
        if (!cycler.isRefreshing) {
            // We bind `scopes` here to avoid passing it around a lot
            const tryGetAccessToken = () => credential.getToken(scopes, getTokenOptions);
            // Take advantage of promise chaining to insert an assignment to `token`
            // before the refresh can be considered done.
            refreshWorker = beginRefresh(tryGetAccessToken, options.retryIntervalInMs, 
            // If we don't have a token, then we should timeout immediately
            token?.expiresOnTimestamp ?? Date.now())
                .then((_token) => {
                refreshWorker = null;
                token = _token;
                tenantId = getTokenOptions.tenantId;
                return token;
            })
                .catch((reason) => {
                // We also should reset the refresher if we enter a failed state.  All
                // existing awaiters will throw, but subsequent requests will start a
                // new retry chain.
                refreshWorker = null;
                token = null;
                tenantId = undefined;
                throw reason;
            });
        }
        return refreshWorker;
    }
    return async (scopes, tokenOptions) => {
        //
        // Simple rules:
        // - If we MUST refresh, then return the refresh task, blocking
        //   the pipeline until a token is available.
        // - If we SHOULD refresh, then run refresh but don't return it
        //   (we can still use the cached token).
        // - Return the token, since it's fine if we didn't return in
        //   step 1.
        //
        const hasClaimChallenge = Boolean(tokenOptions.claims);
        const tenantIdChanged = tenantId !== tokenOptions.tenantId;
        if (hasClaimChallenge) {
            // If we've received a claim, we know the existing token isn't valid
            // We want to clear it so that that refresh worker won't use the old expiration time as a timeout
            token = null;
        }
        // If the tenantId passed in token options is different to the one we have
        // Or if we are in claim challenge and the token was rejected and a new access token need to be issued, we need to
        // refresh the token with the new tenantId or token.
        const mustRefresh = tenantIdChanged || hasClaimChallenge || cycler.mustRefresh;
        if (mustRefresh) {
            return refresh(scopes, tokenOptions);
        }
        if (cycler.shouldRefresh) {
            refresh(scopes, tokenOptions);
        }
        return token;
    };
}
function delay(delayInMs, value, options) {
    return new Promise((resolve, reject) => {
        let timer = undefined;
        let onAborted = undefined;
        const rejectOnAbort = () => {
            return reject(new AbortError(options?.abortErrorMsg ? options?.abortErrorMsg : "The operation was aborted."));
        };
        const removeListeners = () => {
            if (options?.abortSignal && onAborted) {
                options.abortSignal.removeEventListener("abort", onAborted);
            }
        };
        onAborted = () => {
            if (timer) {
                clearTimeout(timer);
            }
            removeListeners();
            return rejectOnAbort();
        };
        if (options?.abortSignal && options.abortSignal.aborted) {
            return rejectOnAbort();
        }
        timer = setTimeout(() => {
            removeListeners();
            resolve(value);
        }, delayInMs);
        if (options?.abortSignal) {
            options.abortSignal.addEventListener("abort", onAborted);
        }
    });
}
//# sourceMappingURL=popTokenCycler.js.map
async function authorizeRequestOnClaimChallenge(onChallengeOptions) {
    const { scopes, response } = onChallengeOptions;
    const logger = onChallengeOptions.logger;
    const challenge = response.headers.get("WWW-Authenticate");
    if (!challenge) {
        logger?.info(`The WWW-Authenticate header was missing. Failed to perform the Continuous Access Evaluation authentication flow.`);
        return false;
    }
   
    // Use regular expression to match the nonce value
    const nonceMatch = challenge.match(/nonce="([^"]*)"/);
    if (!nonceMatch) {
        return false;
    }
    // Check if the nonce was found
    const nonce = nonceMatch[1];
    const accessToken = await onChallengeOptions.getAccessToken(scopes, {
        proofOfPossessionOptions: {
            nonce: nonce,
            resourceRequestMethod: onChallengeOptions.request.method,
            resourceRequestUri: onChallengeOptions.request.url
        }
    });
    if (!accessToken) {
        return false;
    }
    onChallengeOptions.request.headers.set("Authorization", `pop ${accessToken.token}`);
    return true;
}
//# sourceMappingURL=authRequestPopChallenge.js.map

/**
 * The programmatic identifier of the popTokenAuthenticationPolicy.
 */
const popTokenAuthenticationPolicyName = "popTokenAuthenticationPolicy";
function popTokenAuthenticationPolicy(options) {
  const { credential, scopes, challengeCallbacks } = options;
  const logger = options.logger;
  const callbacks = {
      authorizeRequest: challengeCallbacks?.authorizeRequest ?? defaultAuthorizeRequest,
      authorizeRequestOnChallenge: challengeCallbacks?.authorizeRequestOnChallenge,
      // keep all other properties
      ...challengeCallbacks,
  };
  // This function encapsulates the entire process of reliably retrieving the token
  // The options are left out of the public API until there's demand to configure this.
  // Remember to extend `popTokenAuthenticationPolicyOptions` with `TokenCyclerOptions`
  // in order to pass through the `options` object.
  const getAccessToken = credential
      ? createTokenCycler(credential /* , options */)
      : () => Promise.resolve(null);
  return {
      name: popTokenAuthenticationPolicyName,
      /**
       * If there's no challenge parameter:
       * - It will try to retrieve the token using the cache, or the credential's getToken.
       * - Then it will try the next policy with or without the retrieved token.
       *
       * It uses the challenge parameters to:
       * - Skip a first attempt to get the token from the credential if there's no cached token,
       *   since it expects the token to be retrievable only after the challenge.
       * - Prepare the outgoing request if the `prepareRequest` method has been provided.
       * - Send an initial request to receive the challenge if it fails.
       * - Process a challenge if the response contains it.
       * - Retrieve a token with the challenge information, then re-send the request.
       */
      async sendRequest(request, next) {
          if (!request.url.toLowerCase().startsWith("https://")) {
              throw new Error("pop token authentication is not permitted for non-TLS protected (non-https) URLs.");
          }
          await callbacks.authorizeRequest({
              scopes: Array.isArray(scopes) ? scopes : [scopes],
              request,
              getAccessToken,
              logger,
          });
          let response;
          let error;
          try {
              response = await next(request);
          }
          catch (err) {
              error = err;
              response = err.response;
          }
          if (callbacks.authorizeRequestOnChallenge &&
              response?.status === 401 &&
              getChallenge(response)) {
              // processes challenge
              // TODO: parse the challenge and get the nonce
              const shouldSendRequest = await callbacks.authorizeRequestOnChallenge({
                  scopes: Array.isArray(scopes) ? scopes : [scopes],
                  request,
                  response,
                  getAccessToken,
                  logger
              });
              if (shouldSendRequest) {
                  return next(request);
              }
          }
          if (error) {
              throw error;
          }
          else {
              return response;
          }
      },
  };
}
/**
 * Default authorize request handler
 */
async function defaultAuthorizeRequest(options) {
    const { scopes, getAccessToken, request } = options;
    const getTokenOptions = {
        abortSignal: request.abortSignal,
        tracingOptions: request.tracingOptions,
    };
    const accessToken = await getAccessToken(scopes, getTokenOptions);
    if (accessToken) {
        options.request.headers.set("Authorization", `pop ${accessToken.token}`);
    }
}
/**
 * We will retrieve the challenge only if the response status code was 401,
 * and if the response contained the header "WWW-Authenticate" with a non-empty value.
 */
function getChallenge(response) {
    const challenge = response.headers.get("WWW-Authenticate");
    if (response.status === 401 && challenge) {
        return challenge;
    }
    return;
}
/**
 * A policy that can request a token from a TokenCredential implementation and
 * then apply it to the Authorization header of a request as a pop token.
 */

//# sourceMappingURL=popTokenAuthenticationPolicy.js.map

// Load the environment
dotenv.config();

// Load the plugin

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })
  win.loadFile('index.html')
  return win.getNativeWindowHandle()
}

async function sendGraphRequest(credential) {
  const pipeline = createEmptyPipeline();
  // how to create pop policy?
  pipeline.addPolicy(popTokenAuthenticationPolicy({
      credential,
      "scopes": "https://graph.microsoft.com/.default",
      challengeCallbacks: {
          authorizeRequestOnChallenge: authorizeRequestOnClaimChallenge
      },
  }));
  const req = createPipelineRequest({
      //url: "https://graph.microsoft.com/v1.0/me",
      url: "https://graph.microsoft.com/v1.0/users/kaghiya@microsoft.com"
  });
  const client = createDefaultHttpClient();
  const result = await pipeline.sendRequest(client, req);
  console.log(`Result status from Graph request => ${result.status}`);
  console.log(`Result body from Graph request => ${result.bodyAsText}`);
}
app.on('ready', async () => {
  let winHandle = createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      winHandle = createWindow()
    }
  })

  useIdentityPlugin(
    nativeBrokerPlugin
  );

  try {
    const credential = new InteractiveBrowserCredential({
      clientId: process.env.AZURE_CLIENT_ID || "client",
      authorityHost: process.env.AZURE_AUTHORITY_HOST,
      tenantId: process.env.AZURE_TENANT_ID,
      brokerOptions: {
        enabled: true,
        parentWindowHandle: winHandle,
        legacyEnableMsaPassthrough: true
      }
    });

    // This is the scope we will use to get a token from the Microsoft Entra token endpoint.
    // By default, we'll use the Microsoft Graph scope as an example, but when
    // you use the credential with an Azure SDK package, it will configure the
    // scope for you automatically.
    // const scope = process.env.AAD_TEST_SCOPE ?? "https://graph.microsoft.com/.default";

    await sendGraphRequest(credential);
  }
  catch (e) {
    console.log(e);
  }

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
