import { useState, useEffect } from "react";

const Modal = ({ onSubmit, initialData }) => {
  const init = { title: "", description: "", rating: 1 };
  const [form, setForm] = useState(init);
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(init);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData ? "Edit Review" : "Add Review"}</h2>
      <label>
        Title:
        <input
          onChange={handleChange}
          value={form.title}
          type="text"
          name="title"
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          onChange={handleChange}
          value={form.description}
          name="description"
        />
      </label>
      <br />
      <label>
        Rating:
        <input
          onChange={handleChange}
          value={form.rating}
          type="number"
          name="rating"
          min="1"
          max="5"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Modal;
