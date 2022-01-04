// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { parseEndpoint } from "../../src/util/parseEndpoint";

const should = chai.should();

describe("parseEndpoint", () => {
  it("throws an error for invalid inputs", () => {
    should.throw(() => parseEndpoint(""), /Invalid endpoint/);
    should.throw(() => parseEndpoint("missing-protocol"), /Invalid endpoint/);
    should.throw(() => parseEndpoint("//missing-protocol"), /Invalid endpoint/);
  });

  it("extracts host, hostname, and port", () => {
    parseEndpoint("sb://test.servicebus.windows.net:5671").should.eql({
      host: "test.servicebus.windows.net:5671",
      hostname: "test.servicebus.windows.net",
      port: "5671",
    } as ReturnType<typeof parseEndpoint>);

    parseEndpoint("https://127.0.0.1:5671").should.eql({
      host: "127.0.0.1:5671",
      hostname: "127.0.0.1",
      port: "5671",
    } as ReturnType<typeof parseEndpoint>);

    parseEndpoint("amqps://127.0.0.1:5671/path/?query=foo").should.eql({
      host: "127.0.0.1:5671",
      hostname: "127.0.0.1",
      port: "5671",
    } as ReturnType<typeof parseEndpoint>);

    parseEndpoint("wss://127.0.0.1/path/?query=foo").should.eql({
      host: "127.0.0.1",
      hostname: "127.0.0.1",
      port: undefined,
    } as ReturnType<typeof parseEndpoint>);
  });
});
