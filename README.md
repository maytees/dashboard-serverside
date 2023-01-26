# Serverside

This is a directory for the backend of the dashboard which will control the server which all these "services" will run on.

`./dashboard/` is used to store "commands" which the main.ts oak rest api control

`settings.json` contains settings for the different "services" such as proxy.
Here is an example of settings.json:

```json
{
  "proxy": {
    "password": "marketsidelemonade"
  }
}
```
