let nock = require("nock");

module.exports.hash = "c32f7ebc5af64d902e3e080cc228e00f";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .delete("/identities/sanitized")
  .query(true)
  .reply(204, "", [
    "MS-CV",
    "XimdiE7JuE6jnp1EYo3jUw.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "491c6f0c-5dbe-4458-a912-40bdd196298c",
    "api-supported-versions",
    "2020-07-20-preview1, 2020-07-20-preview2",
    "X-Processing-Time",
    "638ms",
    "X-Azure-Ref",
    "0Jo93XwAAAAC5nlw8MyuCRpoQndpV5UE7WVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Fri, 02 Oct 2020 20:35:50 GMT"
  ]);
