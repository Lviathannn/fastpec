import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { X } from "lucide-react";
import AddDeviceForm from "../form/AddDeviceForm";

export default function AddDeviceModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button className="bg-primary hover:bg-hover">Tambah Data</Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-[625px]">
        <DialogHeader>
          <div className="absolute right-3 top-3">
            <Button
              size="icon"
              variant="destructive"
              className="size-6"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </Button>
          </div>
          <DialogTitle>Tambah Data</DialogTitle>
          <DialogDescription>Tambah data Device baru</DialogDescription>
        </DialogHeader>
        <AddDeviceForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}