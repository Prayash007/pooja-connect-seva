
import { standardPoojas } from "./constants";

// Mock Pandits Data
export const mockPandits = [
  {
    id: "pandit-1",
    fullName: "Pandit Rajesh Sharma",
    city: "Delhi",
    state: "Delhi",
    languages: ["Hindi", "Sanskrit", "English"],
    ritualsOffered: ["griha-pravesh", "satyanarayan-puja", "ganesh-puja", "vastu-shanti", "navgraha-shanti"],
    experienceYears: 25,
    availability: {
      monday: ["9:00 AM - 12:00 PM", "4:00 PM - 7:00 PM"],
      tuesday: ["9:00 AM - 12:00 PM", "4:00 PM - 7:00 PM"],
      wednesday: ["9:00 AM - 12:00 PM", "4:00 PM - 7:00 PM"],
      thursday: ["9:00 AM - 12:00 PM", "4:00 PM - 7:00 PM"],
      friday: ["9:00 AM - 12:00 PM", "4:00 PM - 7:00 PM"],
      saturday: ["9:00 AM - 12:00 PM", "4:00 PM - 7:00 PM"],
      sunday: ["9:00 AM - 12:00 PM"],
    },
    contactPhone: "+91 9876543210",
    contactEmail: "pandit.rajesh.sharma@gmail.com",
    profilePictureUrl: "/placeholder.svg",
    bio: "With over 25 years of experience in performing various Hindu rituals, I bring deep knowledge and authentic practices to every ceremony. Specializing in Griha Pravesh, Satyanarayan Puja, and Vastu Shanti rituals.",
    specializations: [
      "Griha Pravesh ceremonies",
      "Vastu consultations",
      "Marriage ceremonies",
      "Navgraha Shanti",
    ],
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    reviews: [
      {
        userName: "Amit Kumar",
        rating: 5,
        date: "2 months ago",
        comment: "Pandit Rajesh conducted our house warming ceremony with great precision and explained the significance of each ritual. Highly recommended!"
      },
      {
        userName: "Priya Singh",
        rating: 5,
        date: "3 months ago",
        comment: "We were very satisfied with the Satyanarayan Puja performed by Pandit Rajesh. He was punctual, professional, and made sure everything went smoothly."
      },
      {
        userName: "Rahul Verma",
        rating: 4,
        date: "6 months ago",
        comment: "Good experience with Pandit ji. He is knowledgeable and performed the puja with proper mantras and explanations."
      }
    ]
  },
  {
    id: "pandit-2",
    fullName: "Pandit Mukesh Shastri",
    city: "Mumbai",
    state: "Maharashtra",
    languages: ["Hindi", "Sanskrit", "Marathi", "English"],
    ritualsOffered: ["lakshmi-puja", "ganesh-puja", "satyanarayan-puja", "griha-pravesh", "vivah-havan"],
    experienceYears: 20,
    availability: {
      monday: ["10:00 AM - 1:00 PM", "5:00 PM - 8:00 PM"],
      tuesday: ["10:00 AM - 1:00 PM", "5:00 PM - 8:00 PM"],
      wednesday: ["10:00 AM - 1:00 PM"],
      thursday: ["10:00 AM - 1:00 PM", "5:00 PM - 8:00 PM"],
      friday: ["10:00 AM - 1:00 PM", "5:00 PM - 8:00 PM"],
      saturday: ["10:00 AM - 1:00 PM", "5:00 PM - 8:00 PM"],
      sunday: ["10:00 AM - 1:00 PM", "5:00 PM - 8:00 PM"],
    },
    contactPhone: "+91 9876543211",
    contactEmail: "mukesh.shastri@gmail.com",
    profilePictureUrl: "/placeholder.svg",
    bio: "A well-respected pandit with 20 years of experience in traditional Vedic ceremonies. I perform all rituals with authenticity and dedication. Specialized in marriage ceremonies and Griha Pravesh.",
    specializations: [
      "Wedding ceremonies",
      "Griha Pravesh",
      "Ganesh and Lakshmi Puja",
      "Corporate events and ceremonies",
    ],
    featured: true,
    rating: 4.9,
    reviewCount: 98,
    reviews: [
      {
        userName: "Neha Patil",
        rating: 5,
        date: "1 month ago",
        comment: "Pandit Mukesh performed our wedding ceremony beautifully. His knowledge of traditions and rituals is impressive. Everyone appreciated his work."
      },
      {
        userName: "Sanjay Mehta",
        rating: 5,
        date: "2 months ago",
        comment: "We had Pandit ji for our Griha Pravesh ceremony. He was punctual, organized, and conducted the puja with great devotion."
      }
    ]
  },
  {
    id: "pandit-3",
    fullName: "Acharya Suresh Trivedi",
    city: "Varanasi",
    state: "Uttar Pradesh",
    languages: ["Hindi", "Sanskrit", "English"],
    ritualsOffered: ["rudra-abhishek", "navgraha-shanti", "kali-puja", "durga-puja", "vastu-shanti"],
    experienceYears: 30,
    availability: {
      monday: ["7:00 AM - 10:00 AM", "4:00 PM - 7:00 PM"],
      tuesday: ["7:00 AM - 10:00 AM", "4:00 PM - 7:00 PM"],
      wednesday: ["7:00 AM - 10:00 AM", "4:00 PM - 7:00 PM"],
      thursday: ["7:00 AM - 10:00 AM", "4:00 PM - 7:00 PM"],
      friday: ["7:00 AM - 10:00 AM", "4:00 PM - 7:00 PM"],
      saturday: ["7:00 AM - 10:00 AM", "4:00 PM - 7:00 PM"],
      sunday: ["7:00 AM - 10:00 AM"],
    },
    contactPhone: "+91 9876543212",
    contactEmail: "acharya.suresh@gmail.com",
    profilePictureUrl: "/placeholder.svg",
    bio: "Born and raised in Varanasi, I have spent 30 years studying and performing traditional Vedic rituals. My specialization includes Shiva-related ceremonies and astrological remedies. I bring the sacred traditions of Kashi to every ritual.",
    specializations: [
      "Shiva puja and abhishekam",
      "Astrological remedies",
      "Kaal Sarp Dosha nivaran",
      "Sacred fire ceremonies",
    ],
    featured: false,
    rating: 4.7,
    reviewCount: 156,
    reviews: [
      {
        userName: "Vijay Yadav",
        rating: 5,
        date: "2 weeks ago",
        comment: "Acharya ji's Rudra Abhishek was performed with such devotion and accuracy. His chanting of mantras is mesmerizing. A truly spiritual experience."
      },
      {
        userName: "Ananya Sharma",
        rating: 4,
        date: "1 month ago",
        comment: "Had a Navgraha Shanti puja done by Acharya Trivedi. He is very knowledgeable and explained the significance of each step. Recommended for anyone seeking traditional rituals."
      }
    ]
  },
  {
    id: "pandit-4",
    fullName: "Pandit Venkatesh Iyer",
    city: "Bangalore",
    state: "Karnataka",
    languages: ["Kannada", "Sanskrit", "Tamil", "English"],
    ritualsOffered: ["ganesh-puja", "saraswati-puja", "lakshmi-puja", "griha-pravesh", "satyanarayan-puja"],
    experienceYears: 15,
    availability: {
      monday: ["8:00 AM - 11:00 AM", "5:00 PM - 8:00 PM"],
      tuesday: ["8:00 AM - 11:00 AM", "5:00 PM - 8:00 PM"],
      wednesday: ["8:00 AM - 11:00 AM", "5:00 PM - 8:00 PM"],
      thursday: [],
      friday: ["8:00 AM - 11:00 AM", "5:00 PM - 8:00 PM"],
      saturday: ["8:00 AM - 11:00 AM", "5:00 PM - 8:00 PM"],
      sunday: ["8:00 AM - 11:00 AM", "5:00 PM - 8:00 PM"],
    },
    contactPhone: "+91 9876543213",
    contactEmail: "venkatesh.iyer@gmail.com",
    profilePictureUrl: "/placeholder.svg",
    bio: "A modern pandit with traditional values, I specialize in South Indian style pujas with a blend of Vedic traditions. Having served in temples across South India, I bring a wealth of experience to each ceremony.",
    specializations: [
      "South Indian style pujas",
      "Educational ceremonies",
      "Home and office blessings",
      "Auspicious beginnings",
    ],
    featured: false,
    rating: 4.6,
    reviewCount: 85,
    reviews: [
      {
        userName: "Karthik Narayan",
        rating: 5,
        date: "3 weeks ago",
        comment: "Pandit Venkatesh performed our daughter's Saraswati Puja before her exams. Very professional and performed the rituals perfectly."
      },
      {
        userName: "Lakshmi Raghavan",
        rating: 4,
        date: "2 months ago",
        comment: "We had our office inauguration puja done by Pandit Venkatesh. He was punctual and performed the ceremony with precision."
      }
    ]
  },
  {
    id: "pandit-5",
    fullName: "Pandit Devendra Pathak",
    city: "Jaipur",
    state: "Rajasthan",
    languages: ["Hindi", "Sanskrit", "Rajasthani", "English"],
    ritualsOffered: ["vivah-havan", "griha-pravesh", "ganesh-puja", "navgraha-shanti", "hanuman-puja"],
    experienceYears: 18,
    availability: {
      monday: ["9:00 AM - 12:00 PM", "4:00 PM - 7:00 PM"],
      tuesday: ["9:00 AM - 12:00 PM", "4:00 PM - 7:00 PM"],
      wednesday: ["9:00 AM - 12:00 PM", "4:00 PM - 7:00 PM"],
      thursday: ["9:00 AM - 12:00 PM", "4:00 PM - 7:00 PM"],
      friday: [],
      saturday: ["9:00 AM - 12:00 PM", "4:00 PM - 7:00 PM"],
      sunday: ["9:00 AM - 12:00 PM"],
    },
    contactPhone: "+91 9876543214",
    contactEmail: "devendra.pathak@gmail.com",
    profilePictureUrl: "/placeholder.svg",
    bio: "Hailing from a traditional family of priests in Rajasthan, I have been performing rituals for 18 years. I specialize in Rajasthani wedding ceremonies and home blessing rituals, bringing authentic regional traditions to every ceremony.",
    specializations: [
      "Rajasthani wedding ceremonies",
      "Traditional havans",
      "Planetary remedies",
      "Home blessings",
    ],
    featured: false,
    rating: 4.5,
    reviewCount: 72,
    reviews: [
      {
        userName: "Mahesh Sharma",
        rating: 5,
        date: "1 month ago",
        comment: "Pandit Devendra conducted my daughter's wedding. His knowledge of traditional Rajasthani ceremonies is impressive. Very satisfied with his services."
      },
      {
        userName: "Sunita Agarwal",
        rating: 4,
        date: "3 months ago",
        comment: "We had our Griha Pravesh performed by Pandit ji. He explains the significance of each ritual very clearly and performs with devotion."
      }
    ]
  }
];

