import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SidebarButton from "../components/SidebarButton";
import SidebarMenu from "../components/SidebarMenu";
import { AiFillEdit, AiFillDelete } from "react-icons/ai"; // Import react-icons
import ControlPanel from "../components/ControlPanel"; // Import ControlPanel
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../contexts/authContext";

const ClothesList = () => {
  const { url } = useAuthContext();
  const [clothes, setClothes] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/clothes`);
        if (response.data && response.data.data) {
          setClothes(response.data.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get("category");
    if (category) {
      setFilter(category);
    }
  }, [location.search]);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleFilterChange = (category) => {
    setFilter(category);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditing(true);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await axios.delete(`${url}/api/v1/clothes/${itemId}`);
        setClothes(clothes.filter((item) => item._id !== itemToDelete._id));
        setItemToDelete(null);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
    setIsConfirmDeleteOpen(false);
  };

  const handleCloseEditPanel = () => {
    setIsEditing(false);
    setSelectedItem(null);
  };

  const filteredClothes = clothes.filter(
    (item) => filter === "All" || item.category === filter
  );

  return (
    <div>
      <Navbar className="navbar sticky top-0" />
      <div className="relative">
        <SidebarButton onClick={handleMenuToggle} />
        <SidebarMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onFilterChange={handleFilterChange}
        />
        <div className="p-2 max-w-screen-sm mx-auto mb-24">
          {isEditing && selectedItem && (
            <div className="fixed inset-0 flex items-center justify-center z-40">
              <ControlPanel
                isEditMode={true}
                initialData={selectedItem}
                onClose={handleCloseEditPanel}
                clearImage={() => {}}
                onFeedback={() => {}}
              />
            </div>
          )}
          <div className="grid grid-cols-3 gap-4">
            {filteredClothes.map((item) => (
              <motion.div
                key={item._id}
                className={`relative bg-white shadow-md rounded-md border border-gray-200 overflow-hidden flex flex-col transition-transform ${
                  isConfirmDeleteOpen && itemToDelete?._id === item._id
                    ? "animate-shake"
                    : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <figure className="flex-1">
                  <img
                    src={item.img}
                    alt={item.type || "Clothing Item"}
                    className="w-full h-40 object-cover"
                  />
                </figure>
                <div className="p-4 flex-1">
                  <p className="text-sm font-bold text-black">{item.type}</p>
                </div>
                <div className="absolute top-0 left-0 right-0 flex justify-between p-2">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="bg-blue-600 text-white rounded-full p-2 opacity-50 hover:opacity-100"
                  >
                    <AiFillEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item)}
                    className="bg-red-600 text-white rounded-full p-2 opacity-50 hover:opacity-100"
                  >
                    <AiFillDelete size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          {isConfirmDeleteOpen && (
            <Modal
              isOpen={isConfirmDeleteOpen}
              onClose={() => setIsConfirmDeleteOpen(false)}
              message="Are you sure you want to delete this item?"
              onConfirm={confirmDelete}
              onCancel={() => setIsConfirmDeleteOpen(false)}
              showCancelButton={true}
              confetti={false}
            />
          )}
        </div>
        <Footer className="sticky bottom-0" />
      </div>
    </div>
  );
};

export default ClothesList;
