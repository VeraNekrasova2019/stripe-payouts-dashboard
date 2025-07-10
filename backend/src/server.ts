import express from 'express';
import cors from 'cors';
import { handler } from './lambda';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Simplified mock event creator for local development
const createMockEvent = (req: express.Request): any => {
  return {
    httpMethod: req.method,
    path: req.path,
    pathParameters: req.params,
    queryStringParameters: req.query as Record<string, string>,
    headers: req.headers as Record<string, string>,
    body: req.body ? JSON.stringify(req.body) : null,
    isBase64Encoded: false,
    multiValueHeaders: {},
    multiValueQueryStringParameters: {},
    requestContext: {} as any,
    resource: '',
    stageVariables: {}
  };
};

// Route all requests through the Lambda handler
app.all('*', async (req: express.Request, res: express.Response) => {
  try {
    const event = createMockEvent(req);
    const result = await handler(event);
    
    // Set headers
    if (result.headers) {
      Object.entries(result.headers).forEach(([key, value]) => {
        res.set(key, value);
      });
    }
    
    // Send response
    res.status(result.statusCode);
    
    if (result.body) {
      const body = typeof result.body === 'string' ? result.body : JSON.stringify(result.body);
      res.send(body);
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('📊 Available endpoints:');
  console.log('  GET /balance - Get account balance');
  console.log('  GET /payouts - List payouts (with optional filters)');
  console.log('  POST /payouts - Create new payout');
  console.log('  GET /payouts/{id} - Get specific payout');
});
