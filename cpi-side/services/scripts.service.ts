import "@pepperi-addons/cpi-node";

export async function runScript(Key: string, body: any, client?: any) {
  let scriptRes;
  if (client) {
    scriptRes = await pepperi.scripts.key(Key).run(body, client);
  } else {
    scriptRes = await pepperi.scripts.key(Key).run(body);
  }
  return scriptRes;
}
