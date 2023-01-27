export interface ProxySettings {
  password: string;
}

// Simply runs pm2 stop proxy
export function turnOff(): void {
  console.log("test");
  const p = Deno.run({
    cmd: ["pm2", "stop", "proxy"],
  });

  console.log("Turning off proxy");
  p.status();
  p.close();
}

export function turnOn(): void {
  const p = Deno.run({
    cmd: ["pm2", "start", "proxy"],
  });

  console.log("Turning on proxy");
  p.status();
  p.close();
}

export function turnOnNew(): void {
  const p = Deno.run({
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

  console.log("Creating new instance of proxy");
  p.status();
  p.close();
}
