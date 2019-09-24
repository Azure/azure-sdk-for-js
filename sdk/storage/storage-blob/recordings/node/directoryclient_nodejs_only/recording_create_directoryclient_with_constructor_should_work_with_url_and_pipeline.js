let nock = require('nock');

module.exports.testInfo = {"container":"container156929859962402342","directory":"directory156929860078208235"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929859962402342')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:12:17 GMT',
  'ETag',
  '"0x8D740A5636E37C8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3e220077-701e-00a1-428e-728b05000000',
  'x-ms-client-request-id',
  '9908c3d4-f5fe-4c4b-a8f9-77a1f28d4354',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:12:17 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929859962402342/directory156929860078208235')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:12:18 GMT',
  'ETag',
  '"0x8D740A5641D87EC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '48fda740-901f-006c-118e-72ee4d000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'aa94afcc-ad33-4845-b0ce-d54dfb4b8c78',
  'Date',
  'Tue, 24 Sep 2019 04:12:18 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929859962402342/directory156929860078208235')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18ab0b71-f01f-007c-318e-72d8ab000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '861e43fa-0caf-46a6-89b1-7717afaa2212',
  'Date',
  'Tue, 24 Sep 2019 04:12:19 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929859962402342')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9654457b-401e-008b-0e8e-72fe40000000',
  'x-ms-client-request-id',
  'ff95c935-28d7-4e02-a0fc-0f9c8056ca9d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:12:20 GMT' ]);
