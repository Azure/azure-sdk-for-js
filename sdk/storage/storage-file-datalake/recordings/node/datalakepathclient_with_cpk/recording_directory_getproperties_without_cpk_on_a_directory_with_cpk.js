let nock = require('nock');

module.exports.hash = "9725313d06b412aadd5c971ee95e988c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864666252500712","file":"file164864666279808165","dir":"dir164864666279902714"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666252500712')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:22 GMT',
  'ETag',
  '"0x8DA12509ABBFBCC"',
  'x-ms-request-id',
  '601eaf30-e01e-0001-6239-441b65000000',
  'x-ms-client-request-id',
  '63cf7f24-baca-45f6-9d32-38c62908f24a',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:22 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666252500712/dir164864666279902714')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:23 GMT',
  'ETag',
  '"0x8DA12509AE7E8D8"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4d9-a01f-0003-5539-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '964d7bc8-d813-424b-8baa-30e826f28fb2',
  'Date',
  'Wed, 30 Mar 2022 13:24:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem164864666252500712/dir164864666279902714')
  .reply(409, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf32-e01e-0001-6339-441b65000000',
  'x-ms-client-request-id',
  '2c7a2eb1-292c-4ebf-8608-c206a327cef1',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 13:24:23 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864666252500712')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf34-e01e-0001-6539-441b65000000',
  'x-ms-client-request-id',
  '342eac8e-5040-4492-ade9-6846ced547dd',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:23 GMT'
]);
