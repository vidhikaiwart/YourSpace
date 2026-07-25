'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCounterStore } from '@/store/useCounterStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Plus, Minus, RotateCcw, Loader2, Sparkles, UserPlus, CheckCircle2 } from 'lucide-react'

// Zod Schema for validation
const userFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
})

type UserFormValues = z.infer<typeof userFormSchema>

export default function DemoPanel() {
  const queryClient = useQueryClient()
  const { count, increment, decrement, reset } = useCounterStore()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: { name: '', email: '' },
  })

  // TanStack Query: Fetch mock users
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['mockUsers'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3')
      if (!res.ok) throw new Error('Failed to fetch users')
      return res.json() as Promise<Array<{ id: number; name: string; email: string }>>
    },
  })

  // TanStack Query: Simulate adding a user
  const createUserMutation = useMutation({
    mutationFn: async (newUser: UserFormValues) => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      if (!res.ok) throw new Error('Failed to create user')
      return res.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['mockUsers'] })
      setSuccessMessage(`User "${data.name}" added successfully! (Simulated)`)
      resetForm()
      setTimeout(() => setSuccessMessage(null), 5000)
    },
  })

  const onSubmit = (values: UserFormValues) => {
    createUserMutation.mutate(values)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto p-4">
      {/* Zustand Counter Card */}
      <Card className="border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles className="w-24 h-24 text-primary" />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Zustand State Store
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Reactive client-side global state store management.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <span className="text-zinc-500 text-sm font-semibold uppercase tracking-wider mb-2">Current Count</span>
          <span className="text-6xl font-extrabold tracking-tight text-white mb-6 select-none animate-pulse">
            {count}
          </span>
          <div className="flex gap-3">
            <Button size="icon" variant="outline" onClick={decrement} className="rounded-full border-zinc-700 hover:bg-zinc-800 text-white">
              <Minus className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={reset} className="rounded-full border-zinc-700 hover:bg-zinc-800 text-white">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="default" onClick={increment} className="rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center border-t border-white/5 pt-4 text-xs text-zinc-500">
          This count persists as long as the session runs.
        </CardFooter>
      </Card>

      {/* TanStack Query & React Hook Form Card */}
      <Card className="border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Query + Hook Form + Zod
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Perform validated requests with form schema validation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-zinc-300">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="bg-zinc-900/50 border-zinc-800 text-white focus-visible:ring-emerald-500"
                {...register('name')}
              />
              {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="bg-zinc-900/50 border-zinc-800 text-white focus-visible:ring-emerald-500"
                {...register('email')}
              />
              {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <Button
              type="submit"
              disabled={createUserMutation.isPending}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
            >
              {createUserMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding User...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </>
              )}
            </Button>
          </form>

          {successMessage && (
            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/30 border border-emerald-800/50 rounded-lg p-3 text-sm">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* TanStack Query Users List (Span Full Width on Desktop) */}
      <Card className="border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl md:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Active Users (TanStack Query Cache)</CardTitle>
          <CardDescription className="text-zinc-400">
            Fetched from mock endpoint with 60s cache stale time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-6 text-zinc-500">
              <Loader2 className="mr-2 h-6 w-6 animate-spin text-indigo-500" />
              Loading mock users...
            </div>
          ) : error ? (
            <p className="text-rose-500 text-sm">Failed to load mock users.</p>
          ) : (
            <div className="divide-y divide-white/5">
              {users?.map((user) => (
                <div key={user.id} className="flex justify-between items-center py-3">
                  <div>
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-zinc-500">{user.email}</p>
                  </div>
                  <div className="text-xs px-2 py-1 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
                    ID: {user.id}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
