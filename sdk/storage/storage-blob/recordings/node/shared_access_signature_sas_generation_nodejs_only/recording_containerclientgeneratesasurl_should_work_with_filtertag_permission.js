let nock = require('nock');

module.exports.hash = "c25250712ddd977526f0c7f28a2b1095";

module.exports.testInfo = {"uniqueName":{"container":"container164067926430202305","appendblob":"appendblob164067926456104176"},"newDate":{"tmr":"2021-12-28T08:14:24.300Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164067926430202305')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 28 Dec 2021 08:14:24 GMT',
  'ETag',
  '"0x8D9C9DA0F53F946"',
  'x-ms-request-id',
  '370d8f1e-701e-0008-46c2-fbc247000000',
  'x-ms-client-request-id',
  'c8e42098-62a9-487a-86f0-677632ef1954',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 28 Dec 2021 08:14:24 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164067926430202305/appendblob164067926456104176')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 28 Dec 2021 08:14:24 GMT',
  'ETag',
  '"0x8D9C9DA0F7B794F"',
  'x-ms-request-id',
  '370d8f20-701e-0008-47c2-fbc247000000',
  'x-ms-client-request-id',
  '2930ab41-e6cd-4288-8772-4c9ddecb84e9',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 28 Dec 2021 08:14:24 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164067926430202305')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>tag1=&apos;val1&apos;</Where><Blobs/><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '370d8f21-701e-0008-48c2-fbc247000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  'ba003650-9fc1-47f6-97a1-fd23d8205f2e',
  'Date',
  'Tue, 28 Dec 2021 08:14:24 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164067926430202305')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '370d8f22-701e-0008-49c2-fbc247000000',
  'x-ms-client-request-id',
  '0e732925-938b-461d-8278-6a1465a99cd3',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 28 Dec 2021 08:14:25 GMT'
]);
