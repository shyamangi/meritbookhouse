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
  ChevronDown,
  Check
} from 'lucide-react';

// Book data - Keep adding rows here from your sheet
const BOOKS_DATA = [
  { id: 1, title: "Rajasthan Ka Bhugol", title_hi: "राजस्थान का भूगोल ", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 228.0, img: "1rQGjNj2r65ohKv9ocewOQzveFvkIplua" },
  { id: 2, title: "Rajasthan Rajvyavastha", title_hi: "राजस्थान राजव्यवस्था", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 171.0, img: "1LzP9tJ6Ul_Z7glgIunMyfSCwaI7d3r_g" },
  { id: 3, title: "Rajasthan Itihas", title_hi: "राजस्थान इतिहास", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 238.0, img: "1RbPiMySozXViyF40-46YrY61lpIgl5fX" },
  { id: 4, title: "Rajasthan Kala Sanskriti", title_hi: "राजस्थान कला एवं संस्कृति", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 238.0, img: "1e6kOP0oACl-OY-3reEVsuhRsUpB-fWYU" },
  { id: 5, title: "Bharat Ka Bhugol", title_hi: "भारत का भूगोल", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 190.0, img: "10WFk_3U_npGQn-wTSSKn5TE4xWnJS9OC" },
  { id: 6, title: "Mahila Paryavekshak", title_hi: "महिला पर्यवेक्षक", exam: "Supervisor", author: "Gjanand Sir, Anil Sir, J.P. Choudhary Si", publisher: "Udaan", price: 315.0, img: "1aGcst9sppgkysqPg3CnYxMkXnIYt2WID" },
  { id: 7, title: "Krishi Pravekshak", title_hi: "कृषि पर्यवेक्षक", exam: "Supervisor", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 135.0, img: "1YNw2ozJcLEpAT40k0OGtiMJp-VsD6JB" },
  { id: 8, title: "Frp 1st Grade Samanya Vigyan Ganit Sankhiki", title_hi: "FRP प्रथम श्रेणी (1st Grade) सामान्य विज्ञान, गणित एवं सांख्यिकी", exam: "1st Grade", author: "Ramawtar Bhadhala, Rajendra Prasad Gora, Pradeep Sihag, Dinesh Bhadhala", publisher: "Smile Study", price: 232.0, img: "1t-Ywil3JkmRZsr4yX_ChFaFQcJ6RS9fu" },
  { id: 9, title: "LDC Paper 1 and 2 ", title_hi: "एल.डी.सी. (एलडीसी) पेपर-I एवं II", exam: "LDC", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 594.0, img: "1JX0D1C3Ba9T_krcqfmDoi26uRHVs_SRQ" },
  { id: 10, title: "Frp Rajasthan Current Varshikank", title_hi: "FRP राजस्थान समसामयिकी वार्षिकांक", exam: "All Exams", author: "Santosh Sharma", publisher: "Mumal", price: 81.0, img: "17gbA9TsjVahy1Qdi2PTk-IXTqtLe-HuL" },
  { id: 11, title: "Frp Rajasthan Current Varshikank 4.0", title_hi: "FRP राजस्थान समसामयिकी वार्षिकांक", exam: "All Exams", author: "Santosh Sharma", publisher: "Mumal", price: 108.0, img: "1S6GdtA9Pk8SqSDL0P4I2x2X8xlTNl3rC" },
  { id: 12, title: "2nd Grade Gk Paper 1 ", title_hi: "द्वितीय श्रेणी (II Grade) सामान्य ज्ञान, प्रथम प्रश्न पत्र", exam: "2nd Grade", author: "Pawan Bhawariya, Rakesh Bhaskar, H.P. Taler", publisher: "Nath Publication", price: 629.0, img: "1F1noKgGWzt6i0zzQxJKJYKHJHSS_PxPA" },
  { id: 13, title: "Rajasthan Gk Old Is Gold", title_hi: "राजस्थान सामान्य ज्ञान: ओल्ड इज गोल्ड", exam: "LDC", author: "Pawan Bhawariya, Rakesh Bhaskar, H.P. Taler", publisher: "Nath Publication", price: 585.0, img: "1Rv7oy8igDmzHKluAvqugcKKJzF5C2OI6" },
  { id: 14, title: "Bhartiya Rajvyavastha", title_hi: "भारतीय राजव्यवस्था", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 285.0, img: "1xxq0s6wkeMQHb1w83QUnjJeVsUuIw0xr" },
  { id: 15, title: "Rajasthan Ka Bhugol", title_hi: "राजस्थान का भूगोल ", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 285.0, img: "1l4WJEAh9APiAWPmeaEYo0bFxeSvSjVAb" },
  { id: 16, title: "Rajasthan Kala Sanskriti", title_hi: "राजस्थान कला एवं संस्कृति", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 209.0, img: "11NAMeNQlaAlCeNwzOyjofBU-2m4mmBeE" },
  { id: 17, title: "Rajasthan Rajvyavastha", title_hi: "राजस्थान राजव्यवस्था", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 209.0, img: "1eCFhd-Kxxrq2cdqdB5c_z5K9MWqkhJXs" },
  { id: 18, title: "Rajasthan Ka Itihas", title_hi: "राजस्थान इतिहास", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 209.0, img: "1xd6Ddp04HggFvQkbdzhl0QdUarU2OikA" },
  { id: 19, title: "Adhunik Bharat Ka Itihas", title_hi: "आधुनिक भारत का इतिहास", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 200.0, img: "1cCI4Op6V4ja3Z4VzvyW4XClbJeeBX8dy" },
  { id: 20, title: "RAS Rajasthan Kala Avm Sanskriti", title_hi: "आर.ए.एस. (RAS) राजस्थान कला एवं संस्कृति", exam: "RAS, Police", author: "Rajveer Singh Chalkoi", publisher: "Springboard Academy", price: 152.0, img: "1W_FoyXOPOP7qZwj95C0QC00DM0XjU9Ks" },
];

