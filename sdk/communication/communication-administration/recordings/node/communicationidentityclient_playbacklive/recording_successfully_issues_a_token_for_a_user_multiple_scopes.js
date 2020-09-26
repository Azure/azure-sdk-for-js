let nock = require("nock");

module.exports.hash = "f30fde667c7b7a14ab32826e4d83a221";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/token", { scopes: ["chat", "pstn"] })
  .query(true)
  .reply(
    200,
    { id: "sanitized", token: "sanitized", expiresOn: "2020-09-18T17:57:45.5545875+00:00" },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "E+sS3wKjfUSheriVQSe2QA.0",
      "Strict-Transport-Security",
      "max-age=2592000",
      "x-ms-client-request-id",
      "9f35ed20-f1ac-46a2-bc6d-0af9b4e06c78",
      "api-supported-versions",
      "2020-07-20-preview1, 2020-07-20-preview2",
      "X-Processing-Time",
      "120ms",
      "X-Azure-Ref",
      "0mqNjXwAAAABMcDEBNfteQKjGaHEc+xytWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Thu, 17 Sep 2020 17:57:46 GMT"
    ]
  );
