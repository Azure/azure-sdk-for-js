# Azure AI Voice Agents samples for JavaScript

| Sample                   | Demonstrates                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `managementLifecycle.js` | Create, get, update, list, and delete a voice agent.                                |
| `liveTextAndTools.js`    | Retrieve/create an agent, send text, stream text/audio, and return function output. |
| `liveAudioFile.js`       | Stream raw 24 kHz mono PCM16 input and save raw PCM16 output.                       |

Copy `sample.env` to `.env`, authenticate with Azure CLI or another `DefaultAzureCredential`
source, then configure these inputs:

| Environment variable                   | Required | Default                                                            | Used by                             | Purpose                                                                                                                                   |
| -------------------------------------- | -------- | ------------------------------------------------------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `AZURE_VOICE_AGENTS_ENDPOINT`          | Yes      | None                                                               | All samples                         | Foundry project endpoint, for example `https://<resource>.services.ai.azure.com/api/projects/<project>`.                                  |
| `AZURE_VOICE_AGENTS_AGENT_NAME`        | Yes      | None                                                               | All samples                         | Exact agent name for live samples. `managementLifecycle` uses it as a prefix and appends a timestamp before creating its temporary agent. |
| `AZURE_VOICE_AGENTS_MODEL`             | No       | `gpt-realtime`                                                     | All samples                         | Managed model used by `managementLifecycle` and when a live sample receives `404` and creates the requested agent.                        |
| `AZURE_VOICE_AGENTS_AUDIO_INPUT_FILE`  | No       | `./input.pcm`                                                      | `liveAudioFile`                     | Path to headerless 24 kHz, mono, little-endian PCM16 input. A readable file must exist at the resolved path.                              |
| `AZURE_VOICE_AGENTS_AUDIO_OUTPUT_FILE` | No       | `./output.pcm` for audio input; `voice-agent-output.pcm` otherwise | `liveAudioFile`, `liveTextAndTools` | Path for headerless 24 kHz mono PCM16 response audio. Existing content is replaced.                                                       |

The following non-environment inputs also apply:

| Input                              | Required | Used by         | Details                                                                                                           |
| ---------------------------------- | -------- | --------------- | ----------------------------------------------------------------------------------------------------------------- |
| A working `DefaultAzureCredential` | Yes      | All samples     | For local development, run `az login` as a user with access to the Foundry project.                               |
| Existing voice agent               | No       | Live samples    | The sample retrieves `AZURE_VOICE_AGENTS_AGENT_NAME`; if it receives `404`, it creates the agent using the model. |
| PCM16 input file                   | Yes      | `liveAudioFile` | Required even when the path variable is omitted, because omission selects the default `./input.pcm` path.         |

The live samples explicitly request 24 kHz mono PCM16 output and wait for output-file writes to
drain. `liveAudioFile` derives each input delay from the PCM byte count, sends chunks of at most
100 ms, and appends one second of silence so server VAD can finish the turn and create a response.
This follows the PCM16 input/output contract used by the [VoiceLive samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/voicelive/ai-voicelive/samples).

```bash
npm install
npm run text
```

Use `npm run management` for the management sample or `npm run audio` for PCM file input. The
scripts run the JavaScript files directly.

The live samples use only `@azure/ai-voiceagents` for management and streaming.
