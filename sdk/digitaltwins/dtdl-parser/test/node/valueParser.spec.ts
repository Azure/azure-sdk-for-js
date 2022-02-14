// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ParsingError } from "../../src/parser/parsingError";
import { ValueParser } from "../../src/parser/valueParser";
import { expect } from "chai";

describe("Tests of ValueParser class", function() {
  describe("Test parseSingularStringToken method", function() {
    it("detects stringNoValue", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = undefined;
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularStringToken(
        elementId,
        propertyName,
        token,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:stringNoValue");
    });

    it("detects stringObjectNoValue", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = { value: "The quick brown fox jumps over the lazy dog." };
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularStringToken(
        elementId,
        propertyName,
        token,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:stringObjectNoValue");
    });

    it("detects stringValueNotString", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = { "@value": true };
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularStringToken(
        elementId,
        propertyName,
        token,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:stringValueNotString");
    });

    it("detects stringNotString", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = true;
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularStringToken(
        elementId,
        propertyName,
        token,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:stringNotString");
    });

    it("detects stringNoValue in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token: any[] = [];
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularStringToken(
        elementId,
        propertyName,
        token,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:stringNoValue");
    });

    it("detects stringMultipleValues in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token: any[] = ["foo", "bar"];
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularStringToken(
        elementId,
        propertyName,
        token,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:stringMultipleValues");
    });

    it("detects stringTooLong", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = "The quick brown fox jumps over the lazy dog.";
      const maxLength = 32;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularStringToken(
        elementId,
        propertyName,
        token,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:stringTooLong");
    });

    it("detects stringInvalid", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = "The quick brown fox jumps over the lazy dog.";
      const maxLength = undefined;
      const pattern = /^[A-Za-z]*$/;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularStringToken(
        elementId,
        propertyName,
        token,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:stringInvalid");
    });

    it("succeeds with string", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = "The quick brown fox jumps over the lazy dog.";
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      expect(
        ValueParser.parseSingularStringToken(
          elementId,
          propertyName,
          token,
          maxLength,
          pattern,
          parsingErrors
        )
      ).to.equal(token);
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with string object", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = { "@value": "The quick brown fox jumps over the lazy dog." };
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      expect(
        ValueParser.parseSingularStringToken(
          elementId,
          propertyName,
          token,
          maxLength,
          pattern,
          parsingErrors
        )
      ).to.equal(token["@value"]);
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with string in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = ["The quick brown fox jumps over the lazy dog."];
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      expect(
        ValueParser.parseSingularStringToken(
          elementId,
          propertyName,
          token,
          maxLength,
          pattern,
          parsingErrors
        )
      ).to.equal(token[0]);
      expect(parsingErrors).to.have.lengthOf(0);
    });
  });

  describe("Test parseSingularIntegerToken method", function() {
    it("detects integerNoValue", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = undefined;
      const minInclusive = undefined;
      const maxInclusive = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularIntegerToken(
        elementId,
        propertyName,
        token,
        minInclusive,
        maxInclusive,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:integerNoValue");
    });

    it("detects integerObjectNoValue", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = { value: 42 };
      const minInclusive = undefined;
      const maxInclusive = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularIntegerToken(
        elementId,
        propertyName,
        token,
        minInclusive,
        maxInclusive,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:integerObjectNoValue");
    });

    it("detects integerValueNotInteger", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = { "@value": true };
      const minInclusive = undefined;
      const maxInclusive = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularIntegerToken(
        elementId,
        propertyName,
        token,
        minInclusive,
        maxInclusive,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:integerValueNotInteger"
      );
    });

    it("detects integerNotInteger", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = true;
      const minInclusive = undefined;
      const maxInclusive = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularIntegerToken(
        elementId,
        propertyName,
        token,
        minInclusive,
        maxInclusive,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:integerNotInteger");
    });

    it("detects integerNoValue in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token: any[] = [];
      const minInclusive = undefined;
      const maxInclusive = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularIntegerToken(
        elementId,
        propertyName,
        token,
        minInclusive,
        maxInclusive,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:integerNoValue");
    });

    it("detects integerMultipleValues in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token: any[] = [42, 43];
      const minInclusive = undefined;
      const maxInclusive = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularIntegerToken(
        elementId,
        propertyName,
        token,
        minInclusive,
        maxInclusive,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:integerMultipleValues"
      );
    });

    it("detects valueNotExact", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = 42;
      const minInclusive = 32;
      const maxInclusive = 32;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularIntegerToken(
        elementId,
        propertyName,
        token,
        minInclusive,
        maxInclusive,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:valueNotExact");
    });

    it("detects valueBelowMin", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = 42;
      const minInclusive = 50;
      const maxInclusive = 60;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularIntegerToken(
        elementId,
        propertyName,
        token,
        minInclusive,
        maxInclusive,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:valueBelowMin");
    });

    it("detects valueAboveMax", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = 42;
      const minInclusive = 20;
      const maxInclusive = 30;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularIntegerToken(
        elementId,
        propertyName,
        token,
        minInclusive,
        maxInclusive,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:valueAboveMax");
    });

    it("succeeds with integer", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = 42;
      const minInclusive = undefined;
      const maxInclusive = undefined;
      const parsingErrors: ParsingError[] = [];
      expect(
        ValueParser.parseSingularIntegerToken(
          elementId,
          propertyName,
          token,
          minInclusive,
          maxInclusive,
          parsingErrors
        )
      ).to.equal(token);
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with integer object", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = { "@value": 42 };
      const minInclusive = undefined;
      const maxInclusive = undefined;
      const parsingErrors: ParsingError[] = [];
      expect(
        ValueParser.parseSingularIntegerToken(
          elementId,
          propertyName,
          token,
          minInclusive,
          maxInclusive,
          parsingErrors
        )
      ).to.equal(token["@value"]);
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with integer in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = [42];
      const minInclusive = undefined;
      const maxInclusive = undefined;
      const parsingErrors: ParsingError[] = [];
      expect(
        ValueParser.parseSingularIntegerToken(
          elementId,
          propertyName,
          token,
          minInclusive,
          maxInclusive,
          parsingErrors
        )
      ).to.equal(token[0]);
      expect(parsingErrors).to.have.lengthOf(0);
    });
  });

  describe("Test parseSingularBooleanToken method", function() {
    it("detects booleanNoValue", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularBooleanToken(elementId, propertyName, token, parsingErrors);
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:booleanNoValue");
    });

    it("detects booleanObjectNoValue", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = { value: false };
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularBooleanToken(elementId, propertyName, token, parsingErrors);
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:booleanObjectNoValue");
    });

    it("detects booleanValueNotBoolean", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = { "@value": 626 };
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularBooleanToken(elementId, propertyName, token, parsingErrors);
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:booleanValueNotBoolean"
      );
    });

    it("detects booleanNotBoolean", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = 626;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularBooleanToken(elementId, propertyName, token, parsingErrors);
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:booleanNotBoolean");
    });

    it("detects booleanNoValue in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token: any[] = [];
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularBooleanToken(elementId, propertyName, token, parsingErrors);
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:booleanNoValue");
    });

    it("detects booleanMultipleValues in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token: any[] = [false, true];
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularBooleanToken(elementId, propertyName, token, parsingErrors);
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:booleanMultipleValues"
      );
    });

    it("succeeds with true", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = true;
      const parsingErrors: ParsingError[] = [];
      expect(ValueParser.parseSingularBooleanToken(elementId, propertyName, token, parsingErrors))
        .to.be.true;
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with false", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = false;
      const parsingErrors: ParsingError[] = [];
      expect(ValueParser.parseSingularBooleanToken(elementId, propertyName, token, parsingErrors))
        .to.be.false;
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with true in object", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = { "@value": true };
      const parsingErrors: ParsingError[] = [];
      expect(ValueParser.parseSingularBooleanToken(elementId, propertyName, token, parsingErrors))
        .to.be.true;
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with false in object", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = { "@value": false };
      const parsingErrors: ParsingError[] = [];
      expect(ValueParser.parseSingularBooleanToken(elementId, propertyName, token, parsingErrors))
        .to.be.false;
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with true in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = [true];
      const parsingErrors: ParsingError[] = [];
      expect(ValueParser.parseSingularBooleanToken(elementId, propertyName, token, parsingErrors))
        .to.be.true;
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with false in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = [false];
      const parsingErrors: ParsingError[] = [];
      expect(ValueParser.parseSingularBooleanToken(elementId, propertyName, token, parsingErrors))
        .to.be.false;
      expect(parsingErrors).to.have.lengthOf(0);
    });
  });

  describe("Test parseLangStringToken method", function() {
    it("detects langStringNoValue", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = undefined;
      const defaultLang = "en";
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseLangStringToken(
        elementId,
        propertyName,
        token,
        defaultLang,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:langStringNoValue");
    });

    it("detects langStringInvalidCode", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = { esperanto: "The quick brown fox jumps over the lazy dog." };
      const defaultLang = "en";
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseLangStringToken(
        elementId,
        propertyName,
        token,
        defaultLang,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:langStringInvalidCode"
      );
    });

    it("detects langStringValueNotString", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = { es: true };
      const defaultLang = "en";
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseLangStringToken(
        elementId,
        propertyName,
        token,
        defaultLang,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:langStringValueNotString"
      );
    });

    it("detects langStringElementNotObject in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = ["foo"];
      const defaultLang = "en";
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseLangStringToken(
        elementId,
        propertyName,
        token,
        defaultLang,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:langStringElementNotObject"
      );
    });

    it("detects langStringElementNoCode in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = [{ "@value": "The quick brown fox jumps over the lazy dog." }];
      const defaultLang = "en";
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseLangStringToken(
        elementId,
        propertyName,
        token,
        defaultLang,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:langStringElementNoCode"
      );
    });

    it("detects langStringElementCodeNotString in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = [
        { "@language": 626, "@value": "The quick brown fox jumps over the lazy dog." }
      ];
      const defaultLang = "en";
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseLangStringToken(
        elementId,
        propertyName,
        token,
        defaultLang,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:langStringElementCodeNotString"
      );
    });

    it("detects langStringElementInvalidCode in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = [
        { "@language": "esperanto", "@value": "The quick brown fox jumps over the lazy dog." }
      ];
      const defaultLang = "en";
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseLangStringToken(
        elementId,
        propertyName,
        token,
        defaultLang,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:langStringElementInvalidCode"
      );
    });

    it("detects langStringElementCodeNotUnique in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = [
        { "@language": "es", "@value": "The quick brown fox jumps over the lazy dog." },
        { "@language": "es", "@value": "Able was I ere i saw Elba." }
      ];
      const defaultLang = "en";
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseLangStringToken(
        elementId,
        propertyName,
        token,
        defaultLang,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:langStringElementCodeNotUnique"
      );
    });

    it("detects langStringElementNoValue in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = [{ "@language": "es" }];
      const defaultLang = "en";
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseLangStringToken(
        elementId,
        propertyName,
        token,
        defaultLang,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:langStringElementNoValue"
      );
    });

    it("detects langStringElementValueNotString in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = [{ "@language": "es", "@value": 626 }];
      const defaultLang = "en";
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseLangStringToken(
        elementId,
        propertyName,
        token,
        defaultLang,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:langStringElementValueNotString"
      );
    });

    it("detects langStringNotLangString", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = 626;
      const defaultLang = "en";
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseLangStringToken(
        elementId,
        propertyName,
        token,
        defaultLang,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:langStringNotLangString"
      );
    });

    it("detects langStringValueTooLong", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = { es: "The quick brown fox jumps over the lazy dog." };
      const defaultLang = "en";
      const maxLength = 32;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseLangStringToken(
        elementId,
        propertyName,
        token,
        defaultLang,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:langStringValueTooLong"
      );
    });

    it("detects langStringValueInvalid", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = { es: "The quick brown fox jumps over the lazy dog." };
      const defaultLang = "en";
      const maxLength = undefined;
      const pattern = /^[A-Za-z]*$/;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseLangStringToken(
        elementId,
        propertyName,
        token,
        defaultLang,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:langStringValueInvalid"
      );
    });

    it("succeeds with string", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = "The quick brown fox jumps over the lazy dog.";
      const defaultLang = "en";
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      expect(
        ValueParser.parseLangStringToken(
          elementId,
          propertyName,
          token,
          defaultLang,
          maxLength,
          pattern,
          parsingErrors
        )
      ).to.deep.equal({ en: "The quick brown fox jumps over the lazy dog." });
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with object", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = { es: "The quick brown fox jumps over the lazy dog." };
      const defaultLang = "en";
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      expect(
        ValueParser.parseLangStringToken(
          elementId,
          propertyName,
          token,
          defaultLang,
          maxLength,
          pattern,
          parsingErrors
        )
      ).to.deep.equal({ es: "The quick brown fox jumps over the lazy dog." });
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = [
        { "@language": "es", "@value": "The quick brown fox jumps over the lazy dog." }
      ];
      const defaultLang = "en";
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      expect(
        ValueParser.parseLangStringToken(
          elementId,
          propertyName,
          token,
          defaultLang,
          maxLength,
          pattern,
          parsingErrors
        )
      ).to.deep.equal({ es: "The quick brown fox jumps over the lazy dog." });
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with empty array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token: any[] = [];
      const defaultLang = "en";
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      expect(
        ValueParser.parseLangStringToken(
          elementId,
          propertyName,
          token,
          defaultLang,
          maxLength,
          pattern,
          parsingErrors
        )
      ).to.deep.equal({});
      expect(parsingErrors).to.have.lengthOf(0);
    });
  });

  describe("Test parseSingularLiteralToken method", function() {
    it("detects literalNoValue", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularLiteralToken(elementId, propertyName, token, parsingErrors);
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:literalNoValue");
    });

    it("detects literalNoValue in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token: any[] = [];
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularLiteralToken(elementId, propertyName, token, parsingErrors);
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:literalNoValue");
    });

    it("detects literalMultipleValues in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token: any[] = ["foo", "bar"];
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularLiteralToken(elementId, propertyName, token, parsingErrors);
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:literalMultipleValues"
      );
    });

    it("detects literalNotValid for object", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = { foo: "bar" };
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularLiteralToken(elementId, propertyName, token, parsingErrors);
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:literalNotValid");
    });

    it("detects literalNotValid for object in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = [{ foo: "bar" }];
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularLiteralToken(elementId, propertyName, token, parsingErrors);
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:literalNotValid");
    });

    it("detects literalNotValid for float", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = 3.14;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularLiteralToken(elementId, propertyName, token, parsingErrors);
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:literalNotValid");
    });

    it("detects literalNotValid for float in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = [3.14];
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularLiteralToken(elementId, propertyName, token, parsingErrors);
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:literalNotValid");
    });

    it("succeeds with string", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = "foo";
      const parsingErrors: ParsingError[] = [];
      const { value, typeFragment } = ValueParser.parseSingularLiteralToken(
        elementId,
        propertyName,
        token,
        parsingErrors
      );
      expect(value).to.be.equal("foo");
      expect(typeFragment).to.equal("#string");
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with string in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = ["foo"];
      const parsingErrors: ParsingError[] = [];
      const { value, typeFragment } = ValueParser.parseSingularLiteralToken(
        elementId,
        propertyName,
        token,
        parsingErrors
      );
      expect(value).to.be.equal("foo");
      expect(typeFragment).to.equal("#string");
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with integer", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = 42;
      const parsingErrors: ParsingError[] = [];
      const { value, typeFragment } = ValueParser.parseSingularLiteralToken(
        elementId,
        propertyName,
        token,
        parsingErrors
      );
      expect(value).to.be.equal(42);
      expect(typeFragment).to.equal("#integer");
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with integer in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = [42];
      const parsingErrors: ParsingError[] = [];
      const { value, typeFragment } = ValueParser.parseSingularLiteralToken(
        elementId,
        propertyName,
        token,
        parsingErrors
      );
      expect(value).to.be.equal(42);
      expect(typeFragment).to.equal("#integer");
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with true", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = true;
      const parsingErrors: ParsingError[] = [];
      const { value, typeFragment } = ValueParser.parseSingularLiteralToken(
        elementId,
        propertyName,
        token,
        parsingErrors
      );
      expect(value).to.be.true;
      expect(typeFragment).to.equal("#boolean");
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with false", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = false;
      const parsingErrors: ParsingError[] = [];
      const { value, typeFragment } = ValueParser.parseSingularLiteralToken(
        elementId,
        propertyName,
        token,
        parsingErrors
      );
      expect(value).to.be.false;
      expect(typeFragment).to.equal("#boolean");
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with true in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = [true];
      const parsingErrors: ParsingError[] = [];
      const { value, typeFragment } = ValueParser.parseSingularLiteralToken(
        elementId,
        propertyName,
        token,
        parsingErrors
      );
      expect(value).to.be.true;
      expect(typeFragment).to.equal("#boolean");
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with false in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = [false];
      const parsingErrors: ParsingError[] = [];
      const { value, typeFragment } = ValueParser.parseSingularLiteralToken(
        elementId,
        propertyName,
        token,
        parsingErrors
      );
      expect(value).to.be.false;
      expect(typeFragment).to.equal("#boolean");
      expect(parsingErrors).to.have.lengthOf(0);
    });
  });

  describe("Test parseSingularIdentifierToken method", function() {
    it("detects identifierNoValue", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = undefined;
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularIdentifierToken(
        elementId,
        propertyName,
        token,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:identifierNoValue");
    });

    it("detects identifierNoValue in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token: any[] = [];
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularIdentifierToken(
        elementId,
        propertyName,
        token,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:identifierNoValue");
    });

    it("detects identifierMultipleValues in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token: any[] = ["dtmi:foo;1", "dtmi:bar;1"];
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularIdentifierToken(
        elementId,
        propertyName,
        token,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal(
        "dtmi:dtdl:parsingError:identifierMultipleValues"
      );
    });

    it("detects identifierNotString", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = true;
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularIdentifierToken(
        elementId,
        propertyName,
        token,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:identifierNotString");
    });

    it("detects identifierNotString in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = [true];
      const maxLength = undefined;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularIdentifierToken(
        elementId,
        propertyName,
        token,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:identifierNotString");
    });

    it("detects identifierTooLong", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = "dtmi:the:quick:brown:fox:jumps:over:the:lazy:dog;3.4";
      const maxLength = 32;
      const pattern = undefined;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularIdentifierToken(
        elementId,
        propertyName,
        token,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:identifierTooLong");
    });

    it("detects identifierInvalid", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = "dtmi:foo:bar;3.4.5";
      const maxLength = undefined;
      const pattern = /^dtmi[A-Za-z:]+;\d+.\d+$/;
      const parsingErrors: ParsingError[] = [];
      ValueParser.parseSingularIdentifierToken(
        elementId,
        propertyName,
        token,
        maxLength,
        pattern,
        parsingErrors
      );
      expect(parsingErrors).to.have.lengthOf(1);
      expect(parsingErrors[0].validationId).to.equal("dtmi:dtdl:parsingError:identifierInvalid");
    });

    it("succeeds with identifier", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = "dtmi:foo:bar;3.4";
      const maxLength = 32;
      const pattern = /^dtmi[A-Za-z:]+;\d+.\d+$/;
      const parsingErrors: ParsingError[] = [];
      expect(
        ValueParser.parseSingularIdentifierToken(
          elementId,
          propertyName,
          token,
          maxLength,
          pattern,
          parsingErrors
        )
      ).to.equal(token);
      expect(parsingErrors).to.have.lengthOf(0);
    });

    it("succeeds with identifier in array", function() {
      const elementId = "dtmi:test:id0;1";
      const propertyName = "testProp";
      const token = ["dtmi:foo:bar;3.4"];
      const maxLength = 32;
      const pattern = /^dtmi[A-Za-z:]+;\d+.\d+$/;
      const parsingErrors: ParsingError[] = [];
      expect(
        ValueParser.parseSingularIdentifierToken(
          elementId,
          propertyName,
          token,
          maxLength,
          pattern,
          parsingErrors
        )
      ).to.equal(token[0]);
      expect(parsingErrors).to.have.lengthOf(0);
    });
  });
});
