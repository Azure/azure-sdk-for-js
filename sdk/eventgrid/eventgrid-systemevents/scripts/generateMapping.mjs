// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

// re-generate the system event name mapping in src/nameMapping.ts
import * as ts from "typescript";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function extract() {
  const file = path.resolve(path.join(__dirname, "../generated/models/models.ts"));
  console.log(`Extracting from file: ${file}`);
  const program = ts.createProgram({
    rootNames: [file],
    options: {},
  });
  const sourceFile = program.getSourceFile(file);
  const eventDataTypes = [];
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isInterfaceDeclaration(node)) {
      if (node.name.text.endsWith("EventData")) {
        const comments = [];
        const fullText = sourceFile.getFullText();
        const commentRanges = ts.getLeadingCommentRanges(fullText, node.getFullStart());
        if (commentRanges) {
          commentRanges.forEach((range) => {
            const commentText = fullText.substring(range.pos, range.end);
            comments.push(commentText);
          });
        }

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
        const matches = comments.join("\n").match(commentPattern);
        if (matches) {
          eventDataTypes.push({ name: matches[0], interface: node.name.text });
        } else {
          console.info(
            `No Microsoft.* event type name in comments for interface: ${node.name.text}. It could be a common base type.`,
          );
          console.info(`${comments.join("\n")}\n`);
        }
      }
    }
  });
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
  for (const eventDataType of eventDataTypes.sort((a, b) => a.name.localeCompare(b.name))) {
    content += `  /** An interface for the event data of a "${eventDataType.name}" event. */\n`;
    content += `  "${eventDataType.name}": ${eventDataType.interface};\n`;
  }
  content += `}\n`;
  const outputPath = path.resolve(path.join(__dirname, "../src/nameMapping.ts"));
  ts.sys.writeFile(outputPath, content);
  console.log(`Generated file written to: ${outputPath}`);
}

const licenseHeader = `// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

`;

extract();
