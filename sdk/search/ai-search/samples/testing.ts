import { config } from "dotenv";
import { SearchIndexClient, SearchApiKeyCredential } from "../src";

config();

async function main() {
  const apiKey = process.env["SEARCH_API_KEY"]!;
  const apiName = process.env["SEARCH_API_NAME"]!;
  //const indexName = process.env["INDEX_NAME"]!;
  //const indexName = "realestate-us-sample-index";
  const indexName = "hotels-sample-index";

  const credential = new SearchApiKeyCredential(apiKey);

  const client = new SearchIndexClient(apiName, indexName, credential);
  const count = await client.count();
  console.log(`${count} documents in index ${indexName}`);

  const result = await client.autocomplete("sg", "W");
  console.log(result);

  const result2 = await client.suggest("sg", "wifi", {
    select: "HotelId,HotelName",
    highlightPreTag: "<em>",
    highlightPostTag: "</em>",
    top: 3
  });
  console.log(result2);

  // const stars = 4, price = 200.0;
  // const options = {
  //   filter: odata`Rooms/any(room: room/BaseRate lt ${price}) and Rating ge ${stars}`,
  //   order: "Rating desc",
  //   select: "HotelId", "HotelName", "Rating"],
  // };
  // let results = await client.search("WiFi", options);
  // for await (const result of results) {
  //   console.log(`${result.HotelName}: ${result.Rating}`);
  // }

  // const result = await client.search("WiFi", {
  //   filter: "Rooms/any(room: room/BaseRate lt 200) and Rating ge 4",
  //   orderBy: "Rating desc",
  //   select: "HotelId,HotelName,Rating",
  //   includeTotalResultCount: true
  // });
  // console.log(result);

  // let idx = 0;
  // for await (const result of client.listSearchResults("*", { select: "listingId" })) {
  //   console.log(idx++, result);
  // }
}

main().catch((e) => console.error(e));
