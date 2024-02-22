"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ImageIcon, Loader2, ScanSearch } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ImageClassificationPage = () => {
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const uploadFiles = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setLoading(true);
    const response = await axios.post("/api/clasifyImage", formData);
    setLoading(false);
    setUrl(response.data.url);
    setLabel(response.data.label);
  };

  return (
    <main className="flex flex-col items-center justify-start p-24 gap-2">
      <form onSubmit={uploadFiles} className="flex gap-2 items-center">
        <ImageIcon />
        <Input name="files" type="file"></Input>
        <Button disabled={loading} type="submit">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ScanSearch size={20} />
          )}
        </Button>
      </form>
      {url && <Image src={url} width={400} height={400} alt="image" />}
      {label && <p className="font-bold text-left">Detected: {label}</p>}
    </main>
  );
};

export default ImageClassificationPage;
