# CORS Issue Troubleshooting Guide

## What is CORS?
CORS (Cross-Origin Resource Sharing) is a browser security feature that restricts requests from web pages to APIs on different domains/ports.

## Quick Fix Checklist

Before extensive debugging, verify these key points:

1. **Backend `.env` has `CORS_ORIGIN` set**
   ```bash
   # Check backend/server/.env contains:
   CORS_ORIGIN=http://localhost:3000
   ```

2. **Frontend `.env` has `REACT_APP_BACKEND_URL` set**
   ```bash
   # Check frontend/.env contains:
   REACT_APP_BACKEND_URL=http://localhost:5555
   ```

3. **Backend server is running**
   ```bash
   cd backend/server
   npm start
   ```

4. **Frontend is rebuilt after environment changes**
   ```bash
   cd frontend
   npm start  # Stop and restart if you changed .env
   ```

5. **Browser cache is cleared**
   - Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
   - Check "Cached images and files"
   - Click "Clear"

## WhatsApp Community Button CORS Error - Detailed Fix Steps

### Step 1: Verify Backend CORS Configuration

**Check that `backend/server/.env` exists and contains:**
```
CORS_ORIGIN=http://localhost:3000
MONGO_URI=your_mongodb_uri
WHATSAPP_GROUP_ARTIST_URL=https://chat.whatsapp.com/your-link
WHATSAPP_GROUP_BUSINESS_URL=https://chat.whatsapp.com/your-link
```

**Key Point:** `CORS_ORIGIN` must exactly match where your frontend is running.

### Step 2: Verify Frontend Configuration

**Check that `frontend/.env` exists and contains:**
```
REACT_APP_BACKEND_URL=http://localhost:5555
REACT_APP_WHATSAPP_GROUP_ARTIST_URL=https://chat.whatsapp.com/your-link
REACT_APP_WHATSAPP_GROUP_BUSINESS_URL=https://chat.whatsapp.com/your-link
```

**Key Point:** `REACT_APP_BACKEND_URL` must exactly match the backend URL.

### Step 3: Verify Endpoints Match

**Important:** Check that the endpoint in frontend code matches what you're calling:
```javascript
// WaitlistPage.jsx should have:
const WAITLIST_ENDPOINT = BACKEND_URL ? `${BACKEND_URL}/api/waitlist` : '/api/waitlist';
```

### Step 4: Test CORS Configuration

**Run the CORS debug endpoint:**
```bash
curl http://localhost:5555/api/cors-debug
```

**You should see something like:**
```json
{
  "corsConfig": {
    "allowedOrigins": ["http://localhost:3000"],
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "credentials": false,
    "optionsSuccessStatus": 200
  },
  "requestOrigin": "unknown",
  "originAllowed": true,
  "corsEnabled": true
}
```

### Step 5: Check Frontend Network Requests

1. Open browser DevTools (F12 or Cmd+Option+I)
2. Go to "Network" tab
3. Fill out the WhatsApp community form and click "Join WhatsApp community"
4. Find the POST request to `/api/waitlist`
5. **Check Request Headers:**
   - `Origin: http://localhost:3000` (should match CORS_ORIGIN)
   - `Content-Type: application/json`
6. **Check Response Headers:**
   - `Access-Control-Allow-Origin: http://localhost:3000` (should match request origin)
   - If missing, CORS is the issue

### Step 6: Check Console for Specific Errors

1. Open browser Console (F12)
2. Click "Join WhatsApp community" button
3. Look for errors containing:
   - **"CORS policy"** → Check CORS_ORIGIN in backend .env
   - **"No 'Access-Control-Allow-Origin' header"** → Backend not responding with correct CORS headers
   - **"CORS error: Backend is blocking this request"** → Check server logs and CORS configuration
   - **"Network error"** → Backend not running or unreachable
   - **"Backend URL is not configured"** → REACT_APP_BACKEND_URL not set in frontend .env

## Common Scenarios & How to Fix

### Scenario 1: Local Development
```
Frontend URL: http://localhost:3000
Backend URL: http://localhost:5555
Backend .env: CORS_ORIGIN=http://localhost:3000
Frontend .env: REACT_APP_BACKEND_URL=http://localhost:5555
```

### Scenario 2: Production
```
Frontend URL: https://cultgig.com
Backend URL: https://api.cultgig.com
Backend .env: CORS_ORIGIN=https://cultgig.com
Frontend .env: REACT_APP_BACKEND_URL=https://api.cultgig.com
```

### Scenario 3: Mixed (Frontend and Backend on different domains)
```
Frontend URL: https://cultgig.com
Backend URL: http://localhost:5555 (local development)
Backend .env: CORS_ORIGIN=https://cultgig.com
Frontend .env: REACT_APP_BACKEND_URL=http://localhost:5555
```

## Essential Restart Steps

After changing `.env` files, you MUST restart both services:

### Backend Restart:
```bash
cd backend/server
# Kill the running process (Ctrl+C)
npm start
```

### Frontend Restart:
```bash
cd frontend
# Kill the running process (Ctrl+C)
npm start
```

### Browser Cache Clear:
1. DevTools→ Storage → Clear all
2. Or: Ctrl+Shift+Delete → Clear browsing data

## Testing the Fix

1. Ensure backend is running and logs show "🔐 CORS Configuration"
2. Ensure frontend is running
3. Navigate to `http://localhost:3000/waitlist`
4. Fill out the form (all fields required)
5. Click "Join WhatsApp community"
6. **Expected:**
   - Form submits successfully
   - New tab opens with WhatsApp group invite
   - Success message appears on form
   - OR duplicate message if email already registered

## Debugging Backend Logs

When backend starts, you should see:
```
🔐 CORS Configuration:
   Allowed Origins: http://localhost:3000
   Tip: If CORS errors occur, verify REACT_APP_BACKEND_URL in frontend .env matches one of CORS_ORIGIN values in backend .env
```

If this doesn't appear, check that:
- `.env` file exists in `backend/server/`
- `CORS_ORIGIN` is set to a valid value
- Backend is restarted after changing `.env`

## Still Getting CORS Errors?

### Systematic Debugging Process:

1. **Verify endpoint path** - Check Network tab, POST request should go to `http://localhost:5555/api/waitlist`
2. **Check origin header** - In Network tab, Request Headers should include `Origin: http://localhost:3000`
3. **Check response headers** - Response should includeacrocess-Control-Allow-Origin header
4. **Check backend logs** - Look for any error messages
5. **Test with curl** (bypasses browser CORS):
   ```bash
   curl -X POST http://localhost:5555/api/waitlist \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","whatsapp":"9876543210","role":"artist"}'
   ```
   - If curl works but browser doesn't, it's a CORS issue
   - If curl fails too, it's a backend issue

### Test Direct Connectivity:
```bash
# Test backend is running
curl http://localhost:5555/api/health

# Test CORS configuration
curl http://localhost:5555/api/cors-debug
```

## Production Deployment Checklist

When deploying to production:

- [ ] Backend `.env` has correct `CORS_ORIGIN` (your frontend domain)
- [ ] Frontend `.env` has correct `REACT_APP_BACKEND_URL` (your backend domain)
- [ ] Both services use HTTPS
- [ ] WhatsApp group URLs are updated to real group links
- [ ] Backend and frontend are redeployed after `.env` changes
- [ ] Browser cache is cleared on first visit

## Additional Notes

- The `mode: 'cors'` in fetch explicitly tells browser to enforce CORS
- The `optionsSuccessStatus: 200` in backend handles preflight requests correctly
- Different browsers may show slightly different CORS error messages
- Safari may have additional CORS restrictions in private mode
