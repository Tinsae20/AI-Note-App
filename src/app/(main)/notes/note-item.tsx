"use client";

import { Doc } from "../../../../convex/_generated/dataModel";
import { NotePreviewDialog } from "./note-preview-dialog";
import { useEffect, useState } from "react";
import { fetchUpsplashImages } from "@/lib/upsplash";
import Image from "next/image"

interface NoteItemProps {
  note: Doc<"notes">;
}

export function NoteItem({ note }: NoteItemProps) {

  const [ images, setImages ] = useState<string[]>([])
  const [randomImage, setRandomImage] = useState<string>("");

  useEffect(() => {
    fetchUpsplashImages("nature", 10)
      .then((fetchedImages) => {
        setImages(fetchedImages);

        // Pick a random image for this note
        if (fetchedImages.length > 0) {
          const randomIndex = Math.floor(Math.random() * fetchedImages.length);
          setRandomImage(fetchedImages[randomIndex]);
        }
      })
      .catch(console.error);
  }, []);

  function handleOpenNote() {
    window.history.pushState(null, "", `?noteId=${note._id}`)
  }
  return (
    <>
      <div className="block max-w-sm bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg shadow-none p-3" onClick={handleOpenNote}>
        {images.length > 0 && (
          <div className="relative w-full h-48 mb-3 rounded-md overflow-hidden">
            <Image
              src={randomImage} // show first fetched image
              alt="Unsplash background"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        )}
        <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">
          {note.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3 text-sm whitespace-pre-line">
          {note.body}
        </p>
      </div>

      <NotePreviewDialog note={note}/>
    </>
  );
}