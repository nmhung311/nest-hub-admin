import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, ChevronRight, ChevronDown, Building2, Users } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  code: string;
  parentId: string | null;
  status: 'active' | 'inactive';
  userCount: number;
  teamCount: number;
  children?: Department[];
}

const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Engineering',
    code: 'ENG',
    parentId: null,
    status: 'active',
    userCount: 124,
    teamCount: 8,
    children: [
      { id: '11', name: 'Frontend', code: 'ENG-FE', parentId: '1', status: 'active', userCount: 42, teamCount: 3 },
      { id: '12', name: 'Backend', code: 'ENG-BE', parentId: '1', status: 'active', userCount: 56, teamCount: 4 },
      { id: '13', name: 'DevOps', code: 'ENG-DO', parentId: '1', status: 'active', userCount: 26, teamCount: 1 },
    ],
  },
  {
    id: '2',
    name: 'Product',
    code: 'PRD',
    parentId: null,
    status: 'active',
    userCount: 48,
    teamCount: 3,
    children: [
      { id: '21', name: 'Product Design', code: 'PRD-DES', parentId: '2', status: 'active', userCount: 18, teamCount: 1 },
      { id: '22', name: 'Product Management', code: 'PRD-PM', parentId: '2', status: 'active', userCount: 30, teamCount: 2 },
    ],
  },
  {
    id: '3',
    name: 'Marketing',
    code: 'MKT',
    parentId: null,
    status: 'active',
    userCount: 65,
    teamCount: 4,
  },
  {
    id: '4',
    name: 'Sales',
    code: 'SAL',
    parentId: null,
    status: 'active',
    userCount: 89,
    teamCount: 6,
  },
];

const DepartmentTreeItem = ({ department }: { department: Department }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = department.children && department.children.length > 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 transition-all hover:bg-accent/50">
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0 rounded p-1 hover:bg-accent"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
        {!hasChildren && <div className="w-6" />}
        
        <Building2 className="h-5 w-5 text-primary" />
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{department.name}</span>
            <Badge variant="outline" className="text-xs">
              {department.code}
            </Badge>
            <Badge
              variant={department.status === 'active' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {department.status}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{department.userCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{department.teamCount}</span>
            <span>teams</span>
          </div>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="ml-8 space-y-1 border-l-2 border-border pl-4">
          {department.children!.map((child) => (
            <DepartmentTreeItem key={child.id} department={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Departments() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
          <p className="mt-2 text-muted-foreground">
            Manage organizational structure and hierarchy
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Department
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Department Tree</CardTitle>
              <CardDescription>Hierarchical view of all departments</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search departments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {mockDepartments.map((dept) => (
            <DepartmentTreeItem key={dept.id} department={dept} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
