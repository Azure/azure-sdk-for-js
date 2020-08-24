let nock = require("nock");

module.exports.hash = "4a7b841e0c16d29e1c18c43322517b0f";

module.exports.testInfo = { uniqueName: { share: "share159825199207004582" }, newDate: {} };

nock("https://fakestorageaccount.file.core.windows.net:443", { encodedQueryParams: true })
  .put("/share159825199207004582")
  .query(true)
  .reply(201, "", [
    "Content-Length",
    "0",
    "Last-Modified",
    "Mon, 24 Aug 2020 06:53:12 GMT",
    "ETag",
    '"0x8D847FA5E2DB89A"',
    "Server",
    "Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "efb5e4f1-501a-0052-54e3-794b91000000",
    "x-ms-client-request-id",
    "7fd7d550-1201-4532-b533-58a307e99a35",
    "x-ms-version",
    "2019-12-12",
    "Date",
    "Mon, 24 Aug 2020 06:53:11 GMT"
  ]);

nock("https://fakestorageaccount.file.core.windows.net:443", { encodedQueryParams: true })
  .delete("/share159825199207004582")
  .query(true)
  .reply(202, "", [
    "Content-Length",
    "0",
    "Server",
    "Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "efb5e4f4-501a-0052-55e3-794b91000000",
    "x-ms-client-request-id",
    "be29f8f5-cbbe-4850-b778-ba7dcaf85a90",
    "x-ms-version",
    "2019-12-12",
    "Date",
    "Mon, 24 Aug 2020 06:53:12 GMT"
  ]);

nock("https://fakestorageaccount.file.core.windows.net:443", { encodedQueryParams: true })
  .get("/")
  .query(true)
  .reply(
    200,
    '﻿<?xml version="1.0" encoding="utf-8"?><EnumerationResults ServiceEndpoint="https://fakestorageaccount.file.core.windows.net/"><Shares><Share><Name>share159825189673103060</Name><Deleted>true</Deleted><Version>01D679E3034BB8D1</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:51:37 GMT</Last-Modified><Etag>"0x8D847FA25C224E5"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:51:37 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:51:37 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159825189828205497</Name><Deleted>true</Deleted><Version>01D679E303D09169</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:51:38 GMT</Last-Modified><Etag>"0x8D847FA2646D62A"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:51:38 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:51:38 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159825199096905489</Name><Deleted>true</Deleted><Version>01D679E33B709913</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:53:11 GMT</Last-Modified><Etag>"0x8D847FA5DE6DED2"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:53:11 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:53:11 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159825199207004582</Name><Deleted>true</Deleted><Version>01D679E33BB79A17</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:53:12 GMT</Last-Modified><Etag>"0x8D847FA5E2DB89A"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:53:12 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:53:12 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share></Shares><NextMarker /></EnumerationResults>',
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/xml",
      "Server",
      "Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0",
      "x-ms-request-id",
      "efb5e4f5-501a-0052-56e3-794b91000000",
      "x-ms-client-request-id",
      "965563d4-3b1a-4b99-a206-2647730ceda4",
      "x-ms-version",
      "2019-12-12",
      "Date",
      "Mon, 24 Aug 2020 06:53:12 GMT"
    ]
  );

nock("https://fakestorageaccount.file.core.windows.net:443", { encodedQueryParams: true })
  .put("/share159825199207004582")
  .query(true)
  .reply(201, "", [
    "Content-Length",
    "0",
    "Last-Modified",
    "Mon, 24 Aug 2020 06:53:42 GMT",
    "ETag",
    '"0x8D847FA706E42BE"',
    "Server",
    "Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "efb5e521-501a-0052-64e3-794b91000000",
    "x-ms-client-request-id",
    "61898a42-8e3d-4f76-a29b-229c01e520bb",
    "x-ms-version",
    "2019-12-12",
    "Date",
    "Mon, 24 Aug 2020 06:53:42 GMT"
  ]);

nock("https://fakestorageaccount.file.core.windows.net:443", { encodedQueryParams: true })
  .get("/share159825199207004582")
  .query(true)
  .reply(200, "", [
    "Content-Length",
    "0",
    "Last-Modified",
    "Mon, 24 Aug 2020 06:53:42 GMT",
    "ETag",
    '"0x8D847FA706E42BE"',
    "Server",
    "Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "efb5e526-501a-0052-65e3-794b91000000",
    "x-ms-client-request-id",
    "bf041095-ee53-4cd4-b4b3-3d85d8d44424",
    "x-ms-version",
    "2019-12-12",
    "x-ms-has-immutability-policy",
    "false",
    "x-ms-has-legal-hold",
    "false",
    "x-ms-share-quota",
    "5120",
    "x-ms-access-tier",
    "TransactionOptimized",
    "x-ms-access-tier-change-time",
    "8/24/2020 6:53:12 AM",
    "Date",
    "Mon, 24 Aug 2020 06:53:42 GMT"
  ]);

nock("https://fakestorageaccount.file.core.windows.net:443", { encodedQueryParams: true })
  .delete("/share159825199207004582")
  .query(true)
  .reply(202, "", [
    "Content-Length",
    "0",
    "Server",
    "Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "efb5e527-501a-0052-66e3-794b91000000",
    "x-ms-client-request-id",
    "0b45e09e-bce5-44ac-85a0-17ba3d070dee",
    "x-ms-version",
    "2019-12-12",
    "Date",
    "Mon, 24 Aug 2020 06:53:42 GMT"
  ]);
