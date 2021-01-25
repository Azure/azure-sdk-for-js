let nock = require("nock");

module.exports.hash = "19775ca1462558f0d7191ae0930c93d1";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/administration/phonenumbers/releases", { phoneNumbers: ["+18005551234"] })
  .query(true)
  .reply(200, { releaseId: "sanitized" }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "TmdJGgAMEkG66WLJTYxqiQ.0",
    "X-Processing-Time",
    "650ms",
    "X-Azure-Ref",
    "05Dl+XwAAAAA40OYinfkqQ7M7wG6n4dZIWVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Wed, 07 Oct 2020 21:57:56 GMT"
  ]);

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-10-07T21:57:56.4490674+00:00",
      status: "Pending",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "Pending" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "d9wWYa2yu0+SxNzn20bS9A.0",
      "X-Processing-Time",
      "197ms",
      "X-Azure-Ref",
      "05Dl+XwAAAACET7hocjjaRrZcQm+em3hkWVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:57:56 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-10-07T21:57:56.4490674+00:00",
      status: "Pending",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "Pending" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "xOjg6420Akqbe1oQK69QiA.0",
      "X-Processing-Time",
      "207ms",
      "X-Azure-Ref",
      "05Tl+XwAAAADs2iEilyIwRKBw4i6hy/LoWVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:57:56 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-10-07T21:57:56.4490674+00:00",
      status: "Pending",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "Pending" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "BmfM2DSivUagA4Fc7gStRg.0",
      "X-Processing-Time",
      "390ms",
      "X-Azure-Ref",
      "05zl+XwAAAABY4MPQQh8ETKaGb/vvwDLcWVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:57:59 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-10-07T21:57:56.4490674+00:00",
      status: "Pending",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "Pending" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "cnUnOCRkSEe7J1H1yosl2A.0",
      "X-Processing-Time",
      "192ms",
      "X-Azure-Ref",
      "06Tl+XwAAAAD9IVQVJcz9RL78GY8hLX6CWVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:58:01 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-10-07T21:57:56.4490674+00:00",
      status: "Pending",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "Pending" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "aNmSpeYlsUedi5K0ULA6NA.0",
      "X-Processing-Time",
      "194ms",
      "X-Azure-Ref",
      "07Dl+XwAAAAASuE/jxFwRTL9UEfFD+GMWWVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:58:03 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-10-07T21:57:56.4490674+00:00",
      status: "InProgress",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "Pending" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "Sr1nrd8QAUyRM9BsL6MXQw.0",
      "X-Processing-Time",
      "198ms",
      "X-Azure-Ref",
      "07jl+XwAAAAB2JiqRwZnXS7WnmRKdmwXaWVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:58:05 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-10-07T21:57:56.4490674+00:00",
      status: "InProgress",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "InProgress" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "MJ8PeqcwLEq6H49Pya7T8Q.0",
      "X-Processing-Time",
      "205ms",
      "X-Azure-Ref",
      "08Dl+XwAAAAARBFMStcgnQ7f0iyXmSYVFWVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:58:07 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-10-07T21:57:56.4490674+00:00",
      status: "InProgress",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "InProgress" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "MvfuQkl9PE+IdBM8OyryzQ.0",
      "X-Processing-Time",
      "192ms",
      "X-Azure-Ref",
      "08jl+XwAAAAA+ukfnG9M4TJ2GVxji76z+WVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:58:10 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-10-07T21:57:56.4490674+00:00",
      status: "InProgress",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "InProgress" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "nuSLFs6lik2ICeCqzuUw+A.0",
      "X-Processing-Time",
      "198ms",
      "X-Azure-Ref",
      "09Dl+XwAAAAACn1za1CfYSriu5oH6EZvZWVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:58:13 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-10-07T21:57:56.4490674+00:00",
      status: "InProgress",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "InProgress" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "fR7hv5AUbU2fFTL74f62og.0",
      "X-Processing-Time",
      "192ms",
      "X-Azure-Ref",
      "09zl+XwAAAADofxKeanRmSqDvyXSB2HovWVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:58:15 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-10-07T21:57:56.4490674+00:00",
      status: "InProgress",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "InProgress" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "h0mtGAmLfky94CjMCsE5gw.0",
      "X-Processing-Time",
      "196ms",
      "X-Azure-Ref",
      "0+Tl+XwAAAAAlapK1UvzKSo10zszZxUDFWVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:58:17 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-10-07T21:57:56.4490674+00:00",
      status: "InProgress",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "InProgress" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "Zp89cMopo0irAafdhwyjBw.0",
      "X-Processing-Time",
      "200ms",
      "X-Azure-Ref",
      "0+zl+XwAAAACgqKbeIIvWRoSHnKzUlRPnWVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:58:19 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-10-07T21:57:56.4490674+00:00",
      status: "InProgress",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "InProgress" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "mClENZu6Ak2wwQvwArbvzQ.0",
      "X-Processing-Time",
      "193ms",
      "X-Azure-Ref",
      "0/Tl+XwAAAAC4wrN8deNeRZoaultrAId6WVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:58:21 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-10-07T21:52:10.3728653+00:00",
      status: "Complete",
      phoneNumberReleaseStatusDetails: { "+12052039872": { status: "Success" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "NgpxIMQMUUuZRDCK/LQ3jA.0",
      "X-Processing-Time",
      "235ms",
      "X-Azure-Ref",
      "0ADp+XwAAAAD6m824RWd5QoaCTfIM8dciWVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:58:23 GMT"
    ]
  );
