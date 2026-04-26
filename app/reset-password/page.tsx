'use client'

import { useState } from 'react'
import Link from 'next/link'
import { resetPassword } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [email, setEmail] = useState('')

  async function handleResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const result = await resetPassword(email)

    if (result && result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setIsSent(true)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/40 font-sans">
      <div className="w-full max-w-md space-y-8 bg-background p-8 rounded-xl shadow-sm border border-border">
        <div className="text-center">
          <Link href="/" className="flex justify-center items-center gap-2 font-serif text-3xl font-bold tracking-tight text-foreground">
            <img src="/logo.png" alt="MK Creations Logo" className="h-10 w-auto object-contain" />
            <span className="hidden sm:inline-block">MK Creations</span>
          </Link>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSent 
              ? 'Check your email for a password reset link.' 
              : 'Enter your email address and we will send you a link to reset your password.'}
          </p>
        </div>

        {!isSent ? (
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            {error && (
              <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive border border-destructive/20">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full rounded-full" disabled={loading}>
                {loading ? 'Sending Link...' : 'Send Reset Link'}
              </Button>
              <Button asChild variant="ghost" className="w-full rounded-full">
                <Link href="/login">Back to Login</Link>
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-8 flex flex-col gap-3">
            <Button asChild className="w-full rounded-full">
              <Link href="/login">Back to Login</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
