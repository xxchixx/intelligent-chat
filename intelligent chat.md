# Chat-Based Web Application

## Overview
This project is a chat-based web application with user authentication, session-based chats, and AI interaction powered by a Large Language Model (LLM). It uses Next.js, Tailwind CSS, PostgreSQL with Prisma, NextAuth.js for authentication, and OpenAI for AI interactions.

## Tech Stack
- **Frontend:** React (with Next.js for SSR & API routes), Tailwind CSS for styling
- **Backend:** Next.js API routes with PostgreSQL (via Prisma ORM)
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL
- **LLM Integration:** OpenAI API

## Features
- **User Authentication:** Users can sign up and log in.
- **Chat Sessions:** Users can have session-based chats with AI.
- **LLM Interaction:** Sends user messages to OpenAI and displays responses.
- **Chat Saving:** User messages are stored in PostgreSQL for future reference.

## Development Plan
1. **Set Up the Project:** Initialize Next.js, Tailwind, Prisma
2. **Implement Authentication:** Use NextAuth.js for user login/signup
3. **Build Chat Interface:** Create UI for chat with session handling
4. **Integrate LLM API:** Add backend route for OpenAI interaction
5. **Store Chats in DB:** Save chat history in PostgreSQL
6. **Testing & Deployment:** Final testing, deployment, and GitHub submission

## Setup
TO BE DONE
### Prerequisites
Before running the project, make sure you have the following installed:
- **Node.js** (Recommended version: v16 or higher)
- **PostgreSQL** (You'll need to have PostgreSQL running locally or use a cloud service)

### Installing Dependencies
1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>

2. Change to the project directory:
    cd <project-directory>

3. Install the project dependencies:
    npm install

### Database Configuration
1. Create a PostgreSQL database for the project.

2. Create a .env file in the root directory of your project and add the following environment variables:
    DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database-name>?schema=public
    NEXTAUTH_SECRET=<your-nextauth-secret>
    NEXTAUTH_URL=http://localhost:3000
    OPENAI_API_KEY=<your-openai-api-key>

3. Run the Prisma migration to set up the database schema:
    npx prisma migrate dev

### Running the Development Server
1. Start the Next.js development server:
    npm run dev

2. The application will be available at http://localhost:3000.