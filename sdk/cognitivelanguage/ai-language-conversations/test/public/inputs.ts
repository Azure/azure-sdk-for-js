import { AnalyzeConversationJobsInput, ConversationalTask } from "../../src"

export const conv1: ConversationalTask = {
    "kind": "Conversation",
    "analysisInput": {
        "conversationItem": {
            "participantId": "1",
            "id": "1",
            "modality": "text",
            "language": "en",
            "text": "Send an email to Carol about the tomorrow's demo"
        },
    },
    "parameters": {
        "projectName": process.env.LANGUAGE_CLU_PROJECT_NAME || "<project-name>",
        "deploymentName": process.env.LANGUAGE_CLU_DEPLOYMENT_NAME || "<deployment-name>",
        "verbose": true,
        "isLoggingEnabled": false
    }
}

export const conv2: ConversationalTask = {
    "kind": "Conversation",
    "analysisInput": {
        "conversationItem": {
            "participantId": "1",
            "id": "1",
            "modality": "text",
            "language": "en",
            "text": "Send an email to Carol about the tomorrow's demo"
        },
    },
    "parameters": {
        "projectName": process.env.LANGUAGE_ORCHESTRATION_PROJECT_NAME || "<project-name>",
        "deploymentName": process.env.LANGUAGE_ORCHESTRATION_DEPLOYMENT_NAME || "<deployment-name>",
        "verbose": true,
        "isLoggingEnabled": false
    }
}

export const conv3: ConversationalTask = {
    "kind": "Conversation",
    "analysisInput": {
        "conversationItem": {
            "participantId": "1",
            "id": "1",
            "modality": "text",
            "language": "en",
            "text": "Reserve a table for 2 at the Italian restaurant"
        },
    },
    "parameters": {
        "projectName": process.env.LANGUAGE_ORCHESTRATION_PROJECT_NAME || "<project-name>",
        "deploymentName": process.env.LANGUAGE_ORCHESTRATION_DEPLOYMENT_NAME || "<deployment-name>",
        "verbose": true,
        "isLoggingEnabled": false
    }
}

export const conv4: ConversationalTask = {
    "kind": "Conversation",
    "analysisInput": {
        "conversationItem": {
            "participantId": "1",
            "id": "1",
            "modality": "text",
            "language": "en",
            "text": "How are you?"
        },
    },
    "parameters": {
        "projectName": process.env.LANGUAGE_ORCHESTRATION_PROJECT_NAME || "<project-name>",
        "deploymentName": process.env.LANGUAGE_ORCHESTRATION_DEPLOYMENT_NAME || "<deployment-name>",
        "verbose": true,
        "isLoggingEnabled": false
    }
}

export const conv5: AnalyzeConversationJobsInput = {
    "displayName": "Analyze PII in conversation",
    "analysisInput": {
        "conversations": [
            {
                "conversationItems": [
                    {
                        "id": "1",
                        "participantId": "0",
                        "modality": "transcript",
                        "text": "It is john doe.",
                        "lexical": "It is john doe",
                        "itn": "It is john doe",
                        "maskedItn": "It is john doe"
                    },
                    {
                        "id": "2",
                        "participantId": "1",
                        "modality": "transcript",
                        "text": "Yes, 633-27-8199 is my phone",
                        "lexical": "yes six three three two seven eight one nine nine is my phone",
                        "itn": "yes 633278199 is my phone",
                        "maskedItn": "yes 633278199 is my phone",
                    },
                    {
                        "id": "3",
                        "participantId": "1",
                        "modality": "transcript",
                        "text": "j.doe@yahoo.com is my email",
                        "lexical": "j dot doe at yahoo dot com is my email",
                        "maskedItn": "j.doe@yahoo.com is my email",
                        "itn": "j.doe@yahoo.com is my email",
                    }
                ],
                "modality": "transcript",
                "id": "1",
                "language": "en"
            }
        ]
    },
    "tasks": [
        {
            "kind": "ConversationalPIITask",
            "parameters": {
                "redactionSource": "lexical",
                "piiCategories": [
                    "all"
                ]
            }
        }
    ]
}

export const conv6: AnalyzeConversationJobsInput = {
    "displayName": "Analyze conversations from xxx",
    "analysisInput": {
        "conversations": [
            {
                "conversationItems": [
                    {
                        "text": "Hello, how can I help you?",
                        "modality": "text",
                        "id": "1",
                        "participantId": "Agent"
                    },
                    {
                        "text": "How to upgrade Office? I am getting error messages the whole day.",
                        "modality": "text",
                        "id": "2",
                        "participantId": "Customer"
                    },
                    {
                        "text": "Press the upgrade button please. Then sign in and follow the instructions.",
                        "modality": "text",
                        "id": "3",
                        "participantId": "Agent"
                    }
                ],
                "modality": "text",
                "id": "conversation1",
                "language": "en"
            },
        ]
    },
    "tasks": [
        {
            "taskName": "analyze 1",
            "kind": "ConversationalSummarizationTask",
            "parameters": {
                "summaryAspects": ["Issue, Resolution"]
            }
        }
    ]
}
