let nock = require('nock');

module.exports.hash = "99e332dd22b041ae32754fbee41650a8";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864666475106410","file":"file164864666504002763","dir":"dir164864666504104436"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666475106410')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:25 GMT',
  'ETag',
  '"0x8DA12509C10E324"',
  'x-ms-request-id',
  '601eaf39-e01e-0001-6939-441b65000000',
  'x-ms-client-request-id',
  'e836f0d3-bb0f-4672-9241-a05818907db5',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:24 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666475106410/dir164864666504104436')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:25 GMT',
  'ETag',
  '"0x8DA12509C3E362D"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2f12e4db-a01f-0003-5739-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '33c3a3e9-893a-4ef2-b867-ac5c4d86e511',
  'Date',
  'Wed, 30 Mar 2022 13:24:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem164864666475106410/dir164864666504104436')
  .reply(409, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf3b-e01e-0001-6a39-441b65000000',
  'x-ms-client-request-id',
  'b78b3a2d-b917-4de8-bbc8-71f22979efa1',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'BlobDoesNotUseCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 13:24:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864666475106410')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf3c-e01e-0001-6b39-441b65000000',
  'x-ms-client-request-id',
  '139c0c21-952c-47bb-ad20-bdee87b85e83',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:25 GMT'
]);
