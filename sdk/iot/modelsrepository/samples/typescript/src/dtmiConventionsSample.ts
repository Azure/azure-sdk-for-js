// Copyright (c) Microsoft. 
// Licensed under the MIT license.

import {getModelUri, isValidDtmi} from "../../../src";

function main() {

  // returns true
  isValidDtmi("dtmi:com:example:Thermostat;1");

  // returns false
  isValidDtmi("dtmi:com:example:Thermostat");

  // local repository fully qualified path to a model file
  const fullyQualifiedLocalPath = getModelUri("dtmi:com:example:Thermostat;1", "file:///path/to/repository/");
  console.log(fullyQualifiedLocalPath);

  const fullyQualifiedRemotePath = getModelUri("dtmi:com:example:Thermostat;1", "https://contoso.com/models");
  console.log(fullyQualifiedRemotePath);
}

main();