let nock = require('nock');

module.exports.hash = "f3b6c1bf83901415711d4f3ae4d7e561";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165528410668505897","filesystem165528410668505897":"filesystem165528410668505897165528410808406777"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165528410668505897')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 15 Jun 2022 09:08:27 GMT',
  'ETag',
  '"0x8DA4EAE9C436A40"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '04fb3880-e01e-00c5-4397-80dcc4000000',
  'x-ms-client-request-id',
  '5652623e-4737-4045-a2e0-7fe7b5f1ee08',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Wed, 15 Jun 2022 09:08:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165528410668505897165528410808406777')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 15 Jun 2022 09:08:28 GMT',
  'ETag',
  '"0x8DA4EAE9C7969DA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '04fb38c1-e01e-00c5-0197-80dcc4000000',
  'x-ms-client-request-id',
  'c7e7ec9f-51aa-4c56-b7c0-37afcbac120d',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Wed, 15 Jun 2022 09:08:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem165528410668505897165528410808406777')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 15 Jun 2022 09:08:28 GMT',
  'ETag',
  '"0x8DA4EAE9C7969DA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '04fb38f3-e01e-00c5-3197-80dcc4000000',
  'x-ms-client-request-id',
  '1909fa13-7c1e-4a63-b96a-a6ecac524af4',
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
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-immutable-storage-with-versioning-enabled,x-ms-default-encryption-scope,x-ms-deny-encryption-scope-override,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 15 Jun 2022 09:08:28 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165528410668505897165528410808406777')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '04fb391f-e01e-00c5-5c97-80dcc4000000',
  'x-ms-client-request-id',
  '29f4a08e-b9e6-41e6-a10d-c7d3b8545d14',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Wed, 15 Jun 2022 09:08:28 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165528410668505897')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '04fb395c-e01e-00c5-1797-80dcc4000000',
  'x-ms-client-request-id',
  '924d0c7d-c632-4e06-873c-a28266d669b7',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Wed, 15 Jun 2022 09:08:28 GMT'
]);
