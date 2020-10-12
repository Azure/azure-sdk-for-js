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
    "NEdoQgLFDkiMDwN1tqZ1ag.0",
    "X-Processing-Time",
    "1142ms",
    "X-Azure-Ref",
    "0XAJ7XwAAAAD7io0/pxeDTrgSMvKicOmVWVZSMzBFREdFMDQxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Mon, 05 Oct 2020 11:24:12 GMT"
  ]);
