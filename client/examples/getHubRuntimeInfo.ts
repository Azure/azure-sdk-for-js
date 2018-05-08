import { EventHubClient } from "../lib";

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = "Endpoint=sb://eastusjs.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=t0lzFgdX6F4aDwaLFNpH9do+mVItQYF8UipAvuttpMA=" || process.env[connectionString];
const path = "test1" || process.env[entityPath];
console.log(path);

async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  let info = await client.getHubRuntimeInformation();
  console.log("RuntimeInfo: ", info);
  let pInfo = await client.getPartitionInformation("0");
  console.log("Partition Information: ", pInfo);
  await client.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
