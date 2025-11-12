import { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, File, X, Send } from "lucide-react";
import { toast } from "sonner";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

interface CourseAssignmentUploadProps {
  courseCode: string;
  courseName: string;
  assignmentTitle?: string;
}

export function CourseAssignmentUpload({ 
  courseCode, 
  courseName, 
  assignmentTitle 
}: CourseAssignmentUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [comments, setComments] = useState("");
  const [studentName, setStudentName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/zip",
      "application/x-zip-compressed",
    ];

    const newFiles: UploadedFile[] = [];
    
    Array.from(files).forEach((file) => {
      if (validTypes.includes(file.type)) {
        newFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
        });
      } else {
        toast.error(`Invalid file type: ${file.name}. Please upload PDF, DOCX, or ZIP files.`);
      }
    });

    if (newFiles.length > 0) {
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      toast.success(`${newFiles.length} file(s) added`);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    toast.info("File removed");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const handleSubmit = () => {
    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one file");
      return;
    }

    if (!studentName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    // Here you would typically send the files to a server
    toast.success(`Assignment submitted successfully for ${courseCode}`);
    
    // Reset form
    setUploadedFiles([]);
    setComments("");
    setStudentName("");
  };

  return (
    <Card className="bg-card shadow-academic-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          Submit Assignment - {courseCode}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          {assignmentTitle || courseName}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studentName">Your Name *</Label>
            <Input
              id="studentName"
              placeholder="Enter your full name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>

          <div
            className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/30"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium mb-1">Click to upload files</p>
            <p className="text-xs text-muted-foreground">PDF, DOCX, or ZIP (max. 10MB per file)</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.zip"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Files ({uploadedFiles.length}):</Label>
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <File className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="comments">Comments (Optional)</Label>
            <Textarea
              id="comments"
              placeholder="Add any comments or notes about your submission..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
            />
          </div>

          <Button 
            onClick={handleSubmit} 
            className="w-full gap-2" 
            size="lg"
            disabled={uploadedFiles.length === 0 || !studentName.trim()}
          >
            <Send className="h-4 w-4" />
            Submit Assignment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
