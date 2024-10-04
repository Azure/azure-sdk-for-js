// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { writeFile } from "fs/promises";
import { FilePurpose } from "openai/resources/index";

export function getName(purpose: FilePurpose, fileSize: number): string {
  return `file${fileSize}.${purpose === "assistants" ? "txt" : "jsonl"}`;
}

export async function createFile(purpose: FilePurpose, fileSize: number): Promise<void> {
  const fileName = getName(purpose, fileSize);
  switch (purpose) {
    case "fine-tune":
    case "batch": {
      await createBatchFile(fileName, fileSize);
      break;
    }
    case "assistants": {
      await createBatchFile(fileName, fileSize);
      break;
    }
    default:
      throw new Error(`Unknown purpose: ${purpose}`);
  }
}

async function createBatchFile(fileName: string, fileSize: number): Promise<void> {
  return createFileWith(fileName, fileSize, createBatchLine);
}

async function createFileWith(
  fileName: string,
  fileSize: number,
  createChunk: () => Buffer,
): Promise<void> {
  fileSize = fileSize * 1000 * 1000 - 1000;
  const chunk = createChunk();
  const writesCount = Math.floor(fileSize / chunk.byteLength);
  for (let i = 0; i < writesCount; i++) {
    await writeFile(fileName, chunk, { flag: "a", encoding: "utf8" });
  }
}

function createBatchLine(): Buffer {
  const lineObj = {
    custom_id: "request-1",
    method: "POST",
    url: "/v1/chat/completions",
    body: {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "What is 2+2?" },
      ],
    },
  };
  return Buffer.from(JSON.stringify(lineObj) + "\n");
}
