let nock = require("nock");

module.exports.hash = "1c880cc35f2f3b240445a35a012e7bab";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/token", { scopes: ["chat"] })
  .query(true)
  .reply(
    200,
    { id: "sanitized", token: "sanitized", expiresOn: "2020-10-03T20:35:48.6467409+00:00" },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "kH3bmry/OECCeJ8DmHh+eg.0",
      "Strict-Transport-Security",
      "max-age=2592000",
      "x-ms-client-request-id",
      "20f3fba2-b64e-40ef-a1ff-3aa4cd1497c8",
      "api-supported-versions",
      "2020-07-20-preview1, 2020-07-20-preview2",
      "X-Processing-Time",
      "27ms",
      "X-Azure-Ref",
      "0JY93XwAAAAAzIigqtt8gQ6Isd4GmeEpMWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Fri, 02 Oct 2020 20:35:49 GMT"
    ]
  );
