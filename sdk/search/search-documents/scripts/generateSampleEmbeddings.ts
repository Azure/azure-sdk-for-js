// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OpenAI } from "openai";
import { getBearerTokenProvider, DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";
import { createWriteStream } from "fs";

const outputPath = "samples-dev/vectors.ts";

const inputs = [
  {
    ident: "fancyStayEnVector",
    text: "Best hotel in town if you like luxury hotels. They have an amazing infinity pool, a spa, and a really helpful concierge. The location is perfect -- right downtown, close to all the tourist attractions. We highly recommend this hotel.",
    comment: "An embedding of Fancy Stay's English description",
  },
  {
    ident: "fancyStayFrVector",
    text: "Meilleur hôtel en ville si vous aimez les hôtels de luxe. Ils ont une magnifique piscine à débordement, un spa et un concierge très utile. L'emplacement est parfait – en plein centre, à proximité de toutes les attractions touristiques. Nous recommandons fortement cet hôtel.",
    comment: "An embedding of Fancy Stay's French description",
  },
  {
    ident: "luxuryQueryVector",
    text: "What are the most luxurious hotels?",
    comment: 'An embedding of the query "What are the most luxurious hotels?"',
  },
];

async function main(): Promise<void> {
  const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
  if (!endpoint) {
    throw new Error("Please set the AZURE_OPENAI_ENDPOINT environment variable.");
  }
  const model = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
  if (!model ) {
    throw new Error("Please set the AZURE_OPENAI_DEPLOYMENT_NAME environment variable.");
  }
  const credential = new DefaultAzureCredential();
  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(credential, scope);
  const client = new OpenAI({ baseURL: endpoint + "/openai/v1", apiKey: azureADTokenProvider });

  const writeStream = createWriteStream(outputPath, { mode: 0o755 });

  writeStream.cork();

  writeStream.write(
    "// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\n",
  );

  const expressions = await Promise.all(
    inputs.map(async ({ ident, text, comment }) => {
      const result = await client.embeddings.create({ input: [text], model });
      const embedding = result.data[0].embedding;
      return `// ${comment}\nexport const ${ident} = [${embedding.toString()}];\n\n`;
    }),
  );

  expressions.forEach((expr) => writeStream.write(expr));

  writeStream.uncork();
}

main();
