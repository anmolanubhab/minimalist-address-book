"use client";

import { useState } from "react";
import { Contact } from "@/types/contact";
import ContactCard from "./contact-card";
import { Input } from "@/components/ui/input";
import { Search, ArrowUpDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";

interface ContactListProps {
  contacts: Contact[];
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function ContactList({ contacts, onDelete, onToggleFavorite }: ContactListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "newest">("name");

  const filteredContacts = contacts
    .filter((contact) => {
      const query = searchQuery.toLowerCase();
      return (
        contact.name.toLowerCase().includes(query) ||
        contact.phone.replace(/[^0-9]/g, "").includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl bg-card border-border/80 focus-visible:ring-indigo-500"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setSortBy((prev) => (prev === "name" ? "newest" : "name"))}
          className="h-11 px-4 rounded-xl border-border flex items-center gap-2 text-sm font-medium shrink-0"
        >
          <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
          Sort: {sortBy === "name" ? "A-Z" : "Newest"}
        </Button>
      </div>

      <div className="min-h-[300px] flex flex-col">
        {filteredContacts.length > 0 ? (
          <div className="grid gap-3">
            <AnimatePresence mode="popLayout">
              {filteredContacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onDelete={onDelete}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 border border-dashed border-border rounded-2xl bg-card/40">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-foreground text-center">No contacts found</h3>
            <p className="text-sm text-muted-foreground text-center max-w-xs mt-1">
              {searchQuery
                ? "Try adjusting your keywords or search for a different name/number."
                : "Your directory is currently empty. Add your first contact to get started!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}