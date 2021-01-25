let nock = require("nock");

module.exports.hash = "c32f7ebc5af64d902e3e080cc228e00f";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .delete("/identities/sanitized")
  .query(true)
  .reply(204, "", [
    "MS-CV",
    "8qLo2O4Z1keqkI3MiyC6Xg.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-07-20-preview1, 2020-07-20-preview2",
    "X-Processing-Time",
    "733ms",
    "X-Azure-Ref",
    "0Yyl+XwAAAADBzDfuXDRCSYyeB5Ms95UoWVZSMzBFREdFMDMxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Wed, 07 Oct 2020 20:47:32 GMT"
  ]);
