import Navbar from "../components/common/Navbar";
import Items from "../components/Items";

export default function ItemsPage() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <Items />
      </div>
    </>
  );
}
