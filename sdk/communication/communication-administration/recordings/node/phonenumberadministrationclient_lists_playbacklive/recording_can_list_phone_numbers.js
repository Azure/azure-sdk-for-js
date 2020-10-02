let nock = require("nock");

module.exports.hash = "0dde52a1c1f5e4fdd7568981ca731f49";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/phonenumbers")
  .query(true)
  .reply(200, { phoneNumbers: [], nextLink: null }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "juV+LWoQ1E+Ew3iaLzl1Fg.0",
    "X-Processing-Time",
    "360ms",
    "X-Azure-Ref",
    "0po93XwAAAACGw1QF6WY3S626OMJwaPxsWVZSMzBFREdFMDMxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Fri, 02 Oct 2020 20:37:59 GMT"
  ]);
