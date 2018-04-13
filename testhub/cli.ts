#!/usr/bin/env node

// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
/* tslint:disable */

import * as yargs from "yargs";

yargs
  .version("0.1.0")
  .commandDir("./commands")
  .strict()
  .option("h", { alias: "help" })
  .option("c", {
    alias: "conn-str",
    describe: "EventHub connection string.",
    string: true
  })
  .option("n", {
    alias: "hub",
    describe: "Name of the EventHub.",
    demandOption: true,
    string: true
  })
  .option("a", {
    alias: "address",
    describe: "Address URI to the EventHub entity.",
    string: true
  })
  .option("k", {
    alias: "key-name",
    describe: "SAS key-name for the EventHub.",
    string: true
  })
  .option("v", {
    alias: "key",
    describe: "SAS key for the key-name.",
    string: true
  })
  .option("d", {
    alias: "duration",
    describe: "The value must be in seconds. Send or receive messages for the specified duration. Useful for benchmark testing.",
    number: true
  })
  .conflicts({
    "c": ["a", "k", "v"]
  })
  .global(["h", "c", "n", "a", "k", "v", "l"])
  .help()
  .argv;

if (yargs.argv._.length === 0 && yargs.argv.h === false) {
  yargs.coerce('help', function (arg) { return true; }).argv;
}