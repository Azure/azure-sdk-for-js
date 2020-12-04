let nock = require("nock");

module.exports.hash = "141d38a7c6c025995e00a993b7bd7123";

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
    "Zt+qNElMeUKoYC+f1DVN8w.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2",
    "X-Processing-Time",
    "20ms",
    "X-Azure-Ref",
    "0sIy4XwAAAAALsSkzglsHRbxDsIly3yizWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Sat, 21 Nov 2020 03:42:39 GMT"
  ]);
