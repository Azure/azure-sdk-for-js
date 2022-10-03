let nock = require('nock');

module.exports.hash = "7a084df5dac8245797fe4e387abc8fb4";

module.exports.testInfo = {"uniqueName":{"container":"container164933925691801683","blob":"blob164933925716701764","pageBlob":"pageBlob164933925766809920"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933925691801683')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:37 GMT',
  'ETag',
  '"0x8DA189D2D2B1B5E"',
  'x-ms-request-id',
  '06497e09-b01e-0009-4586-4a3c4a000000',
  'x-ms-client-request-id',
  '71442f80-f2cf-4e35-addb-d29c931e4bb8',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Thu, 07 Apr 2022 13:47:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933925691801683/blob164933925716701764', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:37 GMT',
  'ETag',
  '"0x8DA189D2D51F787"',
  'x-ms-request-id',
  '06497e0b-b01e-0009-4686-4a3c4a000000',
  'x-ms-client-request-id',
  '9beadc51-9a6c-4700-92bb-62364530025e',
  'x-ms-version',
  '2021-04-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 07 Apr 2022 13:47:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933925691801683/blob164933925716701764', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'x-ms-request-id',
  '06497e0c-b01e-0009-4786-4a3c4a000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  '122ebd0d-7a14-4b57-a17c-6008260526c9',
  'Date',
  'Thu, 07 Apr 2022 13:47:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933925691801683/pageBlob164933925766809920')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:38 GMT',
  'ETag',
  '"0x8DA189D2D9F2E6D"',
  'x-ms-request-id',
  '06497e0d-b01e-0009-4886-4a3c4a000000',
  'x-ms-client-request-id',
  '086f0455-70bb-47c8-afff-6a150ef94335',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 07 Apr 2022 13:47:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933925691801683/pageBlob164933925766809920')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:38 GMT',
  'ETag',
  '"0x8DA189D2D9F2E6D"',
  'x-ms-request-id',
  '06497e0e-b01e-0009-4986-4a3c4a000000',
  'x-ms-client-request-id',
  '9b07af2c-6c0e-4236-b9ea-499c599925d3',
  'x-ms-version',
  '2021-04-10',
  'x-ms-snapshot',
  '2022-04-07T13:47:38.3195582Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 07 Apr 2022 13:47:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933925691801683/pageBlob164933925766809920', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:38 GMT',
  'ETag',
  '"0x8DA189D2DEC6547"',
  'x-ms-request-id',
  '06497e0f-b01e-0009-4a86-4a3c4a000000',
  'x-ms-client-request-id',
  '4b75cded-c95a-4252-ae62-45e810c1c2cb',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164933925691801683/pageBlob164933925766809920')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:06497e11-b01e-0009-4c86-4a3c4a000000\nTime:2022-04-07T13:47:38.8188673Z</Message></Error>", [
  'Content-Length',
  '253',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'x-ms-error-code',
  'ConditionNotMet',
  'x-ms-request-id',
  '06497e11-b01e-0009-4c86-4a3c4a000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  '51d84b0f-5a18-4a3c-9859-0105ce99b91b',
  'Date',
  'Thu, 07 Apr 2022 13:47:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164933925691801683/pageBlob164933925766809920')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<PageList><PageRange><Start>0</Start><End>511</End></PageRange></PageList>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:38 GMT',
  'ETag',
  '"0x8DA189D2DEC6547"',
  'Vary',
  'Origin',
  'x-ms-blob-content-length',
  '512',
  'x-ms-request-id',
  '06497e12-b01e-0009-4d86-4a3c4a000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  '1e111cd7-c473-48c2-b464-94cb1bbedaab',
  'Date',
  'Thu, 07 Apr 2022 13:47:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164933925691801683')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '06497e13-b01e-0009-4e86-4a3c4a000000',
  'x-ms-client-request-id',
  'aac76ee1-9220-4cbc-b2ec-deb156d22fa8',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Thu, 07 Apr 2022 13:47:38 GMT'
]);
