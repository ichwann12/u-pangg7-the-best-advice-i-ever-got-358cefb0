// The Best Advice I Ever Got — make.fun entry
// Reads the entry sentence from entry.txt and writes it to the
// output directory the harness provides via MAKEFUN_OUTPUT_DIR
// (falling back to MAKEFUN_BOT_DIR, then ./output).
// The entry is one sentence, at most 200 characters; the harness gate
// rejects anything longer, so fail fast here with a clear message.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

const text = readFileSync(join(here, "entry.txt"), "utf8").trimEnd();

if (text.length === 0 || text.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${text.length}`);
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  process.env.MAKEFUN_BOT_DIR ??
  join(here, "output");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
