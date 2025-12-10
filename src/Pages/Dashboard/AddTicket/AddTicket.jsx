import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

const imageHostKey = import.meta.env.VITE_image_host_Key;

function AddTicket() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      // Upload to ImgBB
      const { data: imgData } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
        formData
      );

      const ticket = {
        title: data.title,
        from: data.from,
        to: data.to,
        transport: data.transport,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        departure: data.departure,
        perks: data.perks || [],
        image: imgData.data.display_url,
        vendorName: user?.displayName,
        vendorEmail: user?.email,
        status: "pending",
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/tickets", ticket);
      console.log("After saving ticket:", res.data);
      alert("Ticket Added Successfully!");
      reset();
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

  return (
    <div className=" py-20 px-4">
      <h1 className="title text-center">Add a New Ticket</h1>
      <p className="subTitle text-center">Fill in the ticket details below</p>

      <div className="w-full max-w-2xl mx-auto card rounded-md shadow-sm shadow-gray-400 duration-300">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="fieldset space-y-3">

            <input {...register("title", { required: true })} placeholder="Ticket Title" className="input w-full" />

            <div className="flex gap-3">
                <input {...register("from", { required: true })} placeholder="From Location" className="input w-1/2" />
            <input {...register("to", { required: true })} placeholder="To Location" className="input w-1/2" />
            </div>
            

            <select {...register("transport", { required: true })} className="select select-bordered w-full">
              <option value="">Select Transport Type</option>
              <option>Bus</option>
              <option>Train</option>
              <option>Ship</option>
              <option>Air</option>
            </select>

            <div className="flex gap-3">
                 <input type="number" {...register("price", { required: true })} placeholder="Price per unit" className="input w-full" />
            <input type="number" {...register("quantity", { required: true })} placeholder="Ticket Quantity" className="input w-full" />
            </div>
           
            <input type="datetime-local" {...register("departure", { required: true })} className="input w-full" />

            <div className="space-y-1">
              <label className="font-semibold block">Perks</label>
              <div className="flex gap-3">
                <label><input type="checkbox" value="AC" {...register("perks")} /> AC</label>
                <label><input type="checkbox" value="Breakfast" {...register("perks")} /> Breakfast</label>
                <label><input type="checkbox" value="WiFi" {...register("perks")} /> WiFi</label>
              </div>
            </div>

            <input type="file" {...register("image", { required: true })} className="file-input w-full text-gray-400" />

            <div className="flex flex-col md:flex-row gap-3">
                <input readOnly value={user?.displayName || ""} className="input w-full bg-base-200" />
            <input readOnly value={user?.email || ""} className="input w-full bg-base-200" />
            </div>
            

            <button type="submit" className="fullWidthButton mt-2">Add Ticket</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTicket;
