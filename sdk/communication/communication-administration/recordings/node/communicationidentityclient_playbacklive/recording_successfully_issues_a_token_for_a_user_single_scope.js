let nock = require("nock");

module.exports.hash = "78fab66978e4b347f8a42dfe6862533f";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/token", { scopes: ["chat"] })
  .query(true)
  .reply(
    200,
    { id: "sanitized", token: "sanitized", expiresOn: "2020-11-22T03:42:39.8417903+00:00" },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "hRFNDyxHBUOpr6Ykeda0mA.0",
      "Strict-Transport-Security",
      "max-age=2592000",
      "x-ms-client-request-id",
      "sanitized",
      "api-supported-versions",
      "2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2",
      "X-Processing-Time",
      "25ms",
      "X-Azure-Ref",
      "0sIy4XwAAAAA+D9dnkmkBS6A4EH+M7XqeWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:42:40 GMT"
    ]
  );
