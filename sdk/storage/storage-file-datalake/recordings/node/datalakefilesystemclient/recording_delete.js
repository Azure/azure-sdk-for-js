let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534363037904237"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534363037904237')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:21:13 GMT',
  'ETag',
  '"0x8D7779FD99803F7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd5e3152b-101e-001b-3b88-a96b0c000000',
  'x-ms-client-request-id',
  'edfc8b70-c3ba-4eba-a561-cff17963ee8c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:12 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534363037904237')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd5e315f9-101e-001b-7c88-a96b0c000000',
  'x-ms-client-request-id',
  'cf007c8c-a1e5-40e0-ba0a-e0ecffd413c2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:13 GMT' ]);
