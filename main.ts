import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as proxy from "./dashboard/proxy.ts";

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

app.use(router.allowedMethods());
app.use(router.routes());

app.addEventListener("listen", () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });
