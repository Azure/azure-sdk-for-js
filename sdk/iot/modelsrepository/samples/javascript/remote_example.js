// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * Demonstrates resolving/obtaining a particular model definition from a remote model repository
 */

const resolver = require("../../out/src/index.js");

// You can change the endpoint and dtmi you'd like to access
const repositoryEndpoint = "https://devicemodels.azure.com/";
const dtmi = process.argv[2] || "dtmi:rigado:FlicButton;2";

console.log(repositoryEndpoint, dtmi);

async function main() {
  // This is where you can change the options for how you want to resolve the dependencies.
  const result = await resolver.resolve(dtmi, repositoryEndpoint, {
    resolveDependencies: "tryFromExpanded"
  });
  console.log(result);
  Object.keys(result).forEach((fetchedDtmi) => {
    console.log(`DTMI is: ${fetchedDtmi}`);
    console.log(`DTDL Display Name is: ${result[fetchedDtmi].displayName}`);
    console.log(`DTDL Description is: ${result[fetchedDtmi].description}`);
    console.log("------------------------------------------------");
    console.log(JSON.stringify(result[fetchedDtmi]));
    console.log("------------------------------------------------");
  });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
