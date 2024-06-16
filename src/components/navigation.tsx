"use client";
import { useRef, useState } from "react";
import { ResizablePanel } from "./ui/resizable";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  PlusCircle,
  Settings,
  Trash,
} from "lucide-react";
import { dark } from "@clerk/themes";
import { Button, buttonVariants } from "./ui/button";
import { UserButton } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { Item } from "./item";
import { DocumentList } from "./document-list";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandInput, CommandList } from "./ui/command";
import { TrashBox } from "./trash-box";
import { useSettings } from "@/hooks/use-settings";

const Navigation = () => {
  const settings = useSettings();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const panelRef = useRef(null);
  const docs = useQuery(api.documents.get);

  const handlePanel = () => {
    const panel = panelRef.current;
    if (panel) {
      if (isCollapsed) {
        //@ts-ignore
        panel.resize(15);
        setIsCollapsed(false);
      } else {
        //@ts-ignore
        panel.resize(0);
        setIsCollapsed(true);
      }
    }
  };
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  //   const expandPanel = () => {
  //     const panel = panelRef.current;
  //     if (panel) {
  //       // panel.expand(50);
  //       // resize panel from 0 to 50
  //       //@ts-ignore
  //       panel.resize(50);
  //     }
  //   };
  //   const collapsePanel = () => {
  //     const panel = panelRef.current;
  //     if (panel) {
  //       // panel.expand(50);
  //       // resize panel from 0 to 50
  //       //@ts-ignore
  //       panel.resize(2);
  //     }
  //   };
  return (
    <ResizablePanel
      ref={panelRef}
      defaultSize={16}
      maxSize={20}
      minSize={2.5}
      className="flex flex-col items-center gap-2 px-4 py-6 bg-muted transition-all"
      collapsible
      collapsedSize={2.5}
      onCollapse={() => setIsCollapsed(true)}
      onExpand={() => setIsCollapsed(false)}
    >
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={handlePanel}
        className="hover:bg-primary-foreground"
      >
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </Button>
      <div className="flex flex-col items-center gap-4 w-full">
        <div
          className={buttonVariants({
            className: "bg-indigo-400 hover:bg-indigo-300 w-full",
          })}
        >
          <UserButton
            showName={!isCollapsed}
            appearance={{ baseTheme: dark }}
          />
        </div>
        {!isCollapsed && (
          <Command className="space-y-2 w-full p-1 bg-muted border-2 border-dashed">
            <CommandInput placeholder="Type name or search..." />
            <Item onClick={onCreate} icon={PlusCircle} label="New page" />
            <Item icon={Settings} label="Settings" onClick={settings.onOpen} />
            <CommandList>
              <DocumentList />
            </CommandList>
            <Item onClick={onCreate} icon={Plus} label="Add a page" />
            <Popover>
              <PopoverTrigger className="w-full mt-2">
                <Item label="Trash" icon={Trash} />
              </PopoverTrigger>
              <PopoverContent
                className="p-0 w-72 "
                side={isCollapsed ? "bottom" : "right"}
              >
                <TrashBox />
              </PopoverContent>
            </Popover>
          </Command>
        )}
      </div>
    </ResizablePanel>
  );
};

export default Navigation;
