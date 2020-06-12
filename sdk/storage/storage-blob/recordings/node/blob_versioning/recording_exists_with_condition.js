let nock = require('nock');

module.exports.hash = "d5502ae98d701eb6230929f447f1bdc5";

module.exports.testInfo = {"uniqueName":{"container":"container158512295881100501","blob":"blob158512296170809417"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158512295881100501')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 25 Mar 2020 07:56:02 GMT',
  'ETag',
  '"0x8D7D091F6DA00D7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '330ba4a0-201e-0013-5c7a-02a132000000',
  'x-ms-client-request-id',
  '6f233a93-fa4e-4999-8bdd-db6405c8998c',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 25 Mar 2020 07:56:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158512295881100501/blob158512296170809417', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 25 Mar 2020 07:56:02 GMT',
  'ETag',
  '"0x8D7D091F70D2060"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '330ba4b5-201e-0013-6c7a-02a132000000',
  'x-ms-client-request-id',
  '3680d8e6-2f9e-4276-849c-5dc418ea6fc2',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-25T07:56:02.9882464Z',
  'Date',
  'Wed, 25 Mar 2020 07:56:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158512295881100501/blob158512296170809417')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 25 Mar 2020 07:56:03 GMT',
  'ETag',
  '"0x8D7D091F7915CF4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '330ba4dd-201e-0013-057a-02a132000000',
  'x-ms-client-request-id',
  'e6f5aafe-db1c-4404-9a21-d804da614024',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-25T07:56:03.8558724Z',
  'Date',
  'Wed, 25 Mar 2020 07:56:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158512295881100501/blob158512296170809417')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 25 Mar 2020 07:56:03 GMT',
  'ETag',
  '"0x8D7D091F7915CF4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '330ba4f2-201e-0013-167a-02a132000000',
  'x-ms-client-request-id',
  '8e835a85-93b9-4d53-aa8d-660407e9dedc',
  'x-ms-version',
  '2019-12-12',
  'x-ms-lease-id',
  '1443bc5a-2884-4b3a-be7f-755f1f124cd8',
  'Date',
  'Wed, 25 Mar 2020 07:56:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158512295881100501/blob158512296170809417')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 25 Mar 2020 07:56:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7D091F7915CF4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '330ba52d-201e-0013-3e7a-02a132000000',
  'x-ms-client-request-id',
  '95a75445-7a98-4e0d-86ba-f9989febb0b5',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-25T07:56:03.8558724Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Wed, 25 Mar 2020 07:56:03 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 25 Mar 2020 07:56:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158512295881100501/blob158512296170809417')
  .reply(412, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '330ba544-201e-0013-537a-02a132000000',
  'x-ms-client-request-id',
  'a3073ea9-526d-4f53-bc2c-4128920e2a9d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'LeaseIdMismatchWithBlobOperation',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 25 Mar 2020 07:56:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158512295881100501')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '330ba54d-201e-0013-5a7a-02a132000000',
  'x-ms-client-request-id',
  '351a13e6-49fd-4b6e-82e1-36788bea9181',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 25 Mar 2020 07:56:05 GMT'
]);
