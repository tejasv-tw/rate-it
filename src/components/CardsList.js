import Card from "./Card";

const CardsList = ({ data, onEdit, onDelete, onView }) => {
  return (
    <div>
      {data.map((card) => (
        <Card
          key={card.id}
          handlEdit={() => onEdit(card.id)}
          handleDelete={() => onDelete(card.id)}
          handleView={() => onView(card.id)}
          data={card}
        />
      ))}
    </div>
  );
};

export default CardsList;
