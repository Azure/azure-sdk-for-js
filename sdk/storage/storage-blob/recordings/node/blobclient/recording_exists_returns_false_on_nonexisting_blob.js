let nock = require('nock');

module.exports.hash = "b6ffef6fd36884a673d91d53eb793b98";

module.exports.testInfo = {"uniqueName":{"container":"container159210827452908738","blob":"blob159210827454504483","newblob":"newblob159210827456009618"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827452908738')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E9316E65"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13091b8-201e-003e-4d02-42dadf000000',
  'x-ms-client-request-id',
  'e5b7f512-964b-47ae-b9ac-343aa7ea02d1',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827452908738/blob159210827454504483', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E93423CD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13091c3-201e-003e-5702-42dadf000000',
  'x-ms-client-request-id',
  '9b951d21-64dd-4a77-8971-14ba1f8ac6c1',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:54.5660365Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827452908738/newblob159210827456009618')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13091cf-201e-003e-6302-42dadf000000',
  'x-ms-client-request-id',
  '287d79c3-182d-48fa-a20a-7c1c8a4b205e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827452908738')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13091d5-201e-003e-6902-42dadf000000',
  'x-ms-client-request-id',
  'b65f946c-f9ba-4ba8-a854-be70044ff77f',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);
