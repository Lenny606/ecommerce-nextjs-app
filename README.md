This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# ecommerce-nextjs-app
- Typescript
- shadcn
- Prisma 
  npm i prisma --save-dev
  npx prisma init --datasource-provider sqlite

## prisma
migrate:
- npx prisma migrate dev --name init

## stripe
install BE:
- npm i --save stripe @stripe/stripe-js next
install FE:
- npm i @stripe/react-stripe-js