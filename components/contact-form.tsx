"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, User, Phone } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const phoneRegex = /^\+?[1-9]\d{1,14}$|^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number (e.g. +1234567890 or 123-456-7890)"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onAddContact: (contact: { name: string; phone: string }) => void;
}

export default function ContactForm({ onAddContact }: ContactFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "" },
  });

  const onSubmit = (data: ContactFormValues) => {
    onAddContact(data);
    toast.success(`${data.name} added to contacts`);
    reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 font-medium shadow-sm transition-all duration-200 hover:shadow-indigo-100 dark:hover:shadow-none flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Contact
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle className="text-xl font-semibold tracking-tight">Create New Contact</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Fill in the details below to add a new contact to your directory.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-medium text-muted-foreground uppercase">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Jane Doe"
                className="pl-10 h-11 rounded-xl border-border focus-visible:ring-indigo-500"
                {...register("name")}
              />
            </div>
            {errors.name && <p className="text-xs text-destructive font-medium mt-1">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-xs font-medium text-muted-foreground uppercase">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="phone"
                placeholder="(555) 000-0000"
                type="tel"
                className="pl-10 h-11 rounded-xl border-border focus-visible:ring-indigo-500"
                {...register("phone")}
              />
            </div>
            {errors.phone && <p className="text-xs text-destructive font-medium mt-1">{errors.phone.message}</p>}
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 h-11 rounded-xl border-border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isSubmitting ? "Saving..." : "Save Contact"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
