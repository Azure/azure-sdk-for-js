// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const contextPath = fileURLToPath(
  new URL("../src/generated/api/voiceAgentsContext.ts", import.meta.url),
);
const voiceAgentsOperationsPath = fileURLToPath(
  new URL("../src/generated/api/voiceAgents/operations.ts", import.meta.url),
);
const generatedImport =
  'import pkgJson from "@azure/ai-voiceagents/package.json" with { type: "json" };';
const constantImport = 'import { SDK_VERSION } from "../../constants.js";';
const source = await readFile(contextPath, "utf8");

if (!source.includes(generatedImport) && !source.includes(constantImport)) {
  throw new Error("Unable to locate the generated SDK version import.");
}

await writeFile(
  contextPath,
  source.replace(generatedImport, constantImport).replace("pkgJson.version", "SDK_VERSION"),
);

const operationsSource = await readFile(voiceAgentsOperationsPath, "utf8");
const createVoiceAgentStatus = 'const expectedStatuses = ["201"];';
const compatibleCreateVoiceAgentStatus = 'const expectedStatuses = ["200", "201"];';

if (
  !operationsSource.includes(createVoiceAgentStatus) &&
  !operationsSource.includes(compatibleCreateVoiceAgentStatus)
) {
  throw new Error("Unable to locate the generated createVoiceAgent success statuses.");
}

await writeFile(
  voiceAgentsOperationsPath,
  operationsSource.replace(createVoiceAgentStatus, compatibleCreateVoiceAgentStatus),
);

const updatedOperationsSource = await readFile(voiceAgentsOperationsPath, "utf8");
const deleteVoiceAgentStatus = `export async function _deleteVoiceAgentDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];`;
const compatibleDeleteVoiceAgentStatus = `export async function _deleteVoiceAgentDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];`;

if (
  !updatedOperationsSource.includes(deleteVoiceAgentStatus) &&
  !updatedOperationsSource.includes(compatibleDeleteVoiceAgentStatus)
) {
  throw new Error("Unable to locate the generated deleteVoiceAgent success statuses.");
}

await writeFile(
  voiceAgentsOperationsPath,
  updatedOperationsSource.replace(deleteVoiceAgentStatus, compatibleDeleteVoiceAgentStatus),
);

const finalOperationsSource = await readFile(voiceAgentsOperationsPath, "utf8");
const deleteVoiceAgentVersionStatus = `export async function _deleteVoiceAgentVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];`;
const compatibleDeleteVoiceAgentVersionStatus = `export async function _deleteVoiceAgentVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];`;

if (
  !finalOperationsSource.includes(deleteVoiceAgentVersionStatus) &&
  !finalOperationsSource.includes(compatibleDeleteVoiceAgentVersionStatus)
) {
  throw new Error("Unable to locate the generated deleteVoiceAgentVersion success statuses.");
}

await writeFile(
  voiceAgentsOperationsPath,
  finalOperationsSource.replace(
    deleteVoiceAgentVersionStatus,
    compatibleDeleteVoiceAgentVersionStatus,
  ),
);
