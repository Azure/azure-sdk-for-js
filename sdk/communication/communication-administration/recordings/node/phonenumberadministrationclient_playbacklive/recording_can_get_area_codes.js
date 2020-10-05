let nock = require("nock");

module.exports.hash = "d47a0b2d40ed297062396a68f1cb2e3f";

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
    "Pi8oc2hf5EGf5nY/pP/x7g.0",
    "X-Processing-Time",
    "529ms",
    "X-Azure-Ref",
    "0YgJ7XwAAAABpUq6INWDlTYQX/XrU15KiWVZSMzBFREdFMDQxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Mon, 05 Oct 2020 11:24:18 GMT"
  ]);
