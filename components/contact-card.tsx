"use client";

import { Contact } from "@/types/contact";
import { Trash2, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContactCardProps {
  contact: Contact;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function ContactCard({ contact, onDelete, onToggleFavorite }: ContactCardProps) {
  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-card border border-border/50 hover:border-border rounded-2xl p-4 flex items-center justify-between transition-all duration-200 hover:shadow-sm"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative flex-shrink-0">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-50 to-indigo-100 dark:from-neutral-800 dark:to-neutral-700 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-semibold text-sm border border-indigo-200/40">
            {initials || "?"}
          </div>
          <button
            onClick={() => onToggleFavorite(contact.id)}
            className="absolute -top-1 -right-1 w-5 h-5 bg-background rounded-full border border-border flex items-center justify-center shadow-xs hover:scale-110 transition-transform"
            aria-label={contact.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star
              className={cn(
                "w-3 h-3 transition-colors",
                contact.isFavorite
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground/60 hover:text-amber-400"
              )}
            />
          </button>
        </div>

        <div className="min-w-0">
          <h3 className="font-medium text-foreground truncate text-sm sm:text-base">{contact.name}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground truncate mt-0.5">{contact.phone}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-xl border-border hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 transition-colors"
          asChild
        >
          <a href={`tel:${contact.phone}`} aria-label={`Call ${contact.name}`}>
            <Phone className="w-4 h-4" />
          </a>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onDelete(contact.id)}
          className="h-9 w-9 rounded-xl border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-colors"
          aria-label={`Delete ${contact.name}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}