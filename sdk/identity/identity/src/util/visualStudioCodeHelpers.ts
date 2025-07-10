// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import type { AuthenticationRecord } from "../msal/types.js";
import { deserializeAuthenticationRecord } from "../msal/utils.js";
import { credentialLogger } from "./logging.js";

const logger = credentialLogger("VisualStudioCodeHelpers");

/**
 * Finds the path to the VS Code authentication record file.
 * @returns The path to the authentication record file, or undefined if not found.
 */
export function isVSCodeAuthRecordAvailable(): string | undefined {
  const homedir = os.homedir();
  const azureDirs = [".azure", ".Azure"];

  for (const azureDir of azureDirs) {
    const authPath = path.join(
      homedir,
      azureDir,
      "ms-azuretools.vscode-azureresourcegroups",
      "authRecord.json",
    );
    if (existsSync(authPath)) {
      return authPath;
    }
  }
  return undefined;
}

/**
 * Reads the VS Code authentication record from the user's home directory.
 * @returns The authentication record if found and successfully parsed, undefined otherwise.
 */
export async function loadVSCodeAuthRecord(): Promise<AuthenticationRecord | undefined> {
  const authRecordPath = isVSCodeAuthRecordAvailable();

  if (!authRecordPath) {
    logger.info(
      "The Visual Studio Code authentication record file does not exist in either .azure or .Azure directory.",
    );
    return undefined;
  }

  try {
    const authRecordContent = await fs.readFile(authRecordPath, { encoding: "utf8" });
    return deserializeAuthenticationRecord(authRecordContent);
  } catch (error: any) {
    logger.info(`Failed to read or parse VS Code authentication record: ${error.message}`);
    return undefined;
  }
}
