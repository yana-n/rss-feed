# Telegram RSS Feed Project

This project is a web application that displays messages from a Telegram channel in an RSS feed-like format. The application includes filtering options for messages with or without images. The project is built using **TypeScript**, **SCSS**, and integrates **ESLint** and **Prettier** for linting and formatting.

## Features

- Display Telegram channel messages.
- Filter messages with images, text-only, or display all.
- SCSS for styling, including a modular structure.
- ESLint and Prettier for linting and code formatting.
- Customizable Toaster notifications for errors and information.

## Installation

To get started with the project, follow these steps:

### Clone the repository:

```bash
git clone https://github.com/your-username/rss-feed.git
```

### Navigate to the project directory:

```bash
cd rss-feed
```

### Install dependencies:

```bash
npm install
```

### Set up environment variables:

Create a .env file in the root of the project and add your Telegram bot token and channel ID.

```bash
VITE_TG_API_TOKEN=YOUR_BOT_TOKEN
VITE_TG_CHANNEL_ID=YOUR_CHANNEL_ID
VITE_TG_BASE_URL=https://api.telegram.org
```

### To run the project locally, use the following command:

```bash
npm run dev
```

This will start the Vite development server, and you can view the application in your browser at http://localhost:3000.
