let nock = require('nock');

module.exports.hash = "9cdf796957f2e578047eaa82c1aad5ec";

module.exports.testInfo = {"uniqueName":{"share":"share160579389094006979","share1":"share1160579389289606081"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160579389094006979')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 19 Nov 2020 13:51:32 GMT',
  'ETag',
  '"0x8D88C9238F5C92B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f5bd9e8a-c01a-0007-127b-be5a2f000000',
  'x-ms-client-request-id',
  '928d4930-5b5c-418f-af79-de360b19ae5f',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 19 Nov 2020 13:51:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160579389094006979')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 19 Nov 2020 13:51:32 GMT',
  'ETag',
  '"0x8D88C9238F5C92B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f5bd9e8d-c01a-0007-137b-be5a2f000000',
  'x-ms-client-request-id',
  '7b68a70a-23e1-429c-9514-0f5a2026dbd7',
  'x-ms-version',
  '2020-02-10',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '100',
  'x-ms-access-tier',
  'Premium',
  'x-ms-enabled-protocols',
  'NFS',
  'x-ms-root-squash',
  'RootSquash',
  'x-ms-share-provisioned-iops',
  '500',
  'x-ms-share-provisioned-ingress-mbps',
  '44',
  'x-ms-share-provisioned-egress-mbps',
  '66',
  'x-ms-share-next-allowed-quota-downgrade-time',
  'Thu, 19 Nov 2020 13:51:32 GMT',
  'Date',
  'Thu, 19 Nov 2020 13:51:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160579389094006979')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 19 Nov 2020 13:51:32 GMT',
  'ETag',
  '"0x8D88C923950B406"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f5bd9e8e-c01a-0007-147b-be5a2f000000',
  'x-ms-client-request-id',
  '69f7f640-0660-4759-9801-13c36410297c',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 19 Nov 2020 13:51:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share1160579389289606081')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 19 Nov 2020 13:51:33 GMT',
  'ETag',
  '"0x8D88C92397A069F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f5bd9e8f-c01a-0007-157b-be5a2f000000',
  'x-ms-client-request-id',
  '57ce93d3-13ea-4cbd-bb72-cec41b10c1cf',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 19 Nov 2020 13:51:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Shares><Share><Name>share1160578274955405169</Name><Properties><Last-Modified>Thu, 19 Nov 2020 10:45:49 GMT</Last-Modified><Etag>\"0x8D88C784788F588\"</Etag><Quota>100</Quota><EnabledProtocols>SMB</EnabledProtocols><AccessTier>Premium</AccessTier><ProvisionedIops>500</ProvisionedIops><ProvisionedIngressMBps>44</ProvisionedIngressMBps><ProvisionedEgressMBps>66</ProvisionedEgressMBps><NextAllowedQuotaDowngradeTime>Thu, 19 Nov 2020 10:45:49 GMT</NextAllowedQuotaDowngradeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share1160578286658404508</Name><Properties><Last-Modified>Thu, 19 Nov 2020 10:47:46 GMT</Last-Modified><Etag>\"0x8D88C788D4A7421\"</Etag><Quota>100</Quota><EnabledProtocols>SMB</EnabledProtocols><AccessTier>Premium</AccessTier><ProvisionedIops>500</ProvisionedIops><ProvisionedIngressMBps>44</ProvisionedIngressMBps><ProvisionedEgressMBps>66</ProvisionedEgressMBps><NextAllowedQuotaDowngradeTime>Thu, 19 Nov 2020 10:47:46 GMT</NextAllowedQuotaDowngradeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share1160578297620003459</Name><Properties><Last-Modified>Thu, 19 Nov 2020 10:49:36 GMT</Last-Modified><Etag>\"0x8D88C78CEA5BB37\"</Etag><Quota>100</Quota><EnabledProtocols>SMB</EnabledProtocols><AccessTier>Premium</AccessTier><ProvisionedIops>500</ProvisionedIops><ProvisionedIngressMBps>44</ProvisionedIngressMBps><ProvisionedEgressMBps>66</ProvisionedEgressMBps><NextAllowedQuotaDowngradeTime>Thu, 19 Nov 2020 10:49:36 GMT</NextAllowedQuotaDowngradeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share1160579315692603561</Name><Properties><Last-Modified>Thu, 19 Nov 2020 13:39:17 GMT</Last-Modified><Etag>\"0x8D88C9082CF8314\"</Etag><Quota>100</Quota><EnabledProtocols>SMB</EnabledProtocols><AccessTier>Premium</AccessTier><ProvisionedIops>500</ProvisionedIops><ProvisionedIngressMBps>44</ProvisionedIngressMBps><ProvisionedEgressMBps>66</ProvisionedEgressMBps><NextAllowedQuotaDowngradeTime>Thu, 19 Nov 2020 13:39:17 GMT</NextAllowedQuotaDowngradeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share1160579389289606081</Name><Properties><Last-Modified>Thu, 19 Nov 2020 13:51:33 GMT</Last-Modified><Etag>\"0x8D88C92397A069F\"</Etag><Quota>100</Quota><EnabledProtocols>SMB</EnabledProtocols><AccessTier>Premium</AccessTier><ProvisionedIops>500</ProvisionedIops><ProvisionedIngressMBps>44</ProvisionedIngressMBps><ProvisionedEgressMBps>66</ProvisionedEgressMBps><NextAllowedQuotaDowngradeTime>Thu, 19 Nov 2020 13:51:33 GMT</NextAllowedQuotaDowngradeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160577504269907991</Name><Properties><Last-Modified>Thu, 19 Nov 2020 08:37:23 GMT</Last-Modified><Etag>\"0x8D88C6656860A2C\"</Etag><Quota>100</Quota><EnabledProtocols>SMB</EnabledProtocols><AccessTier>Premium</AccessTier><ProvisionedIops>500</ProvisionedIops><ProvisionedIngressMBps>44</ProvisionedIngressMBps><ProvisionedEgressMBps>66</ProvisionedEgressMBps><NextAllowedQuotaDowngradeTime>Thu, 19 Nov 2020 08:37:23 GMT</NextAllowedQuotaDowngradeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160577912417601880</Name><Properties><Last-Modified>Thu, 19 Nov 2020 09:45:25 GMT</Last-Modified><Etag>\"0x8D88C6FD7406258\"</Etag><Quota>100</Quota><EnabledProtocols>SMB</EnabledProtocols><AccessTier>Premium</AccessTier><ProvisionedIops>500</ProvisionedIops><ProvisionedIngressMBps>44</ProvisionedIngressMBps><ProvisionedEgressMBps>66</ProvisionedEgressMBps><NextAllowedQuotaDowngradeTime>Thu, 19 Nov 2020 09:45:25 GMT</NextAllowedQuotaDowngradeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160577916149907601</Name><Properties><Last-Modified>Thu, 19 Nov 2020 09:46:02 GMT</Last-Modified><Etag>\"0x8D88C6FED67DC49\"</Etag><Quota>100</Quota><EnabledProtocols>SMB</EnabledProtocols><AccessTier>Premium</AccessTier><ProvisionedIops>500</ProvisionedIops><ProvisionedIngressMBps>44</ProvisionedIngressMBps><ProvisionedEgressMBps>66</ProvisionedEgressMBps><NextAllowedQuotaDowngradeTime>Thu, 19 Nov 2020 09:46:02 GMT</NextAllowedQuotaDowngradeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160578200752509117</Name><Properties><Last-Modified>Thu, 19 Nov 2020 10:33:28 GMT</Last-Modified><Etag>\"0x8D88C768DE22861\"</Etag><Quota>100</Quota><EnabledProtocols>NFS</EnabledProtocols><RootSquash>NoRootSquash</RootSquash><AccessTier>Premium</AccessTier><ProvisionedIops>500</ProvisionedIops><ProvisionedIngressMBps>44</ProvisionedIngressMBps><ProvisionedEgressMBps>66</ProvisionedEgressMBps><NextAllowedQuotaDowngradeTime>Thu, 19 Nov 2020 10:33:28 GMT</NextAllowedQuotaDowngradeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160578273162705300</Name><Properties><Last-Modified>Thu, 19 Nov 2020 10:45:32 GMT</Last-Modified><Etag>\"0x8D88C783D7D9D3C\"</Etag><Quota>100</Quota><EnabledProtocols>NFS</EnabledProtocols><RootSquash>RootSquash</RootSquash><AccessTier>Premium</AccessTier><ProvisionedIops>500</ProvisionedIops><ProvisionedIngressMBps>44</ProvisionedIngressMBps><ProvisionedEgressMBps>66</ProvisionedEgressMBps><NextAllowedQuotaDowngradeTime>Thu, 19 Nov 2020 10:45:32 GMT</NextAllowedQuotaDowngradeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160578274777600261</Name><Properties><Last-Modified>Thu, 19 Nov 2020 10:45:49 GMT</Last-Modified><Etag>\"0x8D88C78475F4C06\"</Etag><Quota>100</Quota><EnabledProtocols>NFS</EnabledProtocols><RootSquash>AllSquash</RootSquash><AccessTier>Premium</AccessTier><ProvisionedIops>500</ProvisionedIops><ProvisionedIngressMBps>44</ProvisionedIngressMBps><ProvisionedEgressMBps>66</ProvisionedEgressMBps><NextAllowedQuotaDowngradeTime>Thu, 19 Nov 2020 10:45:48 GMT</NextAllowedQuotaDowngradeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160578286480008392</Name><Properties><Last-Modified>Thu, 19 Nov 2020 10:47:46 GMT</Last-Modified><Etag>\"0x8D88C788D1FC041\"</Etag><Quota>100</Quota><EnabledProtocols>NFS</EnabledProtocols><RootSquash>AllSquash</RootSquash><AccessTier>Premium</AccessTier><ProvisionedIops>500</ProvisionedIops><ProvisionedIngressMBps>44</ProvisionedIngressMBps><ProvisionedEgressMBps>66</ProvisionedEgressMBps><NextAllowedQuotaDowngradeTime>Thu, 19 Nov 2020 10:47:45 GMT</NextAllowedQuotaDowngradeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160578297400407459</Name><Properties><Last-Modified>Thu, 19 Nov 2020 10:49:36 GMT</Last-Modified><Etag>\"0x8D88C78CE7293DD\"</Etag><Quota>100</Quota><EnabledProtocols>NFS</EnabledProtocols><RootSquash>AllSquash</RootSquash><AccessTier>Premium</AccessTier><ProvisionedIops>500</ProvisionedIops><ProvisionedIngressMBps>44</ProvisionedIngressMBps><ProvisionedEgressMBps>66</ProvisionedEgressMBps><NextAllowedQuotaDowngradeTime>Thu, 19 Nov 2020 10:49:35 GMT</NextAllowedQuotaDowngradeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160579315499806686</Name><Properties><Last-Modified>Thu, 19 Nov 2020 13:39:16 GMT</Last-Modified><Etag>\"0x8D88C9082A51EA4\"</Etag><Quota>100</Quota><EnabledProtocols>NFS</EnabledProtocols><RootSquash>AllSquash</RootSquash><AccessTier>Premium</AccessTier><ProvisionedIops>500</ProvisionedIops><ProvisionedIngressMBps>44</ProvisionedIngressMBps><ProvisionedEgressMBps>66</ProvisionedEgressMBps><NextAllowedQuotaDowngradeTime>Thu, 19 Nov 2020 13:39:16 GMT</NextAllowedQuotaDowngradeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160579389094006979</Name><Properties><Last-Modified>Thu, 19 Nov 2020 13:51:32 GMT</Last-Modified><Etag>\"0x8D88C923950B406\"</Etag><Quota>100</Quota><EnabledProtocols>NFS</EnabledProtocols><RootSquash>AllSquash</RootSquash><AccessTier>Premium</AccessTier><ProvisionedIops>500</ProvisionedIops><ProvisionedIngressMBps>44</ProvisionedIngressMBps><ProvisionedEgressMBps>66</ProvisionedEgressMBps><NextAllowedQuotaDowngradeTime>Thu, 19 Nov 2020 13:51:32 GMT</NextAllowedQuotaDowngradeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share></Shares><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f5bd9e91-c01a-0007-167b-be5a2f000000',
  'x-ms-client-request-id',
  '8e17da52-03d1-4926-8131-86c5421daeb3',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 19 Nov 2020 13:51:33 GMT'
]);
