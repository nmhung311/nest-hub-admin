import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const mockLogs = [
  {
    id: '1',
    timestamp: '2024-01-15 10:24:32',
    actor: 'John Doe',
    action: 'CREATE',
    resource: 'Department',
    resourceName: 'Engineering > Frontend',
    before: null,
    after: { name: 'Frontend', code: 'ENG-FE', parent: 'Engineering' },
  },
  {
    id: '2',
    timestamp: '2024-01-15 10:15:18',
    actor: 'Jane Smith',
    action: 'UPDATE',
    resource: 'User',
    resourceName: 'Mike Johnson',
    before: { role: 'VIEWER' },
    after: { role: 'EDITOR' },
  },
  {
    id: '3',
    timestamp: '2024-01-15 09:45:03',
    actor: 'Admin',
    action: 'DELETE',
    resource: 'Team',
    resourceName: 'Legacy Support',
    before: { name: 'Legacy Support', members: 5 },
    after: null,
  },
  {
    id: '4',
    timestamp: '2024-01-15 09:12:45',
    actor: 'Sarah Williams',
    action: 'ASSIGN',
    resource: 'User',
    resourceName: 'Tom Brown',
    before: { department: 'Marketing' },
    after: { department: 'Engineering' },
  },
  {
    id: '5',
    timestamp: '2024-01-15 08:33:21',
    actor: 'Mike Johnson',
    action: 'UPDATE',
    resource: 'Role',
    resourceName: 'DEPT_ADMIN',
    before: { permissions: ['read', 'write'] },
    after: { permissions: ['read', 'write', 'delete'] },
  },
];

const getActionBadgeVariant = (action: string) => {
  switch (action) {
    case 'CREATE':
      return 'default';
    case 'UPDATE':
      return 'secondary';
    case 'DELETE':
      return 'destructive';
    case 'ASSIGN':
      return 'outline';
    default:
      return 'secondary';
  }
};

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
          <p className="mt-2 text-muted-foreground">
            Track all administrative actions and changes
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Complete history of system changes</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                  <TableCell className="font-medium">{log.actor}</TableCell>
                  <TableCell>
                    <Badge variant={getActionBadgeVariant(log.action)}>{log.action}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{log.resource}</p>
                      <p className="text-xs text-muted-foreground">{log.resourceName}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-md space-y-1 text-xs">
                      {log.before && (
                        <div className="text-muted-foreground">
                          <span className="font-medium">Before:</span>{' '}
                          {JSON.stringify(log.before)}
                        </div>
                      )}
                      {log.after && (
                        <div className="text-foreground">
                          <span className="font-medium">After:</span>{' '}
                          {JSON.stringify(log.after)}
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
