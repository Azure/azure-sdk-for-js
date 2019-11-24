let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-11T02:22:17.874Z","share":"share156816853787402086"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816853787402086')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:18 GMT',
  'ETag',
  '"0x8D7365EDE655DC2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3115b98f-501a-0065-1a47-68d7a1000000',
  'x-ms-client-request-id',
  '5b06bed6-2376-4aa9-ab57-5d41d015816b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:17 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816853787402086/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156816853787402086\" DirectoryPath=\"\"><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b66587a-c01a-000d-3247-6889f0000000',
  'x-ms-client-request-id',
  '2a165cc7-b5be-4890-a1c4-e360f8570ce5',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:22:18 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816853787402086')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a01b4220-901a-0051-2847-687809000000',
  'x-ms-client-request-id',
  'cde23f48-1ec7-4346-9f69-370596101e99',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:18 GMT' ]);

