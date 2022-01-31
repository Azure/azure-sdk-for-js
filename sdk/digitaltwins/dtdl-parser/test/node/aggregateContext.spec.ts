// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

import { AggregateContext } from "../../src/parser";
import { ParsingError } from "../../src/parser/parsingError";
import { expect } from "chai";

describe("AggregateContext", function() {
  describe("dtdlVersion", function() {
    it("is 0 when no context", function() {
      const aggregateContext = new AggregateContext(false, false);
      expect(aggregateContext.dtdlVersion).to.equal(0);
    });
    it("is 2 when DTDLv2 context", function() {
      const parsingErrors: ParsingError[] = [];
      const aggregateContext = new AggregateContext(false, false).getChildContext(
        { "@context": "dtmi:dtdl:context;2" },
        parsingErrors
      );
      expect(aggregateContext.dtdlVersion).to.equal(2);
    });
    it("is 3 when DTDLv3 context", function() {
      const parsingErrors: ParsingError[] = [];
      const aggregateContext = new AggregateContext(false, false).getChildContext(
        { "@context": "dtmi:dtdl:context;3" },
        parsingErrors
      );
      expect(aggregateContext.dtdlVersion).to.equal(3);
    });
  });

  describe("getTermOrUri", function() {
    it("returns term if in DTDLv2 context", function() {
      expect(AggregateContext.getTermOrUri("dtmi:dtdl:class:Boolean;2")).to.equal("Boolean");
    });
    it("returns term if in DTDLv3 context", function() {
      expect(AggregateContext.getTermOrUri("dtmi:dtdl:class:Boolean;3")).to.equal("Boolean");
    });
    it("returns URI if not in context", function() {
      expect(AggregateContext.getTermOrUri("dtmi:dtdl:class:Foobar;2")).to.equal(
        "dtmi:dtdl:class:Foobar;2"
      );
    });
  });

  describe("isIdentifierInContext", function() {
    it("returns true if in DTDLv2 context", function() {
      expect(AggregateContext.isIdentifierInContext("dtmi:dtdl:class:Boolean;2")).to.be.true;
    });
    it("returns true if in DTDLv3 context", function() {
      expect(AggregateContext.isIdentifierInContext("dtmi:dtdl:class:Boolean;3")).to.be.true;
    });
    it("returns false if not in context", function() {
      expect(AggregateContext.isIdentifierInContext("dtmi:dtdl:class:Foobar;2")).to.be.false;
    });
  });

  describe("getChildContext", function() {
    it("succeeds when given DTDLv2 context", function() {
      const parsingErrors: ParsingError[] = [];
      const aggregateContext = new AggregateContext(false, false);
      aggregateContext.getChildContext({ "@context": "dtmi:dtdl:context;2" }, parsingErrors);
    });
    it("succeeds when given DTDLv3 context", function() {
      const parsingErrors: ParsingError[] = [];
      const aggregateContext = new AggregateContext(false, false);
      aggregateContext.getChildContext({ "@context": "dtmi:dtdl:context;3" }, parsingErrors);
    });
    it("throws when given DTDLv100 context", function() {
      const parsingErrors: ParsingError[] = [];
      const aggregateContext = new AggregateContext(false, false);
      expect(() =>
        aggregateContext.getChildContext({ "@context": "dtmi:dtdl:context;100" }, parsingErrors)
      ).to.throw();
    });
    it("throws when no context", function() {
      const parsingErrors: ParsingError[] = [];
      const aggregateContext = new AggregateContext(false, false);
      expect(() => aggregateContext.getChildContext({}, parsingErrors)).to.throw();
    });
    it("succeeds when nested no context", function() {
      const parsingErrors: ParsingError[] = [];
      const aggregateContext = new AggregateContext(false, false).getChildContext(
        { "@context": "dtmi:dtdl:context;2" },
        parsingErrors
      );
      aggregateContext.getChildContext({}, parsingErrors);
    });
    it("throws when context not string", function() {
      const parsingErrors: ParsingError[] = [];
      const aggregateContext = new AggregateContext(false, false).getChildContext(
        { "@context": "dtmi:dtdl:context;2" },
        parsingErrors
      );
      expect(() => aggregateContext.getChildContext({ "@context": 626 }, parsingErrors)).to.throw();
    });
    it("throws with local context when DTDLv2", function() {
      const parsingErrors: ParsingError[] = [];
      const aggregateContext = new AggregateContext(false, false).getChildContext(
        { "@context": "dtmi:dtdl:context;2" },
        parsingErrors
      );
      expect(() =>
        aggregateContext.getChildContext({ "@context": { foo: "dtmi:bar;1" } }, parsingErrors)
      ).to.throw();
    });
    it("throws with local context when DTDLv3", function() {
      const parsingErrors: ParsingError[] = [];
      const aggregateContext = new AggregateContext(false, false).getChildContext(
        { "@context": "dtmi:dtdl:context;3" },
        parsingErrors
      );
      expect(() =>
        aggregateContext.getChildContext({ "@context": { foo: "dtmi:bar;1" } }, parsingErrors)
      ).to.throw();
    });
  });

  describe("createDtmi", function() {
    it("returns undefined when no context", function() {
      const aggregateContext = new AggregateContext(false, false);
      expect(aggregateContext.createDtmi("dtmi:foo:bar;1")).to.be.undefined;
    });
    it("returns undefined when invalid DTMI", function() {
      const parsingErrors: ParsingError[] = [];
      const aggregateContext = new AggregateContext(false, false).getChildContext(
        { "@context": "dtmi:dtdl:context;2" },
        parsingErrors
      );
      expect(aggregateContext.createDtmi("dtmi://foo")).to.be.undefined;
    });
    it("returns DTMI when valid DTMI", function() {
      const parsingErrors: ParsingError[] = [];
      const aggregateContext = new AggregateContext(false, false).getChildContext(
        { "@context": "dtmi:dtdl:context;2" },
        parsingErrors
      );
      const dtmi = aggregateContext.createDtmi("dtmi:foo:bar;1");
      expect(dtmi).to.have.property("majorVersion");
      expect(dtmi?.value).to.equal("dtmi:foo:bar;1");
      expect(dtmi?.majorVersion).to.equal(1);
    });
    it("returns DTMI when in DTDLv2 context", function() {
      const parsingErrors: ParsingError[] = [];
      const aggregateContext = new AggregateContext(false, false).getChildContext(
        { "@context": "dtmi:dtdl:context;2" },
        parsingErrors
      );
      const dtmi = aggregateContext.createDtmi("Boolean");
      expect(dtmi).to.have.property("majorVersion");
      expect(dtmi?.value).to.equal("dtmi:dtdl:class:Boolean;2");
      expect(dtmi?.majorVersion).to.equal(2);
    });
    it("returns DTMI when in DTDLv3 context", function() {
      const parsingErrors: ParsingError[] = [];
      const aggregateContext = new AggregateContext(false, false).getChildContext(
        { "@context": "dtmi:dtdl:context;3" },
        parsingErrors
      );
      const dtmi = aggregateContext.createDtmi("Boolean");
      expect(dtmi).to.have.property("majorVersion");
      expect(dtmi?.value).to.equal("dtmi:dtdl:class:Boolean;3");
      expect(dtmi?.majorVersion).to.equal(3);
    });
  });
});
