// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import readline from "node:readline";

/**
 * Prompt a user for input.
 *
 * @param prompt - The prompt to display to the user.
 * @returns The user's input.
 */
export async function prompt(prompt: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}
