let nock = require('nock');

module.exports.hash = "753c2c1aa4f39d77fd362f6c4e390d67";

module.exports.testInfo = {"uniqueName":{"container":"container163261961679200755","blob":"blob163261961717305935","copiedblob":"copiedblob163261961750309858"},"newDate":{"expiry":"2021-09-26T01:26:57.503Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163261961679200755')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 26 Sep 2021 01:26:57 GMT',
  'ETag',
  '"0x8D9808CBB16E360"',
  'x-ms-request-id',
  '1294edcf-a01e-0006-4075-b2f93b000000',
  'x-ms-client-request-id',
  '828dbcb7-9548-4657-bb5b-f97b17599b19',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Sun, 26 Sep 2021 01:26:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163261961679200755/blob163261961717305935', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 26 Sep 2021 01:26:57 GMT',
  'ETag',
  '"0x8D9808CBB4A2882"',
  'x-ms-request-id',
  '1294edd2-a01e-0006-4275-b2f93b000000',
  'x-ms-client-request-id',
  '7f1d1c17-ffc1-4853-b5b8-3971e6eae920',
  'x-ms-version',
  '2020-12-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 26 Sep 2021 01:26:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163261961679200755/copiedblob163261961750309858')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 26 Sep 2021 01:26:58 GMT',
  'ETag',
  '"0x8D9808CBB99CFC7"',
  'x-ms-request-id',
  '1294edd3-a01e-0006-4375-b2f93b000000',
  'x-ms-client-request-id',
  '9db47f29-635a-4c9c-a8f0-dfde9c1c48c7',
  'x-ms-version',
  '2020-12-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-copy-id',
  '2ce8d864-20a8-4628-9ac7-575f15dd761f',
  'x-ms-copy-status',
  'success',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'antjoscope1',
  'Date',
  'Sun, 26 Sep 2021 01:26:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container163261961679200755/blob163261961717305935')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 26 Sep 2021 01:26:57 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9808CBB4A2882"',
  'x-ms-request-id',
  '1294edd7-a01e-0006-4675-b2f93b000000',
  'x-ms-client-request-id',
  '5ac98819-e2ac-4530-a7fd-0ae50f052834',
  'x-ms-version',
  '2020-12-06',
  'x-ms-creation-time',
  'Sun, 26 Sep 2021 01:26:57 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Sun, 26 Sep 2021 01:26:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container163261961679200755/copiedblob163261961750309858')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 26 Sep 2021 01:26:58 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9808CBB99CFC7"',
  'x-ms-request-id',
  '1294eddc-a01e-0006-4a75-b2f93b000000',
  'x-ms-client-request-id',
  'ac20e4d9-861d-4b53-b5c6-a5dff67f4664',
  'x-ms-version',
  '2020-12-06',
  'x-ms-creation-time',
  'Sun, 26 Sep 2021 01:26:58 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '2ce8d864-20a8-4628-9ac7-575f15dd761f',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container163261961679200755/blob163261961717305935?sv=2020-12-06&se=2021-09-27T01%3A26%3A57Z&sr=b&sp=racwd&sig=wUHOvKE1Ea0x8cAelmLSiPC6NpemT69MI4abkjtH39k%3D',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Sun, 26 Sep 2021 01:26:58 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'antjoscope1',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Sun, 26 Sep 2021 01:26:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163261961679200755')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1294ede1-a01e-0006-4c75-b2f93b000000',
  'x-ms-client-request-id',
  '8d9e3a50-0743-440f-bee0-c349ef4fa7d0',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Sun, 26 Sep 2021 01:26:58 GMT'
]);
