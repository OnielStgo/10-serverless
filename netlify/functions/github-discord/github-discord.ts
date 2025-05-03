
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


const onStar = (payload: any): string => {

  const { action, sender, repository, starred_at } = payload

  return `User ${sender.login} ${action} star on ${repository.full_name}`
}

const onIssue = (payload: any): string => {

  const { action, issue } = payload

  if (action === 'opened') {
    return `An issue was opened with title ${issue.title}`
  }

  if (action === 'closed') {
    return `An issue was closed by ${issue.user.login}`
  }

  if (action === 'reopened') {
    return `An issue was reopened by ${issue.user.login}`
  }

  return `Unhandled action for the issue event ${action}`
}



export default async (request: Request, context: Context) => {

  const githubEvent = request.headers.get('x-github-event') ?? 'unknown';
  // const githubEvent = await request.headers['x-github-event'] ?? 'unknown'
  const text = await request.text();
  const payload = JSON.parse(text ?? '{}')
  let message: string


  console.log(`O githubEvent foi: ${githubEvent}`)
  console.log(`O sender foi: ${payload.sender.login}`)
  console.log(`A action foi: ${payload.action}`)
  console.log(`O repositorio é: ${payload.repository.full_name}`)

  // console.log(payload)

  switch (githubEvent) {
    case 'star':
      message = onStar(payload)        
      break;

    case 'issues':
      message = onIssue(payload)        
      break;
  
    default:
      message = `Unknown event ${githubEvent}`
      break;
  }

  await notify(message)

  return new Response(JSON.stringify({message: 'done'}), {
    status: 200,
    headers: {'Context-Type': 'application/json'}
  })
};

export const config: Config = {
  path: "/api/github-discord",
};
