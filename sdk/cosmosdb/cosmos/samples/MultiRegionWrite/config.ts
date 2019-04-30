const endpoint = process.env["endpoint"];
const key = process.env["key"];

if (!endpoint || !key) {
  // tslint:disable-next-line:no-console
  console.error("Missing endpoint and key environment variables. Exiting...");
  process.exit(1);
}

const regions = process.env["regions"].split(";");

const databaseName = process.env["databaseName"] || "js-mww-test";
const manualCollectionName = process.env["manualCollectionName"] || "manualCollection";
const lwwCollectionName = process.env["lwwCollectionName"] || "lwwCollection";
const udpCollectionName = process.env["udpCollectionName"] || "udpCollection";
const basicCollectionName = process.env["basicCollectionName"] || "basicCollection";

export default {
  endpoint,
  key,
  regions,
  databaseName,
  manualCollectionName,
  lwwCollectionName,
  udpCollectionName,
  basicCollectionName
};
