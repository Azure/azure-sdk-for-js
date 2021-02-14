let nock = require("nock");

module.exports.hash = "42db5eea98b2b83968d0c67972dcbaf6";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches")
  .query(true)
  .reply(
    200,
    {
      entities: [
        {
          id: "sanitized",
          createdAt: "2020-11-21T03:41:59.9271976+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-11-21T03:40:56.6351919+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-11-03T16:42:04.364095+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-11-03T16:23:43.8631039+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-26T23:52:38.3684105+00:00",
          displayName: "New search for 1 phone number(s) with 720",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-26T23:50:23.1392872+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
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
      "wSxbD5HR/kKhUAe4ExV55w.0",
      "X-Processing-Time",
      "537ms",
      "X-Azure-Ref",
      "0toy4XwAAAACmOdRpvTh+TJ4Dg3BEEo9BWVZSMzBFREdFMDQxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:42:46 GMT"
    ]
  );
