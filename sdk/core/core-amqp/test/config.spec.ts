// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import { ConnectionConfig } from "../src/index.js";
import { isSharedAccessSignature } from "../src/connectionConfig/connectionConfig.js";

describe("ConnectionConfig", function () {
  describe("Base", function () {
    it("populates config properties from an Event Hubs connection string", function () {
      const config = ConnectionConfig.create(
        "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep",
      );
      assert.equal(config.host, "hostname.servicebus.windows.net");
      assert.equal(config.sharedAccessKeyName, "sakName");
      assert.equal(config.sharedAccessKey, "sak");
      assert.equal(config.entityPath, "ep");
    });

    it("populates path from the path argument if connection string does not have EntityPath", function () {
      const config = ConnectionConfig.create(
        "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak",
        "abc",
      );
      assert.equal(config.entityPath, "abc");
    });

    it("should create a connection config when path is not provided and the connectionstring also does not contain EntityPath", function () {
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
      assert.equal(config.host, "hostname.servicebus.windows.net");
      assert.equal(config.sharedAccessKeyName, "sakName");
      assert.equal(config.sharedAccessKey, "sak");
      assert.equal(config.entityPath, "ep");
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

    it("Parses the connection string for the development emulator", async function () {
      const config = ConnectionConfig.create(
        "Endpoint=sb://localhost:6765;SharedAccessKeyName=<< REDACTED >>;SharedAccessKey=<< REDACTED >>;UseDevelopmentEmulator=true",
      );
      assert.equal(config.endpoint, "sb://localhost:6765/");
      assert.equal(config.host, "localhost:6765");
      assert.isTrue(config.useDevelopmentEmulator);
    });

    describe("Throws error if required connection config properties are not present", function () {
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

    describe("Development Emulator Validation", function () {
      it("Accepts localhost", async function () {
        const connectionString =
          "Endpoint=sb://localhost:6765;SharedAccessKeyName=<< REDACTED >>;SharedAccessKey=<< REDACTED >>;UseDevelopmentEmulator=true";
        const config: ConnectionConfig = {
          connectionString,
          endpoint: "localhost:6765/",
          host: "sb://localhost:6765/",
          sharedAccessKeyName: "sakName",
          sharedAccessKey: "abcd",
          useDevelopmentEmulator: true,
        };
        ConnectionConfig.validate(config);
      });

      it("Accepts 127.0.0.1", async function () {
        const connectionString =
          "Endpoint=sb://127.0.0.1:6765;SharedAccessKeyName=<< REDACTED >>;SharedAccessKey=<< REDACTED >>;UseDevelopmentEmulator=true";
        const config: ConnectionConfig = {
          connectionString,
          endpoint: "127.0.0.1:6765/",
          host: "sb://127.0.0.1:6765",
          sharedAccessKeyName: "sakName",
          sharedAccessKey: "abcd",
          useDevelopmentEmulator: true,
        };
        ConnectionConfig.validate(config);
      });

      it("Accepts 0:0:0:0:0:0:0:1", async function () {
        const connectionString =
          "Endpoint=sb://0:0:0:0:0:0:0:1;SharedAccessKeyName=<< REDACTED >>;SharedAccessKey=<< REDACTED >>;UseDevelopmentEmulator=true";
        const config: ConnectionConfig = {
          connectionString,
          endpoint: "0:0:0:0:0:0:0:1/",
          host: "sb://0:0:0:0:0:0:0:1",
          sharedAccessKeyName: "sakName",
          sharedAccessKey: "abcd",
          useDevelopmentEmulator: true,
        };
        ConnectionConfig.validate(config);
      });

      it("Accepts ::1", async function () {
        const connectionString =
          "Endpoint=sb://::1;SharedAccessKeyName=<< REDACTED >>;SharedAccessKey=<< REDACTED >>;UseDevelopmentEmulator=true";
        const config: ConnectionConfig = {
          connectionString,
          endpoint: "::1/",
          host: "sb://::1",
          sharedAccessKeyName: "sakName",
          sharedAccessKey: "abcd",
          useDevelopmentEmulator: true,
        };
        ConnectionConfig.validate(config);
      });

      it("Accepts localhost with missing scheme", async function () {
        const connectionString =
          "Endpoint=localhost:6765;SharedAccessKeyName=<< REDACTED >>;SharedAccessKey=<< REDACTED >>;UseDevelopmentEmulator=true";
        const config: ConnectionConfig = {
          connectionString,
          endpoint: "localhost:6765/",
          host: "localhost:6765/",
          sharedAccessKeyName: "sakName",
          sharedAccessKey: "abcd",
          useDevelopmentEmulator: true,
        };
        ConnectionConfig.validate(config);
      });

      it("Rejects non-local host", async function () {
        const connectionString =
          "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=<< REDACTED >>;SharedAccessKey=<< REDACTED >>;UseDevelopmentEmulator=true";
        const config: ConnectionConfig = {
          connectionString,
          endpoint: "sb://hostname.servicebus.windows.net/",
          host: "hostname.servicebus.windows.net",
          sharedAccessKeyName: "sakName",
          sharedAccessKey: "abcd",
          useDevelopmentEmulator: true,
        };
        assert.throw(() => {
          ConnectionConfig.validate(config);
        }, new RegExp("When using the development environment"));
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
