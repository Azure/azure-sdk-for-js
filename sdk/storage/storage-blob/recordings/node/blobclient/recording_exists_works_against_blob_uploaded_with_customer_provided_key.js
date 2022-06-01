let nock = require('nock');

module.exports.hash = "88bfafcf0e05a231e5131a07c34ce87a";

module.exports.testInfo = {"uniqueName":{"container":"container162157807586803149","blob":"blob162157807640405030","blobCPK":"blobCPK162157807682208407"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162157807586803149')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 21 May 2021 06:21:16 GMT',
  'ETag',
  '"0x8D91C20A3F450D7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5a47a539-201e-003b-1b09-4ecf15000000',
  'x-ms-client-request-id',
  '4c8d622e-eaa6-4ea9-b9c7-f62bf8a65813',
  'x-ms-version',
  '2020-08-04',
  'Date',
  'Fri, 21 May 2021 06:21:15 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162157807586803149/blob162157807640405030', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 21 May 2021 06:21:16 GMT',
  'ETag',
  '"0x8D91C20A4351AB1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14c46381-701e-00ab-7709-4e5a59000000',
  'x-ms-client-request-id',
  'b8053f1b-db3a-4e36-94cc-03f7ea652166',
  'x-ms-version',
  '2020-08-04',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-05-21T06:21:16.9110705Z',
  'Date',
  'Fri, 21 May 2021 06:21:16 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162157807586803149/blobCPK162157807682208407', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 21 May 2021 06:21:17 GMT',
  'ETag',
  '"0x8D91C20A4758ADB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b0e0dd02-401e-0002-1409-4e8fb1000000',
  'x-ms-client-request-id',
  'b2c8eeeb-6580-4603-9c42-8e4375162719',
  'x-ms-version',
  '2020-08-04',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-version-id',
  '2021-05-21T06:21:17.3343735Z',
  'Date',
  'Fri, 21 May 2021 06:21:16 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162157807586803149/blobCPK162157807682208407')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 21 May 2021 06:21:17 GMT',
  'ETag',
  '"0x8D91C20A4B733C7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '55c7dfd8-c01e-00b9-2409-4e6e45000000',
  'x-ms-client-request-id',
  '8ab36f40-5316-48b1-b203-a5519d37b9f6',
  'x-ms-version',
  '2020-08-04',
  'x-ms-version-id',
  '2021-05-21T06:21:17.7656823Z',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Fri, 21 May 2021 06:21:17 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container162157807586803149/blobCPK162157807682208407')
  .reply(409, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1faf615a-501e-001d-4909-4e54a1000000',
  'x-ms-client-request-id',
  '12f6e4c6-b779-40dd-ac2d-eb13634df110',
  'x-ms-version',
  '2020-08-04',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 21 May 2021 06:21:18 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162157807586803149')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81df6807-401e-0009-0c09-4e97c5000000',
  'x-ms-client-request-id',
  '36eb5db0-6aa2-47f1-988e-ccf847ab7359',
  'x-ms-version',
  '2020-08-04',
  'Date',
  'Fri, 21 May 2021 06:21:18 GMT',
  'Connection',
  'close'
]);
