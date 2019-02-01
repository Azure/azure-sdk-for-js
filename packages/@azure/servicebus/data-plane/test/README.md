## Pre-requisites

- Run `npm i` to install all the dependencies of this project. This is a one time task.
- The tests expect a series of queues, topics and subscriptions to exist in a single Service Bus instance.
  The connection string for the service bus should be in the environment variable `SERVICEBUS_CONNECTION_STRING`.

  Note that the tests will empty the messages in these entities to get a clean start before running each test.

  Following is a recommended sample .env template for naming entities. If you have these entities with different names, ensure
  that you have the corresponding environment variables populated with your entity names.
    ```
    SERVICEBUS_CONNECTION_STRING=
    
    QUEUE_NAME=partitioned-queue
    QUEUE_NAME_NO_PARTITION=unpartitioned-queue
    QUEUE_NAME_SESSION=partitioned-sessions-queue
    QUEUE_NAME_NO_PARTITION_SESSION=unpartitioned-sessions-queue
    
    TOPIC_NAME=partitioned-topic
    TOPIC_NAME_NO_PARTITION=unpartitioned-topic
    TOPIC_NAME_SESSION=partitioned-sessions-topic
    TOPIC_NAME_NO_PARTITION_SESSION=unpartitioned-sessions-topic
    SUBSCRIPTION_NAME=partitioned-subscription
    SUBSCRIPTION_NAME_NO_PARTITION=unpartitioned-subscription
    SUBSCRIPTION_NAME_SESSION=partitioned-sessions-subscription
    SUBSCRIPTION_NAME_NO_PARTITION_SESSION=unpartitioned-sessions-subscription
    
    TOPIC_FILTER_NAME=topic-filter
    TOPIC_FILTER_SUBSCRIPTION_NAME=topic-subscription
    TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME=topic-subscription-default

    ```


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


