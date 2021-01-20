let nock = require("nock");

module.exports.hash = "791f5b78ba1812d9905dd61f264e98f5";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .patch("/identities/sanitized", { tokensValidFrom: "2020-10-10T00:00:00.000Z" })
  .query(true)
  .reply(204, "", [
    "MS-CV",
    "ApT8zxbjtUGt+F+Jr9ax7Q.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2",
    "X-Processing-Time",
    "565ms",
    "X-Azure-Ref",
    "0sYy4XwAAAADl81Mb4GSoTYri/ZOYJSGTWVZSMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Sat, 21 Nov 2020 03:42:41 GMT"
  ]);
