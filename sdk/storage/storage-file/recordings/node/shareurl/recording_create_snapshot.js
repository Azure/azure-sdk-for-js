let nock = require('nock');

module.exports.testInfo = {"share":"share155873390454202345"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873390454202345')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:38:24 GMT',
  'ETag',
  '"0x8D6E090268425E6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6123f24a-801a-0024-7879-120416000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:38:24 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873390454202345')
  .query({"restype":"share","comp":"snapshot"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:38:25 GMT',
  'ETag',
  '"0x8D6E09026C71E80"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '20d8c229-101a-004c-4f79-125a47000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-snapshot',
  '2019-05-24T21:38:25.0000000Z',
  'Date',
  'Fri, 24 May 2019 21:38:24 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155873390454202345')
  .query({"sharesnapshot":"2019-05-24T21%3A38%3A25.0000000Z","restype":"share"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:38:25 GMT',
  'ETag',
  '"0x8D6E09026C71E80"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c261a588-901a-0074-3679-121b1e000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-meta-key1',
  'value1',
  'x-ms-meta-key2',
  'value2',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-meta-key1,x-ms-meta-key2,Last-Modified,ETag,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:38:25 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155873390454202345')
  .query({"restype":"share"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:38:24 GMT',
  'ETag',
  '"0x8D6E090268425E6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'da49f2bd-201a-0088-6679-122581000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:38:25 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873390454202345')
  .query({"sharesnapshot":"2019-05-24T21%3A38%3A25.0000000Z","restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ba4fb75f-401a-005f-7079-126fa6000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:38:26 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873390454202345')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51e8c4db-c01a-0023-0679-12f293000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:38:26 GMT',
  'Connection',
  'close' ]);

