// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { kustoTrustedEndpoints, MatchRule } from "../../../src/kustoTrustedEndpoints";

const DEFAULT_PUBLIC_LOGIN_URL = "https://login.microsoftonline.com";
const CHINA_CLOUD_LOGIN = "https://login.partner.microsoftonline.cn";

describe("kustoTrustedEndpoints", function () {
  it("Random kusto endpoints", function () {
    for (const c of [
      "https://127.0.0.1",
      "https://127.1.2.3",
      "https://kustozszokb5yrauyq.westeurope.kusto.windows.net",
      "https://kustofrbwrznltavls.centralus.kusto.windows.net",
      "https://kusto7j53clqswr4he.germanywestcentral.kusto.windows.net",
      "https://rpe2e0422132101fct2.eastus2euap.kusto.windows.net",
      "https://kustooq2gdfraeaxtq.westcentralus.kusto.windows.net",
      "https://kustoesp3ewo4s5cow.westcentralus.kusto.windows.net",
      "https://kustowmd43nx4ihnjs.southeastasia.kusto.windows.net",
      "https://createt210723t0601.westus2.kusto.windows.net",
      "https://kusto2rkgmaskub3fy.eastus2.kusto.windows.net",
      "https://kustou7u32pue4eij4.australiaeast.kusto.windows.net",
      "https://kustohme3e2jnolxys.northeurope.kusto.windows.net",
      "https://kustoas7cx3achaups.southcentralus.kusto.windows.net",
      "https://rpe2e0104160100act.westus2.kusto.windows.net",
      "https://kustox5obddk44367y.southcentralus.kusto.windows.net",
      "https://kustortnjlydpe5l6u.canadacentral.kusto.windows.net",
      "https://kustoz74sj7ikkvftk.southeastasia.kusto.windows.net",
      "https://rpe2e1004182350fctf.westus2.kusto.windows.net",
      "https://rpe2e1115095448act.westus2.kusto.windows.net",
      "https://kustoxenx32x3tuznw.southafricawest.kusto.windows.net",
      "https://kustowc3m5jpqtembw.canadacentral.kusto.windows.net",
      "https://rpe2e1011182056fctf.westus2.kusto.windows.net",
      "https://kusto3ge6xthiafqug.eastus.kusto.windows.net",
      "https://teamsauditservice.westus.kusto.windows.net",
      "https://kustooubnzekmh4doy.canadacentral.kusto.windows.net",
      "https://rpe2e1206081632fct2f.westus2.kusto.windows.net",
      "https://stopt402211020t0606.automationtestworkspace402.kusto.azuresynapse.net",
      "https://delt402210818t2309.automationtestworkspace402.kusto.azuresynapse.net",
      "https://kusto42iuqj4bejjxq.koreacentral.kusto.windows.net",
      "https://kusto3rv75hibmg6vu.southeastasia.kusto.windows.net",
      "https://kustogmhxb56nqjrje.westus2.kusto.windows.net",
      "https://kustozu5wg2p3aw3um.koreasouth.kusto.windows.net",
      "https://kustos36f2amn2agwk.australiaeast.kusto.windows.net",
      "https://kustop4htq3k676jau.eastus.kusto.windows.net",
      "https://kustojdny5lga53cts.southcentralus.kusto.windows.net",
      "https://customerportalprodeast.kusto.windows.net",
      "https://rpe2e0730231650und.westus2.kusto.windows.net",
      "https://kusto7lxdbebadivjw.southeastasia.kusto.windows.net",
      "https://alprd2neu000003s.northeurope.kusto.windows.net",
      "https://kustontnwqy3eler5g.northeurope.kusto.windows.net",
      "https://kustoap2wpozj7qpio.eastus.kusto.windows.net",
      "https://kustoajnxslghxlee4.japaneast.kusto.windows.net",
      "https://oiprdseau234x.australiasoutheast.kusto.windows.net",
      "https://kusto7yevbo7ypsnx4.germanywestcentral.kusto.windows.net",
      "https://kustoagph5odbqyquq.westus3.kusto.windows.net",
      "https://kustovs2hxo3ftud5e.westeurope.kusto.windows.net",
      "https://kustorzuk2dgiwdryc.uksouth.kusto.windows.net",
      "https://kustovsb4ogsdniwqk.eastus2.kusto.windows.net",
      "https://kusto3g3mpmkm3p3xc.switzerlandnorth.kusto.windows.net",
      "https://kusto2e2o7er7ypx2o.westus2.kusto.windows.net",
      "https://kustoa3qqlh23yksim.southafricawest.kusto.windows.net",
      "https://rpe2evnt11021711comp.rpe2evnt11021711-wksp.kusto.azuresynapse.net",
      "https://cdpkustoausas01.australiasoutheast.kusto.windows.net",
      "https://testinge16cluster.uksouth.kusto.windows.net",
      "https://testkustopoolbs6ond.workspacebs6ond.kusto.azuresynapse.net",
      "https://offnodereportingbcdr1.southcentralus.kusto.windows.net",
      "https://mhstorage16red.westus.kusto.windows.net",
      "https://kusto7kza5q2fmnh2w.northeurope.kusto.windows.net",
      "https://tvmquerycanc.centralus.kusto.windows.net",
      "https://kustowrcde4olp4zho.eastus.kusto.windows.net",
      "https://delt403210910t0727.automationtestworkspace403.kusto.azuresynapse.net",
      "https://foprdcq0004.brazilsouth.kusto.windows.net",
      "https://rpe2e0827133746fctf.eastus2euap.kusto.windows.net",
      "https://kustoz7yrvoaoa2yaa.australiaeast.kusto.windows.net",
      "https://rpe2e1203125809und.westus2.kusto.windows.net",
      "https://kustoywilbpggrltk4.francecentral.kusto.windows.net",
      "https://stopt402210825t0408.automationtestworkspace402.kusto.azuresynapse.net",
      "https://kustonryfjo5klvrh4.westeurope.kusto.windows.net",
      "https://kustowwqgogzpseg6o.eastus2.kusto.windows.net",
      "https://kustor3gjpwqum3olw.canadacentral.kusto.windows.net",
    ]) {
      validateEndpoint(c, DEFAULT_PUBLIC_LOGIN_URL);

      // Test case sensitivity
      let clusterName = c.toUpperCase();
      validateEndpoint(clusterName, DEFAULT_PUBLIC_LOGIN_URL);

      // Test MFA endpoints
      if (!c.includes("synapse")) {
        clusterName = c.replace(".kusto.", ".kustomfa.");
        validateEndpoint(clusterName, DEFAULT_PUBLIC_LOGIN_URL);
      }
      // Test dev endpoints
      if (!c.includes("synapse")) {
        clusterName = c.replace(".kusto.", ".kustodev.");
        validateEndpoint(clusterName, DEFAULT_PUBLIC_LOGIN_URL);
      }
    }
  });

  it("test well known kusto endpoints national clouds", function () {
    for (const c of [
      `https://kustozszokb5yrauyq.kusto.chinacloudapi.cn,${CHINA_CLOUD_LOGIN}`,
      "https://kustofrbwrznltavls.kusto.usgovcloudapi.net,https://login.microsoftonline.us",
      "https://kusto7j53clqswr4he.kusto.core.eaglex.ic.gov,https://login.microsoftonline.eaglex.ic.gov",
      "https://rpe2e0422132101fct2.kusto.core.microsoft.scloud,https://login.microsoftonline.microsoft.scloud",
      `https://kustozszokb5yrauyq.kusto.chinacloudapi.cn,${CHINA_CLOUD_LOGIN}`,
      "https://kustofrbwrznltavls.kusto.usgovcloudapi.net,https://login.microsoftonline.us",
      "https://kusto7j53clqswr4he.kusto.core.eaglex.ic.gov,https://login.microsoftonline.eaglex.ic.gov",
      "https://rpe2e0422132101fct2.kusto.core.microsoft.scloud,https://login.microsoftonline.microsoft.scloud",
    ]) {
      const clusterAndLoginEndpoint = c.split(",");
      validateEndpoint(clusterAndLoginEndpoint[0], clusterAndLoginEndpoint[1]);
      // Test case sensitivity
      validateEndpoint(
        clusterAndLoginEndpoint[0].toUpperCase(),
        clusterAndLoginEndpoint[1].toUpperCase()
      );
    }
  });

  it("test well known kusto endpoints proxy test", function () {
    for (const c of [
      `https://kusto.aria.microsoft.com,${DEFAULT_PUBLIC_LOGIN_URL}`,
      `https://ade.applicationinsights.io,${DEFAULT_PUBLIC_LOGIN_URL}`,
      `https://adx.monitor.azure.com,${DEFAULT_PUBLIC_LOGIN_URL}`,
      `https://cluster.playfab.com,${DEFAULT_PUBLIC_LOGIN_URL}`,
      `https://cluster.playfabapi.com,${DEFAULT_PUBLIC_LOGIN_URL}`,
      `https://cluster.playfab.cn,${CHINA_CLOUD_LOGIN}`,
    ]) {
      const clusterAndLoginEndpoint = c.split(",");
      validateEndpoint(clusterAndLoginEndpoint[0], clusterAndLoginEndpoint[1]);
      // Test case sensitivity
      validateEndpoint(
        clusterAndLoginEndpoint[0].toUpperCase(),
        clusterAndLoginEndpoint[1].toUpperCase()
      );
    }
  });

  it("test_well_known_kusto_endpoints_proxy_test", function () {
    for (const c of [
      `https://kusto.aria.microsoft.com,${DEFAULT_PUBLIC_LOGIN_URL}`,
      `https://ade.applicationinsights.io,${DEFAULT_PUBLIC_LOGIN_URL}`,
      `https://adx.monitor.azure.com,${DEFAULT_PUBLIC_LOGIN_URL}`,
      `https://cluster.playfab.com,${DEFAULT_PUBLIC_LOGIN_URL}`,
      `https://cluster.playfabapi.com,${DEFAULT_PUBLIC_LOGIN_URL}`,
      `https://cluster.playfab.cn,${CHINA_CLOUD_LOGIN}`,
    ]) {
      const clusterAndLoginEndpoint = c.split(",");
      validateEndpoint(clusterAndLoginEndpoint[0], clusterAndLoginEndpoint[1]);
      // Test case sensitivity
      validateEndpoint(
        clusterAndLoginEndpoint[0].toUpperCase(),
        clusterAndLoginEndpoint[1].toUpperCase()
      );
    }
  });

  it("test_well_known_kusto_endpoints_proxy_negative_test", function () {
    for (const clusterName of [
      "https://cluster.kusto.aria.microsoft.com",
      "https://cluster.eu.kusto.aria.microsoft.com",
      "https://cluster.ade.loganalytics.io",
      "https://cluster.ade.applicationinsights.io",
      "https://cluster.adx.monitor.azure.com",
      "https://cluster.adx.applicationinsights.azure.cn",
      "https://cluster.adx.monitor.azure.eaglex.ic.gov",
    ]) {
      checkEndpoint(clusterName, DEFAULT_PUBLIC_LOGIN_URL, true);
    }
  });
  it("test_well_known_kusto_endpoints_negative", function () {
    for (const clusterName of [
      "https://localhostess",
      "https://127.0.0.1.a",
      "https://some.azurewebsites.net",
      "https://kusto.azurewebsites.net",
      "https://test.kusto.core.microsoft.scloud",
      "https://cluster.kusto.azuresynapse.azure.cn",
    ]) {
      checkEndpoint(clusterName, DEFAULT_PUBLIC_LOGIN_URL, true);
    }
  });
  it("test_well_known_kusto_endpoints_override", function () {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      kustoTrustedEndpoints.setOverridePolicy((_) => true);
      checkEndpoint("https://kusto.kusto.windows.net", "", false);
      checkEndpoint("https://bing.com", "", false);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      kustoTrustedEndpoints.setOverridePolicy((_) => false);
      checkEndpoint("https://kusto.kusto.windows.net", "", true);
      checkEndpoint("https://bing.com", "", true);

      kustoTrustedEndpoints.setOverridePolicy(null);
      checkEndpoint("https://kusto.kusto.windows.net", DEFAULT_PUBLIC_LOGIN_URL, false);
      checkEndpoint("https://bing.com", DEFAULT_PUBLIC_LOGIN_URL, true);
    } finally {
      kustoTrustedEndpoints.setOverridePolicy(null);
    }
  });

  it("test_wellKnownKustoEndpoints_AdditionalWebsites", function () {
    kustoTrustedEndpoints.addTrustedHosts([new MatchRule(".someotherdomain1.net", false)], true);

    // 2nd call - to validate that addition works
    kustoTrustedEndpoints.addTrustedHosts([new MatchRule("www.someotherdomain2.net", true)], false);
    kustoTrustedEndpoints.addTrustedHosts([new MatchRule("www.someotherdomain3.net", true)], false);

    for (const clusterName of [
      "https://some.someotherdomain1.net",
      "https://www.someotherdomain2.net",
    ]) {
      checkEndpoint(clusterName, DEFAULT_PUBLIC_LOGIN_URL, false);
    }
    for (const clusterName of ["https://some.someotherdomain2.net"]) {
      checkEndpoint(clusterName, DEFAULT_PUBLIC_LOGIN_URL, true);
    }

    // Reset additional hosts
    kustoTrustedEndpoints.addTrustedHosts(null, true);
    // Validate that hosts are not allowed anymore
    for (const clusterName of [
      "https://some.someotherdomain1.net",
      "https://www.someotherdomain2.net",
    ]) {
      checkEndpoint(clusterName, DEFAULT_PUBLIC_LOGIN_URL, true);
    }
  });
});

function validateEndpoint(address: string, loginEndpoint: any) {
  return kustoTrustedEndpoints.validateTrustedEndpoint(address, loginEndpoint);
}

function checkEndpoint(clusterName: string, loginUrl: string, expectFail: boolean) {
  if (expectFail) {
    try {
      validateEndpoint(clusterName, loginUrl);
    } catch (error) {
      if (!(error as Error).message.startsWith("Can't communicate with")) {
        throw error;
      }
    }
  } else {
    validateEndpoint(clusterName, loginUrl);
  }
}
