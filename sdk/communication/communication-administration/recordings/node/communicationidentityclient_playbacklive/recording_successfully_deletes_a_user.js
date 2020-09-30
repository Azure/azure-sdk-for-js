let nock = require("nock");

module.exports.hash = "c32f7ebc5af64d902e3e080cc228e00f";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .delete("/identities/sanitized")
  .query(true)
  .reply(204, "", [
    "MS-CV",
    "xeaIdBb7TEe5cvxIpes+5A.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "5314f3f9-ab0d-4d3c-8373-98e2743d89cd",
    "api-supported-versions",
    "2020-07-20-preview1, 2020-07-20-preview2",
    "X-Processing-Time",
    "445ms",
    "X-Azure-Ref",
    "0vDBhXwAAAABiUEnMD06IS60LcrViuM6+WVZSMzBFREdFMDQxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Tue, 15 Sep 2020 21:23:08 GMT"
  ]);
