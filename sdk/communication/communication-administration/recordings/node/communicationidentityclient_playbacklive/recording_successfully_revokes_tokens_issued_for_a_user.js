let nock = require("nock");

module.exports.hash = "e10098ac22e2857510889e9c31a45559";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .patch("/identities/sanitized", { tokensValidFrom: "2020-10-10T00:00:00.000Z" })
  .query(true)
  .reply(204, "", [
    "MS-CV",
    "kPxTJwPVEEKxAca5PaSm1g.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-07-20-preview1, 2020-07-20-preview2",
    "X-Processing-Time",
    "711ms",
    "X-Azure-Ref",
    "0WgJ7XwAAAABJojMofhVrQJCXD9EMEzVEWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Mon, 05 Oct 2020 11:24:10 GMT"
  ]);
