"use client";

import { useState, useEffect } from "react";
import { CreateEventForm } from "@/components/create-event-form";
import { EventList } from "@/components/event-list";
import { EditEventForm } from "@/components/edit-event-form";
import { Event } from "@/lib/types";
import { getAllEvents, deleteEvent } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarPlus } from "lucide-react";

const ITEMS_PER_PAGE = 4;

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const fetchEvents = async () => {
    try {
      const skip = (currentPage - 1) * ITEMS_PER_PAGE;
      const { events, totalCount } = await getAllEvents({
        skip,
        take: ITEMS_PER_PAGE,
        category: categoryFilter || undefined,
      });
      setEvents(events);
      setTotalCount(totalCount);
    } catch (error) {
      toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [currentPage, categoryFilter]);

  const handleDelete = async (id: number) => {
    try {
      await deleteEvent(id);
      toast.success("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setIsEditOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditOpen(false);
    setSelectedEvent(null);
    fetchEvents();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Event Management</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <CalendarPlus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <CreateEventForm
              onSuccess={() => {
                setIsCreateOpen(false);
                fetchEvents();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <EventList
        events={events}
        onDelete={handleDelete}
        onEdit={handleEdit}
        currentPage={currentPage}
        totalPages={Math.ceil(totalCount / ITEMS_PER_PAGE)}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onCategoryFilter={setCategoryFilter}
      />

      {selectedEvent && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            <EditEventForm
              event={selectedEvent}
              onSuccess={handleEditSuccess}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}