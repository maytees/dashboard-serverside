import { Application, Router, helpers } from "https://deno.land/x/oak/mod.ts";
import * as proxy from "./dashboard/proxy.ts";
import { sha256 } from "https://denopkg.com/chiefbiiko/sha256@v1.0.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

interface Settings {
  proxy: proxy.ProxySettings;
}

const port = 6443;
const app = new Application();

const router = new Router();

function getSettings(): Settings {
  return JSON.parse(Deno.readTextFileSync("./settings.json"));
}

router.post("/proxy/on", (ctx) => {
  proxy.turnOn();
  ctx.response.body = "Turned on proxy";
});

router.post("/proxy/off", (ctx) => {
  proxy.turnOff();
  ctx.response.body = "Turned off the proxy";
});

router.get("/proxy/password", (ctx) => {
  ctx.response.body = sha256(getSettings().proxy.password, "utf8", "hex");
});

router.post("/proxy/password", (ctx) => {
  const { newPass } = helpers.getQuery(ctx, { mergeParams: true });
  const newSettings = { ...getSettings(), proxy: { password: newPass } };

  Deno.writeTextFileSync("./settings.json", JSON.stringify(newSettings));

  ctx.response.body = "Changed password to: " + newPass;
});

app.use(
  oakCors({
    origin: "*",
  })
);

app.use(router.allowedMethods());
app.use(router.routes());

app.addEventListener("listen", () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });
