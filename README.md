### KIT Mathe/Info Discord Assistance Bot

#### [Work in progress]

Features:

- (string-)tags database
- Welcome channel functionality using newer discord bot features
    - Hide most of the irrelevant gunk behind buttons
    - Discord selects to select roles instead of the usual reactions system
- Discord API bot commands only

#### Running it

1. Create a json `config.json` in `src/`, like this:

```json
{
  "token": "<your token>",
  "clientId": "<your client Id>",
  "guildIds": [
    "id of server you're in"
  ]
}
```

2. `npm run start:dev`