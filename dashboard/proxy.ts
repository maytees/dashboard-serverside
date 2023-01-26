// Simply runs pm2 stop proxy
export function turnOff(): void {
  console.log("test");
  let p = Deno.run({ cmd: ["/usr/local/bin/pm2", "stop", "proxy"] });

  console.log("Turning off");
  p.status();
  p.close();
}

export function turnOn(): void {
  let p = Deno.run({
    cmd: [
      "/usr/local/bin/pm2",
      "start",
      "/home/mateesuser/workspace/uv-pwoxy/index.mjs",
      "--name",
      "proxy",
    ],
  });

  console.log("Turning on");
  p.status();
  p.close();
}

// Hashes param and sets it in conf file
export async function setPassword(password: string): Promise<void> {}
