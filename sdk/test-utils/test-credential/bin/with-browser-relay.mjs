#!/usr/bin/env node

import { spawn } from "child_process";

import "./browser-relay-server.mjs";

spawn(process.argv[2], process.argv.slice(3), { stdio: "inherit", shell: true }).on(
  "exit",
  process.exit
);
