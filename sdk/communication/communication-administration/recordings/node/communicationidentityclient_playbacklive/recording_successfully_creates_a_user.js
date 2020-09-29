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
    "U+/c6yzuBkqKSc0+kh37Lg.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "e3ea5380-0244-42b9-b0a4-a2d63066ad98",
    "api-supported-versions",
    "2020-07-20-preview1, 2020-07-20-preview2",
    "X-Processing-Time",
    "82ms",
    "X-Azure-Ref",
    "0mqNjXwAAAADmbwVtRUg1QoQQ/bHqCd5SWVZSMzBFREdFMDQxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Thu, 17 Sep 2020 17:57:45 GMT"
  ]);
