let nock = require("nock");

module.exports.hash = "71dd63e8f90b2c2eb44bc15618466368";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities")
  .query(true)
  .reply(200, { identity: { id: "sanitized" }, accessToken: null }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "mj+7liJX8EChXDb3DKuRww.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-07-20-preview2, 2021-03-07",
    "X-Processing-Time",
    "18ms",
    "X-Azure-Ref",
    "0I/0GYAAAAABGg516wcR0Sa3Rue4/pfKLWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Tue, 19 Jan 2021 15:39:15 GMT"
  ]);
