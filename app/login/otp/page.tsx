'use client'

import { useState } from 'react'
import Link from 'next/link'
import { sendOtp, verifyOtp } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'

export default function OTPLoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [otpValue, setOtpValue] = useState('')

  async function handleSendOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const result = await sendOtp(email)

    if (result && result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setIsOtpSent(true)
      setLoading(false)
    }
  }

  async function handleVerifyOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    if (otpValue.length !== 6) {
      setError('Please enter a valid 6-digit OTP.')
      setLoading(false)
      return
    }

    const result = await verifyOtp(email, otpValue)

    if (result && result.error) {
      setError(result.error)
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
            {isOtpSent ? 'Enter your OTP' : 'Login with OTP'}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isOtpSent 
              ? `We sent a 6-digit code to ${email}` 
              : 'Enter your email to receive a secure login code.'}
          </p>
        </div>

        {!isOtpSent ? (
          <form className="mt-8 space-y-6" onSubmit={handleSendOtp}>
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
                {loading ? 'Sending...' : 'Send OTP'}
              </Button>
              <Button asChild variant="ghost" className="w-full rounded-full">
                <Link href="/login">Back to Password Login</Link>
              </Button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6 flex flex-col items-center" onSubmit={handleVerifyOtp}>
            {error && (
              <div className="w-full rounded-md bg-destructive/15 p-4 text-sm text-destructive border border-destructive/20 mb-4">
                {error}
              </div>
            )}

            <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <div className="w-full flex flex-col gap-3 mt-6">
              <Button type="submit" className="w-full rounded-full" disabled={loading || otpValue.length < 6}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              <Button variant="ghost" className="w-full rounded-full" onClick={() => setIsOtpSent(false)}>
                Change Email
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
