import React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22a10 10 0 0 0 10-10h-2a8 8 0 0 1-8 8v2z" />
      <path d="M22 12a10 10 0 0 0-10-10V0a12 12 0 0 1 12 12h-2z" />
      <path d="M12 2a10 10 0 0 0-10 10H0A12 12 0 0 1 12 0v2z" />
      <path d="M2 12a10 10 0 0 0 10 10v2A12 12 0 0 1 0 12h2z" />
      <path d="m5 11 2 2 4-4" />
    </svg>
  );
}
