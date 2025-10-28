import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Shield } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const roles = [
  { name: 'SYS_ADMIN', description: 'Full system access', users: 3, color: 'text-destructive' },
  { name: 'ORG_ADMIN', description: 'Organization-wide admin', users: 8, color: 'text-warning' },
  { name: 'DEPT_ADMIN', description: 'Department administrator', users: 24, color: 'text-primary' },
  { name: 'EDITOR', description: 'Can edit and manage content', users: 156, color: 'text-accent' },
  { name: 'VIEWER', description: 'Read-only access', users: 342, color: 'text-muted-foreground' },
];

const resources = ['Departments', 'Teams', 'Users', 'Roles', 'Audit Logs'];
const actions = ['Create', 'Read', 'Update', 'Delete'];

export default function Roles() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
          <p className="mt-2 text-muted-foreground">
            Manage access control and permissions
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Role
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.name} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Shield className={`h-5 w-5 ${role.color}`} />
                  <div>
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <CardDescription className="mt-1">{role.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{role.users} users</span>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Permission Matrix</CardTitle>
          <CardDescription>Configure resource-level permissions for each role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left font-medium">Resource / Action</th>
                  {actions.map((action) => (
                    <th key={action} className="p-4 text-center font-medium">
                      {action}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resources.map((resource) => (
                  <tr key={resource} className="border-b border-border">
                    <td className="p-4 font-medium">{resource}</td>
                    {actions.map((action) => (
                      <td key={action} className="p-4 text-center">
                        <Checkbox />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
