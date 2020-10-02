let nock = require("nock");

module.exports.hash = "6acc17a00d435f730e858c99f42d1db9";

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
          createdAt: "2020-10-01T23:19:40.0714381+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-01T23:17:42.4510561+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-01T23:16:42.9466082+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-01T23:14:11.1121487+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-01T23:03:52.1878037+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-01T22:54:15.3800346+00:00",
          displayName: "318362fa-2b19-4062-92af-fa0673914f30",
          quantity: 1,
          quantityObtained: 1,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-01T21:43:23.9539569+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-01T21:35:54.8685399+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-01T21:00:43.5308295+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-01T02:35:35.0713243+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-30T09:47:00.7331094+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-30T09:45:59.2965213+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T22:15:13.869861+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T22:14:06.5371519+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T21:36:12.0555883+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T20:46:30.6400143+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T20:43:46.2502747+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T20:42:38.135422+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T20:41:53.4088096+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T20:33:58.87063+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T20:32:24.0309382+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T20:29:15.3090849+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T20:26:23.6535712+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T19:32:35.6979367+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T19:32:30.6681707+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-28T23:41:11.3078021+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-28T23:34:32.3360015+00:00",
          displayName: "mysearch20200928",
          quantity: 1,
          quantityObtained: 1,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-28T23:27:13.2226654+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-28T23:07:44.9405649+00:00",
          displayName: "mysearch20200928",
          quantity: 1,
          quantityObtained: 1,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-28T22:04:07.6173622+00:00",
          displayName: "mysearch20200928",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-28T21:07:20.7031841+00:00",
          displayName: "mysearch20200928",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-28T21:00:52.8567804+00:00",
          displayName: "mysearch20200928",
          quantity: 1,
          quantityObtained: 1,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-28T20:58:50.8593082+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-28T20:08:56.0326653+00:00",
          displayName: "mysearch20200928",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-28T20:08:54.0502378+00:00",
          displayName: "mysearch20200928",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-28T19:51:03.7045074+00:00",
          displayName: "mysearch20200928",
          quantity: 1,
          quantityObtained: 1,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-28T17:41:56.0182406+00:00",
          displayName: "mysearch20200928",
          quantity: 1,
          quantityObtained: 1,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-23T20:19:39.3504058+00:00",
          displayName: "318362fa-2b19-4062-92af-fa0673914f30",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-23T05:35:40.2527969+00:00",
          displayName: "318362fa-2b19-4062-92af-fa0673914f30",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-23T01:13:09.8271773+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-23T01:08:21.0079159+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-23T01:05:37.2151394+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-23T01:05:32.5357935+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-23T01:00:31.8925981+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-23T00:59:36.9885893+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-23T00:58:52.7293351+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-23T00:54:36.6570083+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-23T00:21:45.9207132+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-23T00:19:00.3231531+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-23T00:16:57.6384885+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-23T00:16:52.833435+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-22T04:36:33.4684433+00:00",
          displayName: "318362fa-2b19-4062-92af-fa0673914f30",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-22T04:33:18.376327+00:00",
          displayName: "318362fa-2b19-4062-92af-fa0673914f30",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-22T04:23:49.5933515+00:00",
          displayName: "318362fa-2b19-4062-92af-fa0673914f30",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-22T04:23:46.7749099+00:00",
          displayName: "318362fa-2b19-4062-92af-fa0673914f30",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-21T22:57:25.353001+00:00",
          displayName: "testsearch20200021",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-21T22:43:32.8257185+00:00",
          displayName: "testsearch20200021",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-21T22:24:27.3157678+00:00",
          displayName: "testsearch20200021",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-21T22:19:30.5279054+00:00",
          displayName: "testsearch20200021",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-21T21:48:34.7679791+00:00",
          displayName: "testsearch20200021",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
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
      "0xt6BUsGVU+XmFbKy3boQQ.0",
      "X-Processing-Time",
      "369ms",
      "X-Azure-Ref",
      "0knZ2XwAAAABNasNAii9JSIbDJgMAdrQ4WVZSMzBFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Fri, 02 Oct 2020 00:38:42 GMT"
    ]
  );
