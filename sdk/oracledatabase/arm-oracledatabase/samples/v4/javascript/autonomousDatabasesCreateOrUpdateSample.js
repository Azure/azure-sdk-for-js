// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a AutonomousDatabase
 *
 * @summary create a AutonomousDatabase
 * x-ms-original-file: 2025-09-01/AutonomousDatabases_CreateOrUpdate_MaximumSet_Gen.json
 */
async function createAutonomousDatabaseGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.createOrUpdate("rgopenapi", "databasedb1", {
    properties: {
      dataBaseType: "Regular",
      displayName: "example_autonomous_databasedb1",
      computeModel: "ECPU",
      computeCount: 2,
      dataStorageSizeInTbs: 1,
      adminPassword: "********",
      dbVersion: "18.4.0.0",
      characterSet: "AL32UTF8",
      ncharacterSet: "AL16UTF16",
      subnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
      vnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1",
      autonomousMaintenanceScheduleType: "Regular",
      cpuCoreCount: 1,
      customerContacts: [
        {
          email:
            "agyiqecugrloatgwpvmilmvutcnyjpxzhbilhhqfvqqblfgursqelzjjnwnmpfstitmcgkovzxnstiqqwjnhwwaufbnkebpqxlqwmfnmtlkgkoxcnjwcnfqbdtokhjalagxphkuiwxtxrzuipokiuczmuwoqoebkjvhytlhtxzshwsdoywluoggznuyuozqibiwdgwqbgnyogysdjpvlowmvuvq",
        },
      ],
      dataStorageSizeInGbs: 1024,
      dbWorkload: "OLTP",
      isAutoScalingEnabled: true,
      isAutoScalingForStorageEnabled: true,
      peerDbId:
        "jghxnzevghltfytskymsxgyrugfedzchifwoezwbcwzzvpikoqqjcdiesbidbeqkmncodchlmktetjlgjgbaofwpwmpvckmusaunrzdrctypasgcabyjwxwzkodwugdpeprikvxygxyb",
      isLocalDataGuardEnabled: true,
      localDisasterRecoveryType: "Adg",
      remoteDisasterRecoveryConfiguration: {
        disasterRecoveryType: "Adg",
        timeSnapshotStandbyEnabledTill: new Date("2025-08-01T04:32:58.715Z"),
        isSnapshotStandby: true,
        isReplicateAutomaticBackups: true,
      },
      localStandbyDb: {
        lagTimeInSeconds: 13,
        lifecycleState: "Provisioning",
        lifecycleDetails: "zoiyaaibuuhm",
        timeDataGuardRoleChanged: "inggk",
        timeDisasterRecoveryRoleChanged: "q",
      },
      isMtlsConnectionRequired: true,
      isPreviewVersionWithServiceTermsAccepted: true,
      licenseModel: "BringYourOwnLicense",
      lifecycleState: "Succeeded",
      scheduledOperationsList: [
        {
          dayOfWeek: { name: "Monday" },
          scheduledStartTime: "lwwvkazgmfremfwhckfb",
          scheduledStopTime: "hjwagzxijpiaogulmnmbuqakpqxhkjvaypjqnvbvtjddc",
        },
      ],
      privateEndpointIp: "rdlbhw",
      privateEndpointLabel: "worwqllbglhyakksevparfuaivc",
      apexDetails: {
        apexVersion: "scvpjwygbzqzevlztyfvqiaom",
        ordsVersion: "djlwvhpipimxaguklshpppjrzasbk",
      },
      connectionStrings: {
        allConnectionStrings: {
          high: "exdinleextbcjinutlkvnqyxhvandtihncykjzrhfdhfrxdarny",
          low: "vurudxqtummqqbnidwthmsqgujufjxwfnejdpuxkgyoxlgqhcgsfjcpzaqeioslpehjfashipdsjhkrpdobstvgxsqrgvcrpbiiabhvymdsylqsjedrimqhtttmszlaqyukopuufbtkbtwgdydrvnvkcdqmphwzpcjxlgefzrdajyczzjdpuzvhqvupbvrpvqhzoaalg",
          medium:
            "ishtubsuzgwtkfdqfgyxjlhehiokdvjfhwqhvmgtuksboshulroytcnubtrxxjbgoutftpzeavbldsoqjwmamgfwevhppyyeckythirzvaqujrjaiqnpyvycakhwgtuftmuxavdgdvbqxgsdqwbnqzmrzymwiydhxekenbweaghgvyveuysxqmovwodzwwfrxhtlcegekjk",
        },
        dedicated: "okoggzbidoaknwikuqpvepxvvcseukouprpfrldmakztkleeizbjf",
        high: "pggylyrivfn",
        low: "zrjsbtdbfluaipbzgcvvhyuvqoczjneihaiftkfmuvvyoldslgvvpwthieyrcoxvh",
        medium:
          "ebjnwenxvyeinsabrppychqbcawfxgplfacbsizltwfhpdafbkawopppqsxemlnmrbiqlstjupgdmpfcyyxgofmitbdiarrpprhntntqqjklseigycfcpmmlqiznxzliserjppmgfjatnmtbdxqtlbmrmpfbpoxmyffkkoptpayigeeefmqczroouqjxchswffywpsmyqohbyaclhsrwgqyuuyynvxyyzkche",
        profiles: [
          {
            consumerGroup: "High",
            displayName:
              "mqqdgidxuovxhcwrkanybxzplautekarsxbcbzlkikpmmvjrdrrkncbamdtcuksplamigrdkydjbzeurbmjgehgppovxqhuzasduwptrlyaurzszzqpztckhpdniepaglzeublbwffxebfespqyfpljlutregvlzzjo",
            hostFormat: "Fqdn",
            isRegional: true,
            protocol: "TCP",
            sessionMode: "Direct",
            syntaxFormat: "Long",
            tlsAuthentication: "Server",
            value: "bdrnwqpzbbzdipqqhnroxiuewqg",
          },
        ],
      },
      connectionUrls: {
        apexUrl:
          "epnebmudvzijxrfgabsdjewqfotqjmnxvokfhlyklhvtrjpprnqujthmceuhpfuumcbfxktppfguqduzkukxqkofoyyycljjtruyjtoiesxlrwwzonozaxetzrkpmzwasyvryvkryawxxf",
        databaseTransformsUrl:
          "hujiemysucgdgtasazsdtwnxmtjppugunrqnzfzneatukuyzvkfseusjaxrourznsrwxjbvzfansdcyfxnvcyghl",
        graphStudioUrl:
          "bucnwmwixwemqqtoozfclfzqenskkyssvcatwbptsezpzdwgnaexgxutsvaibnkawyohqklnktzlhdbhbstm",
        machineLearningNotebookUrl:
          "vfhnqsrabxcrjnpqaqkgnpwhxffsqkrgcijdkkvnaoangzkcbgwklufujhmlgydxueybugxzgokxbbappdslttpdthhbmxrgcicqzyjyahjeiqopuglgbjfbhufuvsogquelagbjtyotwhmecwupooitcaftldxjycgfnlilrnicqjxnsucieftadjbvptzltmgqkxhttfkkbutaxvtfzbvbbxbmpxeeyfethpofnmbbqbtlqvnfgelvtjizckgixpptkilcvrntknusvppgnobokjpepynndswcqsnewhfnlxgmownfwfnokhbqulzyuessvxxtcdcnmumbbpjchmjbvjecbbinjolmuoaixzunawlxnoqbpzkczdsubpqpdltnfydwevearrdirzaszsudcxaspozeop",
        mongoDbUrl:
          "dzmsqtcgsrdgwjlnrfmzcqcrkdqwmjrccxsszwdgpcygywnuurklwthgonxcnwaqcgzoexnaanwzsqwemcijuzxqbrkpvydizjraicgnspizwwnwureyey",
        ordsUrl:
          "lmqdgziantbczaneiqxopnaexcroelkbcgggjipzqfhoduwqodoyeghzjyuyhesewopbujxnoiziidhslxdawrfayjvxzjwfobtjrepldlmwhauiurzhbpyxsbueugddmdfindxsdjddqamwbptozzmobugnpezxyxdopripljdwnogjgrjwjfbugdkqrjwzjvavsdmgvspnzcgcjzxauqxqljmfgrtyohfppbmprmexiirvlmymxzyciaraihbwihvahyaciv",
        sqlDevWebUrl: "pktklsvlakmblcakipxy",
      },
      dataSafeStatus: "Registering",
      databaseEdition: "EnterpriseEdition",
      autonomousDatabaseId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/autonomousDatabases/databasedb1",
      longTermBackupSchedule: {
        repeatCadence: "OneTime",
        timeOfBackup: new Date("2025-08-01T04:32:58.715Z"),
        retentionPeriodInDays: 188,
        isDisabled: true,
      },
      localAdgAutoFailoverMaxDataLossLimit: 1759,
      openMode: "ReadOnly",
      operationsInsightsStatus: "Enabling",
      permissionLevel: "Restricted",
      role: "Primary",
      ocid: "ocid1..aaaaa",
      backupRetentionPeriodInDays: 1,
      whitelistedIps: ["1.1.1.1", "1.1.1.0/24", "1.1.2.25"],
    },
    location: "eastus",
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a AutonomousDatabase
 *
 * @summary create a AutonomousDatabase
 * x-ms-original-file: 2025-09-01/autonomousDatabaseClone_create.json
 */
async function autonomousDatabasesCreateOrUpdateClone() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.createOrUpdate("rg000", "databasedb1", {
    properties: {
      dataBaseType: "Clone",
      sourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/autonomousDatabases/databasedb1",
      cloneType: "Full",
      displayName: "example_autonomous_databasedb1_clone",
      computeModel: "ECPU",
      computeCount: 2,
      dataStorageSizeInTbs: 1,
      characterSet: "AL32UTF8",
      ncharacterSet: "AL16UTF16",
      adminPassword: "********",
      subnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
      vnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1",
    },
    location: "eastus",
    tags: { tagK1: "tagV1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a AutonomousDatabase
 *
 * @summary create a AutonomousDatabase
 * x-ms-original-file: 2025-09-01/autonomousDatabase_create.json
 */
async function autonomousDatabasesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.createOrUpdate("rg000", "databasedb1", {
    properties: {
      dataBaseType: "Regular",
      displayName: "example_autonomous_databasedb1",
      computeModel: "ECPU",
      computeCount: 2,
      dataStorageSizeInTbs: 1,
      adminPassword: "********",
      dbVersion: "18.4.0.0",
      characterSet: "AL32UTF8",
      ncharacterSet: "AL16UTF16",
      subnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
      vnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1",
    },
    location: "eastus",
    tags: { tagK1: "tagV1" },
  });
  console.log(result);
}

async function main() {
  await createAutonomousDatabaseGeneratedByMaximumSetRule();
  await autonomousDatabasesCreateOrUpdateClone();
  await autonomousDatabasesCreateOrUpdate();
}

main().catch(console.error);
