// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Stage-polymorphism primitives for authoring sample-tests.
 *
 * These utilities support the staged meta-programming model where test code
 * (stage T) is compiled into publishable sample code (stage S). The compiler
 * performs stage erasure — transforming test-stage code into sample-stage code
 * using import-provenance-based dead reference elimination and explicit staging
 * constructs defined in this module.
 *
 * @packageDocumentation
 */

export { forPublishing } from "./forPublishing.js";
export { sampleOnly } from "./sampleOnly.js";
