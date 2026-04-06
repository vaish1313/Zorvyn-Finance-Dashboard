'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import {
	AtSignIcon,
	ChevronLeftIcon,
	Grid2x2PlusIcon,
	Shield,
	Eye,
	Lock,
	ArrowLeft,
} from 'lucide-react';
import { Input } from './input';
import { cn } from '@/lib/utils';
import BoxLoader from './box-loader';

interface AuthPageProps {
	onLogin: (role: 'admin' | 'viewer') => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
	const [selectedRole, setSelectedRole] = useState<'admin' | 'viewer' | null>(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleRoleSelection = (role: 'admin' | 'viewer') => {
		setSelectedRole(role);
	};

	const handleBackToRoleSelection = () => {
		setSelectedRole(null);
		setEmail('');
		setPassword('');
	};

	const handleEmailLogin = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setTimeout(() => {
			onLogin(selectedRole!);
		}, 5000);
	};

	if (isLoading) {
		return (
			<div className="fixed inset-0 bg-background flex items-center justify-center z-50">
				<div className="text-center flex flex-col items-center justify-center">
					<div className="mb-8">
						<BoxLoader />
					</div>
					<p className="mt-8 text-foreground text-lg font-medium">Loading your dashboard...</p>
					<p className="mt-2 text-muted-foreground text-sm">Please wait a moment</p>
				</div>
			</div>
		);
	}

