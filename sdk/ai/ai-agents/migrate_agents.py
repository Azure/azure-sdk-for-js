#!/usr/bin/env python3

"""
migrate_agents.py

Scan source for client.<old_method>(…) calls and rewrite them to the new
sub-client form.  Supports processing files by glob, directories (recursively),
and stdin→stdout.  By default it processes .py and .md files; you can add
other extensions in the EXTENSIONS set.

Usage:

  # In‐place single py file
  python migrate_agents.py my_script.py

  # In‐place single md file
  python migrate_agents.py README.md

  # In‐place entire tree (with globs)
  python migrate_agents.py src/**/*.py docs/**/*.md

  # In‐place directory recursion
  python migrate_agents.py my_folder

  # stdout (no in-place)
  cat old.py | python migrate_agents.py --stdout > new.py
"""

import re
import sys
import argparse
import glob
from pathlib import Path

# -----------------------------------------------------------------------------
# old_method_name → new_subclient_and_method
# -----------------------------------------------------------------------------
METHOD_RENAMES = {
    # threads
    "createThread":     "threads.create",
    "getThread":        "threads.get",
    "listThreads":      "threads.list",
    "updateThread":     "threads.update",
    "deleteThread":     "threads.delete",

    # messages
    "createMessage":    "messages.create",
    "getMessage":       "messages.get",
    "updateMessage":    "messages.update",
    "listMessages":     "messages.list",

    # runs
    "createRun":                    "runs.create",
    "getRun":                       "runs.get",
    "listRuns":                     "runs.list",
    "updateRun":                    "runs.update",
    "cancelRun":                    "runs.cancel",
    "getRunStep":                 "runSteps.get",
    "listRunSteps":                "runSteps.list",
    "submitToolOutputsToRun":    "runs.submitToolOutputs",

    # polling/file helpers
    # "upload_file_and_poll":                   "files.upload_and_poll",
    # "create_vector_store_and_poll":            "vector_stores.create_and_poll",
    # "create_vector_store_file_batch_and_poll": "vector_store_file_batches.create_and_poll",

    # files
    "uploadFile":      "files.upload",
    "getFile":         "files.get",
    "getFileContent": "files.getContent",
    "listFiles":       "files.list",
    "deleteFile":      "files.delete",
    "uploadFileAndPoll": "files.uploadAndPoll",

    # vector_stores
    "createVectorStore":  "vectorStores.create",
    "createVectorStoreAndPoll": "vectorStores.createAndPoll",
    "listVectorStores":   "vectorStores.list",
    "getVectorStore":     "vectorStores.get",
    "modifyVectorStore":  "vectorStores.update",
    "deleteVectorStore":  "vectorStores.delete",

    # vector_store_files
    "createVectorStoreFile":           "vectorStoreFiles.create",
    "createVectorStoreFileAndPoll": "vectorStoreFiles.createAndPoll",
    "listVectorStoreFiles":            "vectorStoreFiles.list",
    "getVectorStoreFile":              "vectorStoreFiles.get",
    "deleteVectorStoreFile":           "vectorStoreFiles.delete",

    # vector_store_file_batches
    "createVectorStoreFileBatch":     "vectorStoreFileBatches.create",
    "getVectorStoreFileBatch":        "vectorStoreFileBatches.get",
    "cancelVectorStoreFileBatch":     "vectorStoreFileBatches.cancel",
    "listVectorStoreFileBatchFiles": "vectorStoreFileBatches.list",
    "createVectorStoreFileBatchAndPoll": "vectorStoreFileBatches.createAndPoll",
}

# -----------------------------------------------------------------------------
# Which file‐suffixes should we process?
# Extend this if you want e.g. ".txt" or ".rst"
# -----------------------------------------------------------------------------
EXTENSIONS = {".ts", ".md"}

# Precompile regex → replacement pairs
REWRITES = []
for old_name, new_chain in METHOD_RENAMES.items():
    pat = re.compile(rf"\b(\w+)\.{old_name}\(")
    rep = rf"\1.{new_chain}("
    REWRITES.append((pat, rep))


def migrate_text(src: str) -> str:
    """
    Apply all regex-based rewrites to the given source text.
    """
    dst = src
    for pat, rep in REWRITES:
        dst = pat.sub(rep, dst)
    return dst


def process_file(path: Path, in_place: bool):
    """
    Read the file at `path`, apply migrations, and either overwrite it
    (if in_place) or write to stdout.
    """
    text = path.read_text(encoding="utf-8")
    new_text = migrate_text(text)

    if in_place:
        if new_text != text:
            path.write_text(new_text, encoding="utf-8")
            print(f"Migrated: {path}")
        else:
            print(f"No changes: {path}")
    else:
        sys.stdout.write(new_text)


def main():
    parser = argparse.ArgumentParser(
        prog="migrate_agents.py",
        description="Rewrite X.<old_method> calls to the new sub-client form"
    )
    parser.add_argument(
        "files",
        nargs="*",
        help="Files, directories, or glob patterns to process. If none, reads stdin."
    )
    parser.add_argument(
        "--stdout",
        action="store_true",
        help="Write transformed text to stdout instead of in-place updates."
    )
    args = parser.parse_args()

    # stdin → stdout
    if not args.files:
        src = sys.stdin.read()
        sys.stdout.write(migrate_text(src))
        return

    # expand file arguments
    paths = []
    for pattern in args.files:
        p = Path(pattern)
        if p.is_dir():
            # recurse for each supported extension
            for ext in EXTENSIONS:
                for f in p.rglob(f"*{ext}"):
                    paths.append(f)
        else:
            # use glob.glob (supports absolutes, **, etc.)
            for fn in glob.glob(pattern, recursive=True):
                paths.append(Path(fn))

    # filter and process
    for path in paths:
        if path.is_file() and path.suffix.lower() in EXTENSIONS:
            process_file(path, in_place=not args.stdout)


if __name__ == "__main__":
    main()
