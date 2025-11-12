import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, FileText, Download, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/DashboardHeader";

interface CalendarPDF {
  name: string;
  uploadDate: string;
  url: string;
}

export default function AcademicCalendar() {
  const [studentName] = useState("QM Asif Tanjim");
  const [studentId] = useState("2211402042");
  const [uploadedPDF, setUploadedPDF] = useState<CalendarPDF | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    // Create a URL for the uploaded file
    const url = URL.createObjectURL(file);
    
    setUploadedPDF({
      name: file.name,
      uploadDate: new Date().toLocaleDateString(),
      url: url,
    });

    toast.success("Academic calendar uploaded successfully");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = () => {
    if (uploadedPDF?.url) {
      URL.revokeObjectURL(uploadedPDF.url);
    }
    setUploadedPDF(null);
    toast.info("Calendar removed");
  };

  const handleDownload = () => {
    if (uploadedPDF?.url) {
      const link = document.createElement("a");
      link.href = uploadedPDF.url;
      link.download = uploadedPDF.name;
      link.click();
      toast.success("Download started");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        studentName={studentName}
        studentId={studentId}
        onUpdateProfile={() => {}}
      />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Academic Calendar</h1>
          </div>
          <p className="text-muted-foreground">
            Upload and view the university academic calendar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="bg-card shadow-academic-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium mb-1">
                    Click to upload calendar
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF format (max. 10MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {uploadedPDF && (
                  <div className="mt-4 space-y-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {uploadedPDF.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Uploaded: {uploadedPDF.uploadDate}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={handleDownload}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-card shadow-academic-md">
              <CardHeader>
                <CardTitle>Calendar Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {uploadedPDF ? (
                  <div className="w-full h-[600px] border rounded-lg overflow-hidden">
                    <iframe
                      src={uploadedPDF.url}
                      className="w-full h-full"
                      title="Academic Calendar PDF"
                    />
                  </div>
                ) : (
                  <div className="w-full h-[600px] border-2 border-dashed rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium text-muted-foreground mb-2">
                        No calendar uploaded
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Upload a PDF to view it here
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
