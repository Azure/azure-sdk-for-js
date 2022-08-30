let nock = require('nock');

module.exports.hash = "487138c790def7a7223102bff8fadc91";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165994305196001061","filesystem165994305196001061":"filesystem165994305196001061165994305263103622"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165994305196001061')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 08 Aug 2022 07:17:32 GMT',
  'ETag',
  '"0x8DA790E0FD0387E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9e642a8c-f01e-0054-1ff6-aab656000000',
  'x-ms-client-request-id',
  'a722b703-c243-4767-9ba3-840669e359a0',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Mon, 08 Aug 2022 07:17:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165994305196001061165994305263103622')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 08 Aug 2022 07:17:32 GMT',
  'ETag',
  '"0x8DA790E0FE54406"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9e642a97-f01e-0054-27f6-aab656000000',
  'x-ms-client-request-id',
  'd955c1fd-3608-46da-ad2b-a5bb6d377910',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Mon, 08 Aug 2022 07:17:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem165994305196001061165994305263103622')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 08 Aug 2022 07:17:32 GMT',
  'ETag',
  '"0x8DA790E0FE54406"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9e642aaa-f01e-0054-34f6-aab656000000',
  'x-ms-client-request-id',
  '550090d3-0322-40a4-8ea7-64ae47a6f71f',
  'x-ms-version',
  '2021-08-06',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-immutable-storage-with-versioning-enabled',
  'false',
  'x-ms-default-encryption-scope',
  'test1',
  'x-ms-deny-encryption-scope-override',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-immutable-storage-with-versioning-enabled,x-ms-default-encryption-scope,x-ms-deny-encryption-scope-override,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 08 Aug 2022 07:17:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165994305196001061165994305263103622')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9e642abe-f01e-0054-48f6-aab656000000',
  'x-ms-client-request-id',
  '91eccd5f-a0e3-4401-b4c3-a2cd9fb5db03',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Mon, 08 Aug 2022 07:17:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165994305196001061')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9e642aca-f01e-0054-53f6-aab656000000',
  'x-ms-client-request-id',
  '10eef7b8-415e-4906-bbaf-2deee0f4baf1',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Mon, 08 Aug 2022 07:17:33 GMT'
]);
