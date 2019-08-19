## Pre-requisites

- Run `npm i` to install all the dependencies of this project. This is a one time task.
- The tests expect a series of queues, topics and subscriptions to exist in a single Service Bus instance.
  The connection string for the service bus should be in the environment variable `SERVICEBUS_CONNECTION_STRING`.

  Note that the tests will empty the messages in these entities to get a clean start before running each test.

  We suggest to name your entities as defined below. If you have these entities with different names, ensure that you have the corresponding environment variables populated with your entity names.



  Entitiy Name  | Entity Description | Environment Variable if not using default names
  ------------- | ------------------|----------
  partitioned-queue | Queue with partitions enabled and sessions disabled | QUEUE_NAME
  unpartitioned-queue | Queue with partitions and sessions, both disabled | QUEUE_NAME_NO_PARTITION
  partitioned-queue-sessions | Queue with partitions and sessions, both enabled | QUEUE_NAME_SESSION
  unpartitioned-queue-sessions | Queue with partitions disabled and sessions enabled | QUEUE_NAME_NO_PARTITION_SESSION
  partitioned-topic | Topic with partitions enabled, meant for testing subscriptions with sessions disabled | TOPIC_NAME
  unpartitioned-topic | Topic with partitions disabled, meant for testing subscriptions with sessions disabled | TOPIC_NAME_NO_PARTITION
  partitioned-topic-sessions | Topic with partitions enabled, meant for testing subscriptions with sessions enabled | TOPIC_NAME_SESSION
  unpartitioned-topic-sessions | Topic with partitions disabled, meant for testing subscriptions with sessions enabled | TOPIC_NAME_NO_PARTITION_SESSION
  partitioned-topic-subscription | Subscription with sessions disabled in the Topic, `partitioned-topic` | SUBSCRIPTION_NAME
  unpartitioned-topic-subscription | Subscription with sessions disabled in the Topic, `unpartitioned-topic` | SUBSCRIPTION_NAME_NO_PARTITION
  partitioned-topic-sessions-subscription | Subscription with sessions enabled in the Topic, `partitioned-topic-sessions` | SUBSCRIPTION_NAME_SESSION
  unpartitioned-topic-sessions-subscription | Subscription with sessions enabled in the Topic, `unpartitioned-topic-sessions` | SUBSCRIPTION_NAME_NO_PARTITION_SESSION
  topic-filter | Topic for testing topic filters | TOPIC_FILTER_NAME
  topic-filter-subscription | Subscription in the Topic `topic-filter` | TOPIC_FILTER_SUBSCRIPTION_NAME
  topic-filter-default-subscription | Subscription in the Topic `topic-filter` | TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME

    Following are additional environment variables that will need to be defined in order to be able to run the tests in browser 

    Entitiy Name  | Entity Description | Environment Variable if not using default names
  ------------- | ------------------|----------
  partitioned-queue-browser | Queue with partitions enabled and sessions disabled | QUEUE_NAME_BROWSER
  unpartitioned-queue-browser | Queue with partitions and sessions, both disabled | QUEUE_NAME_NO_PARTITION_BROWSER
  partitioned-queue-sessions-browser | Queue with partitions and sessions, both enabled | QUEUE_NAME_SESSION_BROWSER
  unpartitioned-queue-sessions-browser | Queue with partitions disabled and sessions enabled | QUEUE_NAME_NO_PARTITION_SESSION_BROWSER
  partitioned-topic-browser | Topic with partitions enabled, meant for testing subscriptions with sessions disabled | TOPIC_NAME_BROWSER
  unpartitioned-topic-browser | Topic with partitions disabled, meant for testing subscriptions with sessions disabled | TOPIC_NAME_NO_PARTITION_BROWSER
  partitioned-topic-sessions-browser | Topic with partitions enabled, meant for testing subscriptions with sessions enabled | TOPIC_NAME_SESSION_BROWSER
  unpartitioned-topic-sessions-browser | Topic with partitions disabled, meant for testing subscriptions with sessions enabled | TOPIC_NAME_NO_PARTITION_SESSION_BROWSER
  partitioned-topic-subscription-browser | Subscription with sessions disabled in the Topic, `partitioned-topic-browser` | SUBSCRIPTION_NAME_BROWSER
  unpartitioned-topic-subscription-browser | Subscription with sessions disabled in the Topic, `unpartitioned-topic-browser` | SUBSCRIPTION_NAME_NO_PARTITION_BROWSER
  partitioned-topic-sessions-subscription-browser | Subscription with sessions enabled in the Topic, `partitioned-topic-sessions-browser` | SUBSCRIPTION_NAME_SESSION_BROWSER
  unpartitioned-topic-sessions-subscription-browser | Subscription with sessions enabled in the Topic, `unpartitioned-topic-sessions-browser` | SUBSCRIPTION_NAME_NO_PARTITION_SESSION_BROWSER
  topic-filter-browser | Topic for testing topic filters | TOPIC_FILTER_NAME_BROWSER
  topic-filter-subscription-browser | Subscription in the Topic `topic-filter-browser` | TOPIC_FILTER_SUBSCRIPTION_NAME_BROWSER
  topic-filter-default-subscription-browser | Subscription in the Topic `topic-filter-browser` | TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME_BROWSER


    The environment variables can be set by adding a file by the name `.env` in the root folder of this project.
    Following is a sample .env file template that can be re-used for your environment:
    ```
    SERVICEBUS_CONNECTION_STRING=

    QUEUE_NAME=partitioned-queue
    QUEUE_NAME_NO_PARTITION=unpartitioned-queue
    QUEUE_NAME_SESSION=partitioned-queue-sessions
    QUEUE_NAME_NO_PARTITION_SESSION=unpartitioned-queue-sessions

    TOPIC_NAME=partitioned-topic
    TOPIC_NAME_NO_PARTITION=unpartitioned-topic
    TOPIC_NAME_SESSION=partitioned-topic-sessions
    TOPIC_NAME_NO_PARTITION_SESSION=unpartitioned-topic-sessions
    SUBSCRIPTION_NAME=partitioned-topic-subscription
    SUBSCRIPTION_NAME_NO_PARTITION=unpartitioned-topic-subscription
    SUBSCRIPTION_NAME_SESSION=partitioned-topic-sessions-subscription
    SUBSCRIPTION_NAME_NO_PARTITION_SESSION=unpartitioned-topic-sessions-subscription

    TOPIC_FILTER_NAME=topic-filter
    TOPIC_FILTER_SUBSCRIPTION_NAME=topic-filter-subscription
    TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME=topic-filter-default-subscription

    # Resources for use by browser tests
    QUEUE_NAME_BROWSER=partitioned-queue-browser
    QUEUE_NAME_NO_PARTITION_BROWSER=unpartitioned-queue-browser
    QUEUE_NAME_SESSION_BROWSER=partitioned-sessions-queue-browser
    QUEUE_NAME_NO_PARTITION_SESSION_BROWSER=unpartitioned-sessions-queue-browser

    TOPIC_NAME_BROWSER=partitioned-topic-browser
    TOPIC_NAME_NO_PARTITION_BROWSER=unpartitioned-topic-browser
    TOPIC_NAME_SESSION_BROWSER=partitioned-sessions-topic-browser
    TOPIC_NAME_NO_PARTITION_SESSION_BROWSER=unpartitioned-sessions-topic-browser
    
    SUBSCRIPTION_NAME_BROWSER=partitioned-subscription-browser
    SUBSCRIPTION_NAME_NO_PARTITION_BROWSER=unpartitioned-subscription-browser
    SUBSCRIPTION_NAME_SESSION_BROWSER=partitioned-sessions-subscription-browser
    SUBSCRIPTION_NAME_NO_PARTITION_SESSION_BROWSER=unpartitioned-sessions-subscription-browser
    
    TOPIC_FILTER_NAME_BROWSER=topic-filter-browser
    TOPIC_FILTER_SUBSCRIPTION_NAME_BROWSER=topic-subscription-browser
    TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME_BROWSER=topic-subscription-default-browser
    
    ```

