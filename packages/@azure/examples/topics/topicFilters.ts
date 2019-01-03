import { Namespace, SubscriptionClient, generateUuid } from "../../lib";
import * as dotenv from "dotenv";
import { CorrelationFilter } from "../../lib/core/managementClient";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const topic = process.env.TOPIC_NAME || "";
const subscriptionDefaultFilter = process.env.SUBSCRIPTION_NAME_DEFAULT_FILTER || "";
const subscriptionSqlFilter = process.env.SUBSCRIPTION_NAME_SQL_FILTER || "";
const subscriptionCorrelationFilter = process.env.SUBSCRIPTION_NAME_CORRELATION_FILTER || "";

let ns: Namespace;

const redMessage = {
  messageId: "RedMessageId" + generateUuid(),
  body: "Red Message",
  label: "Red Message",
  userProperties: {
    Color: "Red"
  }
};

const blueMessage = {
  messageId: "BlueMessageId" + generateUuid(),
  body: "Blue Message",
  label: "Blue Message",
  userProperties: {
    Color: "Blue"
  }
};

const yellowMessage = {
  messageId: "YelloMessageId" + generateUuid(),
  body: "Yellow Message",
  label: "Yellow Message",
  userProperties: {
    Color: "Yellow"
  }
};

async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);

  const subscriptionClientNoFilter = ns.createSubscriptionClient(topic, subscriptionDefaultFilter);
  await removeAllRules(subscriptionClientNoFilter);
  await testAddedRule(subscriptionClientNoFilter, subscriptionClientNoFilter.defaultRuleName, true);

  const subscriptionClientSqlFilter = ns.createSubscriptionClient(topic, subscriptionSqlFilter);
  await removeAllRules(subscriptionClientSqlFilter);
  await testAddedRule(subscriptionClientSqlFilter, "YellowSqlRule", "Color = 'Yellow'");

  const subscriptionClientCorrelationFilter = ns.createSubscriptionClient(
    topic,
    subscriptionCorrelationFilter
  );
  await removeAllRules(subscriptionClientCorrelationFilter);
  await testAddedRule(subscriptionClientCorrelationFilter, "CorrelationRule", {
    label: blueMessage.label
  });

  await subscriptionClientNoFilter.close();
  await subscriptionClientSqlFilter.close();
  await subscriptionClientCorrelationFilter.close();

  const topicClient = ns.createTopicClient(topic);
  await topicClient.sendBatch([redMessage, blueMessage, yellowMessage]);
  await topicClient.close();
}

async function removeAllRules(client: SubscriptionClient): Promise<boolean> {
  let rules = await client.getRules();
  console.log(`${rules.length} rules found for ${client.name}`);

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    console.log(`Rule Name: ${rule.name}`);
    console.log(`Filter: ${JSON.stringify(rule.filter)}`);
    if (rule.action) {
      console.log(`Action: ${JSON.stringify(rule.action)}`);
    }
    await client.removeRule(rule.name);
  }

  rules = await client.getRules();
  if (rules.length) {
    console.log(`Failed to remove all rules from ${client.name}`);
    return false;
  } else {
    console.log(`All rules removed from ${client.name}`);
  }

  return true;
}

async function testAddedRule(
  client: SubscriptionClient,
  ruleName: string,
  filter: boolean | string | CorrelationFilter,
  sqlRuleActionExpression?: string
): Promise<void> {
  await client.addRule(ruleName, filter, sqlRuleActionExpression);
  const rules = await client.getRules();
  if (rules.find((rule) => rule.name === ruleName)) {
    console.log(`Rule ${ruleName} has been added`);
  } else {
    console.log(`Nooooo.... Where is the ${ruleName} rule??`);
    return;
  }
}

main()
  .then(() => {
    console.log(">>>> Calling close....");
    return ns.close();
  })
  .catch((err) => {
    console.log("error: ", err);
    return ns.close();
  });
