let nock = require('nock');

module.exports.hash = "d17ef686b7778a578070d5d6b3d1ded1";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864665188207158","file":"file164864665215309295","dir":"dir164864665215403237"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665188207158')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:12 GMT',
  'ETag',
  '"0x8DA12509463BB99"',
  'x-ms-request-id',
  '601eaf03-e01e-0001-4739-441b65000000',
  'x-ms-client-request-id',
  'a1fe9c43-79e0-427b-83f4-cb3081bee4fc',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:12 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665188207158/file164864665215309295')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:12 GMT',
  'ETag',
  '"0x8DA125094938FA4"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4c9-a01f-0003-4639-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '9039687f-859e-466c-a362-fa6eb2d19bcf',
  'Date',
  'Wed, 30 Mar 2022 13:24:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164864665188207158/file164864665215309295', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4ca-a01f-0003-4739-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'f211a3b4-3e7d-47cf-8ae6-183b6aa11b40',
  'Date',
  'Wed, 30 Mar 2022 13:24:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164864665188207158/file164864665215309295')
  .query(true)
  .reply(409, {"error":{"code":"BlobUsesCustomerSpecifiedEncryption","message":"The blob is encrypted with customer specified encryption, but it was not provided in the request.\nRequestId:2f12e4cb-a01f-0003-4839-441608000000\nTime:2022-03-30T13:24:13.0766167Z"}}, [
  'Content-Length',
  '249',
  'Content-Type',
  'application/json;charset=utf-8',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'x-ms-request-id',
  '2f12e4cb-a01f-0003-4839-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'd749e609-ae66-493b-8bc7-7d67fd8279af',
  'Date',
  'Wed, 30 Mar 2022 13:24:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864665188207158')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf05-e01e-0001-4839-441b65000000',
  'x-ms-client-request-id',
  'cb4ed207-0a71-4441-9d7a-fb5ef19ebd8c',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:13 GMT'
]);
