import '@/styles/globals.css'

export const metadata = {
  title: 'Airis',
  description: 'Autonomous cloud infrastructure constructor.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  )
}
