// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { InteractiveCredentialOptions } from "./interactiveCredentialOptions";

/**
 * (Browser-only feature)
 * The "login style" to use in the authentication flow:
 * - "redirect" redirects the user to the authentication page and then
 *   redirects them back to the page once authentication is completed.
 * - "popup" opens a new browser window through with the redirect flow
 *   is initiated.  The user's existing browser window does not leave
 *   the current page
 */
export type BrowserLoginStyle = "redirect" | "popup";

/**
 * Defines the common options for the InteractiveBrowserCredential class.
 */
export type InteractiveBrowserCredentialOptions = TokenCredentialOptions &
  InteractiveCredentialOptions & {
    /**
     * Gets the redirect URI of the application. This should be same as the value
     * in the application registration portal.  Defaults to `window.location.href`.
     */
    redirectUri?: string | (() => string);

    /**
     * The Azure Active Directory tenant (directory) ID.
     */
    tenantId?: string;

    /**
     * The client (application) ID of an App Registration in the tenant.
     */
    clientId?: string;
  };

/**
 * Defines the common options for the InteractiveBrowserCredential class.
 */
export type InteractiveBrowserCredentialBrowserOptions = TokenCredentialOptions &
  InteractiveCredentialOptions & {
    /**
     * Gets the redirect URI of the application. This should be same as the value
     * in the application registration portal.  Defaults to `window.location.href`.
     */
    redirectUri?: string | (() => string);

    /**
     * The Azure Active Directory tenant (directory) ID.
     */
    tenantId?: string;

    /**
     * The client (application) ID of an App Registration in the tenant.
     * This parameter is required on the browser.
     */
    clientId: string;

    /**
     * Specifies whether a redirect or a popup window should be used to
     * initiate the user authentication flow. Possible values are "redirect"
     * or "popup" (default) for browser and "popup" (default) for node.
     */
    loginStyle?: BrowserLoginStyle;

    /**
     * Parameters to the underlying login method. Related to the Open ID Connect protocol layer.
     */
    loginOptions?: {
      /**
       * A value included in the request that is also returned in the token response.
       * A randomly generated unique value is typically used for preventing cross site request forgery attacks.
       * The state is also used to encode information about the user's state in the app before the authentication request occurred.
       */
      state?: string;

      /**
       * A value included in the request that is returned in the id token.
       * A randomly generated unique value is typically used to mitigate replay attacks.
       */
      nonce?: string;

      /**
       * Provides a hint about the tenant or domain that the user should use to sign in. The value of the domain hint is a registered domain for the tenant.
       */
      domainHint?: string;

      /**
       * String to string map of custom query parameters added to the /authorize call
       */
      extraQueryParameters?: { [key: string]: string };

      /**
       * The page that should be returned to after loginRedirect or acquireTokenRedirect. This should only be used if this is different from the redirectUri and will default to the page that initiates the request. When the navigateToLoginRequestUrl config option is set to false this parameter will be ignored.
       */
      redirectStartPage?: string;

      /**
       * Callback that will be passed the url that MSAL will navigate to. Returning false in the callback will stop navigation.
       */
      onRedirectNavigate?: (url: string) => boolean | void;

      /**
       * In cases where Azure AD tenant admin has enabled conditional access policies, and the policy has not been met, exceptions will contain claims that need to be consented to.
       */
      claims?: string;
    };
  };
