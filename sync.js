import * as fs from "node:fs";
import * as path from "node:path";
import { Buffer } from "node:buffer";
import { fileURLToPath } from "node:url";
import { unescape } from "node:querystring";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const encodeToBase64 = (text) =>
  Buffer.from(unescape(encodeURIComponent(text))).toString("base64");

const readmePath = path.resolve(__dirname, "README.md");
const readme = fs.readFileSync(readmePath, "utf8");
const ruleFiles = fs.readdirSync(path.resolve(__dirname, "rules"));

main();

async function main() {
  const rules = await Promise.all(
    ruleFiles.map(async (ruleFile) => {
      const path = `./rules/${ruleFile}`;
      const { default: rule } = await import(path);
      const name = ruleFile.replace(".js", "");
      const options = {
        text: rule.sampleCode,
        options: {
          rules: {
            "no-restricted-syntax": [
              "error",
              ...rule.rules.map((p) => ({
                selector: p.selector.trim(),
                message: p.message.trim(),
              })),
            ],
          },
        },
      };
      const url = `https://eslint.org/play/#${encodeToBase64(
        JSON.stringify(options)
      )}`;
      return {
        name,
        path,
        description: rule.description,
        url,
      };
    })
  );
  const rulesMarkdown = rules
    .map((r) => `- [${r.name}](${r.path}) [🤖](${r.url}) - ${r.description}`)
    .join("\n");

  const newReadme = readme.replace(
    /<!-- RULES_START -->[\s\S]*<!-- RULES_END -->/,
    `<!-- RULES_START -->\n${rulesMarkdown}<!-- RULES_END -->`
  );
  fs.writeFileSync(readmePath, newReadme);
}
