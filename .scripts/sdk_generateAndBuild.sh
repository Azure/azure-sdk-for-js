#!/usr/bin/env bash
echo ========
echo $1
cat $1
echo $2

touch $2
cat generateAndBuildOutput.json > $2
