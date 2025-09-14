import React, { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import CardsList from './components/CardsList';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [search, setSearch] = useState("");
  const onSubmit = (formData) => {

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) => (item.id === editId ? { ...formData, id: editId } : item))
      );
      setEditId(null);
    } else {
      setData((prev) => [...prev, { ...formData, id: Date.now().toString() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    setEditId(id);
    setShowModal(true);
  };

  const handleView = (id) => {
    setViewId(id);
  };

  const toggleModal = () => {
    setEditId(null);
    setShowModal(!showModal);
  };

  const filteredData = data.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );

  const viewCard = data.find((item) => item.id === viewId);

  return (
    <>
      <h1>Welcome to Rateit</h1>

      <button onClick={toggleModal}>Add Review</button>
      <br />
      <input
        type="text"
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {showModal && (
        <Modal
          onSubmit={onSubmit}
          initialData={editId ? data.find((item) => item.id === editId) : null}
        />
      )}

      {viewCard && (
        <div className="modal">
          <h2>{viewCard.title}</h2>
          <p>{viewCard.description}</p>
          <p>Rating: {viewCard.rating}</p>
          <button onClick={() => setViewId(null)}>Close</button>
        </div>
      )}

      <CardsList
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    </>
  );
}

export default App;
