let nock = require('nock');

module.exports.hash = "2fb42b69a8dc55bdecbe857b56a98d05";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864664938705214","file":"file164864664966406191","dir":"dir164864664966507227"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864664938705214')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:09 GMT',
  'ETag',
  '"0x8DA125092E79CCA"',
  'x-ms-request-id',
  '601eaefd-e01e-0001-4339-441b65000000',
  'x-ms-client-request-id',
  '3ec571af-bf44-45da-a93f-2b34a693b736',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:09 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864664938705214/file164864664966406191')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:10 GMT',
  'ETag',
  '"0x8DA12509317CAF4"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4c4-a01f-0003-4139-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'cbea9bc3-04de-4ec2-ae61-bf9312d71391',
  'Date',
  'Wed, 30 Mar 2022 13:24:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164864664938705214/file164864664966406191', "Hello World")
  .query(true)
  .reply(409, {"error":{"code":"BlobUsesCustomerSpecifiedEncryption","message":"The blob is encrypted with customer specified encryption, but it was not provided in the request.\nRequestId:2f12e4c5-a01f-0003-4239-441608000000\nTime:2022-03-30T13:24:10.3384798Z"}}, [
  'Content-Length',
  '249',
  'Content-Type',
  'application/json;charset=utf-8',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'x-ms-request-id',
  '2f12e4c5-a01f-0003-4239-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '9ee6b221-4862-41c4-8758-02caa358dd65',
  'Date',
  'Wed, 30 Mar 2022 13:24:10 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864664938705214')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaeff-e01e-0001-4439-441b65000000',
  'x-ms-client-request-id',
  '33d205f2-2dcf-492b-a6d9-21957245b72a',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:10 GMT'
]);
