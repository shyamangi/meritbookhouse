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
  MapPin,
  Youtube,
  ArrowUp,
  ChevronDown
} from 'lucide-react';

// Book data
const BOOKS_DATA = [
  { id: 1, title: "Rajasthan Ka Bhugol", title_hi: "राजस्थान का भूगोल ", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 228.00, img: "1rQGjNj2r65ohKv9ocewOQzveFvkIplua" },
  { id: 2, title: "Rajasthan Rajvyavastha", title_hi: "राजस्थान राजव्यवस्था", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 171.00, img: "1LzP9tJ6Ul_Z7glgIunMyfSCwaI7d3r_g" },
  { id: 3, title: "Rajasthan Itihas", title_hi: "राजस्थान इतिहास", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 238.00, img: "1RbPiMySozXViyF40-46YrY61lpIgl5fX" },
  { id: 4, title: "Rajasthan Kala Sanskriti", title_hi: "राजस्थान कला एवं संस्कृति", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 238.00, img: "1e6kOP0oACl-OY-3reEVsuhRsUpB-fWYU" },
  { id: 5, title: "Bharat Ka Bhugol", title_hi: "भारत का भूगोल", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 190.00, img: "10WFk_3U_npGQn-wTSSKn5TE4xWnJS9OC" },
  { id: 6, title: "Mahila Paryavekshak", title_hi: "महिला पर्यवेक्षक", exam: "Supervisor", author: "Gjanand Sir, Anil Sir, J.P. Choudhary Si", publisher: "Udaan", price: 315.00, img: "1aGcst9sppgkysqPg3CnYxMkXnIYt2WID" },
  { id: 7, title: "Krishi Pravekshak", title_hi: "कृषि पर्यवेक्षक", exam: "Supervisor", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 135.00, img: "1YNw2ozJcLEpAT40k06OGtiMJp-VsD6JB" },
  { id: 8, title: "Frp 1st Grade Samanya Vigyan Ganit Sankhiki", title_hi: "FRP प्रथम श्रेणी (1st Grade) सामान्य विज्ञान, गणित एवं सांख्यिकी", exam: "1st Grade", author: "Ramawtar Bhadhala, Rajendra Prasad Gora, Pradeep Sihag, Dinesh Bhadhala", publisher: "Smile Study", price: 232.00, img: "1t-Ywil3JkmRZsr4yX_ChFaFQcJ6RS9fu" },
  { id: 9, title: "LDC Paper 1 and 2 ", title_hi: "एल.डी.सी. (LDC) पेपर-I एवं II", exam: "LDC", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 594.00, img: "1JX0D1C3Ba9T_krcqfmDoi26uRHVs_SRQ" },
  { id: 10, title: "Frp Rajasthan Current Varshikank", title_hi: "FRP राजस्थान समसामयिकी वार्षिकांक", exam: "All Exams", author: "Santosh Sharma", publisher: "Mumal", price: 81.00, img: "17gbA9TsjVahy1Qdi2PTk-IXTqtLe-HuL" },
  { id: 11, title: "Frp Rajasthan Current Varshikank 4.0", title_hi: "FRP राजस्थान समसामयिकी वार्षिकांक", exam: "All Exams", author: "Santosh Sharma", publisher: "Mumal", price: 108.00, img: "1S6GdtA9Pk8SqSDL0P4I2x2X8xlTNl3rC" },
  { id: 12, title: "2nd Grade Gk Paper 1 ", title_hi: "द्वितीय श्रेणी (II Grade) सामान्य ज्ञान, प्रथम प्रश्न पत्र", exam: "2nd Grade", author: "Pawan Bhawariya, Rakesh Bhaskar, H.P. Taler", publisher: "Nath Publication", price: 629.00, img: "1F1noKgGWzt6i0zzQxJKJYKHJHSS_PxPA" },
  { id: 13, title: "Rajasthan Gk Old Is Gold", title_hi: "राजस्थान सामान्य ज्ञान: ओल्ड इज गोल्ड", exam: "LDC", author: "Pawan Bhawariya, Rakesh Bhaskar, H.P. Taler", publisher: "Nath Publication", price: 585.00, img: "1Rv7oy8igDmzHKluAvqugcKKJzF5C2OI6" },
  { id: 14, title: "Bhartiya Rajvyavastha", title_hi: "भारतीय राजव्यवस्था", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 285.00, img: "1xxq0s6wkeMQHb1w83QUnjJeVsUuIw0xr" },
  { id: 15, title: "Rajasthan Ka Bhugol", title_hi: "राजस्थान का भूगोल ", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 285.00, img: "1l4WJEAh9APiAWPmeaEYo0bFxeSvSjVAb" },
  { id: 16, title: "Rajasthan Kala Sanskriti", title_hi: "राजस्थान कला एवं संस्कृति", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 209.00, img: "11NAMeNQlaAlCeNwzOyjofBU-2m4mmBeE" },
  { id: 17, title: "Rajasthan Rajvyavastha", title_hi: "राजस्थान राजव्यवस्था", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 209.00, img: "1eCFhd-Kxxrq2cdqdB5c_z5K9MWqkhJXs" },
  { id: 18, title: "Rajasthan Ka Itihas", title_hi: "राजस्थान इतिहास", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 209.00, img: "1xd6Ddp04HggFvQkbdzhl0QdUarU2OikA" },
  { id: 19, title: "Adhunik Bharat Ka Itihas", title_hi: "आधुनिक भारत का इतिहास", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 200.00, img: "1cCI4Op6V4ja3Z4VzvyW4XClbJeeBX8dy" },
  { id: 20, title: "RAS Rajasthan Kala Avm Sanskriti", title_hi: "आर.ए.एस. (RAS) राजस्थान कला एवं संस्कृति", exam: "RAS, Police", author: "Rajveer Singh Chalkoi", publisher: "Springboard Academy", price: 152.00, img: "1W_FoyXOPOP7qZwj95C0QC00DM0XjU9Ks" },
];

