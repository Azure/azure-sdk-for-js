#!/bin/sh

# Copyright (c) Microsoft. All rights reserved.
# Licensed under the MIT license. See LICENSE file in the project root for full license information.

min_output=
integration_tests=
npm_command=

node_root=$(cd "$(dirname "$0")/.." && pwd)
cd $node_root

usage ()
{
    echo "Lint code and run tests."
    echo "build.sh [options]"
    echo "options"
    echo " --min                 minimize display output"
    echo " --integration-tests   run integration tests too (unit tests always run)"
    exit 1
}

process_args ()
{
    min_output=0
    integration_tests=0

    for arg in $*
    do
        case "$arg" in
            "--min" ) min_output=1;;
            "--integration-tests" ) integration_tests=1;;
            * ) usage;;
        esac
    done
    
    case "$min_output$integration_tests" in
        "00" ) npm_command="npm -s test";;
        "01" ) npm_command="npm -s run lint && npm -s run alltest";;
        "10" ) npm_command="npm -s run lint && npm -s run unittest-min";;
        "11" ) npm_command="npm -s run ci";;
    esac
}

lint_and_test ()
{
    cd "$1"
    pwd
    eval $npm_command
}

process_args $*

echo ""
if [ $integration_tests -eq 0 ]
then
    echo "-- Linting and running unit tests --"
else
    echo "-- Linting and running unit + integration tests --"
fi
echo ""

lint_and_test $node_root
[ $? -eq 0 ] || exit $?

