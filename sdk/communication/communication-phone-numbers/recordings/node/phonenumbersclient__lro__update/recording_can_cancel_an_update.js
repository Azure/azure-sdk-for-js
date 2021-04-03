let nock = require("nock");

module.exports.hash = "02393416f0af6d4e8534fe9d0bc22a4f";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/%2B14155550100")
  .query(true)
  .reply(
    200,
    {
      id: "14155550100",
      phoneNumber: "+14155550100",
      countryCode: "US",
      phoneNumberType: "TollFree",
      capabilities: { calling: "none", sms: "outbound" },
      assignmentType: "Application",
      purchaseDate: "2021-02-10T17:52:41.818335+00:00",
      cost: { amount: 2, currencyCode: "USD", billingFrequency: "Monthly" }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "Kfw8R1+0Z0e6e8j/zk/Tzw.0",
      "X-Processing-Time",
      "1454ms",
      "X-Azure-Ref",
      "0H4tHYAAAAACEZiUdCBrcQIZyt8tXDDedWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:50:08 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .patch("/phoneNumbers/%2B14155550100/capabilities", {
    calling: "inbound+outbound",
    sms: "inbound+outbound"
  })
  .query(true)
  .reply(202, { capabilitiesUpdateId: "sanitized" }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "Location",
    "/phoneNumbers/%214155550100?api-version=2021-03-07",
    "Access-Control-Expose-Headers",
    "Operation-Location,Location,operation-id,capabilities-id",
    "Request-Context",
    "appId=",
    "MS-CV",
    "pcoS+ryZP0CFGxCDeQGDNw.0",
    "Operation-Location",
    "/phoneNumbers/operations/capabilities_sanitized?api-version=2021-03-07",
    "operation-id",
    "capabilities_sanitized",
    "capabilities-id",
    "sanitized",
    "X-Processing-Time",
    "1047ms",
    "X-Azure-Ref",
    "0IItHYAAAAACGBQ8F9zzXSIYrLznMu99zWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Tue, 09 Mar 2021 14:50:09 GMT"
  ]);

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/%2B14155550100")
  .query(true)
  .reply(
    200,
    {
      id: "14155550100",
      phoneNumber: "+14155550100",
      countryCode: "US",
      phoneNumberType: "TollFree",
      capabilities: { calling: "none", sms: "outbound" },
      assignmentType: "Application",
      purchaseDate: "2021-02-10T17:52:41.818335+00:00",
      cost: { amount: 2, currencyCode: "USD", billingFrequency: "Monthly" }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "zEXzPQxfiUCNIIm17IqNPA.0",
      "X-Processing-Time",
      "1192ms",
      "X-Azure-Ref",
      "0IYtHYAAAAABvmZ0WaAThRLMaLqYc1tzBWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:50:10 GMT"
    ]
  );
