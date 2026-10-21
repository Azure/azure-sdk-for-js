// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

// re-generate the system event name mapping in src/nameMapping.ts
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ScriptKind, getLeadingCommentRanges, isInterfaceDeclaration } from "typescript/ast";
import { API } from "typescript/sync";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const licenseHeader = `// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

`;

// pattern 1
/** Schema of the data property of an EventGridEvent for a Microsoft.ApiCenter.ApiDefinitionAdded event. */

// pattern 2
/** Event data for Microsoft.EventGrid.MQTTClientCreatedOrUpdated event. */

// pattern 3
/**
 * Schema of the Data property of an EventGridEvent for a
 * Microsoft.ResourceNotifications.HealthResources.AvailabilityStatusChanged
 * event.
 */

// pattern 4
/** Schema of the Data property of an event grid event for a Microsoft.ResourceNotifications.ContainerServiceEventResources.ScheduledEventEmitted preview event.Schema of the Data property of an event grid event for a Microsoft.ResourceNotifications.ContainerServiceEventResources.ScheduledEventEmitted preview event. */

const commentPattern = /Microsoft\.[A-Za-z0-9.]+(?=\s*(?:\n\s*\*)?\s*(preview )?event)/s;

/**
 * Extract the event type name and data interface name of every `*EventData` interface in the
 * given TypeScript source text.
 *
 * The native TypeScript API process and the retained source file are owned by this function and
 * are released before it returns.
 *
 * @param {string} text
 * @param {string} fileName
 * @param {(message: string) => void} [info]
 * @returns {{ name: string, interface: string }[]}
 */
export function extractEventDataTypes(text, fileName, info = console.info) {
  const api = new API();
  try {
    const retained = api.createSourceFile(fileName, text, { scriptKind: ScriptKind.TS });
    try {
      const sourceFile = retained.sourceFile;
      const eventDataTypes = [];
      sourceFile.forEachChild((node) => {
        if (isInterfaceDeclaration(node) && node.name.text.endsWith("EventData")) {
          const comments = [];
          const fullText = sourceFile.text;
          const commentRanges = getLeadingCommentRanges(fullText, node.getFullStart());
          if (commentRanges) {
            commentRanges.forEach((range) => {
              comments.push(fullText.substring(range.pos, range.end));
            });
          }

          const matches = comments.join("\n").match(commentPattern);
          if (matches) {
            eventDataTypes.push({ name: matches[0], interface: node.name.text });
          } else {
            info(
              `No Microsoft.* event type name in comments for interface: ${node.name.text}. It could be a common base type.`,
            );
            info(`${comments.join("\n")}\n`);
          }
        }
      });
      return eventDataTypes;
    } finally {
      retained.dispose();
    }
  } finally {
    api.close();
  }
}

/**
 * Render the content of src/nameMapping.ts.
 *
 * @param {{ name: string, interface: string }[]} eventDataTypes
 * @returns {string}
 */
export function renderNameMapping(eventDataTypes) {
  let content = licenseHeader;
  content += `import type {`;
  for (const interfaceName of eventDataTypes.map((t) => t.interface).sort()) {
    content += `\n  ${interfaceName},`;
  }
  content += `\n} from "./models/index.js";

/**
 * A mapping of event type names to event data type interfaces.
 */
export interface SystemEventNameToEventData {
`;
  for (const eventDataType of [...eventDataTypes].sort((a, b) => a.name.localeCompare(b.name))) {
    content += `  /** An interface for the event data of a "${eventDataType.name}" event. */\n`;
    content += `  "${eventDataType.name}": ${eventDataType.interface};\n`;
  }
  content += `}\n`;
  return content;
}

function extract() {
  const file = path.resolve(path.join(__dirname, "../generated/models/models.ts"));
  console.log(`Extracting from file: ${file}`);
  const eventDataTypes = extractEventDataTypes(readFileSync(file, "utf8"), file);
  const outputPath = path.resolve(path.join(__dirname, "../src/nameMapping.ts"));
  writeFileSync(outputPath, renderNameMapping(eventDataTypes));
  console.log(`Generated file written to: ${outputPath}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  extract();
}