## Setup
Go through the following setup in order to delete and create the required servicebus-entities(just before running each test). This would need authenticating to Service Bus using `AadTokenCredentials` instead of `ConnectionString`. The below setup is also needed to run the tests that specifically uses `AadTokenCredentials` to authenticate.

**Register a new application in AAD**

- Follow [Documentation to register a new application](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) in the Azure Active Directory(in the azure-portal).
- Note down the `CLIENT_ID` and `TENANT_ID`.
- In the "Certificates & Secrets" tab, create a secret and note that down.

**Assign owner role to the registered application**

- In the azure-portal, go to your servicebus-namespace and assign **Azure Service Bus Data Owner (Preview)** role to the registered application.
- This can be done from `Role assignment` section of `Access control (IAM)` tab (in the left-side-navbar of your servicebus-namespace in the azure-portal)<br>
  _Doing this would allow the registered application manage the namespace, i.e., entity creation, deletion, etc.,_<br>
  _**Note:** AAD RBAC is enabled only on the new namespaces in this region for the preview. Please ensure that your servicebus-namespace is present in one of these regions: **US East, US East 2, or West Europe**. If not, create the namespace in one of those regions._
- For more information on Service Bus RBAC setup - [Learn more](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-role-based-access-control)

**Update your environment variables**

Populate the following variables along with the above mentioned environment variables in the `.env`.
```
AAD_CLIENT_ID=""
AAD_CLIENT_SECRET=""
AAD_TENANT_ID=""
RESOURCE_GROUP=""
AZURE_SUBSCRIPTION_ID=""
CLEAN_NAMESPACE="true"
```

**Note:**
* `RESOURCE_GROUP` and `AZURE_SUBSCRIPTION_ID` can be found at your servicebus-namespace in the azure-portal.
* `CLEAN_NAMESPACE` env variable is used it in testUtils.ts.

_If `CLEAN_NAMESPACE` is `undefined`, then the deletion/creation of the required servicebus-entities(for each test) will not happen._

## Run all tests

Run `npm run unit` from your terminal to run all the tests under the `./test` folder

## Run all tests in a single test suite

Append the `.only` on the `describe` method corresponding to the test suite.

Then run `npm run unit` from your terminal.

## Run a single test

Append the `.only` on the `it` method corresponding to the test.

Then run `npm run unit` from your terminal.

## Debug tests using Visual Studio Code

- Select the debug configuration `Debug Unit Tests` from the drop down in the debug viewlet.
- Add breakpoints in the test you want to debug. Tip: It is helpful to append the `.only` on the test method if you want only that method to be run.
- Start Debugging




![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/servicebus/service-bus/test/README.png)
