import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useForm } from "react-hook-form";

const UpdateTicketModal = forwardRef(({ ticket, onSave, onClose }, ref) => {
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const perks = watch("perks") || [];

  // Modal open state
  const [isOpen, setIsOpen] = useState(false);
  useImperativeHandle(ref, () => ({
    openModal: () => setIsOpen(true),
    closeModal: () => {
      setIsOpen(false);
      onClose?.();
    },
  }));

  // Reset form when ticket changes
  useEffect(() => {
    if (ticket) {
      reset({
        title: ticket.title || "",
        from: ticket.from || "",
        to: ticket.to || "",
        transport: ticket.transport || "",
        price: ticket.price || "",
        quantity: ticket.quantity || "",
        departure: ticket.departure?.slice(0, 16) || "",
        perks: ticket.perks || [], // ✅ reset perks correctly
      });
      setImageUrl(ticket.image || "");
    } else {
      reset({
        title: "",
        from: "",
        to: "",
        transport: "",
        price: "",
        quantity: "",
        departure: "",
        perks: [],
      });
      setImageUrl("");
    }
  }, [ticket, reset]);

  // Handle image upload to ImgBB
  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_Key
        }`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.success) setImageUrl(data.data.url);
    } catch (error) {
      console.error("ImgBB upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data) => {
    if (!ticket) return;
    const updatedData = { ...ticket, ...data, image: imageUrl };
    onSave(updatedData);
    setIsOpen(false);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="card bg-white rounded-md shadow-sm shadow-gray-400 w-full max-w-2xl p-6 relative">
        <button
          onClick={() => {
            setIsOpen(false);
            onClose?.();
          }}
          className="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost"
        >
          ✖
        </button>
        <h2 className="text-xl text-gray-400 font-bold mb-2">Update Ticket</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 text-gray-500"
        >
          <input
            {...register("title")}
            placeholder="Ticket Title"
            className="input w-full"
          />

          <div className="flex gap-3">
            <input
              {...register("from")}
              placeholder="From"
              className="input w-1/2"
            />
            <input
              {...register("to")}
              placeholder="To"
              className="input w-1/2"
            />
          </div>

          <select
            {...register("transport")}
            className="select select-bordered w-full"
          >
            <option value="">Select Transport</option>
            <option>Bus</option>
            <option>Train</option>
            <option>Ship</option>
            <option>Air</option>
          </select>

          <div className="flex gap-3">
            <input
              type="number"
              {...register("price")}
              placeholder="Price"
              className="input w-full"
            />
            <input
              type="number"
              {...register("quantity")}
              placeholder="Quantity"
              className="input w-full"
            />
          </div>

          <input
            type="datetime-local"
            {...register("departure")}
            className="input w-full"
          />

          <div className="space-y-1">
            <label className="font-semibold block">Perks</label>
            <div className="flex gap-3">
              {["AC", "Breakfast", "WiFi"].map((perk) => (
                <label key={perk}>
                  <input
                    type="checkbox"
                    value={perk}
                    {...register("perks")}
                    checked={perks.includes(perk)}
                    onChange={(e) =>
                      setValue(
                        "perks",
                        e.target.checked
                          ? [...perks, perk]
                          : perks.filter((p) => p !== perk)
                      )
                    }
                  />{" "}
                  {perk}
                </label>
              ))}
            </div>
          </div>

          {imageUrl && (
            <img src={imageUrl} className="h-20 rounded-md" alt="ticket" />
          )}
          <input
            type="file"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="file-input w-full"
          />

          <button
            type="submit"
            className="fullWidthButton"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
});

export default UpdateTicketModal;
