let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-11T02:19:29.842Z","tmr":"2019-09-11T02:19:29.843Z"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2019-09-11T03:19:29Z</Start><Expiry>2019-09-12T02:19:29Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>f27c2809-dfd7-4dbc-b5ed-b8b3b9341335</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2019-09-11T03:19:29Z</SignedStart><SignedExpiry>2019-09-12T02:19:29Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2019-02-02</SignedVersion><Value>+gaMhLXnqCy3zmL7z36ug9C0v8zrIYeTBNJ/31PMyKo=</Value></UserDelegationKey>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd0596e6a-801e-004e-7d47-68a319000000',
  'x-ms-client-request-id',
  'c471fbe0-03e8-4ee3-92cb-fd6f3e25ca7c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:30 GMT' ]);

