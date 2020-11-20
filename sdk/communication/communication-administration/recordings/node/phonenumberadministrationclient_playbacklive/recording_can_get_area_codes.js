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
    "WEKRXM/JgE2ND9Dn9mXASA.0",
    "X-Processing-Time",
    "400ms",
    "X-Azure-Ref",
    "0fyl+XwAAAACoxVAbE8UXTJHySpiXFih0WVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Wed, 07 Oct 2020 20:47:58 GMT"
  ]);
