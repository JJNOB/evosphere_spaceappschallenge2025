import { useState } from "react";
import { Info } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import logo from "@/assets/spacelogo.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AppSidebar() {
  const [showLimitations, setShowLimitations] = useState(false);

  return (
    <>
      <Sidebar className="w-56 border-r border-border bg-card">
        <SidebarHeader className="p-6 border-b border-border">
          <div className="flex items-center justify-center w-full h-full">
            <img src={logo} alt="BioSpace-X Logo" className="w-full h-full object-contain" />
          </div>
        </SidebarHeader>

        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={() => setShowLimitations(true)}
                className="text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Info className="w-4 h-4" />
                <span className="text-sm">Limitations</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <Dialog open={showLimitations} onOpenChange={setShowLimitations}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Research AI Limitations</DialogTitle>
            <DialogDescription className="space-y-3 pt-4 text-muted-foreground">
              <p className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Results are based on available research papers in the database</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>AI-generated summaries may not capture all nuances</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Always verify critical information with original sources</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Some specialized topics may have limited coverage</span>
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
