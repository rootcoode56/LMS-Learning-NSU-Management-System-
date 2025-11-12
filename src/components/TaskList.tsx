import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, AlertCircle } from "lucide-react";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Machine Learning Assignment 2",
    course: "CSE445",
    dueDate: "2025-11-20",
    completed: false,
  },
  {
    id: "2",
    title: "OS Project Proposal",
    course: "CSE323",
    dueDate: "2025-11-18",
    completed: false,
  },
  {
    id: "3",
    title: "Ethics Essay Submission",
    course: "PHI104",
    dueDate: "2025-11-22",
    completed: true,
  },
  {
    id: "4",
    title: "Lab Report - Chemistry",
    course: "CHE101L",
    dueDate: "2025-11-19",
    completed: false,
  },
];

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isOverdue = (dueDate: string) => getDaysUntilDue(dueDate) < 0;
  const isDueSoon = (dueDate: string) => {
    const days = getDaysUntilDue(dueDate);
    return days >= 0 && days <= 2;
  };

  return (
    <Card className="bg-card shadow-academic-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                task.completed 
                  ? "bg-muted/50 border-border" 
                  : "bg-background border-border hover:border-primary/50"
              }`}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="mt-1"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                    {task.title}
                  </p>
                  {isOverdue(task.dueDate) && !task.completed && (
                    <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {task.course}
                  </Badge>
                  <span
                    className={`text-xs ${
                      isOverdue(task.dueDate) && !task.completed
                        ? "text-destructive font-semibold"
                        : isDueSoon(task.dueDate) && !task.completed
                        ? "text-accent font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                    {!task.completed && (
                      <span className="ml-1">
                        ({getDaysUntilDue(task.dueDate) === 0 
                          ? "Today" 
                          : getDaysUntilDue(task.dueDate) === 1
                          ? "Tomorrow"
                          : isOverdue(task.dueDate)
                          ? `${Math.abs(getDaysUntilDue(task.dueDate))} days overdue`
                          : `${getDaysUntilDue(task.dueDate)} days`})
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
