let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534402687107053"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534402687107053')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:49 GMT',
  'ETag',
  '"0x8D777A0C5EB71B3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9fb7a81f-d01e-008e-1b89-a90a3f000000',
  'x-ms-client-request-id',
  'e7e30f1f-68c6-4bc4-a485-7e2394fbd0ac',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:48 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534402687107053')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:49 GMT',
  'ETag',
  '"0x8D777A0C5EB71B3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0faa101d-e01e-0086-7789-a9114c000000',
  'x-ms-client-request-id',
  'd106ba51-ec64-46c2-a5ea-f0acff74f8d8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-default-encryption-scope',
  '$account-encryption-key',
  'x-ms-deny-encryption-scope-override',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-default-encryption-scope,x-ms-deny-encryption-scope-override,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:27:49 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534402687107053')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9fb7aa57-d01e-008e-1289-a90a3f000000',
  'x-ms-client-request-id',
  '4741bfd5-8294-4fc8-80c0-37d3c01fd168',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:50 GMT' ]);
