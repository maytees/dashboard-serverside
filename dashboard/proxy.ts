// Simply runs pm2 stop proxy
export function turnOff(): void {
  console.log("test");
  let p = Deno.run({
    cmd: ["pm2", "stop", "proxy"],
  });

  console.log("Turning off");
  p.status();
  p.close();
}

export function turnOn(): void {
  let p = Deno.run({
    cmd: [
      "pm2",
      "start",
      "npm",
      "--name",
      "proxy",
      "--",
      "--prefix",
      "/home/matees/workspace/uv-pwoxy",
      "start",
    ],
  });

  console.log("Turning on");
  p.status();
  p.close();
}

// Hashes param and sets it in conf file
export async function setPassword(password: string): Promise<void> {}
