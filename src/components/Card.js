const Card = ({ data, handlEdit, handleDelete, handleView }) => {
  return (
    <>
      <div
        style={{ border: "1px solid black", margin: "5px", padding: "5px" }}
        onClick={handleView}
      >
        <strong>{data.title}</strong>
        <div>{data.description}</div>
        <div>Rating: {data.rating}</div>
      </div>
      <button onClick={handlEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default Card;
