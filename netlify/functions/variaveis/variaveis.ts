


import type { Config, Context } from "@netlify/functions";

export default async (request: Request, context: Context) => {

  const myImportantVariabel = process.env.MY_IMPORTAN_VARIABEL

  return new Response(JSON.stringify({message: myImportantVariabel}), {
    status: 200,
    headers: {'Context-Type': 'application/json'}
  })
};

export const config: Config = {
  path: "/api/variaveis",
};
