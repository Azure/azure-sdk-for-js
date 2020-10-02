let nock = require("nock");

module.exports.hash = "b0ffc7f9ea36cb5538725b1c8982e8c7";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/administration/phonenumbers/searches", {
    displayName: "LRO Test Search",
    description: "Test search for JS phone number admin SDK.",
    phonePlanIds: ["phone-plan-id-1"],
    areaCode: "555",
    quantity: 1
  })
  .query(true)
  .reply(201, { searchId: "ff8a6a7d-b811-4b16-81e6-767bd8ff395e" }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "V6I/LGVfV0uKM7mlpWmd6g.0",
    "X-Processing-Time",
    "1395ms",
    "X-Azure-Ref",
    "0IEl3XwAAAAAsjCeA+kzGR74ZSVh1FjjyWVZSMzBFREdFMDMxMQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=",
    "Date",
    "Fri, 02 Oct 2020 15:37:05 GMT"
  ]);

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/ff8a6a7d-b811-4b16-81e6-767bd8ff395e")
  .query(true)
  .reply(
    200,
    {
      searchId: "ff8a6a7d-b811-4b16-81e6-767bd8ff395e",
      displayName: "LRO Test Search",
      createdAt: "2020-10-02T15:37:05.8863424+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["phone-plan-id-1"],
      areaCode: "555",
      quantity: 1,
      locationOptions: [],
      status: "Pending",
      phoneNumbers: []
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "K0hGcsTu6ECaeKcPHEUoJA.0",
      "X-Processing-Time",
      "674ms",
      "X-Azure-Ref",
      "0Ikl3XwAAAABDavgMwyWvTr4IQYYZ+SJGWVZSMzBFREdFMDMxMQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=",
      "Date",
      "Fri, 02 Oct 2020 15:37:06 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/ff8a6a7d-b811-4b16-81e6-767bd8ff395e")
  .query(true)
  .reply(
    200,
    {
      searchId: "ff8a6a7d-b811-4b16-81e6-767bd8ff395e",
      displayName: "LRO Test Search",
      createdAt: "2020-10-02T15:37:05.8863424+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["phone-plan-id-1"],
      areaCode: "555",
      quantity: 1,
      locationOptions: [],
      status: "Pending",
      phoneNumbers: []
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "L0u3awYQW0W0PVWhNPD2JQ.0",
      "X-Processing-Time",
      "664ms",
      "X-Azure-Ref",
      "0I0l3XwAAAACY0LcTQFSLQr8mfzJqqksCWVZSMzBFREdFMDMxMQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=",
      "Date",
      "Fri, 02 Oct 2020 15:37:07 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/ff8a6a7d-b811-4b16-81e6-767bd8ff395e")
  .query(true)
  .reply(
    200,
    {
      searchId: "ff8a6a7d-b811-4b16-81e6-767bd8ff395e",
      displayName: "LRO Test Search",
      createdAt: "2020-10-02T15:37:05.8863424+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["phone-plan-id-1"],
      areaCode: "555",
      quantity: 1,
      locationOptions: [],
      status: "InProgress",
      phoneNumbers: []
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "ETf4s3yNGEmXhR1d0Kdotg.0",
      "X-Processing-Time",
      "751ms",
      "X-Azure-Ref",
      "0JUl3XwAAAACE9V8/xE+NQImp2xd0/OzDWVZSMzBFREdFMDMxMQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=",
      "Date",
      "Fri, 02 Oct 2020 15:37:09 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/ff8a6a7d-b811-4b16-81e6-767bd8ff395e")
  .query(true)
  .reply(
    200,
    {
      searchId: "ff8a6a7d-b811-4b16-81e6-767bd8ff395e",
      displayName: "LRO Test Search",
      createdAt: "2020-10-02T15:37:05.8863424+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["phone-plan-id-1"],
      areaCode: "555",
      quantity: 1,
      locationOptions: [],
      status: "Reserved",
      phoneNumbers: ["+15550000003"],
      reservationExpiryDate: "2020-10-02T15:53:10.1237516+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "empmPwmsyEmMZefV5vJ6+w.0",
      "X-Processing-Time",
      "810ms",
      "X-Azure-Ref",
      "0KEl3XwAAAAAw+Tcb6GaYSIiKBeKcMI1GWVZSMzBFREdFMDMxMQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=",
      "Date",
      "Fri, 02 Oct 2020 15:37:12 GMT"
    ]
  );
