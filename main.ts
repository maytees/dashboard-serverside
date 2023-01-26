import { Application, Router, helpers } from "https://deno.land/x/oak/mod.ts";
import * as proxy from "./dashboard/proxy.ts";

interface Settings {
  proxy: proxy.ProxySettings;
}

const settings: Settings = JSON.parse(Deno.readTextFileSync("./settings.json"));

console.log(settings);

const port = 6000;
const app = new Application();

const router = new Router();

router.post("/proxy/on", (ctx) => {
  ctx.response.body = "Turning on proxy";
  proxy.turnOn();
});

router.post("/proxy/off", (ctx) => {
  ctx.response.body = "Turning off the proxy";
  proxy.turnOff();
});

router.get("/proxy/password", (ctx) => {
  ctx.response.body = "The password is: lol";
});

router.post("/proxy/password", (ctx) => {
  const { newPass } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = "Changing password to: " + newPass;
});

app.use(router.allowedMethods());
app.use(router.routes());

app.addEventListener("listen", () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });
