let nock = require("nock");

module.exports.hash = "9f184b58b9aadf99fab223c92de66de8";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/token", { scopes: ["chat", "pstn"] })
  .query(true)
  .reply(
    200,
    { id: "sanitized", token: "sanitized", expiresOn: "2020-11-22T03:42:40.2654927+00:00" },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "FrpJvazFq0Gg0Fa5MxdhaQ.0",
      "Strict-Transport-Security",
      "max-age=2592000",
      "x-ms-client-request-id",
      "sanitized",
      "api-supported-versions",
      "2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2",
      "X-Processing-Time",
      "26ms",
      "X-Azure-Ref",
      "0sYy4XwAAAACgaE9HHDmaRZDa/S+EL6NhWVZSMzBFREdFMDMxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:42:40 GMT"
    ]
  );
