let nock = require("nock");

module.exports.hash = "71dd63e8f90b2c2eb44bc15618466368";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities")
  .query(true)
  .reply(200, { id: "sanitized" }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "Lvkfsfm7nEu2Hw03UaPLAA.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-07-20-preview1, 2020-07-20-preview2",
    "X-Processing-Time",
    "70ms",
    "X-Azure-Ref",
    "0Yil+XwAAAABQSKtlMocnSayYeBFOIIL2WVZSMzBFREdFMDQxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Wed, 07 Oct 2020 20:47:30 GMT"
  ]);
