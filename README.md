# OnDrive Realty - NWMLS-Integrated Real Estate Platform

A full-stack real estate website with NWMLS (Northwest Multiple Listing Service) integration, built with Next.js, Express, Node.js, and MongoDB.

## 🏠 Features

- **9 Complete Pages**: Home, Listings, Listing Detail, About, Agents, Services, Blog, Contact, Auth
- **NWMLS Integration**: Automatic property listing synchronization from NWMLS database
- **Real-time Property Data**: Listings updated every 30 minutes via automated sync
- **Advanced Search & Filters**: Search by location, price range, property type, beds, baths
- **User Authentication**: JWT-based authentication with role-based access control
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Image Gallery**: Multi-image property galleries with navigation
- **Contact Forms**: Integrated contact forms with email notifications
- **Agent Management**: Agent profiles with listing associations
- **Blog System**: Full-featured blog for market insights and tips

## 📋 Tech Stack

### Frontend
- **Next.js 14** - React framework with file-based routing
- **React 18** - UI library
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Node-Cron** - Scheduled tasks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)
- NWMLS API credentials (for production)
- Google Maps API key (optional, for maps)

### Installation

1. **Clone the repository**
```bash
cd e:\OneDrive_Realty_Project
```

2. **Install Backend Dependencies**
```powershell
cd backend
npm install
```

3. **Install Frontend Dependencies**
```powershell
cd ..\frontend
npm install
```

### Configuration

#### Backend Configuration

Edit `backend\.env`:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/ondrive_realty

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# NWMLS API (Replace with your credentials)
NWMLS_API_URL=https://api.nwmls.com/v1
NWMLS_CLIENT_ID=your_client_id
NWMLS_CLIENT_SECRET=your_client_secret
NWMLS_API_KEY=your_api_key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin@ondriverealty.com

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

#### Frontend Configuration

Edit `frontend\.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Running the Application

#### Start MongoDB (if local)
```powershell
# Windows - start MongoDB service
net start MongoDB
```

#### Start Backend Server
```powershell
cd backend
npm run dev
```
Backend will run on http://localhost:5000

#### Start Frontend Server
```powershell
cd frontend
npm run dev
```
Frontend will run on http://localhost:3000

## 📁 Project Structure

```
OnDrive_Realty_Project/
├── backend/
│   ├── models/              # MongoDB schemas
│   │   ├── Property.js
│   │   ├── Agent.js
│   │   ├── User.js
│   │   ├── BlogPost.js
│   │   └── SyncMeta.js
│   ├── routes/              # API endpoints
│   │   ├── auth.js
│   │   ├── listings.js
│   │   ├── agents.js
│   │   ├── blog.js
│   │   ├── contact.js
│   │   └── admin.js
│   ├── services/            # Business logic
│   │   └── nwmlsSync.js    # NWMLS integration
│   ├── middleware/          # Custom middleware
│   │   └── auth.js
│   ├── utils/               # Helper functions
│   │   ├── jwt.js
│   │   └── email.js
│   ├── server.js            # Express app
│   └── package.json
│
├── frontend/
│   ├── pages/               # Next.js pages (file-based routing)
│   │   ├── index.js         # Home page
│   │   ├── listings/
│   │   │   ├── index.js     # All listings
│   │   │   └── [id].js      # Listing detail
│   │   ├── agents/
│   │   │   └── index.js     # All agents
│   │   ├── blog/
│   │   │   ├── index.js     # Blog listing
│   │   │   └── [slug].js    # Blog post
│   │   ├── auth/
│   │   │   ├── login.js
│   │   │   └── register.js
│   │   ├── about.js
│   │   ├── services.js
│   │   ├── contact.js
│   │   ├── _app.js          # App wrapper
│   │   └── _document.js     # HTML document
│   ├── components/          # Reusable components
│   │   ├── Layout.js
│   │   ├── ListingCard.js
│   │   ├── SearchBar.js
│   │   └── Pagination.js
│   ├── context/             # React context
│   │   └── AuthContext.js
│   ├── lib/                 # Libraries & utilities
│   │   └── api.js          # Axios instance
│   ├── styles/              # Global styles
│   │   └── globals.css
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── package.json
```

## 🔌 NWMLS Integration

### How It Works

1. **Authentication**: The backend authenticates with NWMLS API using OAuth2
2. **Automatic Sync**: 
   - Initial sync runs 10 seconds after server start
   - Incremental sync runs every 30 minutes (configurable)
   - Full sync can be triggered manually via admin API
3. **Data Mapping**: NWMLS listings are mapped to our MongoDB schema
4. **Mock Data**: In development (without NWMLS credentials), mock data is generated

### NWMLS API Setup

To enable real NWMLS integration:

1. **Obtain Credentials**: Contact NWMLS to get API access
2. **Update Environment Variables**: Add credentials to `backend\.env`
3. **Configure Endpoints**: Update `NWMLS_API_URL` in sync service
4. **Test Connection**: Monitor backend logs for sync status

### Mock Data (Development)

Without NWMLS credentials, the system generates 20 mock listings on startup for development/testing.

## 🔐 Authentication & Security

- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: Bcrypt with salt rounds
- **Protected Routes**: Middleware-based route protection
- **Role-Based Access**: Admin, Agent, and Buyer roles
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS**: Cross-origin resource sharing configured
- **Helmet**: Security headers via Helmet.js

## 📧 Email Configuration

The contact form and notifications use Nodemailer. For Gmail:

1. Enable 2-factor authentication
2. Generate an App Password
3. Add credentials to `backend\.env`

## 🗺️ Google Maps Integration

To enable maps on listing detail pages:

1. Get a Google Maps JavaScript API key
2. Add to `frontend\.env.local`
3. Enable required APIs in Google Cloud Console

## 📊 Admin Features

Admin routes (requires admin role):

- `POST /api/admin/sync` - Trigger manual NWMLS sync
- `GET /api/admin/sync/status` - Get sync history and status
- `GET /api/admin/stats` - Get dashboard statistics

## 🌐 API Endpoints

### Public Endpoints

- `GET /api/listings` - Get all listings (with filters)
- `GET /api/listings/featured` - Get featured listings
- `GET /api/listings/:id` - Get single listing
- `GET /api/agents` - Get all agents
- `GET /api/agents/:id` - Get single agent
- `GET /api/blog` - Get blog posts
- `GET /api/blog/:slug` - Get single blog post
- `POST /api/contact` - Submit contact form
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Protected Endpoints

- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/admin/*` - Admin operations (requires admin role)

