


import type { Config, Context } from "@netlify/functions";

export default async (request: Request, context: Context) => {

  const myImportantVariabel = process.env.MY_IMPORTAN_VARIABEL

  if (!myImportantVariabel) {
    return new Response(JSON.stringify({error: 'Missing MY_IMPORTAN_VARIABEL'}))
  }

  console.log('Mensagem de teste desde o arquivo variáveis')

  return new Response(JSON.stringify({message: myImportantVariabel}), {
    status: 200,
    headers: {'Context-Type': 'application/json'}
  })
};

export const config: Config = {
  path: "/api/variaveis",
};
