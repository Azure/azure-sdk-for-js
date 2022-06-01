// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createParsingError } from "../../src/parser/parsingError";
import { expect } from "chai";

describe("Test ParsingError", function() {
  it("sets properties and formats strings", function() {
    const parsingError = createParsingError("dtmi:dtdl:parsingError:nonConformantDatatype", {
      cause:
        "{primaryId:p} property {property} has value {value}; however, {secondaryId:n} specifies a different datatype.",
      action: "Change the value of property {property} to a value with a matching datatype.",
      primaryId: "dtmi:test:myInterface:_contents:__myTelemetry:_schema;1",
      secondaryId: "dtmi:test:myInterface:_contents:__myProperty:_annotation;1",
      property: "elementSchema",
      value: "42"
    });

    expect(parsingError.validationId).to.equal("dtmi:dtdl:parsingError:nonConformantDatatype");
    expect(parsingError.cause).to.equal(
      `dtmi:test:myInterface;1 has 'contents' value with name 'myTelemetry' which has 'schema' value whose property elementSchema has value 42; however, dtmi:test:myInterface;1 has 'contents' value with name 'myProperty' which has 'annotation' value which specifies a different datatype.`
    );
    expect(parsingError.action).to.equal(
      `Change the value of property elementSchema to a value with a matching datatype.`
    );
    expect(parsingError.primaryId).to.equal(
      "dtmi:test:myInterface:_contents:__myTelemetry:_schema;1"
    );
    expect(parsingError.secondaryId).to.equal(
      "dtmi:test:myInterface:_contents:__myProperty:_annotation;1"
    );
    expect(parsingError.property).to.equal("elementSchema");
    expect(parsingError.value).to.equal("42");
  });

  it("allows undefined properties", function() {
    const parsingError = createParsingError("dtmi:dtdl:parsingError:unhelpfulError", {
      cause: "Something is wrong.",
      action: "Fix it."
    });

    expect(parsingError.validationId).to.equal("dtmi:dtdl:parsingError:unhelpfulError");
    expect(parsingError.cause).to.equal(`Something is wrong.`);
    expect(parsingError.action).to.equal(`Fix it.`);
    expect(parsingError.primaryId).to.equal("");
    expect(parsingError.secondaryId).to.equal("");
    expect(parsingError.property).to.equal("");
    expect(parsingError.value).to.equal("");
  });
});
