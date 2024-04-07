export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const runtime = 'edge';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
