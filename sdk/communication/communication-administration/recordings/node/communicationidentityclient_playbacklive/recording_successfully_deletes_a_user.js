let nock = require("nock");

module.exports.hash = "a5a7976959cc0ccb2a28a4d3560f4591";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .delete("/identities/sanitized")
  .query(true)
  .reply(204, "", [
    "MS-CV",
    "XQH4ADN+aUWXm9k8SuQmTw.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2",
    "X-Processing-Time",
    "723ms",
    "X-Azure-Ref",
    "0soy4XwAAAACvPq4nWF6pR73m05T+mn6vWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Sat, 21 Nov 2020 03:42:42 GMT"
  ]);
