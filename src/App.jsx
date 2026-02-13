import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingCart, 
  Search, 
  X, 
  Plus, 
  Minus,
  ChevronRight,
  ArrowRight,
  Bell,
  Trash2,
  Globe,
  Instagram,
  Facebook,
  MessageCircle,
  BookOpen,
  FileText,
  MapPin,
  Mail,
  Phone,
  Twitter,
  Youtube,
  User,
  Filter,
  ArrowUp
} from 'lucide-react';

/**
 * MANUAL TRANSLATION MAP
 */
const TEXT_MAP = {
  en: {
    navUpdates: "Updates",
    navSyllabus: "Syllabus",
    navBooks: "Books",
    navCommunity: "Join Community",
    tagline: "Your portal to Rajasthan exams",
    heroTitle1: "Curated excellence for",
    heroTitle2: "future officers.",
    heroDesc: "The most accurate study materials and real-time exam notifications.",
    heroCtaShop: "Shop Books",
    heroCtaSyllabus: "Check Syllabus",
    newsTitle: "Latest Announcements",
    newsLive: "LIVE",
    newsReadMore: "Read more",
    booksHeading: "Expertly curated study material",
    searchPlaceholder: "Search by exam, book or author...",
    resultsFound: "Results found",
    cartTitle: "Your Cart",
    cartEmpty: "Your cart is empty",
    cartSubtotal: "Subtotal",
    cartCheckout: "Checkout on WhatsApp",
    viewDetails: "View Details",
    authorLabel: "Author",
    publisherLabel: "Publisher",
    addToCart: "Add to Cart",
    loadMore: "Load More Books",
    showingResults: "Showing",
    of: "of",
    footerAbout: "Merit Book House is Jaipur's trusted partner for competitive exam preparation. We specialize in RPSC, RSSB, and Central exam materials.",
    footerAddress: "123, Education Hub, Gopalpura Bypass, Jaipur, Rajasthan",
    footerQuickLinks: "Quick Links",
    footerFollow: "Follow Us",
    filterAll: "All Exams",
    backToTop: "Back to Top"
  },
  hi: {
    navUpdates: "अपडेट्स",
    navSyllabus: "सिलेबस",
    navBooks: "पुस्तकें",
    navCommunity: "कम्युनिटी",
    tagline: "राजस्थान की परीक्षाओं के लिए आपका पोर्टल",
    heroTitle1: "भविष्य के अधिकारियों के लिए",
    heroTitle2: "बेहतरीन सामग्री।",
    heroDesc: "सटीक अध्ययन सामग्री और रीयल-टाइम परीक्षा सूचनाएं एक ही स्थान पर।",
    heroCtaShop: "किताबें खरीदें",
    heroCtaSyllabus: "सिलेबस देखें",
    newsTitle: "नवीनतम समाचार",
    newsLive: "लाइव",
    newsReadMore: "और पढ़ें",
    booksHeading: "विशेषज्ञों द्वारा तैयार अध्ययन सामग्री",
    searchPlaceholder: "किताबें, परीक्षा या लेखक खोजें...",
    resultsFound: "परिणाम मिले",
    cartTitle: "आपकी कार्ट",
    cartEmpty: "आपकी कार्ट खाली है",
    cartSubtotal: "कुल योग",
    cartCheckout: "व्हाट्सएप पर आर्डर करें",
    viewDetails: "विवरण देखें",
    authorLabel: "लेखक",
    publisherLabel: "प्रकाशक",
    addToCart: "कार्ट में जोड़ें",
    loadMore: "और किताबें दिखाएं",
    showingResults: "दिखा रहे हैं",
    of: "कुल",
    footerAbout: "मेरिट बुक हाउस जयपुर का प्रतियोगी परीक्षा की तैयारी के लिए विश्वसनीय भागीदार है। हम RPSC, RSSB और केंद्रीय परीक्षा सामग्री में विशेषज्ञ हैं।",
    footerAddress: "123, एजुकेशन हब, गोविन्दपुरा बाईपास, जयपुर, राजस्थान",
    footerQuickLinks: "त्वरित लिंक",
    footerFollow: "सोशल मीडिया",
    filterAll: "सभी परीक्षाएं",
    backToTop: "ऊपर जाएं"
  }
};