const ITEMS_PER_PAGE = 12;
const CONTACT_PHONE = "919119113869"; 
const CONTACT_DISPLAY = "911.911.3869";
const LOGO_DRIVE_ID = "1c0M70jx1Vl2tXOHjUcd3Dt0ERSokofUO";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/meritbookhouse",
  facebook: "https://www.facebook.com/meritbookhouse",
  youtube: "https://www.youtube.com/@meritbookhouse"
};

const getDriveUrl = (id, width = 600) => `https://lh3.googleusercontent.com/u/0/d/${id}=w${width}`;

const BookCard = memo(({ book, onSelect, onAdd, isInCart }) => (
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
        />
      </div>
    </div>
    <div className="flex flex-col flex-1 px-1">
      <div className="mb-1">
        <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-tighter">
          {book.exam}
        </span>
      </div>
      <h3 className="font-bold text-[14px] md:text-[15px] mb-1 leading-snug cursor-pointer hover:text-blue-600 transition-colors" onClick={() => onSelect(book)}>
        {book.title}
      </h3>
      <div className="flex flex-col gap-0.5 mb-3">
        <p className="text-[11px] font-medium text-gray-400 truncate italic">{book.author}</p>
        <div className="flex items-center gap-2">
          <p className="text-[10px] font-bold text-gray-500 truncate uppercase tracking-tight">{book.publisher}</p>
          <span className="text-[9px] font-bold text-gray-300 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 uppercase tracking-tight shrink-0">ID: {book.id}</span>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[17px] font-extrabold tracking-tight leading-none">₹{book.price}</span>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onAdd(book); }}
          className={`w-9 h-9 flex items-center justify-center rounded-full transition-all active:scale-90 transform-gpu ${
            isInCart 
            ? "bg-blue-600 text-white shadow-md" 
            : "bg-[#F5F5F7] hover:bg-black hover:text-white"
          }`}
        >
          {isInCart ? <Check className="w-4 h-4" /> : <Plus className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  </div>
));

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const searchSuggestions = [
    "Search 'RAS' Books...",
    "Search 'LDC' Preparation...",
    "Search 'Police' Exams...",
    "Search '1st Grade' Study Material...",
    "Search 'Current Affairs'...",
    "Search by Book Name or ID..."
  ];

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    
    // Rotating placeholder effect
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchSuggestions.length);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

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

  const displayBooks = useMemo(() => filteredBooks.slice(0, visibleCount), [filteredBooks, visibleCount]);

  const addToCart = useCallback((book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) return prev.map(item => item.id === book.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...book, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  }, []);

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.qty), 0), [cart]);

  const checkoutOnWhatsApp = () => {
    const items = cart.map(item => `- ${item.title} [Merit ID: ${item.id}] (${item.qty}x)`).join('\n');
    const message = `Hello Merit Book House! I want to order:\n\n${items}\n\nTotal: ₹${cartTotal}`;
    window.open(`https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] font-inter antialiased overflow-x-hidden">
      
      {/* FIXED NAV BAR */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col">
          {/* Main Nav Row */}
          <div className="h-16 md:h-20 flex items-center gap-4">
            <div className="shrink-0 cursor-pointer hidden md:block" onClick={() => {setSearchQuery(""); window.scrollTo(0,0);}}>
              <img src={getDriveUrl(LOGO_DRIVE_ID, 200)} alt="Logo" className="w-9 h-9 object-contain" referrerPolicy="no-referrer" />
            </div>

            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text"
                placeholder={searchSuggestions[placeholderIndex]}
                className="w-full pl-11 pr-10 py-2.5 md:py-3 bg-[#F5F5F7] focus:bg-white border border-transparent focus:border-gray-200 rounded-full outline-none transition-all text-sm font-medium placeholder-gray-400 placeholder:transition-opacity placeholder:duration-500"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 hover:bg-gray-100 rounded-full transition-all">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* Persistent Results Info Row (Inside Fixed Nav) */}
          {searchQuery && (
            <div className="pb-3 px-1 animate-in fade-in slide-in-from-top-1 duration-300">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-gray-100 md:hidden" />
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-widest whitespace-nowrap">
                  {filteredBooks.length} Results Found
                </span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className={`pb-24 transition-all duration-300 ${searchQuery ? 'pt-32 md:pt-40' : 'pt-20 md:pt-28'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
            {displayBooks.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                onSelect={setSelectedBook} 
                onAdd={addToCart} 
                isInCart={cart.some(item => item.id === book.id)}
              />
            ))}
          </div>

          {displayBooks.length === 0 && (
            <div className="py-32 text-center">
              <p className="text-gray-400 text-sm font-medium">No results found for your search.</p>
              <button onClick={() => setSearchQuery("")} className="mt-4 text-blue-600 font-bold text-xs uppercase tracking-widest">View All Books</button>
            </div>
          )}

          {filteredBooks.length > visibleCount && (
            <div className="mt-16 flex justify-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                className="px-10 py-4 bg-black text-white rounded-full font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Load More Books
              </button>
            </div>
          )}
        </div>
      </main>

      {/* COMPACT CENTERED FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-100 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          {/* Main Identity Row */}
          <div className="flex flex-col md:flex-row items-center gap-1.5 md:gap-4 mb-3">
            <div className="flex items-center gap-2.5">
              <img 
                src={getDriveUrl(LOGO_DRIVE_ID, 80)} 
                alt="Logo" 
                className="w-6 h-6 object-contain opacity-80" 
                referrerPolicy="no-referrer" 
              />
              <span className="text-sm font-bold text-black tracking-tight">Merit Book House</span>
            </div>
            <div className="hidden md:block h-3 w-px bg-gray-200" />
            <p className="text-[10px] text-gray-500 font-medium">
              Prem Nagar Puliya, Agra Road, Jaipur
            </p>
          </div>

          {/* Social & Contact Row */}
          <div className="flex items-center gap-5 mb-4">
            <div className="flex items-center gap-3">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors"><Youtube className="w-3.5 h-3.5" /></a>
            </div>
            <div className="h-3 w-px bg-gray-200" />
            <a href={`https://wa.me/${CONTACT_PHONE}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 hover:text-black transition-colors">
              <Phone className="w-2.5 h-2.5 text-blue-500" />
              {CONTACT_DISPLAY}
            </a>
          </div>
          
          <div className="pt-3 border-t border-gray-100 w-full max-w-sm">
            <p className="text-[9px] text-gray-400 font-medium uppercase tracking-widest leading-relaxed">
              A unit of Shyamangi Educraft Pvt. Ltd.
              <br />
              © 2026 Merit Book House <span className="mx-1 opacity-30">|</span> All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* CART OVERLAY */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold">Your Selection</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-30"><ShoppingCart className="w-12 h-12 mb-4" /><p className="font-bold">Empty</p></div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img src={getDriveUrl(item.img, 200)} className="w-16 h-20 object-cover rounded-lg border border-gray-100" />
                    <div className="flex-1">
                      <h4 className="font-bold text-xs mb-0.5">
                        {item.title}
                        <span className="ml-2 text-[8px] text-gray-400 font-bold border rounded px-1">ID: {item.id}</span>
                      </h4>
                      <p className="text-[10px] text-gray-400 italic mb-1">{item.author}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full text-[10px] font-bold">
                          <button onClick={() => updateQty(item.id, -1)}><Minus className="w-3 h-3" /></button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)}><Plus className="w-3 h-3" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-red-500 font-bold uppercase">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t">
                <div className="flex justify-between font-bold text-lg mb-6"><span>Total Amount</span><span>₹{cartTotal}</span></div>
                <button onClick={checkoutOnWhatsApp} className="w-full py-4 bg-black text-white font-bold rounded-full shadow-lg active:scale-95 transition-all">
                  Order via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUICK VIEW */}
      {selectedBook && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl" onClick={() => setSelectedBook(null)} />
          <div className="bg-white w-full max-w-4xl rounded-[2rem] overflow-hidden relative flex flex-col md:flex-row shadow-2xl animate-scale-in border border-gray-100">
            <button onClick={() => setSelectedBook(null)} className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full z-10"><X className="w-5 h-5" /></button>
            <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
              <img src={getDriveUrl(selectedBook.img, 800)} className="max-h-[350px] object-cover rounded-xl shadow-xl" />
            </div>
            <div className="md:w-1/2 p-8 md:p-12">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 block">{selectedBook.exam}</span>
              <h2 className="text-2xl font-black mb-6 leading-tight">{selectedBook.title}</h2>
              <div className="space-y-3 mb-10 text-xs">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Author</span>
                  <span className="font-bold">{selectedBook.author}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Publisher</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{selectedBook.publisher}</span>
                    <span className="text-[9px] font-bold text-gray-300 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 uppercase tracking-tight">Merit ID: {selectedBook.id}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-black">₹{selectedBook.price}</span>
                <button 
                  onClick={() => { addToCart(selectedBook); setSelectedBook(null); setIsCartOpen(true); }}
                  className={`flex-1 py-4 font-bold rounded-full active:scale-95 transition-all ${
                    cart.some(item => item.id === selectedBook.id)
                    ? "bg-blue-600 text-white"
                    : "bg-black text-white"
                  }`}
                >
                  {cart.some(item => item.id === selectedBook.id) ? "Added to Bag" : "Add to Bag"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-lg z-40">
          <ArrowUp className="w-4 h-4 text-gray-400" />
        </button>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; }
        .font-inter { font-family: 'Inter', sans-serif; }
        @keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-slide-in { animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
}