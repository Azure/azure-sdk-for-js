let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157559166575904042","blob":"blob157559166614405209"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157559166575904042')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Dec 2019 00:21:06 GMT',
  'ETag',
  '"0x8D779E22F58AB0A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9da89664-201e-0008-2fcb-ab2b05000000',
  'x-ms-client-request-id',
  '54f77c9d-b7e9-4d03-b321-9176762b26a7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Dec 2019 00:21:05 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157559166575904042/blob157559166614405209')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Dec 2019 00:21:06 GMT',
  'ETag',
  '"0x8D779E22F7EDCD2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '734e91cf-101e-0066-25cb-ab822c000000',
  'x-ms-client-request-id',
  'c4a59061-88af-4e08-9499-73f7205d2407',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Dec 2019 00:21:06 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157559166575904042/blob157559166614405209', "Hello World!")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Dec 2019 00:21:06 GMT',
  'ETag',
  '"0x8D779E22F859537"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '734e91fd-101e-0066-4ecb-ab822c000000',
  'x-ms-client-request-id',
  '60987ce2-9662-43f9-84e7-9a4afe4db06d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-blob-append-offset',
  '0',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Dec 2019 00:21:06 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157559166575904042/blob157559166614405209')
  .reply(200, "Hello World!", [ 'Content-Length',
  '12',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 06 Dec 2019 00:21:06 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D779E22F859537"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '734e9209-101e-0066-59cb-ab822c000000',
  'x-ms-client-request-id',
  '7998fc41-7250-435f-936c-fd9ca59c0cb6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Fri, 06 Dec 2019 00:21:06 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Dec 2019 00:21:06 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157559166575904042')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9da897c0-201e-0008-61cb-ab2b05000000',
  'x-ms-client-request-id',
  'f429d092-063d-4120-88fc-e4b4dab0687f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Dec 2019 00:21:05 GMT' ]);
