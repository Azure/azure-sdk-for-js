import { DeviceUpdateClient } from "../../..";
import { DefaultAzureCredential } from "@azure/identity";
import { config } from "dotenv";

config();

const accountEndpoint = process.env["ACCOUNT_ENDPOINT"] || "<ACCOUNT_ENDPOINT>";
const instanceId = process.env["INSTANCE_ID"] || "<INSTANCE_ID>";

async function checkDeviceUpdates() {
  const credentials = new DefaultAzureCredential();
  const client = new DeviceUpdateClient(credentials, accountEndpoint, instanceId);

  const result = await client.devices.getDevice("1");

  console.log(result);
}

checkDeviceUpdates();