	return (
		<main className="relative min-h-screen md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2 bg-background">
			<div className="bg-muted/40 backdrop-blur-xl relative hidden h-full flex-col border-r border-border/50 p-6 md:p-8 lg:p-10 lg:flex overflow-hidden">
				<div className="from-background/90 via-background/50 to-transparent absolute inset-0 z-10 bg-gradient-to-t" />
				<div className="z-20 flex items-center gap-2">
					<Grid2x2PlusIcon className="size-5 md:size-6 text-primary" />
					<p className="text-lg md:text-xl font-semibold text-foreground">Finance Insights Hub</p>
				</div>
				<div className="z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg md:text-xl text-foreground leading-relaxed">
							&ldquo;This Platform has helped me to save time and manage my
							finances better than ever before.&rdquo;
						</p>
						<footer className="font-mono text-xs md:text-sm font-semibold text-muted-foreground">
							~ Financial Expert
						</footer>
					</blockquote>
				</div>
				<div className="absolute inset-0 z-0">
					<FloatingPaths position={1} />
					<FloatingPaths position={-1} />
				</div>
			</div>
			<div className="relative flex min-h-screen flex-col justify-center p-4 sm:p-6 md:p-8 bg-background overflow-hidden">
				<div
					aria-hidden
					className="absolute inset-0 isolate contain-strict -z-10 opacity-40"
				>
					<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsl(var(--primary)/.08)_0,transparent_50%)] absolute top-0 right-0 h-320 w-140 -translate-y-87.5 rounded-full" />
					<div className="bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--primary)/.06)_0,transparent_80%)] absolute top-0 right-0 h-320 w-60 [translate:5%_-50%] rounded-full" />
					<div className="bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--primary)/.04)_0,transparent_80%)] absolute top-0 right-0 h-320 w-60 -translate-y-87.5 rounded-full" />
				</div>
				<Button variant="ghost" className="absolute top-4 left-4 sm:top-7 sm:left-5 text-muted-foreground hover:text-foreground" asChild>
					<a href="#">
						<ChevronLeftIcon className='size-3 sm:size-4 me-1 sm:me-2' />
						<span className="text-xs sm:text-sm">Home</span>
					</a>
				</Button>
				<div className="mx-auto space-y-4 sm:space-y-6 w-full max-w-sm">
					<div className="flex items-center gap-2 lg:hidden">
						<Grid2x2PlusIcon className="size-5 sm:size-6 text-primary" />
						<p className="text-lg sm:text-xl font-semibold text-foreground">Finance Insights Hub</p>
					</div>

					{!selectedRole ? (
						// Step 1: Role Selection
						<>
							<div className="flex flex-col space-y-1 sm:space-y-2">
								<h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
									Sign In
								</h1>
								<p className="text-muted-foreground text-sm sm:text-base">
									Choose your role to continue
								</p>
							</div>
							
							<div className="space-y-2 sm:space-y-3">
								<Button 
									type="button" 
									size="lg" 
									className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all"
									onClick={() => handleRoleSelection('admin')}
								>
									<Shield className='size-4 sm:size-5 me-2' />
									Login as Admin
								</Button>
								<Button 
									type="button" 
									size="lg" 
									className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all"
									onClick={() => handleRoleSelection('viewer')}
									variant="secondary"
								>
									<Eye className='size-4 sm:size-5 me-2' />
									Login as Viewer
								</Button>
							</div>
						</>
					) : (
						// Step 2: Email/Password Form
						<>
							<div className="flex flex-col space-y-1 sm:space-y-2">
								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="sm"
										onClick={handleBackToRoleSelection}
										className="p-1 h-7 w-7 sm:h-8 sm:w-8"
									>
										<ArrowLeft className="size-3 sm:size-4" />
									</Button>
									<div>
										<h1 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
											{selectedRole === 'admin' ? 'Admin Login' : 'Viewer Login'}
										</h1>
									</div>
								</div>
								<p className="text-muted-foreground text-sm sm:text-base pl-8 sm:pl-10">
									Enter your credentials to continue
								</p>
							</div>

							<div className="glass-card rounded-xl p-3 sm:p-4 border border-primary/30">
								<div className="flex items-center gap-2 sm:gap-3">
									<div className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex-shrink-0 ${
										selectedRole === 'admin' 
											? 'bg-primary/20 border border-primary/30' 
											: 'bg-secondary/50 border border-border'
									}`}>
										{selectedRole === 'admin' ? (
											<Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
										) : (
											<Eye className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
										)}
									</div>
									<div className="min-w-0 flex-1">
										<p className="text-xs sm:text-sm font-semibold text-foreground truncate">
											Logging in as {selectedRole === 'admin' ? 'Admin' : 'Viewer'}
										</p>
										<p className="text-xs text-muted-foreground truncate">
											{selectedRole === 'admin' ? 'Full access to all features' : 'View-only access'}
										</p>
									</div>
								</div>
							</div>

							<form className="space-y-3 sm:space-y-4" onSubmit={handleEmailLogin}>
								<div className="space-y-1.5 sm:space-y-2">
									<label className="text-xs sm:text-sm font-medium text-foreground">Email</label>
									<div className="relative">
										<Input
											placeholder="your.email@example.com"
											className="peer ps-8 sm:ps-9 h-10 sm:h-11 text-sm"
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
										/>
										<div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2.5 sm:ps-3 peer-disabled:opacity-50">
											<AtSignIcon className="size-3 sm:size-4" aria-hidden="true" />
										</div>
									</div>
								</div>

								<div className="space-y-1.5 sm:space-y-2">
									<label className="text-xs sm:text-sm font-medium text-foreground">Password</label>
									<div className="relative">
										<Input
											placeholder="Enter your password"
											className="peer ps-8 sm:ps-9 h-10 sm:h-11 text-sm"
											type="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
										<div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2.5 sm:ps-3 peer-disabled:opacity-50">
											<Lock className="size-3 sm:size-4" aria-hidden="true" />
										</div>
									</div>
								</div>

								<Button type="submit" className="w-full h-10 sm:h-11 text-sm sm:text-base font-medium shadow-lg">
									<span>Login</span>
								</Button>
							</form>
						</>
					)}

					<p className="text-muted-foreground text-center text-xs pt-2">
						By continuing, you agree to our{' '}
						<a
							href="#"
							className="hover:text-primary underline underline-offset-4 transition-colors"
						>
							Terms of Service
						</a>{' '}
						and{' '}
						<a
							href="#"
							className="hover:text-primary underline underline-offset-4 transition-colors"
						>
							Privacy Policy
						</a>
					</p>
				</div>
			</div>
		</main>
	);
}

function FloatingPaths({ position }: { position: number }) {
	const paths = Array.from({ length: 36 }, (_, i) => ({
		id: i,
		d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
			380 - i * 5 * position
		} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
			152 - i * 5 * position
		} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
			684 - i * 5 * position
		} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
		width: 0.5 + i * 0.03,
		opacity: 0.15 + i * 0.015,
	}));

	return (
		<div className="pointer-events-none absolute inset-0">
			<svg
				className="h-full w-full"
				viewBox="0 0 696 316"
				fill="none"
				preserveAspectRatio="xMidYMid slice"
			>
				<title>Background Paths</title>
				{paths.map((path) => (
					<motion.path
						key={path.id}
						d={path.d}
						stroke="hsl(217, 91%, 60%)"
						strokeWidth={path.width}
						strokeOpacity={path.opacity}
						fill="none"
						initial={{ pathLength: 0.5, opacity: path.opacity }}
						animate={{
							pathLength: [0.5, 1, 0.5],
							opacity: [path.opacity * 0.7, path.opacity, path.opacity * 0.7],
						}}
						transition={{
							duration: 20 + path.id * 0.3,
							repeat: Infinity,
							ease: 'linear',
							repeatType: 'loop',
						}}
					/>
				))}
			</svg>
		</div>
	);
}
