"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { useBenefits } from "../../../hooks/use-benefits";
import { PlaceHolderImages } from "../../../lib/placeholder-images";
import { Icons } from "../../../components/icons"; // ✅ for logo
import { ArrowRight } from "lucide-react";

export default function BenefitsPage() {
  const { benefits } = useBenefits();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto">
        <div className="mb-12">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight lg:text-5xl">
            Benefits Hub
          </h1>
          <p className="mt-3 text-xl text-foreground/70">
            Exclusive discounts and offers for Indian students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const isUrl = benefit.imageId.startsWith("http");
            const image = !isUrl ? PlaceHolderImages.find((p) => p.id === benefit.imageId) : null;
            const imageUrl = isUrl ? benefit.imageId : image?.imageUrl;
            const imageHint = image?.imageHint;

            return (
              <Card
                key={benefit.id}
                className="flex flex-col overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative h-48 w-full">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={benefit.title}
                      fill
                      className="object-cover"
                      data-ai-hint={imageHint}
                    />
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-headline text-xl">{benefit.title}</CardTitle>
                      <CardDescription>{benefit.provider}</CardDescription>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-accent/20 text-accent-foreground border-accent/30"
                    >
                      {benefit.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-sm text-foreground/80 flex-grow">{benefit.description}</p>
                  {benefit.redirectUrl && (
                    <Button
                      asChild
                      className="mt-4 w-full bg-primary/90 text-primary-foreground hover:bg-primary/100 backdrop-blur-lg border border-primary/30 transition-all duration-300"
                    >
                      <Link href={benefit.redirectUrl} target="_blank" rel="noopener noreferrer">
                        Redeem <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      {/* ✅ Footer Section */}
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-border/40 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
              <Icons.logo />
            </div>

            {/* Right: Text */}
            <div className="text-center md:text-right">
              <p className="text-sm text-foreground/60">
                © {new Date().getFullYear()} GDGoC IET DAVV. All rights reserved.
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
