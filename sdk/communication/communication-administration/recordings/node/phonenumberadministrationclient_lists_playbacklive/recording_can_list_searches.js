let nock = require("nock");

module.exports.hash = "beed9b0365f6e3637112bab5192991e5";

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
          createdAt: "2020-10-05T11:19:44.6512373+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T11:17:42.2339373+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T11:16:26.840885+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T11:11:31.1721962+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T11:10:15.972062+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T11:09:55.1679502+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T11:08:42.6595109+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T11:08:24.1002569+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T11:06:54.2343273+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T11:06:25.2107221+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T23:38:19.9954612+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T23:38:06.7611932+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T23:18:12.9457549+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T22:26:18.4021562+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T22:24:23.4785559+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T22:23:11.5130462+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T22:20:23.1161646+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T22:08:55.5839557+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T22:07:15.616762+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T21:55:20.0749931+00:00",
          displayName: "mysearch20200928",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T21:52:58.1479456+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T21:39:32.6878583+00:00",
          displayName: "mysearch20200928",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T21:30:40.8466501+00:00",
          displayName: "mysearch20200928",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T20:58:08.7137293+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T20:58:05.9896404+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
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
      "I17NSpJzB0qYl8OV/XgpIQ.0",
      "X-Processing-Time",
      "285ms",
      "X-Azure-Ref",
      "0YAJ7XwAAAAD2wTDeML+0QL/Gl2KVoZnIWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Mon, 05 Oct 2020 11:24:16 GMT"
    ]
  );
