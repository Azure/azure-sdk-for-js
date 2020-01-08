let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534362232505547"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534362232505547')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:21:04 GMT',
  'ETag',
  '"0x8D7779FD4CA8D97"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f677cd7-d01e-006b-3d88-a918c8000000',
  'x-ms-client-request-id',
  'de7b752a-b861-42ab-8f43-c6e5c236f97d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:04 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534362232505547')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:21:05 GMT',
  'ETag',
  '"0x8D7779FD508169D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f677da3-d01e-006b-7688-a918c8000000',
  'x-ms-client-request-id',
  '33e9b05e-b11b-478f-a1e2-de79794e5c98',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:05 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534362232505547')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f677e7d-d01e-006b-3f88-a918c8000000',
  'x-ms-client-request-id',
  '1b9928ea-b8be-46fd-8ee6-b0a49518088c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:05 GMT' ]);
