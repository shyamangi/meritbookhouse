import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingCart, 
  Search, 
  X, 
  Plus, 
  Minus,
  ChevronRight,
  ArrowRight,
  Trash2,
  Instagram,
  Facebook,
  MessageCircle,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  Filter,
  ArrowUp,
  ShieldCheck,
  Target
} from 'lucide-react';

const BOOKS_DATA = [
  { id: 1, exam: "RAS", title: "Rajasthan Ka Bhugol", author: "Dr. L.R. Bhalla", price: 228.00, img: "1H-kO8v-VjD_f2g7wS4l_9nQx3mPz5rT", publisher: "Kuldeep Publication" },
  { id: 2, exam: "POLICE", title: "Rajasthan Police Guide", author: "Rai Team", price: 450.00, img: "1A-jK8v-VjD_f2g7wS4l_9nQx3mPz5rU", publisher: "Rai Publication" },
  { id: 3, exam: "LDC", title: "General Hindi", author: "Raghav Prakash", price: 320.00, img: "1B-lM9v-VjD_f2g7wS4l_9nQx3mPz5rV", publisher: "Pink City Publishers" },
  { id: 4, exam: "CET", title: "Rajasthan History & Culture", author: "Hukam Chand Jain", price: 280.00, img: "1C-nN0v-VjD_f2g7wS4l_9nQx3mPz5rW", publisher: "Rajasthan Hindi Granth Academy" },
  { id: 5, exam: "REACH", title: "Psychology for Teachers", author: "Dheer Singh Dhabhai", price: 390.00, img: "1D-oO1v-VjD_f2g7wS4l_9nQx3mPz5rX", publisher: "Avni Publication" },
];

const getDriveUrl = (id) => `https://lh3.googleusercontent.com/u/0/d/${id}=w800-h1000-iv`;

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
      book.author.toLowerCase().includes(query) || 
      book.exam.toLowerCase().includes(query)
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
    const items = cart.map(item => `- ${item.title} (${item.qty}x)`).join('\n');
    const message = `Hello Merit Hub! I want to order:\n\n${items}\n\nTotal: ₹${cartTotal}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden antialiased font-inter">
      
      {/* NAVIGATION - Optimized for smooth scrolling */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md z-40 border-b border-gray-100/50 will-change-transform">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <h1 className="text-xl font-bold tracking-tight cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              Merit Hub
            </h1>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
              <a href="#books" className="hover:text-black transition-colors">Browse Books</a>
              <a href="#about" className="hover:text-black transition-colors">Our Mission</a>
            </div>
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

      {/* STATIC HERO SECTION */}
      <section className="pt-8 md:pt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[32px] bg-[#1d1d1f] text-white p-8 md:p-20 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                Premium Exam Preparation
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                RAS 2024 <br /> Ultimate Bundle
              </h2>
              <p className="text-lg md:text-xl text-gray-400 font-medium mb-10 max-w-lg">
                The most comprehensive study material for Rajasthan administrative services, updated for the latest exam pattern.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
                <button className="px-10 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
                  Shop the Bundle
                </button>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 line-through">₹2,100</span>
                  <span className="text-2xl font-bold">₹1,499</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex flex-1 justify-center">
              <div className="w-64 h-80 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl rotate-6 shadow-2xl flex items-center justify-center border border-white/10">
                <ShieldCheck className="w-20 h-20 text-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH BAR */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="relative max-w-2xl mx-auto group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text"
            placeholder="Search books, RAS, Police, or CET materials..."
            className="w-full pl-14 pr-6 py-5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-gray-200 rounded-2xl outline-none transition-all font-medium placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* PRODUCTS */}
      <section id="books" className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h3 className="text-3xl font-bold tracking-tight mb-2">Study Materials</h3>
              <p className="text-gray-500 text-sm font-medium">Official guides and best-selling exam books.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {filteredBooks.map((book) => (
              <div key={book.id} className="group flex flex-col">
                <div 
                  className="relative aspect-[3/4] mb-6 overflow-hidden rounded-2xl bg-[#F5F5F7] cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                  onClick={() => setSelectedBook(book)}
                >
                  <img src={getDriveUrl(book.img)} alt={book.title} className="w-full h-full object-cover p-6 transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold bg-white/90 backdrop-blur px-2.5 py-1 rounded-full uppercase tracking-tight text-[#1d1d1f] shadow-sm">
                      {book.exam}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="font-bold text-[15px] mb-1 leading-snug cursor-pointer hover:text-blue-600 transition-colors" onClick={() => setSelectedBook(book)}>
                    {book.title}
                  </h3>
                  <p className="text-xs font-medium text-gray-400 mb-4 italic h-4 overflow-hidden">{book.author}</p>
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
        </div>
      </section>

      {/* MISSION SECTION */}
      <section id="about" className="max-w-7xl mx-auto px-6 mb-24 scroll-mt-24">
        <div className="bg-[#1d1d1f] rounded-[40px] overflow-hidden p-12 md:p-24 relative">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="inline-flex p-4 bg-blue-600/10 rounded-3xl mb-12">
              <Target className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-[1.2] text-white">
              राजस्थान के युवाओं को सरकारी सेवा के गौरव तक पहुँचाने को समर्पित।
            </h2>
            <p className="text-gray-400 text-lg md:text-2xl font-medium mb-16 leading-relaxed">
              बेस्ट-सेलर बुक्स • डेली एग्जाम अपडेट्स • सही मार्गदर्शन
            </p>
            <button 
              onClick={() => window.open('https://wa.me/911234567890', '_blank')}
              className="px-12 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-transform active:scale-95 text-sm shadow-2xl"
            >
              आज ही हमारी कम्युनिटी का हिस्सा बनें
            </button>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 mb-16">
            <div>
              <h2 className="text-xl font-bold mb-6">Merit Hub</h2>
              <p className="text-gray-400 font-medium max-w-sm leading-relaxed">Dedicated to the future administrators of Rajasthan. We provide more than just books; we provide a roadmap to success.</p>
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
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest pt-8 border-t border-gray-50">© 2024 Merit Hub Book House</p>
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
                      <img src={getDriveUrl(item.img)} className="w-full h-full object-cover p-2" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm mb-1">{item.title}</h4>
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
              <img src={getDriveUrl(selectedBook.img)} className="max-h-[400px] object-cover rounded-2xl shadow-2xl" />
            </div>
            <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">{selectedBook.exam} Series</span>
              <h2 className="text-3xl font-bold tracking-tight mb-6">{selectedBook.title}</h2>
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

        /* Prevent Layout Jitter */
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