let nock = require('nock');

module.exports.hash = "128a0f34216bc1695e4148a97c2d5673";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864665052600671","file":"file164864665080006950","dir":"dir164864665080101654"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665052600671')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:10 GMT',
  'ETag',
  '"0x8DA12509394CF81"',
  'x-ms-request-id',
  '601eaf00-e01e-0001-4539-441b65000000',
  'x-ms-client-request-id',
  '8183cebc-b0db-4aa4-9aee-42a4b3048a89',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:10 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665052600671/file164864665080006950')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:11 GMT',
  'ETag',
  '"0x8DA125093C25977"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2f12e4c6-a01f-0003-4339-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'f224cb95-7d0b-4b05-b99c-373311ed5b34',
  'Date',
  'Wed, 30 Mar 2022 13:24:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164864665052600671/file164864665080006950', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2f12e4c7-a01f-0003-4439-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '5f6baf66-6ebd-4e32-bcda-c4d46efecdec',
  'Date',
  'Wed, 30 Mar 2022 13:24:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164864665052600671/file164864665080006950')
  .query(true)
  .reply(409, {"error":{"code":"BlobDoesNotUseCustomerSpecifiedEncryption","message":"The blob is not encrypted with customer specified encryption, but one was provided in the request.\nRequestId:2f12e4c8-a01f-0003-4539-441608000000\nTime:2022-03-30T13:24:11.7025453Z"}}, [
  'Content-Length',
  '256',
  'Content-Type',
  'application/json;charset=utf-8',
  'x-ms-error-code',
  'BlobDoesNotUseCustomerSpecifiedEncryption',
  'x-ms-request-id',
  '2f12e4c8-a01f-0003-4539-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '86008d04-7f2d-4375-b4ca-8d3f33cf2a14',
  'Date',
  'Wed, 30 Mar 2022 13:24:11 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864665052600671')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf02-e01e-0001-4639-441b65000000',
  'x-ms-client-request-id',
  '9a5d682e-8d5a-4313-9306-885d40c274bf',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:12 GMT'
]);
