## Pre-requisites

- Run `npm i` to install all the dependencies of this project. This is a one time task.
- The tests expect a series of queues, topics and subscriptions to exist in a single Service Bus instance.
  The connection string for the service bus should be in the environment variable `SERVICEBUS_CONNECTION_STRING`.

  Note that the tests will empty the messages in these entities to get a clean start before running each test.

  We suggest to name your entities as defined below. If you have these entities with different names, ensure
  that you have the corresponding environment variables populated with your entity names.

 
  
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


