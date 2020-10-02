let nock = require("nock");

module.exports.hash = "29a008ab06588dc49ccef34434f34962";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases")
  .query(true)
  .reply(200, { entities: [], nextLink: null }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "0ohfVwIj00emX0Fq0n/HuA.0",
    "X-Processing-Time",
    "227ms",
    "X-Azure-Ref",
    "0qY93XwAAAAD+2WJTgPHHS4fHH0T+vedGWVZSMzBFREdFMDQxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Fri, 02 Oct 2020 20:38:01 GMT"
  ]);
