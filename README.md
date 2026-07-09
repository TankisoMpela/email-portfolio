# Email Portfolio Application

This is a Node.js utility designed to design, test, and send professional, responsive HTML developer portfolios. It is set up with Nodemailer and Mailpit for safe local testing before sending real emails via Gmail.

## 🚀 Setup Instructions

### 1. Install Dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```

### 2. Configure Environment Variables
A `.env` file is generated locally with the following keys. Fill in your own Gmail address:
```ini
# SMTP Configuration
# Set to 'development' to send to Mailpit (localhost:1025)
# Set to 'production' to send via Gmail (smtp.gmail.com)
NODE_ENV=development

# Gmail Account Credentials (used in production)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xkcx ohvz gxct xgxt

# Email Send Settings
RECIPIENT_EMAIL=bloemfontein@3dom.agency
PORTFOLIO_URL=https://tankiso-portfolio.vercel.app
```

---

## 🛠️ Local Testing with Mailpit (Development Mode)

Mailpit acts as a local SMTP mail catcher. It intercepts all emails sent by your app, meaning no real emails are sent out to recipients during testing.

### 1. Start Mailpit via Docker
Run the following command in your terminal to download and spin up Mailpit in the background:
```bash
docker run -d --name mailpit -p 1025:1025 -p 8025:8025 axllent/mailpit
```

* **SMTP Port:** `1025` (where Nodemailer sends mail)
* **Web UI Port:** `8025` (where you view the inbox)

### 2. Send a Test Email
Ensure `NODE_ENV=development` is set in your `.env` file, then run:
```bash
node send.js
```

### 3. Check the Sent Email
Open your browser and navigate to:
👉 **[http://localhost:8025](http://localhost:8025)**

Here, you'll see a clean, modern web interface showing the exact rendered HTML email, responsive styles, headers, and click logs.

### 4. Stopping Mailpit
To stop the local mail catcher container:
```bash
docker stop mailpit && docker rm mailpit
```

---

## ✉️ Sending the Real Email (Production Mode)

Once you're satisfied with how the email renders in Mailpit:

1. Update your `.env` file:
   * Change `NODE_ENV=production`
   * Confirm `GMAIL_USER` is set to your correct Gmail address.
   * Verify the `RECIPIENT_EMAIL` (e.g., `bloemfontein@3dom.agency` or `brendon@3dom.agency`).
   * Update `PORTFOLIO_URL` to point to your live, deployed portfolio website.
2. Run the command to send it live:
   ```bash
   node send.js
   ```

---

## 📂 Project Structure

* `send.js` - Main entry script that configures SMTP dynamically, parses the HTML, injects variables, and triggers sending.
* `templates/`
  * `send-proof-of-work.html` - Classy, minimal, table-based responsive HTML email tailored specifically to reply to 3DOM.
* `.env` - Environment configurations (secret, git-ignored).
* `.gitignore` - Prevents node modules and `.env` secrets from leaking.
