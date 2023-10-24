// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Shared configuration options for browser customization
 */
export interface BrowserCustomizationOptions {
  browserCustomizationOptions?: {
    /**
     * Format for error messages for display in browser
     */
    errorMessage: string;
    /**
     * Format for success messages for display in browser
     */
    successMessage: string;
  };
}
