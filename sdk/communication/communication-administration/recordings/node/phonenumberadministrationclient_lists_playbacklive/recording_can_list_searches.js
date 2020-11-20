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
          createdAt: "2020-10-07T20:46:26.3136937+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Reserved"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:42:25.8051216+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:34:22.0074148+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:33:49.0457535+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:33:08.2701065+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:32:31.3624756+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:19:24.1877888+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:17:19.324896+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:16:57.141868+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:16:52.093062+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:15:44.5981184+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:12:19.9330481+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:12:04.3082843+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:10:35.1336688+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:10:16.9250667+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:10:06.9836326+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:09:34.297943+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T20:02:01.7271964+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T19:55:41.3430826+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T19:55:08.4296335+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T19:52:51.966739+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T19:49:31.125935+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T19:46:55.9343654+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T19:45:55.4896319+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T19:42:56.5228482+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T19:18:09.2822229+00:00",
          displayName: "testsearch20200014",
          quantity: 2,
          quantityObtained: 2,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T19:15:45.0889566+00:00",
          displayName: "testsearch20200014",
          quantity: 2,
          quantityObtained: 2,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T19:12:49.3821371+00:00",
          displayName: "testsearch20200014",
          quantity: 2,
          quantityObtained: 2,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T19:10:54.6190624+00:00",
          displayName: "testsearch20200014",
          quantity: 2,
          quantityObtained: 2,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T19:09:50.6904215+00:00",
          displayName: "testsearch20200014",
          quantity: 2,
          quantityObtained: 2,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T19:08:42.5557718+00:00",
          displayName: "testsearch20200014",
          quantity: 2,
          quantityObtained: 2,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T19:03:11.9322589+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T19:02:12.6560662+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T18:59:44.0340993+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-07T18:51:53.5965258+00:00",
          displayName: "LRO Test Search",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T22:09:18.298955+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T22:09:16.9363453+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T22:09:02.8812737+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T22:09:01.266857+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T22:08:38.3984814+00:00",
          displayName: "testsearch20200014",
          quantity: 2,
          quantityObtained: 2,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T22:05:10.5952146+00:00",
          displayName: "testsearch20200014",
          quantity: 2,
          quantityObtained: 2,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T22:03:48.2763503+00:00",
          displayName: "testsearch20200014",
          quantity: 2,
          quantityObtained: 2,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T22:02:19.0624194+00:00",
          displayName: "testsearch20200014",
          quantity: 2,
          quantityObtained: 2,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T21:45:44.6093925+00:00",
          displayName: "testsearch20200014",
          quantity: 2,
          quantityObtained: 2,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T21:40:55.4259286+00:00",
          displayName: "testsearch20200014",
          quantity: 2,
          quantityObtained: 2,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T21:39:28.8001624+00:00",
          displayName: "testsearch20200014",
          quantity: 2,
          quantityObtained: 2,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T16:49:05.1044519+00:00",
          displayName: "testsearch20200014",
          quantity: 2,
          quantityObtained: 2,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T16:46:17.9484442+00:00",
          displayName: "testsearch20200014",
          quantity: 2,
          quantityObtained: 2,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-06T16:43:04.3279546+00:00",
          displayName: "testsearch20200014",
          quantity: 2,
          quantityObtained: 2,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T22:34:46.5330706+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T22:24:11.1650495+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T21:46:44.0061247+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T21:38:45.133326+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T21:32:40.6257874+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T21:25:15.5314488+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T21:23:23.3227419+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T21:17:49.3522282+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T21:15:30.2864455+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T21:08:09.2840452+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T20:55:35.0177171+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T19:54:57.0781406+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T19:48:40.2894004+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T19:46:38.3339363+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T19:45:59.0003981+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T19:29:18.5654194+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T19:26:07.2847153+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T19:26:01.5942012+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T19:12:59.9950936+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 1,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T19:09:17.9509794+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T18:57:37.8313413+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T19:33:35.7713345+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T19:33:30.7521936+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T19:31:33.2688041+00:00",
          displayName: "mysearch20200928",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T19:22:05.7250909+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T19:17:48.6436314+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T18:33:37.3941156+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T18:33:23.49478+00:00",
          displayName: "testsearch20200014",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T04:49:30.459317+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T03:26:58.3778108+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T03:19:03.7907742+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T03:12:45.0375597+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:57:37.9005693+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:57:18.0415231+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:55:34.7494935+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:54:01.6722267+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:52:31.3314225+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:46:00.069457+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:45:45.4367168+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:32:31.2826321+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:32:19.8370826+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:23:17.9769815+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:23:16.3583149+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:17:20.3437695+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:17:18.3096094+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:12:22.4481628+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:12:20.1292791+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:10:40.0899851+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:10:38.6164288+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:07:45.4372649+00:00",
          displayName: "sanitized",
          quantity: 1,
          quantityObtained: 0,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T02:07:43.2776084+00:00",
          displayName: "sanitized",
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
      "6HLhczbjbUeQn/gd0kRWXQ.0",
      "X-Processing-Time",
      "859ms",
      "X-Azure-Ref",
      "0Zyl+XwAAAABk9FCyib+UR7RfRcuWhRxLWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:35 GMT"
    ]
  );
