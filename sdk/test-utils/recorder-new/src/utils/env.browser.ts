// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// In the browser, we load the env variables with the help of karma.conf.js

export const env = (window as any).__env__;
