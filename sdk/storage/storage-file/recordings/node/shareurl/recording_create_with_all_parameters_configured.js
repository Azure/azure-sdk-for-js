let nock = require('nock');

module.exports.testInfo = {"share":"share156758482989301874","share156758482989301874":"share156758482989301874156758483032809470"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758482989301874')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:50 GMT',
  'ETag',
  '"0x8D7310FD146372B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c4aa6edc-001a-0048-12f8-62eab4000000',
  'x-ms-client-request-id',
  '17542a0c-775a-4489-b8b2-a1b3b3620b62',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758482989301874156758483032809470')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:50 GMT',
  'ETag',
  '"0x8D7310FD1844B17"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c6198a9-d01a-0006-36f8-62c43c000000',
  'x-ms-client-request-id',
  'e87fc1d2-2d8a-43dc-8875-11dc1ff34d65',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156758482989301874156758483032809470')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:50 GMT',
  'ETag',
  '"0x8D7310FD1844B17"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b1196921-801a-00a2-48f8-62cd9a000000',
  'x-ms-client-request-id',
  '1ca121a6-f47d-47ad-832e-73a46d22c418',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-key',
  'value',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-key,Last-Modified,ETag,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:13:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758482989301874')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b9c4a551-e01a-0050-28f8-6235d3000000',
  'x-ms-client-request-id',
  'cff42c9e-82d8-43c2-a7fe-57bbcfa72de6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:51 GMT',
  'Connection',
  'close' ]);

