import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, User } from "lucide-react";

interface CourseCardProps {
  courseCode: string;
  courseName: string;
  instructor: string;
  color?: string;
}

export function CourseCard({ courseCode, courseName, instructor }: CourseCardProps) {
  return (
    <Link to={`/course/${courseCode}`} className="block group">
      <Card className="h-full bg-gradient-card border-border/50 shadow-academic-sm hover:shadow-academic-lg transition-all duration-300 hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold">
              {courseCode}
            </Badge>
            <BookOpen className="h-5 w-5 text-primary/60 group-hover:text-primary transition-colors" />
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {courseName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Instructor: {instructor}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
