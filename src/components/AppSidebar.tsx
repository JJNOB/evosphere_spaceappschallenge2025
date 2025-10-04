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
      <Sidebar className="border-r">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">R</span>
            </div>
            <span className="font-semibold text-lg">Research AI</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setShowLimitations(true)}>
                <Info className="w-4 h-4" />
                <span>Limitations</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <Dialog open={showLimitations} onOpenChange={setShowLimitations}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Research AI Limitations</DialogTitle>
            <DialogDescription className="space-y-2 pt-4">
              <p>• Results are based on available research papers in the database</p>
              <p>• AI-generated summaries may not capture all nuances</p>
              <p>• Always verify critical information with original sources</p>
              <p>• Some specialized topics may have limited coverage</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
