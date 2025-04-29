
import type { Config, Context } from "@netlify/functions";



const notify = async (message: string) => {

  const body = {content: message}

  const response = await fetch(process.env.DISCORD_WEBHOOK_URL ?? '', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    console.log('Error sending message to discord')
    return false
  }

  return true
}


export default async (request: Request, context: Context) => {

  await notify('Olá mundo desde netlify dev')

  return new Response(JSON.stringify({message: 'done'}), {
    status: 200,
    headers: {'Context-Type': 'application/json'}
  })
};

export const config: Config = {
  path: "/api/github-discord",
};