// Get pandit by ID
export const getPanditById = (id) => {
  return mockPandits.find(pandit => pandit.id === id);
};

// Get pandit's pooja details
export const getPanditPoojaDetails = (panditId) => {
  const pandit = getPanditById(panditId);
  if (!pandit) return [];
  
  return pandit.ritualsOffered.map(poojaId => {
    const pooja = standardPoojas.find(p => p.id === poojaId);
    if (!pooja) return null;
    
    return {
      id: pooja.id,
      name: pooja.name,
      description: pooja.description,
      duration: pooja.duration,
      price: Math.floor(Math.random() * (5000 - 1000 + 1) + 1000), // Random price between 1000-5000
    };
  }).filter(Boolean);
};

// Mock Bookings Data
export const mockBookings = [
  {
    id: "booking-1",
    userId: "user-1",
    panditId: "pandit-1",
    panditName: "Pandit Rajesh Sharma",
    poojaId: "griha-pravesh",
    poojaName: "Griha Pravesh",
    date: "2025-06-15",
    time: "10:00 AM - 1:00 PM",
    address: "123 Green Park, New Delhi",
    notes: "Please bring all necessary items for the ceremony.",
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "2025-05-10",
  },
  {
    id: "booking-2",
    userId: "user-1",
    panditId: "pandit-2",
    panditName: "Pandit Mukesh Shastri",
    poojaId: "satyanarayan-puja",
    poojaName: "Satyanarayan Puja",
    date: "2025-06-20",
    time: "5:00 PM - 7:00 PM",
    address: "456 Ashok Vihar, Delhi",
    notes: "",
    status: "pending",
    paymentStatus: "pending",
    createdAt: "2025-05-12",
  },
  {
    id: "booking-3",
    userId: "user-1",
    panditId: "pandit-3",
    panditName: "Acharya Suresh Trivedi",
    poojaId: "navgraha-shanti",
    poojaName: "Navgraha Shanti",
    date: "2025-05-10",
    time: "8:00 AM - 11:00 AM",
    address: "789 Dwarka, New Delhi",
    notes: "Special request: Please focus on Saturn remedies.",
    status: "completed",
    paymentStatus: "paid",
    createdAt: "2025-04-20",
    hasReview: true,
  },
  {
    id: "booking-4",
    userId: "user-1",
    panditId: "pandit-1",
    panditName: "Pandit Rajesh Sharma",
    poojaId: "ganesh-puja",
    poojaName: "Ganesh Puja",
    date: "2025-04-15",
    time: "6:00 PM - 8:00 PM",
    address: "101 Mayur Vihar, Delhi",
    notes: "",
    status: "completed",
    paymentStatus: "paid",
    createdAt: "2025-04-01",
    hasReview: false,
  },
  {
    id: "booking-5",
    userId: "user-1",
    panditId: "pandit-4",
    panditName: "Pandit Venkatesh Iyer",
    poojaId: "saraswati-puja",
    poojaName: "Saraswati Puja",
    date: "2025-07-05",
    time: "9:00 AM - 11:00 AM",
    address: "202 Lajpat Nagar, Delhi",
    notes: "For my daughter's upcoming exams",
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "2025-05-15",
  },
];

// Mock User Data (would be replaced with Supabase Auth in production)
export const mockUser = {
  id: "user-1",
  name: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  phone: "+91 9876543215",
  defaultAddress: "123 Green Park, New Delhi",
};
