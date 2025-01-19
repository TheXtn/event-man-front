import { CreateEventDto, UpdateEventDto } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getAllEvents(params?: {
  skip?: number;
  take?: number;
  category?: string;
}) {
  const searchParams = new URLSearchParams();
  if (params?.skip) searchParams.append('skip', params.skip.toString());
  if (params?.take) searchParams.append('take', params.take.toString());
  if (params?.category) searchParams.append('category', params.category);

  const response = await fetch(`${API_URL}/events?${searchParams.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch events');
  
  const totalCount = parseInt(response.headers.get('x-total-count') || '0', 10);
  const data = await response.json();
  
  return {
    events: data,
    totalCount
  };
}

export async function createEvent(event: CreateEventDto) {
  const response = await fetch(`${API_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) throw new Error('Failed to create event');
  return response.json();
}

export async function updateEvent(id: number, event: UpdateEventDto) {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) throw new Error('Failed to update event');
  return response.json();
}

export async function deleteEvent(id: number) {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete event');
  return response.json();
}