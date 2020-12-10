// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// eslint-disable-next-line @typescript-eslint/ban-types
export type Authenticator = (challenge: object) => Promise<string>;
