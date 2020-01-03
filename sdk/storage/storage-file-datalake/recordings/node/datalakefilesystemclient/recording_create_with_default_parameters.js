let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534362607301613"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534362607301613')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:21:08 GMT',
  'ETag',
  '"0x8D7779FD7065F10"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17d3ea9e-101e-005f-0d88-a9b760000000',
  'x-ms-client-request-id',
  'dc11245d-65b0-4dc3-841f-ce70791745c3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:08 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534362607301613')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17d3eb0d-101e-005f-6d88-a9b760000000',
  'x-ms-client-request-id',
  '6c3460a9-c95e-4cf2-8f0f-6368279c2ac2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:08 GMT' ]);
