let nock = require('nock');

module.exports.hash = "9f07042bf0e380eecf5540a24b407114";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864664823006305","file":"file164864664852809115","dir":"dir164864664852907570"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864664823006305')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:08 GMT',
  'ETag',
  '"0x8DA12509236C084"',
  'x-ms-request-id',
  '601eaefa-e01e-0001-4139-441b65000000',
  'x-ms-client-request-id',
  'aead9caa-3357-41db-8633-75b172a0800b',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:08 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864664823006305/file164864664852809115')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:08 GMT',
  'ETag',
  '"0x8DA125092685A45"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2f12e4c2-a01f-0003-3f39-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '90b996af-811f-4810-b835-92877485bfeb',
  'Date',
  'Wed, 30 Mar 2022 13:24:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164864664823006305/file164864664852809115', "Hello World")
  .query(true)
  .reply(409, {"error":{"code":"BlobDoesNotUseCustomerSpecifiedEncryption","message":"The blob is not encrypted with customer specified encryption, but one was provided in the request.\nRequestId:2f12e4c3-a01f-0003-4039-441608000000\nTime:2022-03-30T13:24:09.1884168Z"}}, [
  'Content-Length',
  '256',
  'Content-Type',
  'application/json;charset=utf-8',
  'x-ms-error-code',
  'BlobDoesNotUseCustomerSpecifiedEncryption',
  'x-ms-request-id',
  '2f12e4c3-a01f-0003-4039-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '2fd93649-ef16-44fe-b437-77a020c0c56e',
  'Date',
  'Wed, 30 Mar 2022 13:24:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864664823006305')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaefc-e01e-0001-4239-441b65000000',
  'x-ms-client-request-id',
  '6b6b0c66-c83a-4e43-b8d1-c5df792cf0c5',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:09 GMT'
]);
