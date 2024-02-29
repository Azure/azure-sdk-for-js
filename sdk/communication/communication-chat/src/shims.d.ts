// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// d.ts shims provide types for things we use internally but are not part
// of this package's surface area.

// Shim for DOM's navigator's product status
interface Navigator {
    readonly product: string;
}
