import React from "react";

const Dropdowns = ({
  dropdown1,
  setDropdown1,
  dropdown2,
  setDropdown2,
  dropdown3,
  setDropdown3,
  // dropdown4,
  // setDropdown4,
  // dropdown5,
  // setDropdown5,
}) => (
  <div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Category:
        <select
          value={dropdown1}
          onChange={(e) => setDropdown1(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select</option>
          <option value="Shirts">Shirt</option>
          <option value="Sweatshirts">Sweatshirt</option>
          <option value="Trousers">Trousers</option>
          <option value="Jackets">Jacket</option>
          <option value="Shoes">Shoes</option>
          <option value="Accessories">Accessory</option>
        </select>
      </label>
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Type:
        <select
          value={dropdown2}
          onChange={(e) => setDropdown2(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select</option>
          <option value="Athletic Tee">Shirt - Athletic Tee</option>
          <option value="Basic Tee">Shirt - Basic Tee</option>
          <option value="Button-Down Shirt">Shirt - Button-Down Shirt</option>
          <option value="Checked Shirt">Shirt - Checked Shirt</option>
          <option value="Dress Shirt">Shirt - Dress Shirt</option>
          <option value="Flannel Shirt">Shirt - Flannel Shirt</option>
          <option value="Graphic Tee">Shirt - Graphic Tee</option>
          <option value="Henley Tee">Shirt - Henley Tee</option>
          <option value="Long Sleeve Tee">Shirt - Long Sleeve Tee</option>
          <option value="Oversized Tee">Shirt - Oversized Tee</option>
          <option value="Patterned Tee">Shirt - Patterned Tee</option>
          <option value="Pocket Tee">Shirt - Pocket Tee</option>
          <option value="Polo Shirt">Shirt - Polo Shirt</option>
          <option value="Short Sleeve Shirt">Shirt - Short Sleeve Shirt</option>
          <option value="Striped Polo">Shirt - Striped Polo</option>
          <option value="Striped Tee">Shirt - Striped Tee</option>
          <option value="Athletic Shorts">Trousers - Athletic Shorts</option>
          <option value="Cargo Pants">Trousers - Cargo Pants</option>
          <option value="Cargo Shorts">Trousers - Cargo Shorts</option>
          <option value="Chinos">Trousers - Chinos</option>
          <option value="Culottes">Trousers - Culottes</option>
          <option value="Denim Shorts">Trousers - Denim Shorts</option>
          <option value="Dress Pants">Trousers - Dress Pants</option>
          <option value="Formal Trousers">Trousers - Formal Trousers</option>
          <option value="Jeans">Trousers - Jeans</option>
          <option value="Joggers">Trousers - Joggers</option>
          <option value="Leggings">Trousers - Leggings</option>
          <option value="Shorts">Trousers - Shorts</option>
          <option value="Slim Fit Trousers">
            Trousers - Slim Fit Trousers
          </option>
          <option value="Sweatpants">Trousers - Sweatpants</option>
          <option value="Swim Trunks">Trousers - Swim Trunks</option>
          <option value="Track Shorts">Trousers - Track Shorts</option>
          <option value="Boots">Shoes - Boots</option>
          <option value="Derby Shoes">Shoes - Derby Shoes</option>
          <option value="Espadrilles">Shoes - Espadrilles</option>
          <option value="Loafers">Shoes - Loafers</option>
          <option value="Moccasins">Shoes - Moccasins</option>
          <option value="Oxfords">Shoes - Oxfords</option>
          <option value="Running Shoes">Shoes - Running Shoes</option>
          <option value="Sandals">Shoes - Sandals</option>
          <option value="Sneakers">Shoes - Sneakers</option>
          <option value="Slip-Ons">Shoes - Slip-Ons</option>
          <option value="Crewneck Sweatshirt">Sweatshirt - Crewneck</option>
          <option value="Fleece Sweatshirt">Sweatshirt - Fleece</option>
          <option value="Hooded Sweatshirt">Sweatshirt - Hooded</option>
          <option value="Graphic Sweatshirt">Sweatshirt - Graphic</option>
          <option value="Oversized Sweatshirt">Sweatshirt - Oversized</option>
          <option value="Performance Sweatshirt">
            Sweatshirt - Performance
          </option>
          <option value="Printed Sweatshirt">Sweatshirt - Printed</option>
          <option value="Pullover Sweatshirt">Sweatshirt - Pullover</option>
          <option value="Varsity Sweatshirt">Sweatshirt - Varsity</option>
          <option value="Zip-Up Sweatshirt">Sweatshirt - Zip-Up</option>
          <option value="Blazer">Jacket - Blazer</option>
          <option value="Bomber Jacket">Jacket - Bomber Jacket</option>
          <option value="Denim Jacket">Jacket - Denim Jacket</option>
          <option value="Field Jacket">Jacket - Field Jacket</option>
          <option value="Leather Jacket">Jacket - Leather Jacket</option>
          <option value="Mac Coat">Jacket - Mac Coat</option>
          <option value="Mountain Jacket">Jacket - Mountain Jacket</option>
          <option value="Parka">Jacket - Parka</option>
          <option value="Trench Coat">Jacket - Trench Coat</option>
          <option value="Utility Jacket">Jacket - Utility Jacket</option>
          <option value="Baseball Cap">Accessory - Baseball Cap</option>
          <option value="Beanie">Accessory - Beanie</option>
          <option value="Bucket Hat">Accessory - Bucket Hat</option>
          <option value="Flat Cap">Accessory - Flat Cap</option>
          <option value="Newsboy Cap">Accessory - Newsboy Cap</option>
          <option value="Sun Hat">Accessory - Sun Hat</option>
          <option value="Visor">Accessory - Visor</option>
          <option value="Scarf">Accessory - Scarf</option>
          <option value="Sunglasses">Accessory - Sunglasses</option>
          <option value="Necklace">Accessory - Necklace</option>
          <option value="Tie">Accessory - Tie</option>
          <option value="Watch">Accessory - Watch</option>
        </select>
      </label>
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Main Colour:
        <select
          value={dropdown3}
          onChange={(e) => setDropdown3(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select</option>
          <option value="beige">Beige</option>
          <option value="black">Black</option>
          <option value="blue">Blue</option>
          <option value="bright orange">Bright Orange</option>
          <option value="brown">Brown</option>
          <option value="burgundy">Burgundy</option>
          <option value="charcoal">Charcoal</option>
          <option value="dark blue">Dark Blue</option>
          <option value="distressed blue">Distressed Blue</option>
          <option value="green">Green</option>
          <option value="grey">Grey</option>
          <option value="khaki">Khaki</option>
          <option value="light blue">Light Blue</option>
          <option value="navy">Navy</option>
          <option value="olive">Olive</option>
          <option value="orange">Orange</option>
          <option value="pink">Pink</option>
          <option value="purple">Purple</option>
          <option value="red">Red</option>
          <option value="teal">Teal</option>
          <option value="white">White</option>
          <option value="yellow">Yellow</option>
        </select>
      </label>
    </div>

    {/* <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Season:
        <select
          value={dropdown4}
          onChange={(e) => setDropdown4(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select</option>
          <option value="Summer">Summer</option>
          <option value="Autumn">Autumn</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
        </select>
      </label>
    </div> */}

    {/* <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Occasion:
        <select
          value={dropdown5}
          onChange={(e) => setDropdown5(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select</option>
          <option value="Sports">Sports</option>
          <option value="Holiday">Holiday</option>
          <option value="Formal">Formal</option>
          <option value="Informal">Informal</option>
        </select>
      </label>
    </div> */}
  </div>
);

export default Dropdowns;
