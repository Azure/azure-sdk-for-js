let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534402485207604"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534402485207604')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:47 GMT',
  'ETag',
  '"0x8D777A0C4B949AE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '223eb593-801e-0015-1189-a98707000000',
  'x-ms-client-request-id',
  '483d4767-71fb-4c43-88ce-1ccff3e5124c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:47 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534402485207604', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>6D97528B-8412-48AE-9DB1-6BF69C9F83A6</Id><AccessPolicy><Start/><Expiry/><Permission>rwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:47 GMT',
  'ETag',
  '"0x8D777A0C4E7491F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '223eb680-801e-0015-6f89-a98707000000',
  'x-ms-client-request-id',
  '16cb1f77-f93d-4b58-b047-dd01bcb02342',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:47 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534402485207604')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><SignedIdentifiers><SignedIdentifier><Id>6D97528B-8412-48AE-9DB1-6BF69C9F83A6</Id><AccessPolicy><Permission>rwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:47 GMT',
  'ETag',
  '"0x8D777A0C4E7491F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '223eb770-801e-0015-5789-a98707000000',
  'x-ms-client-request-id',
  'b0b4523e-072f-4233-b8c9-37811ba5129c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-blob-public-access',
  'blob',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-blob-public-access,Last-Modified,ETag,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:27:47 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534402485207604')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '223eb86f-801e-0015-4a89-a98707000000',
  'x-ms-client-request-id',
  '8c8b3b2f-cd23-4a3d-a359-96552d32612b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:48 GMT' ]);
