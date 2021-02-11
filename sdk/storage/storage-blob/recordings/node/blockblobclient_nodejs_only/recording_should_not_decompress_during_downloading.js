let nock = require('nock');

module.exports.hash = "7340ea41fe9f44e79cf3b53f20578eab";

module.exports.testInfo = {"uniqueName":{"container":"container158508695592200020","blob":"blob158508695710201278"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158508695592200020')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Mar 2020 21:55:56 GMT',
  'ETag',
  '"0x8D7D03E21B6DEB7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a39b5f39-d01e-0042-5026-02588f000000',
  'x-ms-client-request-id',
  '057f1ef1-50bb-437c-87dc-5bf496cbb96b',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Tue, 24 Mar 2020 21:55:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158508695592200020/blob158508695710201278', "789ccb48cdc9c95728cf2fca495148ca4fa954282e29cacc4b57040072de0903")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'BYN1kjvCGsjiR9sU4v87xg==',
  'Last-Modified',
  'Tue, 24 Mar 2020 21:55:56 GMT',
  'ETag',
  '"0x8D7D03E21C8F09C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a39b5f7d-d01e-0042-0e26-02588f000000',
  'x-ms-client-request-id',
  '13e53506-6afd-4098-a3e9-c3db6882cdd0',
  'x-ms-version',
  '2019-07-07',
  'x-ms-content-crc64',
  'KLRKd44qFFQ=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 24 Mar 2020 21:55:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158508695592200020/blob158508695710201278')
  .reply(200, [], [
  'Content-Length',
  '32',
  'Content-Type',
  'text/plain',
  'Content-Encoding',
  'deflate',
  'Content-MD5',
  'BYN1kjvCGsjiR9sU4v87xg==',
  'Last-Modified',
  'Tue, 24 Mar 2020 21:55:56 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7D03E21C8F09C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a39b60b5-d01e-0042-1f26-02588f000000',
  'x-ms-client-request-id',
  'f76e6006-e87a-4c36-8bc6-a5f357b06e06',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Tue, 24 Mar 2020 21:55:56 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Encoding,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 24 Mar 2020 21:55:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158508695592200020/blob158508695710201278')
  .reply(206, ["789ccb48cdc9c95728cf2fca495148ca4fa954282e29cacc4b57040072de0903"], [
  'Content-Length',
  '32',
  'Content-Type',
  'text/plain',
  'Content-Encoding',
  'deflate',
  'Content-Range',
  'bytes 0-31/32',
  'Last-Modified',
  'Tue, 24 Mar 2020 21:55:56 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7D03E21C8F09C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a39b6179-d01e-0042-5226-02588f000000',
  'x-ms-client-request-id',
  '765ac405-9ded-4a15-b2f6-c0588b1ddbf2',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Tue, 24 Mar 2020 21:55:56 GMT',
  'x-ms-blob-content-md5',
  'BYN1kjvCGsjiR9sU4v87xg==',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Encoding,Last-Modified,ETag,x-ms-creation-time,x-ms-blob-content-md5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 24 Mar 2020 21:55:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158508695592200020')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a39b61b3-d01e-0042-0526-02588f000000',
  'x-ms-client-request-id',
  'ded5ad3c-34e1-4bfb-8b5f-d4b119677a61',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Tue, 24 Mar 2020 21:55:57 GMT'
]);
