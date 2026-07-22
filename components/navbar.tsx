import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="font-semibold text-foreground tracking-tight">QuickBook</span>
        </Link>
        <span className="text-xs text-muted-foreground font-medium bg-secondary/80 px-2.5 py-1 rounded-full">
          v1.0
        </span>
      </div>
    </header>
  );
}