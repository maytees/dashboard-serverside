import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const port = 6000;
const app = new Application();

const router = new Router();

router.post("/proxy", (ctx) => {
  ctx.response.body = "Received a POST HTTP method";
});

app.use(router.allowedMethods());
app.use(router.routes());

app.addEventListener("listen", () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });
