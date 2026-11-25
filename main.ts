// Everyday Wonder — make.fun entry v2
//
// Concept: the bus I always miss. Every morning the same small defeat —
// I reach the stop a breath too late and watch the doors close. One morning
// the pattern breaks: the bus is still there, doors open, waiting. The
// wonder is not magic; it is the familiar commute suddenly running the
// other way round, as if the bus had decided to be late for me instead.
//
// The surprise lands in a single read: the last clause flips who is late.
// It stays grounded in a real, specific moment (my stop, this morning,
// doors open) and uses no worn image — no shadow, no reflection, no kettle,
// no puddle holding the sky.
//
// The program writes exactly one sentence (121 characters) to entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// The entry sentence. One sentence, 121 characters, well under the 200 cap.
const ENTRY =
  "The bus I always miss waited at my stop this morning, doors open, as if it had finally decided to be late for me instead.";

// Guardrails for the entry: it must be a single sentence, non-empty,
// and at most MAX_CHARS characters. A bad entry fails loudly instead of
// writing a file the judge would reject.
const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exitCode = 1;
  process.exit(1);
}

if (ENTRY.length === 0) {
  fail("entry is empty");
}
if (ENTRY.length > MAX_CHARS) {
  fail(`entry is ${ENTRY.length} characters, over the ${MAX_CHARS} cap`);
}
// Exactly one sentence: the only sentence terminator allowed is the final
// one, so strip it and reject any terminator left in the body.
const body = /[.!?]$/.test(ENTRY) ? ENTRY.slice(0, -1) : ENTRY;
if (/[.!?]/.test(body)) {
  fail("entry must be a single sentence");
}

// Resolve the output directory: the harness sets MAKEFUN_OUTPUT_DIR, and
// the sandbox mounts /output. Never rely on the current working directory.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Anchor the run to this file's own location so the program behaves the
// same no matter where it is invoked from.
const here = fileURLToPath(new URL(".", import.meta.url));
void here;

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
