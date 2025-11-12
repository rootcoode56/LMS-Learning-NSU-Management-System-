import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "assignment" | "grade" | "announcement";
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New Assignment Posted",
    message: "CSE445: Neural Networks assignment due Nov 20",
    time: "2 hours ago",
    read: false,
    type: "assignment",
  },
  {
    id: "2",
    title: "Grade Published",
    message: "Your grade for CSE445 Assignment 1 is available",
    time: "5 hours ago",
    read: false,
    type: "grade",
  },
  {
    id: "3",
    title: "Upcoming Deadline",
    message: "CSE323 Project Proposal due tomorrow",
    time: "1 day ago",
    read: true,
    type: "assignment",
  },
  {
    id: "4",
    title: "Course Announcement",
    message: "PHI104: Office hours changed to Tuesday 2-4 PM",
    time: "2 days ago",
    read: true,
    type: "announcement",
  },
];

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return "📝";
      case "grade":
        return "🎓";
      case "announcement":
        return "📢";
      default:
        return "📬";
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary-foreground/20">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className={`w-full text-left p-3 rounded-lg hover:bg-muted transition-colors ${
                      !notification.read ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="text-2xl flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-medium text-sm">{notification.title}</p>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  </button>
                  {index < notifications.length - 1 && <Separator className="my-1" />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
