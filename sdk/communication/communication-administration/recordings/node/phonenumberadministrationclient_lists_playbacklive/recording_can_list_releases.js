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
          createdAt: "2020-10-02T22:26:27.8090563+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T22:24:32.6798496+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T22:23:21.6530804+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T22:20:29.7346818+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T22:20:06.562253+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T22:14:24.6662992+00:00",
          displayName: "<missing>",
          quantity: 1,
          quantityObtained: 1,
          status: "Failed"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T22:14:17.7449264+00:00",
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
      "42rP8QoU3kyub480QPsRYg.0",
      "X-Processing-Time",
      "261ms",
      "X-Azure-Ref",
      "0YAJ7XwAAAABlVlhkgT8tR6sjasSHsotCWVZSMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Mon, 05 Oct 2020 11:24:15 GMT"
    ]
  );
