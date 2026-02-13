import React, { useState, useMemo, useEffect } from 'react';
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
  ArrowUp
} from 'lucide-react';

// Updated book data with the provided list of 20 books
const BOOKS_DATA = [
  { id: 1, title: "Rajasthan Ka Bhugol", title_hi: "राजस्थान का भूगोल ", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 228.00, img: "1rQGjNj2r65ohKv9ocewOQzveFvkIplua" },
  { id: 2, title: "Rajasthan Rajvyavastha", title_hi: "राजस्थान राजव्यवस्था", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 171.00, img: "1LzP9tJ6Ul_Z7glgIunMyfSCwaI7d3r_g" },
  { id: 3, title: "Rajasthan Itihas", title_hi: "राजस्थान इतिहास", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 238.00, img: "1RbPiMySozXViyN3e-46YrY61lpIgl5fX" },
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
  { id: 20, title: "RAS Rajasthan Kala Avm Sanskriti", title_hi: "आर.ए.एस. (RAS) राजस्थान कला एवं संस्कृति", exam: "RAS, Police", author: "Rajveer Singh Chalkoi", publisher: "Springboard Academy", price: 152.00, img: "1W_FoyXOPOP7qZwj95C0QCQ0DM0XjU9Ks" },
];

/**
 * Updated Google Drive URL helper using the thumbnail link method.
 */
const getDriveUrl = (id) => `https://lh3.googleusercontent.com/u/0/d/${id}=w1000`;

