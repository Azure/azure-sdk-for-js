let nock = require("nock");

module.exports.hash = "e994d1a277432a9aebd7be105a356dde";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: false })
  .post("/availablePhoneNumbers/:purchase", { searchId: "sanitized" })
  .query(true)
  .reply(202, "", [
    "Access-Control-Expose-Headers",
    "Operation-Location,operation-id,purchase-id",
    "Request-Context",
    "appId=",
    "MS-CV",
    "+edT0eA5R0yRH5IAN5akmw.0",
    "Operation-Location",
    "/phoneNumbers/operations/purchase_sanitized?api-version=2021-03-07",
    "operation-id",
    "purchase_sanitized",
    "purchase-id",
    "sanitized",
    "X-Processing-Time",
    "2345ms",
    "X-Azure-Ref",
    "0w41HYAAAAACu7Dolh2xzTrjzvG4N4GoPWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Tue, 09 Mar 2021 15:01:25 GMT",
    "Content-Length",
    "0"
  ]);

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/purchase_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
      id: "purchase_sanitized",
      operationType: "Purchase",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "+jgU+d21HE2ZiAt+QTwZyw.0",
      "X-Processing-Time",
      "286ms",
      "X-Azure-Ref",
      "0xY1HYAAAAABaYtjD15oAT7QgHM9hAEpXWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:25 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/purchase_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
      id: "purchase_sanitized",
      operationType: "Purchase",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "7vlNKbtesk+wnrUzjbQpGw.0",
      "X-Processing-Time",
      "566ms",
      "X-Azure-Ref",
      "0x41HYAAAAACgLf7VUYNPQ4wrY/kR7qRAWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:28 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/purchase_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
      id: "purchase_sanitized",
      operationType: "Purchase",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "1lJbDyvXmUK7kqWNoflc8g.0",
      "X-Processing-Time",
      "281ms",
      "X-Azure-Ref",
      "0yo1HYAAAAADfQxFS26niS7N1sOn73BZQWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:30 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/purchase_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
      id: "purchase_sanitized",
      operationType: "Purchase",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "wyZa0etpwkG4S5kv++ZqDw.0",
      "X-Processing-Time",
      "295ms",
      "X-Azure-Ref",
      "0zI1HYAAAAABDais1Hd6VTbUVKxkByPamWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:32 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/purchase_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
      id: "purchase_sanitized",
      operationType: "Purchase",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "08Web5i5v0G9OleclkPXdg.0",
      "X-Processing-Time",
      "270ms",
      "X-Azure-Ref",
      "0z41HYAAAAABpw4CFzeP1QqrRdh1fAKYmWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:34 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/purchase_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
      id: "purchase_sanitized",
      operationType: "Purchase",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "Q8egFntY2EWfdFSixfT0Gg.0",
      "X-Processing-Time",
      "295ms",
      "X-Azure-Ref",
      "00Y1HYAAAAADYJdJDG7PPSZ3FnBTBDT4GWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:37 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/purchase_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "NotStarted",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
      id: "purchase_sanitized",
      operationType: "Purchase",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "NVs7SzMpZU2E7A5F8FlkDg.0",
      "X-Processing-Time",
      "293ms",
      "X-Azure-Ref",
      "0041HYAAAAAAXmSf0qPt2SY8ePJqUQylfWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:39 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/purchase_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "NotStarted",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
      id: "purchase_sanitized",
      operationType: "Purchase",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "u89Kh9+rQUSjECB8/pf7Eg.0",
      "X-Processing-Time",
      "304ms",
      "X-Azure-Ref",
      "01o1HYAAAAACbQWxHMb4lR6eDJhcX/sUJWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:41 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/purchase_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "NotStarted",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
      id: "purchase_sanitized",
      operationType: "Purchase",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "yITn0DO+B0KWwQOsbSW7hQ.0",
      "X-Processing-Time",
      "278ms",
      "X-Azure-Ref",
      "02I1HYAAAAACsFjJRUYHiToUOqJ0OM8HQWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:44 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/purchase_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "NotStarted",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
      id: "purchase_sanitized",
      operationType: "Purchase",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "Txu7Z3i7Q0GJjdNTJ5mxbw.0",
      "X-Processing-Time",
      "280ms",
      "X-Azure-Ref",
      "02o1HYAAAAADbQKVfrmwrS6ZWkrfkpDxuWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:46 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/purchase_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "NotStarted",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
      id: "purchase_sanitized",
      operationType: "Purchase",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "S2Ti6X921UWOSd6WY65VPA.0",
      "X-Processing-Time",
      "272ms",
      "X-Azure-Ref",
      "03Y1HYAAAAADZOFEaZxNVQI+3CnFw1VJGWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:48 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/purchase_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "NotStarted",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
      id: "purchase_sanitized",
      operationType: "Purchase",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "y8KXPlsPuE2o6z8iV4OONw.0",
      "X-Processing-Time",
      "602ms",
      "X-Azure-Ref",
      "0341HYAAAAACBvONiap64S4/uchazAflEWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:51 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/purchase_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "NotStarted",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
      id: "purchase_sanitized",
      operationType: "Purchase",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "mjSdJEXsn0aniCOWgFS/ng.0",
      "X-Processing-Time",
      "293ms",
      "X-Azure-Ref",
      "04o1HYAAAAACvpve0ufZvR4lxt6ywKxEEWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:53 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/purchase_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "NotStarted",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
      id: "purchase_sanitized",
      operationType: "Purchase",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "cQDPhR6llkiso/OcTUISLQ.0",
      "X-Processing-Time",
      "282ms",
      "X-Azure-Ref",
      "05I1HYAAAAAAiLVECxwlvTbGKCFnMXBuhWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:55 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/purchase_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "NotStarted",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
      id: "purchase_sanitized",
      operationType: "Purchase",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "eXXlblHIc0mxdAd7fTtI4Q.0",
      "X-Processing-Time",
      "265ms",
      "X-Azure-Ref",
      "05o1HYAAAAAA7xzA6xAxuQ6GnCGkzTYsNWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:01:58 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/purchase_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Succeeded",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:01:08.112764+00:00",
      id: "purchase_sanitized",
      operationType: "Purchase",
      lastActionDateTime: "0001-01-01T00:00:00+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "EZLpbPxqlEepPwAse6sMeA.0",
      "X-Processing-Time",
      "612ms",
      "X-Azure-Ref",
      "06I1HYAAAAAAmxhQXw5/dRJmUf8bKW+uaWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:02:00 GMT"
    ]
  );
