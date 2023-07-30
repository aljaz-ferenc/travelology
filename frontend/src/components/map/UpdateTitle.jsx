import React from "react";
import { useForm } from "react-hook-form";

export default function UpdateTitle({ title, handleSubmitEdit }) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(handleSubmitEdit)}>
      <input
        autoFocus
        type="text"
        defaultValue={title}
        {...register("title")}
      />
    </form>
  );
}
