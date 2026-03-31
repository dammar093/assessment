import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { toast } from "react-hot-toast";
import { useProperty } from "../context/PropertyContext"; // <-- use Property Context

// ------------------------------
// Zod Schema for Property Form
// ------------------------------
const createPropertySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be a positive number"),
  image: z
    .any()
    .refine((file) => file?.length === 1, "Image is required")
    .refine(
      (file) => file?.[0]?.type.startsWith("image/"),
      "File must be an image (png, jpeg, etc.)",
    ),
});

type CreatePropertyFormData = z.infer<typeof createPropertySchema>;

const CreatePropertyForm = () => {
  const { createProperty } = useProperty();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreatePropertyFormData>({
    resolver: zodResolver(createPropertySchema),
  });

  // Watch the image input for preview
  const watchedImage = watch("image");
  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const file = watchedImage[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    } else {
      setPreview(null);
    }
  }, [watchedImage]);

  const onSubmit = async (data: CreatePropertyFormData) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("image", data.image[0]);

      const property = await createProperty(formData);
      if (property) {
        toast.success("Property created successfully!");
        reset();
        setPreview(null);
      }
    } catch (err) {
      toast.error("Failed to create property");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      {/* Name */}
      <div>
        <Label>Name</Label>
        <Input placeholder="Property Name" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <Label>Description</Label>
        <Textarea
          placeholder="Property Description"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Price */}
      <div>
        <Label>Price (USD)</Label>
        <Input
          type="number"
          placeholder="Enter price"
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      {/* Image */}
      <div>
        <Label>Upload Image</Label>
        <Input type="file" accept="image/*" {...register("image")} />
        {/* {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors?.image?.message}</p>
        )} */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 w-full max-h-64 object-cover rounded-md shadow-sm"
          />
        )}
      </div>

      {/* Submit */}
      <Button type="submit" className="mt-4" disabled={loading}>
        {loading ? "Creating..." : "Create Property"}
      </Button>
    </form>
  );
};

export default CreatePropertyForm;
