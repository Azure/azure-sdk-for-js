// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import debugModule from "debug";
/**
 * @ignore
 * log statements for error
 */
export const error = debugModule("azure:eventhubs-checkpointstore-blob");
/**
 * @ignore
 * log statements for the checkpoint store
 */
export const blobCheckpointStore = debugModule("azure:eventhubs-checkpointstore-blob:info");
