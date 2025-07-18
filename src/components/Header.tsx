import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";
import spendtrackLogo from "@/assets/spendtrack-logo.png";

interface HeaderProps {
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
}

const Header = ({ onProfileClick, onLogoutClick }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border px-6 py-4 animate-fade-in">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <img 
            src={spendtrackLogo} 
            alt="SpendTrack Logo" 
            className="w-10 h-10 animate-scale-in"
          />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            SpendTrack
          </h1>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover-lift">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarImage src="" alt="User avatar" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-card border-border shadow-lg" align="end">
            <DropdownMenuItem 
              onClick={onProfileClick}
              className="cursor-pointer hover:bg-muted transition-smooth"
            >
              <Settings className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={onLogoutClick}
              className="cursor-pointer hover:bg-destructive/10 text-destructive transition-smooth"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;