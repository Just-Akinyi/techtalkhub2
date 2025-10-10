#!/bin/bash

# Commit message prefix
MSG_PREFIX="Auto commit batch"

# Get list of modified files
FILES=$(git status --porcelain | awk '{print $2}')

# Convert to array
FILES_ARRAY=($FILES)

TOTAL=${#FILES_ARRAY[@]}
BATCH_SIZE=50
START=0

while [ $START -lt $TOTAL ]; do
  END=$((START + BATCH_SIZE))
  if [ $END -gt $TOTAL ]; then
    END=$TOTAL
  fi

  # Get batch
  BATCH_FILES=("${FILES_ARRAY[@]:$START:$BATCH_SIZE}")

  # Stage batch
  git add "${BATCH_FILES[@]}"

  # Commit batch
  git commit -m "$MSG_PREFIX $(($START / BATCH_SIZE + 1))"

  # Push
  git push origin main

  # Move to next batch
  START=$END
done

echo "All batches pushed successfully!"
