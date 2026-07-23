"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import StatsBar from "@/components/stats-bar";
import ContactForm from "@/components/contact-form";
import ContactList from "@/components/contact-list";
import { Contact } from "@/types/contact";
import { Toaster, toast } from "sonner";
import { getContacts, createContact, deleteContact, toggleFavorite } from "@/lib/data";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (e) {
        console.error("Failed to load contacts", e);
        toast.error("Failed to load contacts from database");
      } finally {
        setIsLoaded(true);
      }
    }
    load();
  }, []);

  const handleAddContact = async (newContact: { name: string; phone: string }) => {
    try {
      const contact = await createContact(newContact.name, newContact.phone);
      setContacts((prev) => [contact, ...prev]);
    } catch (e) {
      console.error(e);
      toast.error("Failed to save contact to database");
    }
  };

  const handleDeleteContact = async (id: string) => {
    const previous = [...contacts];
    setContacts((prev) => prev.filter((c) => c.id !== id));
    try {
      await deleteContact(id);
    } catch (e) {
      console.error(e);
      setContacts(previous);
      toast.error("Failed to delete contact from database");
    }
  };

  const handleToggleFavorite = async (id: string) => {
    const contact = contacts.find((c) => c.id === id);
    if (!contact) return;
    const nextFavorite = !contact.isFavorite;

    // Optimistic update
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFavorite: nextFavorite } : c))
    );

    try {
      await toggleFavorite(id, nextFavorite);
    } catch (e) {
      console.error(e);
      // Rollback
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isFavorite: !nextFavorite } : c))
      );
      toast.error("Failed to update favorite status");
    }
  };

  const recentCount = contacts.filter((c) => {
    const createdDate = new Date(c.createdAt);
    const today = new Date();
    return (
      createdDate.getDate() === today.getDate() &&
      createdDate.getMonth() === today.getMonth() &&
      createdDate.getFullYear() === today.getFullYear()
    );
  }).length;

  const favoriteCount = contacts.filter((c) => c.isFavorite).length;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-foreground flex flex-col">
      <Navbar />
      <Toaster position="bottom-center" />
      
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Directory</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your essential connections with minimal noise.
            </p>
          </div>

          <StatsBar
            totalContacts={contacts.length}
            favoriteCount={favoriteCount}
            recentCount={recentCount}
          />

          <ContactForm onAddContact={handleAddContact} />

          <div className="border-t border-border/40 pt-6">
            {isLoaded ? (
              <ContactList
                contacts={contacts}
                onDelete={handleDeleteContact}
                onToggleFavorite={handleToggleFavorite}
              />
            ) : ( 
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}