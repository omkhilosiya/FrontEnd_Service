import { useState, useEffect } from "react";

export default function SubAgentForm({ editUser, onClose }) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    age: "",
    status: true,
    entityId: "",
    parentId: "",
    profileImage: "",
  });

  useEffect(() => {
    if (editUser) setForm(editUser);
  }, [editUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", form);
    onClose();
  };

  return (
    <div className="dropdown-form">
      <div className="form-header">
        <h3>{editUser ? "Edit Subagent" : "Create Subagent"}</h3>
        <button onClick={onClose}>✖</button>
      </div>

      <div className="form-grid">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        {!editUser && (
          <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} />
        )}
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />

        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input name="entityId" placeholder="Entity ID" value={form.entityId} onChange={handleChange} />
        <input name="parentId" placeholder="Parent ID" value={form.parentId} onChange={handleChange} />

        <label className="status-toggle">
          <input type="checkbox" name="status" checked={form.status} onChange={handleChange} />
          Active
        </label>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        {editUser ? "Update" : "Create"}
      </button>
    </div>
  );
}
