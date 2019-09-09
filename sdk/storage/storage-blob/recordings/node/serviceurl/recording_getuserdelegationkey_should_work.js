let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-06T09:27:50.932Z","tmr":"2019-09-06T09:27:50.933Z"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2019-09-06T10:27:50Z</Start><Expiry>2019-09-07T09:27:50Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>a923f8d0-d4ce-4280-9135-5ea685c38026</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2019-09-06T10:27:50Z</SignedStart><SignedExpiry>2019-09-07T09:27:50Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2019-02-02</SignedVersion><Value>5TCdb6hL0RmFC7TeEW+0qKl+8sWdJPJiHO7v0t8B3bo=</Value></UserDelegationKey>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f28b9ca-d01e-00cd-7e95-64c769000000',
  'x-ms-client-request-id',
  'ef35806d-1b84-419f-a201-91211969b0fd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:27:50 GMT',
  'Connection',
  'close' ]);

