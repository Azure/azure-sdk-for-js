let nock = require("nock");

module.exports.hash = "e8bd7a3cf9ff48ffe9aebfdc8afeb9f3";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/administration/phonenumbers/searches", {
    displayName: "LRO Test Search",
    description: "Test search for JS phone number admin SDK.",
    phonePlanIds: ["sanitized", "sanitized"],
    areaCode: "205",
    quantity: 1
  })
  .query(true)
  .reply(201, { searchId: "sanitized" }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "m0kdCToRjUqoOcdHOwc/pw.0",
    "X-Processing-Time",
    "853ms",
    "X-Azure-Ref",
    "0uIy4XwAAAAD7VPfbKAxeSLtJq8nsyorgWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Sat, 21 Nov 2020 03:42:48 GMT"
  ]);

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
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
      "jbLb08LGGUaZs7j5FmrOnw.0",
      "X-Processing-Time",
      "298ms",
      "X-Azure-Ref",
      "0uYy4XwAAAACXYKEAKP1yQ5RQP1dSy2H6WVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:42:49 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
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
      "sZzehjIFv0yal2tQwxFkyQ.0",
      "X-Processing-Time",
      "267ms",
      "X-Azure-Ref",
      "0uYy4XwAAAACm51LZIR4dQaW94u0IcQ3OWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:42:49 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
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
      "VZE5hk7mq0+q7VPsXoapMg.0",
      "X-Processing-Time",
      "262ms",
      "X-Azure-Ref",
      "0u4y4XwAAAAA7j8/7FoU1R7/aNQWz6moEWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:42:51 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Reserved",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-11-21T03:58:53.7454446+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "M4Ae8fDW+kCiSsjh0fLNoA.0",
      "X-Processing-Time",
      "270ms",
      "X-Azure-Ref",
      "0voy4XwAAAACAZTu2ZtZQSIyGfkcIIMnTWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:42:54 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .post("/administration/phonenumbers/searches/sanitized/purchase")
  .query(true)
  .reply(202, "", [
    "MS-CV",
    "93q1nb6fAESkFcWTjz7IHA.0",
    "X-Processing-Time",
    "622ms",
    "X-Azure-Ref",
    "0voy4XwAAAAD2EG2ojVLjTYmGBH36RGLOWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Sat, 21 Nov 2020 03:42:54 GMT",
    "Content-Length",
    "0"
  ]);

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-11-21T03:58:53.7454446+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "5es3hChIaUeVTawGeefUag.0",
      "X-Processing-Time",
      "265ms",
      "X-Azure-Ref",
      "0v4y4XwAAAADrwO5W4Rv8SrzwXRhISdV8WVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:42:55 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-11-21T03:58:53.7454446+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "p8YjTXgTf0G8AwmfCmNjcA.0",
      "X-Processing-Time",
      "280ms",
      "X-Azure-Ref",
      "0v4y4XwAAAADNMMe6O4sSQqCp1iBoZop9WVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:42:55 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-11-21T03:58:53.7454446+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "f1fFQKFdJUKZSlhMe+k+ew.0",
      "X-Processing-Time",
      "610ms",
      "X-Azure-Ref",
      "0wYy4XwAAAAAj1VTq20W/TKFnzCutdgvjWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:42:57 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-11-21T03:58:53.7454446+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "VZb7P4KEQUqxkhHxvEzgEg.0",
      "X-Processing-Time",
      "657ms",
      "X-Azure-Ref",
      "0xIy4XwAAAACBuBXBeXhMSa+vcZZ5TtUXWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:00 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "PurchasePending",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-11-21T03:58:53.7454446+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "iTJzlJWVaEyC/r2H/SkZWA.0",
      "X-Processing-Time",
      "272ms",
      "X-Azure-Ref",
      "0x4y4XwAAAAAG7TAx7kTlSqa+0A9uL3cRWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:03 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "PurchasePending",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-11-21T03:58:53.7454446+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "17T68kn2lUSFSZX4uN4C4A.0",
      "X-Processing-Time",
      "284ms",
      "X-Azure-Ref",
      "0yoy4XwAAAAAgTKQsFIbZRq6Ct0G4Eiv4WVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:05 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "PurchasePending",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-11-21T03:58:53.7454446+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "4971ik3Pq0WVrs64KO450g.0",
      "X-Processing-Time",
      "382ms",
      "X-Azure-Ref",
      "0zIy4XwAAAABn+omvgJ6wQIzGf4/QL7nSWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:07 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "PurchasePending",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-11-21T03:58:53.7454446+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "3JgsnYmxIk2IoPIIbYSggA.0",
      "X-Processing-Time",
      "412ms",
      "X-Azure-Ref",
      "0zoy4XwAAAADoTx4Ibu02T4UKfFlgraw0WVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:11 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "PurchasePending",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-11-21T03:58:53.7454446+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "ye15MMLM9EaKu3DLjg9a6w.0",
      "X-Processing-Time",
      "324ms",
      "X-Azure-Ref",
      "00Yy4XwAAAABM5T2ByvKlRK8jGgfDjf7FWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:13 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "PurchasePending",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-11-21T03:58:53.7454446+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "0zp2P+bE6k+u6WOo4D+fVA.0",
      "X-Processing-Time",
      "1175ms",
      "X-Azure-Ref",
      "004y4XwAAAABgZXLJC+TcS7zM8/ual2p1WVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:16 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "PurchasePending",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-11-21T03:58:53.7454446+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "ARNYhZnFC0ejq+r+aj0v0g.0",
      "X-Processing-Time",
      "327ms",
      "X-Azure-Ref",
      "01oy4XwAAAACopVa4cdIGS7VzX7NplZmqWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:19 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "PurchasePending",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-11-21T03:58:53.7454446+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "9HFp+iPg3Ue3UMriT+8ZZQ.0",
      "X-Processing-Time",
      "270ms",
      "X-Azure-Ref",
      "02Yy4XwAAAACqXvv6V9jKSJxwG6AdVsFkWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:21 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T03:42:48.6019273+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Success",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-11-21T03:58:53.7454446+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "quJNmAeq/UuBOgN9QKs70g.0",
      "X-Processing-Time",
      "654ms",
      "X-Azure-Ref",
      "024y4XwAAAACC7GQ6Gl3wSJbYmoK50+tjWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:24 GMT"
    ]
  );
