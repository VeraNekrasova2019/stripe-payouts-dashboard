# 💳 Stripe Connect Payouts Dashboard

A beautiful, full-stack **Stripe Connect Payouts Dashboard** built with React and Node.js, featuring a pixel-perfect UI that matches the original Figma design.

![Dashboard Preview](./images/cancel-icon.svg)

## 🚀 **Live Demo**

- **Frontend**: http://localhost:3001/
- **Backend API**: http://localhost:3002/

## 📋 **Features**

### **Frontend (React + TypeScript)**
- ✅ **Pixel-perfect UI** matching Figma mockup
- ✅ **Responsive design** with Tailwind CSS
- ✅ **Real-time data** from backend API
- ✅ **Interactive components** (filters, pagination, export)
- ✅ **TypeScript** for type safety
- ✅ **Vite** for fast development

### **Backend (Node.js + Express)**
- ✅ **RESTful API** with Express server
- ✅ **AWS Lambda ready** for serverless deployment
- ✅ **Stripe integration** ready (currently mocked)
- ✅ **TypeScript** throughout
- ✅ **CORS enabled** for frontend communication

### **Dashboard Components**
- 💰 **Balance Card** - Shows available balance with formatted currency
- 📊 **Payouts Table** - Paginated list with status badges
- 🔍 **Smart Filters** - Status, amount, method, date filtering
- 📤 **Export Functionality** - Ready for CSV/Excel export
- 🎨 **Custom UI Components** - Button, Badge, Filter components

## 🛠️ **Tech Stack**

### **Frontend**
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **Headless UI** - Accessible components

### **Backend**
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type-safe backend
- **Stripe SDK** - Payment processing
- **AWS Lambda** - Serverless deployment ready

## 📦 **Installation & Setup**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git

### **1. Clone Repository**
```bash
git clone https://github.com/VeraNekrasova2019/stripe-payouts-dashboard.git
cd stripe-payouts-dashboard
```

### **2. Install Dependencies**
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

### **3. Run Development Servers**

#### **Option A: Run Both (Recommended)**
```bash
# From project root
npm run dev
```
This starts both frontend (port 3001) and backend (port 3002)

#### **Option B: Run Separately**
```bash
# Frontend only
npm run dev:frontend

# Backend only  
npm run dev:backend
```

### **4. Open Dashboard**
Visit http://localhost:3001/ in your browser

## 📁 **Project Structure**

```
stripe-payouts-dashboard/
├── 📱 frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── balance/         # Balance card component
│   │   │   ├── payouts/         # Payouts table components
│   │   │   └── ui/              # Reusable UI components
│   │   ├── services/            # API service layer
│   │   ├── types/               # TypeScript definitions
│   │   └── utils/               # Utility functions
│   └── package.json
├── 🔧 backend/                  # Node.js backend API
│   ├── src/
│   │   ├── lambda.ts           # AWS Lambda handler
│   │   ├── server.ts           # Express development server
│   │   ├── stripe.ts           # Stripe service integration
│   │   └── types.ts            # Backend type definitions
│   └── package.json
├── 🖼️ images/                   # Figma assets
└── 📚 requirements.md           # Detailed requirements
```

## 🔌 **API Endpoints**

### **Balance**
- `GET /balance` - Get account balance

### **Payouts**  
- `GET /payouts` - List payouts (with filtering)
- `POST /payouts` - Create new payout
- `GET /payouts/{id}` - Get specific payout

### **Query Parameters**
- `status` - Filter by payout status
- `limit` - Number of results per page
- `starting_after` - Pagination cursor

## 🎨 **Design System**

### **Colors**
- **Primary**: `#444444` (Dark gray)
- **Secondary**: `#717171` (Medium gray)  
- **Success**: `#10B981` (Green badges)
- **Background**: `#FFFFFF` (White)
- **Border**: `#E5E7EB` (Light gray)

### **Typography**
- **Primary Font**: SF Pro Display
- **Fallback**: Inter, system fonts
- **Weights**: 400 (Regular), 590 (Medium), 700 (Bold)

## 🚀 **Deployment**

### **Frontend (Vercel/Netlify)**
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### **Backend (AWS Lambda)**
```bash
cd backend
npm run deploy
```

## 🔧 **Environment Variables**

### **Backend (.env)**
```env
STRIPE_SECRET_KEY=sk_test_...        # Stripe secret key
PORT=3002                            # Development server port
```

## 🧪 **Testing**

```bash
# Frontend tests
cd frontend && npm test

# Backend tests  
cd backend && npm test

# All tests
npm run test
```

## 📈 **Current Status**

- ✅ **Frontend**: Complete with mock data integration
- ✅ **Backend**: API endpoints ready with mock responses
- ⏳ **Stripe Integration**: Code ready, needs API keys
- ⏳ **Real Data**: Switch from mock to live Stripe data
- ⏳ **Deployment**: Ready for AWS Lambda deployment

## 🔄 **Next Steps**

1. **Add Stripe API Keys** - Connect to real Stripe account
2. **Enable Live Data** - Switch from mock to real API calls  
3. **Add Authentication** - User login and session management
4. **Enhanced Filtering** - Date ranges, advanced search
5. **Export Functionality** - CSV/Excel export implementation
6. **Testing Suite** - Unit and integration tests
7. **Deployment** - AWS Lambda + CloudFront deployment

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 **Support**

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using React, Node.js, and Stripe**
