import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Building2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  if (isAuthenticated) {
    window.location.href = '/dashboard';
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast({
        title: 'Login successful',
        description: 'Welcome back!',
      });
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background p-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-primary shadow-glow animate-in zoom-in duration-500">
            <Building2 className="h-10 w-10 text-primary-foreground" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
              Department Manager
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to access your dashboard
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-2xl p-8 shadow-lg space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground/90">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
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
                className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-primary hover:opacity-90 transition-opacity text-base font-medium shadow-md" 
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          
          {/* Demo Info */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs font-medium text-muted-foreground mb-2">Demo Accounts:</p>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground/80 font-mono">admin@example.com</p>
              <p className="text-xs text-muted-foreground/80 font-mono">editor@example.com</p>
              <p className="text-xs text-muted-foreground/60 mt-2">Use any password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
