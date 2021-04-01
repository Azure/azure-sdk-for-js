# Release History

## 1.0.4 (Unreleased)

- A new type is exported, `ChallengeCallbackOptions`, which contains `scopes: string | string[]`, `claims?: string` (optional), `credential: TokenCredential`, `cachedToken: AccessToken | undefined`, `request: PipelineRequest`, and a `setAuthorizationHeader: (token: AccessToken) => void` function.
- Added a `challengeCallbacks` optional property to the `bearerTokenAuthenticationPolicy` that allows it to process authentication challenges, as follows:
    - `authenticateRequest`, which receives `options: ChallengeCallbackOptions`, and allows customizing the policy to alter how it authenticates before sending a request.
        - By default, this function will try to retrieve the token from the underlying credential, and if it receives one, it will cache the token and set it to the outgoing request. This was the original behavior of this policy.
    - `authenticateRequestOnChallenge`, which gets called only if we've found a challenge. Then it receives the `challenge: string` and also `options: ChallengeCallbackOptions`. If this method returns true, the underlying request will be sent again.
        - By default, this function tries to see if the original request received challenges through the "WWW-Authenticate" header. If so, it will try to retrieve the token with this challenge, and repeat the underlying request. If there was no challenge present, it will not repeat the underlying request.
    - In any of these two, the `setAuthorizationHeader` parameter received through the   `ChallengeCallbackOptions` will allow developers to easily assign a token to the ongoing request.
- Rewrote `bearerTokenAuthenticationPolicy` to use a new backend that refreshes tokens only when they're about to expire and not multiple times before. This is based on a similar fix implemented on `@azure/core-http@1.2.4` ([PR with the changes](https://github.com/Azure/azure-sdk-for-js/pull/14223)). This fixes the issue: [13369](https://github.com/Azure/azure-sdk-for-js/issues/13369).

## 1.0.3 (2021-03-30)

### Breaking Changes

- Updated @azure/core-tracing to version `1.0.0-preview.11`. See [@azure/core-tracing CHANGELOG](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/core/core-tracing/CHANGELOG.md) for details about breaking changes with tracing.

## 1.0.2 (2021-03-25)

- Fixed an issue where chunked HTTP responses would sometimes be decoded incorrectly when multibyte characters were used. [PR 14517](https://github.com/Azure/azure-sdk-for-js/pull/14517)

## 1.0.1 (2021-03-18)

- Fixed an issue where `timeout` and `abortSignal` of requests was not honored on Node after requests had already been issued to the server. [PR 14359](https://github.com/Azure/azure-sdk-for-js/pull/14359)

## 1.0.0 (2021-03-15)

GA release of this package.

## 1.0.0-beta.2 (2021-03-10)

- Renamed interfaces with `HTTPS` in the name to have `HTTP` instead.
- Changed from exposing `DefaultHttpsClient` as a class directly, to providing `createDefaultHttpsClient()` to instantiate the appropriate runtime class.
- Fix an issue when passing in proxy hosts. [PR 13911](https://github.com/Azure/azure-sdk-for-js/pull/13911)
- Package rename to `core-rest-pipeline` to better reflect its purpose.

## 1.0.0-beta.1 (2021-02-04)

- Changes from `core-http`:
  - First release of new Pipeline model, see README for details.
  - ServiceClient and related AutoRest functionality moved out to `core-client`.
  - XML functionality moved out to `core-xml`.
  - Removal of node-fetch dependency.
  - Switched to use `https-proxy-agent` for proxy support.
  - Dropped IE support.
  - Stopped exporting various helper/utility methods.
  - All function parameters are now interfaces.
  - Remove rpRegistrationPolicy.
  - Remove keepAlivePolicy
  - Let clients add ndJsonPolicy manually
  - Disable redirects by removing the policy instead of an option
  - Invert response decompression policy
  - Remove request cloning, to optimize pipeline allocations.
- Add ms-cv header used as correlation vector (used for distributed tracing) to list of non-redacted headers so that clients can share this header for debugging purposes. [PR 13541](https://github.com/Azure/azure-sdk-for-js/pull/13541)
