let nock = require("nock");

module.exports.hash = "0badc78933e7e83ce120d4b3a79224db";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/administration/phonenumbers/countries/US/areacodes", {
    locationOptions: [
      { labelId: "state", optionsValue: "CA" },
      { labelId: "city", optionsValue: "NOAM-US-CA-LA" }
    ]
  })
  .query(true)
  .reply(200, { primaryAreaCodes: [], secondaryAreaCodes: [], nextLink: null }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "9p3qASW8sEezDBZBa3nr8g.0",
    "X-Processing-Time",
    "398ms",
    "X-Azure-Ref",
    "03bl3XwAAAAAfKgh9Y1tPQ6eAF89h0v84WVZSMzBFREdFMDQxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Fri, 02 Oct 2020 23:38:06 GMT"
  ]);
