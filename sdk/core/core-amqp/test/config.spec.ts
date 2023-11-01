// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import { ConnectionConfig } from "../src/index.js";
import { isSharedAccessSignature } from "../src/connectionConfig/connectionConfig.js";

describe("ConnectionConfig", () => {
  describe("Base", () => {
    it("populates config properties from an Event Hubs connection string", () => {
      const config = ConnectionConfig.create(
        "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep"
      );

      assert.equal(config.host, "hostname.servicebus.windows.net");
      assert.equal(config.sharedAccessKeyName, "sakName");
      assert.equal(config.sharedAccessKey, "sak");
      assert.equal(config.entityPath, "ep");
    });

    it("populates path from the path argument if connection string does not have EntityPath", () => {
      const config = ConnectionConfig.create(
        "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak",
        "abc"
      );
      assert.equal(config.entityPath, "abc");
    });

    it("should create a connection config when path is not provided and the connectionstring also does not contain EntityPath", () => {
      const connectionString =
        "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak";
      const config = ConnectionConfig.create(connectionString);
      assert.isUndefined(config.entityPath);
    });

    it("handles arbitrary whitespace around ; and = elements", () => {
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
    });

    it("requires a value before an assignment", () => {
      const connectionString = `
        = something;
      `;

      assert.throw(() => {
        ConnectionConfig.create(connectionString);
      }, /Connection string malformed/);
    });

    it("allows an empty value after an assignment", () => {
      const connectionString = `
        Endpoint = sb://hostname.servicebus.windows.net/;
        SharedAccessKey=;
      `;
      const config = ConnectionConfig.create(connectionString);
      assert.equal(config.host, "hostname.servicebus.windows.net");
      assert.equal(config.sharedAccessKey, "");
    });

    it("requires an assignment for each part", () => {
      const connectionString = `
        EntityPath;
      `;

      assert.throw(() => {
        ConnectionConfig.create(connectionString);
      }, /Connection string malformed/);
    });

    it("requires that Endpoint be present in the connection string", () => {
      const connectionString = `
        EntityPath=ep;
      `;

      assert.throw(() => {
        ConnectionConfig.create(connectionString);
      }, /Missing Endpoint/);
    });

    describe("Throws error if required connection config properties are not present", () => {
      const connectionString = `
        Endpoint=sb://hostname.servicebus.windows.net/;
        SharedAccessKeyName=sakName;
        SharedAccessKey=sakName;
        EntityPath=ep;
      `;

      it("requires that connection config be present", () => {
        assert.throw(() => {
          ConnectionConfig.validate(undefined as any);
        }, /Missing configuration/);
      });

      it("requires that Endpoint be present in the connection config", () => {
        const config: ConnectionConfig = {
          connectionString: connectionString,
          endpoint: "",
          host: "hostname.servicebus.windows.net/",
          sharedAccessKeyName: "sakName",
          sharedAccessKey: "sak",
        };

        assert.throw(() => {
          ConnectionConfig.validate(config);
        }, /Missing 'endpoint'/);
      });

      it("requires that host be present in the connection config", () => {
        const config: ConnectionConfig = {
          connectionString: connectionString,
          endpoint: "sb://hostname.servicebus.windows.net/",
          host: "",
          sharedAccessKeyName: "sakName",
          sharedAccessKey: "sak",
        };

        assert.throw(() => {
          ConnectionConfig.validate(config);
        }, /Missing 'host'/);
      });

      it("requires that entityPath be present in the connection config", () => {
        const config: ConnectionConfig = {
          connectionString: connectionString,
          endpoint: "sb://hostname.servicebus.windows.net/",
          host: "hostname.servicebus.windows.net/",
          sharedAccessKeyName: "sakName",
          sharedAccessKey: "sak",
          entityPath: "",
        };

        assert.throw(() => {
          ConnectionConfig.validate(config, { isEntityPathRequired: true });
        }, /Missing 'entityPath'/);
      });

      it("requires that sharedAccessKeyName be present in the connection config", () => {
        const config: ConnectionConfig = {
          connectionString: connectionString,
          endpoint: "sb://hostname.servicebus.windows.net/",
          host: "hostname.servicebus.windows.net/",
          sharedAccessKeyName: "",
          sharedAccessKey: "sak",
        };

        assert.throw(() => {
          ConnectionConfig.validate(config);
        }, /Missing 'sharedAccessKeyName'/);
      });

      it("requires that sharedAccessKey be present in the connection config", () => {
        const config: ConnectionConfig = {
          connectionString: connectionString,
          endpoint: "sb://hostname.servicebus.windows.net/",
          host: "hostname.servicebus.windows.net/",
          sharedAccessKeyName: "sakName",
          sharedAccessKey: "",
        };

        assert.throw(() => {
          ConnectionConfig.validate(config);
        }, /Missing 'sharedAccessKey'/);
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
        assert.equal(config.entityPath, undefined, `EntityPath is not undefined`);
      });

      it("null is not stringified", () => {
        config.entityPath = null as any;
        ConnectionConfig.validate(config);
        assert.equal(config.entityPath, null, `EntityPath is not null`);
      });

      it("number is stringified", () => {
        config.entityPath = 3 as any;
        ConnectionConfig.validate(config);
        assert.equal(config.entityPath, "3", `EntityPath is not stringified`);
      });

      it("string is unchanged", () => {
        config.entityPath = "entityPath";
        ConnectionConfig.validate(config);
        assert.equal(config.entityPath, "entityPath", `EntityPath is not a string`);
      });
    });
  });

  describe("SharedAccessSignature", () => {
    [
      "Endpoint=hello;SharedAccessSignature=SharedAccessSignature sr=<resource>&sig=someb64=&se=<expiry>&skn=<keyname>",
      "SharedAccessSignature=SharedAccessSignature sr=<resource>&sig=someb64=&se=<expiry>&skn=<keyname>",
    ].forEach((validCs, i) => {
      it(`Valid shared access signatures[${i}]`, () => {
        assert.isTrue(isSharedAccessSignature(validCs));
      });
    });

    [
      "Endpoint=hello;HaredAccessSignature=SharedAccessSignature sr=<resource>&sig=someb64=&se=<expiry>&skn=<keyname>",
      "SharedAccessSignature=haredAccessSignature sr=<resource>&sig=someb64=&se=<expiry>&skn=<keyname>;Endpoint=asdfasdf",
    ].forEach((invalidCs, i) => {
      it(`Invalid shared access signature[${i}]`, () => {
        assert.isFalse(isSharedAccessSignature(invalidCs));
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
