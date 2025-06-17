// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Utils for creating an agent, also with tools.
 */

require("dotenv/config");
const { getTool } = require("./createTool.js");

const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";
// Create an agent
async function createAgent(client, tools = [], name, instructions, options = {}) {
  const { tools: agentTools, toolResources } = getTool(tools);
  const instructionsProp = instructions ?? "You are a helpful agent.";

  const nextOptions = {
    ...options,
    tools: [...(options.tools ?? []), ...agentTools],
    toolResources: toolResources ?? options.toolResources,
  };

  const agent = await client.createAgent(modelDeploymentName, {
    name: name ?? "my-agent",
    instructions: instructionsProp,
    ...nextOptions,
  });
  return agent;
}

async function createSimpleAgent(client, name, instructions) {
  const agent = await client.createAgent(modelDeploymentName, {
    name: name ?? "my-agent",
    instructions: instructions ?? "You are helpful agent",
  });
  console.log(`Created agent, agent ID : ${agent.id}`);
  return agent;
}

module.exports = { createAgent, createSimpleAgent };
