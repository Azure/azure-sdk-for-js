// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { createPrinter } from "../../util/printer";
import { leafCommand } from "../../util/commandBuilder";

const log = createPrinter("world");

export const commandInfo = {
  name: "world",
  description:
    "print a lovely message",
  options: {
      echo: {
          kind: "string",
          description: "override the message to be printed",
          default: "Hello world!"
      }
  }
} as const;

export default leafCommand(commandInfo, async (options) => {
    // Demonstrate the colorized command output.
    log("Normal:", options.echo);
    log.success("Success:", options.echo);
    log.info("Info:", options.echo);
    log.warn("Warn:", options.echo);
    log.error("Error:", options.echo);
    log.debug("Debug:", options.echo);

    return true;
});