### Intelligent Chat

This is a full-stack AI-powered application that allows users to create an account, authenticate securely, and interact with an AI assistant through a modern chat interface. Conversations are stored in a PostgreSQL database and organized into chat sessions, enabling users to revisit previous discussions.

## Key Features
* __User Authentication__:Secure user registration and login
* __AI powered Conversations__:Integration with the OpenAI API with real-time chat interface
* __Chat Session Management__:Persistent data across user sessions
* __Clean User Interface__:Responsive user interface
* __Database Integration__:Structured storage of users and chat data

## Tech Stack
* __Frontend__: React, Next.js, Tailwind CSS
* __Backend__: Next.js API Routes, NextAuth.js
* __Database__: PostgreSQL, Prisma ORM
* __AI Integration__: OpenAI API

## Requirements 

Before running the application, ensure you have:
* Node.js installed
* PostgreSQL is installed and running
* An OpenAI API key


__Clone the Repository__
* git clone <repository-url>
* cd intelligent-chat
  
__Install Dependencies__
* npm install

__Configure Environment Variables__
Create a .env file in the project root and configure the required variables:
* DATABASE_URL=your_postgresql_connection_string
* NEXTAUTH_SECRET=your_secret
* OPENAI_API_KEY=your_openai_api_key

__Run the Application__
npm run dev

Open: http://localhost:3000
