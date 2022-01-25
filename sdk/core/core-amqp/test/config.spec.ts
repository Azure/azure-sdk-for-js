// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as chai from "chai";
import { ConnectionConfig } from "../src";
import { isSharedAccessSignature } from "../src/connectionConfig/connectionConfig";

const should = chai.should();

describe("ConnectionConfig", function () {
  describe("Base", function () {
    it("populates config properties from an Event Hubs connection string", function (done) {
      const config = ConnectionConfig.create(
        "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep"
      );
      config.should.have.property("host").that.equals("hostname.servicebus.windows.net");
      config.should.have.property("sharedAccessKeyName").that.equals("sakName");
      config.should.have.property("sharedAccessKey").that.equals("sak");
      config.should.have.property("entityPath").that.equals("ep");
      done();
    });

    it("populates path from the path argument if connection string does not have EntityPath", function (done) {
      const config = ConnectionConfig.create(
        "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak",
        "abc"
      );
      config.should.have.property("entityPath").that.equals("abc");
      done();
    });

    it("should create a connection config when path is not provided and the connectionstring also does not contain EntityPath", function (done) {
      const connectionString =
        "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak";
      const config = ConnectionConfig.create(connectionString);
      should.not.exist(config.entityPath);
      done();
    });

    it("handles arbitrary whitespace around ; and = elements", (done) => {
      const connectionString = `
        Endpoint = sb://hostname.servicebus.windows.net/;
        SharedAccessKeyName = sakName;
        SharedAccessKey = sak;
        EntityPath = ep;
      `;
      const config = ConnectionConfig.create(connectionString);
      config.should.have.property("host").that.equals("hostname.servicebus.windows.net");
      config.should.have.property("sharedAccessKeyName").that.equals("sakName");
      config.should.have.property("sharedAccessKey").that.equals("sak");
      config.should.have.property("entityPath").that.equals("ep");
      done();
    });

    it("requires a value before an assignment", (done) => {
      const connectionString = `
        = something;
      `;

      should.throw(() => {
        ConnectionConfig.create(connectionString);
      }, /Connection string malformed/);

      done();
    });

    it("allows an empty value after an assignment", (done) => {
      const connectionString = `
        Endpoint = sb://hostname.servicebus.windows.net/;
        SharedAccessKey=;
      `;
      const config = ConnectionConfig.create(connectionString);
      config.should.have.property("host").that.equals("hostname.servicebus.windows.net");
      config.should.have.property("sharedAccessKey").that.equals("");
      done();
    });

    it("requires an assignment for each part", (done) => {
      const connectionString = `
        EntityPath;
      `;

      should.throw(() => {
        ConnectionConfig.create(connectionString);
      }, /Connection string malformed/);
      done();
    });

    it("requires that Endpoint be present in the connection string", (done) => {
      const connectionString = `
        EntityPath=ep;
      `;

      should.throw(() => {
        ConnectionConfig.create(connectionString);
      }, /Missing Endpoint/);

      done();
    });

    describe("Throws error if required connection config properties are not present", function () {
      const connectionString = `
        Endpoint=sb://hostname.servicebus.windows.net/;
        SharedAccessKeyName=sakName;
        SharedAccessKey=sakName;
        EntityPath=ep;
      `;

      it("requires that connection config be present", (done) => {
        should.throw(() => {
          ConnectionConfig.validate(undefined as any);
        }, /Missing configuration/);

        done();
      });

      it("requires that Endpoint be present in the connection config", (done) => {
        const config: ConnectionConfig = {
          connectionString: connectionString,
          endpoint: "",
          host: "hostname.servicebus.windows.net/",
          sharedAccessKeyName: "sakName",
          sharedAccessKey: "sak",
        };

        should.throw(() => {
          ConnectionConfig.validate(config);
        }, /Missing 'endpoint'/);

        done();
      });

      it("requires that host be present in the connection config", (done) => {
        const config: ConnectionConfig = {
          connectionString: connectionString,
          endpoint: "sb://hostname.servicebus.windows.net/",
          host: "",
          sharedAccessKeyName: "sakName",
          sharedAccessKey: "sak",
        };

        should.throw(() => {
          ConnectionConfig.validate(config);
        }, /Missing 'host'/);

        done();
      });

      it("requires that entityPath be present in the connection config", (done) => {
        const config: ConnectionConfig = {
          connectionString: connectionString,
          endpoint: "sb://hostname.servicebus.windows.net/",
          host: "hostname.servicebus.windows.net/",
          sharedAccessKeyName: "sakName",
          sharedAccessKey: "sak",
          entityPath: "",
        };

        should.throw(() => {
          ConnectionConfig.validate(config, { isEntityPathRequired: true });
        }, /Missing 'entityPath'/);

        done();
      });

      it("requires that sharedAccessKeyName be present in the connection config", (done) => {
        const config: ConnectionConfig = {
          connectionString: connectionString,
          endpoint: "sb://hostname.servicebus.windows.net/",
          host: "hostname.servicebus.windows.net/",
          sharedAccessKeyName: "",
          sharedAccessKey: "sak",
        };

        should.throw(() => {
          ConnectionConfig.validate(config);
        }, /Missing 'sharedAccessKeyName'/);

        done();
      });

      it("requires that sharedAccessKey be present in the connection config", (done) => {
        const config: ConnectionConfig = {
          connectionString: connectionString,
          endpoint: "sb://hostname.servicebus.windows.net/",
          host: "hostname.servicebus.windows.net/",
          sharedAccessKeyName: "sakName",
          sharedAccessKey: "",
        };

        should.throw(() => {
          ConnectionConfig.validate(config);
        }, /Missing 'sharedAccessKey'/);

        done();
      });
    });

    describe("EntityPath Validation", function () {
      const connectionString = `
        Endpoint=sb://hostname.servicebus.windows.net/;
        SharedAccessKeyName=sakName;
        SharedAccessKey=sakName;
        EntityPath=ep;
      `;
      const config: ConnectionConfig = {
        connectionString: connectionString,
        endpoint: "sb://hostname.servicebus.windows.net/",
        host: "hostname.servicebus.windows.net/",
        sharedAccessKeyName: "sakName",
        sharedAccessKey: "abcd",
      };

      it("undefined is not stringified", () => {
        config.entityPath = undefined;
        ConnectionConfig.validate(config);
        should.equal(config.entityPath, undefined, `EntityPath is not undefined`);
      });

      it("null is not stringified", () => {
        config.entityPath = null as any;
        ConnectionConfig.validate(config);
        should.equal(config.entityPath, null, `EntityPath is not null`);
      });

      it("number is stringified", () => {
        config.entityPath = 3 as any;
        ConnectionConfig.validate(config);
        should.equal(config.entityPath, "3", `EntityPath is not stringified`);
      });

      it("string is unchanged", () => {
        config.entityPath = "entityPath";
        ConnectionConfig.validate(config);
        should.equal(config.entityPath, "entityPath", `EntityPath is not a string`);
      });
    });
  });

  describe("SharedAccessSignature", () => {
    [
      "Endpoint=hello;SharedAccessSignature=SharedAccessSignature sr=<resource>&sig=someb64=&se=<expiry>&skn=<keyname>",
      "SharedAccessSignature=SharedAccessSignature sr=<resource>&sig=someb64=&se=<expiry>&skn=<keyname>",
    ].forEach((validCs, i) => {
      it(`Valid shared access signatures[${i}]`, () => {
        should.equal(isSharedAccessSignature(validCs), true);
      });
    });

    [
      "Endpoint=hello;HaredAccessSignature=SharedAccessSignature sr=<resource>&sig=someb64=&se=<expiry>&skn=<keyname>",
      "SharedAccessSignature=haredAccessSignature sr=<resource>&sig=someb64=&se=<expiry>&skn=<keyname>;Endpoint=asdfasdf",
    ].forEach((invalidCs, i) => {
      it(`Invalid shared access signature[${i}]`, () => {
        should.equal(isSharedAccessSignature(invalidCs), false);
      });
    });

    it("skip sharedAccessKey fields when using SharedAccessSignature", () => {
      // skip validating the sharedKey related fields in connection config
      ConnectionConfig.validate({
        endpoint: "unused for this test",
        host: "unused for this test",
        sharedAccessKey: "",
        sharedAccessKeyName: "",
        connectionString: "Endpoint=hello;SharedAccessSignature=SharedAccessSignature hellosig",
      });
    });
  });
});
