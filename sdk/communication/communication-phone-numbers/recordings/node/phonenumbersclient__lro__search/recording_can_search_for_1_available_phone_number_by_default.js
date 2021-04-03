let nock = require("nock");

module.exports.hash = "2edd572127ecbabbc423d3f3c9988dd4";

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
    "o6ytfHuxOkSI2Pl5VW4SJg.0",
    "Operation-Location",
    "/phoneNumbers/operations/search_sanitized?api-version=2021-03-07",
    "operation-id",
    "search_sanitized",
    "search-id",
    "sanitized",
    "X-Processing-Time",
    "3913ms",
    "X-Azure-Ref",
    "0ootHYAAAAAB6xRs/NDVDSK4bskA8AURSWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Tue, 09 Mar 2021 14:52:22 GMT",
    "Content-Length",
    "0"
  ]);

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/search_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "NotStarted",
      resourceLocation: "/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07",
      createdDateTime: "2021-03-09T14:52:22.2348133+00:00",
      id: "search_sanitized",
      operationType: "Search",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Location",
      "/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07",
      "Access-Control-Expose-Headers",
      "Location",
      "Request-Context",
      "appId=",
      "MS-CV",
      "PCJVnXuxZU6PfyQIVB+lbg.0",
      "X-Processing-Time",
      "289ms",
      "X-Azure-Ref",
      "0potHYAAAAAAcxzu5djfYT4ls3/IP199oWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:52:22 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/search_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "NotStarted",
      resourceLocation: "/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07",
      createdDateTime: "2021-03-09T14:52:22.2348133+00:00",
      id: "search_sanitized",
      operationType: "Search",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Location",
      "/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07",
      "Access-Control-Expose-Headers",
      "Location",
      "Request-Context",
      "appId=",
      "MS-CV",
      "jpvQzNWqF0SOroRJIXuRkg.0",
      "X-Processing-Time",
      "266ms",
      "X-Azure-Ref",
      "0qYtHYAAAAABoQRhr0Gh4SqJ5WzAQg4E5WVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:52:25 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/search_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Succeeded",
      resourceLocation: "/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07",
      createdDateTime: "2021-03-09T14:52:22.2348133+00:00",
      id: "search_sanitized",
      operationType: "Search",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Location",
      "/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07",
      "Access-Control-Expose-Headers",
      "Location",
      "Request-Context",
      "appId=",
      "MS-CV",
      "Mc8xk3ULukOQlN4cgf4V4g.0",
      "X-Processing-Time",
      "1373ms",
      "X-Azure-Ref",
      "0q4tHYAAAAAAcTnMNL3InSoYsiCQgoHIiWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:52:28 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/availablePhoneNumbers/searchResults/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      phoneNumbers: ["+14155550100"],
      phoneNumberType: "TollFree",
      assignmentType: "Application",
      capabilities: { calling: "none", sms: "inbound+outbound" },
      cost: { amount: 2, currencyCode: "USD", billingFrequency: "Monthly" },
      searchExpiresBy: "2021-03-09T15:08:27.7355339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "24U2KBDvtkKSWmdn27vFgw.0",
      "X-Processing-Time",
      "823ms",
      "X-Azure-Ref",
      "0rotHYAAAAAAVUG+QNiOhSI2HHjQrFe0gWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:52:31 GMT"
    ]
  );
