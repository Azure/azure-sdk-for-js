let nock = require("nock");

module.exports.hash = "beed9b0365f6e3637112bab5192991e5";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches")
  .query(true)
  .reply(200, { entities: [], nextLink: null }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "OP/3Ejc04kC6Sjv0oFZqpQ.0",
    "X-Processing-Time",
    "266ms",
    "X-Azure-Ref",
    "0qY93XwAAAACGtNQicLBtRYWgkW0Smse5WVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Fri, 02 Oct 2020 20:38:01 GMT"
  ]);
