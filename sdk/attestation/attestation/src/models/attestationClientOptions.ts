/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 */
import {
    PipelineOptions
} from "@azure/core-http"

/**
 * Attestation Client Options.
 */
 export interface AttestationClientOptions
 extends PipelineOptions {
 /**
  * Api Version
  */
 apiVersion?: string;
 /**
  * Overrides client endpoint.
  */
 endpoint?: string;
}
