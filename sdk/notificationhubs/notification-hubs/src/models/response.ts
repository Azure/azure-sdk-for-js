// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RegistrationDescription } from "./registration.js";

/**
 * Describes a registration query response with registrations and a continuation token.
 */
export interface RegistrationQueryResponse {
  /**
   * The list of registrations.
   */
  registrations: RegistrationDescription[];
  /**
   * A continuation token to get more results.
   */
  continuationToken?: string;
}
