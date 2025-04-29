
// import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: 'Olá mundo'
//     }),
//     headers: {'Content-Type': 'application/json'}
//   }
// }

// export {handler}





import type { Config, Context } from "@netlify/functions";

export default async (request: Request, context: Context) => {

  console.log('Mensagem de teste desde o arquivo hello')

  return new Response(JSON.stringify({message: 'Olá mundo!!!'}), {
    status: 200,
    headers: {'Context-Type': 'application/json'}
  })
};

export const config: Config = {
  path: "/api/hello",
};
