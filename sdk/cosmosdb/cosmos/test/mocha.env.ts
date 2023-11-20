// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * Specify test tsconfig file for Windows
 */
process.env.TS_NODE_PROJECT = "test/tsconfig.json";
process.env.NODE_OPTIONS = "--dns-result-order=ipv4first";
