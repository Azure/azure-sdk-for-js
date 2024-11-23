// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * A function that receives a challenge and resolves a promise with a string token.
 * @deprecated The Authenticator type is not currently in use.
 */
export type Authenticator = (challenge: unknown) => Promise<string>;
