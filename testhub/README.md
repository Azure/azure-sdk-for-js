## Installing node.js on your box
You can install node.js from [here](https://nodejs.org/en/). For installing node.js on a linux machine follow the instructions over [here](https://nodejs.org/en/download/package-manager/).

## Installing this cli for testing
```bash
git clone https://github.com/amarzavery/azure-event-hubs-node/tree/rhea
cd azure-event-hubs-node/testhub
npm install -g .
```

## Hub Testing CLI
`testhub` is a command line tool to help test Event Hub sending and receiving.

### Usage
When simply executing `testhub`, you will be greeted with a help page. `help` can be called on each command.
```bash
 testhub --help
testhub [command]

Commands:
  testhub receive  Sends messages to an eventhub.
  testhub send     Sends messages to an eventhub.

Options:
  --version       Show version number                                  [boolean]
  -h, --help      Show help                                            [boolean]
  -c, --conn-str  EventHub connection string.                           [string]
  -n, --hub       Name of the EventHub.                      [string] [required]
  -a, --address   Address URI to the EventHub entity.                   [string]
  -k, --key-name  SAS key-name for the EventHub.                        [string]
  -v, --key       SAS key for the key-name.                             [string]
```

#### Send
- Send with a connection string.
```bash
$ testhub send -c yourConnectionString
```
- Send will by default send 1 messages of 256 bytes.
```bash
$ testhub send -a yourNamespace -n yourHub -k yourKeyName -v yourKey
```
- You can specify more messages by using `-b` and `-s`.
```bash
$ testhub send -c yourConnectionString -b 100 -s 100
```
- To cancel press `Ctrl + c`.

```bash
testhub send --help
testhub send

Sends messages to an eventhub.

Options:
  --version        Show version number                                 [boolean]
  -h, --help       Show help                                           [boolean]
  -c, --conn-str   EventHub connection string.                          [string]
  -n, --hub        Name of the EventHub.                     [string] [required]
  -a, --address    Address URI to the EventHub entity.                  [string]
  -k, --key-name   SAS key-name for the EventHub.                       [string]
  -v, --key        SAS key for the key-name.                            [string]
  -b, --msg-count  Number of events to send.               [number] [default: 1]
  -s, --msg-size   size in bytes for each event          [number] [default: 256]
```

#### Receive
- Use a connection string to receive messages.
```bash
$ testhub receive -c yourConnectionString
```
- Listen for messages on all partitions of a given Event Hub.
```bash
$ testhub receive -a yourNamespace -n yourHub -k yourKeyName -v yourKey
```
- To cancel press `Ctrl + c`.

```bash
$ testhub receive --help
testhub receive

Sends messages to an eventhub.

Options:
  --version              Show version number                           [boolean]
  -h, --help             Show help                                     [boolean]
  -c, --conn-str         EventHub connection string.                    [string]
  -n, --hub              Name of the EventHub.               [string] [required]
  -a, --address          Address URI to the EventHub entity.            [string]
  -k, --key-name         SAS key-name for the EventHub.                 [string]
  -v, --key              SAS key for the key-name.                      [string]
  -p, --partitions       Comma seperated partition IDs.  [string] [default: "0"]
  -g, --consumer         Consumer group name      [string] [default: "$default"]
  -o, --offset           Starting offset                [string] [default: "-1"]
  -f, --full-event-data  Display the complete EventData object.
                                                      [boolean] [default: false]
```

#### Debug
- If you would like to see more in-depth information about what is happening, `export DEBUG=azure*` or `export DEBUG=azure*,rhea*`.
