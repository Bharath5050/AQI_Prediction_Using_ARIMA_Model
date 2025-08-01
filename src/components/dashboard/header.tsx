'use client';

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CircleUser, Menu, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '../ui/input';
import { Logo } from '../icons/logo';

interface DashboardHeaderProps {
  onSearch: (city: string) => void;
}

export function DashboardHeader({ onSearch }: DashboardHeaderProps) {
  const [city, setCity] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Logo className="h-6 w-6" />
          <span className="sr-only">AQI Predictor</span>
        </a>
        <a
          href="#"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </a>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <a
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Logo className="h-6 w-6" />
              <span className="sr-only">AQI Predictor</span>
            </a>
            <a href="#" className="hover:text-foreground">
              Dashboard
            </a>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form
          onSubmit={handleSubmit}
          className="ml-auto flex-1 sm:flex-initial"
        >
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search city... (e.g. London)"
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
