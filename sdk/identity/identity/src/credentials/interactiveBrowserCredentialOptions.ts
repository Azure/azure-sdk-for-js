// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { InteractiveCredentialOptions } from "./interactiveCredentialOptions";

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
