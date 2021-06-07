// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import debugModule from "debug";
/**
 * @hidden
 * log statements for error
 */
export const error = debugModule("azure:eph:error");
/**
 * @hidden
 * log statements for lease
 */
export const baseLease = debugModule("azure:eph:baseLease");
/**
 * @hidden
 * log statements for lease
 */
export const completeLease = debugModule("azure:eph:completeLease");
/**
 * @hidden
 * log statements for azurebloblease
 */
export const azurebloblease = debugModule("azure:eph:azurebloblease");
/**
 * @hidden
 * log statements for leaseManager
 */
export const leaseManager = debugModule("azure:eph:leaseManager");
/**
 * @hidden
 * log statements for partitionManager
 */
export const partitionManager = debugModule("azure:eph:partitionManager");
/**
 * @hidden
 * log statements for partitionManager
 */
export const partitionPump = debugModule("azure:eph:partitionPump");
/**
 * @hidden
 * log statements for pumpManager
 */
export const pumpManager = debugModule("azure:eph:pumpManager");
/**
 * @hidden
 * log statements for partitionScanner
 */
export const partitionScanner = debugModule("azure:eph:partitionScanner");
/**
 * @hidden
 * log statements for host
 */
export const host = debugModule("azure:eph:host");
/**
 * @hidden
 * log statements for blobService
 */
export const blobService = debugModule("azure:eph:blobService");
/**
 * @hidden
 * log statements for partitionContext
 */
export const partitionContext = debugModule("azure:eph:partitionContext");
/**
 * @hidden
 * log statements for checkpointLeaseMgr
 */
export const checkpointLeaseMgr = debugModule("azure:eph:checkpointLeaseMgr");
/**
 * @hidden
 * log statements for checkpointLeaseMgr
 */
export const checkpoint = debugModule("azure:eph:checkpointInfo");

/**
 * @hidden
 * log statements for checkpointLeaseMgr
 */
export const util = debugModule("azure:eph:util");
