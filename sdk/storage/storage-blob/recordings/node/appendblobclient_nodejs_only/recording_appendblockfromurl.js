let nock = require('nock');

module.exports.hash = "d98742e5cfe1ab825887e168b956f726";

module.exports.testInfo = {"uniqueName":{"container":"container160507563611905484","blob":"blob160507563754401402","blockblob":"blockblob160507563783505877"},"newDate":{"expiry":"2020-11-11T06:20:38.126Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507563611905484')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:37 GMT',
  'ETag',
  '"0x8D88609E7C1E62A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b56954-b01e-006b-2ef2-b7d209000000',
  'x-ms-client-request-id',
  'e9c99ce6-7040-4bb0-82b7-6692e80d9d59',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 11 Nov 2020 06:20:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507563611905484/blob160507563754401402')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:37 GMT',
  'ETag',
  '"0x8D88609E7EF9ED3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b569a3-b01e-006b-76f2-b7d209000000',
  'x-ms-client-request-id',
  '427dec63-cd6f-4593-a41a-6926fa95c892',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-11T06:20:37.7003482Z',
  'Date',
  'Wed, 11 Nov 2020 06:20:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507563611905484/blockblob160507563783505877', "Hello World!")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:37 GMT',
  'ETag',
  '"0x8D88609E81BE6B1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b569eb-b01e-006b-38f2-b7d209000000',
  'x-ms-client-request-id',
  '7f16e65b-cb82-4b97-b998-d6589f70d347',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-11T06:20:37.9895473Z',
  'Date',
  'Wed, 11 Nov 2020 06:20:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507563611905484/blob160507563754401402', "Hello World!")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:38 GMT',
  'ETag',
  '"0x8D88609E848CAF1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b56a12-b01e-006b-55f2-b7d209000000',
  'x-ms-client-request-id',
  '6f3eeb51-923f-479f-bc0e-7c39fbf14bf6',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-blob-append-offset',
  '0',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Nov 2020 06:20:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507563611905484/blob160507563754401402')
  .query(true)
  .reply(201, "", [
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:38 GMT',
  'ETag',
  '"0x8D88609E878E416"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-committed-block-count',
  '2',
  'x-ms-blob-append-offset',
  '12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '22b56a65-b01e-006b-21f2-b7d209000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'ca437eef-e569-4830-8dd7-a6e07ba173e2',
  'Date',
  'Wed, 11 Nov 2020 06:20:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160507563611905484/blob160507563754401402')
  .reply(200, "Hello World!Hello World!", [
  'Content-Length',
  '24',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:38 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D88609E878E416"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b56ae2-b01e-006b-13f2-b7d209000000',
  'x-ms-client-request-id',
  '922b67f1-b4a7-4563-8e31-c39132313221',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-11-11T06:20:37.7003482Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Wed, 11 Nov 2020 06:20:37 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '2',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Nov 2020 06:20:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160507563611905484')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b56b4a-b01e-006b-73f2-b7d209000000',
  'x-ms-client-request-id',
  'cd65cf15-071b-4839-9936-f4012886ec73',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 11 Nov 2020 06:20:38 GMT'
]);