## 🎨 Customization

### Branding

- Update logo and colors in `frontend/tailwind.config.js`
- Modify company info in `frontend/components/Layout.js` footer
- Update contact details in `frontend/pages/contact.js`

### Styling

- Primary colors defined in Tailwind config
- Global styles in `frontend/styles/globals.css`
- Component-level styling with Tailwind utility classes

## 🚢 Deployment

### Frontend (Next.js)

**Vercel (Recommended)**:
```powershell
cd frontend
npm install -g vercel
vercel
```

**Environment Variables on Vercel**:
- Add `NEXT_PUBLIC_API_URL` (your backend URL)
- Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### Backend (Express + MongoDB)

**Options**:
1. **Heroku**: Easy deployment with MongoDB Atlas
2. **Azure App Service**: Enterprise-grade hosting
3. **AWS EC2/ECS**: Full control and scalability
4. **DigitalOcean**: Cost-effective VPS option

**MongoDB Atlas** (Recommended for production):
1. Create free cluster at mongodb.com/cloud/atlas
2. Whitelist IP addresses
3. Update `MONGODB_URI` in production environment

### Production Checklist

- [ ] Replace JWT_SECRET with strong secret
- [ ] Configure production MongoDB URI
- [ ] Add NWMLS production credentials
- [ ] Setup email service (SendGrid/Mailgun)
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS for production domains
- [ ] Setup error monitoring (Sentry)
- [ ] Configure backups for MongoDB
- [ ] Setup CI/CD pipeline
- [ ] Add rate limiting and DDoS protection

## 🧪 Testing

### Backend Testing
```powershell
cd backend
npm test
```

### Frontend Testing
```powershell
cd frontend
npm test
```

## 📝 Sample Data

To populate the database with sample blog posts and agents, you can create seed scripts or use the admin interface.

## 🛠️ Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `net start MongoDB`
- Check connection string in `.env`
- Verify network connectivity

### NWMLS Sync Errors
- Check NWMLS credentials
- Verify API endpoint URL
- Monitor backend logs for detailed errors

### Build Errors
- Clear node_modules: `rm -rf node_modules; npm install`
- Clear Next.js cache: `rm -rf frontend/.next`

## 📄 License

This project is proprietary software for OnDrive Realty.

## 🤝 Support

For support or questions:
- Email: support@ondriverealty.com
- Phone: (555) 123-4567

## 🎯 Roadmap

- [ ] Advanced search with map integration
- [ ] Saved searches and email alerts
- [ ] Mortgage calculator
- [ ] Virtual tours integration
- [ ] Mobile apps (iOS/Android)
- [ ] Agent performance dashboard
- [ ] Client portal with document sharing
- [ ] Multi-language support

---

**Built with ❤️ for OnDrive Realty**
