// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export * from "./onNotificationClick.js";
export * from "./onPush.js";

import { registerServiceWorkerMethods } from "./serviceWorkerInitialization.js";

registerServiceWorkerMethods();
