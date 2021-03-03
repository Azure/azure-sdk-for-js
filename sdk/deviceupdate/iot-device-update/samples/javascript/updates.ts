const { DeviceUpdateClient } = require("@azure/iot-device-update");
const { DefaultAzureCredential } = require("@azure/identity");
const { config } = require("dotenv");

config();

const accountEndpoint = process.env["ACCOUNT_ENDPOINT"] || "<ACCOUNT_ENDPOINT>";
const instanceId = process.env["INSTANCE_ID"] || "<INSTANCE_ID>";

/**
 * Get a list of all update providers that have been imported to Device Update for IoT Hub
 */
async function listProviders() {
  const credentials = new DefaultAzureCredential();
  const client = new DeviceUpdateClient(credentials, accountEndpoint, instanceId);

  const providers = client.updates.listProviders();

  for await (const provider of providers) {
    console.log(provider);
  }
}

listProviders().catch(console.error);
