const Items = () => {
  const items = [
    { name: "Food", href: "/items/food" },
    { name: "Items", href: "/items/items" },
    { name: "Clothes", href: "/items/clothes" },
    { name: "Others", href: "/items/others" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="bg-blue-500 text-white p-6 text-center rounded-lg shadow hover:bg-blue-700"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};

export default Items;
