// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See the @microsoft/rush package's LICENSE file for license information.

// This script searches for package.json files recursively under a given path
// excluding packages under a node_modules folder and opens them to determine
// whether they contain a "sdk-archetype" field with the value of "client".
//
// If they do, then the package name is recorded and then after all package.json files
// have been scanned a single string is output using the Azure Pipelines Commands special
// syntax which creates a variable for use within a later stage of the pipeine.

console.log(
  '##vso[task.setvariable variable=GeneratedPackageTargets;]--to "@azure/core-http" --to "@azure/amqp-common" --to "@azure/abort-controller"'
);
