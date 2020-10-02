let nock = require("nock");

module.exports.hash = "034a68dbeaa66bb5bea28fb566a219ef";

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
      "pzFm2gwySU2tOrv93YawdA.0",
      "X-Processing-Time",
      "293ms",
      "X-Azure-Ref",
      "0kXZ2XwAAAAB9t8/XcEIJRr+Cq39wXB3oWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Fri, 02 Oct 2020 00:38:41 GMT"
    ]
  );
