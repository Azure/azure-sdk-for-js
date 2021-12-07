let nock = require('nock');

module.exports.hash = "c51d1e78ef242eea00484e814758699d";

module.exports.testInfo = {"uniqueName":{"share":"share163789603863108129"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163789603863108129')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 26 Nov 2021 03:07:20 GMT',
  'ETag',
  '"0x8D9B089DC30456B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70067ab0-801a-004b-0572-e2ca1f000000',
  'x-ms-client-request-id',
  'a74793e2-9f21-4b06-a8c4-7e78efef27b3',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Fri, 26 Nov 2021 03:07:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163789603863108129')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 26 Nov 2021 03:07:20 GMT',
  'ETag',
  '"0x8D9B089DC30456B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70067ab6-801a-004b-0672-e2ca1f000000',
  'x-ms-client-request-id',
  'ab63deab-4596-4fc1-bde0-b6b33d90cc1f',
  'x-ms-version',
  '2021-02-12',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '100',
  'x-ms-access-tier',
  'Premium',
  'x-ms-enabled-protocols',
  'SMB',
  'x-ms-share-provisioned-iops',
  '3100',
  'x-ms-share-provisioned-bandwidth-mibps',
  '110',
  'x-ms-share-provisioned-ingress-mbps',
  '110',
  'x-ms-share-provisioned-egress-mbps',
  '110',
  'x-ms-share-next-allowed-quota-downgrade-time',
  'Fri, 26 Nov 2021 03:07:20 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-enabled-protocols,x-ms-share-provisioned-iops,x-ms-share-provisioned-bandwidth-mibps,x-ms-share-provisioned-ingress-mbps,x-ms-share-provisioned-egress-mbps,x-ms-share-next-allowed-quota-downgrade-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 26 Nov 2021 03:07:19 GMT'
]);
