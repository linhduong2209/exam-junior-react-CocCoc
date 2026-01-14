import { useState, useEffect, useRef } from "react";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi2";

const products = [
  {
    id: 1,
    name: "Áo thun trắng",
    price: 150000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    id: 2,
    name: "Quần jeans xanh",
    price: 300000,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
  },
  {
    id: 3,
    name: "Tai nghe không dây",
    price: 500000,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
  },
  {
    id: 4,
    name: "Sạc dự phòng",
    price: 200000,
    image: "https://images.unsplash.com/photo-1706275399524-813e89914e43",
  },
  {
    id: 5,
    name: "Giày thể thao",
    price: 450000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 6,
    name: "Áo khoác",
    price: 350000,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3",
  },
  {
    id: 7,
    name: "Mũ lưỡi trai",
    price: 100000,
    image: "https://images.unsplash.com/photo-1560774358-d727658f457c",
  },
  {
    id: 8,
    name: "Đồng hồ thể thao",
    price: 600000,
    image: "https://images.unsplash.com/photo-1523475496153-3d6cc0f0bf19",
  },
  {
    id: 9,
    name: "Ba lô du lịch",
    price: 400000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
  },
  {
    id: 10,
    name: "Kính râm thời trang",
    price: 250000,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
  },
  {
    id: 11,
    name: "Bình nước giữ nhiệt",
    price: 180000,
    image: "https://images.unsplash.com/photo-1648919725390-1eec35fdf32c",
  },
  {
    id: 12,
    name: "Ốp lưng điện thoại",
    price: 80000,
    image: "https://images.unsplash.com/photo-1593055454503-531d165c2ed8",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState(null);
  const timeoutRef = useRef(null);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    setRecentlyAdded(product.id);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setRecentlyAdded(null), 800);
  };

  const totalItems = cart.length;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-5xl mx-auto">
        <header className="bg-white sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end">
            <div className="relative">
              <button
                onClick={() => setShowCart(!showCart)}
                className={`relative bg-gray-100 border-2 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200 transition ${
                  showCart ? "border-black" : "border-white"
                }`}
              >
                <span className="text-gray-700 font-medium">Giỏ hàng</span>
                <HiOutlineShoppingCart className="w-5 h-5 text-gray-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-gray-700 text-xs w-6 h-6 rounded-full flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>

              {showCart && (
                <div className="absolute right-0 mt-4 bg-white border border-gray-100 rounded-lg shadow-xl lg:w-100 w-80 z-20 max-h-96 overflow-y-auto">
                  <div className="p-4">
                    {cart.length === 0 ? (
                      <p className="text-gray-500 text-center">
                        Giỏ hàng trống
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-800 text-sm">
                                {item.name}
                              </h3>
                              <p className="text-gray-600 text-sm mt-1">
                                Thành tiền: {item.price.toLocaleString()} x{" "}
                                {item.quantity} ={" "}
                                {(item.price * item.quantity).toLocaleString()}{" "}
                                VND
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-2 rounded-md overflow-hidden transition hover:bg-gray-50"
              >
                <div className="aspect-square bg-gray-100 overflow-hidden rounded-md">
                  <img
                    src={product.image + "?auto=format&fit=crop&w=800&q=60"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="py-4 flex items-center justify-between">
                  <div className="pr-3">
                    <h3 className="text-lg text-gray-900 font-medium leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {product.price.toLocaleString()} VND
                    </p>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className={`bg-gray-100 border-2  w-11 h-11 cursor-pointer flex items-center justify-center rounded-md text-gray-700 hover:text-gray-900 ${
                      recentlyAdded === product.id
                        ? "border-black"
                        : "border-gray-100"
                    }`}
                    title="Thêm vào giỏ"
                  >
                    <HiShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
