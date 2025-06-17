// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Utils to delete an agent with a given ID or IDs.
 */

async function deleteAgent(client, agentId) {
  console.log(`Deleting agent with ID: ${agentId}`);
  const ids = Array.isArray(agentId) ? agentId : [agentId];
  for (const id of ids) {
    console.log(`Deleting agent with ID: ${id}`);
    await client.deleteAgent(id);
  }
  console.log(`Agent with ID: ${agentId} deleted successfully.`);
}

module.exports = { deleteAgent };
