# Event Management Application

A modern, responsive event management application built with Next.js, TypeScript, and Tailwind CSS.


## Tech Stack

- **Frontend Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **HTTP Client**: Native Fetch API
- **State Management**: React Hooks

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Docker (optional)

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/TheXtn/event-man-front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Using Docker

1. Build the Docker image:
   ```bash
   docker build -t event-management .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 event-management
   ```


## API Integration

The application integrates with a RESTful API with the following endpoints:

- `GET /events` - Get all events (with pagination)
- `POST /events` - Create a new event
- `PUT /events/:id` - Update an event
- `DELETE /events/:id` - Delete an event

