import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from 'remix'

import globalStylesUrl from '~/styles/global.css'

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: globalStylesUrl
    }
  ]
}

export function meta() {
  return { title: 'JSON Schema - Remix' }
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>JSON Schema - Remix</h1>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export function ErrorBoundary({ error }) {
  console.error(error)
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="error-boundary">
          <p>
            <span className="kaboom">💥🤬</span>
            <br />
            {JSON.stringify(error.message)}
          </p>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
