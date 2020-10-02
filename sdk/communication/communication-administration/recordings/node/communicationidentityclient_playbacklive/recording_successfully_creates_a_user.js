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
    "9qv9mhWMg0SUk+dIMMBneQ.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "c57fa4ac-76d6-4d8a-9cb4-ba410633e2c3",
    "api-supported-versions",
    "2020-07-20-preview1, 2020-07-20-preview2",
    "X-Processing-Time",
    "16ms",
    "X-Azure-Ref",
    "0JY93XwAAAACjrcvzaSACRLG3LQGPFZ5aWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Fri, 02 Oct 2020 20:35:48 GMT"
  ]);
