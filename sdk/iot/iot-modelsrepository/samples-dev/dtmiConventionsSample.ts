// Copyright (c) Microsoft.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a getModelUri and isValidDtmi, helper functions for interacting with DTMIs.
 */

import { getModelUri, isValidDtmi } from "@azure/iot-modelsrepository";

function main() {
  const dtmi1 = "dtmi:com:example:Thermostat;1";
  const dtmi2 = "dtmi:com:example:Thermostat";
  // returns true
  const result1 = isValidDtmi(dtmi1);
  console.log(`${dtmi1} is valid? ${result1}`);

  // returns false
  const result2 = isValidDtmi(dtmi2);
  console.log(`${dtmi2} is valid? ${result2}`);
  // local repository fully qualified path to a model file
  const fullyQualifiedLocalPath = getModelUri(
    "dtmi:com:example:Thermostat;1",
    "file:///path/to/repository/",
  );
  console.log(fullyQualifiedLocalPath);

  const fullyQualifiedRemotePath = getModelUri(
    "dtmi:com:example:Thermostat;1",
    "https://contoso.com/models",
  );
  console.log(fullyQualifiedRemotePath);
}

main();
