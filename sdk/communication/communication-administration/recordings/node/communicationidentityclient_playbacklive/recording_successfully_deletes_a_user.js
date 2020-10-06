let nock = require("nock");

module.exports.hash = "c32f7ebc5af64d902e3e080cc228e00f";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .delete("/identities/sanitized")
  .query(true)
  .reply(204, "", [
    "MS-CV",
    "QW2qEVRR70iQpmShaJ6m2A.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-07-20-preview1, 2020-07-20-preview2",
    "X-Processing-Time",
    "1317ms",
    "X-Azure-Ref",
    "0WgJ7XwAAAAAAV4cmlMkVQa+0xmAcW1DDWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Mon, 05 Oct 2020 11:24:11 GMT"
  ]);
