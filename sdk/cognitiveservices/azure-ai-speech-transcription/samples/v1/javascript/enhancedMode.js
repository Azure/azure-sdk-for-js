"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const tslib_1 = require("tslib");
/**
 * Demonstrates how to use enhanced mode features for advanced transcription tasks.
 * Enhanced mode provides capabilities like translation, task-specific processing, and prompt guidance.
 *
 * @summary use enhanced mode for advanced transcription features
 * @azsdk-weight 50
 */
const azure_ai_speech_transcription_1 = require("@azure/azure-ai-speech-transcription");
const core_auth_1 = require("@azure/core-auth");
const fs = tslib_1.__importStar(require("fs"));
// Load the .env file if it exists
require("dotenv/config");
async function main() {
    console.log("== Enhanced Mode Sample ==");
    const endpoint = process.env.ENDPOINT || "<endpoint>";
    const apiKey = process.env.API_KEY || "<api-key>";
    const client = new azure_ai_speech_transcription_1.TranscriptionClient(endpoint, new core_auth_1.AzureKeyCredential(apiKey));
    const audioFilePath = process.env.AUDIO_FILE_PATH || "path/to/audio.wav";
    if (!fs.existsSync(audioFilePath)) {
        console.error(`Audio file not found: ${audioFilePath}`);
        console.log("Please set the AUDIO_FILE_PATH environment variable to a valid audio file.");
        return;
    }
    const audioFile = fs.readFileSync(audioFilePath);
    console.log("=== Example 1: Enhanced Mode with Translation ===");
    try {
        const translationResult = await client.transcribe({
            audio: audioFile,
            options: {
                locales: ["en-US"],
                enhancedMode: {
                    enabled: true,
                    task: "translation",
                    targetLanguage: "es", // Translate to Spanish
                    prompt: ["Translate the following audio to Spanish with proper context"],
                },
            },
        });
        console.log("Original + Translation Results:");
        for (const combined of translationResult.combinedPhrases) {
            console.log(`Translated text: ${combined.text}`);
        }
    }
    catch (error) {
        console.error("Translation failed:", error);
    }
    console.log("\n=== Example 2: Enhanced Mode with Task-Specific Processing ===");
    try {
        const taskResult = await client.transcribe({
            audio: audioFile,
            options: {
                locales: ["en-US"],
                enhancedMode: {
                    enabled: true,
                    task: "summarization",
                    prompt: [
                        "Provide a concise summary of the main points discussed",
                        "Focus on key decisions and action items",
                    ],
                },
            },
        });
        console.log("Task-Specific Results:");
        for (const combined of taskResult.combinedPhrases) {
            console.log(`Summary: ${combined.text}`);
        }
    }
    catch (error) {
        console.error("Task processing failed:", error);
    }
    console.log("\n=== Example 3: Enhanced Mode with Custom Prompts ===");
    try {
        const promptResult = await client.transcribe({
            audio: audioFile,
            options: {
                locales: ["en-US"],
                enhancedMode: {
                    enabled: true,
                    task: "custom",
                    prompt: [
                        "Transcribe this audio with formal language",
                        "Correct any grammatical errors",
                        "Format as professional meeting notes",
                    ],
                },
            },
        });
        console.log("Enhanced Transcription Results:");
        for (const combined of promptResult.combinedPhrases) {
            console.log(`Enhanced text: ${combined.text}`);
        }
    }
    catch (error) {
        console.error("Enhanced processing failed:", error);
    }
    console.log("\n=== Enhanced Mode Features ===");
    console.log("✓ Translation: Translate speech to different languages");
    console.log("✓ Summarization: Extract key points and summaries");
    console.log("✓ Custom Tasks: Use prompts for specific processing needs");
    console.log("✓ Prompt Guidance: Provide context for better results");
}
main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
