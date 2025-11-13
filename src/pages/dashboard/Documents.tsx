import { useState } from "react";
import { Upload, FileText, Eye, Edit, Trash2, Check, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { MoreVertical } from "lucide-react";

type DocumentStatus = "pending" | "processing" | "approved" | "rejected";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
  status: DocumentStatus;
  metadata: {
    description: string;
    category: string;
    tags: string[];
  };
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Contract_2024_Q1.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedAt: "2024-01-15 10:30",
    uploadedBy: "John Doe",
    status: "approved",
    metadata: {
      description: "Q1 2024 contract documentation",
      category: "Legal",
      tags: ["contract", "2024", "Q1"],
    },
  },
  {
    id: "2",
    name: "Financial_Report.xlsx",
    type: "Excel",
    size: "1.8 MB",
    uploadedAt: "2024-01-14 14:20",
    uploadedBy: "Jane Smith",
    status: "processing",
    metadata: {
      description: "Annual financial report",
      category: "Finance",
      tags: ["finance", "report", "annual"],
    },
  },
  {
    id: "3",
    name: "Meeting_Notes.docx",
    type: "Word",
    size: "156 KB",
    uploadedAt: "2024-01-13 09:15",
    uploadedBy: "Mike Johnson",
    status: "pending",
    metadata: {
      description: "Team meeting notes from January",
      category: "Meeting",
      tags: ["meeting", "notes", "january"],
    },
  },
];

const statusConfig = {
  pending: { label: "Chờ xử lý", className: "bg-warning text-warning-foreground" },
  processing: { label: "Đang xử lý", className: "bg-primary text-primary-foreground" },
  approved: { label: "Đã duyệt", className: "bg-success text-success-foreground" },
  rejected: { label: "Từ chối", className: "bg-destructive text-destructive-foreground" },
};

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [metadataDialogOpen, setMetadataDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Tải lên thành công",
            description: `${files.length} tài liệu đã được tải lên`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleApprove = (doc: Document) => {
    setDocuments((docs) =>
      docs.map((d) => (d.id === doc.id ? { ...d, status: "approved" as DocumentStatus } : d))
    );
    toast({
      title: "Đã duyệt tài liệu",
      description: `Tài liệu "${doc.name}" đã được duyệt`,
    });
  };

  const handleReject = (doc: Document) => {
    setDocuments((docs) =>
      docs.map((d) => (d.id === doc.id ? { ...d, status: "rejected" as DocumentStatus } : d))
    );
    toast({
      title: "Đã từ chối tài liệu",
      description: `Tài liệu "${doc.name}" đã bị từ chối`,
      variant: "destructive",
    });
  };

  const handleDelete = (doc: Document) => {
    setDocuments((docs) => docs.filter((d) => d.id !== doc.id));
    toast({
      title: "Đã xóa tài liệu",
      description: `Tài liệu "${doc.name}" đã được xóa`,
    });
  };

  const openMetadata = (doc: Document) => {
    setSelectedDocument(doc);
    setMetadataDialogOpen(true);
  };

  const openPreview = (doc: Document) => {
    setSelectedDocument(doc);
    setPreviewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Quản lý Tài liệu</h1>
        <p className="text-muted-foreground mt-1">
          Tải lên, quản lý và xem xét tài liệu của bạn
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Tải lên Tài liệu</CardTitle>
          <CardDescription>Kéo thả hoặc chọn tệp để tải lên</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-foreground font-medium mb-2">Kéo thả tệp vào đây</p>
            <p className="text-sm text-muted-foreground mb-4">hoặc</p>
            <Button variant="outline" asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Chọn tệp
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
              </label>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Hỗ trợ: PDF, DOC, DOCX, XLS, XLSX (Tối đa 10MB)
            </p>
          </div>

          {isUploading && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">Đang tải lên...</span>
                <span className="text-muted-foreground">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tài liệu đã tải lên</CardTitle>
          <CardDescription>Quản lý và xem xét tài liệu của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên tài liệu</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Kích thước</TableHead>
                <TableHead>Người tải</TableHead>
                <TableHead>Ngày tải</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-foreground">
                      {doc.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">{doc.size}</TableCell>
                  <TableCell className="text-foreground">{doc.uploadedBy}</TableCell>
                  <TableCell className="text-muted-foreground">{doc.uploadedAt}</TableCell>
                  <TableCell>
                    <Badge className={statusConfig[doc.status].className}>
                      {statusConfig[doc.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openPreview(doc)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem trước
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openMetadata(doc)}>
                          <Info className="mr-2 h-4 w-4" />
                          Metadata
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {doc.status === "pending" && (
                          <>
                            <DropdownMenuItem onClick={() => handleApprove(doc)}>
                              <Check className="mr-2 h-4 w-4" />
                              Duyệt
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReject(doc)}>
                              <X className="mr-2 h-4 w-4" />
                              Từ chối
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDelete(doc)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Metadata Dialog */}
      <Dialog open={metadataDialogOpen} onOpenChange={setMetadataDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thông tin Metadata</DialogTitle>
            <DialogDescription>
              Chi tiết thông tin về tài liệu "{selectedDocument?.name}"
            </DialogDescription>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-4">
              <div>
                <Label className="text-foreground">Mô tả</Label>
                <Input
                  value={selectedDocument.metadata.description}
                  className="mt-1"
                  readOnly
                />
              </div>
              <div>
                <Label className="text-foreground">Danh mục</Label>
                <Input value={selectedDocument.metadata.category} className="mt-1" readOnly />
              </div>
              <div>
                <Label className="text-foreground">Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedDocument.metadata.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Kích thước</p>
                  <p className="text-foreground font-medium">{selectedDocument.size}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Loại</p>
                  <p className="text-foreground font-medium">{selectedDocument.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Người tải</p>
                  <p className="text-foreground font-medium">{selectedDocument.uploadedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ngày tải</p>
                  <p className="text-foreground font-medium">{selectedDocument.uploadedAt}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setMetadataDialogOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Xem trước Tài liệu</DialogTitle>
            <DialogDescription>{selectedDocument?.name}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] w-full rounded-md border border-border bg-card p-4">
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
                <p className="text-foreground">Xem trước tài liệu</p>
                <p className="text-sm text-muted-foreground">
                  Chức năng xem trước tài liệu sẽ hiển thị nội dung ở đây
                </p>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewDialogOpen(false)}>
              Đóng
            </Button>
            <Button>Tải xuống</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
