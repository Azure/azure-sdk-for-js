// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO Implement DtmiResolver. It is a delegate in C Sharp.
export type DtmiResolver = (identifiers: string[]) => Promise<string[] | null>;
