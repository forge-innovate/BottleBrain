#!/usr/bin/env bash

# Make the script itself executable
#run chmod +x ./start.sh

# Run the build command and then run the run command if build succeeds
sunodo clean && sunodo build && sunodo run
