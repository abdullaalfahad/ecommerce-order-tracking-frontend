"use client";

import { Check, ImageIcon, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  preview: string | null;
  setPreview: (preview: string | null) => void;
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
  isUploading: boolean;
  uploadToImageKit: (file: File) => Promise<string>;
}

export function ImageUpload({
  preview,
  setPreview,
  imageUrl,
  setImageUrl,
  isUploading,
  uploadToImageKit,
}: ImageUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);

      try {
        const url = await uploadToImageKit(file);
        setImageUrl(url);
      } catch (err) {
        console.error("Upload failed", err);
      }
    },
  });

  const removeImage = () => {
    setPreview(null);
    setImageUrl(null);
  };

  return (
    <div>
      <label
        htmlFor="product_image"
        className="flex items-center gap-2 text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4"
      >
        <ImageIcon className="w-4 h-4" /> Product Image
      </label>

      {preview ? (
        <div className="relative">
          <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-gray-200">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <button
            type="button"
            onClick={removeImage}
            className="absolute top-3 right-3 w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>

          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-white mx-auto mb-2" />
                <p className="text-white text-sm font-medium">
                  Uploading to ImageKit...
                </p>
              </div>
            </div>
          )}

          {imageUrl && !isUploading && (
            <div className="absolute bottom-3 left-3 bg-green-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
              <Check className="w-4 h-4" />{" "}
              <span className="text-sm font-medium">Uploaded</span>
            </div>
          )}
        </div>
      ) : (
        <div
          {...getRootProps({
            className: `border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
            }`,
          })}
        >
          <input {...getInputProps()} />
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-gray-700 font-medium mb-1">
            {isDragActive
              ? "Drop your image here"
              : "Drag & drop an image here"}
          </p>
          <p className="text-gray-500 text-sm mb-4">or click to browse</p>
          <p className="text-xs text-gray-400">
            Supports: PNG, JPG, JPEG, WEBP, GIF
          </p>
        </div>
      )}
    </div>
  );
}
