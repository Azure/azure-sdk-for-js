let nock = require("nock");

module.exports.hash = "ae33c6742debe27d9023d9548f29a886";

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
    "02ZH9bo5rUuTExJ95h/tbg.0",
    "Operation-Location",
    "/phoneNumbers/operations/search_sanitized?api-version=2021-03-07",
    "operation-id",
    "search_sanitized",
    "search-id",
    "sanitized",
    "X-Processing-Time",
    "2329ms",
    "X-Azure-Ref",
    "0so1HYAAAAADaqio3JdvCSJIy7Bw5CA5DWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Tue, 09 Mar 2021 15:01:08 GMT",
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
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
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
      "10gRitUnnEWtdwcUCPoEZQ.0",
      "X-Processing-Time",
      "273ms",
      "X-Azure-Ref",
      "0tI1HYAAAAACpeUQGejtQQ6kTLmPJmCHsWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:08 GMT"
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
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
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
      "BxB6gqF710OUNSYhhEgs4g.0",
      "X-Processing-Time",
      "290ms",
      "X-Azure-Ref",
      "0to1HYAAAAAAYaD2MP8tWR6s0OqOiv+OUWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:11 GMT"
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
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
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
      "SwGLYSpZp0WOFPgsNtU3Zg.0",
      "X-Processing-Time",
      "378ms",
      "X-Azure-Ref",
      "0uY1HYAAAAADED1eftsfrTLU2vb9MymPiWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:13 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/search_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: "/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07",
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
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
      "F7cHdMJZVkiRnE+8ntfVeA.0",
      "X-Processing-Time",
      "276ms",
      "X-Azure-Ref",
      "0u41HYAAAAAD436aoBBGFT4TrfV0V9g42WVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:15 GMT"
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
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
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
      "Xga0LncJa06bNFb81e9iGg.0",
      "X-Processing-Time",
      "310ms",
      "X-Azure-Ref",
      "0vo1HYAAAAACuSvv5pGZKTrNb79Pa3hLUWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:18 GMT"
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
      searchExpiresBy: "2021-03-09T15:17:16.4881761+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "508R0tzyh0KHpQRO+ZDDmQ.0",
      "X-Processing-Time",
      "676ms",
      "X-Azure-Ref",
      "0wI1HYAAAAABt+DUCf67WS42YEEK0ixX3WVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:20 GMT"
    ]
  );
