/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 * 
 */
import { GeneratedDataCollectionClientOptionalParams } from "./generated";
/**
 * This package is used for logs data ingestion for the [Azure Monitor](https://docs.microsoft.com/azure/azure-monitor/overview) resource.
 * @packageDocumentation
 */

import { DataCollectionRule, DataCollectionRuleIngestOptionalParams } from "./generated";


export interface DataCollectionClientOptions extends GeneratedDataCollectionClientOptionalParams {
}

export interface LogsIngestionClient extends DataCollectionRule {

};
export interface LogsIngestionClientOptions extends DataCollectionRuleIngestOptionalParams {

};
