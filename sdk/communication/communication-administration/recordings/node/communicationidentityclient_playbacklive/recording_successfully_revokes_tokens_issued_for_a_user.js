let nock = require("nock");

module.exports.hash = "e10098ac22e2857510889e9c31a45559";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .patch("/identities/sanitized", { tokensValidFrom: "2020-10-10T00:00:00.000Z" })
  .query(true)
  .reply(204, "", [
    "MS-CV",
    "33qtxiy3V0uhCwP+eva0Yg.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-07-20-preview1, 2020-07-20-preview2",
    "X-Processing-Time",
    "880ms",
    "X-Azure-Ref",
    "0Yyl+XwAAAAB9fU/woTTUR4QXWkynQodNWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Wed, 07 Oct 2020 20:47:30 GMT"
  ]);
