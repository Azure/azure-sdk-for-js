let nock = require('nock');

module.exports.hash = "835d31cda6bfe41de09ef1049424b6d4";

module.exports.testInfo = {"uniqueName":{"container":"container159210827468503310","blob":"blob159210827470105842","blobCPK":"blobCPK159210827471709619"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827468503310')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E949407F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309217-201e-003e-2802-42dadf000000',
  'x-ms-client-request-id',
  '5c20b3a2-b483-407d-8df8-d1bb5955bf35',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827468503310/blob159210827470105842', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E94BCEC3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130921f-201e-003e-2f02-42dadf000000',
  'x-ms-client-request-id',
  '03357150-c3f5-4b1d-b685-460db07269f0',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:54.7211459Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827468503310/blobCPK159210827471709619', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E94E191D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309226-201e-003e-3602-42dadf000000',
  'x-ms-client-request-id',
  '2baaf38b-a972-44df-8873-9cb724754d14',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-version-id',
  '2020-06-14T04:17:54.7361565Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827468503310/blobCPK159210827471709619')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E9506377"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130922c-201e-003e-3c02-42dadf000000',
  'x-ms-client-request-id',
  '4c8d8ae3-51eb-43a0-bc5e-d29aa9b2bec3',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:54.7521671Z',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827468503310/blobCPK159210827471709619')
  .reply(409, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309232-201e-003e-4202-42dadf000000',
  'x-ms-client-request-id',
  'f47476cb-2a13-421c-a666-4730439e68e1',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827468503310')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309236-201e-003e-4602-42dadf000000',
  'x-ms-client-request-id',
  '455f9bb1-9866-406d-a54e-b2f8d56cc27a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);