const LOGO_DRIVE_ID = "1c0M70jx1Vl2tXOHjUcd3Dt0ERSokofUO";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  const filteredBooks = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return BOOKS_DATA.filter(book => 
      book.title.toLowerCase().includes(query) || 
      book.title_hi.includes(searchQuery) ||
      book.author.toLowerCase().includes(query) || 
      book.exam.toLowerCase().includes(query) ||
      book.publisher.toLowerCase().includes(query) ||
      String(book.id) === searchQuery
    );
  }, [searchQuery]);

  const addToCart = (book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item => item.id === book.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...book, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const checkoutOnWhatsApp = () => {
    const phone = "911234567890"; 
    const items = cart.map(item => `- ${item.title} [Merit ID: ${item.id}] (${item.qty}x)`).join('\n');
    const message = `Hello Merit Book House! I want to order:\n\n${items}\n\nTotal: ₹${cartTotal}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden antialiased font-inter">
      
      {/* NAVIGATION */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md z-40 border-b border-gray-100/50 will-change-transform">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-1.5 cursor-pointer group" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            {/* Logo Image */}
            <div className="w-10 h-10 transition-transform group-hover:scale-105">
              <img 
                src={getDriveUrl(LOGO_DRIVE_ID)} 
                alt="Merit Book House Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="text-xl font-medium tracking-tight">
              Merit Book House
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 hover:bg-gray-100 rounded-full transition-all group"
            >
              <ShoppingCart className="w-[18px] h-[18px] text-gray-700" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* SEARCH BAR */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="relative max-w-2xl mx-auto group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text"
            placeholder="Search books, IDs, publishers, or exams..."
            className="w-full pl-14 pr-6 py-5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-gray-200 rounded-2xl outline-none transition-all font-medium placeholder-gray-400 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* PRODUCTS */}
      <section id="books" className="pb-24 pt-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">Study Materials</h3>
              <p className="text-gray-500 text-sm font-medium">Browse our selection of top-rated exam guides.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {filteredBooks.map((book) => (
              <div key={book.id} className="group flex flex-col">
                <div 
                  className="relative aspect-[3/4] mb-6 overflow-hidden rounded-2xl bg-[#F5F5F7] cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                  onClick={() => setSelectedBook(book)}
                >
                  <img 
                    src={getDriveUrl(book.img)} 
                    alt={book.title} 
                    className="w-full h-full object-cover p-6 transition-transform duration-700 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/400x600/F5F5F7/666666?text=Cover+Unavailable";
                    }}
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="text-[10px] font-bold bg-white/90 backdrop-blur px-2.5 py-1 rounded-full uppercase tracking-tight text-[#1d1d1f] shadow-sm">
                      {book.exam}
                    </span>
                    <span className="text-[9px] font-medium text-gray-400 bg-white/50 backdrop-blur-sm px-2 py-0.5 rounded border border-gray-200 w-fit">
                      Merit ID: {book.id}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="font-bold text-[15px] mb-1 leading-snug cursor-pointer hover:text-blue-600 transition-colors" onClick={() => setSelectedBook(book)}>
                    {book.title_hi || book.title}
                  </h3>
                  <div className="flex flex-col gap-0.5 mb-4 h-8 overflow-hidden">
                    <p className="text-[11px] font-medium text-gray-400 italic leading-none">{book.author}</p>
                    <p className="text-[10px] font-bold text-blue-500/80 uppercase tracking-tighter">{book.publisher}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold tracking-tight">₹{book.price}</span>
                    <button 
                      onClick={() => addToCart(book)}
                      className="w-10 h-10 flex items-center justify-center bg-[#F5F5F7] hover:bg-black hover:text-white rounded-full transition-all active:scale-90"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 font-medium italic">No books found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">मेरिट बुक हाउस</h2>
              <div className="space-y-2">
                <p className="text-gray-700 font-bold leading-relaxed">
                  राजस्थान के युवाओं को सरकारी सेवा तक पहुँचाने के लिए समर्पित।
                </p>
                <p className="text-gray-500 text-sm font-medium">
                  बेस्ट-सेलर बुक्स | डेली एग्जाम अपडेट्स | सटीक मार्गदर्शन
                </p>
                <p className="text-blue-600 font-bold text-lg pt-2">
                  आपकी सफलता का साथी
                </p>
              </div>
            </div>
            <div className="flex gap-16">
              <div className="space-y-4">
                <h4 className="font-bold text-gray-300 text-[10px] uppercase tracking-[0.2em]">Contact</h4>
                <div className="space-y-2 text-sm font-medium">
                  <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> +91 123 456 7890</p>
                  <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Jaipur, Rajasthan</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-gray-300 text-[10px] uppercase tracking-[0.2em]">Social</h4>
                <div className="flex gap-4">
                  <Instagram className="w-5 h-5 cursor-pointer hover:text-blue-600" />
                  <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-600" />
                  <Youtube className="w-5 h-5 cursor-pointer hover:text-blue-600" />
                </div>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest pt-8 border-t border-gray-50">© 2024 Merit Book House</p>
        </div>
      </footer>

      {/* MODALS & DRAWERS */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col transform animate-slide-in">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold">Your Bag</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-20"><p className="text-gray-400 font-medium">Your bag is empty.</p></div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-6">
                    <div className="w-20 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                      <img src={getDriveUrl(item.img)} className="w-full h-full object-cover p-2" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm mb-0.5">{item.title_hi || item.title}</h4>
                      <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-tight">Merit ID: {item.id} • {item.publisher}</p>
                      <p className="text-xs text-gray-400 font-medium mb-4">₹{item.price}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 bg-gray-50 px-3 py-1 rounded-full text-xs font-bold">
                          <button onClick={() => updateQty(item.id, -1)}><Minus className="w-3 h-3" /></button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)}><Plus className="w-3 h-3" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-8 border-t border-gray-100 space-y-4">
                <div className="flex justify-between font-bold text-xl"><span>Total</span><span>₹{cartTotal}</span></div>
                <button onClick={checkoutOnWhatsApp} className="w-full py-4 bg-black text-white font-bold rounded-full hover:opacity-90">
                  Checkout on WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12">
          <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl" onClick={() => setSelectedBook(null)} />
          <div className="bg-white w-full max-w-4xl rounded-[40px] overflow-hidden relative flex flex-col md:flex-row shadow-2xl animate-scale-in">
            <button onClick={() => setSelectedBook(null)} className="absolute top-8 right-8 p-3 bg-gray-100 rounded-full z-10"><X className="w-5 h-5" /></button>
            <div className="md:w-1/2 bg-gray-50 p-12 flex items-center justify-center">
              <img src={getDriveUrl(selectedBook.img)} className="max-h-[400px] object-cover rounded-2xl shadow-2xl" referrerPolicy="no-referrer" />
            </div>
            <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{selectedBook.exam} Series</span>
                <span className="text-[10px] font-medium text-gray-400 border border-gray-200 px-2 py-0.5 rounded">Merit ID: {selectedBook.id}</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">{selectedBook.title_hi || selectedBook.title}</h2>
              <h3 className="text-lg text-gray-500 mb-6">{selectedBook.title}</h3>
              <div className="space-y-4 mb-10 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-3"><span className="text-gray-400">Author</span><span className="font-bold">{selectedBook.author}</span></div>
                <div className="flex justify-between border-b border-gray-100 pb-3"><span className="text-gray-400">Publisher</span><span className="font-bold">{selectedBook.publisher}</span></div>
              </div>
              <div className="flex items-center gap-8 mt-auto">
                <div className="flex flex-col"><span className="text-xs text-gray-400 font-bold mb-1 uppercase">Price</span><span className="text-3xl font-bold">₹{selectedBook.price}</span></div>
                <button 
                  onClick={() => { addToCart(selectedBook); setSelectedBook(null); setIsCartOpen(true); }}
                  className="flex-1 py-4.5 bg-black text-white font-bold rounded-full text-sm shadow-xl"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-lg z-40 transition-opacity animate-in fade-in duration-300">
          <ArrowUp className="w-5 h-5 text-gray-400" />
        </button>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        html { scroll-behavior: smooth; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        nav {
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        @keyframes slide-in {
          from { transform: translate3d(100%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
        
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-slide-in { animation: slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
}