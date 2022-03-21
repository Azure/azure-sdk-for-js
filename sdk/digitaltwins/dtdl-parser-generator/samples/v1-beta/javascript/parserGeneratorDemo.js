// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates the use of the Digital Twins Parser Generator to generate a parser based on a given digest file.
 */

const { ParserCodeGenerator } = require("@azure-tools/dtdl-parser-generator");

ParserCodeGenerator.execute("dtdl/digest.json", "../digital-twins-parser/src/generated", "2");
