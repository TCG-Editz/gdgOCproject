"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { useEvents } from '../../../hooks/use-events';
import { PlaceHolderImages } from '../../../lib/placeholder-images';
import { format } from 'date-fns';
import { Calendar, MapPin } from 'lucide-react';
import { Icons } from '../../../components/icons'; // 👈 import Icons for logo

export default function EventsPage() {
  const { events } = useEvents();

  // Sort events by date, future events first
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto">
        <div className="mb-12">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight lg:text-5xl">
            Current/Upcoming Events
          </h1>
          <p className="mt-3 text-xl text-foreground/70">
            Workshops, seminars, and fests happening around you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sortedEvents.map((event) => {
            const isUrl = event.imageId.startsWith('http');
            const image = !isUrl ? PlaceHolderImages.find(p => p.id === event.imageId) : null;
            const imageUrl = isUrl ? event.imageId : image?.imageUrl;
            const imageHint = image?.imageHint;
            const eventDate = new Date(event.date);

            return (
              <Card
                key={event.id}
                className="flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative h-48 md:h-auto md:w-1/3">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover md:rounded-l-lg md:rounded-r-none rounded-t-lg"
                      data-ai-hint={imageHint}
                    />
                  )}
                </div>
                <div className="flex flex-col flex-1">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="text-sm text-foreground/80 mb-4">{event.description}</p>
                    <div className="space-y-2 text-sm text-foreground/70">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{format(eventDate, "MMMM d, yyyy 'at' h:mm a")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      {/* ✅ Reused Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-border/40">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <Icons.logo />
      </div>

      {/* Right: Text */}
      <div className="text-center md:text-right">
        <p className="text-sm text-foreground/60">
          © {new Date().getFullYear()} GDGoC IET DAVV.  All rights reserved.
        </p>
        <p className="text-sm text-foreground/60 mt-1">
          Crafted with ❤️ by{" "}
          <Link
            href="https://www.linkedin.com/in/prakrat-porwal-4688b3385?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            className="text-primary font-medium hover:underline transition-colors"
          >
            Prakrat
          </Link>
          {", "}
          <Link
            href="https://www.linkedin.com/in/manan-chimnani?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            className="text-primary font-medium hover:underline transition-colors"
          >
            Manan
          </Link>
          {" & "}
          <Link
            href="https://www.linkedin.com/in/atharv-porwal-354149381?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            className="text-primary font-medium hover:underline transition-colors"
          >
            Atharv
          </Link>
        </p>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}
