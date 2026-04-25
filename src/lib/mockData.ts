// Backend integration point: replace these with API calls to GET /cars, GET /cars/:id

export type CarCondition = 'new' | 'used' | 'accident';
export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type Transmission = 'Automatic' | 'Manual';

export interface CarListing {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: FuelType;
  transmission: Transmission;
  condition: CarCondition;
  location: string;
  color: string;
  doors: number;
  cylinders: number;
  gccSpec: boolean;
  exportReady: boolean;
  negotiable: boolean;
  description: string;
  images: Array<{src: string;alt: string;}>;
  sellerId: string;
  sellerName: string;
  sellerPhone: string;
  sellerWhatsApp: string;
  sellerMemberSince: string;
  sellerVerified: boolean;
  sellerListings: number;
  views: number;
  savedCount: number;
  postedAt: string;
  featured: boolean;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  count: number;
}

export const BRANDS: Brand[] = [
{ id: 'brand-toyota', name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/100px-Toyota_carlogo.svg.png', count: 1842 },
{ id: 'brand-bmw', name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/100px-BMW.svg.png', count: 634 },
{ id: 'brand-mercedes', name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/100px-Mercedes-Logo.svg.png', count: 721 },
{ id: 'brand-nissan', name: 'Nissan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nissan_2020_logo.svg/100px-Nissan_2020_logo.svg.png', count: 589 },
{ id: 'brand-lexus', name: 'Lexus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Lexus_division_emblem.svg/100px-Lexus_division_emblem.svg.png', count: 312 },
{ id: 'brand-ford', name: 'Ford', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/100px-Ford_logo_flat.svg.png', count: 278 },
{ id: 'brand-honda', name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Honda_logo.svg/100px-Honda_logo.svg.png', count: 445 },
{ id: 'brand-kia', name: 'Kia', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Kia_logo2.svg/100px-Kia_logo2.svg.png', count: 367 },
{ id: 'brand-hyundai', name: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Hyundai_Motor_Company_logo.svg/100px-Hyundai_Motor_Company_logo.svg.png', count: 401 },
{ id: 'brand-land-rover', name: 'Land Rover', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Land_Rover_logo.svg/100px-Land_Rover_logo.svg.png', count: 189 },
{ id: 'brand-porsche', name: 'Porsche', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Porsche_logo.svg/100px-Porsche_logo.svg.png', count: 143 },
{ id: 'brand-audi', name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/100px-Audi-Logo_2016.svg.png', count: 298 }];


export const CAR_LISTINGS: CarListing[] = [
{
  id: 'car-001',
  title: '2023 Toyota Land Cruiser VXR — GCC Spec',
  brand: 'Toyota',
  model: 'Land Cruiser',
  year: 2023,
  price: 385000,
  mileage: 12400,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  condition: 'used',
  location: 'Dubai',
  color: 'Pearl White',
  doors: 4,
  cylinders: 6,
  gccSpec: true,
  exportReady: true,
  negotiable: true,
  description: 'Pristine condition Land Cruiser VXR with full service history from Toyota dealer. Single owner, no accidents, all original parts. Comes with complete documentation for export. Sunroof, leather seats, 360 camera, adaptive cruise control.',
  images: [
  { src: "https://images.unsplash.com/photo-1669391380219-f86bdba9a578", alt: 'White Toyota Land Cruiser VXR front view in Dubai showroom' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1492dd51b-1770278751837.png", alt: 'Toyota Land Cruiser side profile on desert road' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd08635f-1767618613496.png", alt: 'Toyota Land Cruiser interior leather seats and dashboard' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_101142f9d-1772981110265.png", alt: 'Toyota Land Cruiser rear view' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1a2772093-1767354683202.png", alt: 'Toyota Land Cruiser engine bay' }],

  sellerId: 'seller-001',
  sellerName: 'Al Futtaim Auto',
  sellerPhone: '+971501234567',
  sellerWhatsApp: '971501234567',
  sellerMemberSince: 'March 2021',
  sellerVerified: true,
  sellerListings: 47,
  views: 3241,
  savedCount: 128,
  postedAt: '2026-04-22',
  featured: true
},
{
  id: 'car-002',
  title: '2022 BMW X5 xDrive40i M Sport — Full Option',
  brand: 'BMW',
  model: 'X5',
  year: 2022,
  price: 248000,
  mileage: 28700,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  condition: 'used',
  location: 'Abu Dhabi',
  color: 'Space Grey',
  doors: 4,
  cylinders: 6,
  gccSpec: true,
  exportReady: false,
  negotiable: false,
  description: 'BMW X5 M Sport in excellent condition. Full panoramic roof, Harman Kardon sound, heads-up display, ambient lighting. Service history at BMW Al Futtaim. No accidents. First owner.',
  images: [
  { src: "https://images.unsplash.com/photo-1608320018544-37cc4179142a", alt: 'Space grey BMW X5 M Sport front three-quarter view' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_175d9c28d-1772836676074.png", alt: 'BMW X5 interior cockpit with digital displays' },
  { src: "https://images.unsplash.com/photo-1638850142923-33db1a0bb470", alt: 'BMW X5 rear view with M Sport spoiler' }],

  sellerId: 'seller-002',
  sellerName: 'Mohammed Al Rashidi',
  sellerPhone: '+971509876543',
  sellerWhatsApp: '971509876543',
  sellerMemberSince: 'January 2022',
  sellerVerified: false,
  sellerListings: 2,
  views: 1876,
  savedCount: 64,
  postedAt: '2026-04-21',
  featured: true
},
{
  id: 'car-003',
  title: '2024 Toyota Hilux Double Cab — Export Ready',
  brand: 'Toyota',
  model: 'Hilux',
  year: 2024,
  price: 142000,
  mileage: 4100,
  fuelType: 'Diesel',
  transmission: 'Automatic',
  condition: 'used',
  location: 'Sharjah',
  color: 'Silver',
  doors: 4,
  cylinders: 4,
  gccSpec: true,
  exportReady: true,
  negotiable: true,
  description: 'Nearly new Hilux Double Cab with full GCC warranty remaining. Perfect for African and Middle East export. Low mileage, full service history, no accidents.',
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_109293f48-1773199350592.png", alt: 'Silver Toyota Hilux double cab pickup truck side view' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_184717db2-1772981110420.png", alt: 'Toyota Hilux rear bed and taillights' }],

  sellerId: 'seller-003',
  sellerName: 'Gulf Auto Export LLC',
  sellerPhone: '+971556677889',
  sellerWhatsApp: '971556677889',
  sellerMemberSince: 'June 2020',
  sellerVerified: true,
  sellerListings: 134,
  views: 2109,
  savedCount: 89,
  postedAt: '2026-04-23',
  featured: false
},
{
  id: 'car-004',
  title: '2023 Mercedes-Benz GLE 450 AMG Line',
  brand: 'Mercedes-Benz',
  model: 'GLE 450',
  year: 2023,
  price: 319000,
  mileage: 18200,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  condition: 'used',
  location: 'Dubai',
  color: 'Obsidian Black',
  doors: 4,
  cylinders: 6,
  gccSpec: true,
  exportReady: false,
  negotiable: true,
  description: 'GLE 450 AMG Line with Burmester sound system, 360 camera, active parking assist, massage seats. Full dealer service history. No accidents. Under warranty until 2026.',
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1ce0801a8-1776533927057.png", alt: 'Black Mercedes GLE 450 AMG Line front view at night' },
  { src: "https://images.unsplash.com/photo-1632643112690-b5024a00ac75", alt: 'Mercedes GLE interior with ambient lighting' }],

  sellerId: 'seller-004',
  sellerName: 'Fatima Al Zaabi',
  sellerPhone: '+971521112233',
  sellerWhatsApp: '971521112233',
  sellerMemberSince: 'September 2023',
  sellerVerified: false,
  sellerListings: 1,
  views: 987,
  savedCount: 41,
  postedAt: '2026-04-20',
  featured: true
},
{
  id: 'car-005',
  title: '2021 Lexus LX 570 — GCC Spec, Low Mileage',
  brand: 'Lexus',
  model: 'LX 570',
  year: 2021,
  price: 445000,
  mileage: 31500,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  condition: 'used',
  location: 'Dubai',
  color: 'Sonic Titanium',
  doors: 4,
  cylinders: 8,
  gccSpec: true,
  exportReady: true,
  negotiable: false,
  description: 'Lexus LX 570 in exceptional condition. Full Lexus service history, all original paint, no accidents. Highly sought after for export to Africa and Russia. 3-row seating, Mark Levinson audio.',
  images: [
  { src: "https://images.unsplash.com/photo-1669691101370-9ee9ee0782dc", alt: 'Silver Lexus LX 570 front view in urban setting' },
  { src: "https://images.unsplash.com/photo-1688744208868-4e7b111c85dd", alt: 'Lexus LX 570 interior with wood trim and luxury seats' }],

  sellerId: 'seller-001',
  sellerName: 'Al Futtaim Auto',
  sellerPhone: '+971501234567',
  sellerWhatsApp: '971501234567',
  sellerMemberSince: 'March 2021',
  sellerVerified: true,
  sellerListings: 47,
  views: 4102,
  savedCount: 217,
  postedAt: '2026-04-19',
  featured: true
},
{
  id: 'car-006',
  title: '2024 Nissan Patrol Platinum — Brand New',
  brand: 'Nissan',
  model: 'Patrol',
  year: 2024,
  price: 265000,
  mileage: 0,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  condition: 'new',
  location: 'Abu Dhabi',
  color: 'Midnight Blue',
  doors: 4,
  cylinders: 8,
  gccSpec: true,
  exportReady: false,
  negotiable: false,
  description: 'Brand new 2024 Nissan Patrol Platinum with full factory warranty. Zero mileage. Available for immediate delivery. Includes 5-year service package.',
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_12dbf1235-1772981110090.png", alt: 'Midnight blue Nissan Patrol Platinum front view' }],

  sellerId: 'seller-005',
  sellerName: 'Arabian Automobiles',
  sellerPhone: '+971543334455',
  sellerWhatsApp: '971543334455',
  sellerMemberSince: 'February 2019',
  sellerVerified: true,
  sellerListings: 89,
  views: 1654,
  savedCount: 72,
  postedAt: '2026-04-24',
  featured: false
},
{
  id: 'car-007',
  title: '2020 Honda Accord Sport — Accident Free',
  brand: 'Honda',
  model: 'Accord',
  year: 2020,
  price: 68000,
  mileage: 54300,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  condition: 'used',
  location: 'Sharjah',
  color: 'Lunar Silver',
  doors: 4,
  cylinders: 4,
  gccSpec: false,
  exportReady: false,
  negotiable: true,
  description: 'Well-maintained Honda Accord Sport. Regular service at Honda dealer. No accidents, no paint work. Apple CarPlay, Honda Sensing suite. Priced to sell.',
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_19cb2d589-1772704771661.png", alt: 'Silver Honda Accord Sport sedan on road' }],

  sellerId: 'seller-006',
  sellerName: 'Khalid Mansouri',
  sellerPhone: '+971555667788',
  sellerWhatsApp: '971555667788',
  sellerMemberSince: 'July 2022',
  sellerVerified: false,
  sellerListings: 3,
  views: 743,
  savedCount: 18,
  postedAt: '2026-04-22',
  featured: false
},
{
  id: 'car-008',
  title: '2019 Ford F-150 Raptor — Modified',
  brand: 'Ford',
  model: 'F-150 Raptor',
  year: 2019,
  price: 175000,
  mileage: 67800,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  condition: 'used',
  location: 'Ajman',
  color: 'Race Red',
  doors: 4,
  cylinders: 6,
  gccSpec: false,
  exportReady: false,
  negotiable: true,
  description: 'Ford F-150 Raptor with aftermarket upgrades. Lifted suspension, Fox shocks, custom exhaust. Minor accident on front bumper (repaired, see photos). Priced accordingly.',
  images: [
  { src: "https://images.unsplash.com/photo-1521961951372-f532be034421", alt: 'Red Ford F-150 Raptor pickup truck off-road' }],

  sellerId: 'seller-007',
  sellerName: 'Hassan Al Bloushi',
  sellerPhone: '+971561234567',
  sellerWhatsApp: '971561234567',
  sellerMemberSince: 'November 2021',
  sellerVerified: false,
  sellerListings: 5,
  views: 1234,
  savedCount: 34,
  postedAt: '2026-04-18',
  featured: false
},
{
  id: 'car-009',
  title: '2022 Kia Telluride SX — 7 Seater',
  brand: 'Kia',
  model: 'Telluride',
  year: 2022,
  price: 119000,
  mileage: 41200,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  condition: 'used',
  location: 'Dubai',
  color: 'Everlasting Silver',
  doors: 4,
  cylinders: 6,
  gccSpec: false,
  exportReady: false,
  negotiable: true,
  description: 'Kia Telluride SX in pristine condition. 7-seater family SUV. Panoramic sunroof, Harman audio, blind spot assist. Full service history.',
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1ae4d0714-1772862290885.png", alt: 'Silver Kia Telluride SX SUV front three-quarter view' }],

  sellerId: 'seller-008',
  sellerName: 'Rania Khalil',
  sellerPhone: '+971507654321',
  sellerWhatsApp: '971507654321',
  sellerMemberSince: 'May 2023',
  sellerVerified: false,
  sellerListings: 1,
  views: 892,
  savedCount: 29,
  postedAt: '2026-04-21',
  featured: false
},
{
  id: 'car-010',
  title: '2023 Hyundai Tucson N Line — AWD',
  brand: 'Hyundai',
  model: 'Tucson',
  year: 2023,
  price: 94500,
  mileage: 22100,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  condition: 'used',
  location: 'Dubai',
  color: 'Phantom Black',
  doors: 4,
  cylinders: 4,
  gccSpec: true,
  exportReady: false,
  negotiable: false,
  description: 'Hyundai Tucson N Line AWD with sport body kit. Under manufacturer warranty. Full options including digital cockpit, ventilated seats, wireless charging.',
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1c1159e6f-1775054022185.png", alt: 'Black Hyundai Tucson N Line AWD on highway' }],

  sellerId: 'seller-005',
  sellerName: 'Arabian Automobiles',
  sellerPhone: '+971543334455',
  sellerWhatsApp: '971543334455',
  sellerMemberSince: 'February 2019',
  sellerVerified: true,
  sellerListings: 89,
  views: 1102,
  savedCount: 47,
  postedAt: '2026-04-20',
  featured: false
},
{
  id: 'car-011',
  title: '2024 Porsche Cayenne S — GCC, Warranty',
  brand: 'Porsche',
  model: 'Cayenne S',
  year: 2024,
  price: 520000,
  mileage: 8900,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  condition: 'used',
  location: 'Dubai',
  color: 'Carmine Red',
  doors: 4,
  cylinders: 6,
  gccSpec: true,
  exportReady: false,
  negotiable: false,
  description: 'Porsche Cayenne S nearly new with full factory warranty. BOSE sound, panoramic roof, Sport Chrono package, SportDesign package. Exclusive Carmine Red with black leather.',
  images: [
  { src: "https://images.unsplash.com/photo-1650173601999-eec68fe3ed55", alt: 'Red Porsche Cayenne S luxury SUV front view' }],

  sellerId: 'seller-001',
  sellerName: 'Al Futtaim Auto',
  sellerPhone: '+971501234567',
  sellerWhatsApp: '971501234567',
  sellerMemberSince: 'March 2021',
  sellerVerified: true,
  sellerListings: 47,
  views: 2876,
  savedCount: 143,
  postedAt: '2026-04-23',
  featured: true
},
{
  id: 'car-012',
  title: '2021 Audi Q7 45 TFSI quattro — 7 Seats',
  brand: 'Audi',
  model: 'Q7',
  year: 2021,
  price: 198000,
  mileage: 44600,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  condition: 'used',
  location: 'Abu Dhabi',
  color: 'Glacier White',
  doors: 4,
  cylinders: 4,
  gccSpec: true,
  exportReady: false,
  negotiable: true,
  description: 'Audi Q7 with 7 seats, quattro AWD, Virtual Cockpit, Bang & Olufsen 3D sound, air suspension. Full Audi dealer service history. No accidents.',
  images: [
  { src: "https://images.unsplash.com/photo-1598023122566-ea3f8a3b37a2", alt: 'White Audi Q7 luxury SUV on city road' }],

  sellerId: 'seller-009',
  sellerName: 'Omar Al Nuaimi',
  sellerPhone: '+971528889900',
  sellerWhatsApp: '971528889900',
  sellerMemberSince: 'October 2020',
  sellerVerified: false,
  sellerListings: 4,
  views: 1543,
  savedCount: 56,
  postedAt: '2026-04-19',
  featured: false
}];


export const PLATFORM_STATS = {
  totalListings: 10847,
  carsSold: 4231,
  activeBrands: 58,
  verifiedSellers: 312
};

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

export function formatMileage(km: number): string {
  if (km === 0) return '0 km';
  return new Intl.NumberFormat('en-AE').format(km) + ' km';
}

export function getConditionLabel(condition: CarCondition): string {
  const map: Record<CarCondition, string> = {
    new: 'New',
    used: 'Used',
    accident: 'Accident'
  };
  return map[condition];
}

export function buildWhatsAppLink(phone: string, carTitle: string): string {
  const message = encodeURIComponent(
    `Hi, I'm interested in your car listing: ${carTitle} — I found it on CarSooq.`
  );
  return `https://wa.me/${phone}?text=${message}`;
}