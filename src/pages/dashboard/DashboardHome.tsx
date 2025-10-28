import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, UsersRound, Shield, TrendingUp, Activity } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const stats = [
  {
    title: 'Total Departments',
    value: '24',
    change: '+3 this month',
    icon: Building2,
    color: 'text-primary',
  },
  {
    title: 'Active Users',
    value: '1,247',
    change: '+128 this week',
    icon: Users,
    color: 'text-accent',
  },
  {
    title: 'Teams',
    value: '56',
    change: '+8 this month',
    icon: UsersRound,
    color: 'text-success',
  },
  {
    title: 'Active Sessions',
    value: '342',
    change: 'Live now',
    icon: Activity,
    color: 'text-warning',
  },
];

const recentActivities = [
  { action: 'Department Created', resource: 'Engineering > Frontend', user: 'John Doe', time: '5 min ago' },
  { action: 'User Assigned', resource: 'Marketing Team', user: 'Jane Smith', time: '12 min ago' },
  { action: 'Role Updated', resource: 'DEPT_ADMIN permissions', user: 'Admin', time: '1 hour ago' },
  { action: 'Team Created', resource: 'Product Design', user: 'Mike Johnson', time: '2 hours ago' },
  { action: 'User Removed', resource: 'Sales Department', user: 'Sarah Williams', time: '3 hours ago' },
];

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}!</h1>
        <p className="mt-2 text-muted-foreground">
          Here's what's happening with your organization today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.resource}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-foreground">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition-all hover:bg-accent hover:text-accent-foreground">
              <Building2 className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Create Department</p>
                <p className="text-xs text-muted-foreground">Add new organizational unit</p>
              </div>
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition-all hover:bg-accent hover:text-accent-foreground">
              <Users className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Add User</p>
                <p className="text-xs text-muted-foreground">Invite new team member</p>
              </div>
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition-all hover:bg-accent hover:text-accent-foreground">
              <Shield className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Manage Roles</p>
                <p className="text-xs text-muted-foreground">Update permissions</p>
              </div>
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition-all hover:bg-accent hover:text-accent-foreground">
              <TrendingUp className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">View Reports</p>
                <p className="text-xs text-muted-foreground">Analytics & insights</p>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
