// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Specify test tsconfig file for Windows
 */
process.env.TS_NODE_PROJECT = "test/tsconfig.json";
// TODO:Remove after emulator statrts supporitng MakeList and MakeSet
process.env.DISABLE_LIST_AND_SET_AGGREGATE = "true";
