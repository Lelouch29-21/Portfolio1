# Portfolio1

Personal portfolio built with React + Vite.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Analytics (No UI redesign)

Analytics has been added without changing the existing portfolio UI.

Tracked metrics:
- Total website visits
- Daily website visits (last 7 days)
- Button clicks by action (Email, LinkedIn, GitHub, LeetCode Profile)

### View analytics graph page

Open this hash route in the browser:

```text
/#/analytics
```

For GitHub Pages deployment, use:

```text
https://lelouch29-21.github.io/Portfolio1/#/analytics
```

### Notes

- Counter data is stored via `api.counterapi.dev` namespace `lelouch29-21-portfolio1`.
- Visit count is tracked once per browser session to avoid duplicate increments from refreshes during the same session.
