let nock = require("nock");

module.exports.hash = "bd5439b82b7849f70e74c25140f1c0e1";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: false })
  .delete("/phoneNumbers/%2B14155550100")
  .query(true)
  .reply(202, "", [
    "Access-Control-Expose-Headers",
    "Operation-Location,operation-id,release-id",
    "Request-Context",
    "appId=",
    "MS-CV",
    "4ZTPSDjsoE6WiQbBO7YE8w.0",
    "Operation-Location",
    "/phoneNumbers/operations/release_sanitized?api-version=2021-03-07",
    "operation-id",
    "release_sanitized",
    "release-id",
    "sanitized",
    "X-Processing-Time",
    "1680ms",
    "X-Azure-Ref",
    "07JBHYAAAAAA/1ZDjS3JIQphAKzXs2yZzWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Tue, 09 Mar 2021 15:14:53 GMT",
    "Content-Length",
    "0"
  ]);

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/release_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "NotStarted",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:14:53.3326456+00:00",
      id: "release_sanitized",
      operationType: "ReleasePhoneNumber",
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
      "27dVWauLk0SpIhnez+/DSQ.0",
      "X-Processing-Time",
      "243ms",
      "X-Azure-Ref",
      "07pBHYAAAAACC7WiwPjTcSbtx9xdUtIAzWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:14:53 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/release_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:14:53.3326456+00:00",
      id: "release_sanitized",
      operationType: "ReleasePhoneNumber",
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
      "quLPaj8R6kWykoka7ankEA.0",
      "X-Processing-Time",
      "237ms",
      "X-Azure-Ref",
      "08JBHYAAAAABAmZNcAh3zR60wBa0S/1bzWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:14:56 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/release_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:14:53.3326456+00:00",
      id: "release_sanitized",
      operationType: "ReleasePhoneNumber",
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
      "iCve+eKXaEaO1TeDQDR5ag.0",
      "X-Processing-Time",
      "278ms",
      "X-Azure-Ref",
      "08pBHYAAAAABYCyso0qWbT7YYBd7PVX+SWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:14:58 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/release_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:14:53.3326456+00:00",
      id: "release_sanitized",
      operationType: "ReleasePhoneNumber",
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
      "N7T8isHc2E+AHXsk5XXRSg.0",
      "X-Processing-Time",
      "251ms",
      "X-Azure-Ref",
      "09JBHYAAAAACalaKb30YlT4kNNnLEUBfBWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:15:00 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/release_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:14:53.3326456+00:00",
      id: "release_sanitized",
      operationType: "ReleasePhoneNumber",
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
      "xLt/IDS4K0Czly2uPGwgTg.0",
      "X-Processing-Time",
      "288ms",
      "X-Azure-Ref",
      "095BHYAAAAADx+Js9s4MmQoF31OQkhoWVWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:15:02 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/release_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:14:53.3326456+00:00",
      id: "release_sanitized",
      operationType: "ReleasePhoneNumber",
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
      "UyQWiLSo2UCcL/rX9JQWbw.0",
      "X-Processing-Time",
      "239ms",
      "X-Azure-Ref",
      "0+ZBHYAAAAAB5nf83SYvdS6u3tkGXmA97WVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:15:05 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/release_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:14:53.3326456+00:00",
      id: "release_sanitized",
      operationType: "ReleasePhoneNumber",
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
      "neE9vBD+Jk+NeE1ewkbVxA.0",
      "X-Processing-Time",
      "243ms",
      "X-Azure-Ref",
      "0+5BHYAAAAAD3+tHxUfHYQ7BxsyZhFl7dWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:15:07 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/release_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:14:53.3326456+00:00",
      id: "release_sanitized",
      operationType: "ReleasePhoneNumber",
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
      "f4fq+tZQ/Eu+9ZVkn05O3g.0",
      "X-Processing-Time",
      "271ms",
      "X-Azure-Ref",
      "0/pBHYAAAAACfHkpMby1WSqtHX9XVAXQxWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:15:09 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/release_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:14:53.3326456+00:00",
      id: "release_sanitized",
      operationType: "ReleasePhoneNumber",
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
      "JEGp1AOikkWWPmIeZ1Wnbw.0",
      "X-Processing-Time",
      "272ms",
      "X-Azure-Ref",
      "0AJFHYAAAAADYVzGfOqvsQJCm9KAXnIHqWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:15:11 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/release_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Running",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:14:53.3326456+00:00",
      id: "release_sanitized",
      operationType: "ReleasePhoneNumber",
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
      "WovpdAvt2UmUgBt2NbBK/Q.0",
      "X-Processing-Time",
      "275ms",
      "X-Azure-Ref",
      "0ApFHYAAAAABC3DmewOn2RLYYQau4eyNrWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:15:14 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/operations/release_sanitized")
  .query(true)
  .reply(
    200,
    {
      status: "Succeeded",
      resourceLocation: null,
      createdDateTime: "2021-03-09T15:14:53.3326456+00:00",
      id: "release_sanitized",
      operationType: "ReleasePhoneNumber",
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
      "C0L4mwtvjk+GsvijYykGng.0",
      "X-Processing-Time",
      "238ms",
      "X-Azure-Ref",
      "0BZFHYAAAAAAXvqkIrAs0TL3CQ3njO8xGWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 15:15:16 GMT"
    ]
  );
