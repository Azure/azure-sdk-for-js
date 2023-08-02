// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * The options for customizing the browser for interactive authentication
 */
export interface BrowserCustomizationOptions {
    /**
     * Property to set HtmlMessageSuccess of SystemWebViewOptions from MSAL,
     * which the browser will show to the user when the user finishes 
     * authenticating successfully.
     */
    htmlMessageSuccess?: string;
    /**
     * Property to set HtmlMessageError of SystemWebViewOptions from MSAL,
     * which the browser will show to the user when the user finishes authenticating, but an error occurred.
     * You can use a string format e.g. "An error has occurred: {0} details: {1}".
     */
    htmlMessageError?: string;
}