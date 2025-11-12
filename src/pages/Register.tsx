import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const { toast } = useToast();

  if (isAuthenticated) {
    window.location.href = '/dashboard';
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      await register(email, password, name);
      toast({
        title: 'Registration successful',
        description: 'Welcome to Department Manager!',
      });
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'Unable to create account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-background overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative flex flex-col lg:flex-row w-full">
        {/* Left Column - System Introduction */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12 xl:p-16">
          <div className="max-w-xl space-y-8">
            {/* Logo */}
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-primary shadow-glow">
              <Building2 className="h-10 w-10 text-primary-foreground" />
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Department
                </span>
                <br />
                <span className="text-foreground">Manager</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Join our powerful admin dashboard for managing departments, teams, users, and permissions with ease.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <div>
                  <h3 className="font-semibold text-foreground">Role-Based Access Control</h3>
                  <p className="text-sm text-muted-foreground">Granular permissions for every resource</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                <div>
                  <h3 className="font-semibold text-foreground">Department Tree Structure</h3>
                  <p className="text-sm text-muted-foreground">Hierarchical organization management</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <div>
                  <h3 className="font-semibold text-foreground">Complete Audit Logs</h3>
                  <p className="text-sm text-muted-foreground">Track every action with detailed history</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Register Form */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12 xl:p-16 lg:border-l lg:border-border/50 backdrop-blur-sm bg-card/30">
          <div className="w-full max-w-md space-y-8">
            {/* Form Header */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Create an account</h2>
              <p className="text-muted-foreground">Sign up to get started with your dashboard</p>
            </div>

            {/* Register Form */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground/90">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground/90">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground/90">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground/90">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-primary hover:opacity-90 transition-opacity text-base font-medium shadow-md" 
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </Button>
              </form>
              
              {/* Link to Login */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