const ITEMS_PER_PAGE = 12;
const CONTACT_PHONE = "919119113869"; 
const CONTACT_DISPLAY = "911.911.3869";

// Optimized Image Width for mobile
const getDriveUrl = (id, width = 600) => `https://lh3.googleusercontent.com/u/0/d/${id}=w${width}`;
const LOGO_DRIVE_ID = "1c0M70jx1Vl2tXOHjUcd3Dt0ERSokofUO";

const BookCard = memo(({ book, onSelect, onAdd }) => {
  return (
    <div className="group flex flex-col will-change-transform">
      <div 
        className="relative aspect-[3/4] mb-4 overflow-hidden rounded-[1.5rem] bg-[#F5F5F7] cursor-pointer transition-all duration-300 hover:shadow-lg transform-gpu"
        onClick={() => onSelect(book)}
      >
        <div className="w-full h-full p-3 md:p-4">
          <img 
            src={getDriveUrl(book.img, 500)} 
            alt={book.title} 
            className="w-full h-full object-cover rounded-[1.25rem] transition-transform duration-500 group-hover:scale-105 shadow-sm transform-gpu" 
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="absolute bottom-4 left-4 z-10 pointer-events-none hidden md:block">
          <span className="text-[8px] font-bold text-gray-400/60 bg-black/5 backdrop-blur-[1px] px-1.5 py-0.5 rounded-md border border-gray-300/10">
            ID: {book.id}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-1 px-1">
        <div className="mb-1">
          <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-tighter">
            {book.exam}
          </span>
        </div>
        <h3 className="font-bold text-[14px] md:text-[15px] mb-1 leading-snug cursor-pointer hover:text-blue-600 transition-colors" onClick={() => onSelect(book)}>
          {book.title_hi || book.title}
        </h3>
        <p className="text-[11px] font-medium text-gray-400 mb-3 truncate italic">{book.author}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-[17px] font-extrabold tracking-tight">₹{book.price}</span>
          <button 
            onClick={(e) => { e.stopPropagation(); onAdd(book); }}
            className="w-9 h-9 flex items-center justify-center bg-[#F5F5F7] hover:bg-black hover:text-white rounded-full transition-all active:scale-90 transform-gpu shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery]);

  const filteredBooks = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return BOOKS_DATA;
    
    return BOOKS_DATA.filter(book => 
      book.title.toLowerCase().includes(query) || 
      book.title_hi.includes(query) ||
      book.author.toLowerCase().includes(query) || 
      book.exam.toLowerCase().includes(query) ||
      book.publisher.toLowerCase().includes(query) ||
      String(book.id) === query
    );
  }, [searchQuery]);

  const displayBooks = useMemo(() => {
    return filteredBooks.slice(0, visibleCount);
  }, [filteredBooks, visibleCount]);

  const addToCart = useCallback((book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item => item.id === book.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...book, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  }, []);

  const removeFromCart = useCallback((id) => setCart(prev => prev.filter(item => item.id !== id)), []);
  
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.qty), 0), [cart]);

  const checkoutOnWhatsApp = () => {
    const items = cart.map(item => `- ${item.title} [ID: ${item.id}] (${item.qty}x)`).join('\n');
    const message = `Hello Merit Book House! I want to order:\n\n${items}\n\nTotal: ₹${cartTotal}`;
    window.open(`https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleLoadMore = () => setVisibleCount(prev => prev + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden antialiased font-inter">
      
      {/* COMPACT NAVBAR WITH INTEGRATED SEARCH */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b border-gray-100/50 transform-gpu">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center gap-4">
          
          {/* Logo Area (Hidden when searching on mobile to save space) */}
          <div 
            className={`${searchQuery ? 'hidden md:flex' : 'flex'} items-center gap-2 shrink-0 cursor-pointer`} 
            onClick={() => { setSearchQuery(""); window.scrollTo({top: 0, behavior: 'smooth'}); }}
          >
            <div className="w-9 h-9 md:w-10 md:h-10 transform-gpu">
              <img 
                src={getDriveUrl(LOGO_DRIVE_ID, 200)} 
                alt="Merit" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Integrated Search Box */}
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors group-focus-within:text-blue-600" />
            <input 
              type="text"
              placeholder="Search 1000+ books by Exam, Title, Author..."
              className="w-full pl-11 pr-10 py-2.5 md:py-3 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-gray-200 rounded-full outline-none transition-all text-sm font-medium placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Cart Trigger */}
          <div className="shrink-0">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 md:p-3 hover:bg-gray-100 rounded-full transition-all active:scale-95 transform-gpu"
            >
              <ShoppingCart className="w-[20px] h-[20px] text-gray-700" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT GRID */}
      <main className="pb-24 pt-8 md:pt-12 min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
            {displayBooks.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                onSelect={setSelectedBook} 
                onAdd={addToCart} 
              />
            ))}
          </div>

          {displayBooks.length === 0 && (
            <div className="py-32 text-center animate-fade-in">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold mb-1">No matches found</h3>
              <p className="text-gray-400 text-sm">Try searching for a different title or exam.</p>
            </div>
          )}

          {filteredBooks.length > visibleCount && (
            <div className="mt-16 flex flex-col items-center">
              <button 
                onClick={handleLoadMore}
                className="flex items-center gap-3 px-10 py-4 bg-black text-white rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10 transform-gpu"
              >
                Load More Books
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-50/50 border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-lg font-extrabold mb-4 tracking-tight">मेरिट बुक हाउस</h2>
              <p className="text-gray-500 font-medium text-xs leading-relaxed max-w-xs mx-auto md:mx-0">
                राजस्थान के युवाओं को सरकारी सेवा के गौरव तक पहुँचाने के लिए समर्पित।
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-12 justify-center md:justify-end">
              <div className="space-y-3">
                <h4 className="font-bold text-gray-300 text-[10px] uppercase tracking-widest">Contact</h4>
                <a href={`https://wa.me/${CONTACT_PHONE}`} className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold hover:text-green-600 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-gray-400" /> {CONTACT_DISPLAY}
                </a>
                <p className="flex items-start justify-center md:justify-start gap-2 text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-gray-400" /> Prem Nagar Puliya, Agra Road, Jaipur
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-gray-300 text-[10px] uppercase tracking-widest">Social</h4>
                <div className="flex justify-center md:justify-start gap-6">
                  <a href="#"><Instagram className="w-5 h-5 text-gray-400 hover:text-pink-600" /></a>
                  <a href="#"><Facebook className="w-5 h-5 text-gray-400 hover:text-blue-600" /></a>
                  <a href="#"><Youtube className="w-5 h-5 text-gray-400 hover:text-red-600" /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200/50">
            <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">
              © 2024 Merit Book House - A unit of Shyamangi Educraft Pvt. Ltd.
            </p>
          </div>
        </div>
      </footer>

      {/* CART MODAL */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 transform-gpu">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-400 ease-out animate-slide-in">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight">Your Selection</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingCart className="w-12 h-12 mb-4" />
                  <p className="font-bold text-sm">Bag is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-6 animate-fade-in">
                    <div className="w-20 h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0 p-2">
                      <img src={getDriveUrl(item.img, 200)} className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm mb-1 leading-tight">{item.title_hi || item.title}</h4>
                      <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-tight">ID: {item.id}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 bg-gray-50 px-3 py-1.5 rounded-full text-xs font-bold">
                          <button onClick={() => updateQty(item.id, -1)} className="hover:text-blue-600 transition-colors"><Minus className="w-3 h-3" /></button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="hover:text-blue-600 transition-colors"><Plus className="w-3 h-3" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-[10px] font-bold text-red-500 uppercase tracking-tighter hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                <div className="flex justify-between font-bold text-xl mb-6 tracking-tight"><span>Total Amount</span><span>₹{cartTotal}</span></div>
                <button onClick={checkoutOnWhatsApp} className="w-full py-4 bg-black text-white font-bold rounded-full transform active:scale-95 transition-all shadow-xl shadow-black/10">
                  Place Order on WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PRODUCT QUICK VIEW */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transform-gpu">
          <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl" onClick={() => setSelectedBook(null)} />
          <div className="bg-white w-full max-w-4xl rounded-[2rem] overflow-hidden relative flex flex-col md:flex-row shadow-2xl animate-scale-in border border-gray-100">
            <button onClick={() => setSelectedBook(null)} className="absolute top-6 right-6 p-3 bg-gray-50 hover:bg-gray-100 rounded-full z-10 transition-colors"><X className="w-5 h-5" /></button>
            <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
              <img src={getDriveUrl(selectedBook.img, 800)} className="max-h-[300px] md:max-h-[450px] object-cover rounded-[1.5rem] shadow-xl transform group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">{selectedBook.exam}</span>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight leading-tight">{selectedBook.title_hi || selectedBook.title}</h2>
              <div className="space-y-4 mb-10 text-sm font-medium">
                <div className="flex justify-between border-b border-gray-100 pb-3"><span className="text-gray-400">Author</span><span className="font-bold">{selectedBook.author}</span></div>
                <div className="flex justify-between border-b border-gray-100 pb-3"><span className="text-gray-400">Publisher</span><span className="font-bold">{selectedBook.publisher}</span></div>
                <div className="flex justify-between border-b border-gray-100 pb-3"><span className="text-gray-400">Book ID</span><span className="font-bold">#{selectedBook.id}</span></div>
              </div>
              <div className="mt-auto flex items-center gap-6">
                <span className="text-3xl font-black">₹{selectedBook.price}</span>
                <button 
                  onClick={() => { addToCart(selectedBook); setSelectedBook(null); setIsCartOpen(true); }}
                  className="flex-1 py-4 bg-black text-white font-bold rounded-full shadow-lg active:scale-95 transition-all"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCROLL TO TOP */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-lg z-40 transform-gpu animate-fade-in hover:bg-gray-50">
          <ArrowUp className="w-5 h-5 text-gray-400" />
        </button>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .transform-gpu { transform: translateZ(0); }
        @keyframes slide-in { from { transform: translate3d(100%, 0, 0); } to { transform: translate3d(0, 0, 0); } }
        @keyframes scale-in { from { transform: scale(0.95) translateZ(0); opacity: 0; } to { transform: scale(1) translateZ(0); opacity: 1; } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-slide-in { animation: slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        body { overscroll-behavior-y: none; }
        input::placeholder { color: #9ca3af; font-weight: 500; }
      `}} />
    </div>
  );
}