# CORS Issue Troubleshooting Guide

## What is CORS?
CORS (Cross-Origin Resource Sharing) is a browser security feature that restricts requests from web pages to APIs on different domains/ports.

## WhatsApp Community Button CORS Error - Fix Steps

### 1. **Verify Backend Configuration**

Check that `backend/server/.env` exists and contains:
```
CORS_ORIGIN=http://localhost:3000,http://localhost:5555
MONGO_URI=your_mongodb_uri
WHATSAPP_GROUP_ARTIST_URL=https://chat.whatsapp.com/your-link
WHATSAPP_GROUP_BUSINESS_URL=https://chat.whatsapp.com/your-link
```

**Key Point:** `CORS_ORIGIN` must include the URL where your frontend is running.

### 2. **Verify Frontend Configuration**

Check that `frontend/.env` exists and contains:
```
REACT_APP_BACKEND_URL=http://localhost:5555
REACT_APP_WHATSAPP_GROUP_ARTIST_URL=https://chat.whatsapp.com/your-link
REACT_APP_WHATSAPP_GROUP_BUSINESS_URL=https://chat.whatsapp.com/your-link
```

**Key Point:** `REACT_APP_BACKEND_URL` must match one of the origins in backend `CORS_ORIGIN`.

### 3. **Common Scenarios**

#### Local Development
- **Frontend URL:** `http://localhost:3000`
- **Backend URL:** `http://localhost:5555`
- **Backend CORS_ORIGIN:** `http://localhost:3000`

#### Production
- **Frontend URL:** `https://cultgig.com`
- **Backend URL:** `https://api.cultgig.com`
- **Backend CORS_ORIGIN:** `https://cultgig.com`

#### Mixed (Frontend + Backend on different domains)
- **Backend CORS_ORIGIN:** Must include the exact frontend domain

### 4. **Debugging Steps**

#### Step 1: Check Browser Console
1. Open browser DevTools (F12 or Cmd+Option+I)
2. Go to "Console" tab
3. Click "Join WhatsApp community" button
4. Look for error messages that mention:
   - "CORS policy"
   - "No 'Access-Control-Allow-Origin' header"
   - "Unable to reach server"

#### Step 2: Check Network Tab
1. In DevTools, go to "Network" tab
2. Click "Join WhatsApp community" button
3. Look for the POST request to `/api/waitlist`
4. Check the response headers for:
   - `Access-Control-Allow-Origin: <your-frontend-domain>`
   - `Access-Control-Allow-Methods: GET, POST, OPTIONS`

#### Step 3: Verify Backend is Running
- Run: `curl -X GET http://localhost:5555/api/health`
- You should see: `{"status": "healthy", "service": "CultGig Node.js API", "version": "1.0.0"}`

### 5. **Configuration Changes - Restart Required**

After changing `.env` files:

**Backend:**
- Restart the Node.js server
- If using `npm start`, stop and run again

**Frontend:**
- Stop the development server (Ctrl+C)
- Run `npm start` again
- Clear browser cache (Ctrl+Shift+Delete)

### 6. **Test the Fix**

1. Ensure backend is running
2. Ensure frontend is running with correct .env
3. Navigate to `/waitlist` page
4. Fill in the form and click "Join WhatsApp community"
5. You should see a success message OR a WhatsApp invite link

### 7. **Production Deployment**

When deploying to production:
1. Set `CORS_ORIGIN` to your frontend domain
2. Set `REACT_APP_BACKEND_URL` to your backend domain
3. Update WhatsApp group URLs to valid chat.whatsapp.com links
4. Rebuild and deploy both frontend and backend

### 8. **Still Not Working?**

Check the improved error messages:
- "CORS error: Backend is blocking this request" → Check `CORS_ORIGIN` setting
- "Backend URL is not configured" → Set `REACT_APP_BACKEND_URL` in frontend `.env`
- "Network error" → Verify backend is running and accessible
- "Unable to reach server" → Check network connectivity and backend logs

### 9. **Additional Notes**

- The `credentials: 'omit'` in fetch ensures cookies aren't sent (since we don't use them)
- `mode: 'cors'` explicitly tells browser to enforce CORS
- `optionsSuccessStatus: 200` in backend handles preflight requests correctly
