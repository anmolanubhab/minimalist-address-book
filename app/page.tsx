"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import StatsBar from "@/components/stats-bar";
import ContactForm from "@/components/contact-form";
import ContactList from "@/components/contact-list";
import { Contact } from "@/types/contact";
import { Toaster } from "sonner";

const INITIAL_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Sarah Connor",
    phone: "(310) 555-0199",
    createdAt: new Date().toISOString(),
    isFavorite: true,
  },
  {
    id: "2",
    name: "Alex Mercer",
    phone: "+1 (212) 555-0143",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    isFavorite: false,
  },
  {
    id: "3",
    name: "Marcus Aurelius",
    phone: "07700 900077",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    isFavorite: true,
  },
];

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("quickbook_contacts");
    if (stored) {
      try {
        setContacts(JSON.parse(stored));
      } catch (e) {
        setContacts(INITIAL_CONTACTS);
      }
    } else {
      setContacts(INITIAL_CONTACTS);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("quickbook_contacts", JSON.stringify(contacts));
    }
  }, [contacts, isLoaded]);

  const handleAddContact = (newContact: { name: string; phone: string }) => {
    const contact: Contact = {
      id: Date.now().toString(),
      name: newContact.name,
      phone: newContact.phone,
      createdAt: new Date().toISOString(),
      isFavorite: false,
    };
    setContacts((prev) => [contact, ...prev]);
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
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
            <ContactList
              contacts={contacts}
              onDelete={handleDeleteContact}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        </div>
      </main>
    </div>
  );
}