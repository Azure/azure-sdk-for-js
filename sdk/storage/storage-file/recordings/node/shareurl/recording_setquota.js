let nock = require('nock');

module.exports.testInfo = {"share":"share156775326552601707"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775326552601707')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:01:05 GMT',
  'ETag',
  '"0x8D73297FCBDCE4F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aa4e4ba0-501a-007a-6c80-64eac3000000',
  'x-ms-client-request-id',
  'd65beb0f-df47-4623-a0ee-dbd6600a8e5a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:01:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775326552601707')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:01:06 GMT',
  'ETag',
  '"0x8D73297FCFF9E02"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7e9e7f4c-b01a-004d-4980-64386f000000',
  'x-ms-client-request-id',
  '4584a35a-8c77-4204-b949-e95b0e73d6f4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:01:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775326552601707')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:01:06 GMT',
  'ETag',
  '"0x8D73297FCFF9E02"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '698d8a54-601a-0013-5680-64d38f000000',
  'x-ms-client-request-id',
  '15ad4009-3d45-41ec-8f87-90bafc18b27a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '20',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 07:01:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775326552601707')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '323c534a-401a-0014-2380-64bfec000000',
  'x-ms-client-request-id',
  '63a45237-b6d4-4d01-be0b-009c9c1e1cbc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:01:06 GMT',
  'Connection',
  'close' ]);

