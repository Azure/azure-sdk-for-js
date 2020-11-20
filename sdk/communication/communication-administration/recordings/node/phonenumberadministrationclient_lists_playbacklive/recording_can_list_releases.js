let nock = require("nock");

module.exports.hash = "29a008ab06588dc49ccef34434f34962";

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
          createdAt: "2020-10-06T22:09:15.6973324+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T22:09:10.1382455+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T22:08:59.9206727+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T22:08:53.9901494+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T22:34:55.8201039+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T19:46:07.9277205+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T19:30:38.9510914+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T19:04:25.3546697+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T19:04:19.728546+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T19:03:55.2687923+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T19:03:49.1210206+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T18:57:52.671763+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T04:55:32.0329458+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-30T08:23:03.5698776+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-30T08:21:30.4716416+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-28T20:09:36.2701214+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-23T05:16:13.9074624+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-23T05:13:17.2438327+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-22T04:23:36.1626946+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-22T04:23:25.9748532+00:00",
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
      "iRqWQ2F7uECIX3SNzCN51A.0",
      "X-Processing-Time",
      "270ms",
      "X-Azure-Ref",
      "0Zil+XwAAAABjY5PSntjWRpzVFYryyjx9WVZSMzBFREdFMDMxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:34 GMT"
    ]
  );
