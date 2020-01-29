import { config } from "dotenv";
import { SearchIndexClient, SearchApiKeyCredential } from "../src";

config();

async function main() {
  const apiKey = process.env["SEARCH_API_KEY"]!;
  const apiName = process.env["SEARCH_API_NAME"]!;
  const indexName = process.env["INDEX_NAME"]!;

  const apiVersion = "2019-05-06";
  const credential = new SearchApiKeyCredential(apiKey);

  const client = new SearchIndexClient(apiVersion, apiName, indexName, credential);
  try {
    const count = await client.count();
    console.log(`${count} documents in index ${indexName}`);
  } catch (e) {
    console.log(e.response.headers);
    const body = e.response.bodyAsText;
    console.error("bad response", JSON.parse(body.slice(1)));
  }
}

main().catch((e) => console.error(e));
