# Stripe Payouts Backend

AWS Lambda-based backend for the Stripe Connect Payouts Dashboard.

## Features

- 🎯 AWS Lambda serverless architecture
- 🔌 Stripe Connect API integration
- 📊 Balance and payout management
- 🛡️ CORS enabled for frontend integration
- 🚀 Easy local development

## API Endpoints

### Balance
- `GET /balance` - Get account balance

### Payouts
- `GET /payouts` - List payouts (with optional filters)
- `POST /payouts` - Create new payout
- `GET /payouts/{id}` - Get specific payout

### Query Parameters for `/payouts`
- `status` - Filter by status (paid, pending, failed, etc.)
- `limit` - Number of results to return (default: 10)
- `starting_after` - Pagination cursor
- `ending_before` - Pagination cursor

## Development

### Prerequisites
- Node.js 18+
- AWS CLI configured (for deployment)
- Stripe account with Connect enabled

### Environment Variables
Create a `.env` file in the backend directory:
```
STRIPE_SECRET_KEY=sk_test_...
PORT=3001
```

### Local Development
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

The server will run on `http://localhost:3001`

### Building
```bash
# Build TypeScript
npm run build

# Build for Lambda deployment
npm run build:lambda
```

### Deployment
```bash
# Deploy to AWS Lambda
npm run deploy

# Deploy to specific stage
npx serverless deploy --stage production
```

## Mock Data

The application currently uses mock data for development. To use real Stripe data:

1. Set your `STRIPE_SECRET_KEY` environment variable
2. Uncomment the actual Stripe service calls in `lambda.ts`
3. Comment out the mock data responses

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   AWS Lambda     │    │   Stripe API    │
│   (React)       │────│   (Node.js)      │────│   (Connect)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## File Structure

```
backend/
├── src/
│   ├── lambda.ts      # Main Lambda handler
│   ├── server.ts      # Local development server
│   ├── stripe.ts      # Stripe service wrapper
│   └── types.ts       # TypeScript type definitions
├── dist/              # Built files
├── package.json
├── serverless.yml     # Serverless Framework config
└── tsconfig.json      # TypeScript config
```

## Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "error": "Error message here"
}
```

Success responses:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```
