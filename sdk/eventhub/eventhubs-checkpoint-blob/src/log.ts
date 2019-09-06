// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import debugModule from "debug";
/**
 * @ignore
 * log statements for error
 */
export const error = debugModule("azure:eventhubs-checkpoint-blob");
/**
 * @ignore
 * log statements for blobPartitionManager
 */
export const blobPartitionManager = debugModule("azure:eventhubs-checkpoint-blob:info");
