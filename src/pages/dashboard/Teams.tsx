import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Users } from 'lucide-react';

const mockTeams = [
  { id: '1', name: 'Frontend Team', department: 'Engineering', members: 12, lead: 'John Doe', status: 'active' },
  { id: '2', name: 'Backend Team', department: 'Engineering', members: 15, lead: 'Jane Smith', status: 'active' },
  { id: '3', name: 'Design Team', department: 'Product', members: 8, lead: 'Mike Johnson', status: 'active' },
  { id: '4', name: 'Content Team', department: 'Marketing', members: 10, lead: 'Sarah Williams', status: 'active' },
  { id: '5', name: 'DevOps Team', department: 'Engineering', members: 6, lead: 'Tom Brown', status: 'active' },
  { id: '6', name: 'Enterprise Sales', department: 'Sales', members: 18, lead: 'Lisa Anderson', status: 'active' },
];

export default function Teams() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
          <p className="mt-2 text-muted-foreground">
            Manage teams across departments
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Team
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockTeams.map((team) => (
          <Card key={team.id} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{team.name}</CardTitle>
                  <CardDescription className="mt-1">{team.department}</CardDescription>
                </div>
                <Badge variant={team.status === 'active' ? 'default' : 'secondary'}>
                  {team.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{team.members} members</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {team.lead.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-muted-foreground">Team Lead</p>
                  <p className="text-sm font-medium">{team.lead}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
