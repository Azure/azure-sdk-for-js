let nock = require('nock');

module.exports.testInfo = {"container":"container156231870419907331"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231870419907331')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:45 GMT',
  'ETag',
  '"0x8D7012A32ECEF14"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d5cf4d9-c01e-013e-5f13-33cee2000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231870419907331', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy><Start>2017-12-31T11:22:33.4560000Z</Start><Expiry>2018-12-31T11:22:33.4560000Z</Expiry><Permission>rwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:45 GMT',
  'ETag',
  '"0x8D7012A3317C748"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '02670392-c01e-0090-7e13-33abda000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231870419907331')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy><Start>2017-12-31T11:22:33.4560000Z</Start><Expiry>2018-12-31T11:22:33.4560000Z</Expiry><Permission>rwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:45 GMT',
  'ETag',
  '"0x8D7012A3317C748"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8b46358-001e-00c2-1c13-33b628000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-blob-public-access',
  'blob',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-blob-public-access,Last-Modified,ETag,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:21:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231870419907331')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8b85aa82-801e-0097-1513-335d5f000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:45 GMT',
  'Connection',
  'close' ]);

