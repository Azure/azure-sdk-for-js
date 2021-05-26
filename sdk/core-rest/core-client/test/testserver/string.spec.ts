import { PipelinePolicy } from "@azure/core-rest-pipeline";
import { Client, getClient } from "../../src";
import { assert } from "chai";

describe("TestServer - String", () => {
  let client: Client;
  const MULTIBYTE_BUFFER_BODY =
    "啊齄丂狛狜隣郎隣兀﨩ˊ〞〡￤℡㈱‐ー﹡﹢﹫、〓ⅰⅹ⒈€㈠㈩ⅠⅫ！￣ぁんァヶΑ︴АЯаяāɡㄅㄩ─╋︵﹄︻︱︳︴ⅰⅹɑɡ〇〾⿻⺁䜣€";

  beforeEach(() => {
    client = getClient("http://localhost:3000");
    const policy: PipelinePolicy = {
      name: "allowInsecureConnections",
      sendRequest: (req, next) => {
        req.allowInsecureConnection = true;
        return next(req);
      },
    };

    client.pipeline.addPolicy(policy);
  });

  it("getStringNull", async () => {
    const result = await client.pathUnchecked("/string/{scenario}", "null").get();
    assert.equal(result.status, "200");
    assert.isUndefined(result.body);
  });

  it("putStringNull", async () => {
    const result = await client.pathUnchecked("/string/null").put();
    assert.equal(result.status, "200");
    assert.isUndefined(result.body);
  });

  it("getStringEmpty", async () => {
    const result = await client.pathUnchecked("/string/empty").get();
    assert.equal(result.status, "200");
    assert.equal(result.body, "");
  });

  it("putStringEmpty", async () => {
    const result = await client.pathUnchecked("/string/empty").put({ body: "" });
    assert.equal(result.status, "200");
    assert.isUndefined(result.body);
  });

  it("getStringNotProvided", async () => {
    const result = await client.pathUnchecked("/string/notProvided").get();
    assert.equal(result.status, "200");
    assert.isUndefined(result.body);
  });

  it("getStringWithLeadingAndTrailingWhitespace", async () => {
    const result = await client.pathUnchecked("/string/whitespace").get();
    assert.equal(result.status, "200");
    assert.equal(
      result.body,
      "    Now is the time for all good men to come to the aid of their country    "
    );
  });

  it("putStringWithLeadingAndTrailingWhitespace", async () => {
    const result = await client.pathUnchecked("/string/whitespace").put({
      body: "    Now is the time for all good men to come to the aid of their country    ",
    });
    assert.equal(result.status, "200");
    assert.isUndefined(result.body);
  });

  it("getStringBase64UrlEncoded", async () => {
    const result = await client.pathUnchecked("/string/base64UrlEncoding").get();
    assert.equal(result.status, "200");
    assert.equal(result.body, "YSBzdHJpbmcgdGhhdCBnZXRzIGVuY29kZWQgd2l0aCBiYXNlNjR1cmw");
  });

  it("putStringBase64UrlEncoded", async () => {
    const result = await client
      .pathUnchecked("/string/base64UrlEncoding")
      .put({ body: "YSBzdHJpbmcgdGhhdCBnZXRzIGVuY29kZWQgd2l0aCBiYXNlNjR1cmw" });
    assert.equal(result.status, "200");
    assert.isUndefined(result.body);
  });

  it("getStringBase64Encoded", async () => {
    const result = await client.pathUnchecked("/string/base64Encoding").get();
    assert.equal(result.status, "200");
    assert.equal(result.body, "YSBzdHJpbmcgdGhhdCBnZXRzIGVuY29kZWQgd2l0aCBiYXNlNjQ=");
  });

  it("getStringNullBase64UrlEncoding", async () => {
    const result = await client.pathUnchecked("/string/nullBase64UrlEncoding").get();
    assert.equal(result.status, "200");
    assert.isUndefined(result.body);
  });

  it("getStringMultiByteCharacters", async () => {
    const result = await client.pathUnchecked("/string/mbcs").get();
    assert.equal(result.status, "200");
    assert.equal(result.body, MULTIBYTE_BUFFER_BODY);
  });

  it("putStringMultiByteCharacters", async () => {
    const result = await client.pathUnchecked("/string/mbcs").put({ body: MULTIBYTE_BUFFER_BODY });
    assert.equal(result.status, "200");
    assert.isUndefined(result.body);
  });

  it("getEnumNotExpandable", async () => {
    const result = await client.pathUnchecked("/string/enum/notExpandable").get();
    assert.equal(result.status, "200");
    assert.equal(result.body, "red color");
  });

  it("putEnumNotExpandable", async () => {
    const result = await client
      .pathUnchecked("/string/enum/notExpandable")
      .put({ body: "red color" });
    assert.equal(result.status, "200");
    assert.isUndefined(result.body);
  });

  it("getEnumReferenced", async () => {
    const result = await client.pathUnchecked("/string/enum/Referenced").get();
    assert.equal(result.status, "200");
    assert.equal(result.body, "red color");
  });

  it("putEnumReferenced", async () => {
    const result = await client.pathUnchecked("/string/enum/Referenced").put({ body: "red color" });
    assert.equal(result.status, "200");
    assert.isUndefined(result.body);
  });

  it("getEnumReferencedConstant", async () => {
    const result = await client.pathUnchecked("/string/enum/ReferencedConstant").get();
    assert.equal(result.status, "200");
    assert.deepEqual(result.body, { field1: "Sample String" });
  });

  it("putEnumReferencedConstant", async () => {
    const result = await client
      .pathUnchecked("/string/enum/ReferencedConstant")
      .put({ body: { ColorConstant: "green-color" } });
    assert.equal(result.status, "200");
    assert.isUndefined(result.body);
  });
});
