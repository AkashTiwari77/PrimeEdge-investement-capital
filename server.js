/* eslint-env node */
import "dotenv/config";
import http from "http";
import process from "process";
import { handleRequest } from "./routes.js";

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  handleRequest(req, res);
});

server.listen(PORT, () => {
  console.log(`\n╔════════════════════════════════════════════════════════╗`);
  console.log(`║  PrimeEdge Capital API Server                         ║`);
  console.log(`║  Running on http://localhost:${PORT}                             ║`);
  console.log(`║  Database: database.json                              ║`);
  console.log(`╚════════════════════════════════════════════════════════╝\n`);
  console.log(`Available Endpoints:`);
  console.log(`  POST   /api/login              - User login`);
  console.log(`  POST   /api/register           - User registration`);
  console.log(`  GET    /api/user?id=userId    - Get user profile`);
  console.log(`  POST   /api/contact            - Submit contact form`);
  console.log(`  POST   /api/consultation       - Request consultation`);
  console.log(`  GET    /api/consultation?userId=id - Get consultations`);
  console.log(`  POST   /api/subscription       - Create subscription`);
  console.log(`  GET    /api/subscription?userId=id - Get subscriptions`);
  console.log(`  GET    /api/leads              - Get all leads (admin)`);
  console.log(`  GET    /api/contact-submissions - Get submissions (admin)`);
  console.log(`  GET    /api/pricing            - Get pricing plans`);
  console.log(`  GET    /api/health             - Health check\n`);
});
