# Financial Tracker Security

A secure financial tracking application with user authentication.

## Project Structure

- `client/` - React Native Expo mobile application
- `server/` - Node.js/Express backend API

## Finding Your Computer's IP Address

Before setting up the application, you need to find your computer's IP address on your local network:

### Windows:
1. Open Command Prompt
2. Type `ipconfig` and press Enter
3. Look for "IPv4 Address" under your active network connection
4. It should look like: `192.168.x.x` or `10.0.x.x`

### macOS:
1. Open Terminal
2. Type `ifconfig` and press Enter
3. Look for "inet" under your active network connection (usually en0 or en1)
4. It should look like: `192.168.x.x` or `10.0.x.x`

## Server Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory:
   ```
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   HOST=0.0.0.0

   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_db_password
   DB_NAME=financial_tracker

   # JWT Configuration
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRES_IN=24h

   # Client URL for CORS
   CLIENT_URL=*

   # Your IP address (replace with your actual IP)
   YOUR_IP_ADDRESS=192.168.x.x
   ```

4. **Important:** Replace `192.168.x.x` with your actual IP address.

5. Set up the database in MySQL Workbench:
   - Open MySQL Workbench
   - Connect to your MySQL server
   - Open and run the SQL script at `server/src/database/init.sql`

6. Start the server:
   ```
   npm run dev
   ```

## Client Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Update the API configuration:
   - Open `src/config/api.ts`
   - Replace the `API_HOST` value with your computer's IP address

4. Start the development server:
   ```
   npm start
   ```

5. Connect from your mobile device:
   - Install the Expo Go app on your phone
   - Make sure your phone is on the same Wi-Fi network as your computer
   - Scan the QR code from the terminal or Expo Dev Tools

## Testing API Connection

To verify your server is accessible from your phone:
1. With the server running, open a browser on your phone
2. Navigate to `http://YOUR_IP_ADDRESS:5000/api/health`
3. You should see a JSON response: `{"status":"OK","message":"API is running"}`

## Security Features

- Password hashing with bcrypt
- JWT authentication
- Input validation
- Rate limiting
- Account lockout after failed login attempts
- Protected API routes

## API Endpoints

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - User login
- **GET /api/auth/profile** - Get user profile (requires authentication)