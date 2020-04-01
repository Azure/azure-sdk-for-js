// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type Authenticator = (challenge: object) => Promise<string>;
