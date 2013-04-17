# trigger-finger

Node script to watch a directory tree for changes and execute a command.  Super simple and dopey at present.

For example:

    node trigger-finger.js --dir="/Users/kyledawkins/Projects/nike-dtc/backend/src/main/resources" \
                           --dir="/Users/kyledawkins/Projects/nike-dtc/backend/src/main/webapp/" \
                           --command='cd ~/Projects/nike-dtc/backend; mvn compile resources:resources'

## Installation

    git clone git@github.com:quile/trigger-finger.git
    cd trigger-finger
    npm install
    node trigger-finger.js <-- shows usage

