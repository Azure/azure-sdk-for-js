let nock = require("nock");

module.exports.hash = "e10098ac22e2857510889e9c31a45559";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .patch("/identities/sanitized", { tokensValidFrom: "2020-10-10T00:00:00.000Z" })
  .query(true)
  .reply(204, "", [
    "MS-CV",
    "KhF9I7PNKEmPXCM8o/2rzg.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "c8722972-96df-49bd-80f3-956313c647b7",
    "api-supported-versions",
    "2020-07-20-preview1, 2020-07-20-preview2",
    "X-Processing-Time",
    "645ms",
    "X-Azure-Ref",
    "0mqNjXwAAAAD2aqka/gd+TYiOFoj9xCZrWVZSMzBFREdFMDMwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Thu, 17 Sep 2020 17:57:46 GMT"
  ]);
