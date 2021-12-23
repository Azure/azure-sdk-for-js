import { TextAnalyticsClient, AzureKeyCredential } from "https://cdn.skypack.dev/@azure/ai-text-analytics";
import { assert } from "https://cdn.skypack.dev/chai";

describe("TextAnalytics skypack tests", function () {
  it("detects lanauges", async function() {
    // You will need to edit the following values
    const endpoint = "Endpoint";
    const apiKey = "API Key";

    const documents = [
      "This document is written in English.",
      "Este es un document escrito en Español.",
      "这是一个用中文写的文件",
      "Dies ist ein Dokument in deutsche Sprache.",
      "Detta är ett dokument skrivet på engelska."
    ];

    console.log("== Detect Language Sample ==");

    const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

    const results = await client.detectLanguage(documents);

    assert.isTrue(results.length > 0, "Expecting non-empty result array");
    for (const result of results) {
      console.log(`- Document ${result.id}`);
      assert.ok(result.id, "Expecting valid result id");
      assert.ok(!result.error, "Expecting non-error result");
      if (!result.error) {
        const primaryLanguage = result.primaryLanguage;
        console.log(
          `\tDetected language: ${primaryLanguage.name} (ISO 6391 code: ${primaryLanguage.iso6391Name})`
        );
      } else {
        console.error("\tError:", result.error);
      }
    }
  })
}).timeout(30000);
