let nock = require("nock");

module.exports.hash = "b9147d1e090f34bc4b27f99c4758b484";

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
          createdAt: "2020-10-27T16:52:22.7473371+00:00",
          displayName: "New search for 1 phone number(s) with 970",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-27T16:47:24.7604028+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-27T16:35:51.4881711+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T17:47:36.199747+00:00",
          displayName: "New search for 8 phone number(s) with 833",
          quantity: 8,
          quantityObtained: 8,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-05T16:02:19.705704+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T02:27:08.8964796+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T02:26:25.326693+00:00",
          displayName: "New search for 1 phone number(s) with 856",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T02:22:50.7184546+00:00",
          displayName: "New search for 2 phone number(s) with 470",
          quantity: 2,
          quantityObtained: 2,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T01:13:49.0119118+00:00",
          displayName: "New search for 2 phone number(s) with 833",
          quantity: 2,
          quantityObtained: 2,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T01:13:10.6353346+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T01:04:40.6669953+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T01:04:30.9162221+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T01:00:17.0127098+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T00:54:55.7325029+00:00",
          displayName: "New search for 1 phone number(s) with 202",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T00:52:25.3984954+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T00:46:32.512993+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T00:42:30.3831306+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-03T00:32:45.4239884+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T21:22:36.73413+00:00",
          displayName: "New search for 3 phone number(s) with 833",
          quantity: 3,
          quantityObtained: 3,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T21:21:19.0962803+00:00",
          displayName: "New search for 2 phone number(s) with 833",
          quantity: 2,
          quantityObtained: 2,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T20:58:56.6450446+00:00",
          displayName: "New search for 12 phone number(s) with 833",
          quantity: 12,
          quantityObtained: 12,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T20:21:33.5975613+00:00",
          displayName: "New search for 20 phone number(s) with 559",
          quantity: 20,
          quantityObtained: 7,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T20:20:36.6120662+00:00",
          displayName: "New search for 2 phone number(s) with 559",
          quantity: 2,
          quantityObtained: 2,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T19:59:58.2238807+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T19:59:26.3380878+00:00",
          displayName: "New search for 2 phone number(s) with 833",
          quantity: 2,
          quantityObtained: 2,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T19:51:17.4867246+00:00",
          displayName: "New search for 3 phone number(s) with 833",
          quantity: 3,
          quantityObtained: 3,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T19:12:02.5973538+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T19:09:22.2371632+00:00",
          displayName: "New search for 1 phone number(s) with 949",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T19:08:45.3570456+00:00",
          displayName: "New search for 5 phone number(s) with 833",
          quantity: 5,
          quantityObtained: 5,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T18:53:59.3310608+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T17:29:13.2700002+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-10-02T01:07:06.6145239+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-30T23:00:13.3047639+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-30T21:02:56.3835863+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-30T20:56:06.3002105+00:00",
          displayName: "New search for 1 phone number(s) with 970",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-30T20:54:11.4653917+00:00",
          displayName: "New search for 3 phone number(s) with 833",
          quantity: 3,
          quantityObtained: 3,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-30T19:44:16.9209972+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T23:34:04.2860471+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T23:33:12.6987609+00:00",
          displayName: "New search for 1 phone number(s) with 260",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T23:27:40.8288586+00:00",
          displayName: "New search for 1 phone number(s) with 833",
          quantity: 1,
          quantityObtained: 1,
          status: "Expired"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T23:25:51.0004717+00:00",
          displayName: "New search for 1 phone number(s) with 202",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T23:25:16.4537401+00:00",
          displayName: "New search for 20 phone number(s) with 475",
          quantity: 20,
          quantityObtained: 20,
          status: "Cancelled"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T23:17:03.8688063+00:00",
          displayName: "New search for 1 phone number(s) with 970",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T19:33:19.5706711+00:00",
          displayName: "New search for 1 phone number(s) with 706",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T19:28:09.2011738+00:00",
          displayName: "New search for 1 phone number(s) with 617",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T19:23:42.5787414+00:00",
          displayName: "New search for 1 phone number(s) with 239",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T19:20:02.6874599+00:00",
          displayName: "New search for 1 phone number(s) with 202",
          quantity: 1,
          quantityObtained: 1,
          status: "Error"
        },
        {
          id: "sanitized",
          createdAt: "2020-09-29T19:14:34.5492582+00:00",
          displayName: "New search for 1 phone number(s) with 970",
          quantity: 1,
          quantityObtained: 1,
          status: "Success"
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
      "3aluU9DqWU2SN8r5D7vf5Q.0",
      "X-Processing-Time",
      "545ms",
      "X-Azure-Ref",
      "026OZXwAAAABhaA9r5Qh1TLuEWd1RBjyOWVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 28 Oct 2020 17:01:15 GMT"
    ]
  );
