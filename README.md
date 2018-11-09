# Azure SDK for Javascript

[![Build Status](https://travis-ci.org/Azure/azure-sdk-for-js.png?branch=master)](https://travis-ci.org/Azure/azure-sdk-for-js)

This project provides a Javascript package that makes it easy to consume and manage
Microsoft Azure Services.
It supports SDKs for:
- ARM services (packages with the naming convention of `azure-arm-<servicename>`)
- data plane of some Azure services (packages with the naming convention of `azure-<servicename>`).

## Documentation

Documentation of the supported SDKs can be found here:
- https://docs.microsoft.com/en-us/javascript/azure - This website primarily provides SDK documentation for
  - ARM based services (`azure-arm-<serviceName>`)
  - data plane SDKs like `azure-batch`, `azure-graph`, etc.

## Authenticating

There are three ways to authenticate against Azure while using the management plane (`azure-arm-<serviceName>`) SDKs and the `azure-graph` SDK, use
[this guide](./documentation/Authentication.md) to determine which method to use.

## Install individual modules

| **Azure Service (Data plane)** | **Install Command** |
| --- | --- |
| [Gallery](http://azure.microsoft.com/en-us/marketplace/) | `npm install azure-gallery` |
| [Graph](https://azure.microsoft.com/en-us/services/active-directory/) | `npm install azure-graph` |
| [Key Vault](http://azure.microsoft.com/en-us/services/key-vault/) | `npm install azure-keyvault` |
| [Monitoring](https://msdn.microsoft.com/library/azure/dn306639.aspx) | `npm install azure-monitoring` |
| [Scheduler](http://azure.microsoft.com/en-us/services/scheduler/) | `npm install azure-scheduler` |
| [Service Fabric](https://azure.microsoft.com/en-us/services/service-fabric/) | `npm install azure-servicefabric` |
| [Service Bus](http://azure.microsoft.com/en-us/services/service-bus/) | `npm install azure-sb` |
| [Storage](http://azure.microsoft.com/en-us/services/storage/) | `npm install azure-storage` |
| [Batch](https://azure.microsoft.com/en-us/services/batch/) | `npm install azure-batch` |
| **Azure Resource Management (ARM) (Control plane)** |
| [Advisor](https://docs.microsoft.com/en-us/rest/api/advisor/) | `npm install azure-arm-advisor` |
| [Api Management](https://docs.microsoft.com/en-us/rest/api/apimanagement/) | `npm install azure-arm-apimanagement` |
| [App Insights](https://docs.microsoft.com/en-us/rest/api/application-insights/) | `npm install azure-arm-appinsights` |
| [Automation](https://docs.microsoft.com/en-us/azure/automation/) | `npm install azure-arm-automation` |
| [Authorization](https://azure.microsoft.com/en-us/documentation/articles/role-based-access-control-configure/) | `npm install azure-arm-authorization` |
| [Batch](https://azure.microsoft.com/en-us/services/batch/) | `npm install azure-arm-batch` |
| [BatchAI](https://docs.microsoft.com/en-us/azure/batch-ai/) | `npm install azure-arm-batchai` |
| [Billing](https://docs.microsoft.com/en-us/azure/billing/billing-usage-rate-card-overview) | `npm install azure-arm-billing` |
| [CDN](https://azure.microsoft.com/en-us/services/cdn/) | `npm install azure-arm-cdn` |
| [CognitiveServices](https://azure.microsoft.com/en-us/services/cognitive-services/) | `npm install azure-arm-cognitiveservices` |
| [ContainerInstance](https://docs.microsoft.com/en-us/rest/api/container-instances/) | `npm install azure-arm-containerinstance` |
| [CosmosDB](https://docs.microsoft.com/en-us/rest/api/documentdbresourceprovider/) | `npm install azure-arm-cosmosdb` |
| [Commerce/Usage](https://azure.microsoft.com/en-us/documentation/articles/billing-usage-rate-card-overview/) | `npm install azure-arm-commerce` |
| [Container Registry](https://azure.microsoft.com/en-us/services/container-registry/) | `npm install azure-arm-containerregistry` |
| [CustomerInsights](https://docs.microsoft.com/en-us/dynamics365/customer-insights/ref/progref) | `npm install azure-arm-customerinsights` |
| [Compute](http://azure.microsoft.com/en-us/services/virtual-machines/)            | `npm install azure-arm-compute`|
| [Datafactory](https://azure.microsoft.com/en-us/services/datafactory/) | `npm install azure-arm-datafactory` |
| [Datalake Analytics](https://azure.microsoft.com/en-us/services/data-lake-analytics/) | `npm install azure-arm-datalake-analytics` |
| [Datalake Store](https://azure.microsoft.com/en-us/services/data-lake-store/) | `npm install azure-arm-datalake-store` |
| [DevTest Labs](https://azure.microsoft.com/en-us/services/devtest-lab/) | `npm install azure-arm-devtestlabs` |
| [DNS](http://azure.microsoft.com/en-us/services/dns/) | `npm install azure-arm-dns` |
| [DomainServices](https://docs.microsoft.com/en-us/azure/active-directory-domain-services/) | `npm install azure-arm-domainservices`    |
| [EventGrid](https://azure.microsoft.com/en-us/services/eventgrid/) | `npm install azure-arm-eventgrid` |
| [EventHubs](https://azure.microsoft.com/en-us/services/event-hubs/) | `npm install azure-arm-eventhub` |
| [HDInsight](http://azure.microsoft.com/en-us/services/hdinsight/) | `npm install azure-arm-hdinsight` |
| [HDInsightJobs](https://msdn.microsoft.com/en-us/library/azure/mt613023.aspx) | `npm install azure-arm-hdinsight-jobs` |
| [Insights](https://msdn.microsoft.com/en-us/library/azure/dn931943.aspx) | `npm install azure-arm-insights` |
| [IotHub](https://azure.microsoft.com/en-us/documentation/services/iot-hub/) | `npm install azure-arm-iothub` |
| [Key Vault](http://azure.microsoft.com/en-us/services/key-vault/) | `npm install azure-arm-keyvault` |
| [Logic Apps](https://azure.microsoft.com/en-us/services/logic-apps/) | `npm install azure-arm-logic` |
| [Machine Learning](https://azure.microsoft.com/en-us/services/machine-learning/) | `npm install azure-arm-machinelearning` |
| [Machine Learning Compute](https://azure.microsoft.com/en-us/services/machine-learning/) | `npm install azure-arm-machinelearningcompute` |
| [Media Services](https://azure.microsoft.com/en-us/services/media-services/) | `npm install azure-arm-mediaservices` |
| [Mobile Engagement](https://docs.microsoft.com/en-us/azure/mobile-engagement/) | `npm install azure-arm-mobileengagement` |
| [Monitor Management](https://docs.microsoft.com/en-us/rest/api/monitor/) | `npm install azure-arm-monitor` |
| [Notification Hubs](https://azure.microsoft.com/en-us/documentation/services/notification-hubs/) | `npm install azure-arm-notificationhubs` |
| [Operations Management](https://docs.microsoft.com/en-us/azure/operations-management-suite/) | `npm install azure-arm-operations` |
| [Operational Insights](https://azure.microsoft.com/en-us/resources/videos/azure-operational-insights-overview/) | `npm install azure-arm-operationalinsights` |
| [PowerBi Embedded](https://azure.microsoft.com/en-us/services/power-bi-embedded/) | `npm install azure-arm-powerbiembedded` |
| [RecoveryServices](https://azure.microsoft.com/en-us/services/site-recovery/) | `npm install azure-arm-recoveryservices` |
| [RecoveryServices Backup](https://azure.microsoft.com/en-us/services/site-recovery/) | `npm install azure-arm-recoveryservicesbackup` |
| [RecoveryServices SiteRecovery](https://docs.microsoft.com/en-us/rest/api/site-recovery/) | `npm install azure-arm-recoveryservices-siterecovery` |
| [Redis Cache](https://azure.microsoft.com/en-us/services/cache/) | `npm install azure-arm-rediscache` |
| [Relay](https://docs.microsoft.com/en-us/azure/service-bus-relay/relay-what-is-it) | `npm install azure-arm-relay` |
| [Resource Health](https://docs.microsoft.com/en-us/rest/api/resourcehealth/) | `npm install azure-arm-resourcehealth ` |
| [Resource Manager](https://azure.microsoft.com/en-us/documentation/articles/resource-group-overview/) | `npm install azure-arm-resource` |
| [Scheduler](https://azure.microsoft.com/en-us/documentation/articles/resource-group-overview/) | `npm install azure-arm-scheduler` |
| [Search](https://azure.microsoft.com/en-us/services/search/) | `npm install azure-arm-search` |
| [ServerManagement](https://azure.microsoft.com/en-us/documentation/articles/resource-group-overview/) | `npm install azure-arm-servermanagement` |
| [Servicebus](https://msdn.microsoft.com/en-us/library/mt639375.aspx) | `npm install azure-arm-sb` |
| [Service Fabric](https://azure.microsoft.com/en-us/services/service-fabric/) | `npm install azure-arm-servicefabric` |
| [Storage](http://azure.microsoft.com/en-us/services/storage/) | `npm install azure-arm-storage` |
| [Storage Import-Export](https://docs.microsoft.com/en-us/azure/storage/storage-import-export-service) | `npm install azure-arm-storageimportexport` |
| [Storsimple8000series](https://docs.microsoft.com/en-us/azure/storsimple/storsimple-overview) | `npm install azure-arm-storsimple8000series` |
| [Stream Analytics](https://docs.microsoft.com/en-us/rest/api/streamanalytics/) | `npm install azure-arm-streamanalytics` |
| [Sql](https://azure.microsoft.com/en-us/services/sql-database/) | `npm install azure-arm-sql` |
| [Traffic Manager](http://azure.microsoft.com/en-us/services/traffic-manager/) | `npm install azure-arm-trafficmanager` |
| [Virtual Networks](http://azure.microsoft.com/en-us/services/virtual-network/) | `npm install azure-arm-network` |
| [VisualStudio](https://docs.microsoft.com/en-us/rest/api/) | `npm install azure-arm-visualstudio` |
| [WebApps (WebSites)](http://azure.microsoft.com/en-us/services/app-service/web/) | `npm install azure-arm-website` |
| **Base Libraries** |
| Common Functionality for ARM clients generated from Autorest (Generic) | `npm install ms-rest-js` |
| Common Functionality for ARM clients generated from Autorest (Azure) | `npm install ms-rest-azure-js` |

## Need Help?

* [Read the docs](https://docs.microsoft.com/en-us/javascript/azure/?view=azure-node-latest)
* [Open an issue in GitHub](http://github.com/azure/azure-sdk-for-node)
* [Microsoft Azure Forums on MSDN and Stack Overflow](http://go.microsoft.com/fwlink/?LinkId=234489)

## AzureNodeEssentials VSCode extension

The [AzureNodeEssentials](https://marketplace.visualstudio.com/items?itemName=azuresdkteam.azurenodeessentials) extension helps you easily interact with Azure.
It helps you:
- create a project scaffolding
- install correct dependencies
- ready to use snippets for authentication and deploying templates to azure

Please feel free to provide feedback for the extension by opening github issues over [here](https://github.com/Azure/azure-node-essentials).

## Related Projects

* [Azure CLI](http://github.com/azure/azure-xplat-cli)

## License

This project is licensed under MIT and Apache-2.0.
- "MIT" license is usually used for the client libraries generated using [Autorest](https://github.com/Azure/Autorest) that are targeting ARM (V2 version of Azure REST API). The license can be found in "LICENSE.MIT.txt" file in this repository.
- "Apache-2.0" license is usually used for the client libraries generated using an internal code generator that are targeting ASM (V1 version of Azure REST API). The license can be found in "LICENSE.Apache.txt" file in this repository.

## Contribute

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).

For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

If you would like to become an active contributor to this project please follow the instructions provided in [Microsoft Azure Projects Contribution Guidelines](http://azure.github.io/guidelines/).

### Getting Started Developing
Want to get started hacking on the code, super! Follow the following instructions to get up and running. These
instructions expect you have Git and a supported version of Node installed.

1. Fork it
2. Git Clone your fork (`git clone {your repo} --recursive`)
3. Move into SDK directory (`cd azure-sdk-for-js`)
4. Install all dependencies (`npm install`)
5. Run the tests (`npm test`). You should see all tests passing.

### Contributing Code to the Project
You found something you'd like to change, great! Please submit a pull request and we'll do our best to work with you to
get your code included into the project.

1. Commit your changes (`git commit -am 'Add some feature'`)
2. Push to the branch (`git push origin my-new-feature`)
3. Create new Pull Request
