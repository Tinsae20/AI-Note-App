"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useSearchParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";

interface NotePreviewDialogProps {
  note: Doc<"notes">;
  image?: string;
}

export function NotePreviewDialog({ note, image }: NotePreviewDialogProps) {

  const searchParams = useSearchParams();
  const isOpen = searchParams.get("noteId") === note._id;

  const deleteNote = useMutation(api.notes.deleteNote);
  const [deleteLoading, setDeleteLoading] = useState(false)

  async function handleDelete() {
    setDeleteLoading(true)
    try {
      await deleteNote({noteId: note._id})
      toast.success("Note deleted!")
      handleClose()
    } catch (error) {
      console.error("Failed to delete note", error)
      toast.error("Failed to delete note. Please try again!")
    } finally {
      setDeleteLoading(false)
    }
  }

  function handleClose() {
    if (deleteLoading) return;
    window.history.pushState(null, "", window.location.pathname);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{note.title}</DialogTitle>
        </DialogHeader>
        {image ? (
          <div className="relative w-full h-48 mb-3 rounded-md overflow-hidden">
            <Image
              src={image} // show first fetched image or fallback
              alt="Unsplash background"
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              fill
            />
          </div>
        ) : null}
        <div className="mt-4 whitespace-pre-wrap">{note.body}</div>
        <DialogFooter className="mt-6">
          <Button variant="destructive" className="gap-2"
          onClick={handleDelete}
          disabled={deleteLoading}>
            <Trash2 size={16} />
            {deleteLoading ? "Deleting..." : "Delete Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
