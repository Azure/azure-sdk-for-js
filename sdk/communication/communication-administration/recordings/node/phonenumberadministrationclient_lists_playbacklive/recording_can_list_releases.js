let nock = require("nock");

module.exports.hash = "af71ba10844429765909b93e75da26d0";

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
          createdAt: "2020-11-21T03:41:38.5096934+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Complete"
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
      "C31hBGIrA0W+YOUctUfZ4g.0",
      "X-Processing-Time",
      "231ms",
      "X-Azure-Ref",
      "0toy4XwAAAAAn3NH0OooMQ62BgB6iEK+PWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:42:45 GMT"
    ]
  );
