// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export type Authenticator = (challenge: unknown) => Promise<string>;