const BOOKS_DATA = [


   { id: 1, title: "Rajasthan Ka Bhugol", title_hi: "राजस्थान का भूगोल ", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 228.00, img: "1rQGjNj2r65ohKv9ocewOQzveFvkIplua" },
 { id: 2, title: "Rajasthan Rajvyavastha", title_hi: "राजस्थान राजव्यवस्था", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 171.00, img: "1LzP9tJ6Ul_Z7glgIunMyfSCwaI7d3r_g" },
 { id: 3, title: "Rajasthan Itihas", title_hi: "राजस्थान इतिहास", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 238.00, img: "1RbPiMySozXViyN3e-46YrY61lpIgl5fX" },
 { id: 4, title: "Rajasthan Kala Sanskriti", title_hi: "राजस्थान कला एवं संस्कृति", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 238.00, img: "1e6kOP0oACl-OY-3reEVsuhRsUpB-fWYU" },
 { id: 5, title: "Bharat Ka Bhugol", title_hi: "भारत का भूगोल", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 190.00, img: "10WFk_3U_npGQn-wTSSKn5TE4xWnJS9OC" },
 { id: 6, title: "Mahila Paryavekshak", title_hi: "महिला पर्यवेक्षक", exam: "Supervisor", author: "Gjanand Sir, Anil Sir, J.P. Choudhary Si", publisher: "Udaan", price: 315.00, img: "1aGcst9sppgkysqPg3CnYxMkXnIYt2WID" },
 { id: 7, title: "Krishi Pravekshak", title_hi: "कृषि पर्यवेक्षक", exam: "Supervisor", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 135.00, img: "1YNw2ozJcLEpAT40k06OGtiMJp-VsD6JB" },
 { id: 8, title: "Frp 1st Grade Samanya Vigyan Ganit Sankhiki", title_hi: "FRP प्रथम श्रेणी (1st Grade) सामान्य विज्ञान, गणित एवं सांख्यिकी", exam: "1st Grade", author: "Ramawtar Bhadhala,Rajendra Prasad Gora,Pradeep Sihag,Dinesh Bhadhala", publisher: "Smile Study", price: 232.00, img: "1t-Ywil3JkmRZsr4yX_ChFaFQcJ6RS9fu" },
 { id: 9, title: "LDC Paper 1 and 2 ", title_hi: "एल.डी.सी. (LDC) पेपर-I एवं II", exam: "LDC", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 594.00, img: "1JX0D1C3Ba9T_krcqfmDoi26uRHVs_SRQ" },
 { id: 10, title: "Frp Rajasthan Current Varshikank", title_hi: "FRP राजस्थान समसामयिकी वार्षिकांक", exam: "All Exams", author: "Santosh Sharma", publisher: "Mumal", price: 81.00, img: "17gbA9TsjVahy1Qdi2PTk-IXTqtLe-HuL" },
 { id: 11, title: "Frp Rajasthan Current Varshikank 4.0", title_hi: "FRP राजस्थान समसामयिकी वार्षिकांक", exam: "All Exams", author: "Santosh Sharma", publisher: "Mumal", price: 108.00, img: "1S6GdtA9Pk8SqSDL0P4I2x2X8xlTNl3rC" },
 { id: 12, title: "2nd Grade Gk Paper 1 ", title_hi: "द्वितीय श्रेणी (II Grade) सामान्य ज्ञान, प्रथम प्रश्न पत्र", exam: "2nd Grade", author: "Pawan Bhawariya,Rakesh Bhaskar,H.P. TalerK.C. Godara,", publisher: "Nath Publication", price: 629.00, img: "1F1noKgGWzt6i0zzQxJKJYKHJHSS_PxPA" },
 { id: 13, title: "Rajasthan Gk Old Is Gold", title_hi: "राजस्थान सामान्य ज्ञान: ओल्ड इज गोल्ड", exam: "LDC", author: "Pawan Bhawariya,Rakesh Bhaskar,H.P. TalerK.C. Godara,", publisher: "Nath Publication", price: 585.00, img: "1Rv7oy8igDmzHKluAvqugcKKJzF5C2OI6" },
 { id: 14, title: "Bhartiya Rajvyavastha", title_hi: "भारतीय राजव्यवस्था", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 285.00, img: "1xxq0s6wkeMQHb1w83QUnjJeVsUuIw0xr" },
 { id: 15, title: "Rajasthan Ka Bhugol", title_hi: "राजस्थान का भूगोल ", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 285.00, img: "1l4WJEAh9APiAWPmeaEYo0bFxeSvSjVAb" },
 { id: 16, title: "Rajasthan Kala Sanskriti", title_hi: "राजस्थान कला एवं संस्कृति", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 209.00, img: "11NAMeNQlaAlCeNwzOyjofBU-2m4mmBeE" },
 { id: 17, title: "Rajasthan Rajvyavastha", title_hi: "राजस्थान राजव्यवस्था", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 209.00, img: "1eCFhd-Kxxrq2cdqdB5c_z5K9MWqkhJXs" },
 { id: 18, title: "Rajasthan Ka Itihas", title_hi: "राजस्थान इतिहास", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 209.00, img: "1xd6Ddp04HggFvQkbdzhl0QdUarU2OikA" },
 { id: 19, title: "Adhunik Bharat Ka Itihas", title_hi: "आधुनिक भारत का इतिहास", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 200.00, img: "1cCI4Op6V4ja3Z4VzvyW4XClbJeeBX8dy" },
 { id: 20, title: "RAS Rajasthan Kala Avm Sanskriti", title_hi: "आर.ए.एस. (RAS) राजस्थान कला एवं संस्कृति", exam: "RAS, Police", author: "Rajveer Singh Chalkoi", publisher: "Springboard Academy", price: 152.00, img: "1W_FoyXOPOP7qZwj95C0QCQ0DM0XjU9Ks" },
 { id: 21, title: "RAS Bhartiya Arthvyavstha", title_hi: "आर.ए.एस. (RAS) भारतीय अर्थव्यवस्था", exam: "RAS, Police", author: "Vijay singh Shekhawat", publisher: "Springboard Academy", price: 228.00, img: "1WMwjEY23ZBfFdq6Cn67G4tgHf0gPNDaU" },
 { id: 22, title: "RAS Rajasthan Ki Rajvyavastha", title_hi: "आर.ए.एस. (RAS) राजस्थान की राजव्यवस्था", exam: "RAS, Police", author: "Dileep Mahecha", publisher: "Springboard Academy", price: 152.00, img: "1BekGc7kaaAPDnW3cGAt7vAJLJD-QNnTr" },
 { id: 23, title: "RAS Rajasthan Ka Itihas", title_hi: "आर.ए.एस. (RAS) राजस्थान का इतिहास", exam: "RAS, Police", author: "Rajveer Singh Chalkoi", publisher: "Springboard Academy", price: 200.00, img: "16XGlbMZNGpIDPlojFmPLTt37BZIwQ3c9" },
 { id: 24, title: "RAS Rajasthan Ka Bhugol", title_hi: "आर.ए.एस. (RAS) राजस्थान का भूगोल", exam: "RAS, Police", author: "Sangata mam", publisher: "Springboard Academy", price: 228.00, img: "1Zzn-rkjmh6LEmJfuci_-ds_bBrmS_7ST" },
 { id: 25, title: "RAS Prachin Bharat Ka Itihas", title_hi: "आर.ए.एस. (RAS) प्राचीन भारत का इतिहास", exam: "RAS, Police", author: "Narendra Ranawat", publisher: "Springboard Academy", price: 105.00, img: "17j-Ud8TfyMxau_WW3u4vClNbZfyDTM5T" },
 { id: 26, title: "RAS Madhyakalin Bharat Ka Itihas", title_hi: "आर.ए.एस. (RAS) मध्यकालीन भारत का इतिहास", exam: "RAS, Police", author: "Surya sir", publisher: "Springboard Academy", price: 105.00, img: "1CD9_FCShlyRGhTYp5_cvrKfMmZsxCoKT" },
 { id: 27, title: "CET 10+2 Avm Snatak V-I", title_hi: "सी.ई.टी. (CET) 10+2 (Senior Secondary) एवं स्नातक (Graduate) स्तर, खंड-I (Volume-I)", exam: "CET", author: "Kanti Jain Mahaveer Jain", publisher: "Lakshya", price: 508.00, img: "1ULZczTeZYJFJ972w1cDOqFhB13BEm9nK" },
 { id: 28, title: "CET 10+2 V-Ii", title_hi: "सी.ई.टी. (CET) 10+2 (सीनियर सेकेंडरी स्तर), खंड-II (Volume-II)", exam: "CET", author: "Kanti Jain Mahaveer Jain", publisher: "Lakshya", price: 460.00, img: "1wSvRmR_DV32MMjbznD93SCi4fIezdpot" },
 { id: 29, title: "High Court", title_hi: "राजस्थान उच्च न्यायालय", exam: "High Court", author: "Kanti Jain Mahaveer Jain", publisher: "Lakshya", price: 248.00, img: "1N8xo1Zvzuo-koF_BTN0kvu5yuqUcgE_f" },
 { id: 30, title: "Bharat Ka Bhugol", title_hi: "भारत का भूगोल", exam: "IAS, Police", author: "Majid Husain", publisher: "Tata Macgraw Hill", price: 660.00, img: "1AbcCa86NdT_1HCgQYA27crAzJmP8aDl0" },
 { id: 31, title: "Bharat Avm Vishv Ka Bhugol", title_hi: "भारत एवं विश्व का भूगोल", exam: "IAS, Police", author: "Pallavi Saxena", publisher: "Tata Macgraw Hill", price: 540.00, img: "1PdUCQbEJ6lQQ_RNiykdMCezx9WXWhzB7" },
 { id: 32, title: "Bhartiya Kala Sanskrati ", title_hi: "भारतीय कला एवं संस्कृति", exam: "IAS, Police", author: "Nitin Singhania", publisher: "Tata Macgraw Hill", price: 768.00, img: "1R4Oo0QyyXRJntmz8TattWDuhPc-Vxvej" },
 { id: 33, title: "Bharat Ki Rajvyavastha", title_hi: "भारत की राजव्यवस्था", exam: "IAS, Police", author: "M. Laxmikanth", publisher: "Tata Macgraw Hill", price: 820.00, img: "1zmYAg7FvIAdHEAB8NqyqV1pQDMZZuXik" },
 { id: 34, title: "Naveen Hindi Vyakran Avm Rachna", title_hi: "नवीन हिंदी व्याकरण एवं रचना", exam: "RAS, Patwari, VDO, CET, 4th Grade", author: "Dr. Sohandhan Charan", publisher: "Pareek", price: 180.00, img: "1QT8uYFOwqvng8kVUpiQ6AUznTjVeYWtO" },
 { id: 35, title: "Hindi Vyakran (Sumanlata)", title_hi: "हिंदी व्याकरण", exam: "RAS, Patwari, VDO, CET, 4th Grade", author: "Dr. Sumanlata Yadav,Subhash Charan", publisher: "RBD", price: 270.00, img: "1nYaDLzZ-d1gxNf2vL7CO1W4lrA7GP1IJ" },
 { id: 36, title: "Rajasthan Bhugol Arthvyavastha", title_hi: "राजस्थान भूगोल एवं अर्थव्यवस्था", exam: "RAS, Patwari, VDO, CET, 4th Grade", author: "N.S. Sharma Sir ,Dr. Vandana Josh,Dileep Singh", publisher: "Sikhwal", price: 300.00, img: "1qAwCeWnyDnc_gNOP_yL03DHiv7i0wjO-" },
 { id: 37, title: "Rajasthan Itihas", title_hi: "राजस्थान इतिहास", exam: "RAS, Patwari, VDO, CET, 4th Grade", author: "N.S. Sharma Sir", publisher: "Sikhwal", price: 300.00, img: "1Xmw_KiLqY_QmphP45xZ8KQ6FDoJSF03j" },
 { id: 38, title: "Raj. Kala Evem Sanskriti", title_hi: "राजस्थान कला एवं संस्कृति", exam: "RAS, Patwari, VDO, CET, 4th Grade", author: "N.S. Sharma Sir", publisher: "Sikhwal", price: 300.00, img: "15Jvs34VguGCyUq8MugxXS3ah6S3DVdyU" },
 { id: 39, title: "Prayogshala Sahayak Science Model", title_hi: "प्रयोगशाला सहायक (Lab Assistant) - विज्ञान मॉडल पेपर", exam: "Lab Assistant", author: "Ashish Sharma", publisher: "RBD", price: 214.00, img: "1LYENkYUcyMMrH16P6zYXicdcN4H94Ugw" },
 { id: 40, title: "Frp Prayogshala Sahayak Vigyan", title_hi: "प्रयोगशाला सहायक (Lab Assistant)", exam: "Lab Assistant", author: "Ashish Sharma", publisher: "RBD", price: 470.00, img: "1fXIpyFEfb59jrMYGpNZKR8yIvckTRQPm" },
 { id: 41, title: "Ssc Gd Constable", title_hi: "एस.एस.सी. जीडी कांस्टेबल", exam: "Police", author: "Khan Sir", publisher: "RBD", price: 280.00, img: "1HuFomJBfZRc6ZNaADjTS2HOJ6ecuEteu" },
 { id: 42, title: "Frp Raj. Police Gk Vigyan", title_hi: "राजस्थान पुलिस कांस्टेबल", exam: "Police", author: "Subhash Charan ,Ramakant Sharma,Narayan Sharma,U.S. Shekhawat", publisher: "RBD", price: 470.00, img: "1G7ee2c0_EYldY3q8LF2dREeu8p8olkH6" },
 { id: 43, title: "Rajasthan Ka Itihas Divyastra", title_hi: "राजस्थान इतिहास", exam: "Multiple Exams", author: "Subhash Charan", publisher: "RBD", price: 162.00, img: "1XyvbrzvCgvnl-0iNV4kSbrBhC4cifIzU" },
 { id: 44, title: "Frp Rajasthan Kala Sanskriti", title_hi: "राजस्थान कला एवं संस्कृति", exam: "Multiple Exams", author: "Subhash Charan ,Ramakant Sharma", publisher: "RBD", price: 181.00, img: "1nhAexu82IPab92LB5DiJadINLKYhHZqD" },
 { id: 45, title: "Rajasthan Ka Bhugol Divyastra", title_hi: "राजस्थान का भूगोल ", exam: "Multiple Exams", author: "Subhash Charan , Narayan Sharma", publisher: "RBD", price: 162.00, img: "1fRRGsdSCyjhNAfAWCotAsA_7bknu5YoY" },
 { id: 46, title: "High Court Guide Rbd", title_hi: "राजस्थान उच्च न्यायालय", exam: "HIGH COURT", author: "Dr. Sumanlata Yadav, Subhash Charan, Narayan Sharma", publisher: "RBD", price: 297.00, img: "1m3tsx3GPk7jfpgvxUoY1J657kZRa4Es0" },
 { id: 47, title: "2nd Grade SST Itihas", title_hi: "II Grade (द्वितीय श्रेणी शिक्षक) केसामाजिक विज्ञान (SST) विषय के इतिहास", exam: "2nd Grade", author: "Pawan Bhawariya", publisher: "Nath Publication", price: 171.00, img: "1eg6OkASJKqErJoMZibSyHQ6S9G0AQZJH" },
 { id: 48, title: "1st Grade Shekshik Prabandh", title_hi: "I Grade (School Lecturer) परीक्षा के प्रथम प्रश्न-पत्र (Paper-I) के खंड शैक्षिक प्रबन्ध ", exam: "1st Grade", author: "Pawan Bhawariya", publisher: "Nath Publication", price: 180.00, img: "1VB3VcOCwotYJa7ecY_6DRYSWAZOKZSAB" },
 { id: 49, title: "2nd Grade Bhugol SST", title_hi: "II Grade (द्वितीय श्रेणी शिक्षक) SST (सामाजिक विज्ञान) विषय के भूगोल", exam: "2nd Grade", author: "K.C .Godhra ,Vinod taler", publisher: "Nath Publication", price: 225.00, img: "1UqljcrHmtbg5jpVdmA4CF5h6vDu6mdJ8" },
 { id: 50, title: "1st Grade Ganit Sankhiki Mansik Shamta", title_hi: "गणित सांख्यिकी और मानसिक क्षमता खंड के लिए है", exam: "1st Grade", author: "(Navdeep Goyal", publisher: "Nath Publication", price: 126.00, img: "1QEqRfEJ0987a22vzBFaejrJ8Ffw5E0DI" },
 { id: 51, title: "2nd Grade Rajniti Vigyan", title_hi: "II Grade राजनीति विज्ञान (SST)", exam: "2nd Grade", author: "Rakesh bhaskar", publisher: "Nath Publication", price: 162.00, img: "1Q3Tu-OhnoHpuJDhODiUJseF8eo7jHTVP" },
 { id: 52, title: "1st Grade General English", title_hi: "I Grade सामान्य अंग्रेजी", exam: "1st Grade", author: "Dr.C.R. Tetarwal", publisher: "Nath Publication", price: 135.00, img: "1UQ0g7vltxtEX60cEIM_8wamG8jCNNYf_" },
 { id: 53, title: "1st Grade Bhartiya Itihas", title_hi: "I Grade भारतीय इतिहास", exam: "1st Grade", author: "Pawan Bhawariya", publisher: "Nath Publication", price: 108.00, img: "1-vKH8VN4Njbnw3Fo7_BGrf918g-2vVcA" },
 { id: 54, title: "2nd Grade Samajik Vigyan Shikshan Vidhiya", title_hi: "II Grade सामाजिक विज्ञान शिक्षण विधियाँ", exam: "2nd Grade", author: "Dr. Ranjan Pareek", publisher: "Nath Publication", price: 135.00, img: "1smOtkIfEOR22DE4dhI1SWA_1992mmHle" },
 { id: 55, title: "1st Grade Rajasthan Ka Bhugol Rajvyavastha", title_hi: "I Grade राजस्थान का भूगोल एवं राजव्यवस्था", exam: "1st Grade", author: "Rakesh bhaskar", publisher: "Nath Publication", price: 243.00, img: "1mWk060_2IfKZmVC6ES5TDnGvsY1XVArl" },
 { id: 56, title: "1st Grade Rajasthan Itihas Kala", title_hi: "I Grade राजस्थान का इतिहास एवं कला-संस्कृति", exam: "1st Grade", author: "Pawan Bhawariya ,H.P. TalerK", publisher: "Nath Publication", price: 207.00, img: "11we6M7Gs47KfIgQEc7j80o6k2EyRQu2C" },
 { id: 57, title: "Frp LDC Kanishk Sahayak", title_hi: "LDC कनिष्ठ सहायक भर्ती परीक्षा विवरण", exam: "LDC", author: "Gaurav Ghanerao ,Rohit Nama", publisher: "Chyavan", price: 409.00, img: "1kgDdI02r8pYfpc2PqmjKxh4wCOUNliXO" },
 { id: 58, title: "Frp 2nd Grade Samany Gyan Gk", title_hi: "II Grade सामान्य ज्ञान (Paper-I)", exam: "2nd Grade", author: "Gaurav Ghanerao ,Rohit Nama", publisher: "Chyavan", price: 428.00, img: "1mAZztHMAtUUGnIYGgD1xtbVHqxxwGaSM" },
 { id: 59, title: "1st Grade Samany Vigyan", title_hi: "I Grade सामान्य विज्ञान", exam: "1st Grade", author: "Dr. Swati Jabhak", publisher: "Sikhwal", price: 216.00, img: "1qXhBoJPesyX8rqJIhgBrUuV0e_gWMo4h" },
 { id: 60, title: "LDC English", title_hi: "राजस्थान LDC(Clerk Grade-II) परीक्षा में अंग्रेजी", exam: "LDC", author: "Dr. Swati Jabhak", publisher: "Sikhwal", price: 108.00, img: "1VmYPDs1nkE12yMfsSLxwJugiTDU5avDr" },
 { id: 61, title: "LDC Samanya Hindi", title_hi: "राजस्थान LDC (Clerk Grade-II) परीक्षा में सामान्य हिंदी", exam: "LDC", author: " Sahadev Choudhary ,Bharat Khorana ,Usha Sharma,Hemant Jangid", publisher: "Sikhwal", price: 108.00, img: "1dWbNnW36-MJmqa0dH-Xkv3TGiLPzSRON" },
 { id: 62, title: "LDC Tricky Ganit", title_hi: "LDC Tricky Ganit (ट्रीकी गणित", exam: "LDC", author: "R.K. Nath Sir", publisher: "Sikhwal", price: 108.00, img: "1xDL_ZXbCsYBsNFc3QoX8ffO6dVmzWo3f" },
 { id: 63, title: "2nd Grade GK Volume 1", title_hi: "II Grade सामान्य ज्ञान (वॉल्यूम-1)", exam: "2nd Grade", author: "N.M.Sharma", publisher: "Sikhwal", price: 599.00, img: "1rwcSOQmWgGXiqTqmK2WHiP_fuLcHRBjQ" },
 { id: 64, title: "Vanpal New", title_hi: "वनपाल new ", exam: "Vanpal", author: "N.M.Sharma", publisher: "Sikhwal", price: 419.00, img: "1yfqi7fek2BCWBMFnzT5GmCX_v530bAq8" },
 { id: 65, title: "Agriculture Volume 2", title_hi: "एग्रीकल्चर वॉल्यूम -2 ", exam: "Agriculture", author: "Nikhil Khandelwal", publisher: "Sikhwal", price: 300.00, img: "1Jqe9MyCoTpXd6ZY3tiHB02LhqzUBn_rK" },
 { id: 66, title: "2nd Grade Shiksha Manovigyan Volume 2", title_hi: "II Grade शिक्षा मनोविज्ञान Volume-II", exam: "2nd Grade", author: " Dr. Vandana Joshi", publisher: "Sikhwal", price: 282.00, img: "1neRpRav744mrXMSBVJhiog2PiYIAbHxk" },
 { id: 67, title: "Rajasthan Manchitrawali", title_hi: "राजस्थान मानचित्रावली", exam: "ALL EXAM", author: "N.M.Sharma , Dr. Vandana Joshi", publisher: "Sikhwal", price: 144.00, img: "1dzaVWq1_RmOsrmE8Ird682mXUiw2F7ex" },
 { id: 68, title: "3rd Grade Leve 1 Solved Paper", title_hi: " GIIIrade L-I Solved Paper", exam: "3rd Grade", author: " Sikhwal team", publisher: "Sikhwal", price: 179.00, img: "1yXowwjdtlCxw1whBg3tTHvS0SExeZG_M" },
 { id: 69, title: "3rd Grade Samajik Solved Paper", title_hi: "Grade सामाजिक अध्ययन (SST) Solved Paper", exam: "1st Grade", author: " Sikhwal team", publisher: "Sikhwal", price: 239.00, img: "1q6THar4HR8hO2obEHYSq_AwjWqXtrD3N" },
 { id: 70, title: "REET Ganit Vigyan Solved Paper", title_hi: "REET गणित-विज्ञान Solved Paper", exam: "1st Grade", author: " Sikhwal team", publisher: "Sikhwal", price: 239.00, img: "1yTzRUS8f-mLqu672GDDm8TIAj_sSXchC" },
 { id: 71, title: "RAS Arthik Avdharnaye Arthvyavastha", title_hi: "RAS आर्थिक अवधारणाएं एवं अर्थव्यवस्था", exam: "REET", author: "Kirti Kumar  Ahuja, N.M.Sharma", publisher: "Sikhwal", price: 239.00, img: "15QMaFJbMXk49Y5S_fXb6UXE6_upDrNc1" },
 { id: 72, title: "1st Grade Manovigyan", title_hi: "1 Grade शिक्षा मनोविज्ञान", exam: "1st Grade", author: "Dr. Vipin Gahlot , Dr. Vandana Joshi", publisher: "Sikhwal", price: 179.00, img: "1aRRUdctQh_nZwcy2eisF7HZNa_n4xVKW" },
 { id: 73, title: "Hindi Vyakaran", title_hi: "हिंदी व्याकरण", exam: "ALL EXAM", author: " Subhash Yadav ,Ekta aiianiha", publisher: "MP", price: 336.00, img: "1gthymJAmfae3VlXLeFyaa1PYms1Ol72c" },
 { id: 74, title: "Samanya Hindi", title_hi: "सामान्य हिंदी", exam: "ALL EXAM", author: "Dr. Raghav Prakash", publisher: "PCP", price: 360.00, img: "1bf41l86QmRkhZpCy709GDsvJGl2Gqq8f" },
 { id: 75, title: "Rajasthan Itihas Kala Sanskriti", title_hi: "राजस्थान का इतिहास, कला एवं संस्कृति", exam: "ALL EXAM", author: "Dr. Hukumchand Jain ,Dr. Narayan Lal Mali", publisher: "RHGA", price: 280.00, img: "1Z2ai-StYRm70Xhk2gdQ3VEh7gQkgpcbT" },
 { id: 76, title: "Hindi Vyakaran Meemansa", title_hi: "हिंदी व्याकरण मीमांसा", exam: "ALL EXAM", author: "Dr. S. Kalirana", publisher: "Chillayshi ", price: 384.00, img: "1UVFboOHHIshxdrROCaJ_yRagcf0xzdh1" },
 { id: 77, title: "A Competitive Book", title_hi: "ए कॉम्पिटिटिव  बुक ", exam: "Agriculture", author: "P.D. Choudhary", publisher: "AGRICULTURE", price: 300.00, img: "1r_g9Y2yCONppVPHrDAD5UeOfeWJHIUJp" },
 { id: 78, title: "A Competitive Book Of Agriculture", title_hi: "ए कॉम्पिटिटिव  बुक ऑफ़ एग्रीकल्चर -1", exam: "Agriculture", author: "Dr. Nemraj Sunda", publisher: "Sunda", price: 320.00, img: "1-553yWV4W06UxAbuWFbww3Z4LTHyl6Qa" },
 { id: 79, title: "A Competitive Book Of Agriculture", title_hi: "ए कॉम्पिटिटिव  बुक ऑफ़ एग्रीकल्चर -2", exam: "Agriculture", author: "Dr. Nemraj Sunda ,Dr. Nemraj Sunda", publisher: "Sunda", price: 300.00, img: "1TkpRcK06z2nz1q1otkDiOgucMVR-o9Uo" },
 { id: 80, title: "Vijay Computer Guru", title_hi: "विजय कंप्यूटर गुरु", exam: "ALL EXAM", author: "Vardhman Mahaveer Open University", publisher: "Shiv Publication", price: 84.00, img: "1utU_XlEYIEWs4tdGi7qb3v8_qZ31HDXm" },
 { id: 81, title: "Junior English Grammar", title_hi: "जूनियर इंग्लिश ग्रामर", exam: "JUNIOR ENGLISH GRAMMAR", author: "Dr. R K Sharma", publisher: "Lucent", price: 63.00, img: "10y9WxCVkm0__4hCgkhqZATs3Zy7AJTfb" },
 { id: 82, title: "High School English Grammar", title_hi: "हाई स्कूल इंग्लिश ग्रामर", exam: "HIGH SCHOOL ENGLISH GRAMMAR", author: "Dr. R K Sharma", publisher: "Lucent", price: 143.00, img: "1C--2ItaEvlDuZC19n378WZYm4hSwB4AX" },
 { id: 83, title: "Computer Hindi", title_hi: "कंप्यूटर  -हिंदी", exam: "ALL EXAM", author: "Rani Ahilya", publisher: "Lucent", price: 60.00, img: "1yKeyTlNu0-KPctXKCa_UldUM2Eax5I74" },
 { id: 84, title: "Dictionary Enghlis to Hindi", title_hi: " डिक्शनरी अंग्रेजी-हिंदी", exam: "CENTRAL ALL EXAM", author: "Dr. S.K Verma", publisher: "Oxford", price: 340.00, img: "1hiwcn28hJvQ4q3ZRo7cdUxlrdef28hTh" },
 { id: 85, title: "Adhunik Bharat Ka Itihas", title_hi: "आधुनिक भारत का इतिहास", exam: "CENTRAL ALL EXAM", author: "Rajiv Ahir", publisher: "Spectrum", price: 548.00, img: "1hhNPIHG-y4QkYw7UnUNg4c7Pkzd6MVqK" },
 { id: 86, title: "Modern India", title_hi: "आधुनिक भारत का इतिहास", exam: "CENTRAL ALL EXAM", author: "Rajiv Ahir", publisher: "Spectrum", price: 532.00, img: "11RJikSP5kun__i85DGEoPGZPa6PX-iSY" },
 { id: 87, title: "Oxford Mini English Hindi", title_hi: "ऑक्सफोर्ड मिनी शब्दकोश", exam: "CENTRAL ALL EXAM", author: "Krishna Kumar Goswami", publisher: "Oxford", price: 176.00, img: "1nqXA9WAxi90gGcD7z4E_lAxT1OOq_Ld9" },
 { id: 88, title: "Frp Current GK Rajasthan Varshikank", title_hi: "राजस्थान वार्षिकांक", exam: "ALL EXAM", author: "Gaurav Ghanerao ,Rajkumar Sharma ", publisher: "Chyavan", price: 143.00, img: "1VVexjae2dF_IZ3-oKH754qE53bWFZoCx" },
 { id: 89, title: "Pocket Samanya Gyan", title_hi: "पॉकेट सामान्य ज्ञान", exam: "CENTRAL ALL EXAM", author: "Khan Sir", publisher: "RBD", price: 200.00, img: "11wkeTYeLQlJA9gpNIojcvlImVGzkWcxg" },
 { id: 90, title: "Vanpal Vanraksh Sarveyar", title_hi: "वनपाल एवं वनरक्षक", exam: "VANPAL VANRAKSH SARVEYAR", author: "DIKSHA", publisher: "Diksha", price: 127.00, img: "1DZNZ0T2d15RuqSasjRhmnhH-SjUetmUp" },
 { id: 91, title: "1st Grade Hindi Gadh Padh Rachnaye", title_hi: "1 Grade गद्य और पद्य रचनाएं", exam: "1st Grade", author: "Professor K.C. Maiya", publisher: "Gyan Vitan", price: 203.00, img: "1XbF0gXXP3gCTBfyjJsPyINod9l0dPXfu" },
 { id: 92, title: "Sanskratik Rajasthan Kala Sanskrit", title_hi: "सांस्कृतिक राजस्थान कला एवं संस्कृति", exam: "ALL EXAM", author: "Rahul Choudhary", publisher: "Gyan Vitan", price: 349.00, img: "1a0iHR-pgWlvBJqxi1CfKHSqSjiNzFr2J" },
 { id: 93, title: "Rajasthan Ka Itihas NRT ", title_hi: "राजस्थान इतिहास", exam: "ALL EXAM", author: "Pawan Bhawariya", publisher: "Nath Publication", price: 198.00, img: "14G-fyGKX1NozA--Pcb5ps_j0E9Th3XcF" },
 { id: 94, title: "Rajasthan Ka Bhugol Arthvyavastha", title_hi: "राजस्थान भूगोल एवं अर्थव्यवस्था", exam: "ALL EXAM", author: "H.P. Taler", publisher: "Nath Publication", price: 189.00, img: "1J0e7nqsbUp7izBB-NgHjC31WAjw_Shf3" },
 { id: 95, title: "Rajasthan Kala Sanskriti (Nrt)", title_hi: "राजस्थान कला एवं संस्कृति", exam: "ALL EXAM", author: "Pawan Bhawariya", publisher: "Nath Publication", price: 207.00, img: "1j7ns_7qFAoaaGmQPPE0_xatpzhJj5kzj" },
 { id: 96, title: "2nd Grade Vigyan Solved Paper", title_hi: "II Grade विज्ञान सोल्वड पेपर", exam: "II Grade", author: "Solved Paper", publisher: "Prerna Publication", price: 228.00, img: "1LippgUf65WUxJ5OdCnosKZRwFQ0QaKxT" },
 { id: 97, title: "2nd Grade Ganit Solved Paper", title_hi: "II Grade गणित सोल्वड पेपर", exam: "II Grade", author: "Solved Paper", publisher: "Prerna Publication", price: 240.00, img: "1vCCYYmrewv4VLbupdgQI44K3NBzqny6d" },
 { id: 98, title: "2nd Grade Sanskrit Solved Paper", title_hi: "II Grade संस्कृत सोल्वड पेपर", exam: "II Grade", author: "Solved Paper", publisher: "Prerna Publication", price: 210.00, img: "1JU2zLfZnoqZIHG0sVkvQsYTZxsTqD1CQ" },
 { id: 99, title: "2nd Grade Hindi Solved Paper", title_hi: "II Grade हिंदी सोल्वड पेपर", exam: "II Grade", author: "Solved Paper", publisher: "Prerna Publication", price: 228.00, img: "1UycAxvqgluQ2MtWnLDVp0DNNQ2Z8Ec7D" },
 { id: 100, title: "2nd GradeSamajik Solved Paper", title_hi: "II Grade सामाजिक विज्ञान सोल्वड पेपर", exam: "II Grade", author: "Solved Paper", publisher: "Prerna Publication", price: 228.00, img: "1VHIfqhVXHUN761iLwobklDUo0qLtZ8Bu" },
 { id: 101, title: "2nd Grade English Solved Paper", title_hi: "II ग्रेड अंग्रेजी  सोल्वड पेपर", exam: "II Grade", author: "Solved Paper", publisher: "Prerna Publication", price: 210.00, img: "10hrW81XM4DOKgjXikQUp3wkxAGBDkE7Q" },
 { id: 102, title: "Pre BSTC Model", title_hi: "प्री Bstc  सोल्वड पेपर", exam: "BSTC", author: "Solved Paper", publisher: "Prerna Publication", price: 228.00, img: "11KUaxdEBKRm30mlICZkenBxF4FzZpKjM" },
 { id: 103, title: "Prerna 1st Grade Commerce", title_hi: "प्रेरणा I Grade कॉमर्स", exam: "1st Grade", author: "Solved Paper", publisher: "Sonu Prakashan", price: 240.00, img: "11fVz7y4AAVIfGH-CdKW4QLPje1BckBtS" },
 { id: 104, title: "Prerna 1st Grade Physics", title_hi: "प्रेरणा I Grade भौतिक विज्ञान", exam: "1st Grade", author: "Solved Paper", publisher: "Sonu Prakashan", price: 240.00, img: "175Sbxip3lJevO3cTZopb5hWEuTbow7OO" },
 { id: 105, title: "Prerna 1st Grade English Solved Paper ", title_hi: "प्रेरणा I Grade अंग्रेजी सोल्वड पेपर", exam: "1st Grade", author: "Solved Paper", publisher: "Sonu Prakashan", price: 192.00, img: "178DslMx5O11anwEvATQDxz1PjoXFRus2" },
 { id: 106, title: "Prerna 1st Grade Economics", title_hi: "प्रेरणा I Grade अर्थशास्त्र", exam: "1st Grade", author: "Solved Paper", publisher: "Sonu Prakashan", price: 240.00, img: "17Cz1zUbUPPDCwvVnh3orjzYi3qd3pzo0" },
 { id: 107, title: "Naveen Rashtriya School Atlas (H)", title_hi: "नवीन राष्ट्रीय स्कूल एटलस (हिंदी)", exam: "NAVEEN RASHTRIYA SCHOOL ATLAS (H)", author: "Biba Singh Kaushal", publisher: "IBD (MH)", price: 264.00, img: "17fz_fJA0J6sd2GB80HqTf4lfXRXZsk5Q" },
 { id: 108, title: "Oxford School Atlas (H)", title_hi: "ऑक्सफोर्ड स्कूल एटलस (हिंदी)", exam: "OXFORD SCHOOL ATLAS (H)", author: "Oxford", publisher: "Oxford", price: 272.00, img: "17s43C1MX0XLgS1AUHCi9trNLaWUboDes" },
 { id: 109, title: "Oxford Student Atlas English", title_hi: "ऑक्सफोर्ड स्टूडेंट एटलस (अंग्रेजी )", exam: "OXFORD STUDENT ATLAS ENGLISH", author: "Oxford", publisher: "Oxford", price: 340.00, img: "18TgsmI_vcABQW6Dv4H4Cq_vTgCFbokNz" },
 { id: 110, title: "Lucent General Knowledge", title_hi: "लूसेंट सामान्य ज्ञान", exam: "CENTRAL ALL EXAM", author: "Dr.Binay ,Sanju kumar ,Mahendra Mukal ,R.P.Suman Renu Sinha", publisher: "Lucent", price: 236.00, img: "1APMyRs73woc27ESdDyHl91Qm342zt_lR" },
 { id: 111, title: "Lucent Samanya Vigyan", title_hi: "लूसेंट सामान्य विज्ञान", exam: "CENTRAL ALL EXAM", author: "Sanju kuma  ,Neeraj Chandar Choudhary", publisher: "Lucent", price: 184.00, img: "1BR1HEjCGVVByAH_zIfGEPPFCIZHFWCb8" },
 { id: 112, title: "Lucent Vastunistha Samany Gyan", title_hi: "लूसेंट वस्तुनिष्ठ सामान्य ज्ञान", exam: "CENTRAL ALL EXAM", author: "Sanju kuma  ,Neeraj Chandar Choudhary", publisher: "Lucent", price: 344.00, img: "1C8BV1_iM90Ymr5-XPpD3TtkdKh9733B_" },
 { id: 113, title: "Lucent General English", title_hi: "लूसेंट जनरल इंग्लिश", exam: "CENTRAL ALL EXAM", author: "A.K.Thakur ,Veena Thakur", publisher: "Lucent", price: 344.00, img: "1CWcNXM2kMwCr2oDdjyxMjBY0GRIF68D6" },
 { id: 114, title: "Hindi 20-20", title_hi: "सामान्य हिंदी 20-20", exam: "CENTRAL ALL EXAM", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1CclO4-StALLbzBvNsNYGH-CWkXSqszsK" },
 { id: 115, title: "Bhartiya Sanvidhan Avm Rajvyavastha", title_hi: "भारतीय संविधान एवं राजव्यवस्था", exam: "CENTRAL ALL EXAM", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1E3XvAh2lsF-CzzCchGefEOgnP3SWrZAm" },
 { id: 116, title: "Ganit 20-20", title_hi: "गणित 20-20", exam: "CENTRAL ALL EXAM", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1E7ujksYfRehA07ByrZvPKN79JwKzHMjI" },
 { id: 117, title: "Reasoning 20-20", title_hi: "रीजनिंग 20-20", exam: "CENTRAL ALL EXAM", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1E83tqnDBMR2LxFmdc7dX5JFhkJfCyTEl" },
 { id: 118, title: "I Grade Shekshik Manovigyan", title_hi: "I Grade शैक्षिक मनोविज्ञान", exam: "1st Grade", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1FLmomz_gP8HZ8blBbu7T2bIcX0nRiCgY" },
 { id: 119, title: "Bharat Vishv Bhugol 20-20 (Dr. Rajeev)", title_hi: "भारत एवं विश्व का भूगोल 20-20", exam: "ALL EXAM", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1G18449WAWiyRxwHuguA3Hf_2j4QwL0ig" },
 { id: 120, title: "Computer 2020", title_hi: "कंप्यूटर 2020", exam: "ALL EXAM", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1GCMeGSxAVaqt8JATHFlk2UjlCdvdo-hX" },
 { id: 121, title: "Dainik Vigyan 2020", title_hi: "दैनिक विज्ञान 20-20", exam: "ALL EXAM", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1GPYlaoyeX_ldAyt_AJkLaxpD1ROM0lk_" },
 { id: 122, title: "Bharat Vishv Itihas 20-20", title_hi: "भारत एवं विश्व का इतिहास 20-20", exam: "ALL EXAM", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1Imx7m7ANaJfEbQmOvRRqNamLzUynXmWL" },
 { id: 123, title: "Handbook Of Agriculture Supervisor", title_hi: "कृषि पर्यवेक्षक", exam: "Supervisor ", author: " Rampal Rundala  ,Aarti Chitra Wale", publisher: "Kailanki", price: 304.00, img: "1JWN_ZR25RqJZbTQto29u7D7EI1i97Njs" },
 { id: 124, title: "All Rajasthan Bhugol Exam Review", title_hi: "राजस्थान भूगोल परीक्षा समीक्षा", exam: "ALL EXAM", author: "Santosh Sharma Devi ", publisher: "Mumal", price: 237.00, img: "1LX-S_i_u8z3a1XhVsyAyvuhv_KaBxM-l" },
 { id: 125, title: "All Rajasthan Itihas Exam Review", title_hi: "राजस्थान इतिहास परीक्षा समीक्षा", exam: "ALL EXAM", author: "Santosh Sharma Devi ", publisher: "Mumal", price: 234.00, img: "1M4U_vWeJykNaJJlkciHvld8FIMpVvavR" },
 { id: 126, title: "Rapidex English Speking Course (H)", title_hi: "रैपिडेक्स इंग्लिश स्पीकिंग कोर्स (हिंदी माध्यम के लिए अंग्रेजी सीखने )", exam: "RAPIDEX ENGLISH SPEKING COURSE (H)", author: "R.K. Gupta M.A", publisher: "PM", price: 252.00, img: "1MUNsYSSmKag7H652ZwfN1ie0ix7b8g1c" },
 { id: 127, title: "2nd Grade Itihas", title_hi: "2nd Grade इतिहास", exam: "II Grade", author: "Gaurav Ghanerao", publisher: "Chyavan", price: 190.00, img: "1MZWOyM1V_WpppsLkCtiUhjfl9TTK--Za" },
 { id: 128, title: "Frp 2nd Grade Rajniti Vigyan", title_hi: "II Grade राजनीति विज्ञान", exam: "II Grade", author: "Pushpendra Kasana", publisher: "Chyavan", price: 200.00, img: "1NOag6xAQKn9abcR0cELwgNQ8tONdz9Fk" },
 { id: 129, title: "Frp 2nd Grade Arthshastra", title_hi: "II Grade अर्थशास्त्र", exam: "II Grade", author: "Dr. Ajay Sharma", publisher: "Chyavan", price: 124.00, img: "1NjRL3BKUXJPb6GsXliGojVpeW0f1A75N" },
 { id: 130, title: "Frp 2nd Grade Darshanshastra", title_hi: "II Grade दर्शनशास्त्र", exam: "II Grade", author: "Pushpendra Kasana", publisher: "Chyavan", price: 162.00, img: "1Nx2i16BsrMNPy1T2ga8R4VZUw7bugkVI" },
 { id: 131, title: "Frp 2nd Grade Lok Prashasan", title_hi: "II Grade लोक प्रशासन", exam: "II Grade", author: "Pushpendra Kasana", publisher: "Chyavan", price: 152.00, img: "1OKlqrbBKoEwogaxnJCyBi8LH7v25VaaB" },
 { id: 132, title: "Frp 2nd Grade Samajshastra", title_hi: "II Grade समाजशास्त्र", exam: "II Grade", author: "Sunil Dhattarwal", publisher: "Chyavan", price: 166.00, img: "1OSgVIBteLpOBBESafsW-UBY76JwZ-VNv" },
 { id: 133, title: "Frp  2nd Grade Bhugol", title_hi: "II Grade भूगोल", exam: "II Grade", author: "Dr. Vijay Prakash, Sanjay Chaudhari, Nidhi Yadav", publisher: "Chyavan", price: 219.00, img: "1P4IOMDglULGh_FdRZPf0mR8opgG2O-18" },
 { id: 134, title: "Rajasthan Ki Rajvyvastha", title_hi: "राजस्थान की राजव्यवस्था", exam: "ALL EXAM", author: "Dr. Rahul Chaudhary", publisher: "Gyan Vitan", price: 308.00, img: "1QgxCq4Mst-uIL2rfzVvixLP8Zkcb8eM9" },
 { id: 135, title: "Bharat Ki Rajvyavastha", title_hi: "भारत की राजव्यवस्था", exam: "ALL EXAM", author: "Dr. Rahul Chaudhary", publisher: "Gyan Vitan", price: 364.00, img: "1QwHe7cpv7_v-qE60p1Bpmgwx_wNhTmqb" },
 { id: 136, title: "Current Varshiki", title_hi: "करेंट अफेयर्स वार्षिकी 2025-26", exam: "ALL EXAM", author: "Mukesh kumar ", publisher: "Speedy", price: 90.00, img: "1RgpFx8xdPWEJKbtFYEyMIf9sELoBwjsU" },
 { id: 137, title: "Frp Current Gk", title_hi: "राजस्थान विशेष: प्रमुख हॉट टॉपिक्स (2025-26)", exam: "ALL EXAM", author: "Santosh Sharma", publisher: "Mumal", price: 27.00, img: "1Rk7v6UEOoPLKFjSjKB4IOdWz7e78epfA" },
 { id: 138, title: "Static Gk", title_hi: "स्थैतिक सामान्य ज्ञान", exam: "ALL EXAM", author: "Naveen Sharma Sir", publisher: "Ankit Bhati", price: 159.00, img: "1S73t_rhyahozBi8bFXOocTGaAbv5ToNX" },
 { id: 139, title: "Ssc Gd Samanya Hindi", title_hi: "SSC GD सामान्य हिंदी", exam: "SSC GD CONSTABLE", author: "Ankit Bhati", publisher: "Ankit Bhati", price: 119.00, img: "1SO_SMIvweJxRA5LeFPVvBaoRHAOjd1G-" },
 { id: 140, title: "Ssc Gd Reasoning Verbal Non Verbal", title_hi: "SSC GD रीजनिंग (Verbal & Non-Verbal)", exam: "SSC GD CONSTABLE", author: "Ankit Bhati", publisher: "Ankit Bhati", price: 119.00, img: "1ScoKHsY4Hnfl8viAwxL5w0ehZvYLJ5iS" },
 { id: 141, title: "Ssc Gd Maths", title_hi: "SSC GD गणित", exam: "SSC GD CONSTABLE", author: "Ankit Bhati", publisher: "Ankit Bhati", price: 119.00, img: "1SeQlohHqqVF30a983qzhMCgPjArFU6L0" },
 { id: 142, title: "Ssc Gd Samanya Adhyan Gs", title_hi: "SSC GD Constable परीक्षा में सामान्य अध्ययन", exam: "SSC GD CONSTABLE", author: "Ankit Bhati", publisher: "Ankit Bhati", price: 140.00, img: "1SvZq0ljXq6LsiK25ezAn5s6BncrhRVMf" },
 { id: 143, title: "Rajasthan Chronology", title_hi: "राजस्थान क्रोनोलॉजी", exam: "ALL EXAM", author: "Santosh Sharma", publisher: "PMC", price: 36.00, img: "1TEWJPwRhUR9Ko1PTYx4YMXQrQvPycZoj" },
 { id: 144, title: "Frp Rajasthan Current Varshikank", title_hi: "FRP राजस्थान करंट वार्षिकांक", exam: "ALL EXAM", author: "Santosh Sharma", publisher: "Mumal", price: 81.00, img: "1Tg1sCpHJ_JrKDswgxuwPjLyUshZgNyDK" },
 { id: 145, title: "Chronology", title_hi: " क्रोनोलॉजी", exam: "ALL EXAM", author: "Pradeep Saraswati", publisher: "Chrono Current ", price: 23.00, img: "1TnE3aDjbY5uNj6sKszfRcT0DxoUnwuRn" },
 { id: 146, title: "Rajasthan Itihas Bhramastra (Rohit Sir)", title_hi: "राजस्थान इतिहास ब्रह्मास्त्र", exam: "ALL EXAM", author: "Rohit sir", publisher: "Apni Padhai", price: 90.00, img: "1VGK_uklnpbUNMPxWPZ8TT-qGJ_RAJR7i" },
 { id: 147, title: "Rajasthan Bhugol Bhramastra (Rohit Sir)", title_hi: "राजस्थान का भूगोल ब्रह्मास्त्र", exam: "ALL EXAM", author: "Rohit sir", publisher: "Apni Padhai", price: 153.00, img: "1VbtNRgw0sGXa_58E_FTceluI698KglVC" },
 { id: 148, title: "Rajasthan Kala Sanskriti Bramastra", title_hi: "राजस्थान कला एवं संस्कृति ब्रह्मास्त्र", exam: "ALL EXAM", author: "Rohit sir", publisher: "Apni Padhai", price: 135.00, img: "1VjAJ36919ww8NkSSOop2uiUJ6dIKql13" },
 { id: 149, title: "Omr Sheet", title_hi: "ओएमआर शीट", exam: "PSI", author: "OMR SHEET", publisher: "Sarthak", price: 27.00, img: "1W6L8jOVXLdLqcV6EuIxCoz-N1XSISjK4" },
 { id: 150, title: "Psi Pyq", title_hi: " पुलिस सब इंस्पेक्टर प्रीवियस  कुस्शन", exam: "PSI", author: "PYQ", publisher: "Sarthak", price: 180.00, img: "1Wc3KfTbFBbdZFrYeULgolHGlLpoaIrit" },
 { id: 151, title: "Cet Snatak Pyq", title_hi: "राजस्थान CET स्नातक (Graduate Level) प्रीवियस  कुस्शन", exam: "CET", author: "PYQ", publisher: "Sarthak", price: 156.00, img: "1WkSIXcNYcT8Jx6gi1tcCYGeZT9A0A2Io" },
 { id: 152, title: "Cet 10+2 Pyq", title_hi: "राजस्थान CET सीनियर सेकेंडरी स्तर   प्रीवियस  कुस्शन", exam: "CET", author: "PYQ", publisher: "Sarthak", price: 186.00, img: "1XNroAVOthh6zLl1BkI_4yGMclCl-YV9e" },
 { id: 153, title: "Bstc 10P/S", title_hi: "BSTC के लिए 10 प्रैक्टिस सेट", exam: "BSTC ", author: "PYQ", publisher: "Sarthak", price: 216.00, img: "1YMyrfYIHwdpUcos36WOBbMxCgn5jPQS2" },
 { id: 154, title: "Sharirik Shiksha (Abhinav Rathore)", title_hi: "शारीरिक शिक्षा", exam: "II Grade", author: "Abhinav Rathore", publisher: "Rajdeep Publication", price: 240.00, img: "1Yb3KOhNHWOVJEza7cICghBlKjby87nck" },
 { id: 155, title: "High Court Fourth Grand 4001+", title_hi: "राजस्थान उच्च न्यायालय चतुर्थ श्रेणी कर्मचारी 4001+", exam: "HIGH COURT", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 193.00, img: "1ZUlXyWQOyCiKAyaTmlXpBYTOAjufB2Dm" },
 { id: 156, title: "Rajasthan All In One", title_hi: "राजस्थान आल इन वन  ", exam: "ALL EXAM", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 533.00, img: "1ZiH3-8qE3o6csD6hhDJOxyogw4i4yEJm" },
 { id: 157, title: "2nd Grade Samanya Gyan Volume 1 ", title_hi: "II Grade सामान्य ज्ञान Vol-I", exam: "II Grade", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 389.00, img: "1_S8Wu9ibyEHLb1wyEHBrfzFA4eCzFwEd" },
 { id: 158, title: "2nd Grade Samanya Gyan Voolume 2", title_hi: "II Grade सामान्य ज्ञान Vol-II", exam: "II Grade", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 404.00, img: "1_XFNL8kka8Akyavo8mf6M5ltlnO8KOEI" },
 { id: 159, title: "1st Grade Samanya Gyan Volume 1 ", title_hi: "I Grade सामान्य ज्ञान Vol-I", exam: "1st Grade", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 593.00, img: "1aCsXrQ-5Z1H-9FdkI3MzwjPSBq_4IzAZ" },
 { id: 160, title: "1st Grade  Samanya Gyan Volume 2", title_hi: "I Grade सामान्य ज्ञान Vol-II ", exam: "1st Grade", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 256.00, img: "1bKIjFnsPAWInULIxewvY8W_9CHbm4Sj2" },
 { id: 161, title: "Ssc Gd Complete", title_hi: "एसएससी जीडी (SSC GD) 2026  (Complete book)", exam: "SSC GD CONSTABLE", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 445.00, img: "1bWI4JC_RpF3trw-YOimfLodSsaGHuLzE" },
 { id: 162, title: "Tricky Ganit 5200+ Q/B", title_hi: "ट्रिकी गणित 5200+question", exam: "ALL EXAM", author: "Ramnivas Mathuriya", publisher: "Sunita Publication", price: 468.00, img: "1bX37C9O2G2EFCOTe_W-CJpk7-ab6O9kv" },
 { id: 163, title: "Bharat Ka Bhugol (Barnwal)", title_hi: "भारत का भूगोल", exam: "IAS,IPS", author: "Mahesh Kumar Barnwal", publisher: "Cosmos", price: 349.00, img: "1cp_l9QqVaxqIv156BS4EgZnimU1gl9id" },
 { id: 164, title: "Sanshipt Itihas (Barnwal)", title_hi: "संक्षिप्त इतिहास'", exam: "IAS,IPS", author: "Mahesh Kumar Barnwal", publisher: "Cosmos", price: 349.00, img: "1d6__y-jXvWJpcNOaeRGDO6TbEDpPtiUL" },
 { id: 165, title: "Vishv Ka Bhugol", title_hi: "विश्व का भूगोल", exam: "IAS,IPS", author: "Mahesh Kumar Barnwal", publisher: "Cosmos", price: 385.00, img: "1eAP8NNxditqPt9x7i9QHMgf2xJptpplY" },
 { id: 166, title: "Oxford Student Atlas (H) 4Ed", title_hi: "ऑक्सफोर्ड स्टूडेंट एटलस फॉर इंडिया 4ED", exam: "OXFORD STUDENT ATLAS (H) 4ED", author: "OXFORD", publisher: "Oxford", price: 232.00, img: "1farzBu-d8FeCsO1MEnH4JXjt8EPAy2R7" },
 { id: 167, title: "LDC 2nd Grade Paper 2", title_hi: "कनिष्ठ सहायक 2nd Grade Paper 2", exam: "LDC", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 310.00, img: "1faztR-sg69GbfntdwM6FrrLfHZ9m9Rje" },
 { id: 168, title: "LDC 2nd Grade Paper 1 ", title_hi: "कनिष्ठ सहायक 2nd Grade Paper 1 ", exam: "LDC", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 457.00, img: "1gWsTNevy77xLxtZu4BdWdW8uviLcqd71" },
 { id: 169, title: "Saral Ankganit", title_hi: "सरल अंकगणित", exam: "ALL EXAM", author: "R.S. Aggarwal", publisher: "S. Chand", price: 319.00, img: "1h0hFoveDdkXXo9FEDBsuVJnVHioM_tzu" },
 { id: 170, title: "Naveen Ankganit", title_hi: "नवीन अंकगणित", exam: "ALL EXAM", author: "R.S. Aggarwal", publisher: "S. Chand", price: 460.00, img: "1hAQ0W5l_JCbyfmmFbETi6YEY-VmrYRZI" },
 { id: 171, title: "Rajasthan Police Si", title_hi: "राजस्थान पुलिस सब  इंस्पेस्क्टर  ", exam: "PSI", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 520.00, img: "1iFgYxsJtz5JWR3mdTq5l4IR1ahWFQhZ6" },
 { id: 172, title: "Lakshya Raj. Police Si", title_hi: "लक्ष्य राजस्थान पुलिस सब  इंस्पेस्क्टर  ", exam: "PSI", author: "Kanti Jain ,Mahaveer Jain", publisher: "Jai Publication", price: 508.00, img: "1iGnyTDUeqKL_r8p1uuLvPbY6t0CS4HM9" },
 { id: 173, title: "Lakshya Bstc 2026", title_hi: "लक्ष्य BSTC 2026", exam: "BSTC", author: "Kanti Jain ,Mahaveer Jain", publisher: "Jai Publication", price: 446.00, img: "1iMJSFwubD_WeVLolVeTYERzuHcCQBus3" },
 { id: 174, title: "Frp Bstc Model Papers", title_hi: "BSTC  सोल्वड पेपर", exam: "BSTC", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 126.00, img: "1iMMr2nng1J_v3cKJeRD65wAeCweSwPIV" },
 { id: 175, title: "1st Grade Gk Obj. Ramban 10100+", title_hi: "1 Grade Gk रामबाण 10100+", exam: "1st Grade", author: "Garima Reward ,B.L. Reward", publisher: "First Rank", price: 419.00, img: "1jFVF4pbXghfjMQ5MyjdA2s27StU7Vu-C" },
 { id: 176, title: "Computer Obj.", title_hi: "कंप्यूटर Obj", exam: "ALL EXAM", author: "Manish Yadav Dharmendra Kumar Yadav", publisher: "Daksh", price: 204.00, img: "1k2v5GAIlRbPwrGL58yly1vzr7pJRRil2" },
 { id: 177, title: "Rssb Ldc Hindi English", title_hi: "LDC परीक्षा में हिंदी और अंग्रेजी", exam: "LDC", author: "Pro BK Rastogi , Aacharya Sandeep Malakar", publisher: "Daksh", price: 492.00, img: "1kB19WdXjOWv9bdL6-BFgg8Tx4wl5ryjH" },
 { id: 178, title: "Rajasthan Saar Sangrah", title_hi: "राजस्थान सार संग्रह", exam: "ALL EXAM", author: "Pro BK Rastogi , Aacharya Sandeep Malakar", publisher: "Daksh", price: 408.00, img: "1lFsaCWg_sM85nRVhwGOcihcyJSj69mqN" },
 { id: 179, title: "Ssc Constable Gd", title_hi: "SSC CONSTABLE GD", exam: "SSC GD CONSTABLE", author: " Aacharya Sandeep Malakar ,Sudhindra Sharma", publisher: "Daksh", price: 432.00, img: "1lUitkmWUJ3oKXdbrEmptLAo-atBao4oC" },
 { id: 180, title: "1st Grade English Paper 2 ", title_hi: "1 ग्रेड इंग्लिश पेपर -ll ", exam: "1st Grade", author: "Prof. B.K. Rastogi", publisher: "Daksh", price: 876.00, img: "1lVffc2azsU9RKWJbUHDFzuZkCKh3bH4x" },
 { id: 181, title: "2nd Grade English Paper 2 ", title_hi: " ll-ग्रेड इंग्लिश पेपर -ll ", exam: "II Grade", author: "Prof. B.K. Rastogi", publisher: "Daksh", price: 756.00, img: "1ltJVyLNXbybkxego6vjJPjt2dXcFOeDu" },
 { id: 182, title: "Samanya Gyan Gk", title_hi: "सामान्य ज्ञान", exam: "ALL EXAM", author: "Dr.Sunil Kumar Singh", publisher: "Lucent", price: 228.00, img: "1mQkWFiVJbTb_6O1oyVYXncdz6BVXR_P6" },
 { id: 183, title: "Frp 2nd G Sanskrit", title_hi: "ll-Grade संस्कृत", exam: "II Grade", author: "Dr.Lokesh Kumar Sharma", publisher: "Chyavan", price: 447.00, img: "1nv2CXxe-7yR9luU1SrL3ZxgxbBSK_o-e" },
 { id: 184, title: "Rajasthan Ka Bhugol", title_hi: "राजस्थान का भूगोल ", exam: "ALL EXAM", author: "Dr. Rahul Chaudhary", publisher: "Gyan Vitan", price: 273.00, img: "1oXnhCBS17VycQ0JpTFW5W8Qzuax34ITH" },
 { id: 185, title: "LDC Paper 1 and 2 ", title_hi: "LDC PAPER I & II", exam: "LDC", author: "Subhash Charan ,Ramakant Sharma,Narayan Sharma,U.S. Shekhawat", publisher: "RBD", price: 537.00, img: "1p-pUoMv2xSWzvm_dO2qNGD1Ys_-zR4YI" },
 { id: 186, title: "Frp 1st Grade Vanijya", title_hi: "I Grade Vanijya", exam: "1st Grade", author: "CHYAVAN", publisher: "Chyavan", price: 162.00, img: "1p76X0nh1CSKHqt8kQCPzLNL8D8tNJJhK" },
 { id: 187, title: "1st Grade Itihas Pyq", title_hi: "I Grade  इतिहास ", exam: "1st Grade", author: "CHYAVAN", publisher: "Chyavan", price: 162.00, img: "1pb9NVZpn8SaPoa9Yty4KDxliEurjFVan" },
 { id: 188, title: "Frp 1st Grade Hindi Q/P", title_hi: "l Grade हिंदी", exam: "1st Grade", author: "CHYAVAN", publisher: "Chyavan", price: 162.00, img: "1q3MokTUbzXMSQSH5nPC2Qr4JTWjZi7gG" },
 { id: 189, title: "1st Grade Bhugol Pyq", title_hi: "l Grade भूगोल", exam: "1st Grade", author: "CHYAVAN", publisher: "Chyavan", price: 162.00, img: "1q6Zpg2i6iwYGUKe2mFjjSnYgRGdUuB9N" },
 { id: 190, title: "Frp 1st Grade Itihas Kala Sanskriti", title_hi: "I Grade  इतिहास कला एवं संस्कृति", exam: "1st Grade", author: "Gaurav Ghanerao ,Pushpendra Kasana", publisher: "Chyavan", price: 242.00, img: "1qNbwaeiwcTGwBjNgBIEw1QdSm6xEq8bZ" },
 { id: 191, title: "Frp 1st Grade  Rajasthan Ka Bhugol", title_hi: "l Grade राजस्थान का भूगोल ", exam: "1st Grade", author: "Gaurav Ghanerao ,Pushpendra Kasana", publisher: "Chyavan", price: 143.00, img: "1qPbMRWh1bLI1AVLfvTe3RbUn5W3rIBDZ" },
 { id: 192, title: "Frp 1st Grade Bhartiya Rajvyavastha", title_hi: "l Grade भारतीय राजव्यवस्था", exam: "1st Grade, 2nd Grade ", author: " Gaurav Ghanerao ,Pushpendra Kasana", publisher: "Chyavan", price: 105.00, img: "1vKeS6ccdYgNYruPK85KRk9-aiIT5oZd8" },
 { id: 193, title: "Frp 1st Grade Ganit Sankhiki", title_hi: "l Grade गणित एवं सांख्यिकी", exam: "1st Grade", author: "Gaurav Ghanerao ,Rohit Nama", publisher: "Chyavan", price: 147.00, img: "1vbk-lqq-KC_dqbb_YaNXOiAW7Y170brS" },
 { id: 194, title: "2nd Grade GK Solved Papers", title_hi: "ll Grade सामान्य ज्ञान सोल्वड पेपर", exam: "II Grade", author: "Gaurav Ghanerao ,Rohit Nama", publisher: "Chyavan", price: 300.00, img: "1vmyCTlGzNOJQ0uI9q83p0lseW-b2R-Z1" },
 { id: 195, title: "Essential English English Hindi Dictionary ", title_hi: "एसेंटिअल  डिसनरी इंग्लिश -इंग्लिश  -हिंदी ", exam: "CENTRAL ALL EXAM", author: "Oxford University Press", publisher: "Oxford", price: 260.00, img: "1vo0NR8ccuNR2cwXWOw_wKDHMgxcZ1qKw" },
 { id: 196, title: "Mini Dictionary English - English ", title_hi: "मिनी डिसनरी इंग्लिश -इंग्लिश ", exam: "CENTRAL ALL EXAM", author: "Oxford University Press", publisher: "Oxford", price: 228.00, img: "1wJ_8QDy5LInMGpmfLCyTFRAI8-G9S6E0" },
 { id: 197, title: "Tricky Ganit", title_hi: " ट्रिकी", exam: "ALL EXAM", author: "Ramnivas Mathuriya", publisher: "Sunita Publication", price: 228.00, img: "1xaJiuLfRIObWlxcxxgmLmHILeSiLxEgz" },
 { id: 198, title: "Tricky Reasoning", title_hi: "ट्रिकी रीजनिग ", exam: "ALL EXAM", author: "Ramnivas Mathuriya", publisher: "Tricky", price: 198.00, img: "1y-88LOaFhh7THGVOzSnLIUvh4vV18-lW" },
 { id: 199, title: "Tricky Reasoning", title_hi: "ट्रिकी रीजनिग ", exam: "ALL EXAM", author: "Ramnivas Mathuriya", publisher: "Sunita Publication", price: 360.00, img: "1yT8J3AzdSzgRPvggu2_JGrfBD6VoFrCo" },
 { id: 200, title: "Pre.Bed", title_hi: "प्री बैचलर ऑफ़ एजुकेशन", exam: "PRE.BED", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 485.00, img: "19pADufSTOfDI0fu54PMhwGCtS0kB4HCg" },
 { id: 201, title: "Prayogshala Sahayak Bhugol", title_hi: "प्रयोगशाला सहायक (भूगोल)", exam: "PRAYOGSHALA SAHAYAK BHUGOL", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 533.00, img: "11-_XeiNSkU6l4SD0BWR5Hhc5UGSkjkNA" },
 { id: 202, title: "Lakshya Prayogshala Sahayak Paper 2", title_hi: "लक्ष्य प्रयोगशाला सहायक P-2 (भूगोल)", exam: "LAKSHYA PRAYOGSHALA SAHAYAK P-2", author: "Kanti Jain ,Mahaveer Jain", publisher: "Jai Publication", price: 463.00, img: "117zpg00rd6BNAZDgY-YIS7z2XoiJG1iQ" },
 { id: 203, title: "2nd Grade Samajik Adhyan Part 1", title_hi: "II  Grade सामाजिक अध्ययन ", exam: "II Grade", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 493.00, img: "12BdtbgxM9PNNsAObKQ8ovTfJQ_r6E11U" },
 { id: 204, title: "2nd Grade Samajik Adhyan Part 2", title_hi: "II  Grade सामाजिक अध्ययन ", exam: "II Grade", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 491.00, img: "12L9UHl1Iw3M74XRJZvGAH5eXmWc1KtAQ" },
 { id: 205, title: "Rajasthan Ka Itihas", title_hi: "राजस्थान इतिहास", exam: "ALL EXAM", author: "Dr.H.D. Singh ,Chitra Rao", publisher: "Panorama", price: 483.00, img: "12Ou2wMTWYjGVCG1Ehvj4dMlT3PRQGEje" },
 { id: 206, title: "Adhunik Bharat Ka Itihas", title_hi: "आधुनिक भारत का इतिहास", exam: "CENTRAL ALL EXAM", author: "Vipin Chandra", publisher: "Orient", price: 360.00, img: "12gAMmwbZY8BumUAfqvLbgSC3jJiZ9xWZ" },
 { id: 207, title: "Madhyakalin Bharat Rajniti Samaj", title_hi: "मध्यकालीन भारत: राजनीति, समाज", exam: "CENTRAL ALL EXAM", author: "Satish Chandra", publisher: "Orient", price: 396.00, img: "13fs3lY9IqzSFC7gMN46PBg2PEnM9Nuvt" },
 { id: 208, title: "R.Gupta Ncc National Cadet (E)", title_hi: "(राष्ट्रीय कैडेट कोर) इंग्लिश", exam: " NCC NATIONAL CADET (E)", author: "R. Gupta's", publisher: "RPH", price: 224.00, img: "152_pgWgNyiZDaXXS8KsY_W22I_2iG8e7" },
 { id: 209, title: "R.Gupta Ncc National Cadet (H)", title_hi: "(राष्ट्रीय कैडेट कोर)  हिंदी", exam: " NCC NATIONAL CADET (H)", author: "R. Gupta's", publisher: "RPH", price: 207.00, img: "15Av-kPeuSmv44_q8ogSWUl06Gk-WSmnj" },
 { id: 210, title: "Rajasthan Vanpal", title_hi: "राजस्थान वनपाल", exam: "RAJASTHAN VANPAL", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 329.00, img: "16b9opzCkjljEDCRLAbSibFM7OiV1iCGi" },
 { id: 211, title: "Raj. Bhugol Arthvyavastha", title_hi: "राजस्थान भूगोल एवं अर्थव्यवस्था", exam: "ALL EXAM", author: "Dr.H.D. Singh ,Chitra Rao", publisher: "Panorama", price: 512.00, img: "16s2iZYQBGvVIZNm8_2yfo6IOhezgaXVK" },
 { id: 212, title: "Rajasthan Kala Avam Sanskriti", title_hi: "राजस्थान कला एवं संस्कृति", exam: "ALL EXAM", author: "Hoshiyar Singh", publisher: "DP", price: 300.00, img: "17OuScjjT5F_LqFn5NqX0MsbbPtgnnzyo" },
 { id: 213, title: "UGC NET Shikshan Avm Shodh", title_hi: "UGC NET शिक्षण एवं शोध", exam: "UGC NET ", author: "SAHITYA", publisher: "Sahitya ", price: 207.00, img: "17X3iAaDKKqy42CFp9JqMTdpNkSHXzAyt" },
 { id: 214, title: "Ugc Net/Jrf Hindi Paper 2", title_hi: "NTA UGC NET/JRF के लिए हिंदी साहित्य (Paper-II)", exam: "NTA UGC NET/JRF", author: "SAHITYA", publisher: "Sahitya ", price: 347.00, img: "18ZMWS-a6WkvUVTuKBmOlO8dv41_RNuaH" },
 { id: 215, title: "High Court Today", title_hi: "हाई कोर्ट टुडे", exam: "HIGH COURT", author: "Today", publisher: "Today", price: 240.00, img: "19I-Ru4kIGR1WrNXnn2cjhJRq3OUTHsfl" },
 { id: 216, title: "Van Rakshak Vanpal", title_hi: "वनरक्षक वनपाल", exam: "VAN RAKSHAK VANPAL", author: "Today", publisher: "Today", price: 300.00, img: "1AIYe_G5CDE-FmYUWakGJeRW-wiYtuS90" },
 { id: 217, title: "Ssc Constable Gd Today", title_hi: "SSC GD कांस्टेबल टुडे", exam: "SSC GD CONSTABLE", author: "Today", publisher: "Today", price: 330.00, img: "1AJypS31rNZsvzUHGa_eIkVpiCAZFqDST" },
 { id: 218, title: "Jvvnl Technician 3", title_hi: "Jvvnl तकनीकी सहायक 3", exam: "RVUN/JVVNL/AVVNL/Jd.-lll", author: "RVUN/JVVNL/AVVNL/Jd.-lll", publisher: "Today", price: 390.00, img: "1B9aLCFhvcs3A8_F0fPzHIxvpsv9ZfOu8" },
 { id: 219, title: "Today BSTC", title_hi: "टुडे BSTC  ", exam: "BSTC ", author: "Dr. Ram Charan Mishra, Dr. Kiran,Shrimati Durga", publisher: "Shubham", price: 330.00, img: "1BMkSAxEu6jsE8VrUr95uuVMj89hvRLcq" },
 { id: 220, title: "Bstc Solved Paper Today", title_hi: "BSTC  सोल्वड पेपर टुडे", exam: "BSTC ", author: "SOLVED PAPER", publisher: "Today", price: 120.00, img: "1CWD3JIEaDGhpKjajN2NOWoSrmSaieJGP" },
 { id: 221, title: "Gs Nidhi", title_hi: "GS निधि", exam: "ALL EXAM GK", author: "Naveen Sharma Sir", publisher: "Ankit Bhati", price: 279.00, img: "1CzLVzwOr8_LlMzmbld2MNyPFwCmsue-f" },
 { id: 222, title: "Gs Sudha (Naveen Sharma)", title_hi: "GS सुधा ", exam: "ALL EXAM GK", author: "Naveen Sharma Sir", publisher: "RP ANKIT BHATI", price: 279.00, img: "1EjNH_bPweoWXP2nlU7V5N6sN7mcu1ouy" },
 { id: 223, title: "Rajasthan Cet Snatak 15P/S", title_hi: "राजस्थान CET (स्नातक स्तर) - 15 प्रैक्टिस सेट्स", exam: "CET GRADUCATION LEVEL MODAL PAPEr", author: "15P/S", publisher: "Agarwal", price: 202.00, img: "1G0MPO2WY_EqgLcEXoQhcq6GCJ0CuyR3v" },
 { id: 224, title: "Bharat Ka Bhugol Class Notes", title_hi: "भारत के भूगोल क्लास नोट्स", exam: "ALL EXAM", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 234.00, img: "1GDfE48uHOBxXbUgA1cY-gcKhdRHn5ZWw" },
 { id: 225, title: "Jila Darshan", title_hi: "जिला दर्शन", exam: "ALL EXAM", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 180.00, img: "1GraW6SsQgvYFj0fKAvd3IrGkYTwJyORj" },
 { id: 226, title: "1st Grade Shekshik Prabandh", title_hi: " l Grade शैक्षिक प्रबन्ध", exam: "l Grade", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 135.00, img: "1HEHrQ02i5Cg6s0GiM6jbfaWNUKSdpLC1" },
 { id: 227, title: "Bhartiya Arthvyavastha", title_hi: "भारतीय अर्थव्यवस्था", exam: "ALL EXAM", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 180.00, img: "1IEcpJc8Il7DEucyvGb4qA-YMfSznGYF_" },
 { id: 228, title: "Bharat & Raj. Itihas Kala", title_hi: "भारत और राजस्थान का इतिहास एवं कला-संस्कृति", exam: "PSI", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo PSI", price: 198.00, img: "1IlAtQampi9mTt3GWy4SuWGKSns2ysz7h" },
 { id: 229, title: "Samanya Vigyan Prodhyogiki", title_hi: "सामान्य विज्ञान एवं प्रौद्योगिकी", exam: "PSI", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo PSI", price: 162.00, img: "1LHR5FzrJyZgcoRRM0OOl_PjbcUXRbAVA" },
 { id: 230, title: "Reasoning Ganit", title_hi: "रीजनिंग (तर्कशक्ति) और गणित", exam: "PSI", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo PSI", price: 135.00, img: "1M8WRX4txUxPaLZJuPzgfNI4SGCehWbms" },
 { id: 231, title: "Ssc Samanya Adhyan", title_hi: "SSC सामान्य अध्ययन", exam: "SSC CGL,CPO, MTH ", author: "Pinnacle", publisher: "Pinnacle", price: 462.00, img: "1MQfIvEtAZYpngTKvg3gG5upQe8TpuUWl" },
 { id: 232, title: "Ssc Reasoning 7200 (H)", title_hi: "SSC रीजनिग  7200 (हिंदी)", exam: "SSC CGL,CPO, MTH ", author: "Pinnacle", publisher: "Pinnacle", price: 532.00, img: "1Mo2CA_7j_AmSXChnS6W7k_DZAsSLEeWp" },
 { id: 233, title: "Ssc English (H)", title_hi: "SSC इंग्लिश (हिंदी)", exam: "SSC CGL,CPO, MTH ", author: "Pinnacle", publisher: "Pinnacle", price: 567.00, img: "1QKz6Jcas36DkpA4pxDBMHdEDvVjEWiXf" },
 { id: 234, title: "Ssc Fatman Gk/Gs (H)", title_hi: "SSC फटमैन  GK/GS (Hindi)", exam: "SSC CGL,CPO, MTH ", author: "Parmar Sir", publisher: "Parmar", price: 449.00, img: "1SwPp9SLQjIsxfN-G2xsvF7pVqOe-Wwjp" },
 { id: 235, title: "1st Grade Shiksha Shastra Manovigyan", title_hi: "I Grade शिक्षा शास्त्र मनोविज्ञान", exam: "1st Grade", author: "Dheer Singh Dhabhai", publisher: "Avni Publication", price: 152.00, img: "1TaPth7tx6AcaVWkFHOgOKeA_aHs6FbxQ" },
 { id: 236, title: "3rd Grade Shekshnik Manovigyan (D. Singh)", title_hi: "III Grade (REET/Mains) शैक्षणिक मनोविज्ञान", exam: "I Grade LIBERARN", author: "Dheer Singh Dhabhai", publisher: "Avni Publication", price: 190.00, img: "1UoSfGff01LFq0evO8O-C5STySiod2lQZ" },
 { id: 237, title: "Vastunisth Shiksha Manovigyan", title_hi: "वस्तुनिष्ठ शिक्षा मनोविज्ञान", exam: "I Grade", author: "Dheer Singh Dhabhai", publisher: "Avni Publication", price: 204.00, img: "1V57eWlpTHIWZ843OKHmB7LEcbdUw6p63" },
 { id: 238, title: "1st Grade Shiksha Manovigyan", title_hi: "I Grade शिक्षा मनोविज्ञान", exam: "1st Grade", author: "Dr. Vandana Jadon", publisher: "Jadon Prabhat ", price: 243.00, img: "1VynSEf_yJanlrmlEUgQQzKEjEln9mBo-" },
 { id: 239, title: "2nd Grade Shekshik Manovigyan (V. Jadon)", title_hi: "Il Grade शिक्षा मनोविज्ञान", exam: "II Grade", author: "Dr. Vandana Jadon", publisher: "Prabhat", price: 243.00, img: "1WNAgLmmr2iIgD_3flY-qAlCqZoSmDls3" },
 { id: 240, title: "Tarkshakti Parikshan", title_hi: "तर्कशक्ति परीक्षण", exam: "ALL EXAM", author: "R.S. Aggarwal", publisher: "S. Chand", price: 599.00, img: "1We2tL3QFcW7XiNfsAE4NcVUhdzjDDt9K" },
 { id: 241, title: "Quantitative Aptitude (R.S. Aggarwal)", title_hi: "क्वांटिटेटिव एप्टीटुड ", exam: "ALL EXAM", author: "R.S. Aggarwal", publisher: "SC&CL", price: 639.00, img: "1X-Qpdn2uDsllrneFPbYG7HQccqOFysfr" },
 { id: 242, title: "English Special", title_hi: "इंग्लिश  स्पेसल", exam: "ALL EXAM", author: "Shivani Maam", publisher: "VIPM Academy", price: 209.00, img: "1Y9eoUtpKiHIMSHHbgjy9k35uFSKk6ngs" },
 { id: 243, title: "2nd Grade Rajvyvastha Polity (R. Choudhary)", title_hi: "II Grade राजव्यवस्था Polity", exam: "II Grade", author: "R. Choudhary", publisher: "Gyan Vitan", price: 259.00, img: "1YtvvLTL8XQonjj3hwNZjsNdOAv8wLRga" },
 { id: 244, title: "1st Grade Rajasthan Ka Bhugol", title_hi: "l Grade राजस्थान की भूगोल", exam: "1st Grade", author: "R. Choudhary", publisher: "Gyan Vitan", price: 182.00, img: "1ZlrXNW5o1NDgqmyuzpa3kfpau9V9axKT" },
 { id: 245, title: "Dainik Vigyan", title_hi: "दैनिक विज्ञान", exam: "LDC ", author: "Dr. Swati Jabhak , Dr. Vandana Joshi", publisher: "Sikhwal", price: 156.00, img: "1a2qoJUpljDQamAovfaZVgfXNCwQMUeoa" },
 { id: 246, title: "Ldc Solved Paper", title_hi: "कनिष्ठ सहायक या बाबू सॉल्वड पेपर्स", exam: "LDC ", author: "SIKHWAL", publisher: "Sikhwal", price: 216.00, img: "1dnnpBLmOnk9MDHpQhtALN0FyB33Ahd-K" },
 { id: 247, title: "Rsmssb Rajasthan Gk Solved Paper", title_hi: "राजस्थान सामान्य ज्ञान  के सॉल्वड पेपर्स", exam: "ALL EXAM", author: "Anita Pancholi", publisher: "Savitri Ujala", price: 288.00, img: "1enikdiOexX_MEXkfdISu3W7-QF4eQGZ5" },
 { id: 248, title: "Rpsc Raj. Samanya Gyan S/P Obj", title_hi: "राजस्थान सामान्य ज्ञान  का वस्तुनिष्ठ (Objective)", exam: "ALL EXAM", author: "Anita Pancholi", publisher: "Savitri Ujala", price: 318.00, img: "1gQwsfGoIMpwba7WbWc1E_KCEUiWQEP1K" },
 { id: 249, title: "Rajasthan Geography Polity", title_hi: "राजस्थान की भूगोल और राजव्यवस्था ", exam: "ALL EXAM", author: "K. Srivastave", publisher: "Diksha", price: 300.00, img: "1iJOku1XBVD2_e2kMij04FrD4SWwjguXE" },
 { id: 250, title: "Rajasthan History Art & Culture", title_hi: "राजस्थान इतिहास  कला एवं संस्कृति", exam: "ALL EXAM", author: "S. Charan", publisher: "Diksha", price: 300.00, img: "1j7z8tVH987Z3WDMEFm_M8v4ZeIHpn6FZ" },
 { id: 251, title: "Ras Pre Solved Paper (H)", title_hi: "RAS प्रारंभिक परीक्षा सॉल्वड पेपर्स (हिंदी)", exam: "RAS,PSI", author: "Dr. Jitesh Joshi", publisher: "Chyavan", price: 330.00, img: "1jz_wbFfAPE7L8j7hyGJzRpPnKf0nsLsT" },
 { id: 252, title: "Frp Ssc Gd Constable Solved", title_hi: "SSC GD कांस्टेबल सॉल्वड पेपर", exam: "SSC GD CONSTABLE", author: "Rahul sir", publisher: "Chyavan", price: 124.00, img: "1lB_QsWSW9L6FJvdUDOODI_5v1W2U0r65" },
 { id: 253, title: "Mathematics For N.D.A & N.A (H)", title_hi: "गणित फॉर   N.D.A & N.A (H)", exam: "CENTRAL ALL EXAM", author: "R.S. Aggarwal", publisher: "S. Chand", price: 479.00, img: "1lbRlIVHDCQex2okXTAZP7gy4T9F-XUKs" },
 { id: 254, title: "Bhartiya Itihas", title_hi: "भारत का इतिहास", exam: "CENTRAL ALL EXAM", author: "doctor Prem Prakash ola Nirmal Kumar bl bajiya", publisher: "Arya", price: 448.00, img: "1mEvKwtqpu5nmr8rN3q1mIQduTgjp76vy" },
 { id: 255, title: "Krashi Pravekshak", title_hi: "कृषि पर्यवेक्षक", exam: "KRASHI PRAVEKSHAK", author: "Dr Rajiv bairathi RK Gupta", publisher: "NSA", price: 300.00, img: "1oDkDwlVX-AvUSuU3ZHx2BLjJWXQZwlR0" },
 { id: 256, title: "Frp Hindi Vyakran", title_hi: "First Rank Publication) की हिंदी व्याकरण", exam: "CENTRAL ALL EXAM", author: " (Manoj Kumar Mishra", publisher: "Mishra Saral", price: 180.00, img: "1pvWf7oTcmPefvyHt8H6i3VYybshrTgml" },
 { id: 257, title: "Samanya Gyan 2026", title_hi: " सामान्य ज्ञान 2026", exam: "ALL EXAM", author: "Kaun kab kya", publisher: "Today", price: 36.00, img: "1qJ3Ltx7VB80SeEzS9BNRJHE1rh_kfkcz" },
 { id: 258, title: "Police Si Hindi Vyakran", title_hi: "पुलिस सब  इंस्पेस्क्टर हिंदी व्याकरण", exam: "PSI", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 189.00, img: "1qg5WakYa-qhndgx4F6ezwRvyw0rH4llj" },
 { id: 259, title: "Adarsh Hindi Shabdh Kosh", title_hi: "आदर्श हिंदी शब्दकोश", exam: "CENTRAL ALL EXAM", author: "professor Ramchandra Pathak", publisher: "Bhargava Publication", price: 126.00, img: "1sQsZ7bkpb659U5iXpqlstfziWf3wQBQF" },
 { id: 260, title: "Instant English", title_hi: "इन्स्टेंट इंग्लिश", exam: "CENTRAL ALL EXAM", author: "Ab Dus Salaam Chaos", publisher: "Salaam Chaus", price: 162.00, img: "1sZfSNkSzTPs3eqCt2hJAeDMjGfIWlbwj" },
 { id: 261, title: "Bal Sanskrit-Hindi Shabdkosh", title_hi: "बाल संस्कृत-हिंदी शब्दकोश", exam: "CENTRAL ALL EXAM", author: "Vaman Shivram Apte", publisher: "Kamal Amar", price: 135.00, img: "1uaNgiOVE-sy_2RGx-9nMcm2uLhZ-2Z1h" },
 { id: 262, title: "Medical Dictionary E-E-H", title_hi: " मेडिकल डिक्शनरी  (इंग्लिश - इंग्लिश - हिंदी)", exam: "CENTRAL ALL EXAM", author: "Dr.H.L. Verma, Sr.S.K. Gupta", publisher: "Amar", price: 297.00, img: "1uivRi5j-T8-ur_POyh-Ue5fHcnSEXveb" },
 { id: 263, title: "Dict. E/H", title_hi: "डिक्शनरी इंग्लिश / हिंदी", exam: "CENTRAL ALL EXAM", author: "Professor Ramchandra Pathak", publisher: "Bhargava Publication", price: 385.00, img: "1xC4UdXspAJAeGv-vCCZOvHUHeJNS5U8W" },
 { id: 264, title: "Sanskrit Hindi Angreji Shabdkosh", title_hi: "संस्कृत से हिंदी से अंग्रेजी शब्दकोश", exam: "CENTRAL ALL EXAM", author: "Vaman Shivram Apte", publisher: "Amit", price: 297.00, img: "1y0pS9CZMJFaXHNczvdUKJscCf2HYyAj9" },
 { id: 265, title: "Amar Manak Hindi Shabdkosh H-H", title_hi: "अमर मानक हिंदी शब्दकोश (Hindi-Hindi)", exam: "CENTRAL ALL EXAM", author: "Krishnakant Dikshit ,Suryanarayan Upadhyay", publisher: "KAMAL", price: 216.00, img: "1zookcHa7rKn6uRPhHlwme0juJyyJUjjP" },


];

const ANNOUNCEMENTS = [
  {
    id: 1,
    tag: { en: "New", hi: "नया" },
    title: { en: "RAS 2024 Mains Schedule", hi: "RAS 2024 मुख्य परीक्षा समय सारणी जारी" },
    description: { en: "Official examination dates announced by RPSC.", hi: "RPSC द्वारा मुख्य परीक्षा की आधिकारिक तिथियों की घोषणा।" },
    date: "Feb 12"
  },
  {
    id: 2,
    tag: { en: "Alert", hi: "अलर्ट" },
    title: { en: "REET Level 2 Results", hi: "REET लेवल 2 का परिणाम घोषित" },
    description: { en: "Final merit list is now available online.", hi: "अंतिम मेरिट सूची अब ऑनलाइन उपलब्ध है।" },
    date: "Feb 10"
  }
];

const SYLLABUS_DATA = [
  { en: "RAS Prelims + Mains", hi: "RAS प्री + मुख्य परीक्षा" },
  { en: "Teacher Grade I-III", hi: "शिक्षक ग्रेड I-III" },
  { en: "Police Constable", hi: "पुलिस कांस्टेबल" },
  { en: "LDC / Junior Asst.", hi: "एलडीसी / कनिष्ठ सहायक" }
];

// Unified Categories
const CATEGORIES = ["RAS", "Police", "1st Grade", "LDC", "Supervisor", "Current Affairs"];

export default function App() {
  const [lang, setLang] = useState('en');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Pagination State
  const ITEMS_PER_PAGE = 8;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const t = (key) => TEXT_MAP[lang][key];
  const getDriveUrl = (id) => `https://lh3.googleusercontent.com/u/0/d/${id}`;

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredBooks = useMemo(() => {
    return BOOKS_DATA.filter(book => {
      const searchStr = (lang === 'hi' ? book.title_hi : book.title).toLowerCase() + 
                       (book.author || "").toLowerCase() + 
                       (book.exam || "").toLowerCase();
      
      const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || book.exam === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, lang, selectedCategory]);

  const displayedBooks = useMemo(() => {
    return filteredBooks.slice(0, visibleCount);
  }, [filteredBooks, visibleCount]);

  const addToCart = (book) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === book.id);
      if (exists) return prev.map(i => i.id === book.id ? {...i, quantity: i.quantity + 1} : i);
      return [...prev, { ...book, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + delta)} : i));
  };

  const handleCheckout = () => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsList = cart.map(i => `- ${lang === 'hi' ? i.title_hi : i.title} (x${i.quantity})`).join('\n');
    const message = `*Order from Merit Book House*\n\nItems:\n${itemsList}\n\n*Total: ₹${total}*`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <span className="font-bold text-lg tracking-tight">Merit Hub</span>
            <div className="hidden md:flex items-center gap-6">
              <a href="#updates" className="text-sm hover:text-blue-600 transition-colors">{t('navUpdates')}</a>
              <a href="#syllabus" className="text-sm hover:text-blue-600 transition-colors">{t('navSyllabus')}</a>
              <a href="#books" className="text-sm hover:text-blue-600 transition-colors">{t('navBooks')}</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button onClick={() => setLang('en')} className={`px-2 py-1 text-[10px] font-bold rounded ${lang === 'en' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}>EN</button>
              <button onClick={() => setLang('hi')} className={`px-2 py-1 text-[10px] font-bold rounded ${lang === 'hi' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}>हिन्दी</button>
            </div>
            
            <button onClick={() => setIsCartOpen(true)} className="relative p-2">
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mb-6">
              {t('tagline')}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8">
              {t('heroTitle1')} <br/><span className="text-gray-400">{t('heroTitle2')}</span>
            </h1>
            <p className="text-xl text-gray-500 mb-10 max-w-lg leading-relaxed">{t('heroDesc')}</p>
            <div className="flex flex-wrap gap-8 items-center">
              <a href="#books" className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition-all">
                {t('heroCtaShop')} <ArrowRight size={20} />
              </a>
              <a href="#syllabus" className="text-lg text-blue-600 hover:underline flex items-center gap-1">
                {t('heroCtaSyllabus')} <ChevronRight size={20} />
              </a>
            </div>
          </div>

          <div id="updates" className="lg:col-span-2">
            <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold flex items-center gap-2"><Bell size={18} className="text-red-500"/> {t('newsTitle')}</h2>
                <span className="text-[10px] font-black text-red-500 animate-pulse">{t('newsLive')}</span>
              </div>
              <div className="space-y-6">
                {ANNOUNCEMENTS.map(item => (
                  <div key={item.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold">
                        {lang === 'hi' ? item.tag.hi : item.tag.en}
                      </span>
                      <span className="text-[10px] text-gray-400">{item.date}</span>
                    </div>
                    <h3 className="font-bold mb-1">{lang === 'hi' ? item.title.hi : item.title.en}</h3>
                    <p className="text-sm text-gray-500 mb-3">{lang === 'hi' ? item.description.hi : item.description.en}</p>
                    <button className="text-xs font-bold text-blue-600 flex items-center gap-1">{t('newsReadMore')} <ChevronRight size={12}/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section id="books" className="py-24 bg-gray-50 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">{t('booksHeading')}</h2>
            
            <div className="max-w-xl mx-auto relative mb-8">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder={t('searchPlaceholder')}
                className="w-full pl-14 pr-6 py-5 bg-white rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Pills - Ensure RAS and Police are prominent */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button 
                onClick={() => { setSelectedCategory("All"); setVisibleCount(ITEMS_PER_PAGE); }}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${selectedCategory === "All" ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'}`}
              >
                {t('filterAll')}
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setVisibleCount(ITEMS_PER_PAGE); }}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between max-w-xl mx-auto px-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                <span>{t('showingResults')} <span className="font-bold text-blue-600">{displayedBooks.length}</span> {t('of')} <span className="font-bold">{filteredBooks.length}</span></span>
              </div>
              {(searchTerm || selectedCategory !== "All") && (
                <button 
                  onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                  className="text-xs font-bold text-gray-400 hover:text-blue-600 flex items-center gap-1"
                >
                  Reset filters <X size={12} />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {displayedBooks.map(book => (
              <div key={book.id} className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer border border-transparent hover:border-gray-100" onClick={() => setSelectedBook(book)}>
                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden p-6 flex items-center justify-center">
                  <img src={getDriveUrl(book.img)} className="h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-700" alt={book.title} />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[9px] font-black text-blue-600 uppercase tracking-tighter shadow-sm border border-blue-50">
                      {book.exam}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-base leading-snug mb-2 line-clamp-2 h-10">{lang === 'hi' ? book.title_hi : book.title}</h3>
                  <div className="mb-4 space-y-1">
                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                      <User size={12} className="text-gray-400" />
                      <span className="font-medium text-gray-700">{book.author}</span>
                    </p>
                    <p className="text-[10px] text-gray-400 pl-4">{book.publisher}</p>
                  </div>
                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Price</span>
                      <span className="text-lg font-black">₹{book.price}</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(book); }} 
                      className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < filteredBooks.length && (
            <div className="flex justify-center mt-12">
              <button 
                onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                className="px-10 py-4 bg-white border border-gray-200 text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-sm flex items-center gap-2"
              >
                {t('loadMore')} <Plus size={18} />
              </button>
            </div>
          )}

          {filteredBooks.length === 0 && (
             <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 mt-8">
                <BookOpen size={48} className="mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-bold text-gray-400">No books found</h3>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms</p>
             </div>
          )}
        </div>
      </section>

      {/* Syllabus Section */}
      <section id="syllabus" className="py-24 px-6 max-w-[1000px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <h2 className="text-4xl font-bold leading-tight">{t('heroCtaSyllabus')}</h2>
          <p className="text-gray-500 text-lg">We track RPSC and RSSB changes in real-time so you never study the wrong pattern.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {SYLLABUS_DATA.map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-10 rounded-[2rem] flex justify-between items-center group hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100/50">
              <h4 className="text-xl font-bold">{lang === 'hi' ? item.hi : item.en}</h4>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-sm">
                <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white pt-24 pb-12 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-bold mb-6">Merit Hub</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">{t('footerAbout')}</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-600 transition-colors"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-600 transition-colors"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-600 transition-colors"><Twitter size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">{t('footerQuickLinks')}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#updates" className="hover:text-white transition-colors">{t('navUpdates')}</a></li>
              <li><a href="#syllabus" className="hover:text-white transition-colors">{t('navSyllabus')}</a></li>
              <li><a href="#books" className="hover:text-white transition-colors">{t('navBooks')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3"><MapPin size={18} className="shrink-0 text-blue-500" /><span>{t('footerAddress')}</span></li>
              <li className="flex items-center gap-3"><Phone size={18} className="shrink-0 text-blue-500" /><span>+91 98765 43210</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">{t('footerFollow')}</h4>
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <p className="text-[10px] text-gray-500 mb-4 uppercase tracking-widest font-black">Community Group</p>
              <button className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm">
                <MessageCircle size={18} /> Join WhatsApp
              </button>
            </div>
          </div>
        </div>
      </footer>

      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[150] bg-white border border-gray-100 p-4 rounded-full shadow-2xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all transform active:scale-95 flex flex-col items-center group"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="font-bold text-xl">{t('cartTitle')}</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-300"><ShoppingCart size={48} className="mb-4 opacity-10" /><p className="text-sm font-medium">{t('cartEmpty')}</p></div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 mb-6 border-b border-gray-50 pb-6">
                    <img src={getDriveUrl(item.img)} className="w-16 h-20 object-cover rounded shadow-sm" />
                    <div className="flex-1">
                      <p className="font-bold text-sm mb-1">{lang === 'hi' ? item.title_hi : item.title}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1"><Minus size={12}/></button>
                          <span className="text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1"><Plus size={12}/></button>
                        </div>
                        <span className="text-sm font-black">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                    <button onClick={() => setCart(c => c.filter(x => x.id !== item.id))} className="text-red-500 p-2"><Trash2 size={16}/></button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-500 font-medium">{t('cartSubtotal')}</span>
                  <span className="font-black text-2xl">₹{cart.reduce((s, i) => s + (i.price * i.quantity), 0)}</span>
                </div>
                <button onClick={handleCheckout} className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
                  <MessageCircle size={20} /> {t('cartCheckout')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-[200] bg-white/60 backdrop-blur-xl flex items-center justify-center p-6" onClick={() => setSelectedBook(null)}>
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden md:flex relative animate-in zoom-in duration-300 border border-gray-100" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedBook(null)} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full z-10"><X /></button>
            <div className="md:w-1/2 bg-gray-50 p-12 flex items-center justify-center">
              <img src={getDriveUrl(selectedBook.img)} className="h-[400px] object-cover rounded-xl shadow-2xl" />
            </div>
            <div className="md:w-1/2 p-12 flex flex-col justify-center">
              <span className="text-xs font-black text-blue-600 uppercase mb-4 tracking-widest">{selectedBook.exam}</span>
              <h2 className="text-3xl font-bold mb-2 leading-tight">{lang === 'hi' ? selectedBook.title_hi : selectedBook.title}</h2>
              <p className="text-gray-400 mb-8 italic">{selectedBook.title}</p>
              <div className="space-y-4 mb-10 text-sm">
                <div className="flex border-b border-gray-100 pb-3">
                  <p className="w-24 font-bold text-gray-400">{t('authorLabel')}</p>
                  <p className="font-bold text-gray-800">{selectedBook.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4">
                <span className="text-3xl font-black">₹{selectedBook.price}</span>
                <button onClick={() => { addToCart(selectedBook); setSelectedBook(null); }} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold">
                  {t('addToCart')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}