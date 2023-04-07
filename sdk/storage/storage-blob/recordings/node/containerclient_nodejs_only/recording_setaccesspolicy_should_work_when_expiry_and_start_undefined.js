let nock = require('nock');

module.exports.testInfo = {"container":"container156816866609306623"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816866609306623')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:26 GMT',
  'ETag',
  '"0x8D7365F2AD21864"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '25d82158-101e-002d-0848-68e53c000000',
  'x-ms-client-request-id',
  'dd3083aa-f22b-4a3a-9b10-4f5b0000bb15',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:25 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816866609306623', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>6D97528B-8412-48AE-9DB1-6BF69C9F83A6</Id><AccessPolicy><Start/><Expiry/><Permission>rwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:26 GMT',
  'ETag',
  '"0x8D7365F2B1405A3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f9959963-201e-0025-3a48-68fe4f000000',
  'x-ms-client-request-id',
  'a63f785a-61dd-40a7-8618-1ad1a6b49876',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:25 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816866609306623')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><SignedIdentifiers><SignedIdentifier><Id>6D97528B-8412-48AE-9DB1-6BF69C9F83A6</Id><AccessPolicy><Permission>rwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:26 GMT',
  'ETag',
  '"0x8D7365F2B1405A3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '96e4331d-201e-0061-2448-682223000000',
  'x-ms-client-request-id',
  '47f2b21a-dbcd-4f8f-a38f-2a6e92bf7a30',
  'x-ms-version',
  '2019-02-02',
  'x-ms-blob-public-access',
  'blob',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-blob-public-access,Last-Modified,ETag,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:24:26 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816866609306623')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '816f4399-c01e-006b-4248-683baa000000',
  'x-ms-client-request-id',
  '61fee6cf-ebe6-401d-a24a-9928d7a71d44',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:27 GMT' ]);

