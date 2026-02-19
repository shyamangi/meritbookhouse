import React, { useState, useMemo, useEffect, useCallback, memo } from 'react';
import { 
  ShoppingCart, 
  Search, 
  X, 
  Plus, 
  Minus,
  Instagram,
  Facebook,
  Phone,
  Youtube,
  ArrowUp,
  Check
} from 'lucide-react';

const ITEMS_PER_PAGE = 12;
const CONTACT_PHONE = "919119113869"; 
const LOGO_DRIVE_ID = "1c0M70jx1Vl2tXOHjUcd3Dt0ERSokofUO";

/**
 * HELPER: Extracts the Drive ID and formats it for direct image display.
 */
const getDriveUrl = (link, width = 600) => {
  if (!link || typeof link !== 'string') return "https://via.placeholder.com/400x600?text=No+Image";
  const idMatch = link.match(/[-\w]{25,}/); 
  const id = idMatch ? idMatch[0] : link; 
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- COMPONENTS ---

const BookCard = memo(({ book, onSelect, onAdd, isInCart }) => (
  <div className="group flex flex-row gap-4 md:gap-6 max-w-2xl mx-auto w-full border-b border-gray-100 pb-6 items-start animate-in fade-in duration-500">
    <div 
      className="relative w-24 md:w-32 shrink-0 aspect-[3/4] overflow-hidden rounded-xl cursor-pointer bg-gray-100"
      onClick={() => onSelect(book)}
    >
      <img 
        src={getDriveUrl(book.gdrive_image_link, 400)} 
        alt={book.title_en} 
        className="w-full h-full object-cover shadow-sm transform-gpu group-hover:scale-105 transition-transform duration-500" 
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={(e) => { e.target.src = "https://via.placeholder.com/400x600?text=Image+Error"; }}
      />
    </div>

    <div className="flex flex-col flex-1 h-full py-0.5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[9px] md:text-[10px] font-black text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full">
          {book.exam}
        </span>
        <span className="text-[9px] md:text-[10px] font-bold text-gray-300 uppercase tracking-tight">ID: {book.id}</span>
      </div>
      
      <h3 
        className="font-bold text-[15px] md:text-[18px] leading-[1.3] mb-1 cursor-pointer hover:text-blue-600 transition-colors line-clamp-2" 
        onClick={() => onSelect(book)}
      >
        {book.title_hi}
      </h3>
      
      <div className="flex flex-col gap-0.5 mb-3">
        <p className="text-[11px] md:text-[13px] font-medium text-gray-500 line-clamp-1">{book.title_en}</p>
        <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-tight line-clamp-1">{book.publisher} • {book.author}</p>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-[18px] md:text-[20px] font-black tracking-tight leading-none text-black">₹{book.price}</span>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onAdd(book); }}
          className={`px-4 md:px-6 h-9 md:h-10 flex items-center gap-2 rounded-full font-bold text-[11px] md:text-xs transition-all active:scale-95 transform-gpu ${
            isInCart 
            ? "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100" 
            : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isInCart ? <><X className="w-3.5 h-3.5" /> Remove</> : <><Plus className="w-3.5 h-3.5" /> Add</>}
        </button>
      </div>
    </div>
  </div>
));

// --- MAIN APP ---

export default function App() {
  const [books, setBooks] = useState([]);
  const [shuffledData, setShuffledData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://script.google.com/macros/s/AKfycbz646Z65hv0DPShix-cjWQzaWXO1QEFg4dGUDL5dEdeaDJLdOv2y2QQSjLQ7lxkA0xBGw/exec";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const cleanData = data.map(item => ({
          ...item,
          id: String(item.id),
          price: Number(item.price)
        }));
        setBooks(cleanData);
        setShuffledData(shuffleArray(cleanData));
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCart = useCallback((book) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === book.id);
      if (exists) return prev.filter(item => item.id !== book.id);
      return [...prev, { ...book, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  }, []);

  const filteredBooks = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const sourceData = shuffledData.length > 0 ? shuffledData : books;
    if (!query) return sourceData;
    return sourceData.filter(book => 
      (book.title_en?.toLowerCase().includes(query)) || 
      (book.title_hi?.includes(query)) ||
      (book.author?.toLowerCase().includes(query)) || 
      (book.exam?.toLowerCase().includes(query)) ||
      (book.id === query)
    );
  }, [searchQuery, shuffledData, books]);

  const displayBooks = useMemo(() => filteredBooks.slice(0, visibleCount), [filteredBooks, visibleCount]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.qty), 0), [cart]);

  const checkoutOnWhatsApp = () => {
    const items = cart.map(item => `- ${item.title_hi} (ID: ${item.id}) x${item.qty}`).join('\n');
    const message = `Hello Merit Book House! I want to order:\n\n${items}\n\nTotal: ₹${cartTotal}`;
    window.open(`https://wa.me/919119113869?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-inter">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Syncing Merit Inventory</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-inter antialiased">
      {/* NAVIGATION */}
      <nav className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center gap-4">
          <img src={getDriveUrl(LOGO_DRIVE_ID, 100)} className="w-8 h-8 md:block hidden" />
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text"
              placeholder="Search by ID, Exam or Title..."
              className="w-full pl-11 pr-4 py-2.5 bg-gray-100 rounded-full outline-none focus:bg-white border border-transparent focus:border-gray-200 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* LIST */}
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          {displayBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              onSelect={setSelectedBook} 
              onAdd={toggleCart} 
              isInCart={cart.some(c => c.id === book.id)}
            />
          ))}
        </div>
        {filteredBooks.length > visibleCount && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
              className="px-8 py-3 bg-black text-white rounded-full text-sm font-bold shadow-lg"
            >
              Load More
            </button>
          </div>
        )}
      </main>

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="font-bold text-lg">Your Selection ({cart.length})</h2>
              <button onClick={() => setIsCartOpen(false)}><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-300 italic text-sm">Bag is empty</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <img src={getDriveUrl(item.gdrive_image_link, 200)} className="w-16 h-20 object-cover rounded-lg bg-gray-50" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm leading-tight">{item.title_hi}</h4>
                        <span className="text-[10px] font-bold text-gray-400 ml-2">ID: {item.id}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">{item.title_en}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full text-[10px] font-bold">
                          <button onClick={() => updateQty(item.id, -1)}><Minus className="w-3 h-3" /></button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)}><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="font-bold text-sm">₹{item.price * item.qty}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between font-bold text-xl mb-6">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
                <button onClick={checkoutOnWhatsApp} className="w-full py-4 bg-black text-white font-bold rounded-full shadow-xl">
                  Order via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {selectedBook && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" onClick={() => setSelectedBook(null)} />
          <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 animate-scale-in">
            <button onClick={() => setSelectedBook(null)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full z-10"><X size={20}/></button>
            <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
              <img src={getDriveUrl(selectedBook.gdrive_image_link, 800)} className="max-h-[400px] object-contain rounded-xl shadow-2xl" />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4">{selectedBook.exam}</span>
              <h2 className="text-2xl font-black mb-2">{selectedBook.title_hi}</h2>
              <p className="text-gray-500 text-sm mb-6">{selectedBook.title_en}</p>
              <div className="space-y-2 mb-8 text-xs font-medium text-gray-400 uppercase tracking-wider">
                <p>Publisher: <span className="text-black">{selectedBook.publisher}</span></p>
                <p>Author: <span className="text-black">{selectedBook.author}</span></p>
                <p>Book ID: <span className="text-black">{selectedBook.id}</span></p>
              </div>
              <div className="mt-auto flex items-center gap-4 pt-6 border-t">
                <span className="text-3xl font-black">₹{selectedBook.price}</span>
                <button 
                  onClick={() => { toggleCart(selectedBook); setSelectedBook(null); setIsCartOpen(true); }}
                  className="flex-1 py-4 bg-black text-white font-bold rounded-full"
                >
                  {cart.some(c => c.id === selectedBook.id) ? 'Remove from Bag' : 'Add to Bag'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
        @keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes scale-in { from { transform: scale(0.9) opacity: 0; } to { transform: scale(1) opacity: 1; } }
        .animate-slide-in { animation: slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
      `}} />
    </div>
  );
}