// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// This file avoids adding dom to the tsconfig.
// We still need to reference the dom for ts compiliation, since
// in the browser url shim it references the URL dom.
/// <reference lib="dom" />
