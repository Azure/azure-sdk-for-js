let nock = require("nock");

module.exports.hash = "974c27c7c832cc8f4fd3b97dad2fb5ca";

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
      capabilities: { calling: "inbound", sms: "inbound+outbound" },
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
      "VFb0Xcg1SEGjN+qiR2OhVw.0",
      "X-Processing-Time",
      "2004ms",
      "X-Azure-Ref",
      "0AotHYAAAAAAqVey69qdqRZfTcuvrAa5bWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:49:39 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .patch("/phoneNumbers/%2B14155550100/capabilities", { calling: "none", sms: "outbound" })
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
    "nDvFNDnl+UGnarBD683c6A.0",
    "Operation-Location",
    "/phoneNumbers/operations/capabilities_sanitized?api-version=2021-03-07",
    "operation-id",
    "capabilities_sanitized",
    "capabilities-id",
    "sanitized",
    "X-Processing-Time",
    "922ms",
    "X-Azure-Ref",
    "0BItHYAAAAADuFU01AzkJRrsKst6XABiaWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Tue, 09 Mar 2021 14:49:40 GMT"
  ]);

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/capabilities_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "NotStarted",
      resourceLocation: "/phoneNumbers/%214155550100?api-version=2021-03-07",
      createdDateTime: "2021-03-09T14:49:40.711175+00:00",
      id: "capabilities_sanitized",
      operationType: "UpdatePhoneNumberCapabilities",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Location",
      "/phoneNumbers/%214155550100?api-version=2021-03-07",
      "Access-Control-Expose-Headers",
      "Location",
      "Request-Context",
      "appId=",
      "MS-CV",
      "Ju0HtlGOTUKPWv8TDSZImg.0",
      "X-Processing-Time",
      "250ms",
      "X-Azure-Ref",
      "0BYtHYAAAAABMSq5V3TgBRIEZaK+WVHWlWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:49:40 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/capabilities_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "NotStarted",
      resourceLocation: "/phoneNumbers/%214155550100?api-version=2021-03-07",
      createdDateTime: "2021-03-09T14:49:40.711175+00:00",
      id: "capabilities_sanitized",
      operationType: "UpdatePhoneNumberCapabilities",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Location",
      "/phoneNumbers/%214155550100?api-version=2021-03-07",
      "Access-Control-Expose-Headers",
      "Location",
      "Request-Context",
      "appId=",
      "MS-CV",
      "WS6CfvK9mkqh/aBdn2rbaA.0",
      "X-Processing-Time",
      "235ms",
      "X-Azure-Ref",
      "0B4tHYAAAAABuvcNQu6pLSImZTd2Z6uhpWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:49:42 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/capabilities_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: "/phoneNumbers/%214155550100?api-version=2021-03-07",
      createdDateTime: "2021-03-09T14:49:40.711175+00:00",
      id: "capabilities_sanitized",
      operationType: "UpdatePhoneNumberCapabilities",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Location",
      "/phoneNumbers/%214155550100?api-version=2021-03-07",
      "Access-Control-Expose-Headers",
      "Location",
      "Request-Context",
      "appId=",
      "MS-CV",
      "wf/PEVTzf0mclUAxYbcYlQ.0",
      "X-Processing-Time",
      "236ms",
      "X-Azure-Ref",
      "0CYtHYAAAAABMCIdUgdXmS4vEW7lPKiYdWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:49:45 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/capabilities_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: "/phoneNumbers/%214155550100?api-version=2021-03-07",
      createdDateTime: "2021-03-09T14:49:40.711175+00:00",
      id: "capabilities_sanitized",
      operationType: "UpdatePhoneNumberCapabilities",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Location",
      "/phoneNumbers/%214155550100?api-version=2021-03-07",
      "Access-Control-Expose-Headers",
      "Location",
      "Request-Context",
      "appId=",
      "MS-CV",
      "/+KjKTaYj0WS+KqQC5Ckpw.0",
      "X-Processing-Time",
      "283ms",
      "X-Azure-Ref",
      "0C4tHYAAAAADgZM5fC0K/R5BRPL9z0JVzWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:49:47 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/capabilities_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: "/phoneNumbers/%214155550100?api-version=2021-03-07",
      createdDateTime: "2021-03-09T14:49:40.711175+00:00",
      id: "capabilities_sanitized",
      operationType: "UpdatePhoneNumberCapabilities",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Location",
      "/phoneNumbers/%214155550100?api-version=2021-03-07",
      "Access-Control-Expose-Headers",
      "Location",
      "Request-Context",
      "appId=",
      "MS-CV",
      "NLSRNV8ytE2de8w2xosouA.0",
      "X-Processing-Time",
      "250ms",
      "X-Azure-Ref",
      "0DotHYAAAAABnri4EzKPNRZghh1xyQPraWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:49:49 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/capabilities_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: "/phoneNumbers/%214155550100?api-version=2021-03-07",
      createdDateTime: "2021-03-09T14:49:40.711175+00:00",
      id: "capabilities_sanitized",
      operationType: "UpdatePhoneNumberCapabilities",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Location",
      "/phoneNumbers/%214155550100?api-version=2021-03-07",
      "Access-Control-Expose-Headers",
      "Location",
      "Request-Context",
      "appId=",
      "MS-CV",
      "8ZvQjepvvUCLXlQIP5P06g.0",
      "X-Processing-Time",
      "237ms",
      "X-Azure-Ref",
      "0EItHYAAAAADvqykwTmqbTYWZ6fRuehhyWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:49:51 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/capabilities_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: "/phoneNumbers/%214155550100?api-version=2021-03-07",
      createdDateTime: "2021-03-09T14:49:40.711175+00:00",
      id: "capabilities_sanitized",
      operationType: "UpdatePhoneNumberCapabilities",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Location",
      "/phoneNumbers/%214155550100?api-version=2021-03-07",
      "Access-Control-Expose-Headers",
      "Location",
      "Request-Context",
      "appId=",
      "MS-CV",
      "kTRa9jQ4a0mFRcH3LWZSqA.0",
      "X-Processing-Time",
      "291ms",
      "X-Azure-Ref",
      "0EotHYAAAAADGr1GzF9LHTIBljC5602aAWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:49:54 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/capabilities_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: "/phoneNumbers/%214155550100?api-version=2021-03-07",
      createdDateTime: "2021-03-09T14:49:40.711175+00:00",
      id: "capabilities_sanitized",
      operationType: "UpdatePhoneNumberCapabilities",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Location",
      "/phoneNumbers/%214155550100?api-version=2021-03-07",
      "Access-Control-Expose-Headers",
      "Location",
      "Request-Context",
      "appId=",
      "MS-CV",
      "11goWwIL0EeI2np3agXZLw.0",
      "X-Processing-Time",
      "254ms",
      "X-Azure-Ref",
      "0FYtHYAAAAACKOd3JSkZYQIT4cp3n63AKWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:49:57 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/capabilities_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: "/phoneNumbers/%214155550100?api-version=2021-03-07",
      createdDateTime: "2021-03-09T14:49:40.711175+00:00",
      id: "capabilities_sanitized",
      operationType: "UpdatePhoneNumberCapabilities",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Location",
      "/phoneNumbers/%214155550100?api-version=2021-03-07",
      "Access-Control-Expose-Headers",
      "Location",
      "Request-Context",
      "appId=",
      "MS-CV",
      "GJfaP2yhg0upxJwgRXaXug.0",
      "X-Processing-Time",
      "243ms",
      "X-Azure-Ref",
      "0F4tHYAAAAABRk2dU6lIxSreTfES3KA7oWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:49:59 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/capabilities_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Succeeded",
      resourceLocation: "/phoneNumbers/%214155550100?api-version=2021-03-07",
      createdDateTime: "2021-03-09T14:49:40.711175+00:00",
      id: "capabilities_sanitized",
      operationType: "UpdatePhoneNumberCapabilities",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Location",
      "/phoneNumbers/%214155550100?api-version=2021-03-07",
      "Access-Control-Expose-Headers",
      "Location",
      "Request-Context",
      "appId=",
      "MS-CV",
      "34H0ah0oZEmr8+i9qK/4gA.0",
      "X-Processing-Time",
      "244ms",
      "X-Azure-Ref",
      "0GYtHYAAAAADYtQT3LyecQqipwCagJ4v4WVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:50:01 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/%214155550100")
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
      "9sYBz5HBZ0y/eSFc+kMENw.0",
      "X-Processing-Time",
      "1321ms",
      "X-Azure-Ref",
      "0HItHYAAAAADAJhtlrjc+R7oRlgwrmkeVWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:50:05 GMT"
    ]
  );
