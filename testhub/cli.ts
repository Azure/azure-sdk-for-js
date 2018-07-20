#!/usr/bin/env node

// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
/* tslint:disable */

import * as yargs from "yargs";
const CtrlC = require("death");
import { cache } from "./commands/sendReceive";
import { partitionCount, uberStartTime, startTime } from "./commands/receive";
import { getCurrentCommand } from "./utils/util";

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
  .option("e", {
    alias: "client-pool",
    describe: "Number of clients to be created",
    default: 1,
    number: true
  })
  .option("v", {
    alias: "key",
    describe: "SAS key for the key-name.",
    string: true
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


// if (!process.env.DEBUG) process.env.DEBUG = "azure*,rhea*,-rhea:raw,-rhea:message,-azure:amqp-common:datatransformer,-rhea:frame";

CtrlC((signal, err) => {
  if (getCurrentCommand() === "send-receive") {
    console.log("\nstats:");
    console.log("---------------------");
    console.log(" messageId | message ");
    console.log("---------------------");
    console.log("%o", cache);
    console.log("---------------------");
  } else if (getCurrentCommand() === "receive") {
    console.log("\nstats:");
    console.log("---------------------------------------------------------");
    console.log(" PartitionId | Received Message Count |  messages/second ");
    console.log("---------------------------------------------------------");
    for (const key in partitionCount) {
      const count = partitionCount[key].currCount;
      const duration = (partitionCount[key].currTimestamp - (startTime || uberStartTime)) / 1000;
      const rate = count / duration;
      console.log(`      ${key}      |          ${count}          |      ${rate}      `);
    }
    console.log("---------------------------------------------------------");
  }
  process.exit();
});