// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// In the browser, we load the env variables with the help of karma.conf.js

export const env = (self as unknown as { __env__: typeof process.env }).__env__;
