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

 { id: 1, title: "Rajasthan Ka Bhugol", title_hi: "राजस्थान का भूगोल ", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 228.00, img: "1nAhs6uIIjuVY9qdPHHdTBQhzLaoLn81i" },
 { id: 2, title: "Rajasthan Rajvyavastha", title_hi: "राजस्थान राजव्यवस्था", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 171.00, img: "1cl26wFEE08k_1C5pvQ834tv8kPfwdjan" },
 { id: 3, title: "Rajasthan Itihas", title_hi: "राजस्थान इतिहास", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 238.00, img: "19EnJ7urtmUUU3GLv3caCgOe92aZZLDLr" },
 { id: 4, title: "Rajasthan Kala Sanskriti", title_hi: "राजस्थान कला एवं संस्कृति", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 238.00, img: "1zv4I1EE1NsZknLaJQbbsnP0EhyUWcQQO" },
 { id: 5, title: "Bharat Ka Bhugol", title_hi: "भारत का भूगोल", exam: "RAS, Police", author: "Kapil Choudhary", publisher: "Booster Academy", price: 190.00, img: "1x0gccAtTmFoyaUKHvrXs2Xg7iWWZ1ioe" },
 { id: 6, title: "Mahila Paryavekshak", title_hi: "महिला पर्यवेक्षक", exam: "Supervisor", author: "Gjanand Sir, Anil Sir, J.P. Choudhary Si", publisher: "Udaan", price: 315.00, img: "1PzAiRJeAhvjzf4EJTsO9chrwus0oADp8" },
 { id: 7, title: "Krishi Pravekshak", title_hi: "कृषि पर्यवेक्षक", exam: "Supervisor", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 135.00, img: "13NeCWoCg7hfSNindwAdmJQ7dCg9YTnSz" },
 { id: 8, title: "Frp 1st Grade Samanya Vigyan Ganit Sankhiki", title_hi: "FRP प्रथम श्रेणी (1st Grade) सामान्य विज्ञान, गणित एवं सांख्यिकी", exam: "1st Grade", author: "Ramawtar Bhadhala,Rajendra Prasad Gora,Pradeep Sihag,Dinesh Bhadhala", publisher: "Smile Study", price: 232.00, img: "1SVy_lxvgFRn7ipiM04yhzNxF9tMjHrpK" },
 { id: 9, title: "LDC Paper 1 and 2 ", title_hi: "एल.डी.सी. (LDC) पेपर-I एवं II", exam: "LDC", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 594.00, img: "1_yhKs9Bo3_wLN3i5Bty_HQxM0HcR-EIB" },
 { id: 10, title: "Frp Rajasthan Current Varshikank", title_hi: "FRP राजस्थान समसामयिकी वार्षिकांक", exam: "All Exams", author: "Santosh Sharma", publisher: "Mumal", price: 81.00, img: "10yQO10OwkE8JkP_ZAjyD5ZRVhk2KprWp" },
 { id: 11, title: "Frp Rajasthan Current Varshikank 4.0", title_hi: "FRP राजस्थान समसामयिकी वार्षिकांक", exam: "All Exams", author: "Santosh Sharma", publisher: "Mumal", price: 108.00, img: "1rHDILlbmKNh9uFYIgQJkDd_MWQAvgVRU" },
 { id: 12, title: "2nd Grade Gk Paper 1 ", title_hi: "द्वितीय श्रेणी (II Grade) सामान्य ज्ञान, प्रथम प्रश्न पत्र", exam: "2nd Grade", author: "Pawan Bhawariya,Rakesh Bhaskar,H.P. TalerK.C. Godara,", publisher: "Nath Publication", price: 629.00, img: "1XOeCe2jIcOCdI7-cJDbAwXbfFvtou6I6" },
 { id: 13, title: "Rajasthan Gk Old Is Gold", title_hi: "राजस्थान सामान्य ज्ञान: ओल्ड इज गोल्ड", exam: "LDC", author: "Pawan Bhawariya,Rakesh Bhaskar,H.P. TalerK.C. Godara,", publisher: "Nath Publication", price: 585.00, img: "1XNgs0xAPccsjTN9KdCKSsP_XqoG13dMj" },
 { id: 14, title: "Bhartiya Rajvyavastha", title_hi: "भारतीय राजव्यवस्था", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 285.00, img: "1suukq11PacKpsVAAHIglBMgQ_U2q5-S1" },
 { id: 15, title: "Rajasthan Ka Bhugol", title_hi: "राजस्थान का भूगोल ", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 285.00, img: "1RgmGEN5ELxqVgNcCvInntdazVsy7Fw1e" },
 { id: 16, title: "Rajasthan Kala Sanskriti", title_hi: "राजस्थान कला एवं संस्कृति", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 209.00, img: "12x0IXIwgTVxGgwkZcamMnG96XY9NCk8C" },
 { id: 17, title: "Rajasthan Rajvyavastha", title_hi: "राजस्थान राजव्यवस्था", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 209.00, img: "1cTnjuxjRnUXBh37oHVg_28Ho0hYp-egM" },
 { id: 18, title: "Rajasthan Ka Itihas", title_hi: "राजस्थान इतिहास", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 209.00, img: "12Br-Q-6sjTpc0RZCyMlPDlJ_ZTS1vuzD" },
 { id: 19, title: "Adhunik Bharat Ka Itihas", title_hi: "आधुनिक भारत का इतिहास", exam: "RAS, Police", author: "Vikash Gupta Sir", publisher: "Ceramic Academy ", price: 200.00, img: "11Q9y5T1PMIC8PK1gVDb33lMvUra4eMKP" },
 { id: 20, title: "RAS Rajasthan Kala Avm Sanskriti", title_hi: "आर.ए.एस. (RAS) राजस्थान कला एवं संस्कृति", exam: "RAS, Police", author: "Rajveer Singh Chalkoi", publisher: "Springboard Academy", price: 152.00, img: "1TNJRmIp_5CIkqUOAGkTycz1d328KRYoW" },
 { id: 21, title: "RAS Bhartiya Arthvyavstha", title_hi: "आर.ए.एस. (RAS) भारतीय अर्थव्यवस्था", exam: "RAS, Police", author: "Vijay singh Shekhawat", publisher: "Springboard Academy", price: 228.00, img: "13qYdu-GCrJsRxglPcdQZrhVe06rPC4Ys" },
 { id: 22, title: "RAS Rajasthan Ki Rajvyavastha", title_hi: "आर.ए.एस. (RAS) राजस्थान की राजव्यवस्था", exam: "RAS, Police", author: "Dileep Mahecha", publisher: "Springboard Academy", price: 152.00, img: "16j1SeBW0OwPO8JVXv61DBSIm0Guh21CX" },
 { id: 23, title: "RAS Rajasthan Ka Itihas", title_hi: "आर.ए.एस. (RAS) राजस्थान का इतिहास", exam: "RAS, Police", author: "Rajveer Singh Chalkoi", publisher: "Springboard Academy", price: 200.00, img: "1y52o9e85i9_yCywOltx5kNnKWvneGsra" },
 { id: 24, title: "RAS Rajasthan Ka Bhugol", title_hi: "आर.ए.एस. (RAS) राजस्थान का भूगोल", exam: "RAS, Police", author: "Sangata mam", publisher: "Springboard Academy", price: 228.00, img: "1qQs9m2XGUUjnWXa4ydmbYWt5cTyMN2eH" },
 { id: 25, title: "RAS Prachin Bharat Ka Itihas", title_hi: "आर.ए.एस. (RAS) प्राचीन भारत का इतिहास", exam: "RAS, Police", author: "Narendra Ranawat", publisher: "Springboard Academy", price: 105.00, img: "1l-2dx4SyAvzwutg3qKHNwNt4jp1G2el_" },
 { id: 26, title: "RAS Madhyakalin Bharat Ka Itihas", title_hi: "आर.ए.एस. (RAS) मध्यकालीन भारत का इतिहास", exam: "RAS, Police", author: "Surya sir", publisher: "Springboard Academy", price: 105.00, img: "1r0YiMBnypc5DUMYeY-s5xuCTOVzj3KHQ" },
 { id: 27, title: "CET 10+2 Avm Snatak V-I", title_hi: "सी.ई.टी. (CET) 10+2 (Senior Secondary) एवं स्नातक (Graduate) स्तर, खंड-I (Volume-I)", exam: "CET", author: "Kanti Jain Mahaveer Jain", publisher: "Lakshya", price: 508.00, img: "1-t8zJ2J82spEdK6SLIJDB1gVnWd4OkXm" },
 { id: 28, title: "CET 10+2 V-Ii", title_hi: "सी.ई.टी. (CET) 10+2 (सीनियर सेकेंडरी स्तर), खंड-II (Volume-II)", exam: "CET", author: "Kanti Jain Mahaveer Jain", publisher: "Lakshya", price: 460.00, img: "1QbGZsQKd_5LxcxVaqLTzB4s0xQdKh9Cs" },
 { id: 29, title: "High Court", title_hi: "राजस्थान उच्च न्यायालय", exam: "High Court", author: "Kanti Jain Mahaveer Jain", publisher: "Lakshya", price: 248.00, img: "1U65ixvQsU2sRiVyZSXO-_7mK4mDCRCQ2" },
 { id: 30, title: "Bharat Ka Bhugol", title_hi: "भारत का भूगोल", exam: "IAS, Police", author: "Majid Husain", publisher: "Tata Macgraw Hill", price: 660.00, img: "1Wk6IvwuqJ2BGg78WsLTEsfyXNcT2Fi1Z" },
 { id: 31, title: "Bharat Avm Vishv Ka Bhugol", title_hi: "भारत एवं विश्व का भूगोल", exam: "IAS, Police", author: "Pallavi Saxena", publisher: "Tata Macgraw Hill", price: 540.00, img: "1HHLYP4OUnnewHOCYhby5ATOG6hNPXeUp" },
 { id: 32, title: "Bhartiya Kala Sanskrati ", title_hi: "भारतीय कला एवं संस्कृति", exam: "IAS, Police", author: "Nitin Singhania", publisher: "Tata Macgraw Hill", price: 768.00, img: "1VJVsiNPQnYYP1zdZA-lHpO9GkPntQKdd" },
 { id: 33, title: "Bharat Ki Rajvyavastha", title_hi: "भारत की राजव्यवस्था", exam: "IAS, Police", author: "M. Laxmikanth", publisher: "Tata Macgraw Hill", price: 820.00, img: "1C-ovYJy6q6Pfl4WbgVisw96zMZvTzBwi" },
 { id: 34, title: "Naveen Hindi Vyakran Avm Rachna", title_hi: "नवीन हिंदी व्याकरण एवं रचना", exam: "RAS, Patwari, VDO, CET, 4th Grade", author: "Dr. Sohandhan Charan", publisher: "Pareek", price: 180.00, img: "1bi5_bPkZF50O05pQ52befEv6LZquhGjF" },
 { id: 35, title: "Hindi Vyakran (Sumanlata)", title_hi: "हिंदी व्याकरण", exam: "RAS, Patwari, VDO, CET, 4th Grade", author: "Dr. Sumanlata Yadav,Subhash Charan", publisher: "RBD", price: 270.00, img: "1t0oXKz2BNrBJ4UulFYYIXcRMmOG9FfGo" },
 { id: 36, title: "Rajasthan Bhugol Arthvyavastha", title_hi: "राजस्थान भूगोल एवं अर्थव्यवस्था", exam: "RAS, Patwari, VDO, CET, 4th Grade", author: "N.S. Sharma Sir ,Dr. Vandana Josh,Dileep Singh", publisher: "Sikhwal", price: 300.00, img: "1ogJ0-RsJwVq94tmUd-2Zi15ALoKN4rMM" },
 { id: 37, title: "Rajasthan Itihas", title_hi: "राजस्थान इतिहास", exam: "RAS, Patwari, VDO, CET, 4th Grade", author: "N.S. Sharma Sir", publisher: "Sikhwal", price: 300.00, img: "1L_AlHjPA0PakiH4DE_iiSvh0yFJN5_Zu" },
 { id: 38, title: "Raj. Kala Evem Sanskriti", title_hi: "राजस्थान कला एवं संस्कृति", exam: "RAS, Patwari, VDO, CET, 4th Grade", author: "N.S. Sharma Sir", publisher: "Sikhwal", price: 300.00, img: "1dmNQu-1exVbPt-5_eptdEVKICkqrjQwY" },
 { id: 39, title: "Prayogshala Sahayak Science Model", title_hi: "प्रयोगशाला सहायक (Lab Assistant) - विज्ञान मॉडल पेपर", exam: "Lab Assistant", author: "Ashish Sharma", publisher: "RBD", price: 214.00, img: "188PXHiG72kh2zLxgh9ggUY7yBTzgKUGy" },
 { id: 40, title: "Frp Prayogshala Sahayak Vigyan", title_hi: "प्रयोगशाला सहायक (Lab Assistant)", exam: "Lab Assistant", author: "Ashish Sharma", publisher: "RBD", price: 470.00, img: "1nzx6DikvQ21Q042nqss74fDSDFY-Drso" },
 { id: 41, title: "Ssc Gd Constable", title_hi: "एस.एस.सी. जीडी कांस्टेबल", exam: "Police", author: "Khan Sir", publisher: "RBD", price: 280.00, img: "1P9ZOLPBMByev1E7UdgpYZIrnjsp7gm1X" },
 { id: 42, title: "Frp Raj. Police Gk Vigyan", title_hi: "राजस्थान पुलिस कांस्टेबल", exam: "Police", author: "Subhash Charan ,Ramakant Sharma,Narayan Sharma,U.S. Shekhawat", publisher: "RBD", price: 470.00, img: "1JOW0lJhwBWZfhhKblmHspfgt5IqfiBUH" },
 { id: 43, title: "Rajasthan Ka Itihas Divyastra", title_hi: "राजस्थान इतिहास", exam: "Multiple Exams", author: "Subhash Charan", publisher: "RBD", price: 162.00, img: "1NdxvZX-LtcMNynNCv-4x417l1r2HlicQ" },
 { id: 44, title: "Frp Rajasthan Kala Sanskriti", title_hi: "राजस्थान कला एवं संस्कृति", exam: "Multiple Exams", author: "Subhash Charan ,Ramakant Sharma", publisher: "RBD", price: 181.00, img: "1iEMPQj5qVRrq6bdgc2MRtrmGgvBPwwWG" },
 { id: 45, title: "Rajasthan Ka Bhugol Divyastra", title_hi: "राजस्थान का भूगोल ", exam: "Multiple Exams", author: "Subhash Charan , Narayan Sharma", publisher: "RBD", price: 162.00, img: "1qxhL8A5xCt__rBn7HzaOamLRLJoazpEf" },
 { id: 46, title: "High Court Guide Rbd", title_hi: "राजस्थान उच्च न्यायालय", exam: "HIGH COURT", author: "Dr. Sumanlata Yadav, Subhash Charan, Narayan Sharma", publisher: "RBD", price: 297.00, img: "1sOdk0859CwYLct2Xxcj6OqTxzsAEd8Rk" },
 { id: 47, title: "2nd Grade SST Itihas", title_hi: "II Grade (द्वितीय श्रेणी शिक्षक) केसामाजिक विज्ञान (SST) विषय के इतिहास", exam: "2nd Grade", author: "Pawan Bhawariya", publisher: "Nath Publication", price: 171.00, img: "1NvnEBC9l3biO40S2P33duVdc5O1AXxAE" },
 { id: 48, title: "1st Grade Shekshik Prabandh", title_hi: "I Grade (School Lecturer) परीक्षा के प्रथम प्रश्न-पत्र (Paper-I) के खंड शैक्षिक प्रबन्ध ", exam: "1st Grade", author: "Pawan Bhawariya", publisher: "Nath Publication", price: 180.00, img: "1KKpjiJriBkH8NaIuTq_hOrt51HyqAQmx" },
 { id: 49, title: "2nd Grade Bhugol SST", title_hi: "II Grade (द्वितीय श्रेणी शिक्षक) SST (सामाजिक विज्ञान) विषय के भूगोल", exam: "2nd Grade", author: "K.C .Godhra ,Vinod taler", publisher: "Nath Publication", price: 225.00, img: "1dX7CTZJSpBnt3GQTw5u4zscEGb8Ah6nT" },
 { id: 50, title: "1st Grade Ganit Sankhiki Mansik Shamta", title_hi: "गणित सांख्यिकी और मानसिक क्षमता खंड के लिए है", exam: "1st Grade", author: "(Navdeep Goyal", publisher: "Nath Publication", price: 126.00, img: "115ZGaFPCOyTnFm0mSl6bFPACwLwjv-IS" },
 { id: 51, title: "2nd Grade Rajniti Vigyan", title_hi: "II Grade राजनीति विज्ञान (SST)", exam: "2nd Grade", author: "Rakesh bhaskar", publisher: "Nath Publication", price: 162.00, img: "1j_5jty-DVd29nyoTvJHvEJQ8jHq906vF" },
 { id: 52, title: "1st Grade General English", title_hi: "I Grade सामान्य अंग्रेजी", exam: "1st Grade", author: "Dr.C.R. Tetarwal", publisher: "Nath Publication", price: 135.00, img: "1nMA8u57zLcKQbAoxgt-0r2wqB1jqzTfw" },
 { id: 53, title: "1st Grade Bhartiya Itihas", title_hi: "I Grade भारतीय इतिहास", exam: "1st Grade", author: "Pawan Bhawariya", publisher: "Nath Publication", price: 108.00, img: "1NodQWXqfsnkbfKBQaxnuOuChkcItEM_P" },
 { id: 54, title: "2nd Grade Samajik Vigyan Shikshan Vidhiya", title_hi: "II Grade सामाजिक विज्ञान शिक्षण विधियाँ", exam: "2nd Grade", author: "Dr. Ranjan Pareek", publisher: "Nath Publication", price: 135.00, img: "1RU5b6_kqo66RsmUxlFhUyIWozlG2G5n5" },
 { id: 55, title: "1st Grade Rajasthan Ka Bhugol Rajvyavastha", title_hi: "I Grade राजस्थान का भूगोल एवं राजव्यवस्था", exam: "1st Grade", author: "Rakesh bhaskar", publisher: "Nath Publication", price: 243.00, img: "1nGGrZDAU8Mw2qsh3R91ro-w3u7fGkW74" },
 { id: 56, title: "1st Grade Rajasthan Itihas Kala", title_hi: "I Grade राजस्थान का इतिहास एवं कला-संस्कृति", exam: "1st Grade", author: "Pawan Bhawariya ,H.P. TalerK", publisher: "Nath Publication", price: 207.00, img: "1HQSJJMOX5aJUVfbAn328O77vyUwypxAW" },
 { id: 57, title: "Frp LDC Kanishk Sahayak", title_hi: "LDC कनिष्ठ सहायक भर्ती परीक्षा विवरण", exam: "LDC", author: "Gaurav Ghanerao ,Rohit Nama", publisher: "Chyavan", price: 409.00, img: "1BCIhG2hD9ZAYImqD0fJWWknh5L-3q9WV" },
 { id: 58, title: "Frp 2nd Grade Samany Gyan Gk", title_hi: "II Grade सामान्य ज्ञान (Paper-I)", exam: "2nd Grade", author: "Gaurav Ghanerao ,Rohit Nama", publisher: "Chyavan", price: 428.00, img: "1ZHu5bVty-21ixz_3IYzNf3tBNpGIn7Bo" },
 { id: 59, title: "1st Grade Samany Vigyan", title_hi: "I Grade सामान्य विज्ञान", exam: "1st Grade", author: "Dr. Swati Jabhak", publisher: "Sikhwal", price: 216.00, img: "1uTGxQ1_QSU-NkGbgqsDhY3ibHkCbRFp3" },
 { id: 60, title: "LDC English", title_hi: "राजस्थान LDC(Clerk Grade-II) परीक्षा में अंग्रेजी", exam: "LDC", author: "Dr. Swati Jabhak", publisher: "Sikhwal", price: 108.00, img: "1_Aqjii3d_KM75a5UpaBU2O8WwkNHWcLi" },
 { id: 61, title: "LDC Samanya Hindi", title_hi: "राजस्थान LDC (Clerk Grade-II) परीक्षा में सामान्य हिंदी", exam: "LDC", author: " Sahadev Choudhary ,Bharat Khorana ,Usha Sharma,Hemant Jangid", publisher: "Sikhwal", price: 108.00, img: "16fJQnS2dG5RmP1KKUCQnpMtCMlBmVLcO" },
 { id: 62, title: "LDC Tricky Ganit", title_hi: "LDC Tricky Ganit (ट्रीकी गणित", exam: "LDC", author: "R.K. Nath Sir", publisher: "Sikhwal", price: 108.00, img: "1gwoo0RfIrhLnkOsK013J3_iCuWqPbws6" },
 { id: 63, title: "2nd Grade GK Volume 1", title_hi: "II Grade सामान्य ज्ञान (वॉल्यूम-1)", exam: "2nd Grade", author: "N.M.Sharma", publisher: "Sikhwal", price: 599.00, img: "1Z7M1pFEKfAXUAhxlWzRPNLzNxfJpTdSZ" },
 { id: 64, title: "Vanpal New", title_hi: "वनपाल new ", exam: "Vanpal", author: "N.M.Sharma", publisher: "Sikhwal", price: 419.00, img: "1HkJWJh7OwF4WlqkljVhDMaABN6RK32aL" },
 { id: 65, title: "Agriculture Volume 2", title_hi: "एग्रीकल्चर वॉल्यूम -2 ", exam: "Agriculture", author: "Nikhil Khandelwal", publisher: "Sikhwal", price: 300.00, img: "1Nh1e5LR08k22l5RbCUlW6wqF9PP0s9Ql" },
 { id: 66, title: "2nd Grade Shiksha Manovigyan Volume 2", title_hi: "II Grade शिक्षा मनोविज्ञान Volume-II", exam: "2nd Grade", author: " Dr. Vandana Joshi", publisher: "Sikhwal", price: 282.00, img: "1zShfyWF016cBneMUoh2ifSV9HqvYFbPL" },
 { id: 67, title: "Rajasthan Manchitrawali", title_hi: "राजस्थान मानचित्रावली", exam: "ALL EXAM", author: "N.M.Sharma , Dr. Vandana Joshi", publisher: "Sikhwal", price: 144.00, img: "1KFj5bLntfThIn2p8pn_V1Rm8hJ9k06Qi" },
 { id: 68, title: "3rd Grade Leve 1 Solved Paper", title_hi: " GIIIrade L-I Solved Paper", exam: "3rd Grade", author: " Sikhwal team", publisher: "Sikhwal", price: 179.00, img: "18l-EBGe-19qW-TxCg1-7xAXKEuZnNVx3" },
 { id: 69, title: "3rd Grade Samajik Solved Paper", title_hi: "Grade सामाजिक अध्ययन (SST) Solved Paper", exam: "1st Grade", author: " Sikhwal team", publisher: "Sikhwal", price: 239.00, img: "1yPwRSqWc8J9HV8m8qX7Wud8Ys5_20TKM" },
 { id: 70, title: "REET Ganit Vigyan Solved Paper", title_hi: "REET गणित-विज्ञान Solved Paper", exam: "1st Grade", author: " Sikhwal team", publisher: "Sikhwal", price: 239.00, img: "1PtdnrjxWa9f2_bGWzWpzFl7tSJKf5VcL" },
 { id: 71, title: "RAS Arthik Avdharnaye Arthvyavastha", title_hi: "RAS आर्थिक अवधारणाएं एवं अर्थव्यवस्था", exam: "REET", author: "Kirti Kumar  Ahuja, N.M.Sharma", publisher: "Sikhwal", price: 239.00, img: "19L6cKCDPkRZRoxXlQNttagxS5L6nUCsC" },
 { id: 72, title: "1st Grade Manovigyan", title_hi: "1 Grade शिक्षा मनोविज्ञान", exam: "1st Grade", author: "Dr. Vipin Gahlot , Dr. Vandana Joshi", publisher: "Sikhwal", price: 179.00, img: "1ijCHQQuEEzEFnuct3pxvLHfq0RZkMUHc" },
 { id: 73, title: "Hindi Vyakaran", title_hi: "हिंदी व्याकरण", exam: "ALL EXAM", author: " Subhash Yadav ,Ekta aiianiha", publisher: "MP", price: 336.00, img: "1X0_jPbT6xjWRLDUChd_zrPE7C4zeFa7i" },
 { id: 74, title: "Samanya Hindi", title_hi: "सामान्य हिंदी", exam: "ALL EXAM", author: "Dr. Raghav Prakash", publisher: "PCP", price: 360.00, img: "1NLdFRxuAUBbkUgNrmawVP4nfdDIwphOI" },
 { id: 75, title: "Rajasthan Itihas Kala Sanskriti", title_hi: "राजस्थान का इतिहास, कला एवं संस्कृति", exam: "ALL EXAM", author: "Dr. Hukumchand Jain ,Dr. Narayan Lal Mali", publisher: "RHGA", price: 280.00, img: "13UIEiPSH0JHMZtWD-X1aiY57hb5mZUks" },
 { id: 76, title: "Hindi Vyakaran Meemansa", title_hi: "हिंदी व्याकरण मीमांसा", exam: "ALL EXAM", author: "Dr. S. Kalirana", publisher: "Chillayshi ", price: 384.00, img: "1QHZQhnSmWN55EUWl-PkdKMkUYcKq9ZuN" },
 { id: 77, title: "A Competitive Book", title_hi: "ए कॉम्पिटिटिव  बुक ", exam: "Agriculture", author: "P.D. Choudhary", publisher: "AGRICULTURE", price: 300.00, img: "1De4YgynMjx4MYIFswuKqQhczB3q_dXN6" },
 { id: 78, title: "A Competitive Book Of Agriculture", title_hi: "ए कॉम्पिटिटिव  बुक ऑफ़ एग्रीकल्चर -1", exam: "Agriculture", author: "Dr. Nemraj Sunda", publisher: "Sunda", price: 320.00, img: "1RoZNEyzZWhwj9ADVnnS8OjTuKs0vDEtt" },
 { id: 79, title: "A Competitive Book Of Agriculture", title_hi: "ए कॉम्पिटिटिव  बुक ऑफ़ एग्रीकल्चर -2", exam: "Agriculture", author: "Dr. Nemraj Sunda ,Dr. Nemraj Sunda", publisher: "Sunda", price: 300.00, img: "1kxnyLAG_7BP9KmDhazMbvKtkKmvvi4GW" },
 { id: 80, title: "Vijay Computer Guru", title_hi: "विजय कंप्यूटर गुरु", exam: "ALL EXAM", author: "Vardhman Mahaveer Open University", publisher: "Shiv Publication", price: 84.00, img: "1UquUho_-kb9WXIDW0hx3oHGBl6i290yr" },
 { id: 81, title: "Junior English Grammar", title_hi: "जूनियर इंग्लिश ग्रामर", exam: "JUNIOR ENGLISH GRAMMAR", author: "Dr. R K Sharma", publisher: "Lucent", price: 63.00, img: "1xbJL5VKb5mb6p4NwVSTKJWYlIp7dvxra" },
 { id: 82, title: "High School English Grammar", title_hi: "हाई स्कूल इंग्लिश ग्रामर", exam: "HIGH SCHOOL ENGLISH GRAMMAR", author: "Dr. R K Sharma", publisher: "Lucent", price: 143.00, img: "1iXIjgSO-cT0F6B-HJAl1HlT2jYV3TR2a" },
 { id: 83, title: "Computer Hindi", title_hi: "कंप्यूटर  -हिंदी", exam: "ALL EXAM", author: "Rani Ahilya", publisher: "Lucent", price: 60.00, img: "1Hdj59wCd-5n37OHK1rNJqrG7SYdrVTKm" },
 { id: 84, title: "Dictionary Enghlis to Hindi", title_hi: " डिक्शनरी अंग्रेजी-हिंदी", exam: "CENTRAL ALL EXAM", author: "Dr. S.K Verma", publisher: "Oxford", price: 340.00, img: "1ttlkHUQuVtCJ2djZP-tYZuMYTE93yNP9" },
 { id: 85, title: "Adhunik Bharat Ka Itihas", title_hi: "आधुनिक भारत का इतिहास", exam: "CENTRAL ALL EXAM", author: "Rajiv Ahir", publisher: "Spectrum", price: 548.00, img: "1zK4T6l0WxYUb1hjMYexAJ4_UBzSfwheP" },
 { id: 86, title: "Modern India", title_hi: "आधुनिक भारत का इतिहास", exam: "CENTRAL ALL EXAM", author: "Rajiv Ahir", publisher: "Spectrum", price: 532.00, img: "1vIOJZpC3-YLAKHDKdV-rLN89Os5Vb6Dw" },
 { id: 87, title: "Oxford Mini English Hindi", title_hi: "ऑक्सफोर्ड मिनी शब्दकोश", exam: "CENTRAL ALL EXAM", author: "Krishna Kumar Goswami", publisher: "Oxford", price: 176.00, img: "1Fcixw_DilkVqWH4BJHfTkg_nRecxskwU" },
 { id: 88, title: "Frp Current GK Rajasthan Varshikank", title_hi: "राजस्थान वार्षिकांक", exam: "ALL EXAM", author: "Gaurav Ghanerao ,Rajkumar Sharma ", publisher: "Chyavan", price: 143.00, img: "1L4hkdjfqexuuqVTsb62a9LKMUeZaFJ7u" },
 { id: 89, title: "Pocket Samanya Gyan", title_hi: "पॉकेट सामान्य ज्ञान", exam: "CENTRAL ALL EXAM", author: "Khan Sir", publisher: "RBD", price: 200.00, img: "1PjKfREBkLXa0lbBJMR8D6Pk7EY5NPMGf" },
 { id: 90, title: "Vanpal Vanraksh Sarveyar", title_hi: "वनपाल एवं वनरक्षक", exam: "VANPAL VANRAKSH SARVEYAR", author: "DIKSHA", publisher: "Diksha", price: 127.00, img: "1ypgy8WQqsDLGdzE4g5Lb7f8uDG2INaOU" },
 { id: 91, title: "1st Grade Hindi Gadh Padh Rachnaye", title_hi: "1 Grade गद्य और पद्य रचनाएं", exam: "1st Grade", author: "Professor K.C. Maiya", publisher: "Gyan Vitan", price: 203.00, img: "1L-5XP5rTtXwQGFQK1Dj29Qbd0lIsIUAt" },
 { id: 92, title: "Sanskratik Rajasthan Kala Sanskrit", title_hi: "सांस्कृतिक राजस्थान कला एवं संस्कृति", exam: "ALL EXAM", author: "Rahul Choudhary", publisher: "Gyan Vitan", price: 349.00, img: "1DT0TXWvJpQ5Ew64nY11AeynL81veRqGX" },
 { id: 93, title: "Rajasthan Ka Itihas NRT ", title_hi: "राजस्थान इतिहास", exam: "ALL EXAM", author: "Pawan Bhawariya", publisher: "Nath Publication", price: 198.00, img: "1VA4E7x-qG6rc24TbuXVMXDDQMInOwBeG" },
 { id: 94, title: "Rajasthan Ka Bhugol Arthvyavastha", title_hi: "राजस्थान भूगोल एवं अर्थव्यवस्था", exam: "ALL EXAM", author: "H.P. Taler", publisher: "Nath Publication", price: 189.00, img: "1Qoet29ryHMS2Oh5TOvgNRRlZHM9z0ooz" },
 { id: 95, title: "Rajasthan Kala Sanskriti (Nrt)", title_hi: "राजस्थान कला एवं संस्कृति", exam: "ALL EXAM", author: "Pawan Bhawariya", publisher: "Nath Publication", price: 207.00, img: "1pkkTQdvD62vgnPCEWWSzWUrzcf1eP-uW" },
 { id: 96, title: "2nd Grade Vigyan Solved Paper", title_hi: "II Grade विज्ञान सोल्वड पेपर", exam: "II Grade", author: "Solved Paper", publisher: "Prerna Publication", price: 228.00, img: "1vUvjrTYgpygZ2xkz43xSHgrmwloVsPGT" },
 { id: 97, title: "2nd Grade Ganit Solved Paper", title_hi: "II Grade गणित सोल्वड पेपर", exam: "II Grade", author: "Solved Paper", publisher: "Prerna Publication", price: 240.00, img: "1NBV9-WV6_lVq2dnqgjQlocYPKmo9G5Ru" },
 { id: 98, title: "2nd Grade Sanskrit Solved Paper", title_hi: "II Grade संस्कृत सोल्वड पेपर", exam: "II Grade", author: "Solved Paper", publisher: "Prerna Publication", price: 210.00, img: "1bx-gLXz_AYasx6olGnKM7tE3MJhUpbT2" },
 { id: 99, title: "2nd Grade Hindi Solved Paper", title_hi: "II Grade हिंदी सोल्वड पेपर", exam: "II Grade", author: "Solved Paper", publisher: "Prerna Publication", price: 228.00, img: "15iLoOfNFPi_nNnOhcLXIsSLGNSrg1dah" },
 { id: 100, title: "2nd GradeSamajik Solved Paper", title_hi: "II Grade सामाजिक विज्ञान सोल्वड पेपर", exam: "II Grade", author: "Solved Paper", publisher: "Prerna Publication", price: 228.00, img: "1R_4it2GSiCz_O6Z7y8Faq-1wdf12MMAo" },
 { id: 101, title: "2nd Grade English Solved Paper", title_hi: "II ग्रेड अंग्रेजी  सोल्वड पेपर", exam: "II Grade", author: "Solved Paper", publisher: "Prerna Publication", price: 210.00, img: "1nXfbylDNMbnstmyfdVCpFrpduHqmnihe" },
 { id: 102, title: "Pre BSTC Model", title_hi: "प्री Bstc  सोल्वड पेपर", exam: "BSTC", author: "Solved Paper", publisher: "Prerna Publication", price: 228.00, img: "1-qXclfMvfgMi0AkpOaQh7Uxa3RNm_UYc" },
 { id: 103, title: "Prerna 1st Grade Commerce", title_hi: "प्रेरणा I Grade कॉमर्स", exam: "1st Grade", author: "Solved Paper", publisher: "Sonu Prakashan", price: 240.00, img: "12HaOkV7ldqcHHfLY6ayxP_f_bRhanDBG" },
 { id: 104, title: "Prerna 1st Grade Physics", title_hi: "प्रेरणा I Grade भौतिक विज्ञान", exam: "1st Grade", author: "Solved Paper", publisher: "Sonu Prakashan", price: 240.00, img: "1ssuxcsrhHCOmCu1_0Cjt_xs6T6V3xRII" },
 { id: 105, title: "Prerna 1st Grade English Solved Paper ", title_hi: "प्रेरणा I Grade अंग्रेजी सोल्वड पेपर", exam: "1st Grade", author: "Solved Paper", publisher: "Sonu Prakashan", price: 192.00, img: "1IMIcTxP0FwwGLdFCwzQSlCmtGP5n4buM" },
 { id: 106, title: "Prerna 1st Grade Economics", title_hi: "प्रेरणा I Grade अर्थशास्त्र", exam: "1st Grade", author: "Solved Paper", publisher: "Sonu Prakashan", price: 240.00, img: "1Lww-vmAQjMOhfvgBCuRba_MH2hHKVd49" },
 { id: 107, title: "Naveen Rashtriya School Atlas (H)", title_hi: "नवीन राष्ट्रीय स्कूल एटलस (हिंदी)", exam: "NAVEEN RASHTRIYA SCHOOL ATLAS (H)", author: "Biba Singh Kaushal", publisher: "IBD (MH)", price: 264.00, img: "1MFKGQmH-ujAu88ezjIrmFWjEH-Y6Sxkc" },
 { id: 108, title: "Oxford School Atlas (H)", title_hi: "ऑक्सफोर्ड स्कूल एटलस (हिंदी)", exam: "OXFORD SCHOOL ATLAS (H)", author: "Oxford", publisher: "Oxford", price: 272.00, img: "1tLuw0mRm7nXM3cXphw3nzD-cgPsP2OQf" },
 { id: 109, title: "Oxford Student Atlas English", title_hi: "ऑक्सफोर्ड स्टूडेंट एटलस (अंग्रेजी )", exam: "OXFORD STUDENT ATLAS ENGLISH", author: "Oxford", publisher: "Oxford", price: 340.00, img: "1rf9wkc5DG2Dr_04JSJ0Y9MsduAM0VUK6" },
 { id: 110, title: "Lucent General Knowledge", title_hi: "लूसेंट सामान्य ज्ञान", exam: "CENTRAL ALL EXAM", author: "Dr.Binay ,Sanju kumar ,Mahendra Mukal ,R.P.Suman Renu Sinha", publisher: "Lucent", price: 236.00, img: "1FIa75yczQoXjgSXku1B_FannN4pu7afK" },
 { id: 111, title: "Lucent Samanya Vigyan", title_hi: "लूसेंट सामान्य विज्ञान", exam: "CENTRAL ALL EXAM", author: "Sanju kuma  ,Neeraj Chandar Choudhary", publisher: "Lucent", price: 184.00, img: "14d-rGHw_0QH3K7TA9xMGNiOz5srjX3lV" },
 { id: 112, title: "Lucent Vastunistha Samany Gyan", title_hi: "लूसेंट वस्तुनिष्ठ सामान्य ज्ञान", exam: "CENTRAL ALL EXAM", author: "Sanju kuma  ,Neeraj Chandar Choudhary", publisher: "Lucent", price: 344.00, img: "1rKFPP7UwFT0FIzcplWOTj5XyWmKS_gkj" },
 { id: 113, title: "Lucent General English", title_hi: "लूसेंट जनरल इंग्लिश", exam: "CENTRAL ALL EXAM", author: "A.K.Thakur ,Veena Thakur", publisher: "Lucent", price: 344.00, img: "1jYF5uNcoZu54T_CZyHflqhSosaPYvOsH" },
 { id: 114, title: "Hindi 20-20", title_hi: "सामान्य हिंदी 20-20", exam: "CENTRAL ALL EXAM", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1S5vNXEph0dTWVW0wRpZklZ2o-6SjoneU" },
 { id: 115, title: "Bhartiya Sanvidhan Avm Rajvyavastha", title_hi: "भारतीय संविधान एवं राजव्यवस्था", exam: "CENTRAL ALL EXAM", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1nfahI9W0knWRJvc3aYkpOZsVmUBvWBON" },
 { id: 116, title: "Ganit 20-20", title_hi: "गणित 20-20", exam: "CENTRAL ALL EXAM", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1YPmJ64EDrVKzqFO4v_7PIO3OK5ue5wzM" },
 { id: 117, title: "Reasoning 20-20", title_hi: "रीजनिंग 20-20", exam: "CENTRAL ALL EXAM", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1zosVoDqpjWmF5KRQ8_Yq_sOiVsbg24qU" },
 { id: 118, title: "I Grade Shekshik Manovigyan", title_hi: "I Grade शैक्षिक मनोविज्ञान", exam: "1st Grade", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1BRDU76-aQWsrzkGW1ASOCd8cvDBIOf_s" },
 { id: 119, title: "Bharat Vishv Bhugol 20-20 (Dr. Rajeev)", title_hi: "भारत एवं विश्व का भूगोल 20-20", exam: "ALL EXAM", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "15_q9wTKPEdlyIAi4DPBLpLT2eT46C1TT" },
 { id: 120, title: "Computer 2020", title_hi: "कंप्यूटर 2020", exam: "ALL EXAM", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1wA_m38H38j3YpIQLbe4iO8pWk_lIqVi7" },
 { id: 121, title: "Dainik Vigyan 2020", title_hi: "दैनिक विज्ञान 20-20", exam: "ALL EXAM", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1UZs4Qe8KWPBNCEKYMacimvIdkvd2iFPZ" },
 { id: 122, title: "Bharat Vishv Itihas 20-20", title_hi: "भारत एवं विश्व का इतिहास 20-20", exam: "ALL EXAM", author: "Dr.Rajeev", publisher: "Disha", price: 239.00, img: "1YfD8PnNcRdxzc7fQ6qcvmJQLoH6L6Qkh" },
 { id: 123, title: "Handbook Of Agriculture Supervisor", title_hi: "कृषि पर्यवेक्षक", exam: "Supervisor ", author: " Rampal Rundala  ,Aarti Chitra Wale", publisher: "Kailanki", price: 304.00, img: "1i8WTx3-d9PrYPeofxzsG53vzBVrLGIgc" },
 { id: 124, title: "All Rajasthan Bhugol Exam Review", title_hi: "राजस्थान भूगोल परीक्षा समीक्षा", exam: "ALL EXAM", author: "Santosh Sharma Devi ", publisher: "Mumal", price: 237.00, img: "1lZZo4C73vfsuOVZyJ1g_x-6BFClQ3S_g" },
 { id: 125, title: "All Rajasthan Itihas Exam Review", title_hi: "राजस्थान इतिहास परीक्षा समीक्षा", exam: "ALL EXAM", author: "Santosh Sharma Devi ", publisher: "Mumal", price: 234.00, img: "1QmLfz7u8UTu76B3IxM_GAKa6T0Vwo_ow" },
 { id: 126, title: "Rapidex English Speking Course (H)", title_hi: "रैपिडेक्स इंग्लिश स्पीकिंग कोर्स (हिंदी माध्यम के लिए अंग्रेजी सीखने )", exam: "RAPIDEX ENGLISH SPEKING COURSE (H)", author: "R.K. Gupta M.A", publisher: "PM", price: 252.00, img: "1ByuSUq9wWjTDQGvDuD4ck_UL7yEoQ1BK" },
 { id: 127, title: "2nd Grade Itihas", title_hi: "2nd Grade इतिहास", exam: "II Grade", author: "Gaurav Ghanerao", publisher: "Chyavan", price: 190.00, img: "1Nm-k7GN6B0KYl-nxz2_aEmX3fX_x6mYx" },
 { id: 128, title: "Frp 2nd Grade Rajniti Vigyan", title_hi: "II Grade राजनीति विज्ञान", exam: "II Grade", author: "Pushpendra Kasana", publisher: "Chyavan", price: 200.00, img: "1Wii7TCn7_Kgz_kuxCnEVr9rii_FZfBP2" },
 { id: 129, title: "Frp 2nd Grade Arthshastra", title_hi: "II Grade अर्थशास्त्र", exam: "II Grade", author: "Dr. Ajay Sharma", publisher: "Chyavan", price: 124.00, img: "1PZLHqcO_Aj8XaJ2CE6fdmX1x4i3UmZwY" },
 { id: 130, title: "Frp 2nd Grade Darshanshastra", title_hi: "II Grade दर्शनशास्त्र", exam: "II Grade", author: "Pushpendra Kasana", publisher: "Chyavan", price: 162.00, img: "1oZFUo4Mw1KOnGv84liQdFvFoZXvujSvO" },
 { id: 131, title: "Frp 2nd Grade Lok Prashasan", title_hi: "II Grade लोक प्रशासन", exam: "II Grade", author: "Pushpendra Kasana", publisher: "Chyavan", price: 152.00, img: "1xrUl0eJGbMzo1zKVpB9n8kHZRu7gkOW9" },
 { id: 132, title: "Frp 2nd Grade Samajshastra", title_hi: "II Grade समाजशास्त्र", exam: "II Grade", author: "Sunil Dhattarwal", publisher: "Chyavan", price: 166.00, img: "13uxRc4i9etzpf8rXqr3sErEWpqG5WC8l" },
 { id: 133, title: "Frp  2nd Grade Bhugol", title_hi: "II Grade भूगोल", exam: "II Grade", author: "Dr. Vijay Prakash, Sanjay Chaudhari, Nidhi Yadav", publisher: "Chyavan", price: 219.00, img: "1X3G1C6t8JzylR98ud7kHOy8wkn0RrZe7" },
 { id: 134, title: "Rajasthan Ki Rajvyvastha", title_hi: "राजस्थान की राजव्यवस्था", exam: "ALL EXAM", author: "Dr. Rahul Chaudhary", publisher: "Gyan Vitan", price: 308.00, img: "1qE4JIeL41ZqtvOGtxsc52WeYAk4QT4no" },
 { id: 135, title: "Bharat Ki Rajvyavastha", title_hi: "भारत की राजव्यवस्था", exam: "ALL EXAM", author: "Dr. Rahul Chaudhary", publisher: "Gyan Vitan", price: 364.00, img: "1rZ4-lpdvJLF4W2QS1SuHpofzaJWAI23H" },
 { id: 136, title: "Current Varshiki", title_hi: "करेंट अफेयर्स वार्षिकी 2025-26", exam: "ALL EXAM", author: "Mukesh kumar ", publisher: "Speedy", price: 90.00, img: "1YLUHaIBu8jVcwmCMPX5mfWx8oUwJAdk6" },
 { id: 137, title: "Frp Current Gk", title_hi: "राजस्थान विशेष: प्रमुख हॉट टॉपिक्स (2025-26)", exam: "ALL EXAM", author: "Santosh Sharma", publisher: "Mumal", price: 27.00, img: "1RFJOf5z7Bumb9P05vevkpYK9gufukw1x" },
 { id: 138, title: "Static Gk", title_hi: "स्थैतिक सामान्य ज्ञान", exam: "ALL EXAM", author: "Naveen Sharma Sir", publisher: "Ankit Bhati", price: 159.00, img: "1svB0cU-sXU9uvdPWB2rpFU1rAnfYQAZe" },
 { id: 139, title: "Ssc Gd Samanya Hindi", title_hi: "SSC GD सामान्य हिंदी", exam: "SSC GD CONSTABLE", author: "Ankit Bhati", publisher: "Ankit Bhati", price: 119.00, img: "1392BV0APxw0xig8N0m3TxnxfV9pL3cSj" },
 { id: 140, title: "Ssc Gd Reasoning Verbal Non Verbal", title_hi: "SSC GD रीजनिंग (Verbal & Non-Verbal)", exam: "SSC GD CONSTABLE", author: "Ankit Bhati", publisher: "Ankit Bhati", price: 119.00, img: "1wRKYtJMd2B6QevsGlEDjQiBVVZtCGzPQ" },
 { id: 141, title: "Ssc Gd Maths", title_hi: "SSC GD गणित", exam: "SSC GD CONSTABLE", author: "Ankit Bhati", publisher: "Ankit Bhati", price: 119.00, img: "1AWVvC_MDkapxT0ofpT9IklrSX4J648_j" },
 { id: 142, title: "Ssc Gd Samanya Adhyan Gs", title_hi: "SSC GD Constable परीक्षा में सामान्य अध्ययन", exam: "SSC GD CONSTABLE", author: "Ankit Bhati", publisher: "Ankit Bhati", price: 140.00, img: "1aZhofQPQKs0pF8z37IDMPOIGyHtfx20g" },
 { id: 143, title: "Rajasthan Chronology", title_hi: "राजस्थान क्रोनोलॉजी", exam: "ALL EXAM", author: "Santosh Sharma", publisher: "PMC", price: 36.00, img: "1e2YvanepznNNW4nldtKL7vYqO_SjfhhT" },
 { id: 144, title: "Frp Rajasthan Current Varshikank", title_hi: "FRP राजस्थान करंट वार्षिकांक", exam: "ALL EXAM", author: "Santosh Sharma", publisher: "Mumal", price: 81.00, img: "1nYvHTxgiQI7toqBKdNP-OdIqqDrhXXh9" },
 { id: 145, title: "Chronology", title_hi: " क्रोनोलॉजी", exam: "ALL EXAM", author: "Pradeep Saraswati", publisher: "Chrono Current ", price: 23.00, img: "1MeqMon-LCwmsdO3JN_-Ft4pu6MAMhlQj" },
 { id: 146, title: "Rajasthan Itihas Bhramastra (Rohit Sir)", title_hi: "राजस्थान इतिहास ब्रह्मास्त्र", exam: "ALL EXAM", author: "Rohit sir", publisher: "Apni Padhai", price: 90.00, img: "1tTS_WIlhj9ieFhDCelfzEpDJ0YfyKeBF" },
 { id: 147, title: "Rajasthan Bhugol Bhramastra (Rohit Sir)", title_hi: "राजस्थान का भूगोल ब्रह्मास्त्र", exam: "ALL EXAM", author: "Rohit sir", publisher: "Apni Padhai", price: 153.00, img: "1UdoOq1E0VP3REGeoE2DLb5ePOjoeNQ3M" },
 { id: 148, title: "Rajasthan Kala Sanskriti Bramastra", title_hi: "राजस्थान कला एवं संस्कृति ब्रह्मास्त्र", exam: "ALL EXAM", author: "Rohit sir", publisher: "Apni Padhai", price: 135.00, img: "1NWvah2knJZ-LQJA0NA1Qvkv8ja-wW-SQ" },
 { id: 149, title: "Omr Sheet", title_hi: "ओएमआर शीट", exam: "PSI", author: "OMR SHEET", publisher: "Sarthak", price: 27.00, img: "1YNg1feDiGaYZx1Rnfd5dS5P5eUKMHOg4" },
 { id: 150, title: "Psi Pyq", title_hi: " पुलिस सब इंस्पेक्टर प्रीवियस  कुस्शन", exam: "PSI", author: "PYQ", publisher: "Sarthak", price: 180.00, img: "1zIFLQDrWIguVDj5OgwIyNcDCqTtrKotN" },
 { id: 151, title: "Cet Snatak Pyq", title_hi: "राजस्थान CET स्नातक (Graduate Level) प्रीवियस  कुस्शन", exam: "CET", author: "PYQ", publisher: "Sarthak", price: 156.00, img: "1SdZ2CxzpEtvzUhFFJLLlSBkTHMMXEwU5" },
 { id: 152, title: "Cet 10+2 Pyq", title_hi: "राजस्थान CET सीनियर सेकेंडरी स्तर   प्रीवियस  कुस्शन", exam: "CET", author: "PYQ", publisher: "Sarthak", price: 186.00, img: "1mKe1OyadrE8KjgXx2bJKvqEBXgQN88pb" },
 { id: 153, title: "Bstc 10P/S", title_hi: "BSTC के लिए 10 प्रैक्टिस सेट", exam: "BSTC ", author: "PYQ", publisher: "Sarthak", price: 216.00, img: "129n02r7yWBtg7EENfyIiMXBE4Ghw_n6c" },
 { id: 154, title: "Sharirik Shiksha (Abhinav Rathore)", title_hi: "शारीरिक शिक्षा", exam: "II Grade", author: "Abhinav Rathore", publisher: "Rajdeep Publication", price: 240.00, img: "1923qd--yqmKcKQ572VkYJ6OmUSwZyTF0" },
 { id: 155, title: "High Court Fourth Grand 4001+", title_hi: "राजस्थान उच्च न्यायालय चतुर्थ श्रेणी कर्मचारी 4001+", exam: "HIGH COURT", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 193.00, img: "1Lr4i4IHURPWIxyJBcSwGaTNRAChmC5Gq" },
 { id: 156, title: "Rajasthan All In One", title_hi: "राजस्थान आल इन वन  ", exam: "ALL EXAM", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 533.00, img: "1aQZrVU6xAE5Fno4F11lDE_D_rOBkwAFq" },
 { id: 157, title: "2nd Grade Samanya Gyan Volume 1 ", title_hi: "II Grade सामान्य ज्ञान Vol-I", exam: "II Grade", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 389.00, img: "1eIuylNnMXKrs_6Uda9FFlC081CAKzyc5" },
 { id: 158, title: "2nd Grade Samanya Gyan Voolume 2", title_hi: "II Grade सामान्य ज्ञान Vol-II", exam: "II Grade", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 404.00, img: "1IPpfurGeEFnXwx5SzTt4KA9PgK0evo44" },
 { id: 159, title: "1st Grade Samanya Gyan Volume 1 ", title_hi: "I Grade सामान्य ज्ञान Vol-I", exam: "1st Grade", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 593.00, img: "18yuGO3ukVHIbqRpOxTZ84HmIgBVWMbrl" },
 { id: 160, title: "1st Grade  Samanya Gyan Volume 2", title_hi: "I Grade सामान्य ज्ञान Vol-II ", exam: "1st Grade", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 256.00, img: "1kmj11-f47y__6wSzunJoD8W1NI4ugUBf" },
 { id: 161, title: "Ssc Gd Complete", title_hi: "एसएससी जीडी (SSC GD) 2026  (Complete book)", exam: "SSC GD CONSTABLE", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 445.00, img: "1oRZFLj1l4SxH6cvYevhwnIGb9fit8P4m" },
 { id: 162, title: "Tricky Ganit 5200+ Q/B", title_hi: "ट्रिकी गणित 5200+question", exam: "ALL EXAM", author: "Ramnivas Mathuriya", publisher: "Sunita Publication", price: 468.00, img: "11FuDgYYYf4DLjmht_NWEiffBMgGuXejw" },
 { id: 163, title: "Bharat Ka Bhugol (Barnwal)", title_hi: "भारत का भूगोल", exam: "IAS,IPS", author: "Mahesh Kumar Barnwal", publisher: "Cosmos", price: 349.00, img: "1OsF7hhtggyDOPIbSu1SQ_eIF0P9LQrZ9" },
 { id: 164, title: "Sanshipt Itihas (Barnwal)", title_hi: "संक्षिप्त इतिहास'", exam: "IAS,IPS", author: "Mahesh Kumar Barnwal", publisher: "Cosmos", price: 349.00, img: "1u6CxdTlVus9G10fabDTsUYujl_95sVFl" },
 { id: 165, title: "Vishv Ka Bhugol", title_hi: "विश्व का भूगोल", exam: "IAS,IPS", author: "Mahesh Kumar Barnwal", publisher: "Cosmos", price: 385.00, img: "1D3u-2ZFKv3Xj6T2PPAzRdmPuP8AMpZOG" },
 { id: 166, title: "Oxford Student Atlas (H) 4Ed", title_hi: "ऑक्सफोर्ड स्टूडेंट एटलस फॉर इंडिया 4ED", exam: "OXFORD STUDENT ATLAS (H) 4ED", author: "OXFORD", publisher: "Oxford", price: 232.00, img: "1-LFwkZSCjZCaZwkbXdf7nysVo8X6mjH3" },
 { id: 167, title: "LDC 2nd Grade Paper 2", title_hi: "कनिष्ठ सहायक 2nd Grade Paper 2", exam: "LDC", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 310.00, img: "1_gKYsVrIvIHpXeFgnr4qWl3uX5lSryoM" },
 { id: 168, title: "LDC 2nd Grade Paper 1 ", title_hi: "कनिष्ठ सहायक 2nd Grade Paper 1 ", exam: "LDC", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 457.00, img: "12KHWDVySanbxDUXqpQ2xFMesZxmN-zZx" },
 { id: 169, title: "Saral Ankganit", title_hi: "सरल अंकगणित", exam: "ALL EXAM", author: "R.S. Aggarwal", publisher: "S. Chand", price: 319.00, img: "1IV_cki7Rf73xTXBhAjDT5oMVBCJH5LPA" },
 { id: 170, title: "Naveen Ankganit", title_hi: "नवीन अंकगणित", exam: "ALL EXAM", author: "R.S. Aggarwal", publisher: "S. Chand", price: 460.00, img: "1nZj-wZ6aYbGXzFxtxZo6ZZcpTv1_1rJZ" },
 { id: 171, title: "Rajasthan Police Si", title_hi: "राजस्थान पुलिस सब  इंस्पेस्क्टर  ", exam: "PSI", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 520.00, img: "116fy9aJIYvsD3pb9RW2gFHilvAuiVn2A" },
 { id: 172, title: "Lakshya Raj. Police Si", title_hi: "लक्ष्य राजस्थान पुलिस सब  इंस्पेस्क्टर  ", exam: "PSI", author: "Kanti Jain ,Mahaveer Jain", publisher: "Jai Publication", price: 508.00, img: "19mE7MC_tqNPC4_7aA4Sj8I-OPCSY8OJA" },
 { id: 173, title: "Lakshya Bstc 2026", title_hi: "लक्ष्य BSTC 2026", exam: "BSTC", author: "Kanti Jain ,Mahaveer Jain", publisher: "Jai Publication", price: 446.00, img: "1s30yzyIcQtQORChxB7KvNOU4B1rA45vb" },
 { id: 174, title: "Frp Bstc Model Papers", title_hi: "BSTC  सोल्वड पेपर", exam: "BSTC", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 126.00, img: "1njVfHuDstNQp71_eaDTZ8YHu4-HXJMYx" },
 { id: 175, title: "1st Grade Gk Obj. Ramban 10100+", title_hi: "1 Grade Gk रामबाण 10100+", exam: "1st Grade", author: "Garima Reward ,B.L. Reward", publisher: "First Rank", price: 419.00, img: "1ih5EPUDmiXuS0el9j0vYAJ40PqpUJRhE" },
 { id: 176, title: "Computer Obj.", title_hi: "कंप्यूटर Obj", exam: "ALL EXAM", author: "Manish Yadav Dharmendra Kumar Yadav", publisher: "Daksh", price: 204.00, img: "1-uOdygzrl9SywV3WOjyXo7RR5_QrdDNP" },
 { id: 177, title: "Rssb Ldc Hindi English", title_hi: "LDC परीक्षा में हिंदी और अंग्रेजी", exam: "LDC", author: "Pro BK Rastogi , Aacharya Sandeep Malakar", publisher: "Daksh", price: 492.00, img: "1M7hYP2m0JdZoH-W4lAqm_3BSs_1wTawn" },
 { id: 178, title: "Rajasthan Saar Sangrah", title_hi: "राजस्थान सार संग्रह", exam: "ALL EXAM", author: "Pro BK Rastogi , Aacharya Sandeep Malakar", publisher: "Daksh", price: 408.00, img: "1KODOM3gO16vOEGw1trr3wDVYjopxg8VE" },
 { id: 179, title: "Ssc Constable Gd", title_hi: "SSC CONSTABLE GD", exam: "SSC GD CONSTABLE", author: " Aacharya Sandeep Malakar ,Sudhindra Sharma", publisher: "Daksh", price: 432.00, img: "1XAUdUrOZwk-zBk-BrX25vYebKvbjYJRd" },
 { id: 180, title: "1st Grade English Paper 2 ", title_hi: "1 ग्रेड इंग्लिश पेपर -ll ", exam: "1st Grade", author: "Prof. B.K. Rastogi", publisher: "Daksh", price: 876.00, img: "1mDWpM2KO4lHSKak7pS-6i9zjwsaBUDt2" },
 { id: 181, title: "2nd Grade English Paper 2 ", title_hi: " ll-ग्रेड इंग्लिश पेपर -ll ", exam: "II Grade", author: "Prof. B.K. Rastogi", publisher: "Daksh", price: 756.00, img: "1ZghknI5I9VaEHfqcPMqEjGKOtiww-yMF" },
 { id: 182, title: "Samanya Gyan Gk", title_hi: "सामान्य ज्ञान", exam: "ALL EXAM", author: "Dr.Sunil Kumar Singh", publisher: "Lucent", price: 228.00, img: "1VqqGvNXNPtFbufd_2krMhT5JAmRjM1ZG" },
 { id: 183, title: "Frp 2nd G Sanskrit", title_hi: "ll-Grade संस्कृत", exam: "II Grade", author: "Dr.Lokesh Kumar Sharma", publisher: "Chyavan", price: 447.00, img: "1lZ-Un0ZjqV96dRvV-6DVv4pH9XDTsm8B" },
 { id: 184, title: "Rajasthan Ka Bhugol", title_hi: "राजस्थान का भूगोल ", exam: "ALL EXAM", author: "Dr. Rahul Chaudhary", publisher: "Gyan Vitan", price: 273.00, img: "1IRQ7Jr6s8u_UPOSN-8xpKEv-lZLh0she" },
 { id: 185, title: "LDC Paper 1 and 2 ", title_hi: "LDC PAPER I & II", exam: "LDC", author: "Subhash Charan ,Ramakant Sharma,Narayan Sharma,U.S. Shekhawat", publisher: "RBD", price: 537.00, img: "1q17DRrYCNJCul8rA4dVBcUMbZNfVaJOF" },
 { id: 186, title: "Frp 1st Grade Vanijya", title_hi: "I Grade Vanijya", exam: "1st Grade", author: "CHYAVAN", publisher: "Chyavan", price: 162.00, img: "1RVir_sOFJrkrcg7FlJX_0kMru5ZDkyWt" },
 { id: 187, title: "1st Grade Itihas Pyq", title_hi: "I Grade  इतिहास ", exam: "1st Grade", author: "CHYAVAN", publisher: "Chyavan", price: 162.00, img: "1Y6hEFQ1KSBwC2wBexV2YA_ZjXy_Jr7ve" },
 { id: 188, title: "Frp 1st Grade Hindi Q/P", title_hi: "l Grade हिंदी", exam: "1st Grade", author: "CHYAVAN", publisher: "Chyavan", price: 162.00, img: "1oaBYwtUJTauvSdBCKhclo3VtdsiA9Ve1" },
 { id: 189, title: "1st Grade Bhugol Pyq", title_hi: "l Grade भूगोल", exam: "1st Grade", author: "CHYAVAN", publisher: "Chyavan", price: 162.00, img: "1AsZ2Pp9QWH7mzBZaGJhH3nGqHQBrITTx" },
 { id: 190, title: "Frp 1st Grade Itihas Kala Sanskriti", title_hi: "I Grade  इतिहास कला एवं संस्कृति", exam: "1st Grade", author: "Gaurav Ghanerao ,Pushpendra Kasana", publisher: "Chyavan", price: 242.00, img: "1cyK86rFQwZ8r68i8ifXdRg65gC_oA64l" },
 { id: 191, title: "Frp 1st Grade  Rajasthan Ka Bhugol", title_hi: "l Grade राजस्थान का भूगोल ", exam: "1st Grade", author: "Gaurav Ghanerao ,Pushpendra Kasana", publisher: "Chyavan", price: 143.00, img: "1v1BZ5bclR-Bv7wq51-zSqwgqpJTCJJ3h" },
 { id: 192, title: "Frp 1st Grade Bhartiya Rajvyavastha", title_hi: "l Grade भारतीय राजव्यवस्था", exam: "1st Grade, 2nd Grade ", author: " Gaurav Ghanerao ,Pushpendra Kasana", publisher: "Chyavan", price: 105.00, img: "1dILsxsQHbq_E8Umr_33qlMQNfONZxAVf" },
 { id: 193, title: "Frp 1st Grade Ganit Sankhiki", title_hi: "l Grade गणित एवं सांख्यिकी", exam: "1st Grade", author: "Gaurav Ghanerao ,Rohit Nama", publisher: "Chyavan", price: 147.00, img: "18xSCl06C7Y5fJILhuFW-ALjiZWr1_JtS" },
 { id: 194, title: "2nd Grade GK Solved Papers", title_hi: "ll Grade सामान्य ज्ञान सोल्वड पेपर", exam: "II Grade", author: "Gaurav Ghanerao ,Rohit Nama", publisher: "Chyavan", price: 300.00, img: "1mhVOSRYuNme2_xEq10NmnLTIPgmyfIE0" },
 { id: 195, title: "Essential English English Hindi Dictionary ", title_hi: "एसेंटिअल  डिसनरी इंग्लिश -इंग्लिश  -हिंदी ", exam: "CENTRAL ALL EXAM", author: "Oxford University Press", publisher: "Oxford", price: 260.00, img: "1wLDMZBHVPM2jbplojvLiMJMI09Zjvvs0" },
 { id: 196, title: "Mini Dictionary English - English ", title_hi: "मिनी डिसनरी इंग्लिश -इंग्लिश ", exam: "CENTRAL ALL EXAM", author: "Oxford University Press", publisher: "Oxford", price: 228.00, img: "1_J_VVp1S4P4xRpDJ1QwNZ6DLP8R2DVdS" },
 { id: 197, title: "Tricky Ganit", title_hi: " ट्रिकी", exam: "ALL EXAM", author: "Ramnivas Mathuriya", publisher: "Sunita Publication", price: 228.00, img: "1tvgm4wsw1RbY3hJ8n-s8FhWFezbU1XD2" },
 { id: 198, title: "Tricky Reasoning", title_hi: "ट्रिकी रीजनिग ", exam: "ALL EXAM", author: "Ramnivas Mathuriya", publisher: "Tricky", price: 198.00, img: "1v-925zQrd4qTrKqHNvmofEz7eRo3p8fw" },
 { id: 199, title: "Tricky Reasoning", title_hi: "ट्रिकी रीजनिग ", exam: "ALL EXAM", author: "Ramnivas Mathuriya", publisher: "Sunita Publication", price: 360.00, img: "147DhQYb9MiQEdgHzqTYT7EPbsWkQkCBI" },
 { id: 200, title: "Pre.Bed", title_hi: "प्री बैचलर ऑफ़ एजुकेशन", exam: "PRE.BED", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 485.00, img: "1hKhdun-OOXy_uOugVEDfWSBJqkviaUPW" },
 { id: 201, title: "Prayogshala Sahayak Bhugol", title_hi: "प्रयोगशाला सहायक (भूगोल)", exam: "PRAYOGSHALA SAHAYAK BHUGOL", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 533.00, img: "1ZdOdSXdhxFbYQUn31apfWSk0hcBqL16-" },
 { id: 202, title: "Lakshya Prayogshala Sahayak Paper 2", title_hi: "लक्ष्य प्रयोगशाला सहायक P-2 (भूगोल)", exam: "LAKSHYA PRAYOGSHALA SAHAYAK P-2", author: "Kanti Jain ,Mahaveer Jain", publisher: "Jai Publication", price: 463.00, img: "1jzBDYf7fQ5CiNXweJmIfl1QSwZefTXue" },
 { id: 203, title: "2nd Grade Samajik Adhyan Part 1", title_hi: "II  Grade सामाजिक अध्ययन ", exam: "II Grade", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 493.00, img: "1mN2uREEVm9MVhywO8Lp9YpJmzNCn4K3M" },
 { id: 204, title: "2nd Grade Samajik Adhyan Part 2", title_hi: "II  Grade सामाजिक अध्ययन ", exam: "II Grade", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 491.00, img: "12WUf-AwCYeLzSzXJu4wAq2b1tHUSUFVe" },
 { id: 205, title: "Rajasthan Ka Itihas", title_hi: "राजस्थान इतिहास", exam: "ALL EXAM", author: "Dr.H.D. Singh ,Chitra Rao", publisher: "Panorama", price: 483.00, img: "1P7oIopbsvmq_1giTDWDV87bBeKuc-2MU" },
 { id: 206, title: "Adhunik Bharat Ka Itihas", title_hi: "आधुनिक भारत का इतिहास", exam: "CENTRAL ALL EXAM", author: "Vipin Chandra", publisher: "Orient", price: 360.00, img: "1tTYXZM4F09_NoVNjMrM2qT7UcjwPBG6l" },
 { id: 207, title: "Madhyakalin Bharat Rajniti Samaj", title_hi: "मध्यकालीन भारत: राजनीति, समाज", exam: "CENTRAL ALL EXAM", author: "Satish Chandra", publisher: "Orient", price: 396.00, img: "1_OslnpRsTuKnXFsYJpX8gK_BoOTuGDDk" },
 { id: 208, title: "R.Gupta Ncc National Cadet (E)", title_hi: "(राष्ट्रीय कैडेट कोर) इंग्लिश", exam: " NCC NATIONAL CADET (E)", author: "R. Gupta's", publisher: "RPH", price: 224.00, img: "1QwBw0TRBIUWfJzOuLHzmvUw4PFk2ovGj" },
 { id: 209, title: "R.Gupta Ncc National Cadet (H)", title_hi: "(राष्ट्रीय कैडेट कोर)  हिंदी", exam: " NCC NATIONAL CADET (H)", author: "R. Gupta's", publisher: "RPH", price: 207.00, img: "1_7WrEK4GGMyJ1IXlRnLjn7BHnapHrRI7" },
 { id: 210, title: "Rajasthan Vanpal", title_hi: "राजस्थान वनपाल", exam: "RAJASTHAN VANPAL", author: "Kanti Jain ,Mahaveer Jain", publisher: "Lakshya", price: 329.00, img: "1awpW0JmNMhiXlfcn69g0W8VvGpGvvz4B" },
 { id: 211, title: "Raj. Bhugol Arthvyavastha", title_hi: "राजस्थान भूगोल एवं अर्थव्यवस्था", exam: "ALL EXAM", author: "Dr.H.D. Singh ,Chitra Rao", publisher: "Panorama", price: 512.00, img: "1Njpuxwf6yIl6NUK3SoqZJRe94S2CEsOW" },
 { id: 212, title: "Rajasthan Kala Avam Sanskriti", title_hi: "राजस्थान कला एवं संस्कृति", exam: "ALL EXAM", author: "Hoshiyar Singh", publisher: "DP", price: 300.00, img: "105aVL1cnhZJT0-qDwczaI9zza4PSu4G1" },
 { id: 213, title: "UGC NET Shikshan Avm Shodh", title_hi: "UGC NET शिक्षण एवं शोध", exam: "UGC NET ", author: "SAHITYA", publisher: "Sahitya ", price: 207.00, img: "1TcoLKDeWn9BmRTyPtmGpS5_EUgfGWQZr" },
 { id: 214, title: "Ugc Net/Jrf Hindi Paper 2", title_hi: "NTA UGC NET/JRF के लिए हिंदी साहित्य (Paper-II)", exam: "NTA UGC NET/JRF", author: "SAHITYA", publisher: "Sahitya ", price: 347.00, img: "1tSvvg9UD9B6Itqu7cOGvquK6XbPOtknO" },
 { id: 215, title: "High Court Today", title_hi: "हाई कोर्ट टुडे", exam: "HIGH COURT", author: "Today", publisher: "Today", price: 240.00, img: "17JdBwICvZWuGrr5HTrwPQrcQzk1Cvieh" },
 { id: 216, title: "Van Rakshak Vanpal", title_hi: "वनरक्षक वनपाल", exam: "VAN RAKSHAK VANPAL", author: "Today", publisher: "Today", price: 300.00, img: "1gXBVFG9wliOZPjOdeTLJbT3mBFYJ-ZJz" },
 { id: 217, title: "Ssc Constable Gd Today", title_hi: "SSC GD कांस्टेबल टुडे", exam: "SSC GD CONSTABLE", author: "Today", publisher: "Today", price: 330.00, img: "1JzW06PP_U9y6aQyhvJFMWp-fCZkAMgEJ" },
 { id: 218, title: "Jvvnl Technician 3", title_hi: "Jvvnl तकनीकी सहायक 3", exam: "RVUN/JVVNL/AVVNL/Jd.-lll", author: "RVUN/JVVNL/AVVNL/Jd.-lll", publisher: "Today", price: 390.00, img: "1zwctSKNX0lL_LK0CH55RFKLCnMZtIKV0" },
 { id: 219, title: "Today BSTC", title_hi: "टुडे BSTC  ", exam: "BSTC ", author: "Dr. Ram Charan Mishra, Dr. Kiran,Shrimati Durga", publisher: "Shubham", price: 330.00, img: "1WojFmYOYoHzn3WmMh1PBVkBJVd3ejU6l" },
 { id: 220, title: "Bstc Solved Paper Today", title_hi: "BSTC  सोल्वड पेपर टुडे", exam: "BSTC ", author: "SOLVED PAPER", publisher: "Today", price: 120.00, img: "17wVO_j6wNJBgDcvONw6sNIatpzJ5etOE" },
 { id: 221, title: "Gs Nidhi", title_hi: "GS निधि", exam: "ALL EXAM GK", author: "Naveen Sharma Sir", publisher: "Ankit Bhati", price: 279.00, img: "1wNqNWQQ0UG39u25c1u5ZGUt_vgcZzWTC" },
 { id: 222, title: "Gs Sudha (Naveen Sharma)", title_hi: "GS सुधा ", exam: "ALL EXAM GK", author: "Naveen Sharma Sir", publisher: "RP ANKIT BHATI", price: 279.00, img: "1XFSJF9sA6opQSdWleyQJIT2REXHp4Coy" },
 { id: 223, title: "Rajasthan Cet Snatak 15P/S", title_hi: "राजस्थान CET (स्नातक स्तर) - 15 प्रैक्टिस सेट्स", exam: "CET GRADUCATION LEVEL MODAL PAPEr", author: "15P/S", publisher: "Agarwal", price: 202.00, img: "1kFAwSlvoLB-5HLQOtY1mHrP3gvpESso_" },
 { id: 224, title: "Bharat Ka Bhugol Class Notes", title_hi: "भारत के भूगोल क्लास नोट्स", exam: "ALL EXAM", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 234.00, img: "1jj1kd2TrwzqSetWI7CmYU_U1YZqezQxu" },
 { id: 225, title: "Jila Darshan", title_hi: "जिला दर्शन", exam: "ALL EXAM", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 180.00, img: "11wjkDrT6DAeJ-nviH0bloOd2_Rnv9hIe" },
 { id: 226, title: "1st Grade Shekshik Prabandh", title_hi: " l Grade शैक्षिक प्रबन्ध", exam: "l Grade", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 135.00, img: "1Fvz_N_wFk4XMfwlOwwjnGPsRDLy16baD" },
 { id: 227, title: "Bhartiya Arthvyavastha", title_hi: "भारतीय अर्थव्यवस्था", exam: "ALL EXAM", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 180.00, img: "10F1PjVfQFrh7itkcl_NUvtxIB7ze7iRy" },
 { id: 228, title: "Bharat & Raj. Itihas Kala", title_hi: "भारत और राजस्थान का इतिहास एवं कला-संस्कृति", exam: "PSI", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo PSI", price: 198.00, img: "1-SLSkP-0iC2IKcOiHU6Sy1IeFXofJajg" },
 { id: 229, title: "Samanya Vigyan Prodhyogiki", title_hi: "सामान्य विज्ञान एवं प्रौद्योगिकी", exam: "PSI", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo PSI", price: 162.00, img: "14oFhjrCXqu2BxXnNwweb7uPVqbq4w-29" },
 { id: 230, title: "Reasoning Ganit", title_hi: "रीजनिंग (तर्कशक्ति) और गणित", exam: "PSI", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo PSI", price: 135.00, img: "1mPhpQiHQY7gQEEc7DlNj7KsGm8sAUakq" },
 { id: 231, title: "Ssc Samanya Adhyan", title_hi: "SSC सामान्य अध्ययन", exam: "SSC CGL,CPO, MTH ", author: "Pinnacle", publisher: "Pinnacle", price: 462.00, img: "1opmMcbZWZu_l8G2s49Vlx0XtmqE7gzph" },
 { id: 232, title: "Ssc Reasoning 7200 (H)", title_hi: "SSC रीजनिग  7200 (हिंदी)", exam: "SSC CGL,CPO, MTH ", author: "Pinnacle", publisher: "Pinnacle", price: 532.00, img: "1H57_g6K9yhl-0HLIOKmWnYdC99PHj7ME" },
 { id: 233, title: "Ssc English (H)", title_hi: "SSC इंग्लिश (हिंदी)", exam: "SSC CGL,CPO, MTH ", author: "Pinnacle", publisher: "Pinnacle", price: 567.00, img: "1xlqzO3fqfo1teCdVVciDE4geXeJspnbR" },
 { id: 234, title: "Ssc Fatman Gk/Gs (H)", title_hi: "SSC फटमैन  GK/GS (Hindi)", exam: "SSC CGL,CPO, MTH ", author: "Parmar Sir", publisher: "Parmar", price: 449.00, img: "1YpM1v1fIOIYEuU8tpDCfCvWI2vRyZNgh" },
 { id: 235, title: "1st Grade Shiksha Shastra Manovigyan", title_hi: "I Grade शिक्षा शास्त्र मनोविज्ञान", exam: "1st Grade", author: "Dheer Singh Dhabhai", publisher: "Avni Publication", price: 152.00, img: "1s-nNM2GCP70C_QR9TtikXUtpWXBE0X1R" },
 { id: 236, title: "3rd Grade Shekshnik Manovigyan (D. Singh)", title_hi: "III Grade (REET/Mains) शैक्षणिक मनोविज्ञान", exam: "I Grade LIBERARN", author: "Dheer Singh Dhabhai", publisher: "Avni Publication", price: 190.00, img: "1EktaPM6aR1wu78yxWnzZIZ56KLFKnIEs" },
 { id: 237, title: "Vastunisth Shiksha Manovigyan", title_hi: "वस्तुनिष्ठ शिक्षा मनोविज्ञान", exam: "I Grade", author: "Dheer Singh Dhabhai", publisher: "Avni Publication", price: 204.00, img: "1plaZoweszQpQaDR1KZeVv0lP-gMuvc3_" },
 { id: 238, title: "1st Grade Shiksha Manovigyan", title_hi: "I Grade शिक्षा मनोविज्ञान", exam: "1st Grade", author: "Dr. Vandana Jadon", publisher: "Jadon Prabhat ", price: 243.00, img: "1NFittAcp2t4RwJGAoUc-3e4WP_vT4mh-" },
 { id: 239, title: "2nd Grade Shekshik Manovigyan (V. Jadon)", title_hi: "Il Grade शिक्षा मनोविज्ञान", exam: "II Grade", author: "Dr. Vandana Jadon", publisher: "Prabhat", price: 243.00, img: "1q5nDNeJa3dzLjJfYMKSZTdhuXjChUFc1" },
 { id: 240, title: "Tarkshakti Parikshan", title_hi: "तर्कशक्ति परीक्षण", exam: "ALL EXAM", author: "R.S. Aggarwal", publisher: "S. Chand", price: 599.00, img: "1mbCV0BSJpuQU32P8KW3LRRPS8nqnPj83" },
 { id: 241, title: "Quantitative Aptitude (R.S. Aggarwal)", title_hi: "क्वांटिटेटिव एप्टीटुड ", exam: "ALL EXAM", author: "R.S. Aggarwal", publisher: "SC&CL", price: 639.00, img: "1eZkOV8GppsQLviGMfQiJ5jj3W19bLSuv" },
 { id: 242, title: "English Special", title_hi: "इंग्लिश  स्पेसल", exam: "ALL EXAM", author: "Shivani Maam", publisher: "VIPM Academy", price: 209.00, img: "1NnYm3YTUBuiYOEfkhyQPfxishc_ikTO5" },
 { id: 243, title: "2nd Grade Rajvyvastha Polity (R. Choudhary)", title_hi: "II Grade राजव्यवस्था Polity", exam: "II Grade", author: "R. Choudhary", publisher: "Gyan Vitan", price: 259.00, img: "1H7XN9mdlOBgn-7_xcaXP27SBNtMRqhqw" },
 { id: 244, title: "1st Grade Rajasthan Ka Bhugol", title_hi: "l Grade राजस्थान की भूगोल", exam: "1st Grade", author: "R. Choudhary", publisher: "Gyan Vitan", price: 182.00, img: "1kQi6OafuRyx3jA3rCHbjCW4Q45FXZXii" },
 { id: 245, title: "Dainik Vigyan", title_hi: "दैनिक विज्ञान", exam: "LDC ", author: "Dr. Swati Jabhak , Dr. Vandana Joshi", publisher: "Sikhwal", price: 156.00, img: "1t43f-8K2VJMeZ51aB60zvwNjnK2dWGHi" },
 { id: 246, title: "Ldc Solved Paper", title_hi: "कनिष्ठ सहायक या बाबू सॉल्वड पेपर्स", exam: "LDC ", author: "SIKHWAL", publisher: "Sikhwal", price: 216.00, img: "1F5vYFAORvdo7KVXvTUtwtJNoZCBV7eDZ" },
 { id: 247, title: "Rsmssb Rajasthan Gk Solved Paper", title_hi: "राजस्थान सामान्य ज्ञान  के सॉल्वड पेपर्स", exam: "ALL EXAM", author: "Anita Pancholi", publisher: "Savitri Ujala", price: 288.00, img: "1jBbmT5fPFI7ep6dlWuh4UzKFbznAAajd" },
 { id: 248, title: "Rpsc Raj. Samanya Gyan S/P Obj", title_hi: "राजस्थान सामान्य ज्ञान  का वस्तुनिष्ठ (Objective)", exam: "ALL EXAM", author: "Anita Pancholi", publisher: "Savitri Ujala", price: 318.00, img: "1KX-z_pgzoA1zQtA7XzJ-RtYOXKoSjefn" },
 { id: 249, title: "Rajasthan Geography Polity", title_hi: "राजस्थान की भूगोल और राजव्यवस्था ", exam: "ALL EXAM", author: "K. Srivastave", publisher: "Diksha", price: 300.00, img: "16aCAbBjcQW5kHGqf7dovKXII9-GhKtmp" },
 { id: 250, title: "Rajasthan History Art & Culture", title_hi: "राजस्थान इतिहास  कला एवं संस्कृति", exam: "ALL EXAM", author: "S. Charan", publisher: "Diksha", price: 300.00, img: "1dU71UM6Ko7AN11Ka3877A6iRWLWDd-NM" },
 { id: 251, title: "Ras Pre Solved Paper (H)", title_hi: "RAS प्रारंभिक परीक्षा सॉल्वड पेपर्स (हिंदी)", exam: "RAS,PSI", author: "Dr. Jitesh Joshi", publisher: "Chyavan", price: 330.00, img: "1Qahr5S7BJFYxbIj-dX_RS-kgGfWQ1VK3" },
 { id: 252, title: "Frp Ssc Gd Constable Solved", title_hi: "SSC GD कांस्टेबल सॉल्वड पेपर", exam: "SSC GD CONSTABLE", author: "Rahul sir", publisher: "Chyavan", price: 124.00, img: "1UNw2Sd4KAsO8WJikWg-31EnDbleEcYes" },
 { id: 253, title: "Mathematics For N.D.A & N.A (H)", title_hi: "गणित फॉर   N.D.A & N.A (H)", exam: "CENTRAL ALL EXAM", author: "R.S. Aggarwal", publisher: "S. Chand", price: 479.00, img: "116b20S4SFALegMFMNsbA9k6xuoePybx1" },
 { id: 254, title: "Bhartiya Itihas", title_hi: "भारत का इतिहास", exam: "CENTRAL ALL EXAM", author: "doctor Prem Prakash ola Nirmal Kumar bl bajiya", publisher: "Arya", price: 448.00, img: "1PUK59k9Ks9iaosOCtirXfw9aWXVulg5m" },
 { id: 255, title: "Krashi Pravekshak", title_hi: "कृषि पर्यवेक्षक", exam: "KRASHI PRAVEKSHAK", author: "Dr Rajiv bairathi RK Gupta", publisher: "NSA", price: 300.00, img: "1QtjTGGYW9RxB7GMZE8c4iCwj3gHzAClR" },
 { id: 256, title: "Frp Hindi Vyakran", title_hi: "First Rank Publication) की हिंदी व्याकरण", exam: "CENTRAL ALL EXAM", author: " (Manoj Kumar Mishra", publisher: "Mishra Saral", price: 180.00, img: "17d7DXtnoZXQ6PGzc-LsaoFfZVJWyzzV5" },
 { id: 257, title: "Samanya Gyan 2026", title_hi: " सामान्य ज्ञान 2026", exam: "ALL EXAM", author: "Kaun kab kya", publisher: "Today", price: 36.00, img: "1MUHh8kbsEXNdsAvcQfZ4Pmc7r9nCQ1z8" },
 { id: 258, title: "Police Si Hindi Vyakran", title_hi: "पुलिस सब  इंस्पेस्क्टर हिंदी व्याकरण", exam: "PSI", author: "Ashu sir,Vijay sir,Newari sir", publisher: "Taiyari Karlo", price: 189.00, img: "190Y1V106PaSTFjebn6W4M9dwO85A0pUA" },
 { id: 259, title: "Adarsh Hindi Shabdh Kosh", title_hi: "आदर्श हिंदी शब्दकोश", exam: "CENTRAL ALL EXAM", author: "professor Ramchandra Pathak", publisher: "Bhargava Publication", price: 126.00, img: "1_kz5WFEay2BRUTfWkCayM-XUEVaN-_eT" },
 { id: 260, title: "Instant English", title_hi: "इन्स्टेंट इंग्लिश", exam: "CENTRAL ALL EXAM", author: "Ab Dus Salaam Chaos", publisher: "Salaam Chaus", price: 162.00, img: "1xDv9iuT_XHerbMjJUIszKwrHW0FcsXaS" },
 { id: 261, title: "Bal Sanskrit-Hindi Shabdkosh", title_hi: "बाल संस्कृत-हिंदी शब्दकोश", exam: "CENTRAL ALL EXAM", author: "Vaman Shivram Apte", publisher: "Kamal Amar", price: 135.00, img: "1CiGf14Oz0d5oqGh2H8Z8fkYvTdbsUClX" },
 { id: 262, title: "Medical Dictionary E-E-H", title_hi: " मेडिकल डिक्शनरी  (इंग्लिश - इंग्लिश - हिंदी)", exam: "CENTRAL ALL EXAM", author: "Dr.H.L. Verma, Sr.S.K. Gupta", publisher: "Amar", price: 297.00, img: "1kXPOcqFyNGKNux-1AXYEKhV7JRfoBmZm" },
 { id: 263, title: "Dict. E/H", title_hi: "डिक्शनरी इंग्लिश / हिंदी", exam: "CENTRAL ALL EXAM", author: "Professor Ramchandra Pathak", publisher: "Bhargava Publication", price: 385.00, img: "1HVb8C9-cVw4SL0Yx9WDqzaxa-vllIu7U" },
 { id: 264, title: "Sanskrit Hindi Angreji Shabdkosh", title_hi: "संस्कृत से हिंदी से अंग्रेजी शब्दकोश", exam: "CENTRAL ALL EXAM", author: "Vaman Shivram Apte", publisher: "Amit", price: 297.00, img: "1DTxYgjF8d0Uu9aTOiVnIlp6JuoLhc5X7" },
 { id: 265, title: "Amar Manak Hindi Shabdkosh H-H", title_hi: "अमर मानक हिंदी शब्दकोश (Hindi-Hindi)", exam: "CENTRAL ALL EXAM", author: "Krishnakant Dikshit ,Suryanarayan Upadhyay", publisher: "KAMAL", price: 216.00, img: "1dVqCXiu4jyyGv9XKECahnHQVJlGrqoPB" },
 { id: 266, title: " SIKHWAL LDC SAMANYA GYAN ", title_hi: "सिखवाल पब्लिकेशन", exam: "LDC", author: "", publisher: "SIKHWAL", price: 228.00, img: "1RaaKEFURhPcntuLWbQiZS-OCoeeCrijr" },
 { id: 267, title: "KRASHI PRAVEKSHAK MODEL", title_hi: "", exam: " Agriculture Supervisor", author: "", publisher: "KAILANKI", price: 176.00, img: "1KX36I_EpJrxgmtVrOBzOECuGSYmCw04L" },
 { id: 268, title: "I G GANIT SANKHIKI", title_hi: "", exam: "1st Grade", author: "", publisher: "SIKHWAL", price: 179.00, img: "1aoSR-5wpewuKsviTq6ImlaEVbzwSNvTW" },
 { id: 269, title: "I G SHEKSHIK PRABANDH", title_hi: "", exam: "1st Grade", author: "", publisher: "SIKHWAL", price: 156.00, img: "19s9aG-Bvgvx3uOPyXQeM98S8Tg2xPKpw" },
 { id: 270, title: "I G HINDI ENGLISH", title_hi: "", exam: "1st Grade", author: "", publisher: "SIKHWAL", price: 179.00, img: "1rSES4xC_t-ISAmpYm77gWSTEdIaSZmaB" },
 { id: 271, title: "NCERT VIGYAN 6-10", title_hi: "", exam: "All exam", author: "", publisher: "CHYAVAN", price: 261.00, img: "1T0XgUN4QHUutxNT1z6DT07d3QKrhkwGB" },
 { id: 272, title: "LDC ENGLISH SPECIAL", title_hi: "", exam: "LDC", author: "", publisher: "VIPM", price: 279.00, img: "1z7CXOK_CcddzF4hxLKnl-dywNBGw6c6s" },
 { id: 273, title: "CURRENT CHRONOLOGY", title_hi: "", exam: "Chronology", author: "", publisher: "CHRONOLOGY", price: 23.00, img: "1uJEDiNYUTgNx9dNqvVm7li62OSPIxD0B" },
 { id: 274, title: "RAJASTHAN ADHYAN 6-10", title_hi: "", exam: "All exam", author: "", publisher: "SANKALP", price: 99.00, img: "10Awf3_0bXxui2mvyzmgOFrLbnavUVG7O" },
 { id: 275, title: "VANPAL MODEL", title_hi: "", exam: "Vanpal ", author: "", publisher: "SANKALP", price: 108.00, img: "1509-2uP6MMHT8ZjvL1DA1wS4HAMy-fTL" },
 { id: 276, title: "KRASHI PARYAVEKSHAK MODEL", title_hi: "", exam: "Agriculture Superviosr", author: "", publisher: "SANKALP", price: 180.00, img: "14MbA7JU0eRm9HHaJlBvzwqt-wO-7qB_7" },
 { id: 277, title: "RAJASTHAN HIGH COURT", title_hi: "", exam: "HIGH COURT", author: "", publisher: "UTKARSH", price: 189.00, img: "1Y-1aWi1-T1Y0xbmIb0-iDHGC2l4gZl4r" },
 { id: 278, title: "PRAYOGSHALA SAHAYAK BHUGOL", title_hi: "", exam: "Lab Assistant", author: "", publisher: "LAKSHYA", price: 533.00, img: "1JDk8fHIWn3KzyvyGmtZj4E6ySJhwg-lw" },
 { id: 279, title: "SHARIRIK SHIKSHA (ABHINAV)", title_hi: "", exam: "PTI", author: "", publisher: "RAJDEEP", price: 240.00, img: "1tAL1ULp8doK3dpYrfj1um0aomW5QGfLz" },
 { id: 280, title: "I G SHEKSHIK PRABANDH", title_hi: "", exam: "1st Grade", author: "", publisher: "KALAM", price: 90.00, img: "1FKY9MlD3mYN87OocRcn8u3qbpuGEQHiM" },
 { id: 281, title: "I G SHEKSHIK PRABANDHAN", title_hi: "", exam: "1st Grade", author: "", publisher: "KALAM", price: 153.00, img: "1WtuRH_PdRjTSxLzqZgwKlhSPZNdGzehm" },
 { id: 282, title: "PSI HINDI Q/B", title_hi: "", exam: "SI", author: "", publisher: "LAKSHYA", price: 179.00, img: "12Wer0xOsAclgsd4A27cBOTp6rRE3Erz0" },
 { id: 283, title: "PSI ITIHAS Q/B", title_hi: "", exam: "SI", author: "", publisher: "LAKSHYA", price: 159.00, img: "1rLjssH9kHO61QPnIN7zLjt9hb6GGR4x3" },
 { id: 284, title: "PSI GK GS GANIT REASONING", title_hi: "", exam: "SI", author: "", publisher: "LAKSHYA", price: 147.00, img: "14nTGevynIwjZraoqFIyWTI2SOS8EeDID" },
 { id: 285, title: "PSI BHUGOL Q/B", title_hi: "", exam: "SI", author: "", publisher: "LAKSHYA", price: 150.00, img: "12fgJ_rngyDwM9WBNav6Di9irBdCvZtM7" },
 { id: 286, title: "PSI ARTHSHAKRA Q/B", title_hi: "", exam: "SI", author: "", publisher: "LAKSHYA", price: 162.00, img: "1-Alqtyp4nSbbi6E59siXq9v2tR3XILmq" },
 { id: 287, title: "LDC DANIK VIGYAN", title_hi: "", exam: "LDC", author: "", publisher: "SRASTI", price: 192.00, img: "1GxraGFHUFLSKeccjxuaOKeO-4_T0LoeZ" },
 { id: 288, title: "LDC SOLVED PAPER", title_hi: "", exam: "LDC", author: "", publisher: "SRASTHI", price: 114.00, img: "1hcrcXgfE-dBREmNU-V2s4yeH6tte8poz" },
 { id: 289, title: "RAJ. KALA SANSKRTI GURUMANTRA", title_hi: "", exam: "", author: "", publisher: "UTKARSH", price: 297.00, img: "1WYhQjndYM0uOare5_EE7V00fvFVVgPNN" },
 { id: 290, title: "RAJ. ITIHAS KALA SANSKRITI", title_hi: "", exam: "All exam", author: "", publisher: "UTKARSH", price: 216.00, img: "1AiUSx9y-i8vB4TRZwVCj4D5yjB6Snwmk" },
 { id: 291, title: "RAJASTHAN POLICE SI PART-A", title_hi: "", exam: "SI", author: "", publisher: "UTKARSH", price: 234.00, img: "1WQzEJ1W3J67ODGuX5RTQ9bMtUPj5p0Bb" },
 { id: 292, title: "RAJASTHAN POLICE SI P-B", title_hi: "", exam: "SI", author: "", publisher: "UTKARSH", price: 207.00, img: "1DpkCiu9ZmHiDtLpQYZdGQxU1fmkN05e6" },
 { id: 293, title: "CET 10+2 GUIDE UTKARSH", title_hi: "", exam: "CET 10+2 ", author: "", publisher: "UTKARSH", price: 279.00, img: "1N8rVNVjd2WIUno_cH6J8oRBooUj8VuZS" },
 { id: 294, title: "LDC PAPER-I MODEL", title_hi: "", exam: "LDC", author: "", publisher: "UTKARSH", price: 270.00, img: "13GlwHp1EhUrHU3bxq5cM1HBKwaliVdsO" },
 { id: 295, title: "LAB ASSISTANT BHUGOL B", title_hi: "", exam: "Lab Assistant", author: "", publisher: "UTKARSH", price: 288.00, img: "1NBidYWDaOw85S2vvtwVuo489mLjA_pDI" },
 { id: 296, title: "CET 10+2 MODEL UTKARSH", title_hi: "", exam: "CET 10+2 ", author: "", publisher: "UTKARSH", price: 171.00, img: "1Qvu07CRnWATXNDiXX_r_TbiEWQHbzdv0" },
 { id: 297, title: "KANISHT SAHAYAK P-I,II", title_hi: "", exam: "LDC", author: "", publisher: "TODAY", price: 360.00, img: "1NZXgsi_brG9d6ybU4jPGby4Ze_LtFX2l" },
 { id: 298, title: "RBI SAHAYAK B/P TODAY", title_hi: "", exam: "RBI", author: "", publisher: "TODAY", price: 240.00, img: "1d317KGwjpkKOGHSiOG6_YnpEF6D89m0z" },



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

// Utility to shuffle array
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const BookCard = memo(({ book, onSelect, onAdd, isInCart }) => (
  <div className="group flex flex-row gap-4 md:gap-6 max-w-2xl mx-auto w-full border-b border-gray-100 pb-6 items-start">
    {/* Image Container */}
    <div 
      className="relative w-24 md:w-32 shrink-0 aspect-[3/4] overflow-hidden rounded-xl cursor-pointer"
      onClick={() => onSelect(book)}
    >
      <img 
        src={getDriveUrl(book.img, 400)} 
        alt={book.title} 
        className="w-full h-full object-cover shadow-sm transform-gpu" 
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    </div>

    {/* Details Container - Right Side */}
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
        {book.title}
      </h3>
      
      <div className="flex flex-col gap-0.5 mb-3">
        <p className="text-[11px] md:text-[13px] font-medium text-gray-500 line-clamp-1">{book.author}</p>
        <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-tight line-clamp-1">{book.publisher}</p>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[18px] md:text-[20px] font-black tracking-tight leading-none text-black">₹{book.price}</span>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onAdd(book); }}
          className={`px-4 md:px-6 h-9 md:h-10 flex items-center gap-2 rounded-full font-bold text-[11px] md:text-xs transition-all active:scale-95 transform-gpu ${
            isInCart 
            ? "bg-blue-600 text-white shadow-md" 
            : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isInCart ? <><Check className="w-3.5 h-3.5" /> Added</> : <><Plus className="w-3.5 h-3.5" /> Add</>}
        </button>
      </div>
    </div>
  </div>
));

export default function App() {
  const [shuffledData, setShuffledData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Initialize shuffled data on mount
  useEffect(() => {
    setShuffledData(shuffleArray(BOOKS_DATA));
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredBooks = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const sourceData = shuffledData.length > 0 ? shuffledData : BOOKS_DATA;
    
    if (!query) return sourceData;
    
    return sourceData.filter(book => 
      book.title.toLowerCase().includes(query) || 
      (book.title_hi && book.title_hi.includes(query)) ||
      book.author.toLowerCase().includes(query) || 
      book.exam.toLowerCase().includes(query) ||
      book.publisher.toLowerCase().includes(query) ||
      String(book.id) === query
    );
  }, [searchQuery, shuffledData]);

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
                placeholder="Search by Exam, Title, Author, Publisher"
                className="w-full pl-11 pr-10 py-2.5 md:py-3 bg-[#F5F5F7] focus:bg-white border border-transparent focus:border-gray-200 rounded-full outline-none transition-all text-sm font-medium placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 p-1">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 hover:bg-gray-100 rounded-full transition-all">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* Persistent Results Info Row */}
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
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-8 md:gap-10">
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

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-100 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="flex flex-col md:flex-row items-center gap-1.5 md:gap-4 mb-3">
            <div className="flex items-center gap-2.5">
              <img src={getDriveUrl(LOGO_DRIVE_ID, 80)} alt="Logo" className="w-6 h-6 object-contain opacity-80" referrerPolicy="no-referrer" />
              <span className="text-sm font-bold text-black tracking-tight">Merit Book House</span>
            </div>
            <div className="hidden md:block h-3 w-px bg-gray-200" />
            <p className="text-[10px] text-gray-500 font-medium">Prem Nagar Puliya, Agra Road, Jaipur</p>
          </div>

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
              <h2 className="text-xl md:text-2xl font-black mb-6 leading-tight">{selectedBook.title}</h2>
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
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-lg z-40 transform-gpu active:scale-90 transition-transform">
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