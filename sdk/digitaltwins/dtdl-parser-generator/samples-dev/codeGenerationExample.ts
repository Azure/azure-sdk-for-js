// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates the use of a Model Parser Generator to validate a PnP model.
 */

import { TsLibrary, TsDeclarationType, TsAccess } from "@azure-tools/dtdl-parser-generator";

function main() {
  const tsLibrary = new TsLibrary("./example_library");
  const tsClass = tsLibrary.class({
    name: "testClass",
    exports: true,
    inheritance: [{ name: "WindInterface", type: TsDeclarationType.Interface }]
  });

  // Add imports
  tsClass.import("import {WindInterface} from './example_interface';");

  // Create Docstring
  tsClass.docString
    .line("this is an example of using the tsClass in it's entirety.")
    .line("hopefully it works!");

  // Populate Fields
  tsClass
    .field({ name: "_units", access: TsAccess.Private, type: "string" })
    .field({ name: "_windPower", access: TsAccess.Private, type: "number" })
    .field({ name: "_windSpeed", access: TsAccess.Private, type: "number", optional: true })
    .field({ name: "_name", access: TsAccess.Private, type: "string" });

  // Create Constructor with Super
  tsClass.ctor
    .parameter({ name: "units", type: "string" })
    .parameter({ name: "wind", type: "number" })
    .body.line("this._units = units;")
    .line("this._windPower = wind;")
    .line(`this._name = 'test'`);

  // Create getter
  tsClass.getter({ name: "name", returnType: "string" }).body.line("return this._name");

  tsClass
    .getter({ name: "windSpeed", returnType: "number | undefined" })
    .body.line("return this._windSpeed");

  tsClass.getter({ name: "units", returnType: "string" }).body.line("return this._units");

  tsClass.getter({ name: "windPower", returnType: "number" }).body.line("return this._windPower");

  // Create setter
  tsClass
    .setter({ name: "name" })
    .parameter({ name: "input", type: "string" })
    .body.line("this._name = input;");

  const windSpeedMethod = tsClass
    .method({ name: "windSpeedMethod", returnType: "void" })
    .parameter({ name: "input", type: "number", optional: true }).body;

  windSpeedMethod
    .line("// this is a method to do something very important")
    .if("input === undefined")
    .line("console.log('input is undefined`');")
    .elseIf("input <= -1")
    .line("console.log('resetting windspeed');")
    .line("this._windSpeed = 0;")
    .elseIf("input < 100")
    .line("console.log('updating windspeed');")
    .line("this._windSpeed = input;")
    .else()
    .line("throw new Error('invalid input.');");

  windSpeedMethod.line("// this ends the method.");

  tsClass.inline("./samples-dev/test.ts", "codeblock1");

  tsLibrary.generateFiles();
}

main();
