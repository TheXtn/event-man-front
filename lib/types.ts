export interface Event {
  id: number;
  title: string;
  description?: string;
  date: string;
  category: string;
}

export interface CreateEventDto {
  title: string;
  description?: string;
  date: string;
  category: string;
}

export interface UpdateEventDto {
  title?: string;
  description?: string;
  date?: string;
  category?: string;
}