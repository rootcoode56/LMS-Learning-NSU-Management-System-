import { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, File, X } from "lucide-react";
import { toast } from "sonner";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export function AssignmentUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
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
      toast.success(`${newFiles.length} file(s) uploaded successfully`);
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

  return (
    <Card className="bg-card shadow-academic-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          Assignment Upload
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
          <p className="text-xs text-muted-foreground">PDF, DOCX, or ZIP (max. 10MB)</p>
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
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">Uploaded Files:</p>
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
            <Button className="w-full mt-4" size="lg">
              Submit Assignment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
