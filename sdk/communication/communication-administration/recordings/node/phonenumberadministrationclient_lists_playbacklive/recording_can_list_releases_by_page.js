let nock = require("nock");

module.exports.hash = "37b33ae420d17c08c532aa186035b886";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases")
  .query(true)
  .reply(
    200,
    {
      entities: [
        {
          id: "sanitized",
          createdAt: "2020-10-23T16:52:36.7638816+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Complete"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-08T21:56:18.8306131+00:00",
          displayName: "<missing>",
          quantity: 2,
          quantityObtained: 2,
          status: "Complete"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T02:31:25.3517128+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T02:21:11.7337993+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T01:16:56.1529118+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        }
      ],
      nextLink:
        "https://23.100.38.234/administration/phonenumbers/releases?skip=5&take=5&api-version=2020-07-20-preview1"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "j2mxeX0BCkaCoygFg87M3Q.0",
      "X-Processing-Time",
      "276ms",
      "X-Azure-Ref",
      "02qOZXwAAAAAfOSkkGNTHRo0Cy1Iria5NWVZSMzBFREdFMDQxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 28 Oct 2020 17:01:14 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases")
  .query(true)
  .reply(
    200,
    {
      entities: [
        {
          id: "sanitized",
          createdAt: "2020-10-03T01:11:41.5100425+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T01:08:55.0533087+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T01:07:39.6289864+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T17:58:23.8047168+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T17:58:22.0009369+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        }
      ],
      nextLink:
        "https://23.100.38.234/administration/phonenumbers/releases?skip=10&take=5&api-version=2020-07-20-preview1"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "G316Mj8jb0egG3ShMSii7Q.0",
      "X-Processing-Time",
      "268ms",
      "X-Azure-Ref",
      "02qOZXwAAAADa4SHsfGWbRqWDkG9slfRiWVZSMzBFREdFMDQxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 28 Oct 2020 17:01:14 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases")
  .query(true)
  .reply(
    200,
    {
      entities: [
        {
          id: "sanitized",
          createdAt: "2020-10-02T17:55:25.9425904+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T17:55:21.0097997+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T17:49:40.195339+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T00:22:04.4518485+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T00:15:42.3982694+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        }
      ],
      nextLink:
        "https://23.100.38.234/administration/phonenumbers/releases?skip=15&take=5&api-version=2020-07-20-preview1"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "2R/zLrCZW0y3m24MO/BxPQ.0",
      "X-Processing-Time",
      "369ms",
      "X-Azure-Ref",
      "02qOZXwAAAABD+whdD1UfTLzCv7BSu9fRWVZSMzBFREdFMDQxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 28 Oct 2020 17:01:14 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases")
  .query(true)
  .reply(
    200,
    {
      entities: [
        {
          id: "sanitized",
          createdAt: "2020-10-01T13:50:05.1616734+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        }
      ],
      nextLink: null
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "S/To80/oS0GWJn/dWhz/KA.0",
      "X-Processing-Time",
      "220ms",
      "X-Azure-Ref",
      "026OZXwAAAADkjdKizOtOT4VlCSI2Ve84WVZSMzBFREdFMDQxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 28 Oct 2020 17:01:15 GMT"
    ]
  );
