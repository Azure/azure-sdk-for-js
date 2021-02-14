let nock = require("nock");

module.exports.hash = "e84b74df0f7534f262dbf049e526cf38";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/administration/phonenumbers/countries/US/areacodes", {
    locationOptions: [
      { labelId: "state", optionsValue: "CA" },
      { labelId: "city", optionsValue: "NOAM-US-CA-LA" }
    ]
  })
  .query(true)
  .reply(200, { primaryAreaCodes: ["213"], secondaryAreaCodes: [], nextLink: null }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "974aMwfm90e4T3mprBvOlw.0",
    "X-Processing-Time",
    "189ms",
    "X-Azure-Ref",
    "0/Yy4XwAAAAC6OPAI7YHXR6VxyPj+eC3JWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Sat, 21 Nov 2020 03:43:56 GMT"
  ]);
