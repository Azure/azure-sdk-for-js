let nock = require('nock');

module.exports.hash = "1f7be9d9bafbabbe9514ff49d3ed3ab4";

module.exports.testInfo = {"uniqueName":{"share":"share164249310868405559","dir":"dir164249311060900292","dir164249311060900292":"dir164249311060900292164249311091903434"},"newDate":{"now":"2022-01-18T08:05:10.920Z"}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164249310868405559')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 18 Jan 2022 08:05:10 GMT',
  'ETag',
  '"0x8D9DA593FD7905A"',
  'x-ms-request-id',
  'fe550b5b-201a-0006-2742-0c03a9000000',
  'x-ms-client-request-id',
  'c46fc04f-17c7-4795-9b8f-ff1a303c5524',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Tue, 18 Jan 2022 08:05:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164249310868405559/dir164249311060900292')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 18 Jan 2022 08:05:11 GMT',
  'ETag',
  '"0x8D9DA59400B2258"',
  'x-ms-request-id',
  'fe550b5e-201a-0006-2842-0c03a9000000',
  'x-ms-client-request-id',
  '75edb86e-a460-479f-83d4-8de59c52ae5e',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-01-18T08:05:11.1051864Z',
  'x-ms-file-last-write-time',
  '2022-01-18T08:05:11.1051864Z',
  'x-ms-file-creation-time',
  '2022-01-18T08:05:11.1051864Z',
  'x-ms-file-permission-key',
  '12098348342869812368*3117928199373521617',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 18 Jan 2022 08:05:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164249310868405559/dir164249311060900292164249311091903434')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 18 Jan 2022 08:05:10 GMT',
  'ETag',
  '"0x8D9DA593FEEE080"',
  'x-ms-request-id',
  'fe550b60-201a-0006-2942-0c03a9000000',
  'x-ms-client-request-id',
  '247a6f8b-851d-4f4d-9f30-e395bb261f0b',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-01-18T08:05:10.9200000Z',
  'x-ms-file-last-write-time',
  '2022-01-18T08:05:10.9200000Z',
  'x-ms-file-creation-time',
  '2022-01-18T08:05:10.9200000Z',
  'x-ms-file-permission-key',
  '12098348342869812368*3117928199373521617',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Directory | Archive | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 18 Jan 2022 08:05:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164249310868405559/dir164249311060900292164249311091903434')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 18 Jan 2022 08:05:10 GMT',
  'ETag',
  '"0x8D9DA593FEEE080"',
  'x-ms-request-id',
  'fe550b61-201a-0006-2a42-0c03a9000000',
  'x-ms-client-request-id',
  'f83f8beb-8059-499a-afee-687897a601f3',
  'x-ms-version',
  '2021-06-08',
  'x-ms-server-encrypted',
  'true',
  'x-ms-meta-key',
  'value',
  'x-ms-file-change-time',
  '2022-01-18T08:05:10.9200000Z',
  'x-ms-file-last-write-time',
  '2022-01-18T08:05:10.9200000Z',
  'x-ms-file-creation-time',
  '2022-01-18T08:05:10.9200000Z',
  'x-ms-file-permission-key',
  '12098348342869812368*3117928199373521617',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Directory | Archive | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-meta-key,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 18 Jan 2022 08:05:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164249310868405559')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fe550b62-201a-0006-2b42-0c03a9000000',
  'x-ms-client-request-id',
  '0d6ce925-a23f-4400-9cd7-d4e974d20480',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Tue, 18 Jan 2022 08:05:11 GMT'
]);
