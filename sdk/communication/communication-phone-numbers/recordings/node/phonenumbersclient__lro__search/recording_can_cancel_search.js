let nock = require("nock");

module.exports.hash = "2fe7e8b94f2f56ad5c1c42731d1f38dd";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: false })
  .post("/availablePhoneNumbers/countries/US/:search", {
    phoneNumberType: "tollFree",
    assignmentType: "application",
    capabilities: { calling: "none", sms: "inbound+outbound" },
    quantity: 1
  })
  .query(true)
  .reply(202, "", [
    "Location",
    "/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07",
    "Access-Control-Expose-Headers",
    "Location,Operation-Location,operation-id,search-id",
    "Request-Context",
    "appId=",
    "MS-CV",
    "KmjujZiAMUekTi+ekQ2XPQ.0",
    "Operation-Location",
    "/phoneNumbers/operations/search_sanitized?api-version=2021-03-07",
    "operation-id",
    "search_sanitized",
    "search-id",
    "sanitized",
    "X-Processing-Time",
    "2454ms",
    "X-Azure-Ref",
    "0xYtHYAAAAACTh45Vjb9TSbAkG00pbI7TWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Tue, 09 Mar 2021 14:52:55 GMT",
    "Content-Length",
    "0"
  ]);
