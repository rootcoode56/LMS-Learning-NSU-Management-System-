import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import nsuLogo from "@/assets/nsu-logo.png";
import { NotificationCenter } from "@/components/NotificationCenter";

interface DashboardHeaderProps {
  studentName: string;
  studentId: string;
  onUpdateProfile: (name: string, id: string) => void;
}

export function DashboardHeader({ studentName, studentId, onUpdateProfile }: DashboardHeaderProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editName, setEditName] = useState(studentName);
  const [editId, setEditId] = useState(studentId);

  const handleSave = () => {
    onUpdateProfile(editName, editId);
    setIsEditOpen(false);
  };

  return (
    <header className="bg-gradient-primary border-b border-border/50 shadow-academic-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={nsuLogo} alt="North South University" className="h-16 w-auto" />
            <div className="border-l border-primary-foreground/30 pl-4">
              <h1 className="text-2xl font-bold text-primary-foreground">
                Welcome, {studentName}
              </h1>
              <p className="text-sm text-primary-foreground/80">ID: {studentId}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <NotificationCenter />
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="gap-2">
                  <Pencil className="h-4 w-4" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile Information</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="id">Student ID</Label>
                    <Input
                      id="id"
                      value={editId}
                      onChange={(e) => setEditId(e.target.value)}
                      placeholder="Enter your student ID"
                    />
                  </div>
                  <Button onClick={handleSave} className="w-full">
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
}
