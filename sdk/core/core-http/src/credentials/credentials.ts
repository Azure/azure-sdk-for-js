// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// A function that receives a challenge and resolves a promise with a string token.
export type Authenticator = (challenge: unknown) => Promise<string>;
